/**@type {Card[]} */
let deck = [];
/**@type {Card[]} */
let hand = [];
/**@type {Card[]} */
let oppHand = [];
/**Cards that may be picked up @type {Card[]} */
let freeCards = [];
/**Cards in the placed pile @type {Card[]} */
let placed = [];
/**Sequence of played cards to be shown @type {Card[]}*/
let playedCards = [];
/**Cards played in a sequence during a turn @type {Card[]} */
let sequence = [];
let playerTurn = true;
//let playedJoker = false;
let playedPicture = false;
/**Number of rounds passed consecutively.
 * At 2, the game is a draw.
 */
let pass = 0;
/**@type {GameState} */
let gameState;

/**The currently active card special. @type {CardSpecial} */
let cardSpecial;

// Solution to enum in JavaScript using object literals.
const GameState = Object.freeze({
    PLAY: "play",
    WIN: "win",
    LOSE: "lose",
    DRAW: "draw"
});

const CardSpecial = Object.freeze({
    NONE: "none",
    JACK: "jack",
    QUEEN: "queen",
    KING: "king",
    JOKER: "joker"
});

/**
 * 
 * @param {string} value 
 * @param {string} suit 
 * @param {boolean} isJoker 
 */
function Card(value, suit, isJoker=false) {
    this.value = value;
    this.suit = suit;
    this.isJoker = isJoker;
    this.string = () => {return this.isJoker ? "joker" : `${value}-${suit}`;}
}

function createCards() {
    for(let i = 1; i < 14; i++) {
        let value;
        switch (i) {
            case 1:
                value = 'A';
                break;
            case 11:
                value = 'J';
                break;
            case 12:
                value = 'Q';
                break;
            case 13:
                value = `K`;
                break;
            default:
                value = i.toString();
                break;
        }
        deck.push(new Card(value, "spades"));
        deck.push(new Card(value, "clubs"));
        deck.push(new Card(value, "diamonds"));
        deck.push(new Card(value, "hearts"));
    }
}

function shuffleDeck() {
    /**
     * Implementation of Durstenfeld's Fisher-Yates shuffle
     * https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
     */
    for (let i = deck.length-1; i > 0; i --) {
        let j = Math.floor(Math.random() * (i+1))
        let temp = deck[i];
        deck[i] = deck[j]
        deck[j] = temp;
    }
}

function drawCards(toHand) {
    if (deck.length <= 7) {
        deck = placed.slice(0, placed.length-2);
        let c = placed[placed.length-1];
        placed = [c];
        shuffleDeck();
    }

    if (toHand.length == 7) {
        for (let i = 0; i < 7; i ++) {
            if (toHand[i] == null || toHand[i] == undefined) {
                toHand[i] = deck.pop();
            }
        }
    }
    else {
        while (toHand.length < 7) {
            toHand.push(deck.pop());
        }
    }
    //return toHand;
}

/**
 * 
 * @param {Card} card 
 * @param {Card[]} fromHand 
 * @returns 
 */
function playCard(card, fromHand) {
    if (isValid(card)) {
        if (getTopCard().isJoker) {
            gameState = playerTurn ? GameState.WIN : GameState.LOSE;
            pass = 0;
            return true;
        }
        placed.push(card);
        playedCards.push(card); 
        fromHand[fromHand.indexOf(card)] = null;
        if (card.value == 'K' || card.value == 'Q' || card.value == 'J') {
            playedPicture = true;
        }
        pass = 0;
        return true;
    }
    return false;
}

function playCardByIndex(index) {
    return playCard(hand[index], hand);
}

function doSpecial() {

}

function passRound() {
    pass ++;
    console.log(`PASS ROUND (${playerTurn ? "player" : "computer"})`);
    if (getTopCard().isJoker)
        gameState = playerTurn ? GameState.LOSE : GameState.WIN;
    else if (pass == 2)
        gameState = GameState.DRAW;
}

function completeRound(endGameCallback=null) {
    let passed = false;
    if (playedCards.length == 0) {
        passRound();
        passed = true;
    } 
    else {
        switch (getTopCard().value) {
            case 'J':
                cardSpecial = CardSpecial.JACK;
                break;
            case 'Q':
                cardSpecial = CardSpecial.QUEEN;
                break;
            case 'K':
                cardSpecial = CardSpecial.KING;
                break;
            default:
                cardSpecial = CardSpecial.NONE;
                break;
        }
        console.log(`Special: ${cardSpecial}`);
    }
    drawCards(hand);
    drawCards(oppHand);
    if (!passed) {
        playedCards = [];
    }
    playedPicture = false;

    if (endGameCallback != null) {
        if (gameState != GameState.PLAY) {
            endGameCallback(gameState);
        } else {playerTurn = !playerTurn;}
    } else {playerTurn = !playerTurn;}
}

function doOpponentTurn() {
    // let a = false; // tracks whether played a card
    // for (let c of oppHand) {
    //     let b = playCard(c, oppHand);
    //     if (b) {a = true;}
    // }
    // if (!a) {passRound();}
    // else {drawCards(oppHand);}
    for (let c of oppHand) {
        playCard(c, oppHand);
    }
    //drawCards(oppHand);
}

function isValid(card) {
    let c = getTopCard();
    if (card.isJoker)
        return true;
    if (!playedPicture) {
        switch (card.value) {
            case 'K':
                return card.suit == c.suit;
            case 'Q':
                return !c.isJoker;
            case 'J':
                if (card.suit == "spades" || card.suit == "clubs")
                    return c.suit == "spades" || c.suit == "clubs";
                else
                    return c.suit == "hearts" || c.suit == "diamonds";
            case 'A':
                // ACE ADOPTS ANY NUMERICAL VALUE
                return !c.isJoker && c.value != 'K' && c.value != 'Q' && c.value != 'J';
            default:
                return card.suit == c.suit || card.value == c.value;
        }
    }
}

function isValidByIndex(index) {
    if (hand[index] != null)
        return isValid(hand[index]);
    return true;
}

// NEED TO CHANGE SET UP SO IT DOESN'T CREATE AN ADDITIONAL DECK
// EACH TIME.


function setUp()
{
    let firstCard;
    deck = [];
    hand = [];
    oppHand = [];
    placed = [];
    playedCards = [];
    playerTurn = true;
    playedPicture = false;
    pass = 0;
    gameState = GameState.PLAY;
    cardSpecial = CardSpecial.NONE;

    createCards();
    shuffleDeck();

    drawCards(hand);
    drawCards(oppHand);
    firstCard = deck.pop();
    placed.push(firstCard);
    playedCards.push(firstCard);
    deck.push(new Card(0, "none", true));
    deck.push(Card(0, "none", true));
    shuffleDeck();
}

/**
 * 
 * @param {Card[]} hand 
 */
function printHand(hand) {
    for (let c of hand) {
        if (c == null || c == undefined)
            console.log("null");
        else {console.log(c.string());}
    }
}

/**
 * 
 * @returns {Card} last played card
 */
function getTopCard() {
    return placed[placed.length-1]
}


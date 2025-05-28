let bet = 0;
/**Used to display updates on game. */
let notification = document.getElementById("notification");
let gameScreen = document.getElementById("game");
let betScreen = document.getElementById("bet");
let betInput = document.getElementById("bet-input");
let betWarning = document.getElementById("bet-warning");
let handButtons = [];
let freeCardButtons = [];
let freeCardsWarning = document.getElementById("free-cards-warning");
let playerHandSec = document.getElementById("hand");
let playedCardsSec = document.getElementById("played-cards");
let opponentHandSec = document.getElementById("opponent-hand");
let freeCardsSec = document.getElementById("free-cards");
let finishTurnButton = document.getElementById("finished-button");

let betweenGameScreen = document.getElementById("between-game");

let resultP = document.getElementById("result");

let errorIndex = -1;
let errorOppIndex = -1; 

function startGame() {
    gameScreen.hidden = false;
    betScreen.hidden = true;
    betweenGameScreen.hidden = true;
    setUp();
    setHand();
    //setPlacedCard();
    setPlayedCards();
    if (disableInvalidCards() == 0)
        finishTurnButton.classList.add("highlighted");
    else {finishTurnButton.classList.remove("highlighted");}
    showOpponentHand();
}

/**
 * Shows the end of game message.
 * @param {GameState} gameState 
 */
function endGame(gameState) {
    gameScreen.hidden = true;
    betweenGameScreen.hidden = false;

    console.log(`END GAME ${gameState}`);
    
    switch(gameState) {
        case GameState.DRAW:
            resultP.innerHTML = "DRAW";
            addBalance(bet);
            updateBalanceHeader();
            break;
        case GameState.LOSE:
            resultP.innerHTML = "COMPUTER WIN  :(";
            break;
        case GameState.WIN:
            resultP.innerHTML = `PLAYER WIN! + £${bet*2}`;
            addBalance(bet * 2);
            updateBalanceHeader();
            break;
        default:
            console.log("NO DEFINED END STATE");
            break;
    }
}

function setHand() {
    playerHandSec.innerHTML = "";
    handButtons = [];
    errorIndex = -1;
    for (let i = 0; i < hand.length; i ++) {
        try {
            handButtons.push(createCardButtonHTML(playerHandSec, hand[i], 
                (cardButton) => {onPlayCard(hand[i], cardButton)}));
        }
        catch {
            // Record index where a card does not exist yet.
            console.log("ERROR " + i);
            errorIndex = i;
            handButtons.push(null);
        }
    }
}

function setFreeCards() {
    freeCardsSec.innerHTML = "";
    freeCardButtons = [];
    for (let c of freeCards) {
        freeCardButtons.push(createCardButtonHTML(freeCardsSec, c,
            (cardButton) => {onSelectFreeCard(c, cardButton)}));
    }
}

/**
 * Sometimes the hand is incomplete at the time the card buttons are created.
 * This function creates the button for a card that had not been created.
 * @param {number} index Index of card with an error.
 */
function resolveHandError(index) {
    console.log("Resolve hand error");
    handButtons[index] = createCardButtonHTML(playerHandSec, hand[index],
        (cardButton) => {onPlayCard(hand[index], cardButton)});
}

function resolveOppError(index) {
    console.log("Resolve opponent error");
    opponentHandSec[index] = createCardImageHTML(opponentHandSec, c, {reverse:true});
}

function setPlayedCards() {
    playedCardsSec.innerHTML = "";
    if (playedCards.length > 0) {
        for (let i = 0; i < playedCards.length; i++) {
            createCardImageHTML(playedCardsSec, playedCards[i]);
        }
    }
}

function showOpponentHand() {
    errorOppIndex = -1; 
    opponentHandSec.innerHTML = "";
    for (let i = 0; i < oppHand.length; i ++) {
        try {
            createCardImageHTML(opponentHandSec, oppHand[i], {reverse:true});
        }
        catch {
            console.log("ERROR");
            errorOppIndex = i;
        }
    }
    opponentHandSec.hidden = false;
}

/**
 * Disables cards that cannot be played.
 * @returns {number} Number of cards that are valid.
 */
function disableInvalidCards() {
    let numValid = 0;
    for (let i = 0; i < 7; i ++) {
        if (!isValidByIndex(i)) {
            handButtons[i].disabled = true;
        } else {
            handButtons[i].disabled = false;
            numValid ++;
        }
    }
    return numValid;
}

/**
 * 
 * @param {Card} card 
 * @param {Node} cardNode
 */
function onPlayCard(card, cardNode) {
    if (cardSpecial == CardSpecial.KING) {
        freeCards.push(card);
        hand.splice(hand.indexOf(card), 1);
        setHand();
        setFreeCards();
        showOpponentHand();

        if (hand.length != 7)
            displayFreeCardsWarning();
        else {freeCardsWarning.hidden = true;}
    }
    else {
        if (playCard(card, hand)) {
            cardNode.hidden = true;
            setPlayedCards();
            if (disableInvalidCards() == 0)
                finishTurnButton.classList.add("highlighted");
            else 
                finishTurnButton.classList.remove("highlighted");
    
            if (card.value == "K") {
                notification.innerHTML = "Exchange cards.";
                drawFreeCards(sequence.length, oppHand, hand);
                setFreeCards();
                setHand();
                showOpponentHand();
            }
        } 
        else {
            alert("You cannot play that card.");
        }
    }
}

/**
 * 
 * @param {Card} card 
 * @param {Node} cardNode 
 */
function onSelectFreeCard(card, cardNode) {
    hand.push(card);
    freeCards.splice(freeCards.indexOf(card), 1);
    setHand();
    setFreeCards();

    if (hand.length != 7)
        displayFreeCardsWarning();
    else {freeCardsWarning.hidden = true;}
}

function displayFreeCardsWarning() {
    console.log("Card exchange unresolved");
    console.log(hand.length);
    freeCardsWarning.hidden = false;
    freeCardsWarning.innerHTML = "Card exchange unresolved. "
    freeCardsWarning.innerHTML += hand.length > 7 ?
        `You must get rid of ${hand.length-7} more card(s).` :
        `You must take ${7-hand.length} more card(s).`;
}

document.getElementById("place-bet").addEventListener("click", () => {
    bet = parseInt(betInput.value);
    if (bet <= getBalance() && bet >= 0) {
        addBalance(-bet);
        updateBalanceHeader();
        startGame();
    }
});

betInput.addEventListener("change", () => {
    bet = parseInt(betInput.value);
    if (bet > getBalance())
        betWarning.hidden = false;
    else {
        betWarning.hidden = true;
    }
});

document.getElementById("play-button").addEventListener("click", () => {
    betweenGameScreen.hidden = true;
    betScreen.hidden = false;
});

finishTurnButton.addEventListener("click", () => {
    let continueToFinish = true;
    notification.innerHTML = "";
    if (cardSpecial == CardSpecial.KING) {
        if (resolveCardExchange()) {
            freeCardsWarning.hidden = true;
            freeCards = [];
            setFreeCards();
            continueToFinish = true;
        }
        else  {
            displayFreeCardsWarning();
            continueToFinish = false;
        }
    }
    if (continueToFinish) {
        console.log("//");
        completeRound(endGame);
        setHand();
        if (!playerTurn) {
            while (!playerTurn) {
                let oppLastPlayedCard = doOpponentTurn();
                showOpponentHand();
                setPlayedCards();
                completeRound(endGame);
                if (!playerTurn) {
                    console.log("Skip player turn");
                    notification.innerHTML = "Skipped player's turn.";
                }
                else if (oppLastPlayedCard != undefined) {
                    if (oppLastPlayedCard.value == 'K') {
                        let n = opponentExchangeCards(oppSequence.length);
                        notification.innerHTML = `Opponent exchanged ${n} cards with the player.`;
                        setHand();
                    }
                }
                if (errorOppIndex >= 0)
                    resolveOppError(errorIndex);
            }
        }
        else  {
            console.log("Skip opponent turn");
            notification.innerHTML = "Skipped opponent's turn."
            setPlayedCards();
        }
        //setPlacedCard(true);
        if (errorIndex >= 0)
            resolveHandError(errorIndex);
        if (disableInvalidCards() == 0)
            finishTurnButton.classList.add("highlighted");
        else {finishTurnButton.classList.remove("highlighted");}
        showOpponentHand();
    }
});


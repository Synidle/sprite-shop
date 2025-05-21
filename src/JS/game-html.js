let bet = 0;
let gameScreen = document.getElementById("game");
let betScreen = document.getElementById("bet");
let betInput = document.getElementById("bet-input");
let betWarning = document.getElementById("bet-warning");
let handButtons = [];
let freeCardButtons = [];
let playerHandSec = document.getElementById("hand");
let playedCardsSec = document.getElementById("played-cards");
let opponentHandSec = document.getElementById("opponent-hand");
let freeCardsSec = document.getElementById("free-cards");
let finishTurnButton = document.getElementById("finished-button");

let betweenGameScreen = document.getElementById("between-game");

let resultP = document.getElementById("result");

let errorIndex = -1;

function startGame() {
    gameScreen.hidden = false;
    betScreen.hidden = true;
    betweenGameScreen.hidden = true;
    setUp();
    setHand();
    //setPlacedCard();
    setPlayedCards();
    disableInvalidCards();
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
            resultP.innerHTML = "COMPUTER WIN";
            break;
        case GameState.WIN:
            resultP.innerHTML = "PLAYER WIN";
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
    console.log("Set free cards.");
    for (let c of freeCards) {
        console.log(c);
        freeCardButtons.push(createCardButtonHTML(freeCardsSec, c,
            (cardButton) => {onSelectFreeCard(c, cardButton)}));
        console.log(freeCardButtons[freeCardButtons.length-1]);
    }
}

// NEED TO DO THE SAME FOR THE OPPONENT CARDS ?

/**
 * Sometimes the hand is incomplete at the time the card buttons are created.
 * This function creates the button for a card that had not been created.
 * @param {number} index Index of card with an error.
 */
function resolveHandError(index) {
    console.log("Resolve hand error");
    handButtons[index] = createCardButtonHTML(playerHandSec, hand[index],
        (cardButton) => {onPlayCard(hand[index], cardButton)});
    console.log(hand);
    console.log(handButtons);
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
    opponentHandSec.innerHTML = "";
    for (let c of oppHand)
        createCardImageHTML(opponentHandSec, c);
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
    console.log("SELECT FREE CARD");
    console.log(card);
}

document.getElementById("place-bet").addEventListener("click", () => {
    bet = parseInt(betInput.value);
    if (bet <= parseInt(localStorage.getItem(KEY_BALANCE))) {
        addBalance(-bet);
        updateBalanceHeader();
        startGame();
    }
});

betInput.addEventListener("change", () => {
    bet = parseInt(betInput.value);
    if (bet > parseInt(localStorage.getItem(KEY_BALANCE)))
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
    if (cardSpecial == CardSpecial.KING) {
        if (resolveCardExchange())
            continueToFinish = true;
        else  {
            console.log("Card exchange unresolved");
            continueToFinish = false;
        }
    }
    if (continueToFinish) {
        console.log("//");
        completeRound(endGame);
        setHand();
        if (!playerTurn) {
            while (!playerTurn) {
                doOpponentTurn();
                showOpponentHand();
                setPlayedCards();
                completeRound(endGame);
                if (!playerTurn)
                    console.log("Skip player turn");
            }
        }
        else  {
            console.log("Skip opponent turn");
            setPlayedCards();
        }
        //setPlacedCard(true);
        if (errorIndex >= 0)
            resolveHandError(errorIndex);
        disableInvalidCards();
        showOpponentHand();
    }
});


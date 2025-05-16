let gameScreen = document.getElementById("game");
let handButtons = [];
let freeCardButtons = [];
let playerHandSec = document.getElementById("hand");
let placedCardSec = document.getElementById("placed-card");
let playedCardsSec = document.getElementById("played-cards");
let opponentHandSec = document.getElementById("opponent-hand");

let betweenGameScreen = document.getElementById("between-game");
let resultP = document.getElementById("result");

function startGame() {
    gameScreen.hidden = false;
    betweenGameScreen.hidden = true;
    setUp();
    setHand();
    setPlacedCard();
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
    
    switch(gameState) {
        case GameState.DRAW:
            resultP.innerHTML = "DRAW";
            break;
        case GameState.LOSE:
            resultP.innerHTML = "COMPUTER WIN";
            break;
        case GameState.WIN:
            resultP.innerHTML = "PLAYER WIN";
            break;
    }
}

function setHand() {
    playerHandSec.innerHTML = "";
    for (let i = 0; i < 7; i ++) {
        try {
            createCardHTML(playerHandSec, hand[i], () => {onPlayCard(hand[i])});
        }
        catch {
            console.log("ERROR");
            console.log(hand);
            printHand(hand);
        }
    }
}

function setPlacedCard(opponentTurn = false) {
    placedCardP.innerHTML = getTopCard().string();
    if (opponentTurn)
        placedCardP.innerHTML = "Computer placed: " + placedCardP.innerHTML;
}

function setPlayedCards() {
    if (playedCards.length > 1) {
        let s = "Played in sequence: (";
        for (let i = 0; i < playedCards.length - 2; i ++)
            s += `${playedCards[i].string()}, `;
        s += `${playedCards[playedCards.length-2].string()})`;
        playedCardsP.innerHTML = s;
    }
    else {
        playedCardsP.hidden = true;
    }
}

function showOpponentHand() {
    let s =  ""
    for (let c of oppHand) {
        s += `${c.string()} `;
    }
    opponentHandP.hidden = false;
    opponentHandP.innerHTML = s;
}

// change to set card validity
function disableInvalidCards() {
    for (let i = 0; i < 7; i ++) {
        if (!isValidByIndex(i)) {
            handButtons[i].disabled = true;
        } else {handButtons[i].disabled = false;}
    }
}

/**
 * 
 * @param {Card} card 
 */
function onPlayCard(card) {
    console.log(`Play ${card.value} of ${card.suit}.`);
}

startGame();

document.getElementById("play-button").addEventListener("click", () => {
    startGame();
});

for (let i = 0; i < 7; i ++) {
    handButtons[i].addEventListener("click", () => {
        if (playCardByIndex(i)) {
            handButtons[i].hidden = true;
            setPlacedCard();
            disableInvalidCards();
        } else {
            alert("You cannot play that card.");
        }
    });
}

document.getElementById("finished-button").addEventListener("click", () => {
    completeRound(endGame);
    setHand();
    console.log("\n\n");
    printHand(hand);
    console.log(`Deck size: ${deck.length}`);
    console.log(`Opponent hand size: ${oppHand.length}`);
    doOpponentTurn();
    setPlayedCards();
    completeRound(endGame);
    setPlacedCard(true);
    disableInvalidCards();
    showOpponentHand();
});


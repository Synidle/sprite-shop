let gameScreen = document.getElementById("game");
let handButtons = [
    document.getElementById("hand-0"),
    document.getElementById("hand-1"),
    document.getElementById("hand-2"),
    document.getElementById("hand-3"),
    document.getElementById("hand-4"),
    document.getElementById("hand-5"),
    document.getElementById("hand-6")
];
let freeCardButtons = [
    document.getElementById("free-0"),
    document.getElementById("free-1"),
    document.getElementById("free-2"),
    document.getElementById("free-3"),
    document.getElementById("free-4"),
    document.getElementById("free-5"),
    document.getElementById("free-6"),
];
let placedCardP = document.getElementById("placed-card");
let playedCardsP = document.getElementById("played-cards");
let opponentHandP = document.getElementById("opponent-hand");

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
 * 
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
    for (let i = 0; i < 7; i ++) {
        handButtons[i].hidden = false;
        try {
            handButtons[i].innerHTML = hand[i].string();
        } catch {
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


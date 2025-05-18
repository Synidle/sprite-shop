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
let finishTurnButton = document.getElementById("finished-button");

// PROBABLY DON'T NEED THIS
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
    handButtons = [];
    errorIndex = -1;
    for (let i = 0; i < 7; i ++) {
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

// NEED TO DO THE SAME FOR THE OPPONENT CARDS

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

// function setPlacedCard(opponentTurn = false) {
//     placedCardSec.innerHTML = "";
//     createCardImageHTML(placedCardSec, getTopCard());

//     // placedCardSec.innerHTML = getTopCard().string();
//     // if (opponentTurn)
//     //     placedCardP.innerHTML = "Computer placed: " + placedCardP.innerHTML;
// }

function setPlayedCards() {
    playedCardsSec.innerHTML = "";
    if (playedCards.length > 0) {
        for (let i = 0; i < playedCards.length; i++) {
            createCardImageHTML(playedCardsSec, playedCards[i]);
        }
    }

    // if (playedCards.length > 1) {
    //     let s = "Played in sequence: (";
    //     for (let i = 0; i < playedCards.length - 2; i ++)
    //         s += `${playedCards[i].string()}, `;
    //     s += `${playedCards[playedCards.length-2].string()})`;
    //     playedCardsP.innerHTML = s;
    // }
    // else {
    //     playedCardsP.hidden = true;
    // }
}

function showOpponentHand() {
    opponentHandSec.innerHTML = "";
    for (let c of oppHand)
        createCardImageHTML(opponentHandSec, c);
    opponentHandSec.hidden = false;

    // let s =  ""
    // for (let c of oppHand) {
    //     s += `${c.string()} `;
    // }
    // opponentHandP.hidden = false;
    // opponentHandP.innerHTML = s;
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
    // DO I NEED THIS FUNCTION TO DIFFERENTIATE HANDS?
    if (playCard(card, hand)) {
        cardNode.hidden = true;
        //setPlacedCard();
        setPlayedCards();
        if (disableInvalidCards() == 0)
            finishTurnButton.classList.add("highlighted");
        else 
            finishTurnButton.classList.remove("highlighted");
    } 
    else {
        alert("You cannot play that card.");
    }
}

document.getElementById("place-bet").addEventListener("click", () => {
    bet = parseInt(betInput.value);
    if (bet <= parseInt(localStorage.getItem(KEY_BALANCE)))
        startGame();
});

betInput.addEventListener("change", () => {
    bet = parseInt(betInput.value);
    if (bet > parseInt(localStorage.getItem(KEY_BALANCE)))
        betWarning.hidden = false;
    else
        betWarning.hidden = true;
});

document.getElementById("play-button").addEventListener("click", () => {
    betweenGameScreen.hidden = true;
    betScreen.hidden = false;
});

// document.getElementById("play-button").addEventListener("click", () => {
//     startGame();
// });

// // THIS IS WHAT ISN'T WORKING
// // INSTEAD USE onPlayCard()
// for (let i = 0; i < 7; i ++) {
//     handButtons[i].addEventListener("click", () => {
//         if (playCardByIndex(i)) {
//             handButtons[i].hidden = true;
//             setPlacedCard();
//             if (disableInvalidCards() == 0)
//                 finishTurnButton.classList.add("highlighted");
//             else 
//                 finishTurnButton.classList.remove("highlighted");
//         } else {
//             alert("You cannot play that card.");
//         }
//     });
// }

finishTurnButton.addEventListener("click", () => {
    console.log("//");
    completeRound(endGame);
    setHand();
    if (!playerTurn) {
        while (!playerTurn) {
            doOpponentTurn();
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
});


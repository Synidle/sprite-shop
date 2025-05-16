

/**
 * 
 * @param {Node} parent 
 * @param {Card} card 
 * @returns {HTMLButtonElement}
 */
function createCardButtonHTML(parent, card, onClick) {
    let cardButton = document.createElement("button");
    cardButton.innerHTML = `
        <image src="../Cards/${getCardImage(card)}.png" alt="${card.value} of ${card.suit}">
    `;
    cardButton.addEventListener("click", onClick);
    cardButton.classList.add("card");
    parent.appendChild(cardButton);
    return cardButton;
}

function createCardImageHTML(parent, card) {
    parent.innerHTML += `
        <image class="card" src="../Cards/${getCardImage(card)}.png" alt="${card.value} of ${card.suit}">
    `;
}

/**
 * 
 * @param {Card} card 
 * @returns {string} image name
 */
function getCardImage(card) {
    if (card.isJoker)
        return "joker-red";
    else
        return `${card.value.toLowerCase()}-${card.suit[0]}`;
}
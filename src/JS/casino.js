

/**
 * Creates interactable card.
 * @param {Node} parent 
 * @param {Card} card 
 * @param {function(HTMLButtonElement)} onClick
 * @returns {HTMLButtonElement}
 */
function createCardButtonHTML(parent, card, onClick) {
    let cardButton = document.createElement("button");
    cardButton.innerHTML = `
        <image src="../Cards/${getCardImage(card)}.png" alt="${card.value} of ${card.suit}">
    `;
    cardButton.addEventListener("click", () => onClick(cardButton));
    cardButton.classList.add("card");
    parent.appendChild(cardButton);
    return cardButton;
}

/**
 * Creates non-interactable card.
 * @param {Node} parent 
 * @param {Card} card 
 */
function createCardImageHTML(parent, card, reverse=false) {
    let cardImage = reverse ? "back" : getCardImage(card);
    if (card != null)
        parent.innerHTML += `
            <image class="card" src="../Cards/${cardImage}.png" alt="${card.value} of ${card.suit}">
        `;
}

/**
 * Gets the appropriate image for the given card.
 * @param {Card} card 
 * @returns {string} image name
 */
function getCardImage(card) {
    if (card.isJoker)
        return "joker-red";
    else
        return `${card.value.toLowerCase()}-${card.suit[0]}`;
}
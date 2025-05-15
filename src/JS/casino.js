

/**
 * 
 * @param {Node} parent 
 * @param {Card} card 
 */
function createCardHTML(parent, card, onClick) {
    let cardButton = document.createElement("button");
    cardButton.innerHTML = `
        <image src="../Cards/${getCardImage(card)}" alt="${card.value} of ${card.suit}">
    `;
    cardButton.addEventListener("click", onClick);
    cardButton.classList.add("card");
    parent.appendChild(cardButton);

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
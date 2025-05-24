let rulesetDropdown = document.getElementById("ruleset-dropdown");

/**
 * Creates interactable card.
 * @param {Node} parent 
 * @param {Card} card 
 * @param {function(HTMLButtonElement)} onClick
 * @returns {HTMLButtonElement}
 */
function createCardButtonHTML(parent, card, onClick) {
    let cardButton = document.createElement("button");
    let cardImage = getCardImage(card);
    if (cardImage == null) { return null; }
    cardButton.innerHTML = `
        <image src="../Cards/${cardImage}.png" alt="${card.value} of ${card.suit}">
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
    if (cardImage == null) { cardImage = "back"; }
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
    if (card == null || card == undefined) { return null; }
    if (card.isJoker)
        return "joker-red";
    else
        return `${card.value.toLowerCase()}-${card.suit[0]}`;
}

rulesetDropdown.addEventListener("click", () => {
    if (rulesetDropdown.classList.contains("drop-down-contained")) {
        rulesetDropdown.classList.remove("drop-down-contained");
        rulesetDropdown.classList.add("drop-down-expanded");
        document.getElementById("drop-down-text").classList.remove("hidden");
    } else {
        rulesetDropdown.classList.remove("drop-down-expanded");
        rulesetDropdown.classList.add("drop-down-contained");
        document.getElementById("drop-down-text").classList.add("hidden");
    }
});
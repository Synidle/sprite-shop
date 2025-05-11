let clothingMenu = document.querySelector("#clothing-menu");
let purchaseMap = new Map(JSON.parse(localStorage.getItem(KEY_PURCHASES)));

document.getElementById("head-button").addEventListener("click", () => {
    displayWardrobe(ProductCategory.HEAD);
});
document.getElementById("torso-button").addEventListener("click", () => {
    displayWardrobe(ProductCategory.TORSO);
});
document.getElementById("legs-button").addEventListener("click", () => {
    displayWardrobe(ProductCategory.LEGS);
});
document.getElementById("feet-button").addEventListener("click", () => {
    displayWardrobe(ProductCategory.FEET);
});
document.getElementById("accessory-button").addEventListener("click", () => {
    displayWardrobe(ProductCategory.ACCESSORY);
});

/**
 * Displays purchased items of given type as interactable buttons. 
 * @param {ProductCategory} type 
 */
function displayWardrobe(type) {
    clothingMenu.innerHTML = "";

    let nudeButton = document.createElement("button");
    nudeButton.classList.add("clothing-item");
    nudeButton.addEventListener("click", () => {
        removeClothingItem(type);
        updateSpriteApparel(apparel);
    });
    clothingMenu.appendChild(nudeButton);
    nudeButton.innerHTML += `
        <i class="fa-solid fa-ban"</i>
    `;

    for (let p of products) {
        if (purchaseMap.has(p.name)) {
            if (p.category == type) {
                for (let i = 0; i < 16; i ++) {
                    let productButton = document.createElement("button");
                    productButton.classList.add("clothing-item");
                    productButton.addEventListener("click", () => {
                        wearItem(p);
                        updateSpriteApparel(apparel);
                    });
                    clothingMenu.appendChild(productButton);
                    productButton.innerHTML += `
                        <img src=${p.imagePath} alt=${p.description}>
                    `;
                }
            }
        }
    }
}


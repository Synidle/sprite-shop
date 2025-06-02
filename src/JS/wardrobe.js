let clothingHeader = document.getElementById("clothing-header");
let clothingWarning = document.getElementById("clothing-warning");
let clothingMenu = document.querySelector("#clothing-menu");
let purchaseMap = getPurchaseMap();

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
    clothingWarning.hidden = true;

    let nudeButton = document.createElement("button");
    nudeButton.classList.add("clothing-item");
    nudeButton.addEventListener("click", () => {
        removeClothingItem(type);
        apparel = getApparel();
        updateSpriteApparel(apparel);
    });
    clothingMenu.appendChild(nudeButton);
    nudeButton.innerHTML += `
        <i class="fa-solid fa-ban"</i>
    `;

    let n = 0;
    for (let p of products) {
        if (purchaseMap.has(p.name)) {
            if (p.category == type) {
                let productButton = document.createElement("button");
                productButton.classList.add("clothing-item");
                productButton.addEventListener("click", () => {
                    if (apparel.get(type) == p)
                        removeClothingItem(type);
                    else
                        wearItem(p);
                    apparel = getApparel();
                    updateSpriteApparel(apparel);
                });
                clothingMenu.appendChild(productButton);
                productButton.innerHTML += `
                    <img src=${p.imagePath} alt=${p.description}>
                `;
                n ++;
            }
        }
    }
    clothingHeader.hidden = false;
    clothingHeader.innerHTML = `Wardrobe: ${type}`;
    if (n == 0) {
        clothingWarning.hidden = false;
        clothingWarning.innerHTML = `No ${type} clothing purchased yet.`;
        clothingMenu.innerHTML = "";
    }
}


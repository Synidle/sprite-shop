let itemsDisplay = document.querySelector("#items-display");
let purchaseMap = new Map(JSON.parse(localStorage.getItem(KEY_PURCHASES)));
let n = 0; 

console.log(purchaseMap);

/**
 * Iterate through products and generate a button for each one.
 * For each button, set the onclick event linking to product page
 * with a particular product as the parameter.
 */

for (let p of products) {
    if (!purchaseMap.has(p.name)) {
        let productButton = document.createElement("button");
        productButton.classList.add("shop-item");
        productButton.addEventListener("click", () => {
            sessionStorage.setItem(KEY_SELECTEDPRODUCT,
                JSON.stringify(p)
            );
            open("../Pages/product-page.html", "_self");
        });
        itemsDisplay.appendChild(productButton);
        productButton.innerHTML += `
            <img src=${p.imagePath} alt=${p.description}> <br>
            <label class="item-name">${p.name}</label>
            <label class="item-price">£${p.price}</label>
        `;
        n ++;
    }
}

if (n == 0) {
    itemsDisplay.innerHTML = `No more products are currently available to purchase.`
}
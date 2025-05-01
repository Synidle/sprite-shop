let itemsDisplay = document.querySelector("#items-display");

// for (let productButton of document.querySelectorAll(".product-button")) {
//     productButton.innerHTML = `
//         <button class="shop-item">
//             <img> <br>
//             <label class="item-name">Name of Product </label>
//             <label class="item-price">£14</label>
//         </button>
//     `;
// }

/**
 * Iterate through products and generate a button for each one.
 * For each button, set the onclick event linking to product page
 * with a particular product as the parameter.
 */

for (let p of products) {
    let productButton = document.createElement("button");
    productButton.classList.add("shop-item");
    productButton.addEventListener("click", () => {
        sessionStorage.setItem(KEY_SELECTEDPRODUCT,
            JSON.stringify(p)
        );
        open("../Pages/product-page.html");
    });
    itemsDisplay.appendChild(productButton);
    productButton.innerHTML += `
        <img src=${p.imagePath}> <br>
        <label class="item-name">${p.name}</label>
        <label class="item-price">£${p.price}</label>
    `;
}
for (let productButton of document.querySelectorAll(".product-button")) {
    productButton.innerHTML = `
        <button class="shop-item">
            <img> <br>
            <label class="item-name">Name of Product </label>
            <label class="item-price">£14</label>
        </button>
    `;
}
let product = JSON.parse(sessionStorage.getItem(KEY_SELECTEDPRODUCT));
let buyButton = document.getElementById("product-purchase-button");

document.title = product.name;

document.getElementById("product-img").setAttribute("src", product.imagePath);
document.getElementById("product-name").innerHTML = product.name;
document.getElementById("product-price").innerHTML = product.price;
document.getElementById("product-desc").innerHTML = product.description;
buyButton.addEventListener("click", () => {
    setPurchased(product.name);
    location.reload();
});

if (getPurchased(product.name)) {
    buyButton.innerHTML = "Purchased";
    buyButton.disabled=true;
}
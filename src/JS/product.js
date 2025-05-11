let products = [];

const ProductCategory = Object.freeze({
    HEAD: "head",
    TORSO: "torso",
    LEGS: "legs",
    FEET: "feet",
    ACCESSORY: "accessory"
});

/**
 * 
 * @param {string} name 
 * @param {ProductCategory} category 
 * @param {number} price 
 * @param {string} imagePath 
 * @param {string} description 
 */
function Product(name, category, price, imageName, description) {
    this.name = name;
    this.category = category;
    this.price = price;
    this.imagePath = "../ProductImg/"+imageName;
    this.description = description;
}

/**
 * @param {ProductCategory} category 
 * @returns {Product} Product displaying an empty image.
 */
function newNullProduct(category) {
    return new Product("null", category, 0, "empty.png", "null");
}

function loadProducts() {
/**
 * Load products from a JSON.
 */
}

function tryBuyProduct(product) {
    let balance = parseInt(JSON.parse(localStorage.getItem(KEY_BALANCE)));
    if (product.price <= balance) {
        localStorage.setItem(KEY_BALANCE, balance-product.price);
        setPurchased(product.name);
        return true;
    } 
    else
        return false;
}

products.push(new Product(
    "Red Beanie",
    ProductCategory.HEAD,
    15,
    "red-beanie.png",
    "A warm red beanie."
));

products.push(new Product(
    "Wizard's hat",
    ProductCategory.HEAD,
    800,
    "wizard-hat.png",
    "A whimsical hat once worn by a wizard."
))

products.push(new Product(
    "White shirt",
    ProductCategory.TORSO,
    30,
    "white-shirt.png",
    "A nice white shirt for any occasion."
));

products.push(new Product(
    "90's T-shirt",
    ProductCategory.TORSO,
    15,
    "90s-tshirt.png",
    "A cheap, retro t-shirt."
));

products.push(new Product(
    "Funky Blue T-shirt",
    ProductCategory.TORSO,
    30,
    "funky-blue-tshirt.png",
    "A really funky blue t-shirt that is sure to make your Sprite stand out from the crowd."
));

products.push(new Product(
    "Puffy Blue Coat",
    ProductCategory.TORSO,
    120,
    "puffy-blue-coat.png",
    "Puffy blue coat."
));

products.push(new Product(
    "Lace camisole",
    ProductCategory.TORSO,
    10,
    "lace-camisole.png",
    "Pink lace camisole with an interesting pattern."
));

products.push(new Product(
    "Blue suit",
    ProductCategory.TORSO,
    90,
    "suit.png",
    "Cheap blue suit."
))

products.push(new Product(
    "Jeans",
    ProductCategory.LEGS,
    50,
    "jeans.png",
    "Blue denim jeans. Supposedly durable."
));

products.push(new Product(
    "Lime Shorts",
    ProductCategory.LEGS,
    35,
    "lime-shorts.png",
    "Cool green shorts."
));

products.push(new Product(
    "Boots",
    ProductCategory.FEET,
    80,
    "boots.png",
    "Nice blue boots."
));

products.push(new Product(
    "Red tie",
    ProductCategory.ACCESSORY,
    5,
    "red-tie.png",
    "Plain red tie for formal occasions."
));

products.push(new Product(
    "Gold Amulet",
    ProductCategory.ACCESSORY,
    6000,
    "amulet.png",
    "Exquisite gold amulet, bearing a striking red jewel."
))
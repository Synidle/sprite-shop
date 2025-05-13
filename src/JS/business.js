let allBusinesses = [];
let businessList = document.querySelector("#business-list");

/**
 * 
 * @param {string} name 
 * @param {number} duration in seconds
 * @param {number} profit in pounds
 */
function Business(name, cost, duration, profit) {
    this.name = name;
    this.cost = cost;
    this.duration = duration;
    this.profit = profit;
}

allBusinesses.push(new Business(
    "Lemonade Stand",
    0, 10, 1
));
allBusinesses.push(new Business(
    "Independent Café",
    45, 8, 2
));
allBusinesses.push(new Business(
    "Italian Restaurant",
    160, 8, 5
));
allBusinesses.push(new Business(
    "Cocktail Bar",
    1000, 2, 5
));
allBusinesses.push(new Business(
    "Fancy Hotel",
    10000, 60, 1000
));
allBusinesses.push(new Business(
    "Tech Business",
    1000000, 30, 10000
));
allBusinesses.push(new Business(
    "A Small Country",
    999999999, 60, 100000
));

for (let b of allBusinesses) {
    let businessDiv = document.createElement("div");
    businessDiv.classList.add("business");
    businessList.appendChild(businessDiv);
    businessDiv.innerHTML = `
        <label>${b.name}</label>
    `;
    if (ownedBusinesses.includes(b.name)) {
        
    }
    else {
        let purchaseButton = document.createElement("button");
        purchaseButton.classList.add("purchase-business");
        purchaseButton.addEventListener("click", () => {
            if (tryBuyBusiness(b))
                location.reload();
        });
        businessDiv.appendChild(purchaseButton);
        purchaseButton.innerHTML = "Purchase";
    }
}

/**
 * 
 * @param {Business} business 
 */
function tryBuyBusiness(business) {
    let balance = parseInt(JSON.parse(localStorage.getItem(KEY_BALANCE)));
    if (business.cost <= balance) {
        localStorage.setItem(KEY_BALANCE, balance-business.cost);
        addBusiness(business.name);
        return true;
    }
    else {return false;}
}
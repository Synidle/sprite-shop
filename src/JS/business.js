let allBusinesses = [];
let businessList = document.querySelector("#business-list");

/**
 * 
 * @param {string} name 
 * @param {number} duration in seconds
 * @param {number} profit in pounds
 */
function Business(name, id, cost, duration, profit) {
    this.name = name;
    this.id = id;
    this.cost = cost;
    this.duration = duration;
    this.profit = profit;
}

allBusinesses.push(new Business(
    "Lemonade Stand",
    "lemonade",
    0, 10, 1
));
allBusinesses.push(new Business(
    "Independent Café",
    "cafe",
    45, 8, 2
));
allBusinesses.push(new Business(
    "Italian Restaurant",
    "restaurant",
    160, 8, 5
));
allBusinesses.push(new Business(
    "Cocktail Bar",
    "bar",
    1000, 2, 5
));
allBusinesses.push(new Business(
    "Fancy Hotel",
    "hotel",
    10000, 60, 1000
));
allBusinesses.push(new Business(
    "Tech Business",
    "tech",
    1000000, 30, 10000
));
allBusinesses.push(new Business(
    "A Small Country",
    "country",
    999999999, 60, 100000
));

setInterval(updateBusinesses, 1000);

for (let b of allBusinesses) {
    let businessDiv = document.createElement("div");
    businessDiv.classList.add("business");
    businessList.appendChild(businessDiv);
    businessDiv.innerHTML = `
        <label>${b.name}</label>
    `;
    if (ownedBusinesses.has(b.id)) {
        businessDiv.innerHTML += `
            <progress id="progress-${b.id}" value=0 max="${b.duration}"></progress>
        `;
    }
    else {
        let purchaseButton = document.createElement("button");
        purchaseButton.classList.add("purchase-business");
        purchaseButton.addEventListener("click", () => {
            if (tryBuyBusiness(b))
                location.reload();
        });
        businessDiv.appendChild(purchaseButton);
        purchaseButton.innerHTML = `£${b.cost}`;
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
        addBusiness(business);
        return true;
    }
    else {return false;}
}

function updateBusinesses() {
    let balance = parseInt(JSON.parse(localStorage.getItem(KEY_BALANCE)));
    for (let b of ownedBusinesses.values()) {
        let progress = document.getElementById(`progress-${b.id}`);
        if (progress != null) {
            progress.value ++;
            if (progress.value == progress.max) {
                balance = balance+b.profit;
                localStorage.setItem(KEY_BALANCE, balance);
                updateBalanceHeader();
                progress.value = 0;
            }
        }
    }
}
/**@type {Business[]} */
let allBusinesses = [];
let businessList = document.querySelector("#business-list");
let balance = parseInt(JSON.parse(localStorage.getItem(KEY_BALANCE)));
let balanceInsert = document.getElementById("balance-insert");

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
updateBusinessBalance();

for (let b of allBusinesses) {
    let businessDiv = document.createElement("div");
    let leftCol = document.createElement("div");
    let rightCol = document.createElement("div");
    businessDiv.classList.add("business");
    leftCol.classList.add("left-column");
    rightCol.classList.add("right-column");
    businessList.appendChild(businessDiv);
    businessDiv.appendChild(leftCol);
    businessDiv.appendChild(rightCol);
    leftCol.innerHTML = `
        <label>${b.name}</label>
    `;
    if (ownedBusinesses.has(b.id)) {
        rightCol.innerHTML += `
            <progress id="progress-${b.id}" value=0 max="${b.duration}"></progress>
        `;
    }
    else {
        let purchaseButton = document.createElement("button");
        purchaseButton.id = `business-button-${b.id}`;
        purchaseButton.classList.add("purchase-business");
        if (balance < b.cost)
            purchaseButton.disabled = true;
        purchaseButton.addEventListener("click", () => {
            if (tryBuyBusiness(b))
                location.reload();
        });
        rightCol.appendChild(purchaseButton);
        purchaseButton.innerHTML = `£${b.cost}`;
    }
}

/**
 * 
 * @param {Business} business 
 */
function tryBuyBusiness(business) {
    balance = parseInt(JSON.parse(localStorage.getItem(KEY_BALANCE)));
    if (business.cost <= balance) {
        localStorage.setItem(KEY_BALANCE, balance-business.cost);
        addBusiness(business);
        return true;
    }
    else {return false;}
}

function updateBusinessBalance() {
    let balanceInsertText = "";
    let balanceT = localStorage.getItem(KEY_BALANCE);
    let j = 0; 
    for (let i = balanceT.length-1; i >= 0; i--) {
        let t = balanceT[i];
        if (j == 3) {
            t += ',';
            j = 0; 
        } j ++;
        balanceInsertText = t + balanceInsertText;
    }
    balanceInsert.innerHTML = balanceInsertText;
}

function updateBusinesses() {
    balance = parseInt(JSON.parse(localStorage.getItem(KEY_BALANCE)));
    updateBusinessBalance();
    for (let b of allBusinesses.values()) {
        let button = document.getElementById(`business-button-${b.id}`);
        if (button != null) {
            if (balance >= b.cost)
                button.disabled = false;
            else {button.disabled = true;}
        }
        else {
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
}
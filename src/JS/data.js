const KEY_USERDATA = "spriteshop-userdata";
const KEY_LASTUSER = "spriteshop-lastuser";
// const KEY_SPRITE = "spriteshop-sprite";
const KEY_APPAREL = "spriteshop-apparel";
const KEY_BALANCE = "spriteshop-balance";
const KEY_PURCHASES = "spriteshop-purchases";
const KEY_SIGNUPDATA = "spriteshop-signupdata";
const KEY_WINNINGS = "spriteshop-winnings";
const KEY_CURRENTUSER = "spriteshop-currentuser";
const KEY_SELECTEDPRODUCT = "spriteshop-selected-product";
const KEY_BUSINESSES = "spriteshop-businesses";

/**@type {string} */
let currentUserName;
/**@type {Map<string, Product>} */
let apparel;
/**@type {Map<string, Business>} */
let ownedBusinesses;

/**
 * 
 * @param {string} username 
 * @param {string} email 
 * @param {string} password 
 * @param {boolean} mailingList 
 * @param {number} balance 
 * @param {Map<string, Product>} apparel 
 * @param {Map<string, Business>} businesses 
 */
function UserData(username, email, password, mailingList) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.mailingList = mailingList;
}

/**
 * All properties are Product types.
 */
// function Apparel() {
//     this.head;
//     this.torso;
//     this.legs;
//     this.feet;
//     this.accessory;
// }

/**
 * 
 * @returns {UserData}
 */
function getUserData() {
    let jsonData = localStorage.getItem(KEY_USERDATA);
    if (jsonData == null) {return null;}
    return JSON.parse(jsonData);
}

/**
 * 
 * @returns {UserData}
 */
function getLastUser() {
    let jsonData = localStorage.getItem(KEY_LASTUSER);
    if (jsonData == null) {return null;}
    currentUserName = jsonData.username;
    return JSON.parse(jsonData);
}

/**
 * 
 * @param {userData} user 
 */
function setLastUser(user) {
    localStorage.setItem(KEY_LASTUSER, JSON.stringify(user));
}

/**
 * 
 * @returns {UserData}
 */
function getCurrentUser() {
    return JSON.parse(sessionStorage.getItem(KEY_CURRENTUSER));
}

/**
 * 
 * @param {UserData} user 
 */
function setCurrentUser(user) {
    sessionStorage.setItem(KEY_CURRENTUSER, JSON.stringify(user));
    currentUserName = user.username;
}

/**
 * 
 * @param {string} username 
 * @returns {UserData}
 */
function getDataOfUser(username) {
    let allUsersData = getUserData();
    let user = null;
    let i = 0;
    while (user == null && i < allUsersData.length) {
        if (allUsersData[i].username == username)
            user = allUsersData[i];
        i ++;
    }
    return user;
}

/**
 * 
 * @param {UserData} user 
 */
function saveUser(user) {
    let allUsersData = getUserData();
    if (allUsersData == null)
        allUsersData = [user];
    else
        allUsersData.push(user);
    localStorage.setItem(KEY_USERDATA, JSON.stringify(allUsersData));
}

/**
 * 
 * @param {string} username 
 * @returns {boolean}
 */
function userExists(username) {
    let allUsersData = getUserData();
    let foundUser = false;
    let i = 0;
    if (allUsersData != null) {
        while (foundUser == false && i < allUsersData.length) {
            if (allUsersData[i].username == username)
                foundUser = true;
            i ++;
        }
    }
    return foundUser;
}

/**
 * 
 * @param {string} email 
 * @returns {boolean}
 */
function emailExists(email) {
    let allUsersData = getUserData();
    let foundEmail = false;
    let i = 0;
    if (allUsersData != null) {
        while (foundEmail == false && i < allUsersData.length) {
            if (allUsersData[i].email == email)
                foundEmail = true;
            if (foundEmail)
                console.log(`Found email ${allUsersData[i].email} in ${allUsersData[i]}`);
            i ++;
        }
    }
    return foundEmail;
}

/**
 * 
 * @param {string} username 
 * @param {string} password 
 * @returns {boolean}
 */
function passwordCorrect(username, password) {
    return getDataOfUser(username).password == password;
}

/**
 * 
 * @param {string} username 
 * @param {string} newEmail 
 * @returns {UserData}
 */
function updateUserEmail(username, newEmail) {
    let allUsersData = getUserData();
    let updatedUser = false;
    let i = 0;
    let newUser;
    while (updatedUser == false && i < allUsersData.length) {
        if (allUsersData[i].username == username) {
            allUsersData[i].email = newEmail;
            updatedUser = true;
            newUser = allUsersData[i];
        }
        i ++;
    }
    localStorage.setItem(KEY_USERDATA, JSON.stringify(allUsersData));
    return newUser;
}

/**
 * Use a negative number to subtract money.
 * @param {number} amount 
 */
function addBalance(amount) {
    let allBalances = new Map(JSON.parse(localStorage.getItem(KEY_BALANCE)));
    let balance = parseInt(allBalances.get(currentUserName));
    balance += amount;
    allBalances.set(currentUserName, balance);
    localStorage.setItem(KEY_BALANCE, JSON.stringify(Array.from(allBalances.entries())));
}

function getBalance() {
    let allBalances = new Map(JSON.parse(localStorage.getItem(KEY_BALANCE)));
    if (!allBalances.has(currentUserName)) {
        allBalances.set(currentUserName, 0);
        localStorage.setItem(KEY_BALANCE, JSON.stringify(Array.from(allBalances.entries())));
    }
    return parseInt(allBalances.get(currentUserName));
}

/**
 * 
 * @param {Map<string, Map<any, any>>} allEntries 
 * @param {Map<any, any>} userEntries 
 * @param {string} key 
 * @returns {boolean} true if a new entry was created.
 */
function createEntryIfNone(allEntries, userEntries, key, override=false) {
    if (allEntries.size == 0 || !allEntries.has(currentUserName ||override)) {
        console.log(`Create entry ${key}`);
        userEntries = new Map();
        allEntries.set(currentUserName,
            JSON.stringify(Array.from(userEntries.entries())));
        localStorage.setItem(key,
            JSON.stringify(Array.from(allEntries.entries())));
        return true;
    }
    // else if (Object.keys(allEntries.get(currentUserName)).length == 0)
    //     return createEntryIfNone(allEntries, userEntries, key, true);
    return false;
}

/**
 * 
 * @param {string} productName 
 */
function setPurchased(productName) {
    let userPurchases;
    let allPurchases = new Map(JSON.parse(localStorage.getItem(KEY_PURCHASES)));

    if (!createEntryIfNone(allPurchases, userPurchases, KEY_PURCHASES))
        userPurchases = new Map(JSON.parse(allPurchases.get(currentUserName)));

    userPurchases.set(productName, true);
    allPurchases.set(currentUserName, 
        JSON.stringify(Array.from(userPurchases.entries())));
    localStorage.setItem(KEY_PURCHASES,
        JSON.stringify(Array.from(allPurchases.entries())));
}

/**
 * 
 * @param {string} productName 
 * @returns {boolean}
 */
function getPurchased(productName) {
    let userPurchases;
    let allPurchases = new Map(JSON.parse(localStorage.getItem(KEY_PURCHASES)));
    // Create entry if none
    if (createEntryIfNone(allPurchases, userPurchases, KEY_PURCHASES))
        return false;
    else
        userPurchases = new Map(JSON.parse(allPurchases.get(currentUserName)));

    if (userPurchases.get(productName) != undefined)
        return true;
    else {return false;}
}

/**
 * 
 * @returns {Map<string, boolean>}
 */
function getPurchaseMap() {
    let userPurchases;
    let allPurchases = new Map(JSON.parse(localStorage.getItem(KEY_PURCHASES)));
    // Create entry if none
    if (!createEntryIfNone(allPurchases, userPurchases, KEY_PURCHASES))
        userPurchases = new Map(JSON.parse(allPurchases.get(currentUserName)));

    return userPurchases;
}

/**
 * 
 * @returns {Map<string, Product>}
 */
function getApparel() {
    let userApparel;
    let allApparel = new Map(JSON.parse(localStorage.getItem(KEY_APPAREL)));
    // Ensure a map for apparel is created
    // If one does not currently exist.
    if (!createEntryIfNone(allApparel, userApparel, KEY_APPAREL)) {
        if (Object.keys(allApparel.get(currentUserName)).length == 0)
            userApparel = new Map();
        else 
            userApparel = new Map(JSON.parse(allApparel.get(currentUserName)));
    }
    else if (userApparel == undefined)
        userApparel = new Map();
    return userApparel;
}

/**
 * 
 * @param {Product} item
 */
function wearItem(item) {
    let allApparel = new Map(JSON.parse(localStorage.getItem(KEY_APPAREL)));

    apparel.set(item.category, item);
    allApparel.set(currentUserName, apparel);

    localStorage.setItem(KEY_APPAREL, 
        JSON.stringify(Array.from(allApparel.entries())));
}

/**
 * 
 * @param {ProductCategory} category 
 */
function removeClothingItem(category) {
    // Sets item to an empty clothing product.
    wearItem(newNullProduct(category));
}

/**
 * 
 * @returns {Map<string, Business>}
 */
function getBusinesses() {
    let userBusinesses;
    let allBusinesses = new Map(JSON.parse(localStorage.getItem(KEY_BUSINESSES)));
    // Create entry if none
    if (allBusinesses.size == 0 || !allBusinesses.has(currentUserName)) {
        userBusinesses = new Map();
        allBusinesses.set(currentUserName, 
            JSON.stringify(Array.from(userBusinesses.entries())));
        localStorage.setItem(KEY_BUSINESSES, 
            JSON.stringify(Array.from(allBusinesses.entries())));
    }
    else {
        userBusinesses = new Map(JSON.parse(allBusinesses.get(currentUserName)));
    }
    return userBusinesses;
}

/**
 * 
 * @param {Business} business 
 */
function addBusiness(business) {
    let allBusinesses = new Map(JSON.parse(localStorage.getItem(KEY_BUSINESSES)));
    ownedBusinesses.set(business.id, business);
    allBusinesses.set(currentUserName, JSON.stringify(Array.from(ownedBusinesses.entries())));
    localStorage.setItem(KEY_BUSINESSES,
        JSON.stringify(Array.from(allBusinesses.entries())));
}
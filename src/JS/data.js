const KEY_USERDATA = "spriteshop-userdata";
const KEY_LASTUSER = "spriteshop-lastuser";
const KEY_SPRITE = "spriteshop-sprite";
const KEY_APPAREL = "spriteshop-apparel";
const KEY_BALANCE = "spriteshop-balance";
const KEY_PURCHASES = "spriteshop-purchases";
const KEY_SIGNUPDATA = "spriteshop-signupdata";
const KEY_WINNINGS = "spriteshop-winnings";
const KEY_CURRENTUSER = "spriteshop-currentuser";
const KEY_SELECTEDPRODUCT = "spriteshop-selected-product";

function UserData(username, email, password, mailingList) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.mailingList = mailingList;
}

/**
 * All properties are Product types.
 */
function Apparel() {
    this.head;
    this.torso;
    this.legs;
    this.feet;
    this.accessory;
}

function getUserData() {
    let jsonData = localStorage.getItem(KEY_USERDATA);
    if (jsonData == null) {return null;}
    return JSON.parse(jsonData);
}

function getLastUser() {
    let jsonData = localStorage.getItem(KEY_LASTUSER);
    if (jsonData == null) {return null;}
    return JSON.parse(jsonData);
}

function setLastUser(user) {
    localStorage.setItem(KEY_LASTUSER, JSON.stringify(user));
}

function getCurrentUser() {
    return JSON.parse(sessionStorage.getItem(KEY_CURRENTUSER));
}

function setCurrentUser(user) {
    sessionStorage.setItem(KEY_CURRENTUSER, JSON.stringify(user));
}

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

function saveUser(user) {
    let allUsersData = getUserData();
    if (allUsersData == null)
        allUsersData = [user];
    else
        allUsersData.push(user);
    localStorage.setItem(KEY_USERDATA, JSON.stringify(allUsersData));
}

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

function passwordCorrect(username, password) {
    return getDataOfUser(username).password == password;
}

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

function setPurchased(productName) {
    let purchases = localStorage.getItem(KEY_PURCHASES);
    let purchaseMap;
    if (purchases != null) {
        purchaseMap = new Map(JSON.parse(purchases));
    }
    else {
        purchaseMap = new Map();
    }
    purchaseMap.set(productName, true);
    localStorage.setItem(KEY_PURCHASES,
        JSON.stringify(Array.from(purchaseMap.entries()))
    );
}

function getPurchased(productName) {
    let purchases = localStorage.getItem(KEY_PURCHASES);
    let purchaseMap;
    if (purchases == null)
        return false;
    purchaseMap = new Map(JSON.parse(purchases));
    if (purchaseMap.get(productName) != undefined)
        return true;
    else {return false;}
}

/**
 * 
 * @param {Apparel} apparel 
 */
function setApparel(apparel) {
    localStorage.setItem(JSON.stringify(apparel));
}

/**
 * 
 * @param {Product} item
 */
function wearItem(item) {
    let apparel;
    let fromStorage = localStorage.getItem(KEY_APPAREL);
    apparel = fromStorage == null ? 
        new Apparel() : JSON.parse(fromStorage);
    
    switch (item.category) {
        case ProductCategory.HEAD:
            apparel.head = item;
            break;
        case ProductCategory.TORSO:
            apparel.torso = item;
            break;
        case ProductCategory.LEGS:
            apparel.legs = item;
            break;
        case ProductCategory.FEET:
            apparel.feet = item;
            break;
        case ProductCategory.ACCESSORY:
            apparel.accessory = item;
            break;
    }    

    localStorage.setItem(KEY_APPAREL, 
        JSON.stringify(apparel));
}

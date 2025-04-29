
const KEY_USERDATA = "spriteshop-userdata";
const KEY_LASTUSER = "spriteshop-lastuser";
const KEY_SPRITE = "spriteshop-sprite";
const KEY_BALANCE = "spriteshop-balance";
const KEY_PURCHASES = "spriteshop-purchases";
const KEY_SIGNUPDATA = "spriteshop-signupdata";
const KEY_WINNINGS = "spriteshop-winnings";
const KEY_CURRENTUSER = "spriteshop-currentuser";

function UserData(username, email, password, mailingList) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.mailingList = mailingList;
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
    while (foundUser == false && i < allUsersData.length) {
        if (allUsersData[i].username == username)
            foundUser = true;
        i ++;
    }
    return foundUser;
}

function emailExists(email) {
    let allUsersData = getUserData();
    let foundEmail = false;
    let i = 0;
    while (foundEmail == false && i < allUsersData.length) {
        if (allUsersData[i].email == email)
            foundEmail = true;
        if (foundEmail)
            console.log(`Found email ${allUsersData[i].email} in ${allUsersData[i]}`);
        i ++;
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
let usernameInput = document.getElementById("username");
let emailInput = document.getElementById("email");
let emailConfirmInput = document.getElementById("confirm-email");
let passwordInput = document.getElementById("password");
let passwordConfirmInput = document.getElementById("confirm-password");
let termsInput = document.getElementById("terms-conditions");
let sharingInput = document.getElementById("sharing-data");
let mailingInput = document.getElementById("mailing-list");

let usernameWarning = document.getElementById("username-warning");
let emailWarning = document.getElementById("email-warning");
let emailConfirmWarning = document.getElementById("confirm-email-warning");
let passwordWarning = document.getElementById("password-warning");
let passwordConfirmWarning = document.getElementById("confirm-password-warning");
let termsWarning = document.getElementById("terms-warning");
let dataWarning = document.getElementById("data-warning");
let mainWarning = document.getElementById("main-warning");

// update hidden attributes when inputs are updated

usernameInput.addEventListener("input", setUsernameWarning);
emailInput.addEventListener("input", setEmailWarning);
emailConfirmInput.addEventListener("input", setConfirmEmailWarning);
passwordInput.addEventListener("input", setPasswordWarning);
passwordConfirmInput.addEventListener("input", setPasswordConfirmWarning);
termsInput.addEventListener("change", setTermsWarning);
sharingInput.addEventListener("change", setSharingWarning);

document.getElementById("form").addEventListener("submit", (event) => {
    event.preventDefault();

    // Check if valid
    if (setUsernameWarning() && setEmailWarning() && setConfirmEmailWarning() && setPasswordWarning() && setPasswordConfirmWarning() && setTermsWarning() && setSharingWarning()) {
        mainWarning.hidden = true;
        submit();
    }
    else {
        mainWarning.hidden = false;
    }
});

/* 
    Offers additional validation, and also basic validation for where
    the browser might not automatically offer it.
*/

function setUsernameWarning() {
    if (usernameInput.value == "") {
        usernameWarning.innerHTML = "Please enter a username.";
        usernameWarning.hidden = false;
        bringAttention(usernameInput);
        return false;
    }
    else if (usernameInput.value.includes(' ')) {
        usernameWarning.innerHTML = "Username may not contain whitespace.";
        usernameWarning.hidden = false;
        bringAttention(usernameInput);
        return false;
    }
    else if (userExists(usernameInput.value)) {
        usernameWarning.innerHTML = "A user with that name already exists. Please pick a unique username.";
        usernameWarning.hidden = false;
        bringAttention(usernameInput);
        return false;
    }
    else {
        usernameWarning.hidden = true;
        removeAttention(usernameInput);
        return true;
    }
}

function setEmailWarning() {
    if (emailInput.value == "") {
        emailWarning.innerHTML = "Please enter an email address.";
        emailWarning.hidden = false;
        bringAttention(emailInput);
        return false;
    } 
    else if (emailExists(emailInput.value)) {
        emailWarning.innerHTML = 
            "An account is already registered with that email address."+
            "Pick a new username, or would you like to "+
            "<a href=\"../Pages/sign-in.html\">sign in</a>"+"?";
        emailWarning.hidden = false;
        bringAttention(emailInput);
        return false;
    }
    else {
        emailWarning.hidden = true;
        removeAttention(emailInput);
        return true;
    }
}

function setConfirmEmailWarning() {
    if (emailInput.value != emailConfirmInput.value) {
        emailConfirmWarning.innerHTML = "Emails do not match.";
        emailConfirmWarning.hidden = false;
        bringAttention(emailConfirmInput);
        return false;
    }
    else {
        emailConfirmWarning.hidden = true;
        removeAttention(emailConfirmInput);
        return true;
    }
}

function setPasswordWarning() {
    if (passwordInput.value.length < 8) {
        passwordWarning.innerHTML = "Password must be at least 8 characters in length.";
        passwordWarning.hidden = false;
        bringAttention(passwordInput);
        return false;
    }
    else {
        passwordWarning.hidden = true;
        removeAttention(passwordInput);
        return true;
    }
}

function setPasswordConfirmWarning() {
    if (passwordInput.value != passwordConfirmInput.value) {
        passwordConfirmWarning.innerHTML = "Passwords do not match.";
        passwordConfirmWarning.hidden = false;
        bringAttention(passwordConfirmInput);
        return false;
    }
    else {
        passwordConfirmWarning.hidden = true;
        removeAttention(passwordConfirmInput);
        return true;
    }
}

function setTermsWarning() {
    if (!termsInput.checked) {
        termsWarning.hidden = false;
        bringAttention(termsInput);
        return false;
    }
    else {
        termsWarning.hidden = true;
        removeAttention(termsInput);
        return true;
    }
}

function setSharingWarning() {
    if (!sharingInput.checked) {
        dataWarning.hidden = false;
        bringAttention(sharingInput);
        return false;
    }
    else {
        dataWarning.hidden = true;
        removeAttention(sharingInput);
        return true;
    }
}

function bringAttention(inputElement) {
    inputElement.classList.add("attention");
}
function removeAttention(inputElement) {
    inputElement.classList.remove("attention");
}

function submit() {
    let user = new UserData(
        usernameInput.value,
        emailInput.value,
        passwordInput.value,
        mailingInput.checked
    );
    saveUser(user);
    setCurrentUser(user);
    setLastUser(user);
    open("../../index.html", "_self");
}
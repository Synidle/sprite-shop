let usernameInput = document.getElementById("username");
let passwordInput = document.getElementById("password");

let usernameWarning = document.getElementById("username-warning");
let passwordWarning = document.getElementById("password-warning");

let incorrectCount = 0;

document.getElementById("form").addEventListener("submit", (event) => {
    event.preventDefault();
    usernameWarning.hidden = true;
    passwordWarning.hidden = true;
    if (setUsernameWarning()) {
        if (setPasswordWarning()) {
            submit();
        }
    }
});

usernameInput.addEventListener("change", setUsernameWarning);
passwordInput.addEventListener("change", () => {
    passwordWarning.hidden = true;
});

function setUsernameWarning() {
    if (userExists(usernameInput.value)) {
        usernameWarning.hidden = true;
        return true;
    }
    else {
        usernameWarning.hidden = false;
        return false;
    }
}

function setPasswordWarning() {
    if (passwordCorrect(usernameInput.value, passwordInput.value)) {
        passwordWarning.hidden = true;
        return true;
    }
    else {
        passwordWarning.hidden = false;
        return false;
    }
}

function submit() {
    let user = getDataOfUser(usernameInput.value);
    setCurrentUser(user);
    setLastUser(user);
    open("../../index.html", "_self");
}
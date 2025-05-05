let currentUserData = getCurrentUser();
let emailInput = document.getElementById("email");
let changeEmailButton = document.getElementById("change-email");
let emailWarning = document.getElementById("email-warning");

if (currentUserData == null) {
    setCurrentUser(getLastUser());
    currentUserData = getCurrentUser();
}

document.getElementById("title").innerHTML = currentUserData.username;
document.getElementById("username-heading").innerHTML = currentUserData.username;
emailInput.value = currentUserData.email;

document.getElementById("return").addEventListener("click", function() {
    open("../../index.html", "_self");
});

emailInput.addEventListener("input", function() {
    let newEmail = emailInput.value;
    let currentEmail = currentUserData.email;
    changeEmailButton.hidden = true;
    if (newEmail != currentEmail) {
        changeEmailButton.hidden = false;
    }
});

document.getElementById("email-form").addEventListener("submit", function (event) {
    event.preventDefault();
    if (setEmailWarning())
        changeEmail(emailInput.value);
});

function setEmailWarning() {
    if (emailInput.value == "") {
        emailWarning.innerHTML = "Please enter an email address.";
        emailWarning.hidden = false;
        return false;
    }
    else if (emailExists(emailInput.value)) {
        emailWarning.innerHTML = "An account is already registered with that email address.";
        emailWarning.hidden = false;
        return false;
    }
    else {
        emailWarning.hidden = true;
        return true;
    }
}

function changeEmail(email) {
    let updatedUser = updateUserEmail(currentUserData.username, email);
    setCurrentUser(updatedUser);
    setLastUser(updatedUser);
    currentUserData = getCurrentUser();
    emailWarning.hidden = true;
    changeEmailButton.hidden = true;
    alert("Email succesfully updated.");
}
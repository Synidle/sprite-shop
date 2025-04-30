const userPfpButton = document.getElementById("user-pfp-button");
const userPfpIcon = document.getElementById("user-pfp-icon");

document.getElementById("home-button").addEventListener("click", function(){
    open("homepage.html", "_self");
});

document.getElementById("shop-button").addEventListener("click", function(){
    open("shop.html", "_self");
});

document.getElementById("casino-button").addEventListener("click", function(){
    open("casino.html", "_self");
});

userPfpButton.addEventListener("click", function() {
    document.getElementById("user-menu").classList.add("displayed");
});

userPfpButton.addEventListener("mouseover", function() {
    userPfpIcon.classList.remove("fa-solid");
    userPfpIcon.classList.add("fa-regular");
});

userPfpButton.addEventListener("mouseleave", function() {
    userPfpIcon.classList.remove("fa-regular");
    userPfpIcon.classList.add("fa-solid");
});

document.getElementById("user-menu").addEventListener("mouseleave", function() {
    document.getElementById("user-menu").classList.remove("displayed");
});

document.getElementById("profile-button").addEventListener("click", function() {
    open("profile.html", "_self");
});

document.getElementById("signout-button").addEventListener("click", function() {
    open("sign-in.html", "_self");
});
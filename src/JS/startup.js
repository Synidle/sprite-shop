let user = getLastUser();

/**
 * Runs in index.html.
 * Sign user in and take them to homepage
 * or send to sign up for new user.
 */

if (user == null) {
    open("src/Pages/signup.html", "_self");
}
else {
    setCurrentUser(user);
    open("src/Pages/homepage.html", "_self");
}
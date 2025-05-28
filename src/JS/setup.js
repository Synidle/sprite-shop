let user = getLastUser();

/**
 * Runs in all pages except index.
 * Checks if the user is signed in, and
 * if not redirects to login page.
 * If signed in, sets global variables.
 */

if (user == null)
    open("../Pages/sign-in.html", "_self");
else {
    setCurrentUser(user);
    apparel = getApparel();
    ownedBusinesses = getBusinesses();
}

// /**
//  * Sets balance to 0 if unset.
//  */

// if (localStorage.getItem(KEY_BALANCE) == null)
//     localStorage.setItem(KEY_BALANCE, 0);
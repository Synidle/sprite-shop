document.querySelector("#header").innerHTML = `
    <h1 id="page-title">SpriteShop</h1>
    <div id="icons">
        <!-- <img id="coin-img" src="Data/UI/coin.png" alt="balance"> -->
        <p id="coin-img" class="fa-solid fa-coins"></p>
        <p id="balance-num">£<span id=balance-num-val></span></p>
        <!-- <button id="user-pfp"><img src="Data/UI/user-pfp.png" alt="user profile picture"></button> -->
            <button id="user-pfp-button"><i id="user-pfp-icon" class="fa-solid fa-circle-user"></i></button>
    </div>
    <menu id="user-menu">
        <li><button id="profile-button"><i class="fa-solid fa-user"></i> Profile</button></li>
        <li><button id="settings-button" disabled><i class="fa-solid fa-gear"></i> Settings</button></li>
        <li><button id="signout-button"><i class="fa-solid fa-arrow-right-from-bracket"></i> Sign Out</button></li>
    </menu>
    <nav id="main-nav">
        <button id="home-button"><i class="fa-solid fa-house-chimney"></i><span class="nav-button-text"> Home</span></button>
        <button id="shop-button"><i class="fa-solid fa-shop"></i><span class="nav-button-text"> Shop</span></button>
        <button id="casino-button"><i class="fa-solid fa-heart"></i><span class="nav-button-text"> Casino</span></button>
        <button id="business-button"><i class="fa-solid fa-money-bill-trend-up"></i><span class="nav-button-text"> Business</span></button>
    </nav>
`;

updateBalanceHeader();

function updateBalanceHeader() {
    let balance = localStorage.getItem(KEY_BALANCE);
    let append;
    let i = 0;
    let mod = 3;
    let maxMod = 12;
    while (3 < balance.length && mod <= maxMod) {
        balance = balance.substring(0, balance.length-3);
        mod += 3;
        i ++;
    }
    append = ['', 'K', 'M', 'B', 'T'][i];
    document.getElementById("balance-num-val").innerHTML = 
        balance + append;
}
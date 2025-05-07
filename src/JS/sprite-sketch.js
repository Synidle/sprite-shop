let headImg;
let armsImg;
let torsoImg;
let legsImg;

function preload() {
    headImg = loadImage("../Sprite/head.png");
    armsImg = loadImage("../Sprite/arms.png");
    torsoImg = loadImage("../Sprite/torso.png");
    legsImg = loadImage("../Sprite/legs.png");
}

function setup() {

}

function draw() {
    image(headImg, 0, 0);
}
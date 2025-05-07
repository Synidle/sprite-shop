const FRAMERATE = 12;
const ANIMATION_SPEED = .0025;
const BASE_SIZE = 120;
const BACKGROUND_COLOUR = "#005c02"
const STANDARD_SPRITE_Y_OFFSET = 64;
const ADDITIONAL_SPRITE_Y_OFFSET = 2;

let canvas;
let scale = 3;

let headImg;
let armsImg;
let torsoImg;
let legsImg;

let counter = 0;
let spriteSize;
let spriteOffset = 0;

function preload() {
    headImg = loadImage("../Sprite/head.png");
    armsImg = loadImage("../Sprite/arms.png");
    torsoImg = loadImage("../Sprite/torso.png");
    legsImg = loadImage("../Sprite/legs.png");
}

function setup() {
    canvas = createCanvas(BASE_SIZE*scale, BASE_SIZE*scale);
    canvas.parent("canvas-holder");
    noStroke();
    noSmooth();
    imageMode(CENTER);
    frameRate(FRAMERATE);
}

function draw() {
    background(BACKGROUND_COLOUR);

    spriteSize = headImg.width * scale;
    spriteOffset = sin(counter * ANIMATION_SPEED) 
        * ADDITIONAL_SPRITE_Y_OFFSET;

    drawSpriteComponent(legsImg);
    drawSpriteComponent(torsoImg);
    drawSpriteComponent(armsImg, spriteOffset);
    drawSpriteComponent(headImg);

    counter += deltaTime;
}

function drawSpriteComponent(componentImage, yOffset=0)
{
    image(componentImage, width/2, (STANDARD_SPRITE_Y_OFFSET+yOffset)*scale, 
        spriteSize, spriteSize);
}
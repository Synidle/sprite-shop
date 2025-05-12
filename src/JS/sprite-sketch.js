const FRAMERATE = 12;
const ANIMATION_SPEED = .0025;
const BASE_SIZE = 120;
const BACKGROUND_COLOUR = "#005c02"
const STANDARD_SPRITE_Y_OFFSET = 64;
const ADDITIONAL_SPRITE_Y_OFFSET = 2;
const CLOTHING_SIZE = 32;

let canvas;
let scale = 1;

let headImg;
let armsImg;
let torsoImg;
let legsImg;

let spriteApparel = new Map();

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
    calculateScale();
    canvas = createCanvas(BASE_SIZE*scale, BASE_SIZE*scale);
    canvas.parent("canvas-holder");
    noStroke();
    noSmooth();
    imageMode(CENTER);
    frameRate(FRAMERATE);

    updateSpriteApparel(apparel);
}

function draw() {
    background(BACKGROUND_COLOUR);

    spriteSize = headImg.width * scale;
    spriteOffset = sin(counter * ANIMATION_SPEED) 
        * ADDITIONAL_SPRITE_Y_OFFSET;

    drawSpriteComponent(legsImg);
    drawSpriteComponent(torsoImg);
    drawSpriteComponent(armsImg, spriteOffset);
    drawClothing(ProductCategory.TORSO, 4, .75);
    drawClothing(ProductCategory.LEGS, 20, .5);
    drawClothing(ProductCategory.ACCESSORY, 4, .5);
    drawSpriteComponent(headImg);
    drawClothing(ProductCategory.HEAD, -28, .75);


    counter += deltaTime;
}

/**
 * 
 * @param {ProductCategory} category 
 * @param {number} additionalYOffset
 */
function drawClothing(category, additionalYOffset=0, scaleModifier=1) {
    if (spriteApparel.has(category))
        image(spriteApparel.get(category), width/2,
            (STANDARD_SPRITE_Y_OFFSET+additionalYOffset)*scale,
            CLOTHING_SIZE*scale*scaleModifier, CLOTHING_SIZE*scale*scaleModifier);
}

function windowResized() {
    let oldScale = scale;
    calculateScale();
    if (scale != oldScale)
        resizeCanvas(BASE_SIZE*scale, BASE_SIZE*scale);
}

/**
 * Calculates the value of the scale variable on the basis of 
 * the window's width.
 */
function calculateScale() {
    if (windowWidth > 600)
        scale = 3;
    else if (windowWidth <= 600)
        scale = 2;
}

/**
 * Draws a part of the sprite.
 * @param {Image} componentImage part to draw.
 * @param {number} yOffset offset from the standard sprite Y-offset.
 */
function drawSpriteComponent(componentImage, yOffset=0) {
    image(componentImage, width/2, (STANDARD_SPRITE_Y_OFFSET+yOffset)*scale, 
        spriteSize, spriteSize);
}

/**
 * 
 * @param {Map<ProductCategory,Product>} apparel 
 */
function updateSpriteApparel(apparel) {
    apparel.forEach(spriteWearItem);
}

/**
 * 
 * @param {Product} item 
 * @param {ProductCategory} category
 */
function spriteWearItem(item, category) {
    loadImage(item.imagePath, (image) => {
        spriteApparel.set(category, image);
    });
}

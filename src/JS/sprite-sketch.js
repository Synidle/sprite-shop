const FRAMERATE = 12;
const ANIMATION_SPEED = .0025;
const BASE_SIZE = 120;
const BACKGROUND_COLOUR = "#fcc15b"
const STANDARD_SPRITE_Y_OFFSET = 64;
const ADDITIONAL_SPRITE_Y_OFFSET = 2;
const CLOTHING_SIZE = 32;

let canvas;
let globalScaleModifier = 1;

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
    canvas = createCanvas(
        BASE_SIZE*globalScaleModifier, 
        BASE_SIZE*globalScaleModifier);
    canvas.parent("canvas-holder");
    noStroke();
    noSmooth();
    imageMode(CENTER);
    frameRate(FRAMERATE);

    updateSpriteApparel(apparel);
}

function draw() {
    background(BACKGROUND_COLOUR);

    spriteSize = headImg.width * globalScaleModifier;
    spriteOffset = sin(counter * ANIMATION_SPEED) 
        * ADDITIONAL_SPRITE_Y_OFFSET;

    drawSpriteComponent(legsImg);
    drawClothing(ProductCategory.FEET, 24, .5, 8);
    // Draw flipped shoe.
    push(); translate(width, 0); scale(-1, 1);
    drawClothing(ProductCategory.FEET, 24, .5, 8); pop();
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
function drawClothing(category, additionalYOffset=0, scaleModifier=1, xOffset=0) {
    if (spriteApparel.has(category)) {
        image(spriteApparel.get(category), 
            width/2 + (xOffset*globalScaleModifier),
            (STANDARD_SPRITE_Y_OFFSET+additionalYOffset)*globalScaleModifier,
            CLOTHING_SIZE*globalScaleModifier*scaleModifier, 
            CLOTHING_SIZE*globalScaleModifier*scaleModifier);
    }
}

function windowResized() {
    let oldScale = globalScaleModifier;
    calculateScale();
    if (globalScaleModifier != oldScale)
        resizeCanvas(BASE_SIZE*globalScaleModifier, BASE_SIZE*globalScaleModifier);
}

/**
 * Calculates the value of the scale variable on the basis of 
 * the window's width.
 */
function calculateScale() {
    if (windowWidth > 600)
        globalScaleModifier = 3;
    else if (windowWidth <= 600)
        globalScaleModifier = 2;
}

/**
 * Draws a part of the sprite.
 * @param {Image} componentImage part to draw.
 * @param {number} yOffset offset from the standard sprite Y-offset.
 */
function drawSpriteComponent(componentImage, yOffset=0) {
    image(componentImage, width/2, 
        (STANDARD_SPRITE_Y_OFFSET+yOffset)*globalScaleModifier, 
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

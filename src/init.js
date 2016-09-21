
// Set true to show FPS
var DEBUGMODE = true

// Set to scale pixel art
PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;

// Main Stage
var stage = new PIXI.Container();

// create a renderer instance.
var renderer = PIXI.autoDetectRenderer(screenWidth, screenHeight, {backgroundColor : 0x1099bb});

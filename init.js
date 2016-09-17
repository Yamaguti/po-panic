
var stage = new PIXI.Container();

var screenWidth  = 960
var screenHeight = 540

var centerX = screenWidth/2
var centerY = screenHeight/2

var screenBottom = screenWidth
var screenHeight = screenHeight

var projectPath = "http://localhost:8000/"

// create a renderer instance.
var renderer = PIXI.autoDetectRenderer(screenWidth, screenHeight, {backgroundColor : 0x1099bb});

PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;
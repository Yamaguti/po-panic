
PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;

var stage = new PIXI.Container();

var screenWidth  = 960
var screenHeight = 540

var centerX = screenWidth/2
var centerY = screenHeight/2

var screenBottom = screenHeight
var screenRight  = screenWidth
var screenTop    = 0
var screenLeft   = 0


var projectPath = "http://localhost:8000/"

// create a renderer instance.
var renderer = PIXI.autoDetectRenderer(screenWidth, screenHeight, {backgroundColor : 0x1099bb});


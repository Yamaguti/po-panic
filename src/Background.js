

var GameBackground = {}


// GameBackground. = function() {

// }


GameBackground.newBackground = function () {
    var texture = PIXI.Texture.fromImage('assets/Background/background.png');
    var background = new PIXI.Sprite(texture);

    // center the sprite's anchor point
    background.anchor.x = 0.5;
    background.anchor.y = 0.5;

    background.position.x = centerX
    background.position.y = centerY

    background.scale.x = 2
    background.scale.y = 2

    return background
}

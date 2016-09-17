

function newBackground() {
    var texture = PIXI.Texture.fromImage('assets/background.png');
    // create a new Sprite using the texture
    var background = new PIXI.Sprite(texture);

    // center the sprite's anchor point
    background.anchor.x = 0.5;
    background.anchor.y = 0.5;

    background.position.x = centerX
    background.position.y = centerY

    background.scale.x = 4
    background.scale.y = 4

    // move the sprite to the center of the scree
    stage.addChild(background);
}

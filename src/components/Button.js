

var Button = {}

Button.newButton = function(spritePath, buttonParams) {
    var texture = PIXI.Texture.fromImage(spritePath);
    var sprite  = new PIXI.Sprite(texture);

    sprite.interactive = true

    sprite.scale.x  = 2
    sprite.scale.y  = 2

    sprite.anchor.x = 0.5
    sprite.anchor.y = 0.5

    sprite.mousedown = function(mouseData) {
        sprite.scale.x = 1.8
        sprite.scale.y = 1.8
    }

    sprite.mouseup = function(mouseData) {
        sprite.scale.x = 2
        sprite.scale.y = 2
        if (buttonParams.onRelease)
            buttonParams.onRelease()
    }

    return sprite
}

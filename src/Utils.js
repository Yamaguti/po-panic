
var Utils = {}

Utils.newImage = function newImage(params) {
    var texture = PIXI.Texture.fromImage(params.name);
    var sprite   = new PIXI.Sprite(texture);

    sprite.position.x = (params.x || 0)
    sprite.position.y = (params.y || 0)

    sprite.scale.x    = 2
    sprite.scale.y    = 2
    sprite.anchor.x = 0.5
    sprite.anchor.y = 0.5

    return sprite
}

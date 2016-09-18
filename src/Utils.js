
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

Utils.newRandomString = function() {
    return Math.random().toString(36).substring(7);
}


// Thanks to http://stackoverflow.com/questions/22073350/draw-a-rectangle-with-pixi-js
Utils.newRectangle = function(x, y, width, height, params) {
    params = params || {}

    var graphics = new PIXI.Graphics();

    if (params.color != null) {
        graphics.beginFill(params.color);
    }

    // set the line style to have a width of 5 and set the color to red
    graphics.lineStyle(params.strokeWidth || 2, params.strokeColor || 0x000000);

    // draw a rectangle
    graphics.drawRect(x, y, width, height);

    return graphics;
}

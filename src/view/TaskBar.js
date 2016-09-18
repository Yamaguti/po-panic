
var TaskBar = {}


TaskBar.new = function() {
    var barContainer = new PIXI.Container()

    var bar = new PIXI.Sprite(PIXI.Texture.fromImage('assets/Hud/timer_holder.png'));
    barContainer.addChild(bar)

    var fill = new PIXI.Sprite(PIXI.Texture.fromImage('assets/Hud/timer_fill.png'));
    barContainer.addChild(fill)
    barContainer.fill = fill

    fill.anchor.x = 0.4
    fill.position.x = 35
    fill.position.y = 11


    return barContainer
}


var TaskBar = {}


TaskBar.new = function() {
    var barContainer = new PIXI.Container()

    var holder = new PIXI.Sprite(PIXI.Texture.fromImage('assets/Hud/timer_holder.png'));
    barContainer.addChild(holder)
    holder.anchor.x = 0.5

    holder.scale.x = 2
    holder.scale.y = 2

    var holder_size = 154

    var fill = new PIXI.Sprite(PIXI.Texture.fromImage('assets/Hud/timer_fill.png'));
    barContainer.addChild(fill)
    barContainer.fill = fill

    fill.scale.x = 2
    fill.scale.y = 2

    // Magic values, found by trial and error.
    fill.anchor.x = 0
    fill.position.x = 12 - holder_size*0.5
    fill.position.y = 16


    barContainer.setValue = function(percent) {
        if (barContainer.fill) {
            barContainer.fill.width = 130*percent
        }
    }

    barContainer.update = function() {
        barContainer.setValue(ChoiceManager.getElapsedFraction())
    }


    return barContainer
}


var TaskBar = {}


TaskBar.new = function() {
    var barContainer = new PIXI.Container()

    var holder = new PIXI.Sprite(PIXI.Texture.fromImage('assets/Hud/timer_holder.png'));
    barContainer.addChild(holder)
    holder.anchor.x = 0.5

    var holder_size = 77

    var fill = new PIXI.Sprite(PIXI.Texture.fromImage('assets/Hud/timer_fill.png'));
    barContainer.addChild(fill)
    barContainer.fill = fill

    // Magic values, found by trial and error.
    fill.anchor.x = 0
    fill.position.x = 6 - holder_size*0.5
    fill.position.y = 8


    barContainer.setValue = function(percent) {
        if (barContainer.fill) {
            barContainer.fill.width = 65*percent
        }
    }

    barContainer.update = function() {
        barContainer.setValue(ChoiceManager.getElapsedFraction())
    }


    return barContainer
}

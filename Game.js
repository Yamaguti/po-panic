
function update(dt){
    TimerManager.update()
    Revenue.update(dt)
    Hud.updateRevenueBar()
}


var Game = {}
Game.gameStart = function gameStart() {
    newBackground()

    var popup = newPopup()
    popup.showPopup()

    loader.load();

    Revenue.createText()
    Hud.createRevenueBar()
}

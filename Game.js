
function update(dt){
    TimerManager.update()
    Revenue.update(dt)
    Hud.updateRevenueBar()
}


var Game = {}
function gameStart() {
    newBackground()

    var popup = newPopup()
    popup.showPopup()

    loader.load();

    Revenue.createText()
    Hud.createRevenueBar()
}


Game.gameStart = gameStart

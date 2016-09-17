
function update(dt){
    TimerManager.update()
    Revenue.update(dt)
}


var Game = {}
function gameStart() {
    newBackground()

    var popup = newPopup()
    popup.showPopup()

    loader.load();
}


Game.gameStart = gameStart

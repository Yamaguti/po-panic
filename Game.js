
var Game = {}


Game.newGame = function newGame() {
    var background  = newBackground()
    Game.background = background
    stage.addChild(background);

    var popup = newPopup()
    popup.showPopup()

    loader.load();

    Revenue.createText()
    Hud.createRevenueBar()

    // Game.background.fadeOut()
}

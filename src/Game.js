
var Game = {}


Game.newGame = function newGame() {
    var background  = newBackground()
    Game.background = background
    stage.addChild(background);

    ChoicesScreen.showPlayerOptions(0)

    loader.load();

    Revenue.createText()
    Hud.createRevenueBar()

    // Game.background.fadeOut()
}

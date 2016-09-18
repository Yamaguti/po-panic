
var Game = {}


Game.newGame = function newGame() {
    var background  = newBackground()
    Game.background = background
    stage.addChild(background);

    loader.load();

    Revenue.createText()
    Hud.createRevenueBar()

    // very gambs
    Hud.setUpdate()
    Revenue.setUpdate()

    Game.elapsedTime = 0

    for(i = 1; i < 5; i++) {
        Devguy.new(i)
    }

    // Game.background.fadeOut()
<<<<<<< HEAD
    ChoicesScreen.showPlayerOptions(0)

=======
    ChoiceManager.start()
>>>>>>> de6439f662b6559d97150948c565fc7febf3d6f6
}

Game.update = function(dt){
    Game.elapsedTime += dt/1000
    if (gameConfig && gameConfig.gameConfigs.gameTime <= Game.elapsedTime){
        // such gambs, very broken, refresh plz
        console.log("stahp")
        // update = function(){}
        Game.pause(true)
    }
}


Game.pause = function (pauseStatus) {
    Game.paused = pauseStatus
}

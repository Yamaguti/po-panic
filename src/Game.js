
var Game = {}


Game.newGame = function newGame() {
    var background  = newBackground()
    Game.background = background
    stage.addChild(background);

    ChoicesScreen.showPlayerOptions(0)

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
}

Game.update = function(dt){
    Game.elapsedTime += dt/1000
    if (gameConfig && gameConfig.gameConfigs.gameTime <= Game.elapsedTime){
        // such gambs, very broken, refresh plz
        console.log("stahp")
        update = function(){}
    }
}

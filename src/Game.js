
var Game = {}

var GAME_FINISHED = "finished";
var GAME_STARTED = "started";

Game.newGame = function newGame() {
    var content = new PIXI.Container()
    Game.content = content
    stage.addChild(content)

    Revenue.createText()

    var background  = newBackground()
    Game.background = background
    Game.content.addChild(background);

    loader.load();

    Revenue.createText()
    Hud.createRevenueBar()

    var bar = TaskBar.new()
    Game.content.addChild(bar)
    Game.taskbar = bar

    bar.position.x = centerX
    bar.position.y = screenBottom - 80


    // very gambs
    Hud.setUpdate()
    Revenue.setUpdate()

    Game.elapsedTime = 0

    for(i = 1; i < 5; i++) {
        Devguy.new(i)
    }

    // Game.background.fadeOut()
    // ChoiceManager.start()
    TutorialScreen.showTutorial(0);
    Game.status = GAME_STARTED;
    NotificationManager.register("endGame", Game.finish)
}

Game.update = function(dt){
    if(Game.status == GAME_FINISHED)
        return;

    Game.elapsedTime += dt/1000
    if (Game.taskbar) {
        Game.taskbar.update()
    }

    if (gameConfig && gameConfig.gameConfigs.gameTime <= Game.elapsedTime){
        // such gambs, very broken, refresh plz
        console.log("stahp")
        // update = function(){}
        Game.pause(true)
    }
}

Game.finish = function()
{
    NotificationManager.deregister("endGame", Game.finish)
    Game.status = GAME_FINISHED;
    EndGameScreen.showEnding(true);
}


Game.pause = function (pauseStatus) {
    Game.paused = pauseStatus
}

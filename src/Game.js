
var Game = {}

var GAME_FINISHED = "finished";
var GAME_STARTED = "started";

Game.newGame = function newGame() {
    var content = new PIXI.Container()
    Game.content = content
    stage.addChild(content)

    Revenue.createText()

    GameBackground.newBackground()

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

    // ChoiceManager.start()
    TutorialScreen.showTutorial(0);
    Game.status = GAME_STARTED;
    NotificationManager.register("endGame", Game.finish)

    //
    // BGM

    var bgm = AudioLib.playOnLoop('assets/Sounds/bgm/jump higher run faster.ogg')

    NotificationManager.register("newMonth", function(month) {
        if (month == 12) {
            TimerManager.startTimer(3000, function(){
                AudioLib.playSFX("assets/Sounds/sfx/Mario World - Hurry Up!.mp3", function() {
                    bgm.playbackRate = 1.5;
                })
            })
        }
    })

    NotificationManager.register("BGMButtonPressed", function(month) {
        bgm.volume = 1-bgm.volume
    })

    NotificationManager.register("StopBGM", function() {
        bgm.pause()
    })


    //
    // Sound Button

    var soundButton = MultipressButton.new("assets/Hud/bt_sound_on.png", {
        "onRelease": function() {
            NotificationManager.notify("BGMButtonPressed")
        },
    })
    soundButton.position.x = screenRight  - 50
    soundButton.position.y = screenBottom - 50
    content.addChild(soundButton)

    NotificationManager.register("newMonth", function(month) {
        if (month == 12) {
            GameBackground.startAnimation()
        }
    })
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

Game.finish = function(goal)
{
    NotificationManager.deregister("endGame", Game.finish)
    Game.status = GAME_FINISHED;
    if(goal >=1)
        EndGameScreen.showEnding(true);
    else
       EndGameScreen.showEnding(false);
}


var mutex = 0
Game.pause = function (pauseStatus) {
    if (pauseStatus) {
        mutex += 1
    } else {
        mutex -= 1
    }

    if (Game.paused != pauseStatus) {
        Game.paused = mutex > 0
    }
}

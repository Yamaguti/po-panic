

var HomeScreen = {}


HomeScreen.showHome = function() {
    var texture = PIXI.Texture.fromImage('assets/Home/home.png');
    // create a new Sprite using the texture
    var background = new PIXI.Sprite(texture);

    // center the sprite's anchor point
    background.anchor.x = 0.5;
    background.anchor.y = 0.5;

    background.position.x = centerX
    background.position.y = centerY

    background.scale.x = 2
    background.scale.y = 2

    stage.addChild(background);

    HomeScreen.background = background
}


HomeScreen.finish = function(callback){
    TransitionManager.startTransition(HomeScreen.playButton.scale, {
        "x" : 0.001,
        "y" : 0.001,
        "time" : 500,
        "easing" : "inBack",
        "onComplete" : function() {
            if (callback) {
                callback()
            }
            HomeScreen.background.destroy()
            HomeScreen.playButton.destroy()
        }
    })
}



HomeScreen.setGameAvailable = function() {
    var button = Button.newButton("assets/Home/bt_play.png", {
        "onRelease" : function() {
            HomeScreen.finish(Game.gameStart)
        }
    })

    button.scale.x = 0.001
    button.scale.y = 0.001
    HomeScreen.playButton = button

    TransitionManager.startTransition(button.scale, {
        "x" : 2,
        "y" : 2,
        "time" : 500,
        "easing" : "outBack"
    })

    button.position.x = centerX
    button.position.y = centerY
    stage.addChild(button);
}





var HomeScreen = {}


HomeScreen.showHome = function() {
    var content = new PIXI.Container()
    stage.addChild(content);

    // Adding Background
    var background = Utils.newImage({
        "name" : 'assets/Home/home.png',
        "x"    : centerX,
        "y"    : centerY
    })
    content.addChild(background);

    HomeScreen.content = content
}


HomeScreen.finish = function(callback) {
    var content = HomeScreen.content
    TransitionManager.startTransition(content.playButton.scale, {
        "x" : 0.001,
        "y" : 0.001,
        "time" : 500,
        "easing" : "inBack",
        "onComplete" : function() {
            content.destroy()
            if (callback) { callback(); }
        }
    })
}



HomeScreen.setGameAvailable = function() {
    var playButton = Button.newButton("assets/Home/bt_play.png", {
        "onRelease" : function() {
            HomeScreen.finish(Game.newGame)
        }
    })
    var content = HomeScreen.content
    content.playButton = playButton
    HomeScreen.content.addChild(playButton);

    playButton.scale.x = 0.001
    playButton.scale.y = 0.001

    TransitionManager.startTransition(playButton.scale, {
        "x" : 2,
        "y" : 2,
        "time" : 500,
        "easing" : "outBack"
    })

    playButton.position.x = centerX
    playButton.position.y = screenBottom - 80
}

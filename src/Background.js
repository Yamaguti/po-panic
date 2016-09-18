

var GameBackground = {}


GameBackground.startAnimation = function() {
    var background      = GameBackground.background
    var background_fire = GameBackground.background_fire

    TransitionManager.startTransition(background_fire, {
        "time" : 300,
        "easing" : "outBounce",
        "alpha" : 1,
        "onComplete": function() {
            TimerManager.startTimer(50, function() {
                TransitionManager.startTransition(background_fire, {
                    "time" : 130,
                    "easing" : "outBounce",
                    "alpha" : 0.5,
                    "onComplete":function() {
                        TimerManager.startTimer(50, function() {
                            TransitionManager.startTransition(background_fire, {
                                "time" : 300,
                                "easing" : "outBounce",
                                "alpha" : 1,
                            })
                        })
                    }
                })
            })
        }
    })
}


GameBackground.newBackground = function () {
    var texture = PIXI.Texture.fromImage('assets/Background/background.png');
    var background = new PIXI.Sprite(texture);

    var texture = PIXI.Texture.fromImage('assets/Background/background_fire.png');
    var background_fire = new PIXI.Sprite(texture);

    GameBackground.background = background
    GameBackground.background_fire = background_fire

    background.anchor.x   = 0.5;
    background.anchor.y   = 0.5;
    background.position.x = centerX
    background.position.y = centerY
    background.scale.x    = 2
    background.scale.y    = 2
    Game.content.addChild(background);

    background_fire.anchor.x   = 0.5;
    background_fire.anchor.y   = 0.5;
    background_fire.position.x = centerX
    background_fire.position.y = centerY
    background_fire.scale.x    = 2
    background_fire.scale.y    = 2
    Game.content.addChild(background_fire);

    background_fire.alpha = 0
}

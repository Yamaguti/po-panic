

var GameBackground = {}


GameBackground.startAnimation = function() {
    var background      = GameBackground.background
    var background_fire = GameBackground.background_fire


    function changeBackgroundAlpha() {
        background.alpha      = 1 - background.alpha
        background_fire.alpha = 1 - background_fire.alpha
    }


    var current = 0
    var listTimes = [
        20,
        50,
        50,
        200,
        200,
        300,
        300,
        500,
        5000,
    ]

    for (i = 0; i < listTimes.length; i ++) {
        current += listTimes[i]
        TimerManager.startTimer(current, changeBackgroundAlpha)
    }
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

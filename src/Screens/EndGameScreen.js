
var EndGameScreen = {}

EndGameScreen.descriptionTextStyle = {fontFamily : 'gameFont',     fill: '#EEEEEE',fontSize: 30, align : 'center', wordWrap : true, wordWrapWidth : 500, }


EndGameScreen.showEnding = function(good) {
    var content = new PIXI.Container();
    EndGameScreen.content = content;
    stage.addChild(content)

    // create boat textures
    var sprites = []
    if(good){
        for (i = 1; i < 9; i++){
            var sfx    = AudioLib.playSFX("assets/Sounds/sfx/game-win-vignette.mp3");
            sfx.volume = 0.3
            NotificationManager.notify("StopBGM")
            sprites[i] = 'assets/boat_win/boat_win_0' + Math.floor(i/10).toFixed(0) + (i%10) +  '.png'
        }
    } else {
        for (i = 1; i < 46; i++){
            var loseSFX = AudioLib.playSFX("assets/Sounds/sfx/game-lose-vignette.mp3");
            loseSFX.volume = 0.5
            NotificationManager.notify("StopBGM")
            sprites[i] = 'assets/boat_fail/boat_fail_0' + Math.floor(i/10).toFixed(0) + (i%10) +  '.png'
        }
    }

    var textureArray = [];
    EndGameScreen.boatTextureArray = textureArray;

    for (var i = 1; i < sprites.length; i++) {
         var texture = PIXI.Texture.fromImage(sprites[i]);
         textureArray.push(texture);
    };

    var background = Utils.newRectangle(0, 0, screenWidth, screenHeight, {
        "color": 0x000000,
    })
    content.addChild(background)
    background.alpha = 0.75
    EndGameScreen.background = background

    var holder = Utils.newImage({
        "name": "assets/EndGame/endgame_holder.png",
    })
    holder.x = centerX;
    holder.y = centerY;
    content.addChild(holder)

    // Title
    var title = null;
    if(good){
        title = Utils.newImage({
            "name": "assets/EndGame/endgame_win.png",
        })
    }else{
        title = Utils.newImage({
            "name": "assets/EndGame/endgame_fail.png",
        })
    }
    title.x = centerX;
    title.y = centerY - 80;
    content.addChild(title)

    var gameResult = null;

    if(good) {
        gameResult = "You managed to reach the revenue goal! We are all going to cruise, baby!"
    } else {
        gameResult = "You failed to reach the revenue goal...Maybe a lunch at the grandmother's restaurant?"
    }


    // Description
    var question = new PIXI.Text(gameResult, EndGameScreen.descriptionTextStyle);
    content.addChild(question)
    question.position.x = holder.position.x - question.width/2;
    question.position.y = holder.position.y;


    // Confirm button
    var button = Button.newButton("assets/ChoicesScreen/bt_doit.png", {
        "onRelease": function() {
            EndGameScreen.restart()
        },
    })

    button.position.x = centerX;
    button.position.y = holder.position.y + 103
    content.addChild(button)

    // Create boat instance
    var boat = new PIXI.extras.MovieClip(EndGameScreen.boatTextureArray);
    boat.animationSpeed = 0.3
    boat.scale.x = 2;
    boat.scale.y = 2;
    boat.x = centerX - 120;
    boat.y = 10;
    boat.play()

    content.addChild(boat);
}



EndGameScreen.restart = function(index) {
	location.reload();
}

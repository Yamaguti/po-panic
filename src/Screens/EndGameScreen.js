
var EndGameScreen = {}

var descriptionTextStyle = {fontFamily : 'gameFont',     fill: '#EEEEEE',fontSize: 30, align : 'center', wordWrap : true, wordWrapWidth : 500, }


EndGameScreen.showEnding = function(good) {

    var content = new PIXI.Container();
    EndGameScreen.content = content;

    var background = Utils.newRectangle(0, 0, screenWidth, screenHeight, {
        "color": 0x000000,
    })
    content.addChild(background)
    background.alpha = 0
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
    title.y = centerY - 100;
    content.addChild(title)

    var gameResult = null;
    if(good)
        gameResult = "You managed to reach the revenue goal! We are all going to cruise, baby!"
    else
        gameResult = "You failed to reach the revenue goal...Maybe a lunch at the grandmother's restaurant?"

    // Description
    EndGameScreen.question = new PIXI.Text(gameResult, descriptionTextStyle);
    content.addChild(EndGameScreen.question)
    EndGameScreen.question.position.x = holder.position.x - EndGameScreen.question.width/2;
    EndGameScreen.question.position.y = holder.position.y;


    ///confirm button
    EndGameScreen.button = Button.newButton("assets/ChoicesScreen/bt_doit.png", {
        "onRelease": function() {
            EndGameScreen.restart()
        },
    })

    EndGameScreen.button.position.x = centerX;
    EndGameScreen.button.position.y = holder.position.y + 103
    content.addChild(EndGameScreen.button)


    stage.addChild(content)
}

EndGameScreen.restart = function(index)
{
	location.reload();
}

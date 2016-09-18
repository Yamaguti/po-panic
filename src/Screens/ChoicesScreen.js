
var ChoicesScreen = {}


var titleTextStyle       = {fontFamily : 'gameFontBold', fill: Colors.orange, fontSize: 38, align : 'center', }
var headerTextStyle      = {fontFamily : 'gameFont',     fill: Colors.white,  fontSize: 30, align : 'left', wordWrap:true, wordWrapWidth: screenWidth - 80}
var descriptionTextStyle = {fontFamily : 'gameFont',     fill: Colors.white,  fontSize: 30, align : 'center', }
var riskTextStyle        = {fontFamily : 'gameFont',     fill: Colors.red,    fontSize: 30, align : 'center', }
var rewardTextStyle      = {fontFamily : 'gameFont',     fill: Colors.yellow, fontSize: 30, align : 'center', }

//
// Private Methods
//

ChoicesScreen.selectChoice = function(index) {
    ChoicesScreen.animateOut()
    ChoiceManager.selectChoice(index)
}


ChoicesScreen.newAnswerButton = function(params, index) {
    var group = new PIXI.Container();
    params = params || {}

    // Holder
    var holder = Utils.newImage({
        "name": "assets/ChoicesScreen/action_cell.png",
    })
    group.addChild(holder)

    // Button
    var button = Button.newButton("assets/ChoicesScreen/bt_doit.png", {
        "onRelease": function() {
            ChoicesScreen.selectChoice(index)
        }
    })

    button.position.x = holder.position.x
    button.position.y = holder.position.y + 103
    group.addChild(button)


    // Title
    var title = new PIXI.Text(params.option.text, titleTextStyle);
    group.addChild(title)
    title.position.x = holder.position.x;
    title.position.y = holder.position.y - 105;

    title.anchor.x = 0.5
    title.anchor.y = 0.5

    var descriptionY       = holder.position.y - 30
    var descriptionYOffset = 28

    // Descriptions
    var risk = new PIXI.Text("risk: " + params.option.risk + " %", riskTextStyle);
    group.addChild(risk)
    risk.position.x = holder.position.x - 83;
    risk.position.y = descriptionY;

    risk.anchor.x = 0
    risk.anchor.y = 0.5
    descriptionY  = descriptionY + descriptionYOffset;


    var reward = new PIXI.Text("reward: +" + params.option.reward + " $", rewardTextStyle);
    group.addChild(reward)
    reward.position.x = holder.position.x - 83;
    reward.position.y = descriptionY;

    reward.anchor.x = 0
    reward.anchor.y = 0.5
    descriptionY    = descriptionY + descriptionYOffset;


    // Description
    var time = new PIXI.Text("time: " + params.option.time + " s", descriptionTextStyle);
    group.addChild(time)
    time.position.x = holder.position.x - 83;
    time.position.y = descriptionY;

    time.anchor.x = 0
    time.anchor.y = 0.5

    // Animation

    group.scale.x = 0.001
    group.scale.y = 0.001
    group.animateIn = function() {
        TransitionManager.startTransition(group.scale, {
            "time": 400,
            "x" : 1,
            "y" : 1,
            "easing" : "outBack",
        })
    }

    group.animateOut = function() {
        TransitionManager.startTransition(group.scale, {
            "time": 400,
            "x" : 0.001,
            "y" : 0.001,
            "easing" : "inBack",
        })
    }

    return group
}


ChoicesScreen.animateIn = function() {
    for (i = 0; i < 3; i++) {

        var getCallback = function(index) {
            return function() {
                var button = ChoicesScreen.buttons[index]
                button.animateIn()
            }
        }

        TimerManager.startTimer(200*i, getCallback(i))
    }

    TransitionManager.startTransition(ChoicesScreen.background, {
        "time": 400,
        "alpha": 0.5,
    })

    ChoicesScreen.header.animateIn()

    Game.pause(true)
}


ChoicesScreen.animateOut = function() {
    for (i = 0; i < 3; i++) {

        var getCallback = function(index) {
            return function() {
                var button = ChoicesScreen.buttons[index]
                button.animateOut()
            }
        }

        TimerManager.startTimer(200*i, getCallback(i))
    }

    TransitionManager.startTransition(ChoicesScreen.background, {
        "time": 800,
        "alpha": 0,
        "onComplete" : function(){
            ChoicesScreen.content.destroy()
        }
    })

    ChoicesScreen.header.animateOut()

    Game.pause(false)
}



ChoicesScreen.newHeader = function(question) {
    var group = new PIXI.Container()

    var header = Utils.newImage({
        "name": "assets/ChoicesScreen/txt_holder.png"
    })
    group.addChild(header)

    group.position.x = centerX
    group.position.y = screenTop + 80

    group.scale.x  = 0.001
    group.scale.y  = 0.001


    //
    // Text
    var text = new PIXI.Text(question, headerTextStyle);
    group.addChild(text)
    text.position.x = -centerX + 50;
    text.position.y = header.position.y;

    text.anchor.x = 0
    text.anchor.y = 0.5


    // Animation
    group.animateIn = function() {
        TransitionManager.startTransition(group.scale, {
            "time": 400,
            "x" : 1,
            "y" : 1,
            "easing" : "outBack",
        })
    }

    group.animateOut = function() {
        TransitionManager.startTransition(group.scale, {
            "time": 400,
            "x" : 0.001,
            "y" : 0.001,
            "easing" : "inBack",
        })
    }

    return group
}



//
// Class
//

ChoicesScreen.showPlayerOptions = function(index) {
    var content = new PIXI.Container();
    ChoicesScreen.content = content;

    var config = gameQuestions.playerOptions[index]

    // Background for fade
    var background = Utils.newRectangle(0, 0, screenWidth, screenHeight, {
        "color": 0x000000,
    })
    content.addChild(background)
    background.alpha = 0
    ChoicesScreen.background = background

    // Header
    var header = ChoicesScreen.newHeader(config.question)
    content.addChild(header)
    ChoicesScreen.header = header

    // Actual choices for fade
    ChoicesScreen.buttons = []
    for (i = 0; i < 3; i++) {
        var option = config.options[i];
        var group = ChoicesScreen.newAnswerButton({
            "option" : option,
        }, i)
        content.addChild(group)

        group.position.x = centerX - (i - 1) * 240
        group.position.y = centerY + 50

        ChoicesScreen.buttons[i] = group
    }

    ChoicesScreen.animateIn()
    stage.addChild(content)
}

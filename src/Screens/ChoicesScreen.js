
var ChoicesScreen = {}


var titleTextStyle       = {fontFamily : 'gameFontBold', fill: '#FE8C36',fontSize: 38, align : 'center', }
var descriptionTextStyle = {fontFamily : 'gameFont',     fill: '#EEEEEE',fontSize: 30, align : 'center', }


ChoicesScreen.newAnswerButton = function(params) {
    var group = new PIXI.Container();
    params = params || {}

    // Holder
    var holder = Utils.newImage({
        "name": "assets/ChoicesScreen/action_cell.png",
    })
    group.addChild(holder)

    // Button
    var button = Button.newButton("assets/ChoicesScreen/bt_doit.png", {
        "onRelease": params.onRelease,
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
    var risk = new PIXI.Text("risk: " + params.option.risk + " %", descriptionTextStyle);
    group.addChild(risk)
    risk.position.x = holder.position.x - 83;
    risk.position.y = descriptionY;

    risk.anchor.x = 0
    risk.anchor.y = 0.5
    descriptionY  = descriptionY + descriptionYOffset;


    var reward = new PIXI.Text("reward: " + params.option.reward + " %", descriptionTextStyle);
    group.addChild(reward)
    reward.position.x = holder.position.x - 83;
    reward.position.y = descriptionY;

    reward.anchor.x = 0
    reward.anchor.y = 0.5
    descriptionY    = descriptionY + descriptionYOffset;


    // Description
    var time = new PIXI.Text("time: " + params.option.time + " %", descriptionTextStyle);
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


ChoicesScreen.showPlayerOptions = function(index) {
    var content = new PIXI.Container();

    var background = Utils.newRectangle(0, 0, screenWidth, screenHeight, {
        "color": 0x000000,
    })
    content.addChild(background)
    background.alpha = 0
    ChoicesScreen.background = background

    ChoicesScreen.buttons = []
    for (i = 0; i < 3; i++) {
        var option = gameQuestions.playerOptions[index].options[i];
        var group = ChoicesScreen.newAnswerButton({
            "option" : option,
        })
        content.addChild(group)

        group.position.x = centerX - (i - 1) * 240
        group.position.y = centerY

        ChoicesScreen.buttons[i] = group
    }

    ChoicesScreen.animateIn()
    TimerManager.startTimer(2000, function(){
        ChoicesScreen.animateOut()
    })
    stage.addChild(content)
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
        "time": 400,
        "alpha": 0,
    })

    Game.pause(false)
}


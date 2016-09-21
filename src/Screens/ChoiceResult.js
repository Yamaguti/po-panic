
var ChoiceResult = {}

var footerTextStyle = {fontFamily : 'gameFont',     fill: '#EEEEEE',fontSize: 30, align : 'left', wordWrap:true, wordWrapWidth: screenWidth - 220}
var titleresultTextStyle = {fontFamily : 'gameFont',     fill: '#EEEEEE',fontSize: 40, align : 'left'}
var goodTextStyle = {fontFamily : 'gameFont',     fill: '#15ee99',fontSize: 40, align : 'left', wordWrap:true, wordWrapWidth: screenWidth - 180}
var badTextStyle = {fontFamily : 'gameFont',     fill: '#ff3d58',fontSize: 40, align : 'left', wordWrap:true, wordWrapWidth: screenWidth - 180}


//
// Private Methods
//

ChoiceResult.newFooter = function(msgText, question, isGood, reward) {
    Game.pause(true);
    var group = new PIXI.Container()

    var header = Utils.newImage({
        "name": "assets/EventScreen/event_holder.png"
    })
    group.addChild(header)

    group.position.x = centerX;
    group.position.y = centerY;

    group.scale.x  = 0.001
    group.scale.y  = 0.001


    //
    // Question
    var question = new PIXI.Text(question, titleresultTextStyle);
    group.addChild(question)
    question.position.y = -120;
    question.position.x = -question.width/2;


    var result = null;
    if(isGood){
        result = new PIXI.Text("GOOD! +" + reward + "$/s", goodTextStyle);
    }else{
        result = new PIXI.Text("TOO BAD!", badTextStyle);
    }

    group.addChild(result)
    result.position.y = -50;
    result.position.x = -result.width/2;

    // Text
    var text = new PIXI.Text(msgText, footerTextStyle);
    group.addChild(text)
    text.position.y = 40;
    text.position.x = -text.width/2;
    text.anchor.y = 0.5


    // Animation
    group.animateIn = function() {
        AudioLib.playSFX("assets/Sounds/sfx/menu_in.wav")
        TransitionManager.startTransition(group.scale, {
            "time": 400,
            "x" : 1,
            "y" : 1,
            "easing" : "outBack",
        })
    }

    group.animateOut = function() {
        if (!group.leaving) {
            group.leaving        = true
            var content          = ChoiceResult.content
            ChoiceResult.content = null

            AudioLib.playSFX("assets/Sounds/sfx/button.wav")

            Game.pause(false);
            TransitionManager.startTransition(group.scale, {
                "time": 400,
                "x" : 0.001,
                "y" : 0.001,
                "easing" : "inBack",
                "onComplete" : function() {
                    content.destroy()
                }
            })

            NotificationManager.notify("ChoiceResultScreensClosed")
        }
    }

    header.interactive = true
    header.on('mousedown', group.animateOut);

    return group
}



ChoiceResult.showGoodResult = function(optionConfig) {
    var content = new PIXI.Container()
    ChoiceResult.content = content
    stage.addChild(content)

    var header = ChoiceResult.newFooter(optionConfig.resultGood, optionConfig.text, true, optionConfig.reward)
    content.addChild(header)

    Devguy.setAnimationAll("happy")
    TimerManager.startTimer(3000, function(){Devguy.setAllRandomAnimations()})
    header.animateIn()
}


ChoiceResult.showBadResult = function(optionConfig) {
    var content = new PIXI.Container()
    ChoiceResult.content = content
    stage.addChild(content)

    var header = ChoiceResult.newFooter(optionConfig.resultBad, optionConfig.text, false)
    content.addChild(header)

    Devguy.setAnimationAll("sad")
    TimerManager.startTimer(3000, function(){Devguy.setAllRandomAnimations()})
    header.animateIn()
}



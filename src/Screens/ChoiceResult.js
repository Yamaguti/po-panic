
var ChoiceResult = {}

var footerTextStyle = {fontFamily : 'gameFont',     fill: '#EEEEEE',fontSize: 30, align : 'left', wordWrap:true, wordWrapWidth: screenWidth - 80}


//
// Private Methods
//

ChoiceResult.newFooter = function(msgText) {
    var group = new PIXI.Container()

    var header = Utils.newImage({
        "name": "assets/ChoicesScreen/txt_holder.png"
    })
    group.addChild(header)

    group.position.x = centerX
    group.position.y = screenBottom - 80

    group.scale.x  = 0.001
    group.scale.y  = 0.001


    //
    // Text
    var text = new PIXI.Text(msgText, footerTextStyle);
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

        NotificationManager.notify("ChoiceResultScreensClosed")
    }

    return group
}



ChoiceResult.showGoodResult = function(optionConfig) {
    var header = ChoiceResult.newFooter(optionConfig.resultGood)
    stage.addChild(header)
    header.animateIn()

    TimerManager.startTimer(3000, function(){
        header.animateOut()
    })
}


ChoiceResult.showBadResult = function(optionConfig) {
    var header = ChoiceResult.newFooter(optionConfig.resultBad)
    stage.addChild(header)
    header.animateIn()

    TimerManager.startTimer(3000, function(){
        header.animateOut()
    })
}



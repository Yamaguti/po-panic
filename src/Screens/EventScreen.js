
var EventScreen = {}

var eventTitleTextStyle       = {fontFamily : 'gameFontBold', fill: Colors.orange, fontSize: 40, align : 'center', wordWrap : true, wordWrapWidth : 500, }
var eventDescriptionTextStyle = {fontFamily : 'gameFont',     fill: Colors.white,  fontSize: 30, align : 'center', wordWrap : true, wordWrapWidth : 500, }
var expectedRevenueTextStyle  = {fontFamily : 'gameFontBold', fill: Colors.yellow, fontSize: 30, align : 'center', stroke : Colors.black, strokeThickness : 2,}



EventScreen.showEvent = function(index) {
	Game.pause(true);

    var content = new PIXI.Container();
    content.position.x = centerX
    content.position.y = centerY

    EventScreen.content = content;

    var holder = Utils.newImage({
        "name": "assets/EventScreen/event_holder.png",
    })
    content.addChild(holder)


    // Title
    var title = new PIXI.Text(Hud.getMontName(index - 2) + " - MONTHLY REPORT", eventTitleTextStyle);
    content.addChild(title)
    title.position.x = - title.width/2;
    title.position.y = - 120;


    // Description
    var expectedDescriptionText = new PIXI.Text("Expected Revenue: ", eventDescriptionTextStyle);
    content.addChild(expectedDescriptionText)
    expectedDescriptionText.anchor.x = 1
    expectedDescriptionText.position.x = 40
    expectedDescriptionText.position.y = holder.position.y - 20;

    var expectedamountText = new PIXI.Text(Revenue.getExpectedCPSRightNow() + "$", expectedRevenueTextStyle);
    content.addChild(expectedamountText)
    expectedamountText.anchor.x = 0
    expectedamountText.position.x = expectedDescriptionText.position.x + 10
    expectedamountText.position.y = expectedDescriptionText.position.y - 1


    var currentRevenueDescriptionText = new PIXI.Text("Current Revenue: ", eventDescriptionTextStyle);
    content.addChild(currentRevenueDescriptionText)
    currentRevenueDescriptionText.anchor.x = 1
    currentRevenueDescriptionText.position.x = expectedDescriptionText.position.x
    currentRevenueDescriptionText.position.y = expectedDescriptionText.position.y + 30

    var expectedamountText = new PIXI.Text(Revenue.revenuePerSecond + "$", expectedRevenueTextStyle);
    content.addChild(expectedamountText)
    expectedamountText.anchor.x = 0
    expectedamountText.position.x = currentRevenueDescriptionText.position.x + 10
    expectedamountText.position.y = currentRevenueDescriptionText.position.y - 1


    // button
    button = Button.newButton("assets/EventScreen/bt_ok.png", {
        "onRelease": function() {
            EventScreen.closeEvent()
        },
    })
    button.position.y = 100
    content.addChild(button)

    stage.addChild(content)

    content.scale.x = 0.001
    content.scale.y = 0.001

    content.animateIn = function() {
        AudioLib.playSFX("assets/Sounds/sfx/menu_in.wav")
        TransitionManager.startTransition(content.scale, {
            "time": 400,
            "x" : 1,
            "y" : 1,
            "easing" : "outBack",
        })
    }

    content.animateOut = function(callback) {
        if (!content.animating) {
            content.animating = true
            TransitionManager.startTransition(content.scale, {
                "time": 400,
                "x" : 0.001,
                "y" : 0.001,
                "easing" : "inBack",
                "onComplete" : callback,
            })
        }
    }

    content.animateIn()
}


EventScreen.closeEvent = function()
{
    EventScreen.content.animateOut(function() {
    	Game.pause(false);
    })
}


NotificationManager.register("newMonth", EventScreen.showEvent)
// TimerManager.startTimer(3000, function() {
//     NotificationManager.notify("newMonth", 3)
// })

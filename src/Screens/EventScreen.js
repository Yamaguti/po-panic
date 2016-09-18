var EventScreen = {}

var titleTextStyle       = {fontFamily : 'gameFontBold', fill: '#ff983d',fontSize: 40, align : 'center', wordWrap : true, wordWrapWidth : 500, }
var descriptionTextStyle = {fontFamily : 'gameFont',     fill: '#EEEEEE',fontSize: 30, align : 'center', wordWrap : true, wordWrapWidth : 500, }
var playerAnswered = false;


EventScreen.showEvent = function(index) {
	Game.pause(true);

    var content = new PIXI.Container();
    EventScreen.content = content;

    var background = Utils.newRectangle(0, 0, screenWidth, screenHeight, {
        "color": 0x000000,
    })
    content.addChild(background)
    background.alpha = 0
    EventScreen.background = background

    var holder = Utils.newImage({
        "name": "assets/EventScreen/event_holder.png",
    })
    holder.x = centerX;
    holder.y = centerY;
    content.addChild(holder)

    // Title
    var title = new PIXI.Text("OH OH!", titleTextStyle);
    content.addChild(title)
    title.position.x = holder.position.x - title.width/2;
    title.position.y = holder.position.y - 120;

    // Description
    EventScreen.question = new PIXI.Text(gameEvents.gameEvents[index].label, descriptionTextStyle);
    content.addChild(EventScreen.question)
    EventScreen.question.position.x = holder.position.x - EventScreen.question.width/2;
    EventScreen.question.position.y = holder.position.y;


    ///confirm button
    EventScreen.button = Button.newButton("assets/ChoicesScreen/bt_doit.png", {
        "onRelease": function() {
            EventScreen.confirmChoice(index)
        },
    })

    EventScreen.button.position.x = centerX + EventScreen.button.width;
    EventScreen.button.position.y = holder.position.y + 103
    content.addChild(EventScreen.button)

    ///deny button
    EventScreen.denybutton = Button.newButton("assets/EventScreen/bt_nah.png", {
        "onRelease": function() {
            EventScreen.denyChoice(index)
        },
    })

    EventScreen.denybutton.position.x = centerX - EventScreen.denybutton.width
    EventScreen.denybutton.position.y = holder.position.y + 103
    content.addChild(EventScreen.denybutton)


    stage.addChild(content)

}

EventScreen.confirmChoice = function(index)
{
	playerAnswered = true;
	EventScreen.button.alpha = 0;
	EventScreen.denybutton.alpha = 0;
	EventScreen.question.text = gameEvents.gameEvents[index].confirmResult;

	TimerManager.startTimer(2000, EventScreen.closeEvent);
}

EventScreen.denyChoice = function(index)
{
	playerAnswered = true;
	EventScreen.button.alpha = 0;
	EventScreen.denybutton.alpha = 0;
	EventScreen.question.text = gameEvents.gameEvents[index].denyResult;

	TimerManager.startTimer(2000, EventScreen.closeEvent);
}

EventScreen.autoCloseEvent = function()
{
	if(!playerAnswered)
	{
		EventScreen.closeEvent();
	}
}

EventScreen.closeEvent = function()
{
	Game.pause(false);
	TransitionManager.startTransition(ChoicesScreen.background, {
        "time": 800,
        "alpha": 0,
        "onComplete" : function(){
            EventScreen.content.destroy()
        }
    })
}


NotificationManager.register("newMonth", EventScreen.showEvent)


var DEBUGSKIP = false
var TutorialScreen = {}

// Stylesheet
TutorialScreen.descriptionTextStyle = {fontFamily : 'gameFont', fill: '#EEEEEE',fontSize: 30, align : 'center', wordWrap : true, wordWrapWidth : screenWidth - 80, }


TutorialScreen.showTutorial = function(index) {
    var content = new PIXI.Container();
    stage.addChild(content)

    TutorialScreen.content = content;
    TutorialScreen.index = index;
    Game.pause(true);

    if (DEBUGSKIP) {
        TutorialScreen.closeTutorial();
        return;
    }

    var holder = Utils.newImage({
        "name": "assets/ChoicesScreen/txt_holder.png",
    })
    holder.position.x = centerX,
    holder.position.y = screenHeight - (holder.height + 70)
    content.addChild(holder)

    // Text
    var question = new PIXI.Text(gameTutorials.tutorials[index].label, TutorialScreen.descriptionTextStyle);
    content.addChild(question)
    TutorialScreen.question = question

    question.position.x = holder.position.x - question.width/2;
    question.position.y = holder.position.y - question.height/2;

    holder.interactive = true;
    holder.on('mousedown', TutorialScreen.nextTutorial);
}


TutorialScreen.nextTutorial = function() {
    AudioLib.playSFX("assets/Sounds/sfx/button.wav")
    TutorialScreen.index++;

    if(gameTutorials.tutorials[TutorialScreen.index]) {
        TutorialScreen.question.text = gameTutorials.tutorials[TutorialScreen.index].label;
    } else {
        TutorialScreen.closeTutorial();
    }
}


TutorialScreen.microManageTutorial = function(index) {
    var content = new PIXI.Container();
    TutorialScreen.content = content;
    TutorialScreen.index = index;
    Game.pause(true);

    if (DEBUGSKIP) {
        TutorialScreen.closeTutorial();
        return;
    }

    var holder = Utils.newImage({
        "name": "assets/ChoicesScreen/txt_holder.png",
    })
    holder.x = centerX;
    holder.y = screenHeight - (holder.height + 70) ;
    content.addChild(holder)

    // Text
    TutorialScreen.question = new PIXI.Text("CLICK AT THE SCREEN LIKE A MAD MAN!\nIt's your time to shine! You have the power to micro manage your team and earn extra revenue!", TutorialScreen.descriptionTextStyle);
    content.addChild(TutorialScreen.question)
    TutorialScreen.question.position.x = holder.position.x - TutorialScreen.question.width/2;
    TutorialScreen.question.position.y = holder.position.y - TutorialScreen.question.height/2;

    stage.addChild(content)

    TutorialScreen.question.interactive = true;
    TutorialScreen.question.on('mousedown', function(){
        TutorialScreen.closeTutorial()
        Revenue.setMicromanage(true)
    });
}



TutorialScreen.closeTutorial = function()
{
	Game.pause(false);
	TimerManager.startTimer(100, function() {
        TutorialScreen.content.destroy()
    })
    ChoiceManager.start();
}


NotificationManager.register("newMonth", function(month){
    if(month == 12){
        TutorialScreen.microManageTutorial()
    }
})

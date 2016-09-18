
var ChoiceManager = {}

ChoiceManager.currentChoiceIndex = 0
ChoiceManager.lastChoiceMade     = 0



//
// Private Methods
//

ChoiceManager.processLastChoiceResult = function() {
    if(Game.status == GAME_FINISHED)
        return;

    var config = gameQuestions.playerOptions[ChoiceManager.currentChoiceIndex]
    var selectedOption = config.options[ChoiceManager.lastChoiceMade]

    var risk = Number(selectedOption.risk)/100

    ChoiceManager.lastStartTime = null

    if (Math.random() > risk) { // success :)
        Revenue.revenuePerSecond += Number(selectedOption.reward)
        ChoiceResult.showGoodResult(selectedOption)
    }
    else { //fail :(
        ChoiceResult.showBadResult(selectedOption)
    }
}


ChoiceManager.promptUser = function(index) {
    ChoiceManager.currentChoiceIndex = index
    ChoicesScreen.showPlayerOptions(index)
}


ChoiceManager.startTimer = function() {
    var config = gameQuestions.playerOptions[ChoiceManager.currentChoiceIndex]
    var selectedOption = config.options[ChoiceManager.lastChoiceMade]

    // Settings default to prevent unespected crashes
    var time = selectedOption.time
    if (time === undefined) { time = 100 }
    var taskAmountTime = time*1000

    ChoiceManager.lastStartTime = TimerManager.getTime()
    ChoiceManager.nextEndTime = ChoiceManager.lastStartTime + taskAmountTime

    // Wait time from choice
    TimerManager.startTimer(taskAmountTime, function() {
        ChoiceManager.processLastChoiceResult()
    })
}


//
// Methods
//

ChoiceManager.selectChoice = function(index) {
    ChoiceManager.lastChoiceMade = index
    ChoiceManager.startTimer()
}


ChoiceManager.start = function() {
    if (! ChoiceManager.active) {
        ChoiceManager.active = true

        NotificationManager.register("ChoiceResultScreensClosed", function() {
            TimerManager.startTimer(1000, function() {
                ChoiceManager.promptUser(ChoiceManager.currentChoiceIndex + 1)
            })
        })

        TimerManager.startTimer(1000, function(){
            ChoiceManager.promptUser(0)
        })
    }
}

ChoiceManager.getElapsedFraction = function() {
    if (ChoiceManager.lastStartTime && ChoiceManager.nextEndTime) {
        var total = ChoiceManager.nextEndTime - ChoiceManager.lastStartTime
        var current = ChoiceManager.nextEndTime - TimerManager.getTime()
        return 1-(current/total)
    } else {
        return 0
    }
}

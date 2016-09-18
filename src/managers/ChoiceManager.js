
var ChoiceManager = {}

ChoiceManager.currentChoiceIndex = 0
ChoiceManager.lastChoiceMade     = 0



//
// Private Methods
//

ChoiceManager.processLastChoiceResult = function() {
    var config = gameQuestions.playerOptions[ChoiceManager.currentChoiceIndex]
    var selectedOption = config.options[ChoiceManager.lastChoiceMade]

    var risk = Number(selectedOption.risk)/100

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

    // Wait time from choice
    TimerManager.startTimer(time*1000, function() {
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


var ChoiceManager = {}

ChoiceManager.currentChoiceIndex = 0
ChoiceManager.lastChoiceMade     = 0



//
// Private Methods
//

ChoiceManager.promptUser = function(index) {
    ChoicesScreen.currentChoiceIndex = index
    ChoicesScreen.showPlayerOptions(index)
}


ChoiceManager.startTimer = function() {
    var config = gameQuestions.playerOptions[ChoicesScreen.currentChoiceIndex]
    var selectedOption = config.options[ChoicesScreen.currentChoiceIndex]

    console.log(selectedOption.time)

    // Settings default to prevent unespected crashes
    var time = selectedOption.time
    if (time === undefined) { time = 100 }

    TimerManager.startTimer(time*1000, function() {
        ChoiceManager.promptUser(ChoicesScreen.currentChoiceIndex + 1)
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
    ChoiceManager.promptUser(0)
}

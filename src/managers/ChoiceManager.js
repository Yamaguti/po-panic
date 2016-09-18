
var ChoiceManager = {}

ChoiceManager.currentChoiceIndex = 0
ChoiceManager.lastChoiceMade     = 0



//
// Private Methods
//

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


    TimerManager.startTimer(1000, function(){
        ChoiceManager.promptUser(ChoiceManager.currentChoiceIndex + 1)
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


// Manager
var TransitionManager = {}

function startTransition(object, totalTime, animationParams) {
    var totalTime   = totalTime
    var timeStarted = TimerManager.getTime()

    var startValues = {}
    for (var transitionParam in animationParams) {
        startValues[transitionParam] = object[transitionParam]
    }

    function animationHandler() {
        var elapsedFrac = (TimerManager.getTime()-timeStarted)/totalTime

        for (var param in animationParams) {
            var currentvalue = startValues[param] + elapsedFrac*(animationParams[param] - startValues[param])
            object[param]    = currentvalue
        }

        if (elapsedFrac < 1) {
            requestAnimationFrame(animationHandler);
        }
    }
    requestAnimationFrame(animationHandler);
}



// Exposed Functions
TransitionManager.startTransition = startTransition

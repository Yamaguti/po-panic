
// Manager
var TimerManager = {}



// Private Methods
function compareTimers(a,b) {
  if (a.time < b.time)
    return -1;
  if (a.time > b.time)
    return 1;
  return 0;
}


function registerEnterFrame() {
    requestAnimationFrame(processTimers);
}


function processTimers() {
    var now          = getTime()
    var timersToFire = []
    var newRegister  = []

    // console.log(now)

    // Find Timers To Fire
    for (i = 0; i < TimerManager.registeredTimers.length; i++) {
        timer = TimerManager.registeredTimers[i]
        if (now >= timer.time) {
            timersToFire[timersToFire.length] = timer
        }
    }

    // Remove Timers From Registry
    for (i = timersToFire.length; i < TimerManager.registeredTimers.length; i ++) {
        newRegister[i - timersToFire.length] = TimerManager.registeredTimers[i]
    }
    TimerManager.registeredTimers = newRegister

    // Fire Timers
    for (i = 0; i < timersToFire.length; i++) {
        var timer = timersToFire[i]
        timer.callback()
    }

    // Decide if task shoul run again
    if(TimerManager.registeredTimers.length > 0) {
        requestAnimationFrame(processTimers);
    }
}



//Methods
function getTime() {
    var date = new Date();
    var now  = date.getTime();
    return now
}


function startTimer(timeToFire, callback) {
    var lenght = TimerManager.registeredTimers.length

    // register new timer
    TimerManager.registeredTimers[lenght] = {
        "callback" : callback,
        "time"     : getTime() + timeToFire,
    }

    //sort timers by time
    TimerManager.registeredTimers.sort(compareTimers);

    // may turn enterframe on
    if (!TimerManager.isEnterFrameOn){
        registerEnterFrame()
    }
}



// Initialization
TimerManager.registeredTimers = []
TimerManager.isEnterFrameOn   = false


// Exposed Functions
TimerManager.getTime          = getTime
TimerManager.startTimer       = startTimer

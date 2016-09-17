
// Easings, thankx: http://gizma.com/easing/
// t : currentTime
// b : startValue
// c : change in value
// d : duration

var Easings = {}
// simple linear tweening - no easing, no acceleration
Easings.linear = function (t, b, c, d) {
    return c*t/d + b;
};
// quadratic easing in - accelerating from zero velocity
Easings.inQuad = function (t, b, c, d) {
    t /= d;
    return c*t*t + b;
};
// quadratic easing out - decelerating to zero velocity
Easings.outQuad = function (t, b, c, d) {
    t /= d;
    return -c * t*(t-2) + b;
};
// quadratic easing in/out - acceleration until halfway, then deceleration
Easings.inOutQuad = function (t, b, c, d) {
    t /= d/2;
    if (t < 1) return c/2*t*t + b;
    t--;
    return -c/2 * (t*(t-2) - 1) + b;
};
// cubic easing in - accelerating from zero velocity
Easings.inCubic = function (t, b, c, d) {
    t /= d;
    return c*t*t*t + b;
};
// cubic easing out - decelerating to zero velocity
Easings.outCubic = function (t, b, c, d) {
    t /= d;
    t--;
    return c*(t*t*t + 1) + b;
};
// cubic easing in/out - acceleration until halfway, then deceleration
Easings.inOutCubic = function (t, b, c, d) {
    t /= d/2;
    if (t < 1) return c/2*t*t*t + b;
    t -= 2;
    return c/2*(t*t*t + 2) + b;
};
// quartic easing in - accelerating from zero velocity
Easings.inQuart = function (t, b, c, d) {
    t /= d;
    return c*t*t*t*t + b;
};
// quartic easing out - decelerating to zero velocity
Easings.outQuart = function (t, b, c, d) {
    t /= d;
    t--;
    return -c * (t*t*t*t - 1) + b;
},
// quartic easing in/out - acceleration until halfway, then deceleration
Easings.inOutQuart = function (t, b, c, d) {
    t /= d/2;
    if (t < 1) return c/2*t*t*t*t + b;
    t -= 2;
    return -c/2 * (t*t*t*t - 2) + b;
};
// quintic easing in - accelerating from zero velocity
Easings.inQuint = function (t, b, c, d) {
    t /= d;
    return c*t*t*t*t*t + b;
};
// quintic easing out - decelerating to zero velocity
Easings.outQuint = function (t, b, c, d) {
    t /= d;
    t--;
    return c*(t*t*t*t*t + 1) + b;
};
// quintic easing in/out - acceleration until halfway, then deceleration
Easings.inOutQuint = function (t, b, c, d) {
    t /= d/2;
    if (t < 1) return c/2*t*t*t*t*t + b;
    t -= 2;
    return c/2*(t*t*t*t*t + 2) + b;
};
// sinusoidal easing in - accelerating from zero velocity
Easings.inSine = function (t, b, c, d) {
    return -c * Easings.cos(t/d * (Easings.PI/2)) + c + b;
};
// sinusoidal easing out - decelerating to zero velocity
Easings.outSine = function (t, b, c, d) {
    return c * Easings.sin(t/d * (Easings.PI/2)) + b;
};
// sinusoidal easing in/out - accelerating until halfway, then decelerating
Easings.inOutSine = function (t, b, c, d) {
    return -c/2 * (Easings.cos(Easings.PI*t/d) - 1) + b;
};
// exponential easing in - accelerating from zero velocity
Easings.inExpo = function (t, b, c, d) {
    return c * Easings.pow( 2, 10 * (t/d - 1) ) + b;
};
// exponential easing out - decelerating to zero velocity
Easings.outExpo = function (t, b, c, d) {
    return c * ( -Easings.pow( 2, -10 * t/d ) + 1 ) + b;
};
// exponential easing in/out - accelerating until halfway, then decelerating
Easings.inOutExpo = function (t, b, c, d) {
    t /= d/2;
    if (t < 1) return c/2 * Easings.pow( 2, 10 * (t - 1) ) + b;
    t--;
    return c/2 * ( -Easings.pow( 2, -10 * t) + 2 ) + b;
};
// circular easing in - accelerating from zero velocity
Easings.inCirc = function (t, b, c, d) {
    t /= d;
    return -c * (Math.sqrt(1 - t*t) - 1) + b;
};
// circular easing out - decelerating to zero velocity
Easings.outCirc = function (t, b, c, d) {
    t /= d;
    t--;
    return c * Math.sqrt(1 - t*t) + b;
};
// circular easing in/out - acceleration until halfway, then deceleration
Easings.inOutCirc = function (t, b, c, d) {
    t /= d/2;
    if (t < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
    t -= 2;
    return c/2 * (Math.sqrt(1 - t*t) + 1) + b;
};


//
// Manager
//
//

var TransitionManager = {}

function startTransition(object, originalParams) {
    var animationParams = JSON.parse(JSON.stringify(originalParams));
    var totalTime       = animationParams.time
    var startTime       = TimerManager.getTime()
    var easing          = Easings[animationParams.easing || "linear"]

    delete animationParams["time"]
    delete animationParams["easing"]

    var startValues = {}
    for (var transitionParam in animationParams) {
        startValues[transitionParam] = object[transitionParam]
    }

    function animationHandler() {
        var currentValue = TimerManager.getTime()

        for (var param in animationParams) {
            var result = easing(currentValue-startTime, startValues[param], animationParams[param]-startValues[param], totalTime)
            object[param] = result
        }

        if (currentValue < startTime + totalTime) {
            requestAnimationFrame(animationHandler);

        } else {
            for (var param in animationParams) {
                object[param] = animationParams[param]
            }
        }
    }
    requestAnimationFrame(animationHandler);
}



// Exposed Functions
TransitionManager.startTransition = startTransition

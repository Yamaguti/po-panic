
var AudioLib = {}



AudioLib.playOnLoop = function(audioPath) {
    var audioHandler = new Audio(audioPath);
    audioHandler.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
    audioHandler.play();

    return audioHandler
}

AudioLib.play = function(audioPath, onComplete) {
    var audioHandler = new Audio(audioPath);
    audioHandler.play();

    if (onComplete) {
        audioHandler.addEventListener('ended', onComplete, false);
    }

    return audioHandler
}

AudioLib.playSFX = function(audioPath, onComplete) {
    var sfx = AudioLib.play(audioPath, onComplete)
    sfx.volume = 0.4
    return sfx
}

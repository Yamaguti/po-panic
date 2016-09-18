
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

AudioLib.play = function(audioPath) {
    var audioHandler = new Audio(audioPath);
    audioHandler.play();
    return audioHandler
}

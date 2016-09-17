

// Constants
var timeToStart = 500


// Initialization
function preLoadFont(fontName) {
    var text = new PIXI.Text('This is a dummy text, dont remove pls', {fontFamily : fontName, fontSize: 24, align : 'center', });
    stage.addChild(text)
    text.alpha = 0

    HomeScreen.showHome()
}


function setupPosLoad() {
    var text = new PIXI.Text('This is a text',{fontFamily : 'gameFont', fontSize: 24, align : 'center', });
    text.position.x = centerX
    text.position.y = centerY
    stage.addChild(text)

    var text = new PIXI.Text('This is a bold text',{fontFamily : 'gameFontBold', fontSize: 24, align : 'center', });
    text.position.x = centerX
    text.position.y = centerY + 100
    stage.addChild(text)

    Revenue.createText()
    HomeScreen.setGameAvailable()
}



function update(dt){
    TimerManager.update()
    Revenue.update(dt)
}


function setupPreLoad() {
    // Prepare pos load elements, like fonts
    TimerManager.startTimer(timeToStart, function (){
        setupPosLoad()
    })


    // Resizing renderer to center of browser window. Credits: http://www.html5gamedevs.com/topic/18406-how-to-center-stage-on-browser/
    function resize() {
        renderer.view.style.position = 'absolute';
        renderer.view.style.left = ((window.innerWidth - renderer.width) >> 1) + 'px';
        renderer.view.style.top  = ((window.innerHeight - renderer.height) >> 1) + 'px';
    } resize();
    window.addEventListener('resize', resize);


    // Add the renderer view element to the DOM
    document.body.appendChild(renderer.view);
    requestAnimationFrame(animate);

    var lastUpdateTime = 0;
    var logicDt = 1000/60;
    var lag = 0;

    // Game Update Loop
    function animate(currentUpdateTime) {
        requestAnimationFrame(animate);

        dt = currentUpdateTime - lastUpdateTime;
        lag += dt;

        while (lag > logicDt){
            update(logicDt);
            lag -= logicDt;
        }

        lastUpdateTime = currentUpdateTime

        // render the stage
        renderer.render(stage);
    }

    preLoadFont('gameFont')
    preLoadFont('gameFontBold')

    loader.load();
}


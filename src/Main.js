

// Constants
var timeToStart = 500


// Initialization
function preLoadFont(fontName) {
    var text = new PIXI.Text('This is a dummy text, dont remove pls', {fontFamily : fontName, fontSize: 24, align : 'center', });
    stage.addChild(text)
    text.alpha = 0
}


function setupPosLoad() {
    HomeScreen.setGameAvailable()
}



function update(dt){
    TimerManager.update()
    if (!Game.paused){
        Revenue.update(dt)
        Hud.updateRevenueBar(dt)
        Game.update(dt)
        ChoiceManager.update()
    }
}



function setupPreLoad() {
    // Prepare pos load elements, like fonts
    TimerManager.startTimer(timeToStart, function (){
        setupPosLoad()
    })

    // Add the renderer view element to the DOM
    document.body.appendChild(renderer.view);

    // Activate renderer's view reposition on window change
    WindowUtils.setResize()

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
    requestAnimationFrame(animate);


    // Debug show fps
    // Check init.js for flag DEBUGMODE
    if (DEBUGMODE) {
        var statsGizmo = new Stats();
        statsGizmo.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
        document.body.appendChild(statsGizmo.dom);

        var _oldAnimate = animate
        animate = function(dt) {
            statsGizmo.begin();
            _oldAnimate(dt)
            statsGizmo.end();
        }
    }


    preLoadFont('gameFont')
    preLoadFont('gameFontBold')

    loader.load();

    HomeScreen.showHome()
}


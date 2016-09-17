
function getTime() {
    var date = new Date();
    var now  = date.getTime();
    return now
}
var appStart = getTime()

var stage = new PIXI.Container();

// create a renderer instance.
var screenWidth  = 600
var screenHeight = 600

var centerX = screenWidth/2
var centerY = screenHeight/2

var renderer = PIXI.autoDetectRenderer(screenWidth, screenHeight, {backgroundColor : 0x1099bb});
var projectPath = "http://localhost:8000/"

function waitForStart() {
    var now = getTime()
    console.log(now, appStart, now-appStart)
    if (now - appStart > 2000) {
        setupPosLoad()
    }
    else
        requestAnimationFrame( waitForStart );
}
requestAnimationFrame(waitForStart)


function setupPosLoad() {
    var text = new PIXI.Text('This is a text',{fontFamily : 'gameFont', fontSize: 24, align : 'center', });
    text.position.x = centerX
    text.position.y = centerY
    stage.addChild(text)
}


function update(dt){
    // console.log(dt)
    // just for fun, lets rotate mr rabbit a little
    // bunny.rotation += (0.1 * dt/1000);
}


function setupPreLoad() {
    console.log("SETUP GAME");

    // Resizing renderer to center of browser window. Credits: http://www.html5gamedevs.com/topic/18406-how-to-center-stage-on-browser/
    function resize() {
        renderer.view.style.position = 'absolute';
        renderer.view.style.left = ((window.innerWidth - renderer.width) >> 1) + 'px';
        renderer.view.style.top  = ((window.innerHeight - renderer.height) >> 1) + 'px';
    } resize();
    window.addEventListener('resize', resize);


    // add the renderer view element to the DOM
    document.body.appendChild(renderer.view);

    // create a texture from an image path
    var texture = PIXI.Texture.fromImage(projectPath + "bunny.png");

    // create a new Sprite using the texture
    var bunny = new PIXI.Sprite(texture);

    // center the sprites anchor point
    bunny.anchor.x = 0.5;
    bunny.anchor.y = 0.5;

    // move the sprite t the center of the screen
    bunny.position.x = 200;
    bunny.position.y = 150;

    stage.addChild(bunny);

    requestAnimationFrame( animate );

    var lastUpdateTime = 0;
    var logicDt = 1000/60;
    var lag = 0;

    function animate(currentUpdateTime) {
        requestAnimationFrame( animate );
        // console.log(testStuff)
        dt = currentUpdateTime - lastUpdateTime;
        lag += dt;
        while (lag > logicDt){
            // gambs
            update(logicDt, bunny);
            lag -= logicDt;
        }
        bunny.rotation += 0.1

        // render the stage
        renderer.render(stage);
    }

    var text = new PIXI.Text('This is a dummy text, dont remove pls', {fontFamily : 'gameFont', fontSize: 24, align : 'center', });
    stage.addChild(text)
    text.alpha = 0

    loader.load();
}

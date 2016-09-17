    var stage = new PIXI.Container();

    // create a renderer instance.
    var screenWidth  = 600
    var screenHeight = 600
    var renderer = PIXI.autoDetectRenderer(screenWidth, screenHeight, {backgroundColor : 0x1099bb});
    var projectPath = "http://localhost:8000/"

    function setupGame(){
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

        function animate() {
            requestAnimationFrame( animate );

            // just for fun, lets rotate mr rabbit a little
            bunny.rotation += 0.1;

            //bunny.position.x += 01;

            // render the stage
            renderer.render(stage);
        }

        loader.load();
    }
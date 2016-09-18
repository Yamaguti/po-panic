

//
// Stylesheet :)
//
var revenueTextStyle = {fontFamily : 'gameFontBold', fill: Colors.yellow, fontSize: 13, align : 'center', stroke : Colors.black, strokeThickness : 1,}


//
// Constants
//
var initialRevenue = 1


//
// Class
//
var Revenue = {
    revenue: 0,
    revenuePerSecond: initialRevenue,
}


//
// Methods
//
Revenue.createText = function() {
    if (!Revenue.revText) {
        var text = new PIXI.Text('0$ PER SECOND', revenueTextStyle);

        text.position.x = 88
        text.position.y = 38
        TimerManager.startTimer(200, function(){
            Hud.hudContainer.addChild(text)
        })
        text.anchor.x = 0.5
        text.anchor.y = 0

        Revenue.revText = text
    }
}


Revenue.update = function(dt){}


Revenue.addRevenue = function(event){
    if(Game.paused){return}
    Revenue.revenue += Revenue.revenuePerSecond * 0.2
    var feedbackGroup = new PIXI.Container()
    var text = new PIXI.Text("+ " + Math.floor(Revenue.revenuePerSecond * 0.2) + "$",{fontFamily : 'gameFontBold', fontSize: 12, align : 'center', fill: 0x000000});

    var coin = new PIXI.extras.MovieClip(Revenue.coinTextureArray);
    coin.animationSpeed = 0.3
    coin.play()

    feedbackGroup.addChild(coin)
    feedbackGroup.addChild(text)
    text.x = 20

    feedbackGroup.position.x = event.clientX - ((window.innerWidth - renderer.width) >> 1 )
    feedbackGroup.position.y = event.clientY - ((window.innerHeight - renderer.height) >> 1)

    feedbackGroup.scale = {x:2, y:2}

    stage.addChild(feedbackGroup)

    TimerManager.startTimer(1000, function(){
        feedbackGroup.destroy()
    })

    TransitionManager.startTransition(feedbackGroup.position, {
        "time": 400,
        "y" : feedbackGroup.y - 10,
        "easing" : "outBack",
    })

    TimerManager.startTimer(420, function(){
        TransitionManager.startTransition(feedbackGroup.position, {
            "time": 400,
            "y" : feedbackGroup.y + 10,
            "easing" : "inBack",
        })
    })

}


Revenue.setMicromanage = function(mode) {
    if (mode != Revenue.micromanageMode){
        Revenue.micromanageMode = mode
        if (mode) {
            window.addEventListener("click", Revenue.addRevenue)

            var dummyText1 = new PIXI.Text("MICROMANAGE MODE!!!",{fontFamily : 'gameFontBold', fontSize: 45, align : 'center', fill: 0x000000});
            dummyText1.anchor.x = 0.5
            stage.addChild(dummyText1)
            Revenue.dummyText1 = dummyText1

            var dummyText2 = new PIXI.Text("MICROMANAGE MODE!!!",{fontFamily : 'gameFontBold', fontSize: 45, align : 'center', fill: 0xFFFFFF});
            stage.addChild(dummyText2)
            dummyText2.anchor.x = 0.5
            Revenue.dummyText2 = dummyText2


            window.requestAnimationFrame(function(){
                var textures = []
                textures.push(renderer.generateTexture(dummyText1))
                textures.push(renderer.generateTexture(dummyText2, resolution=2))
                var micromanagerSprite = new PIXI.extras.MovieClip(textures);
                Game.content.addChild(micromanagerSprite)
                micromanagerSprite.play()
                micromanagerSprite.animationSpeed=0.07
                micromanagerSprite.x = 450
                micromanagerSprite.y = 80
                Revenue.micromanagerSprite = micromanagerSprite

                Revenue.dummyText2.destroy()
                Revenue.dummyText1.destroy()
            })

            Devguy.setAnimationAll("onfire")
        }
        else{
            if(Revenue.micromanagerSprite){
                Revenue.micromanagerSprite.destroy()
            }
            Devguy.setAllRandomAnimations()
            window.removeEventListener("click", Revenue.addRevenue)
        }
    }
}


Revenue.setUpdate = function(){
    Revenue.update = function(dt){
        Revenue.revenue += Revenue.revenuePerSecond * (dt/1000)
        if (Revenue.revText){
            Revenue.revText.text = (Math.floor(Revenue.revenuePerSecond).toString()) + '$ PER SECOND'
        }
    }

    var whatever = []
    for (i = 1; i < 11; i++){
        whatever[i] = 'assets/coin/coin_0' + Math.floor(i/10).toFixed(0) + (i%10) +  '.png'
    }

    var textureArray = [];

    // console.log(event)

    for (var i=1; i < 11; i++)
    {
         var texture = PIXI.Texture.fromImage(whatever[i]);
         textureArray.push(texture);
    };

    Revenue.coinTextureArray = textureArray
    // Revenue.setMicromanage(true)
}


// Formula assumes a linear progression on cps over time
Revenue.getExpectedCPSAtEndGame = function() {
    var total = gameConfig.gameConfigs.revenueGoal
    var time  = gameConfig.gameConfigs.gameTime

    return 2*total/time -1
}


Revenue.getExpectedCPSRightNow = function() {
    var elapsedTimeFraction = Game.elapsedTime/gameConfig.gameConfigs.gameTime
    return Math.floor(Revenue.getExpectedCPSAtEndGame()*elapsedTimeFraction)
}


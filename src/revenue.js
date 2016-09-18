

//
// Stylesheet :)
//
var revenueTextStyle = {fontFamily : 'gameFontBold', fill: Colors.yellow, fontSize: 24, align : 'center', stroke : Colors.black, strokeThickness : 5,}


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
    var text = new PIXI.Text('0$ PER SECOND', revenueTextStyle);

    text.position.x = screenLeft + 95
    text.position.y = screenTop  + 80

    Game.content.addChild(text)
    text.anchor.x = 0
    text.anchor.y = 0

    Revenue.revText = text
}


Revenue.update = function(dt){}


Revenue.addRevenue = function(){
    Revenue.revenue += Revenue.revenuePerSecond
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
    NotificationManager.register("newMonth", function(month){
        Revenue.setMicromanage(month == 12)
    })
}

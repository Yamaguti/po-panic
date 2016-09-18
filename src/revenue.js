
var Revenue = {
    revenue: 0,
    revenuePerSecond: 15,
}

Revenue.createText = function() {
    var text = new PIXI.Text('0$ PER SECOND',{fontFamily : 'gameFontBold', fontSize: 24, align : 'center', });
    text.position.x = centerX
    text.position.y = centerY + 180
    Game.content.addChild(text)
    text.anchor.x = 0.5
    text.anchor.y = 0.5
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
            var textures = []

            var dummyText1 = new PIXI.Text("MICROMANAGE MODE!!!",{fontFamily : 'gameFontBold', fontSize: 45, align : 'center', fill: 0x000000});
            dummyText1.anchor.x = 0.5
            textures.push(renderer.generateTexture(dummyText1))

            var dummyText2 = new PIXI.Text("MICROMANAGE MODE!!!",{fontFamily : 'gameFontBold', fontSize: 45, align : 'center', fill: 0xFFFFFF});
            dummyText2.anchor.x = 0.5
            textures.push(renderer.generateTexture(dummyText2))

            var micromanagerSprite = new PIXI.extras.MovieClip(textures);
            Game.content.addChild(micromanagerSprite)

            micromanagerSprite.play()
            micromanagerSprite.animationSpeed=0.07
            micromanagerSprite.x = 450
            micromanagerSprite.y = 30
            Revenue.micromanagerSprite = micromanagerSprite
        }
        else{
            if(Revenue.micromanagerSprite){
                Revenue.micromanagerSprite.destroy()
            }
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
        Revenue.setMicromanage(month == 0)
    })
}

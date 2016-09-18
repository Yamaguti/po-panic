
var Revenue = {
    revenue: 0,
    revenuePerSecond: 15,
}

Revenue.createText = function(){
    var text = new PIXI.Text('0$ PER SECOND',{fontFamily : 'gameFontBold', fontSize: 24, align : 'center', });
    text.position.x = centerX
    text.position.y = centerY + 180
    stage.addChild(text)
    text.anchor.x = 0.5
    text.anchor.y = 0.5
    Revenue.revText = text
}



Revenue.update = function(dt){}

Revenue.addRevenue = function(){
    Revenue.revenue += Revenue.revenuePerSecond
}

Revenue.setMicromanage = function(mode){
    if (mode != Revenue.micromanageMode){
        Revenue.micromanageMode = mode
        if (mode){
            window.addEventListener("click", Revenue.addRevenue)
            var textures = []
            var dummyText = new PIXI.Text("MICROMANAGE MODE!!!",{fontFamily : 'gameFontBold', fontSize: 45, align : 'center', fill: 0x000000});
            textures.push(renderer.generateTexture(dummyText))
            dummyText.style.fill=0xFFFFFF
            textures.push(renderer.generateTexture(dummyText))
            var text = new PIXI.extras.MovieClip(textures);
            stage.addChild(text)
            text.play()
            text.animationSpeed=0.1
            text.x = 450
            text.y = 30
            Revenue.text = text
        }
        else{
            if(Revenue.text){
                Revenue.text.destroy()
            }
            window.removeEventListener("click", Revenue.addRevenue)
        }
    }
}


Revenue.setUpdate = function(){
    Revenue.update = function(dt){
        if (!Revenue.micromanageMode){
            Revenue.revenue += Revenue.revenuePerSecond * (dt/1000)
        }
        if (Revenue.revText){
            Revenue.revText.text = (Math.floor(Revenue.revenuePerSecond).toString()) + '$ PER SECOND'
        }
    }
    NotificationManager.register("newMonth", function(month){ Revenue.setMicromanage(month == 0)})
}

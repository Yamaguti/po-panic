
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


Revenue.setUpdate = function(){
    Revenue.update = function(dt){
        Revenue.revenue += Revenue.revenuePerSecond * (dt/1000)
        if (Revenue.revText){
            Revenue.revText.text = (Math.floor(Revenue.revenuePerSecond).toString()) + '$ PER SECOND'
        }
    }
}
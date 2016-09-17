
var Revenue = {
    revenue: 0,
    revenuePerSecond: 10,
}

Revenue.createText = function(){
    var text = new PIXI.Text('0',{fontFamily : 'gameFontBold', fontSize: 24, align : 'center', });
    text.position.x = centerX
    text.position.y = centerY + 150
    stage.addChild(text)
    Revenue.revText = text
}



Revenue.update = function(dt){}


Revenue.setUpdate = function(){
    Revenue.update = function(dt){
        Revenue.revenue += Revenue.revenuePerSecond * (dt/1000)
        if (Revenue.revText){
            Revenue.revText.text = Math.floor(Revenue.revenue).toString()
        }
    }
}
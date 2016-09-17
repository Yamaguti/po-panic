
var Revenue = {
    revenue: 0,
}

Revenue.createText = function(){
    var text = new PIXI.Text('0',{fontFamily : 'gameFontBold', fontSize: 24, align : 'center', });
    text.position.x = centerX
    text.position.y = centerY + 150
    stage.addChild(text)
    Revenue.revText = text
}



Revenue.update = function(dt){

    Revenue.revenue += 10 * (dt/1000)
    if (Revenue.revText){
        // console.log(Revenue.revenue)
        Revenue.revText.text = Math.floor(Revenue.revenue).toString()
    }
}
var Hud = {
    stupidConversionTable:[
        0,
        31,
        31 + 28,
        31 + 28 + 31,
        31 + 28 + 31 + 30,
        31 + 28 + 31 + 30 + 31,
        31 + 28 + 31 + 30 + 31 + 30,
        31 + 28 + 31 + 30 + 31 + 30 + 31,
        31 + 28 + 31 + 30 + 31 + 30 + 31 + 31,
        31 + 28 + 31 + 30 + 31 + 30 + 31 + 31 + 30,
        31 + 28 + 31 + 30 + 31 + 30 + 31 + 31 + 30 + 31,
        31 + 28 + 31 + 30 + 31 + 30 + 31 + 31 + 30 + 31 + 30,
        31 + 28 + 31 + 30 + 31 + 30 + 31 + 31 + 30 + 31 + 30 + 31,
    ],

    monthNames:[
        "JAN",
        "FEB",
        "MAR",
        "APR",
        "MAY",
        "JUN",
        "JUL",
        "AGO",
        "SEP",
        "OCT",
        "NOV",
        "DEC",
    ],

    month:0,
    day:0,


    //This is so stupid
    getDate: function(days){
        for(i = 11; i >= 0; i--){
            if (days >= Hud.stupidConversionTable[i]){
                return[days - Hud.stupidConversionTable[i] + 1, i]
            }
        }
    },

    createRevenueBar : function(){
        var hudContainer = new PIXI.Container()
        var bar = new PIXI.Sprite(PIXI.Texture.fromImage('assets/hud_bar.png'));
        Hud.bar = bar
        hudContainer.addChild(bar)
        var fill = new PIXI.Sprite(PIXI.Texture.fromImage('assets/bar_fill.png'));
        fill.anchor.x = 0.4
        fill.position.x = 35
        fill.position.y = 11
        hudContainer.addChild(fill)
        Hud.fill = fill
        Hud.maxWidth = bar.width
        hudContainer.scale.x = hudContainer.scale.y = 2
        var res = Hud.getDate(0)
        var day = res[0]
        var month = res[1]

        var monthText = new PIXI.Text(Hud.monthNames[month],{fontFamily : 'gameFont', fontSize: 12, align : 'center', });
        Hud.monthText = monthText
        monthText.position = {x:12, y: 10}
        hudContainer.addChild(monthText)

        var dayText = new PIXI.Text(day.toString,{fontFamily : 'gameFont', fontSize: 15, align : 'center', });
        dayText.y = 12
        Hud.dayText = dayText
        dayText.position = {x:12, y:27}
        hudContainer.addChild(dayText)

        stage.addChild(hudContainer)
    },

    updateRevenueBar: function(dt){
    },

    setUpdate: function(){
        Hud.updateRevenueBar= function(dt){
            if (Hud.fill){
                Hud.fill.width = (Math.min(Revenue.revenue/(gameConfig.gameConfigs.revenueGoal || 240), 1) * (Hud.bar.width - 43) * 5)
            }
            Hud.elapsedTime = Hud.elapsedTime || 0
            Hud.elapsedTime += dt/1000
            if (Hud.dayText && Hud.monthText){
                var days = Math.floor((Hud.elapsedTime/gameConfig.gameConfigs.gameTime) * 365)
                var res = Hud.getDate(days)
                var day = Math.min(res[0], 31)
                var month = res[1]
                Hud.dayText.text = day.toString()
                Hud.monthText.text = Hud.monthNames[month]
            }
        }
    },
}

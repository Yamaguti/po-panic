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

    monthCheck:{},

    month:0,
    day:0,
    rotationSpeed: 0.5,

    getMontName: function(index) {
        return Hud.monthNames[index]
    },


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
        Hud.hudContainer = hudContainer

        var holder = new PIXI.Sprite(PIXI.Texture.fromImage('assets/Hud/currency_holder.png'));
        Hud.holder = holder
        holder.x = 35
        holder.y = 32
        hudContainer.addChild(holder)

        var bar = new PIXI.Sprite(PIXI.Texture.fromImage('assets/Hud/hud_bar.png'));
        Hud.bar = bar
        hudContainer.addChild(bar)


        var fill = new PIXI.Sprite(PIXI.Texture.fromImage('assets/Hud/bar_fill.png'));
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


        var goalImage = Utils.newImage({
            "name" : "assets/Hud/goal_icon.png"
        })
        hudContainer.addChild(goalImage)
        goalImage.position.x = centerX-25
        goalImage.position.y = 30
        goalImage.scale.x = 1
        goalImage.scale.y = 1


        var monthText = new PIXI.Text(Hud.monthNames[month],{fontFamily : 'gameFont', fontSize: 12, align : 'center', });
        Hud.monthText = monthText
        monthText.position = {x:12, y: 10}
        hudContainer.addChild(monthText)

        var dayText = new PIXI.Text(day.toString(),{fontFamily : 'gameFont', fontSize: 15, align : 'center', });
        dayText.y = 12
        Hud.dayText = dayText
        dayText.position = {x:12, y:27}
        hudContainer.addChild(dayText)
        hudContainer.pivot = new PIXI.Point(hudContainer.width/4, hudContainer.height/4)

        hudContainer.position.x = 450
        hudContainer.position.y = 40

        stage.addChild(hudContainer)
    },

    updateRevenueBar: function(dt){
    },

    rotate: function(dt){
        Hud.hudContainer.rotation += 0.1 *dt/1000 * Hud.rotationSpeed
        if (Math.abs(Hud.hudContainer.rotation) >= 0.1){
            Hud.rotationSpeed *= -1
        }
    },

    sanitizeWidth: function(n){
        return Math.floor(n*2)/2
    },

    setUpdate: function(){
        Hud.updateRevenueBar = function(dt){
            if(Game.status == GAME_FINISHED)
                return;

            if (Hud.fill){
                var elapsedRevenueFraction = Math.min(1, Revenue.revenue/(gameConfig.gameConfigs.revenueGoal || 240))
                Hud.fill.width = Hud.sanitizeWidth(elapsedRevenueFraction * (Hud.bar.width - 43) * 5)
            }
            Hud.elapsedTime = Hud.elapsedTime || 0
            Hud.elapsedTime += dt/1000

            if (Hud.dayText && Hud.monthText) {
                var days = Math.floor((Hud.elapsedTime/gameConfig.gameConfigs.gameTime) * 365)
                var res = Hud.getDate(days)
                var day = Math.min(res[0], 31)
                var month = res[1]
                Hud.dayText.text = day.toString()
                Hud.monthText.text = Hud.monthNames[month]

                // Displatch Notification
                if (day == 1 && month != 0 && Hud.monthCheck[month] == null) {
                    Hud.monthCheck[month] = true
                    Devguy.setAllRandomAnimations()
                    NotificationManager.notify("newMonth", month+1)
                }

                // End Game
                if(day == 31 && month == 11) {
                    console.log("END GAME " + Revenue.revenue/gameConfig.gameConfigs.revenueGoal);
                    Game.pause(true);
                    NotificationManager.notify("endGame", Revenue.revenue/gameConfig.gameConfigs.revenueGoal);
                }
            }

            if (month >= 11){
                Hud.rotate(dt)
            }
        }
    },
}

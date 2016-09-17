var Hud = {
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


        stage.addChild(hudContainer)
    },

    updateRevenueBar: function(){
        if (Hud.fill){
            // console.log(Math.min(Revenue.revenue/(gameConfig.revenueGoal || 240000), 1) * Hud.maxWidth )
            Hud.fill.width = (Math.min(Revenue.revenue/(gameConfig.revenueGoal || 240000), 1) * (Hud.bar.width - 43) * 5)
            // console.log(Math.min(Revenue.revenue/(gameConfig.revenueGoal || 240000), 1) * Hud.bar.width, Hud.bar.width)
        }
    }
}

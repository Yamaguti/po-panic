Devguy = {
    pos: [
        {},
        {x: 380, y: 120},
        {x: 520, y: 190},
        {x: 240, y: 190},
        {x: 380, y: 260},
    ],

    devs: [],

    new: function(index){
        var dev = new PIXI.Sprite(PIXI.Texture.fromImage('assets/dev_'+ index +'.png'));
        dev.scale = {x:2, y:2}
        dev.position = Devguy.pos[index]
        stage.addChild(dev)
        Devguy.devs[index] = dev
    },
}
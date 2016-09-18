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
        // if (index != 3){
        //     var dev = new PIXI.Sprite(PIXI.Texture.fromImage('assets/' + index + '/dev_'+ index +'.png'));
        //     dev.scale = {x:2, y:2}
        //     dev.position = Devguy.pos[index]
        //     stage.addChild(dev)
        //     Devguy.devs[index] = dev
        // }
        // else{
            // var dev = new PIXI.Sprite(PIXI.Texture.fromImage('assets/dev_'+ index +'.png'));
        var alienImages = []
        // ["image_sequence_01.png","image_sequence_02.png","image_sequence_03.png","image_sequence_04.png"];

        for (i = 0; i < 3; i++){
            alienImages[i] = 'assets/' + index + '/dev_'+ index +'_idle_00' + (i+1) +  '.png'
        }

        var textureArray = [];

        for (var i=0; i < 3; i++)
        {
             var texture = PIXI.Texture.fromImage(alienImages[i]);
             textureArray.push(texture);
        };

        var dev = new PIXI.extras.MovieClip(textureArray);
        dev.play()
        dev.animationSpeed = Math.random() * 0.3

        dev.scale = {x:2, y:2}
        dev.position = Devguy.pos[index]
        stage.addChild(dev)
        Devguy.devs[index] = dev
        // }
    },
}

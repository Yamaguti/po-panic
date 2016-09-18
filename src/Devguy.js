Devguy = {
    pos: [
        {},
        {x: 380, y: 120},
        {x: 520, y: 190},
        {x: 240, y: 190},
        {x: 380, y: 260},
    ],

    devs: [],

    animations: {
        "desperate" : {minSpeed:0.05, maxSpeed:0.25},
        "happy" : {minSpeed:0.15, maxSpeed:0.3},
        "idle" : {minSpeed:0.1, maxSpeed:0.3},
        "onfire" : {minSpeed:0.3, maxSpeed:0.5},
        "sad" : {minSpeed:0.05, maxSpeed:0.1},
    },

    setAnimation: function(index, animation){
        var alienImages = []
        // ["image_sequence_01.png","image_sequence_02.png","image_sequence_03.png","image_sequence_04.png"];

        for (i = 0; i < 3; i++){
            alienImages[i] = 'assets/' + index + '/dev_'+ index +'_' + animation + '_00' + (i+1) +  '.png'
        }

        var textureArray = [];

        for (var i=0; i < 3; i++)
        {
             var texture = PIXI.Texture.fromImage(alienImages[i]);
             textureArray.push(texture);
        };

        var dev = new PIXI.extras.MovieClip(textureArray);
        dev.play()
        dev.animationSpeed = Devguy.animations[animation].minSpeed + Math.random() * (Devguy.animations[animation].maxSpeed - Devguy.animations[animation].minSpeed)

        dev.scale = {x:2, y:2}
        dev.position = Devguy.pos[index]
        stage.addChild(dev)
        if (Devguy.devs[index]){
            Devguy.devs[index].destroy()
        }
        Devguy.devs[index] = dev
    },

    setRandomAnimation: function(index){
        myArray = ["desperate", "happy", "idle", "onfire", "sad"]
        //Stolen from: http://stackoverflow.com/questions/4550505/getting-random-value-from-an-array#4550514
        var rand = myArray[Math.floor(Math.random() * myArray.length)];
        Devguy.setAnimation(index, rand)
    },

    setAllRandomAnimations: function(){
        for (i = 1; i < 5; i++){
            Devguy.setRandomAnimation(i)
        }
    },

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
        // var alienImages = []
        // // ["image_sequence_01.png","image_sequence_02.png","image_sequence_03.png","image_sequence_04.png"];

        // for (i = 0; i < 3; i++){
        //     alienImages[i] = 'assets/' + index + '/dev_'+ index +'_idle_00' + (i+1) +  '.png'
        // }

        // var textureArray = [];

        // for (var i=0; i < 3; i++)
        // {
        //      var texture = PIXI.Texture.fromImage(alienImages[i]);
        //      textureArray.push(texture);
        // };

        // var dev = new PIXI.extras.MovieClip(textureArray);
        // dev.play()
        // dev.animationSpeed = Math.random() * 0.3

        // dev.scale = {x:2, y:2}
        // dev.position = Devguy.pos[index]
        // stage.addChild(dev)
        // Devguy.devs[index] = dev
        // }
        Devguy.setAnimation(index, "idle")
    },
}

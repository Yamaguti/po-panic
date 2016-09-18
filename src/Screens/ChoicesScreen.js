
var ChoicesScreen = {}


var titleTextStyle       = {fontFamily : 'gameFontBold', fill: '#FE8C36',fontSize: 38, align : 'center', }
var descriptionTextStyle = {fontFamily : 'gameFont',     fill: '#EEEEEE',fontSize: 30, align : 'center', }


ChoicesScreen.newAnswerButton = function(params) {
    var group = new PIXI.Container();
    params = params || {}

    // Holder
    var holder = Utils.newImage({
        "name": "assets/ChoicesScreen/action_cell.png",
    })
    group.addChild(holder)

    // Button
    var button = Button.newButton("assets/ChoicesScreen/bt_doit.png", {
        "onRelease": params.onRelease,
    })

    button.position.x = holder.position.x
    button.position.y = holder.position.y + 103
    group.addChild(button)


    // Title
    var title = new PIXI.Text(params.option.text, titleTextStyle);
    group.addChild(title)
    title.position.x = holder.position.x;
    title.position.y = holder.position.y - 105;

    title.anchor.x = 0.5
    title.anchor.y = 0.5

    var descriptionY       = holder.position.y - 30
    var descriptionYOffset = 28

    // Descriptions
    var risk = new PIXI.Text("risk: " + params.option.risk + " %", descriptionTextStyle);
    group.addChild(risk)
    risk.position.x = holder.position.x - 83;
    risk.position.y = descriptionY;

    risk.anchor.x = 0
    risk.anchor.y = 0.5
    descriptionY  = descriptionY + descriptionYOffset;


    var reward = new PIXI.Text("reward: " + params.option.reward + " %", descriptionTextStyle);
    group.addChild(reward)
    reward.position.x = holder.position.x - 83;
    reward.position.y = descriptionY;

    reward.anchor.x = 0
    reward.anchor.y = 0.5
    descriptionY    = descriptionY + descriptionYOffset;


    // Description
    var time = new PIXI.Text("time: " + params.option.time + " %", descriptionTextStyle);
    group.addChild(time)
    time.position.x = holder.position.x - 83;
    time.position.y = descriptionY;

    time.anchor.x = 0
    time.anchor.y = 0.5


    return group
}


ChoicesScreen.showPlayerOptions = function(index) {
    for (i = 0; i < 3; i++) {
        var option = gameQuestions.playerOptions[index].options[i];
        var group = ChoicesScreen.newAnswerButton({
            "option" : option,
        })
        stage.addChild(group)

        group.position.x = centerX - (i - 1) * 240
        group.position.y = centerY

        group.scale.x = 0.001
        group.scale.y = 0.001
        TransitionManager.startTransition(group.scale, {
            "time": 500,
            "x" : 1,
            "y" : 1,
            "easing" : "outBack",
        })
    }

    // // create a texture from an image path
    // var texture = PIXI.Texture.fromImage('assets/options_popup.png');

    // // create a new Sprite using the texture
    // var basepopup = new PIXI.Sprite(texture);

    // // center the sprite's anchor point
    // basepopup.anchor.x = 0.5;
    // basepopup.anchor.y = 0.5;

    // // move the sprite to the center of the scree
    // stage.addChild(basepopup);


    // var style = {
    // font : 'bold italic 12px Arial',
    // fill : '#000000',
    // //stroke : '#4a1850',
    // //strokeThickness : 5,
    // //dropShadow : true,
    // //dropShadowColor : '#000000',
    // //dropShadowAngle : Math.PI / 6,
    // //dropShadowDistance : 6,
    // wordWrap : true,
    // wordWrapWidth : 300
    // };

    // var questionLabel = new PIXI.Text(gameQuestions.playerOptions[index].question,style);
    // questionLabel.x = 30;
    // questionLabel.y = 90;

    // var optionALabel = new PIXI.Text(gameQuestions.playerOptions[index].options[0].text,style);
    // optionALabel.x = 30;
    // optionALabel.y = 150;

    // var optionBLabel = new PIXI.Text(gameQuestions.playerOptions[index].options[1].text,style);
    // optionBLabel.x = 30;
    // optionBLabel.y = 250;

    // var optionCLabel = new PIXI.Text(gameQuestions.playerOptions[index].options[2].text,style);
    // optionCLabel.x = 30;
    // optionCLabel.y = 350;

    // stage.addChild(optionALabel);
    // stage.addChild(optionBLabel);
    // stage.addChild(optionCLabel);
    // stage.addChild(questionLabel);
}

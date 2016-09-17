function showPlayerOptions(index){
	console.log("show option of index " + index)
	console.log(gameQuestions.playerOptions[index].question);
	console.log("main stage is ")
	// create a texture from an image path
	var texture = PIXI.Texture.fromImage('assets/options_popup.png');
	
	// create a new Sprite using the texture
	var basepopup = new PIXI.Sprite(texture);

	// center the sprite's anchor point
	basepopup.anchor.x = 0.5;
	basepopup.anchor.y = 0.5;

	// move the sprite to the center of the scree
	stage.addChild(basepopup);


	var style = {
    font : 'bold italic 12px Arial',
    fill : '#000000',
    //stroke : '#4a1850',
    //strokeThickness : 5,
    //dropShadow : true,
    //dropShadowColor : '#000000',
    //dropShadowAngle : Math.PI / 6,
    //dropShadowDistance : 6,
    wordWrap : true,
    wordWrapWidth : 300
	};

	var questionLabel = new PIXI.Text(gameQuestions.playerOptions[index].question,style);
	questionLabel.x = 30;
	questionLabel.y = 90;

	var optionALabel = new PIXI.Text(gameQuestions.playerOptions[index].options[0].text,style);
	optionALabel.x = 30;
	optionALabel.y = 150;

	var optionBLabel = new PIXI.Text(gameQuestions.playerOptions[index].options[1].text,style);
	optionBLabel.x = 30;
	optionBLabel.y = 250;

	var optionCLabel = new PIXI.Text(gameQuestions.playerOptions[index].options[2].text,style);
	optionCLabel.x = 30;
	optionCLabel.y = 350;

	stage.addChild(optionALabel);
	stage.addChild(optionBLabel);
	stage.addChild(optionCLabel);
	stage.addChild(questionLabel);
}
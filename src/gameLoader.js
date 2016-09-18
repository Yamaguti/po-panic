
function onAssetsLoaded(evt)
{
	gameData = evt;

	gameQuestions = gameData.resources.questions.data;
	gameConfig = gameData.resources.config.data;
	gameTutorials = gameData.resources.tutorials.data;
	///start the game here, all files are loaded
}

//unique instance
var loader = PIXI.loader;

//static data variables
var gameQuestions;
var gameEvents;
var gameConfig;
var gameTutorials;

//load all JSONS
loader.add('questions',"configs/gameQuestions.json");
loader.add('config',"configs/gameConfig.json");
loader.add('tutorials',"configs/tutorial.json");

//complete callback
loader.on('complete',onAssetsLoaded);

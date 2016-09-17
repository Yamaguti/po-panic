console.log("loader")


function onAssetsLoaded(evt)
{
	gameData = evt;

	gameEvents = gameData.resources.events.data;
	gameQuestions = gameData.resources.questions.data;
	gameConfig = gameData.resources.config.data;

	///start the game here, all files are loaded
	showPlayerOptions(0);
}

//unique instance
var loader = PIXI.loader;

//static data variables
var gameQuestions;
var gameEvents;
var gameConfig;

//load all JSONS
loader.add('questions',"configs/gameQuestions.json");
loader.add('config',"configs/gameConfig.json");
loader.add('events',"configs/gameEvents.json");

//complete callback
loader.on('complete',onAssetsLoaded);
var gameEngine = new GameEngine();

var ASSET_MANAGER = new AssetManager();

// sound effects
ASSET_MANAGER.queueDownload("./audio/burstkick.wav");
ASSET_MANAGER.queueDownload("./audio/birdKick.mp3");
ASSET_MANAGER.queueDownload("./audio/yap.mp3");
ASSET_MANAGER.queueDownload("./audio/gokukick.mp3");
ASSET_MANAGER.queueDownload("./audio/gokurun.mp3");
ASSET_MANAGER.queueDownload("./audio/gokupunch.mp3");
ASSET_MANAGER.queueDownload("./audio/gokupower.mp3");

// music
ASSET_MANAGER.queueDownload("./music/Damn.mp4");
ASSET_MANAGER.queueDownload("./music/gokutheme.mp3");
ASSET_MANAGER.queueDownload("./music/ChunLi.mp3");
ASSET_MANAGER.queueDownload("./music/Dr. Wily's Castle.mp3");
ASSET_MANAGER.queueDownload("./music/tecmoBowl.mp3");
ASSET_MANAGER.queueDownload("./music/Welcome to the Jungle.mp3");
ASSET_MANAGER.queueDownload("./music/KenStage.mp3");



// spritesheets
ASSET_MANAGER.queueDownload("./sprites/spritesheet.png");
ASSET_MANAGER.queueDownload("./sprites/spritesheet1.png");

ASSET_MANAGER.queueDownload("./sprites/goku_spritesheet.png");
ASSET_MANAGER.queueDownload("./sprites/goku_spritesheetmirror.png");

ASSET_MANAGER.queueDownload("./sprites/tilesetsprite.png");

ASSET_MANAGER.queueDownload("./sprites/fighterLR.png");

ASSET_MANAGER.queueDownload("./sprites/falls.png");

ASSET_MANAGER.queueDownload("./sprites/backdrop.png");
 
ASSET_MANAGER.queueDownload("./sprites/ChunLi.png"); 

ASSET_MANAGER.queueDownload("./sprites/BillyLee.png");
ASSET_MANAGER.queueDownload("./sprites/round1.png");
ASSET_MANAGER.queueDownload("./sprites/waterfallsprite.png");

//For the oilrig level
ASSET_MANAGER.queueDownload("./sprites/OILRIG.png");
ASSET_MANAGER.queueDownload("./sprites/OCEAN.png");
ASSET_MANAGER.queueDownload("./sprites/Propeller.png");
ASSET_MANAGER.queueDownload("./sprites/sky.png");
ASSET_MANAGER.queueDownload("./sprites/CRANE.png");


ASSET_MANAGER.downloadAll(function () {

ASSET_MANAGER.autoRepeat("./music/Damn.mp4");
ASSET_MANAGER.autoRepeat("./music/KenStage.mp3");
ASSET_MANAGER.autoRepeat("./music/Dr. Wily's Castle.mp3");
ASSET_MANAGER.autoRepeat("./music/Welcome to the Jungle.mp3");

	var canvas = document.getElementById('gameWorld');
	var ctx = canvas.getContext('2d');

	gameEngine.init(ctx);
	gameEngine.addEntity(new SceneManager(gameEngine));
	gameEngine.start();


});

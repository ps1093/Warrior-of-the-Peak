var gameEngine = new GameEngine();

var ASSET_MANAGER = new AssetManager();


ASSET_MANAGER.queueDownload("./sprites/spritesheet.png");
ASSET_MANAGER.queueDownload("./sprites/spritesheet1.png");

ASSET_MANAGER.queueDownload("./sprites/tilesetsprite.png");

ASSET_MANAGER.queueDownload("./sprites/fighterLR.png");

ASSET_MANAGER.queueDownload("./sprites/falls.png");

ASSET_MANAGER.queueDownload("./sprites/backdrop.png");
 
ASSET_MANAGER.queueDownload("./sprites/ChunLi.png"); 

ASSET_MANAGER.queueDownload("./sprites/BillyLee.png");
<<<<<<< HEAD
=======
ASSET_MANAGER.queueDownload("./sprites/round1.png");
ASSET_MANAGER.queueDownload("./sprites/waterfallsprite.png");

//For the oilrig level
ASSET_MANAGER.queueDownload("./sprites/OILRIG.png");
ASSET_MANAGER.queueDownload("./sprites/OCEAN.png");
ASSET_MANAGER.queueDownload("./sprites/Propeller.png");
ASSET_MANAGER.queueDownload("./sprites/sky.png");
ASSET_MANAGER.queueDownload("./sprites/CRANE.png");

>>>>>>> 16b4a6a54677cbaa7045b18d0dcf656ddfb6f2e2

ASSET_MANAGER.downloadAll(function () {
	var canvas = document.getElementById('gameWorld');
	var ctx = canvas.getContext('2d');

	gameEngine.init(ctx);
	gameEngine.addEntity(new SceneManager(gameEngine));
	gameEngine.start();


});

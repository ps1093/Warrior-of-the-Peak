var gameEngine = new GameEngine();

var ASSET_MANAGER = new AssetManager();


ASSET_MANAGER.queueDownload("./sprites/spritesheet.png");

ASSET_MANAGER.queueDownload("./sprites/tilesetsprite1.png");

ASSET_MANAGER.queueDownload("./sprites/fighterLR.png");

ASSET_MANAGER.queueDownload("./sprites/falls.png");

ASSET_MANAGER.queueDownload("./sprites/backdrop.png");

<<<<<<< HEAD
ASSET_MANAGER.queueDownload("./sprites/ChunLi.png");

ASSET_MANAGER.queueDownload("./sprites/BillyLee.png");
=======
ASSET_MANAGER.queueDownload("./sprites/round1.png");
>>>>>>> fef43a8d8e53b0599993cbdc81966bfa7df61e9e

ASSET_MANAGER.downloadAll(function () {
	var canvas = document.getElementById('gameWorld');
	var ctx = canvas.getContext('2d');

	gameEngine.init(ctx);
	gameEngine.addEntity(new SceneManager(gameEngine));
	gameEngine.start();




});

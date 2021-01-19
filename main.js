var gameEngine = new GameEngine();

var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./sprites/spritesheet.png");

ASSET_MANAGER.downloadAll(function () {
	var canvas = document.getElementById('gameWorld');
	var ctx = canvas.getContext('2d');

	var karateplayer = new KaratePlayer(gameEngine);
	gameEngine.init(ctx);
	gameEngine.addEntity(karateplayer);
	gameEngine.start();
});

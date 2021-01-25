class background {
    constructor(gameEngine, x, y) {
        Object.assign(this, {gameEngine, x, y});
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/falls.png");
        this.animation = new Animator(this.spritesheet, 0, 0, 1024, 576, 8, 0.15, 0, false, true);
    };


    draw(ctx) {
       
        this.animation.drawFrame(this.gameEngine.clockTick, ctx, this.x, this.y, 1);
    }

    update() {

    }

}
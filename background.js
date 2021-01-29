class BackGround {
    constructor(gameEngine, x, y) {
        Object.assign(this, {gameEngine, x, y});
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/falls.png");
        this.spritesheet1 = ASSET_MANAGER.getAsset("./sprites/round1.png");
        this.animation = new Animator(this.spritesheet, 0, 0, 1024, 576, 8, 0.15, 0, false, true);
        this.animation1 = new Animator(this.spritesheet1, 5, 5, 583, 360, 1, 0.50, 0, false, true);
        this.BB = new BoundingBox(this.x, this.y+191, 1024, 386);
        
    };


    draw(ctx) {

        if(PARAMS.DEBUG){
            ctx.strokeStyle = "Red";
            ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
        }
       
        this.animation.drawFrame(this.gameEngine.clockTick, ctx, this.x, this.y, 1);
        this.animation1.drawFrame(this.gameEngine.clockTick, ctx, this.x, this.y, 0.35);
    }

    update() {

    };

};

class BackScene{
    constructor(game, x, y, w, h){
        
        Object.assign(this,{game, x, y, w, h});
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/waterfallsprite.png");

        this.BB = new BoundingBox(this.x, this.y, this.w,this.h);
        this.leftBB = new BoundingBox(this.x, this.y, 0, this.h);
        this.rightBB = new BoundingBox(this.x + this.w, this.y, 0,this.h);

    };

    update(){

    };

    draw(ctx){
        ctx.drawImage(this.spritesheet,this.x, this.y, this.w, this.h,this.x, this.y, this.w, this.h);

        //Debug
        if(PARAMS.DEBUG){
            ctx.strokeStyle = "Red";
            ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width,this.BB.height);
        }
        
    };
};



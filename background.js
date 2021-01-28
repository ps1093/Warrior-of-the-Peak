class BackGround {
    constructor(gameEngine, x, y) {
        Object.assign(this, {gameEngine, x, y});
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/falls.png");
        this.animation = new Animator(this.spritesheet, 0, 0, 1024, 576, 8, 0.15, 0, false, true);
    };


    draw(ctx) {
       
        this.animation.drawFrame(this.gameEngine.clockTick, ctx, this.x, this.y, 1);
    }

    update() {

    };

};

class BackScene{
    constructor(game, x, y, w, h){
        
        Object.assign(this,{game, x, y, w, h});
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/backdrop.png");

        this.BB = new BoundingBox(this.x, this.y, this.w,this.h);
        this.leftBB = new BoundingBox(this.x, this.y, 0, this.h);
        this.rightBB = new BoundingBox(this.x + this.w, this.y, 0,this.h);

    };

    update(){

    };

    draw(ctx){
        ctx.drawImage(this.spritesheet, 0,0,1,1,0,0, 1024, 626);
        ctx.strokeStyle = "#1da1d1";
        ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width,this.BB.height-1);
        ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width,this.BB.height-2);
        //Debug
        if(PARAMS.DEBUG){
            ctx.strokeStyle = "Red";
            ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width,this.BB.height);
        }
        
    };
};
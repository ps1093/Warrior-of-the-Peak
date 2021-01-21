class KaratePlayer{
    constructor(game, x, y){
        Object.assign(this, {game, x, y});
        
        this.width = 60;
        this.height = 90;
        this.game.KaratePlayer = this;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/spritesheet.png");
        
        this.animation = new Animator(this.spritesheet, 1142,10, this.width,this.height ,7,.15,0,false, true);
        //this.loadAnimations();

        
    };

    update(){

    };


    draw(ctx){
        if(PARAMS.DEBUG){
            ctx.strokeStyle = "Red";
            ctx.strokeRect(this.x, this.y, this.width, this.height);
        };
        this.animation.drawFrame(this.game.clockTick, ctx, 450,300,1);
    };
};
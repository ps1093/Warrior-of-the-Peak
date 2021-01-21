class MountainScene{
    constructor(game, x, y){
        Object.assign(this, {game, x, y});
        this.width = 1024;
        this.height = 768;
        

       // this.width = 16;
       // this.height = 20;

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/mtnspritesheet.png");

        this.animation = new Animator(this.spritesheet, 0,0, this.width,this.height ,40,.15,0,false, true);
        //this.loadAnimations();

        
    };

    update(){

    };


    draw(ctx){

        this.animation.drawFrame(this.game.clockTick, ctx, this.x,this.y,PARAMS.SCALE);
    };
};
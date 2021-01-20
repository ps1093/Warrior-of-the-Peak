class MountainScene{
    constructor(game){
        Object.assign(this, {game});

       // this.width = 16;
       // this.height = 20;

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/mtnspritesheet.png");

        this.animation = new Animator(this.spritesheet, 0,0, 1024,768 ,40,.15,0,false, true);
        //this.loadAnimations();

        
    };

    update(){

    };


    draw(ctx){
        this.animation.drawFrame(this.game.clockTick, ctx, 0,0,1);
    };
};
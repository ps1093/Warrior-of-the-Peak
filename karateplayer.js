class KaratePlayer{
    constructor(game){
        Object.assign(this, {game});

       // this.width = 16;
       // this.height = 20;

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/spritesheet.png");

        this.animation = new Animator(this.spritesheet, 1142,10, 60,90 ,7,.15,0,false, true);
        //this.loadAnimations();

        
    };

    update(){

    };


    draw(ctx){
        this.animation.drawFrame(this.game.clockTick, ctx, 450,300,3);
    };
};
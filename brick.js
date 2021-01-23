class Ground {
    constructor(game, x, y, w){
        Object.assign(this, {game, x, y, w});

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/tilesetsprite.png");
    };


update(){

};

draw(ctx){
    let brickCount = this.w / PARAMS.BLOCKWIDTH;
    ctx.drawImage(this.spritesheet, 400,350, 16, 16);
    // for(var i = 0; i < brickCount - 2 * PARAMS.BLOCLWIDTH; i++){
    //     ctx.drawth
    // }
}






}
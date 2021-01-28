class Ground {
    constructor(game, x, y, w){
        Object.assign(this, {game, x, y, w});

        this.newy = 626;
        this.height = 142;
       

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/tilesetsprite1.png");
    };


update(){

};

draw(ctx){
    //Debug
    if(PARAMS.DEBUG){
        ctx.strokeStyle = "Red";
        ctx.strokeRect(this.x, this.newy, this.w,this.height);
    }


    //First layer of brick
    ctx.drawImage(this.spritesheet, 0,96, 47, 47, 0, this.y, PARAMS.BLOCKWIDTH*3,PARAMS.BLOCKWIDTH*3);
    for(var i =48 ; i <= this.w - 47; i+=47){
        ctx.drawImage(this.spritesheet, 48,96, 47, 47, i, this.y, PARAMS.BLOCKWIDTH*3,PARAMS.BLOCKWIDTH*3);        
    }
    ctx.drawImage(this.spritesheet, 96,96, 47, 47, 1024-47, this.y, PARAMS.BLOCKWIDTH*3,PARAMS.BLOCKWIDTH*3);

    //Second layer of brick
    ctx.drawImage(this.spritesheet, 0,48, 47, 47, 0, this.y-47, PARAMS.BLOCKWIDTH*3,PARAMS.BLOCKWIDTH*3);
    for(var i =48 ; i <= this.w - 47; i+=47){
        ctx.drawImage(this.spritesheet, 48,48, 47, 47, i, this.y-47, PARAMS.BLOCKWIDTH*3,PARAMS.BLOCKWIDTH*3);        
    }
    ctx.drawImage(this.spritesheet, 96,48, 47, 47, 1024-47, this.y-47, PARAMS.BLOCKWIDTH*3,PARAMS.BLOCKWIDTH*3);

    //Drawing Grass layer
    ctx.drawImage(this.spritesheet, 0,0, 47, 47, 0, this.y-94, PARAMS.BLOCKWIDTH*3,PARAMS.BLOCKWIDTH*3);
    for(var i =48 ; i <= this.w - 47; i+=47){
        ctx.drawImage(this.spritesheet, 48,0, 47, 47, i, this.y-94, PARAMS.BLOCKWIDTH*3,PARAMS.BLOCKWIDTH*3);        
    }
    ctx.drawImage(this.spritesheet, 96,0, 47, 47, 1024-47, this.y-94, PARAMS.BLOCKWIDTH*3,PARAMS.BLOCKWIDTH*3);
}






}
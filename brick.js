class Ground {
    constructor(game, x, y, w){
        Object.assign(this, {game, x, y, w});

        this.newy = 626;
        this.height = 64;

        this.BB = new BoundingBox(this.x, this.y - PARAMS.BLOCKWIDTH * 4, this.w, PARAMS.BLOCKWIDTH * 6);
        // this.leftBB = new BoundingBox(this.x, this.y - PARAMS.BLOCKWIDTH * 4, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH * 6);
        // this.rightBB = new BoundingBox(this.x + this.w - PARAMS.BLOCKWIDTH, this.y- PARAMS.BLOCKWIDTH * 4, PARAMS.BLOCKWIDTH,PARAMS.BLOCKWIDTH * 6);
       

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/tilesetsprite.png");
    };


update(){

};

draw(ctx){
    //Debug
    if(PARAMS.DEBUG){
        ctx.strokeStyle = "Red";
        ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
    }

    //First layer of brick
    ctx.drawImage(this.spritesheet, 0,32,PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH,this.x, this.y,PARAMS.BLOCKWIDTH*2, PARAMS.BLOCKWIDTH*2);
    for(var i = PARAMS.BLOCKWIDTH * 2; i < this.w - PARAMS.BLOCKWIDTH*2; i+=PARAMS.BLOCKWIDTH * 2){
        ctx.drawImage(this.spritesheet, 16,32, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, i, this.y, PARAMS.BLOCKWIDTH*2,PARAMS.BLOCKWIDTH*2);        
    }
    ctx.drawImage(this.spritesheet, 32,32,PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH,this.w - PARAMS.BLOCKWIDTH * 2, this.y,PARAMS.BLOCKWIDTH*2, PARAMS.BLOCKWIDTH*2);

    //Second Layer
    ctx.drawImage(this.spritesheet, 0,16,PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH,this.x, this.y - PARAMS.BLOCKWIDTH * 2,PARAMS.BLOCKWIDTH*2, PARAMS.BLOCKWIDTH*2);
    for(var i = PARAMS.BLOCKWIDTH * 2 ; i < this.w - PARAMS.BLOCKWIDTH * 2; i+= PARAMS.BLOCKWIDTH * 2){
        ctx.drawImage(this.spritesheet, PARAMS.BLOCKWIDTH,PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH , i, this.y - PARAMS.BLOCKWIDTH * 2, PARAMS.BLOCKWIDTH*2,PARAMS.BLOCKWIDTH*2);        
    }
    ctx.drawImage(this.spritesheet, PARAMS.BLOCKWIDTH * 2,PARAMS.BLOCKWIDTH,PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH,this.w - PARAMS.BLOCKWIDTH * 2, this.y - PARAMS.BLOCKWIDTH * 2,PARAMS.BLOCKWIDTH*2, PARAMS.BLOCKWIDTH*2);

    //Third Layer
    ctx.drawImage(this.spritesheet, 0,0,PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH,this.x, this.y - PARAMS.BLOCKWIDTH * 4,PARAMS.BLOCKWIDTH*2, PARAMS.BLOCKWIDTH*2);
    for(var i = PARAMS.BLOCKWIDTH * 2 ; i < this.w - PARAMS.BLOCKWIDTH * 2; i+= PARAMS.BLOCKWIDTH * 2){
        ctx.drawImage(this.spritesheet, PARAMS.BLOCKWIDTH,this.x, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH , i, this.y - PARAMS.BLOCKWIDTH * 4, PARAMS.BLOCKWIDTH*2,PARAMS.BLOCKWIDTH*2);        
    }
    ctx.drawImage(this.spritesheet, PARAMS.BLOCKWIDTH * 2,0,PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH,this.w - PARAMS.BLOCKWIDTH * 2, this.y - PARAMS.BLOCKWIDTH * 4,PARAMS.BLOCKWIDTH*2, PARAMS.BLOCKWIDTH*2);
    
};






}
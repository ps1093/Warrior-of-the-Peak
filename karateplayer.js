class KaratePlayer{


    constructor(game, x, y){
        Object.assign(this, {game, x, y});
        this.game.KaratePlayer = this;
  
        this.width = 60;
        this.height = 90;

        this.STATE = {
            WALK: 0,
            IDLE: 1,
            PUNCH: 2,
            KICK: 3,
            DUCK:  4,
            JUMP:  5,
            FLIP: 6
        };
    
        this.FACING = {
            RIGHT:  0,
            LEFT: 1
        };


        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/spritesheet.png");
        
        this.facing = this.FACING.RIGHT;
        this.state = this.STATE.IDLE;
       
        this.animations = [];
  
        this.loadAnimations();
        
    };



    loadAnimations(){

        for(var i = 0; i < 7; i++){
            this.animations.push([]);
            for(var j = 0; j < 2; j++){
                this.animations[i].push([]);
            }
        }


        //****** IDLE LEFT & RIGHT *********
        this.animations[this.STATE.IDLE][this.FACING.RIGHT]
            = new Animator(this.spritesheet, 2520,10, this.width,this.height ,2,.15,0,false, true);
        this.animations[this.STATE.IDLE][this.FACING.LEFT]
            = new Animator(this.spritesheet, 2645,10, this.width,this.height ,2,.15,0,false, true);
    
        //******* WALK LEFT & RIGHT *********
        this.animations[this.STATE.WALK][this.FACING.RIGHT]
            = new Animator(this.spritesheet, 120,10, this.width,this.height ,4,.2,0,false, true);
        this.animations[this.STATE.WALK][this.FACING.LEFT]
            = new Animator(this.spritesheet, 365,10, this.width,this.height ,4,.2,0,false, true);
    
         //******* Punch Right & LEFT ********
         this.animations[this.STATE.PUNCH][this.FACING.RIGHT] 
             = new Animator(this.spritesheet, 602,10, this.width,this.height ,2,.2,0,false, true);
         this.animations[this.STATE.PUNCH][this.FACING.LEFT]
             = new Animator(this.spritesheet, 720,10, this.width,this.height ,2,.2,0,false, true);
    
         //******* Kick Right & Left *******
         this.animations[this.STATE.KICK][this.FACING.RIGHT]
             = new Animator(this.spritesheet, 840,10, this.width,this.height ,6,.08,0,false, true);
         this.animations[this.STATE.KICK][this.FACING.LEFT]
             = new Animator(this.spritesheet, 1200,10, this.width,this.height ,6,.08,0,false, true);
    
         //****** Duck Left & Right ******
         this.animations[this.STATE.DUCK][this.FACING.RIGHT]
             = new Animator(this.spritesheet, 1561,10, this.width,this.height ,2,.15,0,false, true);
         this.animations[this.STATE.DUCK][this.FACING.LEFT]
             = new Animator(this.spritesheet, 1680,10, this.width,this.height ,2,.15,0,false, true);
    
         //****** Jump Right & Left ******
         this.animations[this.STATE.JUMP][this.FACING.RIGHT]
             = new Animator(this.spritesheet, 1800,5, this.width,this.height ,6,.15,0,false, true);
         this.animations[this.STATE.JUMP][this.FACING.LEFT]
             = new Animator(this.spritesheet, 2160,5, this.width,this.height ,6,.15,0,false, true);

        //****** Back Flip Left & Right ******
        this.animations[this.STATE.FLIP][this.FACING.RIGHT]
         = new Animator(this.spritesheet, 2759,0, this.width,this.height ,9,.1,0,false, true);
        this.animations[this.STATE.FLIP][this.FACING.LEFT]
         = new Animator(this.spritesheet, 3300,0, this.width,this.height ,9,.1,0,false, true);
    };

    update(){

        let action = false;
        
        //Jump
        if(this.game.W){
            this.state = this.STATE.JUMP;
            action = true;
        } 
        //Duck
        if (this.game.S){
            this.state = this.STATE.DUCK;
            action = true;
        }
        //Walk 
        if(this.game.D){
            this.facing = this.FACING.RIGHT;
            this.state = this.STATE.WALK;
            this.x += 5;
            action = true;
        } else if(this.game.A){
            this.facing = this.FACING.LEFT;
            this.state = this.STATE.WALK;
            this.x -= 5;
            action = true;
        }
        //Kick
        if(this.game.P && (this.facing === this.FACING.RIGHT)){
            this.facing = this.FACING.RIGHT;
            this.state = this.STATE.KICK;
            this.y -= 3;
            this.y += 3;
            action = true;
        } else if (this.game.P && (this.facing === this.FACING.LEFT)){
            this.facing = this.FACING.LEFT;
            this.state = this.STATE.KICK;
            this.y -= 3;
            this.y += 3;
            action = true;
        }
        //Punch
        if(this.game.C && this.facing === this.FACING.RIGHT){
            this.facing = this.FACING.RIGHT;
            this.state = this.STATE.PUNCH;
            action = true;
        } else if(this.game.C && this.facing === this.FACING.LEFT){
            this.facing = this.FACING.LEFT;
            this.state = this.STATE.PUNCH;
            action = true;
        }

        //Flips
        if((this.game.W) && (this.game.A)){
            this.facing = this.FACING.RIGHT;
            this.state = this.STATE.FLIP;
            this.x -=1;
            action = true;
        } else if((this.game.D) && (this.game.W)){
            this.facing = this.FACING.LEFT;
            this.state = this.STATE.FLIP;
            this.x +=1;
            action = true;
        }
        //If character is not performing an action, he will be idle.
        if(!action? this.state = this.STATE.IDLE: action =false);
    };


    draw(ctx){
        if(PARAMS.DEBUG){
            ctx.strokeStyle = "Red";
            ctx.strokeRect(this.x, this.y, this.width*2, this.height*2);
        };
        if(this.state === this.STATE.JUMP){
            this.animations[this.state][this.facing].drawFrame(this.game.clockTick,ctx, this.x, this.y-8, 2);
        } else if(this.state === this.STATE.FLIP){
            this.animations[this.state][this.facing].drawFrame(this.game.clockTick,ctx, this.x, this.y-18, 2);
        } else {
            this.animations[this.state][this.facing].drawFrame(this.game.clockTick,ctx, this.x, this.y, 2);
        }
    };
};b
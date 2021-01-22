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
            JUMP:  5
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

        for(var i = 0; i < 6; i++){
            this.animations.push([]);
            for(var j = 0; j < 2; j++){
                this.animations[i].push([]);
            }
        }


        //****** IDLE LEFT & RIGHT *********
        this.animations[this.STATE.IDLE][this.FACING.RIGHT]
            = new Animator(this.spritesheet, 3056,10, this.width,this.height ,2,.15,0,false, true);
        this.animations[this.STATE.IDLE][this.FACING.LEFT]
            = new Animator(this.spritesheet, 3184,10, this.width,this.height ,2,.15,0,false, true);
    
        //******* WALK LEFT & RIGHT *********
        this.animations[this.STATE.WALK][this.FACING.RIGHT]
            = new Animator(this.spritesheet, 176,10, this.width,this.height ,4,.2,0,false, true);
        this.animations[this.STATE.WALK][this.FACING.LEFT]
            = new Animator(this.spritesheet, 420,10, this.width,this.height ,4,.2,0,false, true);
    
         //******* Punch Right & LEFT ********
         this.animations[this.STATE.PUNCH][this.FACING.RIGHT] 
             = new Animator(this.spritesheet, 784,10, this.width,this.height ,2,.2,0,false, true);
         this.animations[this.STATE.PUNCH][this.FACING.LEFT]
             = new Animator(this.spritesheet, 1024,10, this.width,this.height ,2,.2,0,false, true);
    
         //******* Kick Right & Left *******
         this.animations[this.STATE.KICK][this.FACING.RIGHT]
             = new Animator(this.spritesheet, 1142,10, this.width,this.height ,7,.08,0,false, true);
         this.animations[this.STATE.KICK][this.FACING.LEFT]
             = new Animator(this.spritesheet, 1558,10, this.width,this.height ,7,.08,0,false, true);
    
         //****** Duck Left & Right ******
         this.animations[this.STATE.DUCK][this.STATE.RIGHT]
             = new Animator(this.spritesheet, 1984,10, this.width,this.height ,2,.15,0,false, true);
         this.animations[this.STATE.DUCK][this.STATE.LEFT]
             = new Animator(this.spritesheet, 2099,10, this.width,this.height ,2,.15,0,false, true);
    
         //****** Jump Right & Left ******
         this.animations[this.STATE.JUMP][this.STATE.RIGHT]
             = new Animator(this.spritesheet, 2220,5, this.width,this.height ,6,.15,0,false, true);
         this.animations[this.STATE.JUMP][this.STATE.LEFT]
             = new Animator(this.spritesheet, 2580,5, this.width,this.height ,6,.15,0,false, true);
    };

    update(){

        let action = false;
        
        if(this.game.W){
            this.state = this.STATE.JUMP;
            this.game.y -= 10;
            action = true;
        } 
        if (this.game.S){
            this.state = this.STATE.DUCK;
            this.y += 1;
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
        //If character is not performing an action, he will be idle.
        if(!action? this.state = this.STATE.IDLE: action =false);
    };


    draw(ctx){
        if(PARAMS.DEBUG){
            ctx.strokeStyle = "Red";
            ctx.strokeRect(this.x, this.y, this.width*3, this.height*3);
        };
        this.animations[this.state][this.facing].drawFrame(this.game.clockTick,ctx, this.x, this.y, 3);
    };
};
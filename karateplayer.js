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
            FLIP: 6,
            ROLL: 7
        };
    
        this.FACING = {
            RIGHT:  0,
            LEFT: 1
        };

        this.velocity = {x:0, y:0};
        this.fallAcc = 562.5;
        this.jumping = false;

        this.updateBB();


        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/spritesheet.png");
        
        this.facing = this.FACING.RIGHT;
        this.state = this.STATE.IDLE;
       
        this.animations = [];
  
        this.loadAnimations();
        
    };



    loadAnimations(){

        for(var i = 0; i < 8; i++){
            this.animations.push([]);
            for(var j = 0; j < 2; j++){
                this.animations[i].push([]);
            }
        }


        //****** IDLE LEFT & RIGHT *********
        this.animations[this.STATE.IDLE][this.FACING.RIGHT]
            = new Animator(this.spritesheet, 2400,20, this.width,this.height ,2,.15,0,false, true);
        this.animations[this.STATE.IDLE][this.FACING.LEFT]
            = new Animator(this.spritesheet, 2525,20, this.width,this.height,2,.15,0,false, true);
    
        //******* WALK LEFT & RIGHT *********
        this.animations[this.STATE.WALK][this.FACING.RIGHT]
            = new Animator(this.spritesheet, 0,16, this.width,this.height ,4,.2,0,false, true);
        this.animations[this.STATE.WALK][this.FACING.LEFT]
            = new Animator(this.spritesheet, 240,16, this.width,this.height ,4,.2,0,false, true);
    
         //******* Punch Right & LEFT ********
         this.animations[this.STATE.PUNCH][this.FACING.RIGHT] 
             = new Animator(this.spritesheet, 482,22, this.width,this.height ,2,.2,0,false, true);
         this.animations[this.STATE.PUNCH][this.FACING.LEFT]
             = new Animator(this.spritesheet, 603,22, this.width,this.height ,2,.2,0,false, true);
    
         //******* Kick Right & Left *******
         this.animations[this.STATE.KICK][this.FACING.RIGHT]
             = new Animator(this.spritesheet, 722,16, this.width,this.height ,6,.1,0,false, true);
         this.animations[this.STATE.KICK][this.FACING.LEFT]
             = new Animator(this.spritesheet, 1083,16, this.width,this.height ,6,.1,0,false, true);
    
         //****** Duck Left & Right ******
         this.animations[this.STATE.DUCK][this.FACING.RIGHT]
             = new Animator(this.spritesheet, 1503,40, this.width,this.height ,1,.15,0,false, true);
         this.animations[this.STATE.DUCK][this.FACING.LEFT]
             = new Animator(this.spritesheet, 1623,40, this.width,this.height ,1,.15,0,false, true);
    
         //****** Jump Right & Left ******
         this.animations[this.STATE.JUMP][this.FACING.RIGHT]
             = new Animator(this.spritesheet, 1980,16, this.width,this.height ,1,.15,0,false, true);
         this.animations[this.STATE.JUMP][this.FACING.LEFT]
             = new Animator(this.spritesheet, 2342,22, this.width,this.height ,1,.15,0,false, true);

        //****** Back Flip Left & Right ******
        this.animations[this.STATE.FLIP][this.FACING.RIGHT]
         = new Animator(this.spritesheet, 2880,19, this.width,this.height ,5,.1,0,false, true);
        this.animations[this.STATE.FLIP][this.FACING.LEFT]
         = new Animator(this.spritesheet, 3423,19, this.width,this.height ,5,.1,0,false, true);

        //****** Roll Left & Right ******
        this.animations[this.STATE.ROLL][this.FACING.RIGHT]
        = new Animator(this.spritesheet, 3780,31, this.width,this.height ,5,.1,0,false, true);
       this.animations[this.STATE.ROLL][this.FACING.LEFT]
        = new Animator(this.spritesheet, 4083,31, this.width,this.height ,5,.1,0,false, true);
    };

    updateBB(){
        this.lastBB = this.BB;
        if(this.facing === this.FACING.RIGHT){
            this.BB = new BoundingBox(this.x, this.y, this.width + 45, this.height * 1.75);
        } else {
            this.BB = new BoundingBox(this.x+5, this.y, this.width + 45, this.height * 1.75);
        }
    };

    update(){
        const RUN = 2;
        const ROLL = 2.9;
        const JUMPING = 3.5
        const CLOCKSCALE = 120;
        const TICK = this.game.clockTick * CLOCKSCALE;
        const TICK1 = this.game.clockTick;
        const STOP_FALL = 100;

        if(this.state !== this.STATE.JUMP || this.state !== this.STATE.FLIP){
            //Walk
            if(this.game.D){
                this.velocity.x += .8//RUN * TICK;
                this.state = this.STATE.WALK;
                this.facing = this.FACING.RIGHT;
            } else if(this.game.A){
                this.velocity.x -= .8//RUN * TICK;
                this.state = this.STATE.WALK;
                this.facing = this.FACING.LEFT;
            } else {
                this.velocity.x = 0;
                this.state = this.STATE.IDLE;
            }

            //DUCK
            if(this.game.S){
                this.state = this.STATE.DUCK;
            }

            //BackRoll
            if(this.game.A && this.game.S){
                this.facing = this.FACING.RIGHT;
                this.state = this.STATE.ROLL;
                this.velocity.x -= .1* TICK;
            } else if(this.game.D && this.game.S){
                this.facing = this.FACING.LEFT;
                this.state = this.STATE.ROLL;
                this.velocity.x += .1* TICK;
            }

            //Punch
            if(this.game.C && this.facing === this.FACING.RIGHT){
                this.facing = this.FACING.RIGHT;
                this.state = this.STATE.PUNCH;
                
            } else if(this.game.C && this.facing === this.FACING.LEFT){
                this.facing = this.FACING.LEFT;
                this.state = this.STATE.PUNCH;
                
            }
        }
        this.velocity.y += this.fallAcc * TICK1;
        //Jump
        if((this.game.W && this.facing === this.FACING.RIGHT)){
            
            this.facing = this.FACING.RIGHT;
            this.state = this.STATE.JUMP;
            this.velocity.y = -1.75 * JUMPING * TICK;
            this.fallAcc = STOP_FALL;
        } else if((this.game.W && this.facing === this.FACING.LEFT)){
            
            this.facing = this.FACING.LEFT;
            this.state = this.STATE.JUMP;
            this.velocity.y = -1.75 * JUMPING * TICK;
            this.fallAcc = STOP_FALL;
        }

        //Back flip
        if((this.game.W && this.game.A) && this.jumping === false){
            this.jumping = true;
            this.state = this.STATE.FLIP;
            this.facing = this.FACING.RIGHT;
            this.velocity.y = -1.75 * JUMPING * TICK;
            this.fallAcc = STOP_FALL;
        } 
        if((this.game.W && this.game.D) && this.jumping === false){
            this.jumping = true;
            this.state = this.STATE.FLIP;
            this.facing = this.FACING.LEFT;
            this.velocity.y = -1.75 * JUMPING * TICK;
            this.fallAcc = STOP_FALL;
        } 

        if(this.game.P && this.facing === this.FACING.RIGHT){
            this.facing = this.FACING.RIGHT;
            this.state = this.STATE.KICK;
            this.velocity.y = -.9 * JUMPING * TICK;
        } else if(this.game.P && this.facing === this.FACING.LEFT){
            this.facing = this.FACING.LEFT;
            this.state = this.STATE.KICK;
            this.velocity.y = -.9 * JUMPING * TICK;
        }



        this.velocity.y *= .9 //friction
        this.velocity.x *= .9 //friction


        this.x += this.velocity.x * TICK * PARAMS.SCALE;
        this.y += this.velocity.y * TICK * PARAMS.SCALE;
        this.jumping = false;
        this.updateBB();




        //collisions
        var that = this;
        this.game.entities.forEach(function (entity) {
                if (entity.BB && that.BB.collide(entity.BB)) {
                    if (that.velocity.y > 0) { // falling                        
                        if ((entity instanceof Ground) && (that.lastBB.bottom) >= entity.BB.top){
                            that.velocity.y = 0; // landing
                            that.y = entity.BB.top - that.height-40;   
                        }
                        if(that.state === that.STATE.JUMP) that.state = that.STATE.IDLE; // set state to idle
                        that.updateBB();
                        if((entity instanceof BackScene) && (that.lastBB.right) >= entity.BB.right){
                            that.x = entity.BB.right - that.width-45;
                            if(that.velocity.x > 0) that.velocity.x = 0;
                            
                        }
                        that.updateBB();
                        if((entity instanceof BackScene) && (that.lastBB.left) <= entity.BB.left){
                            console.log("Im guessing it collides with left");
                            that.x = entity.BB.left + that.width-62;
                            if(that.velocity.x < 0) that.velocity.x = 0;
                        }
                        that.updateBB();
                        if(((entity instanceof BackScene) && (that.lastBB.top) <= entity.BB.top)){
                            that.y = entity.BB.top + that.height;
                            console.log("This means it is colliding witht the top");                            that.y = entity.BB.top + that.height+40;
                            if(that.velocity.y < 0) that.velocity.y = 0;
                        }
                        that.updateBB();
                    }
                    

                } 

                       
        });
 
    };


    draw(ctx){
        if(PARAMS.DEBUG){
            ctx.strokeStyle = "Red";
            ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
        };
        if(this.state === this.STATE.WALK){
            this.animations[this.state][this.facing].drawFrame(this.game.clockTick,ctx, this.x, this.y-8, 2);
        } else if(this.state === this.STATE.DUCK){
            this.animations[this.state][this.facing].drawFrame(this.game.clockTick,ctx, this.x, this.y+40, 2);
        } else if(this.state === this.STATE.KICK) {
            this.animations[this.state][this.facing].drawFrame(this.game.clockTick,ctx, this.x, this.y-8, 2);
        } else if(this.state === this.STATE.PUNCH){
            this.animations[this.state][this.facing].drawFrame(this.game.clockTick,ctx, this.x, this.y + 3, 2);
        } else if(this.state === this.STATE.ROLL) {
            this.animations[this.state][this.facing].drawFrame(this.game.clockTick,ctx, this.x, this.y+15, 2);
        } else {
            this.animations[this.state][this.facing].drawFrame(this.game.clockTick,ctx, this.x, this.y, 2);
        }
    };
};
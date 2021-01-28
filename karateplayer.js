class KaratePlayer{
    constructor(game, x, y){
        Object.assign(this, {game, x, y});
        this.game.KaratePlayer = this;

        //This is for walking and jumping, and kick
        this.height1 = 25;

        //This is for punch, and idle
        this.height2 = 24

        //Roll height and width,
        this.heightWidth = 20;

        //this height is for duck
        this.height4 = 18;

        //walking, punch, kick, duck, idle
        this.width1 = 19;

        //this is for jump
        this.width2 = 15;

        //this is to adjust the player when he is updated
        this.rollAdjust = 5;

        //this is to adjust the player when he is updated
        this.walkAdjust = 5;

        //this is to adjust the player when he is updated
        this.punchAdjust = 10;

        //this is to adjust the player when he is updated
        this.duckAdjust = 8;

        this.colAdj1 = 5;

        this.colRollAdj2 = 1;

        this.collAdj2 = 1;

        this.STATE = {
            WALK: 0,
            IDLE: 1,
            PUNCH: 2,
            KICK: 3,
            DUCK:  4,
            JUMP:  5,
            ROLL: 6
        };
    
        this.FACING = {
            RIGHT:  0,
            LEFT: 1
        };

        this.velocity = {x:0, y:0};
        this.fallAcc = 562.5;


        this.updateBB();


        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/spritesheet.png");
        
        this.facing = this.FACING.RIGHT;
        this.state = this.STATE.JUMP;
       
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
            = new Animator(this.spritesheet, 480,8, this.width1,this.height2 ,2,.175,0,false, true);
        this.animations[this.STATE.IDLE][this.FACING.LEFT]
            = new Animator(this.spritesheet, 520,8, this.width1,this.height2,2,.175,0,false, true);
    
        //******* WALK LEFT & RIGHT *********
        this.animations[this.STATE.WALK][this.FACING.RIGHT]
            = new Animator(this.spritesheet, 0,7, this.width1,this.height1 ,4,.2,0,false, true);
        this.animations[this.STATE.WALK][this.FACING.LEFT]
            = new Animator(this.spritesheet, 80,7, this.width1,this.height1 ,4,.2,0,false, true);
    
         //******* Punch Right & LEFT ********
         this.animations[this.STATE.PUNCH][this.FACING.RIGHT] 
             = new Animator(this.spritesheet, 160,9, this.width1,this.height2 ,2,.2,0,false, true);
         this.animations[this.STATE.PUNCH][this.FACING.LEFT]
             = new Animator(this.spritesheet, 200,9, this.width1,this.height2 ,2,.2,0,false, true);
    
         //******* Kick Right & Left *******
         this.animations[this.STATE.KICK][this.FACING.RIGHT]
             = new Animator(this.spritesheet, 240,9, this.width1,this.height1 ,3,.1,0,false, true);
         this.animations[this.STATE.KICK][this.FACING.LEFT]
             = new Animator(this.spritesheet, 300,9, this.width1,this.height1 ,3,.1,0,false, true);
    
         //****** Duck Left & Right ******
         this.animations[this.STATE.DUCK][this.FACING.RIGHT]
             = new Animator(this.spritesheet, 380,15, this.width1,this.height4 ,1,.15,0,false, true);
         this.animations[this.STATE.DUCK][this.FACING.LEFT]
             = new Animator(this.spritesheet, 420,15, this.width1,this.height4 ,1,.15,0,false, true);
    
         //****** Jump Right & Left ******
         this.animations[this.STATE.JUMP][this.FACING.RIGHT]
             = new Animator(this.spritesheet, 440,7, this.width2,this.height1 ,1,.15,0,false, true);
         this.animations[this.STATE.JUMP][this.FACING.LEFT]
             = new Animator(this.spritesheet, 460,7, this.width2,this.height1 ,1,.15,0,false, true);

        //****** Roll Left & Right ******
        this.animations[this.STATE.ROLL][this.FACING.RIGHT]
            = new Animator(this.spritesheet, 560,12, this.heightWidth, this.heightWidth ,5,.1,0,false, true);
        this.animations[this.STATE.ROLL][this.FACING.LEFT]
            = new Animator(this.spritesheet, 660,12, this.heightWidth, this.heightWidth ,5,.1,0,false, true);
    };

    updateBB(){
        this.lastBB = this.BB;
        if(this.state === this.STATE.IDLE){
            this.BB = new BoundingBox(this.x, this.y, this.width1 * PARAMS.SCALE, (this.height2 * PARAMS.SCALE));
        } else if(this.state === this.STATE.WALK){
            this.BB = new BoundingBox(this.x, this.y, this.width1 * PARAMS.SCALE, (this.height1 * PARAMS.SCALE));
        } else if(this.state === this.STATE.PUNCH){
            this.BB = new BoundingBox(this.x, this.y, this.width1 * PARAMS.SCALE, (this.height2 * PARAMS.SCALE));
        } else if(this.state === this.STATE.KICK){
            this.BB = new BoundingBox(this.x, this.y, this.width1 * PARAMS.SCALE, (this.height1 * PARAMS.SCALE));
        } else if(this.state === this.STATE.DUCK){
            this.BB = new BoundingBox(this.x, this.y, this.width1 * PARAMS.SCALE, (this.height4 * PARAMS.SCALE));
        } else if(this.state === this.STATE.JUMP){
            this.BB = new BoundingBox(this.x, this.y, this.width2 * PARAMS.SCALE, this.height1 * (PARAMS.SCALE));
        } else {
            this.BB = new BoundingBox(this.x, this.y + this.rollAdjust, this.heightWidth * PARAMS.SCALE, (this.heightWidth * PARAMS.SCALE));
        }
    };

    update(){
        const WALK = 50;
        const FALL_WALK = 10;
        const ROLL = 100;
        const JUMPING = -1;
        const STOP_FALL = 1575;
        const STOP_FALL_A = 450;
        const TICK = this.game.clockTick;

        //Ground Physics
        if(this.state !== this.STATE.JUMP){
            //Walking
            if(this.game.D){
                this.velocity.x = WALK;
                this.state = this.STATE.WALK;
                this.facing = this.FACING.RIGHT;
            } else if(this.game.A){

                this.velocity.x = -WALK;
                this.facing = this.FACING.LEFT;
                this.state = this.STATE.WALK;
            } else {
                this.velocity.x = 0;
                this.state = this.STATE.IDLE;
            }
            //Punch, direction does not matter.
            if(this.game.C){
                this.state = this.STATE.PUNCH;
            }
            //Duck
            if(this.game.S){
                this.state = this.STATE.DUCK;
            } 
            //Rolling
            if(this.game.S && this.game.D){
                this.facing = this.FACING.LEFT;
                this.state = this.STATE.ROLL;
                this.velocity.x = ROLL;
            } else if(this.game.A && this.game.S){
                this.velocity.x = -ROLL;
                this.facing = this.FACING.RIGHT;
                this.state = this.STATE.ROLL;
            }
            this.velocity.y += this.fallAcc * TICK;
            //Jump
            if(this.game.W || this.game.W && this.game.D || this.game.W && this.game.A){
                if(this.velocity.x > 0) this.facing = this.FACING.RIGHT;
                else if(this.velocity.x < 0) this.facing = this.FACING.LEFT;
                this.velocity.y = JUMPING;
                this.state = this.STATE.JUMP;
                this.fallAcc = STOP_FALL;
             }  

        //air physics     
        } else if(this.state === this.STATE.JUMP) {
            
            if(this.velocity.y < 0 && this.game.W){
                if(this.fallAcc === STOP_FALL) this.velocity.y -= (STOP_FALL - STOP_FALL_A);
            }
            this.velocity.y += this.fallAcc * TICK;

            //horizontal air physics
            if(this.game.D && !this.game.A){
                this.velocity.x += FALL_WALK;
            } else if(this.game.A && !this.game.D){
                this.velocity.x -= FALL_WALK;
            } else {

            }                 
        }

        //updating
        this.x += this.velocity.x * TICK * PARAMS.SCALE;
        this.y += this.velocity.y * TICK * PARAMS.SCALE;
        this.updateBB();

        //collisions
        var that = this;
        this.game.entities.forEach(function (entity) {
                if (entity.BB && that.BB.collide(entity.BB)) {
                     if (that.velocity.y > 0) {
                        //Falling logic                        
                        if((entity instanceof BackScene) && that.lastBB.bottom >= entity.BB.bottom){
                            if(that.state === that.STATE.IDLE) that.y = entity.BB.bottom - (that.height2 * PARAMS.SCALE-that.colAdj1);
                            else if(that.state === that.STATE.WALK) that.y = entity.BB.bottom - (that.height1 * PARAMS.SCALE-that.walkAdjust);
                            else if(that.state === that.STATE.ROLL) that.y = entity.BB.bottom - (that.heightWidth * PARAMS.SCALE-that.rollAdjust);
                            else if(that.state === that.STATE.DUCK) that.y = entity.BB.bottom - (that.height4 * PARAMS.SCALE-that.duckAdjust);
                            else if(that.state === that.STATE.PUNCH) that.y = entity.BB.bottom - (that.height2 * PARAMS.SCALE-that.punchAdjust);
                            if(that.state === that.STATE.JUMP) that.state = that.STATE.IDLE;
                            that.velocity.y = 0;
                            that.updateBB();
                        }
                    }
                    if(that.velocity.y < 0 || that.velocity.x < 0 || that.velocity.x > 0){
                         //Jumping logic
                        if((entity instanceof BackScene) && that.lastBB.top >= entity.BB.top){
                            if(that.state === that.STATE.JUMP) that.y = entity.BB.top + (that.height1 * PARAMS.SCALE);
                            else if(that.state === that.STATE.JUMP) that.y = entity.BB.top + (that.height1 * PARAMS.SCALE);
                            that.velocity.y = 0;
                            that.updateBB();
                        }
                        //Walking to left logic.
                        if((entity instanceof BackScene) && that.lastBB.left <= entity.BB.left){
                            if(that.state === that.STATE.WALK) that.x = entity.BB.left; 
                            else if(that.state === that.STATE.ROLL) that.x = entity.BB.left;
                            else if(that.state === that.STATE.PUNCH) that.x = entity.BB.left;
                            else if(that.state === that.STATE.JUMP) that.x = entity.BB.left; 
                            else if(that.state === that.STATE.KICK) that.x = entity.BB.left; 
                            if(that.velocity.x < 0) that.velocity.x = 0;
                            that.updateBB();
                        }
                        //Falling to right logic.
                            if((entity instanceof BackScene) && that.lastBB.right >= entity.BB.right){
                            if(that.state === that.STATE.WALK) that.x = entity.BB.right - (that.width1 * PARAMS.SCALE+that.collAdj2);
                            else if(that.state === that.STATE.ROLL) that.x = entity.BB.right - (that.heightWidth * PARAMS.SCALE+that.colRollAdj2);
                            else if(that.state === that.STATE.PUNCH) that.x = entity.BB.right - (that.width1 * PARAMS.SCALE);
                            else if(that.state === that.STATE.JUMP) that.x = entity.BB.right - (that.width2 * PARAMS.SCALE);
                            else if(that.state === that.STATE.KICK) that.x = entity.BB.right - (that.width2 * PARAMS.SCALE);
                                                    
                            if(that.velocity.x > 0) that.velocity.x = 0;
                            that.updateBB();
                            }
                    }
                }       
        });
    };

    draw(ctx){
        if(PARAMS.DEBUG){
            ctx.strokeStyle = "Red";
            ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
        };
        
        this.animations[this.state][this.facing].drawFrame(this.game.clockTick,ctx, this.x, this.y, PARAMS.SCALE);
    
    };
};


class KaratePlayer{
    constructor(game, x, y){
        Object.assign(this, {game, x, y});
        this.game.KaratePlayer = this;

        //This is for walking and jumping, and kick
        this.height1 = 25;

        //This is for punch, and idle
        this.height2 = 24;

        //Roll height and width,
        this.heightWidth = 20;

        //this height is for duck
        this.height4 = 18;

        //walking, punch, duck, idle, kick
        this.width1 = 19;

        //Attack Widths
        this.attackPunchWidth = 14;

        //Attack Widths
        this.attackKickWidth = 16;

        //this is for jump
        this.width2 = 15;

        //this is to adjust the player when he is updated
        this.rollAdjust = 5;

        //this is to adjust the player when he is updated
        this.walkAdjust = 5;

        //this is to adjust the player when he is updated
        this.punchAdjust = 10;

        //this is to adjust the player when he is updated
        this.duckAdjust = 10;

        //this is to adjust the player when he is kicking
        this.kickAdjust = 12;

        this.colAdj1 = 5;

        this.colRollAdj2 = 1;

        this.collAdj2 = 1;

        //For the Health Bar
        this.maxHitPoints  = 100;

        //Total hit points taken
        this.hitPoints = 73;

        //Check to make sure this isnt the CPU
        this.CPU = false;

        //All the Karate Players movements
        this.STATE = {
            WALK: 0,
            IDLE: 1,
            PUNCH: 2,
            KICK: 3,
            DUCK:  4,
            JUMP:  5,
            ROLL: 6
        };

        //Decides if Facing left or right
        this.FACING = {
            RIGHT:  0,
            LEFT: 1
        };

        //Starting off Falling to the right
        this.facing = this.FACING.RIGHT;
        this.state = this.STATE.JUMP;

        //His velocity for movements.
        this.velocity = {
            x:0, 
            y:0
        };

        //Creating the Health Bar
        this.healthbar = new HealthBar(this);
        //This is the falling acceleration for gravity.
        this.fallAcc =100;

        this.updateBB();

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/spritesheet.png");
        
        this.animations = [];
        this.loadAnimations();
        
    };



    loadAnimations(){
        //Loads all the animations
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
             = new Animator(this.spritesheet, 159,9, this.width1,this.height2 ,2,.2,0,false, true);
         this.animations[this.STATE.PUNCH][this.FACING.LEFT]
             = new Animator(this.spritesheet, 200,9, this.width1,this.height2 ,2,.2,0,true, true);
    
         //******* Kick Right & Left *******
         this.animations[this.STATE.KICK][this.FACING.RIGHT]
             = new Animator(this.spritesheet, 260,9, this.width1,this.height1 ,2,.15,0,false, true);
         this.animations[this.STATE.KICK][this.FACING.LEFT]
             = new Animator(this.spritesheet, 320,9, this.width1,this.height1 ,2,.15,0,false, true);
    
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
        } else if(this.state === this.STATE.PUNCH && this.facing === this.FACING.RIGHT){
            this.BB = new BoundingBox(this.x, this.y, this.attackPunchWidth * PARAMS.SCALE, (this.height2 * PARAMS.SCALE));
        } else if(this.state === this.STATE.PUNCH && this.facing === this.FACING.LEFT){
            this.BB = new BoundingBox(this.x+this.attackPunchWidth, this.y, this.attackPunchWidth * PARAMS.SCALE, (this.height2 * PARAMS.SCALE));
        } else if(this.state === this.STATE.KICK && this.facing === this.FACING.RIGHT){
            this.BB = new BoundingBox(this.x, this.y, this.attackKickWidth * PARAMS.SCALE, (this.height1 * PARAMS.SCALE));
        } else if(this.state === this.STATE.KICK && this.facing === this.FACING.LEFT){
            this.BB = new BoundingBox(this.x + this.attackKickWidth, this.y, this.attackKickWidth * PARAMS.SCALE, (this.height1 * PARAMS.SCALE));
        } else if(this.state === this.STATE.DUCK){
            this.BB = new BoundingBox(this.x, this.y, this.width1 * PARAMS.SCALE, (this.height4 * PARAMS.SCALE));
        } else if(this.state === this.STATE.JUMP){
            this.BB = new BoundingBox(this.x, this.y, this.width2 * PARAMS.SCALE, this.height1 * (PARAMS.SCALE));
        } else {
            this.BB = new BoundingBox(this.x, this.y + this.rollAdjust, this.heightWidth * PARAMS.SCALE, (this.heightWidth * PARAMS.SCALE));
        }
    };
    update(){
        //Variables to manipulate the X and Y velocity
        const WALK = 75;
        const FALL_WALK = 1;
        const ROLL = 100;
        const JUMPING = 500;
        const STOP_FALL = 400;
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
            //Implementing gravity.
            this.velocity.y += this.fallAcc * TICK;
            //Jump
            if(this.game.W ){
                this.velocity.y = -JUMPING;
                this.state = this.STATE.JUMP;
                this.fallAcc = STOP_FALL;
             }  
            //Kick
            if(this.game.P){
                this.state = this.STATE.KICK;
            }

         //air physics     
        } else if(this.state === this.STATE.JUMP) {
            this.velocity.y += this.fallAcc * TICK * PARAMS.SCALE;
            //horizontal air physics
            if(this.game.D && !this.game.A){
                this.facing = this.FACING.RIGHT;
                this.velocity.x += FALL_WALK;
            } else if(this.game.A && !this.game.D){
                this.facing = this.FACING.LEFT;
                this.velocity.x -= FALL_WALK;   
            } else {
            }               
        }

        //updating
        this.x += this.velocity.x * TICK * PARAMS.SCALE;
        this.y += this.velocity.y * TICK * PARAMS.SCALE;
        this.updateBB();
        this.collisions();
    };

    collisions(){
        //collisions
        var that = this;
        this.game.entities.forEach(function (entity) {
                if (entity.BB && that.BB.collide(entity.BB)) {
                    //Ground Collisions
                     if (that.velocity.y > 0) {
                        //Falling Logic - Level2  - Platform
                        if((entity instanceof Platform) && that.lastBB.bottom >= entity.BB.top){
                            if(that.state === that.STATE.JUMP) that.state = that.STATE.IDLE;
                            if(that.state === that.STATE.IDLE) that.y = entity.BB.top - (that.height2 * PARAMS.SCALE-that.colAdj1);
                            else if(that.state === that.STATE.WALK) that.y = entity.BB.top - (that.height1 * PARAMS.SCALE-that.walkAdjust);
                            else if(that.state === that.STATE.ROLL) that.y = entity.BB.top - (that.heightWidth * PARAMS.SCALE-that.rollAdjust);
                            else if(that.state === that.STATE.DUCK) that.y = entity.BB.top - (that.height4 * PARAMS.SCALE-that.duckAdjust);
                            else if(that.state === that.STATE.PUNCH) that.y = entity.BB.top - (that.height2 * PARAMS.SCALE-that.punchAdjust);  
                            else if(that.state === that.STATE.KICK) that.y = entity.BB.top - (that.height1 * PARAMS.SCALE- that.kickAdjust);              
                            that.velocity.y = 0;
                            that.updateBB();                         
                        }
                        //Falling Logic - Level1 - Level2 - Ground
                        if((entity instanceof BackGround || entity instanceof BackScene) && that.lastBB.bottom >= entity.BB.bottom){
                            if(that.state === that.STATE.JUMP) that.state = that.STATE.IDLE;
                            if(that.state === that.STATE.IDLE) that.y = entity.BB.bottom - (that.height2 * PARAMS.SCALE-that.colAdj1);
                            else if(that.state === that.STATE.WALK) that.y = entity.BB.bottom - (that.height1 * PARAMS.SCALE-that.walkAdjust);
                            else if(that.state === that.STATE.ROLL) that.y = entity.BB.bottom - (that.heightWidth * PARAMS.SCALE-that.rollAdjust);
                            else if(that.state === that.STATE.DUCK) that.y = entity.BB.bottom - (that.height4 * PARAMS.SCALE-that.duckAdjust);
                            else if(that.state === that.STATE.PUNCH) that.y = entity.BB.bottom - (that.height2 * PARAMS.SCALE-that.punchAdjust);
                            else if(that.state === that.STATE.KICK) that.y = entity.BB.bottom - (that.height1 * PARAMS.SCALE - that.kickAdjust);                           
                            that.velocity.y = 0;
                            that.updateBB();                         
                        }
                        //Walking to Right Logic - Level1 - Level2
                        if((entity instanceof BackScene || entity instanceof BackGround ) && that.BB.right >= entity.BB.right){
                            if(that.state === that.STATE.WALK) that.x = entity.BB.right - (that.width1 * PARAMS.SCALE);
                            else if(that.state === that.STATE.ROLL) that.x = entity.BB.right - (that.heightWidth * PARAMS.SCALE+that.colRollAdj2);
                            else if(that.state === that.STATE.PUNCH) that.x = entity.BB.right - (that.width1 * PARAMS.SCALE);
                            else if(that.state === that.STATE.JUMP) that.x = entity.BB.right - (that.width2 * PARAMS.SCALE+5);
                            else if(that.state === that.STATE.KICK) that.x = entity.BB.right - (that.width1 * PARAMS.SCALE);
                            that.velocity.x = 0;
                            that.updateBB();
                        }
                        //Walking to Left Logic - Level1 - Level2
                        if((entity instanceof BackScene || entity instanceof BackGround) && that.lastBB.left <= entity.BB.left){
                            if(that.state === that.STATE.WALK) that.x = entity.BB.left; 
                            else if(that.state === that.STATE.ROLL) that.x = entity.BB.left;
                            else if(that.state === that.STATE.PUNCH) that.x = entity.BB.left;
                            else if(that.state === that.STATE.KICK) that.x = entity.BB.left;
                            that.velocity.x = 0;
                            that.updateBB();
                        }
                    }

                    //Air Collisions
                    if(that.velocity.y < 0){
                        //Jumping logic - Level2 - Platform
                        if((entity instanceof Platform) && that.lastBB.top >= entity.BB.bottom){
                            if(that.state === that.STATE.JUMP) that.y = entity.BB.bottom + (that.height1 * PARAMS.SCALE);
                            else if(that.state === that.STATE.KICK) that.y = entity.BB.bottom + (that.height1 * PARAMS.SCALE);
                            that.velocity.y = 0;
                            that.updateBB();
                        }
                        //Jumping & Kicking to Right - Level2 - Level1
                        if((entity instanceof BackScene || entity instanceof BackGround) && that.lastBB.right >= entity.BB.right){
                            if(that.state === that.STATE.JUMP) that.x = entity.BB.right - (that.width2 * PARAMS.SCALE);
                             that.velocity.y =0;
                             that.updateBB();
                        }
                        //Jumping & Kicking to Left - Level2 - Level1
                        if((entity instanceof BackScene || entity instanceof BackGround) && that.lastBB.left <= entity.BB.left){
                            if(that.state === that.STATE.JUMP) that.x = entity.BB.left;
                             that.velocity.y = 0;
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
        this.healthbar.draw(ctx);
    };
};


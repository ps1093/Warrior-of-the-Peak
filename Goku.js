class Goku{
    constructor(game, x, y, blue, theName){
        Object.assign(this, {game, x, y, theName});
        this.game.Goku = this;

        //Character Details for HUD and game
        this.name = this.theName;
        this.dead = false;
        this.CPU = false;

        //This is the falling acceleration for gravity.
        this.fallAcc =100;

        //For the Health Bar
        this.maxHitPoints  = 100;
        //Total hit points taken
        this.hitPoints = 100;

        //Circle so the CPU can detect player
        this.VisRadius = 135;
        this.AtkRadius = 45;
        this.cX = 0, this.xY = 0;

        //All the goku's movements
        this.STATE = {
            WALK: 0,
            IDLE: 1,
            PUNCH: 2,
            KICK: 3,
            DUCK:  4,
            JUMP:  5,
            POWER: 6,
            BLAST: 7,
            DEAD: 8
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

        this.updateBB();
        
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/goku_spritesheet.png");
        this.spritesheet2 = ASSET_MANAGER.getAsset("./sprites/goku_spritesheetmirror.png")
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/gokublue_spritesheet.png");
        this.spritesheet2 = ASSET_MANAGER.getAsset("./sprites/gokublue_spritesheetmirror.png")
        
        this.animations = [];
        this.loadAnimations();
    };

    loadAnimations(){
        //Loads all the animations
        for(var i = 0; i < 9; i++){
            this.animations.push([]);
            for(var j = 0; j < 2; j++){
                this.animations[i].push([]);
            }
        }
        //****** IDLE LEFT & RIGHT *********
        this.animations[this.STATE.IDLE][this.FACING.RIGHT]
            = new Animator2(this.spritesheet, GokuState.RIDLE, 2, .175, false, true);
        this.animations[this.STATE.IDLE][this.FACING.LEFT]
            = new Animator2(this.spritesheet2, GokuState.LIDLE, 2, .175, false, true);

        //******* WALK LEFT & RIGHT *********
        this.animations[this.STATE.WALK][this.FACING.RIGHT]
            = new Animator2(this.spritesheet, GokuState.RWALK, 4, .2, false, true);
        this.animations[this.STATE.WALK][this.FACING.LEFT]
            = new Animator2(this.spritesheet2, GokuState.LWALK, 4, .2, false, true);

         //******* Punch Right & LEFT ********
         this.animations[this.STATE.PUNCH][this.FACING.RIGHT] 
             = new Animator2(this.spritesheet, GokuState.RPUNCH, 2, .2, false, true);
         this.animations[this.STATE.PUNCH][this.FACING.LEFT]
             = new Animator2(this.spritesheet2, GokuState.LPUNCH, 2, .2, true, true);
    
         //******* Kick Right & Left *******
         this.animations[this.STATE.KICK][this.FACING.RIGHT]
             = new Animator2(this.spritesheet, GokuState.RKICK , 2, .15,true, true);
         this.animations[this.STATE.KICK][this.FACING.LEFT]
             = new Animator2(this.spritesheet2, GokuState.LKICK, 2, .15, true, true);
    
         //****** Duck Left & Right ******
         this.animations[this.STATE.DUCK][this.FACING.RIGHT]
             = new Animator2(this.spritesheet, GokuState.RDUCK, 1, .15, false, true);
         this.animations[this.STATE.DUCK][this.FACING.LEFT]
             = new Animator2(this.spritesheet2, GokuState.LDUCK, 1, .15, false, true);
    
         //****** Jump Right & Left ******
         this.animations[this.STATE.JUMP][this.FACING.RIGHT]
             = new Animator2(this.spritesheet, GokuState.RJUMP, 1, .15, false, true);
         this.animations[this.STATE.JUMP][this.FACING.LEFT]
             = new Animator2(this.spritesheet2, GokuState.LJUMP, 1, .15, false, true);

        //****** Blast Left & Right ******
        this.animations[this.STATE.ROLL][this.FACING.RIGHT]
            = new Animator2(this.spritesheet, GokuState.RROLL, 4, .1, false, true);
        this.animations[this.STATE.ROLL][this.FACING.LEFT]
            = new Animator2(this.spritesheet2, GokuState.LROLL, 4, .1, false, true);

        //****** Power Left & Right ******
        this.animations[this.STATE.ROLL][this.FACING.RIGHT]
            = new Animator2(this.spritesheet, GokuState.RPower, 4, .1, false, true);
        this.animations[this.STATE.ROLL][this.FACING.LEFT]
            = new Animator2(this.spritesheet2, GokuState.LPower, 4, .1, false, true);

        //****** Dead Left & Right ******
        this.animations[this.STATE.DEAD][this.FACING.RIGHT]
            = new Animator2(this.spritesheet, GokuState.RDIE, 8, .2, false, false);
        this.animations[this.STATE.DEAD][this.FACING.LEFT]
            = new Animator2(this.spritesheet2, GokuState.LDIE, 8, .2, false, false);
    };
    updateBB(){
        this.lastBB = this.BB;
        if(this.state === this.STATE.IDLE && this.facing === this.FACING.RIGHT){
            this.BB = new BoundingBox(this.x, this.y, GokuState.RIDLE[0].w * PARAMS.SCALE, GokuState.RIDLE[0].h * PARAMS.SCALE);
        } else if(this.state === this.STATE.IDLE && this.facing === this.FACING.LEFT){
            this.BB = new BoundingBox(this.x, this.y, GokuState.LIDLE[1].w * PARAMS.SCALE, GokuState.LIDLE[0].h * PARAMS.SCALE); 
        } else if(this.state === this.STATE.WALK && this.facing === this.FACING.RIGHT){
            this.BB = new BoundingBox(this.x, this.y, GokuState.RWALK[0].w * PARAMS.SCALE, GokuState.RWALK[0].h * PARAMS.SCALE);
        } else if(this.state === this.STATE.WALK && this.facing === this.FACING.LEFT){
            this.BB = new BoundingBox(this.x, this.y, GokuState.LWALK[0].w * PARAMS.SCALE, GokuState.LWALK[0].h * PARAMS.SCALE);
        } else if(this.state === this.STATE.PUNCH && this.facing === this.FACING.RIGHT){
            this.BB = new BoundingBox(this.x, this.y, GokuState.RPUNCH[0].w * PARAMS.SCALE, GokuState.RPUNCH[0].h * PARAMS.SCALE);
        } else if(this.state === this.STATE.PUNCH && this.facing === this.FACING.LEFT){
            this.BB = new BoundingBox(this.x, this.y, GokuState.LPUNCH[0].w * PARAMS.SCALE, GokuState.LPUNCH[0].h * PARAMS.SCALE);
        } else if(this.state === this.STATE.KICK && this.facing === this.FACING.RIGHT){
            this.BB = new BoundingBox(this.x, this.y, GokuState.RKICK[1].w * PARAMS.SCALE, GokuState.RKICK[0].h * PARAMS.SCALE);
        } else if(this.state === this.STATE.KICK && this.facing === this.FACING.LEFT){
            this.BB = new BoundingBox(this.x, this.y, GokuState.LKICK[0].w * PARAMS.SCALE, GokuState.LKICK[0].h * PARAMS.SCALE);
        } else if(this.state === this.STATE.DUCK && this.facing === this.FACING.RIGHT){
            this.BB = new BoundingBox(this.x, this.y, GokuState.RDUCK[0].w * PARAMS.SCALE, GokuState.RDUCK[0].h * PARAMS.SCALE);
        } else if(this.state === this.STATE.DUCK && this.facing === this.FACING.LEFT){
            this.BB = new BoundingBox(this.x, this.y, GokuState.LDUCK[0].w * PARAMS.SCALE, GokuState.LDUCK[0].h * PARAMS.SCALE);
        } else if(this.state === this.STATE.JUMP && this.facing === this.FACING.RIGHT){
            this.BB = new BoundingBox(this.x, this.y, GokuState.RJUMP[0].w * PARAMS.SCALE, GokuState.RJUMP[0].h * PARAMS.SCALE);
        } else if(this.state === this.STATE.JUMP && this.facing === this.FACING.LEFT){
            this.BB = new BoundingBox(this.x, this.y, GokuState.LJUMP[0].w * PARAMS.SCALE, GokuState.LJUMP[0].h * PARAMS.SCALE);
        } else if(this.state === this.STATE.POWER && this.facing === this.FACING.RIGHT){
            this.BB = new BoundingBox(this.x, this.y, GokuState.RPOWER[0].w * PARAMS.SCALE, GokuState.RPower[0].h * PARAMS.SCALE);
        } else if(this.state === this.STATE.POWER && this.facing === this.FACING.LEFT){
            this.BB = new BoundingBox(this.x, this.y, GokuState.LPOWER[0].w * PARAMS.SCALE, GokuState.LPOWER[0].h * PARAMS.SCALE);
        } else if(this.state === this.STATE.POWER && this.facing === this.FACING.LEFT){
            this.BB = new BoundingBox(this.x, this.y, GokuState.RBLAST[0].w * PARAMS.SCALE, GokuState.RBLAST[0].h * PARAMS.SCALE);
        } else if(this.state === this.STATE.POWER && this.facing === this.FACING.LEFT){
            this.BB = new BoundingBox(this.x, this.y, GokuState.LBLAST[0].w * PARAMS.SCALE, GokuState.LBLAST[0].h * PARAMS.SCALE);
        } 
    };
    update(){
        //Variables to manipulate the X and Y velocity
        const WALK = 75;
        const FALL_WALK = 1;
        const JUMPING = 500;
        const STOP_FALL = 400;
        const DEAD_X = 50;
        const TICK = this.game.clockTick;

        //Ground Physics
        if(this.state !== this.STATE.JUMP && this.state !== this.STATE.DEAD){
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
          
            //Power
            if(this.game.P){
                this.state = this.STATE.POWER;
            }
            //Blast
             if(this.game.P){
                this.state = this.STATE.BLAST;
            }
            //Kick
            if(this.game.P){
                this.state = this.STATE.KICK;
            }
            //Implementing gravity.
            this.velocity.y += this.fallAcc * TICK;
            //Jump
            if(this.game.W ){
                this.velocity.y = -JUMPING;
                this.state = this.STATE.JUMP;
                this.fallAcc = STOP_FALL;
             }  

         //air physics     
        } else if(this.state === this.STATE.JUMP && this.state !== this.STATE.DEAD) {
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

        if(this.hitPoints === 0){
            this.state = this.STATE.DEAD;
            this.velocity.y = - 100;
            this.velocity.x = 0;
            this.dead = true;
         } 

        //updating
        this.x += this.velocity.x * TICK * PARAMS.SCALE;
        this.y += this.velocity.y * TICK * PARAMS.SCALE;
        this.cX = this.x + KPstate.RWALK[0].w / 2 * PARAMS.SCALE;
        this.cY = this.y + KPstate.RWALK[0].h / 2 * PARAMS.SCALE;
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
                        if((entity instanceof Platform || entity instanceof Propeller) && that.lastBB.bottom >= entity.BB.top){
                            if(that.state === that.STATE.JUMP) that.state = that.STATE.IDLE;
                            if(that.state === that.STATE.IDLE) that.y = entity.BB.top - KPstate.RIDLE[0].h * PARAMS.SCALE;
                            else if(that.state === that.STATE.WALK) that.y = entity.BB.top - KPstate.RWALK[0].h * PARAMS.SCALE;
                            else if(that.state === that.STATE.DUCK) that.y = entity.BB.top - KPstate.RDUCK[0].h * PARAMS.SCALE;
                            else if(that.state === that.STATE.PUNCH) that.y = entity.BB.top - KPstate.RPUNCH[0].h * PARAMS.SCALE;  
                            else if(that.state === that.STATE.KICK) that.y = entity.BB.top - KPstate.RKICK[0].h * PARAMS.SCALE;             
                            that.velocity.y = 0;
                            that.updateBB();                         
                        }
                        //Falling Logic - Level1 - Level2 - Ground
                        if((entity instanceof BackGround || entity instanceof BackScene || entity instanceof Sky) && that.lastBB.bottom >= entity.BB.bottom){
                            if(that.state === that.STATE.JUMP) that.state = that.STATE.IDLE;
                            if(that.state === that.STATE.IDLE) that.y = entity.BB.bottom - KPstate.RIDLE[0].h * PARAMS.SCALE;
                            else if(that.state === that.STATE.WALK) that.y = entity.BB.bottom - KPstate.RWALK[0].h * PARAMS.SCALE;
                            else if(that.state === that.STATE.DUCK) that.y = entity.BB.bottom - KPstate.RDUCK[0].h * PARAMS.SCALE;
                            else if(that.state === that.STATE.PUNCH) that.y = entity.BB.bottom - KPstate.RPUNCH[0].h * PARAMS.SCALE;
                            else if(that.state === that.STATE.KICK) that.y = entity.BB.bottom - KPstate.RKICK[0].h * PARAMS.SCALE;                           
                            that.velocity.y = 0;
                            that.updateBB();                         
                        }
                        //Walking to Right Logic - Level1 - Level2
                        if((entity instanceof BackScene || entity instanceof BackGround || entity instanceof Sky) && that.lastBB.right >= entity.BB.right){
                            if(that.state === that.STATE.WALK) that.x = entity.BB.right - KPstate.RWALK[0].w * PARAMS.SCALE;
                            else if(that.state === that.STATE.PUNCH) that.x = entity.BB.right - KPstate.RPUNCH[0].w * PARAMS.SCALE;
                            else if(that.state === that.STATE.JUMP) that.x = entity.BB.right - KPstate.RJUMP[0].w * PARAMS.SCALE;
                            else if(that.state === that.STATE.KICK) that.x = entity.BB.right - KPstate.RKICK[0].w * PARAMS.SCALE;
                            that.velocity.x = 0;
                            that.updateBB();
                        }
                        //Walking to Left Logic - Level1 - Level2
                        if((entity instanceof BackScene || entity instanceof BackGround || entity instanceof Sky) && that.lastBB.left <= entity.BB.left){
                            if(that.state === that.STATE.WALK) that.x = entity.BB.left; 
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
                            if(that.state === that.STATE.JUMP) that.y = entity.BB.bottom + KPstate.RJUMP[0].h * PARAMS.SCALE;
                            else if(that.state === that.STATE.KICK) that.y = entity.BB.bottom + KPstate.RKICK[0].h * PARAMS.SCALE;
                            that.velocity.y = 0;
                            that.updateBB();
                        }
                        if((entity instanceof Propeller) &&  that.lastBB.top >= entity.BB.bottom){
                            if(that.state === that.STATE.JUMP) that.y = entity.BB.bottom + KPstate.RJUMP[0].h * PARAMS.SCALE;
                            else if(that.state === that.STATE.KICK) that.y = entity.BB.bottom + KPstate.RKICK[0].h * PARAMS.SCALE;
                            that.hitPoints -= 2;
                            that.velocity.y = 0;
                            that.updateBB(); 
                        }
                        //Jumping & Kicking to Right - Level2 - Level1
                        if((entity instanceof BackScene || entity instanceof BackGround || entity instanceof Sky) && that.lastBB.right >= entity.BB.right){
                            if(that.state === that.STATE.JUMP) that.x = entity.BB.right - KPstate.RJUMP[0].w * PARAMS.SCALE;
                             that.velocity.y =0;
                             that.updateBB();
                        }
                        //Jumping & Kicking to Left - Level2 - Level1
                        if((entity instanceof BackScene || entity instanceof BackGround || entity instanceof Sky) && that.lastBB.left <= entity.BB.left){
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
            //Visual CIrcle
            ctx.beginPath();
            ctx.strokeStyle = "Blue";
            ctx.arc(this.cX, this.cY, this.VisRadius, 0, Math.PI * 2, false);
            ctx.stroke();
            ctx.closePath();
            //Attack Circle
            ctx.beginPath();
            ctx.strokeStyle = "White";
            ctx.arc(this.cX, this.cY, this.AtkRadius, 0, Math.PI * 2, false);
            ctx.stroke();
            ctx.closePath();
            ctx.strokeStyle = "Red";
            ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
        };
        this.animations[this.state][this.facing].drawFrame(this.game.clockTick,ctx, this.x, this.y, PARAMS.SCALE);
    };
};
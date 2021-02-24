class KaratePlayerCPU extends KaratePlayer{
    constructor(game, x, y, player, blue, theName){
        super(game,x,y, blue);
        Object.assign(this,{game,x,y, theName});
        this.other = player;

        //Setting up Character
        this.name = this.theName;
        this.facing = this.FACING.LEFT;
        this.CPU = true;

        //Hit Points
        this.maxHitPoints = 100;
        opponentHitPoints = 100;
        this.hitPoints = opponentHitPoints;
        opponentBlock = false;

        
        //Setting up circle
        this.VisRadius = 200;
        this.AtkRadius = 45;
        opponentAtkRadius = this.AtkRadius;

        this.updateBB();
        this.loadAnimations();
    };
    update(){
        this.hitPoints = opponentHitPoints;
        //Variables to manipulate the X and Y velocity
        const BLIND_WALK = 50;
        const WALK = 75;
        const FALL_WALK = 1;
        const ROLL = 100;
        const JUMPING = 500;
        const STOP_FALL = 400;
        const TICK = this.game.clockTick;

        //Ground Physics
        if(this.state !== this.STATE.JUMP  && this.state !== this.STATE.DEAD){
            var dx, dy;

            this.midpoint = this.x + KPstate.RIDLE[0].w / 2;
            this.other.midpoint = this.other.x + KPstate.RIDLE[0].w / 2;

            //If negative, CPU is on the right side
            if((this.other.midpoint - this.midpoint) < 0){
                if(this.state === this.STATE.PUNCH){
                    dx = Math.floor((this.other.BB.x + KPstate.RPUNCH[0].w * PARAMS.SCALE) - this.BB.x);
                } else if(this.state === this.STATE.KICK){
                    dx = Math.floor((this.other.BB.x + KPstate.RKICK[0].w * PARAMS.SCALE) - this.BB.x);
                } else {
                    dx = Math.floor((this.other.BB.x + KPstate.RIDLE[0].w * PARAMS.SCALE) - this.BB.x);
                }
                
            } else {
                dx = Math.floor(this.other.BB.x - (this.BB.x + KPstate.RIDLE[0].w * PARAMS.SCALE));
            }
            //console.log("dX: " + dx);
            if(dx == 0 && (this.other.midpoint - this.midpoint < 0)){
                this.velocity.x = 0;
                this.facing = this.FACING.LEFT;
                this.state = this.STATE.IDLE;
            } else if (dx == 0 && (this.other.midpoint - this.midpoint > 0)){
                this.velocity.x = 0;
                this.facing = this.FACING.RIGHT;
                this.state = this.STATE.IDLE;
            }

            if(dx > 0){
                this.facing = this.FACING.RIGHT;
                if(this.VisCircle()) this.velocity.x = WALK;
                else if(!this.VisCircle()) this.velocity.x = BLIND_WALK;
                this.state = this.STATE.WALK;
            } else if(dx < 0){
                this.facing = this.FACING.LEFT;
                if(this.VisCircle()) this.velocity.x = -WALK;
                else if(!this.VisCircle()) this.velocity.x = -BLIND_WALK;
                this.state = this.STATE.WALK;

            }
            var that = this;
            this.game.entities.forEach(function(entity) {
                if(entity instanceof KaratePlayer){
                    if(that.AtkCircle()){
                        if(that.other.state !== that.other.STATE.BLOCK)that.other.hitPoints -= 0;
                    }
                }
            });
            //Implementing gravity.
            this.velocity.y += this.fallAcc * TICK;
        //air physics     
        } else if(this.state === this.STATE.JUMP && this.state !== this.STATE.DEAD) {
            this.velocity.y += this.fallAcc * TICK * PARAMS.SCALE;               
        }
        if(this.hitPoints === 0){
            this.state = this.STATE.DEAD;
            this.velocity.y = -100;
            this.velocity.x = 0;
            console.log("Opponent Death being set in CPU");
            opponentDeath = true;
            
         } 
         

        if(this.other.dead === true){
            this.velocity.x = 0;
        }
        //updating
        this.x += this.velocity.x * TICK * PARAMS.SCALE;
        this.y += this.velocity.y * TICK * PARAMS.SCALE;
        this.cX = this.x + KPstate.RWALK[0].w / 2 * PARAMS.SCALE;
        this.cY = this.y + KPstate.RWALK[0].h / 2 * PARAMS.SCALE;
        opponentcX = this.cX;
        opponentcY = this.cY;
        this.updateBB();
        this.collisions();
    };

    draw(ctx){
        if(PARAMS.DEBUG){
            //Visual Circle
            ctx.beginPath();
            ctx.strokeStyle = "Red";
            ctx.arc(this.cX, this.cY, this.VisRadius, 0, Math.PI * 2, false);
            ctx.stroke();
            ctx.closePath();
            //Attack Circle
            ctx.beginPath();
            ctx.strokeStyle = "White";
            ctx.arc(this.cX, this.cY, this.AtkRadius, 0, Math.PI * 2, false);
            ctx.stroke();
            ctx.closePath();
            //Bounding Box
            ctx.strokeStyle = "Red";
            ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
        }
        if(!this.CPU){
            ctx.strokeStyle = "DarkOrange";
            ctx.font = '14px "Press Start 2P"';
            ctx.fillStyle = rgb(183,3,3);
            ctx.fillText(this.name, 255 , 60);
            ctx.strokeText(this.name, 255 , 60);
        } else if (this.CPU){
            this.cpuNameCount = this.name.length;
            ctx.strokeStyle = "DarkOrange";
            ctx.font = '14px "Press Start 2P"';
            ctx.fillStyle = rgb(183,3,3);
            ctx.fillText(this.name, 759 - (this.cpuNameCount * 14), 60);
            ctx.strokeText(this.name, 759 - (this.cpuNameCount * 14), 60);
        }
        this.animations[this.state][this.facing].drawFrame(this.game.clockTick,ctx, this.x, this.y, PARAMS.SCALE);
        //this.healthbar.draw(ctx);
    };
    VisCircle() {
        var dx = this.cX - this.other.cX;
        var dy = this.cY - this.other.cY;
        this.dist = Math.floor(Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2)));
        return (this.dist < this.VisRadius + this.other.VisRadius);
    };
    AtkCircle() {
        var dx = this.cX - this.other.cX;
        var dy = this.cY - this.other.cY;
        this.dist = Math.floor(Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2)));
        return (this.dist < this.AtkRadius + this.other.AtkRadius);
    };
};




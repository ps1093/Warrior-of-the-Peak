class KaratePlayerCPU extends KaratePlayer{
    constructor(game, x, y, player){
        super(game,x,y);
        Object.assign(this,{game,x,y});
        this.other = player;

        //Hit Points
        this.maxHitPoints = 100;
        this.hitPoints = 69;
        
        //Setting up circle
        this.VisRadius = 280;
        this.AtkRadius = 45;

        //Setting up Character
        
        this.SPRITE.sheet = ASSET_MANAGER.getAsset("./sprites/spritesheet1.png");
        this.loadAnimations();
        console.log(this.SPRITE.sheet);
        this.name = "Johnny Lawrence";
        this.facing = this.FACING.LEFT;
        this.CPU = true;
        this.healthbar = new HealthBar(this);
        
    };

    update(){
        //Variables to manipulate the X and Y velocity
        const BLIND_WALK = 50;
        const WALK = 75;
        const FALL_WALK = 1;
        const ROLL = 100;
        const JUMPING = 500;
        const STOP_FALL = 400;
        const TICK = this.game.clockTick;

        //Ground Physics
        if(this.state !== this.STATE.JUMP){
            var dx, dy;

            this.midpoint = this.x + ((this.width1 * PARAMS.SCALE) / 2);
            this.other.midpoint = this.other.x + ((this.width1 * PARAMS.SCALE) / 2);

            //If negative, CPU is on the right side
            if((this.other.midpoint - this.midpoint) < 0){
                if(this.state === this.STATE.PUNCH){
                    dx = Math.floor((this.other.BB.x + this.other.attackPunchWidth * PARAMS.SCALE) - this.BB.x);
                } else if(this.state === this.STATE.KICK){
                    dx = Math.floor((this.other.BB.x + this.other.attackKickWidth * PARAMS.SCALE) - this.BB.x);
                } else {
                    dx = Math.floor((this.other.BB.x + this.other.width1 * PARAMS.SCALE) - this.BB.x);
                }
                
            } else {
                dx = Math.floor(this.other.BB.x - (this.BB.x + this.width1 * PARAMS.SCALE));
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
                        that.other.hitPoints -= .25;
                    }
                    console.log("HitPoints: " + that.other.hitPoints);
                }
            });





            //Implementing gravity.
            this.velocity.y += this.fallAcc * TICK;


        //air physics     
        } else if(this.state === this.STATE.JUMP) {
            this.velocity.y += this.fallAcc * TICK * PARAMS.SCALE;               
        }

        if(this.other.dead === true){
            this.velocity.x = 0;
            this.state = this.STATE.IDLE;
        }
        //updating
        this.x += this.velocity.x * TICK * PARAMS.SCALE;
        this.y += this.velocity.y * TICK * PARAMS.SCALE;
        this.cX = this.x + ((this.width1 / 2) * PARAMS.SCALE);
        this.cY = this.y + ((this.height1 / 2) * PARAMS.SCALE);
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
        };
        this.animations[this.state][this.facing].drawFrame(this.game.clockTick,ctx, this.x, this.y, PARAMS.SCALE);
        this.healthbar.draw(ctx);
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




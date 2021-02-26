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
        this.changeElapsed = 0;
        this.opAtkElapsed = 0;

        
        //Setting up circle
        this.VisRadius = 200;
        this.AtkRadius = 35;
        this.attack;
        opponentAtkRadius = this.AtkRadius;

        this.updateBB();
        this.loadAnimations();
    };
    randomGen(){
        this.attack = Math.floor(Math.random() * Math.floor(2));
    }
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
        this.changeElapsed += TICK;
        if(this.changeElapsed > 5){
            this.randomGen(); 
            this.changeElapsed = 0;
        }

        //Ground Physics
        if(this.state !== this.STATE.JUMP  && this.state !== this.STATE.DEAD){
            var dx, dy;

            this.midpoint = this.x + (KPstate.RIDLE[0].w / 2 * PARAMS.SCALE);
            this.other.midpoint = this.other.x + (KPstate.RIDLE[0].w / 2 * PARAMS.SCALE);

            this.position = this.other.midpoint - this.midpoint;
            //Have to check what side of the map he is on. 
            if(this.position < 0){
                dx = Math.floor((this.other.x + KPstate.RIDLE[0].w * PARAMS.SCALE) - this.x);
            } else if(this.position > 0){
                dx = Math.floor(this.other.x - (this.x + KPstate.RIDLE[0].w * PARAMS.SCALE))
            }

            if(Math.abs(dx) < 2){
                this.velocity.x = 0;
                dx = 0;
            }

            //This takes what side he is on and makes him go after opponent.
            if(dx < 0){
                this.facing = this.FACING.LEFT;
                this.state = this.STATE.WALK;
                if(!this.VisCircle())this.velocity.x = -BLIND_WALK;
                if(this.VisCircle())this.velocity.x = -WALK;
            } else if(dx > 0){
                this.facing = this.FACING.RIGHT;
                this.state = this.STATE.WALK;
                if(!this.VisCircle())this.velocity.x = BLIND_WALK;
                if(this.VisCircle())this.velocity.x = WALK;
            }
            
            var that = this;
            this.game.entities.forEach(function (entity) {
                    if (entity.BB && that.BB.collide(entity.BB)) {
                        if((entity instanceof KaratePlayer || entity instanceof catplayer) && entity.BB.right >= that.lastBB.left){
                            //that.x = entity.BB.right;
                            if(that.AtkCircle() && that.other.state !== that.other.STATE.BLOCK){
                                if(that.attack === 0){
                                    that.state = that.STATE.PUNCH;
                                    that.opAtkElapsed += TICK;
                                    if(that.opAtkElapsed < .75){
                                        that.other.hitPoints -= 0;
                                    } else {
                                        that.other.hitPoints -= 5;
                                        that.opAtkElapsed = 0;
                                    }
                                } else if(that.attack === 1){
                                    that.state = that.STATE.KICK;
                                    that.opAtkElapsed += TICK;
                                    if(that.opAtkElapsed < .60){
                                        that.other.hitPoints -= 0;
                                    } else {
                                        that.other.hitPoints -= 5;
                                        that.opAtkElapsed = 0;
                                    }
                                }
                            }
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
            opponentDeath = true;
        } 
        if(this.other.dead === true){
            this.velocity.x = 0;
            this.state = this.STATE.IDLE;
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
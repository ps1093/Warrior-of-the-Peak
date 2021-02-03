class aiKarateFighter extends KaratePlayer{
    constructor(game, x, y, karatePlayer){
        super(game, x, y);
        this.karatePlayer = karatePlayer;
        this.facing = this.FACING.LEFT;
               
    };
    update(){
        //Variables to manipulate the X and Y velocity
        const WALK = 75;
        const FALL_WALK = 1;
        const ROLL = 100;
        const JUMPING = 500;
        const STOP_FALL = 400;
        const TICK = this.game.clockTick;

        if(this.state !== this.STATE.JUMP){
            
           // if(this.karatePlayer.x < this.x){
                this.dist = Math.sqrt(Math.pow(this.karatePlayer.x - this.x,2) + Math.pow(this.karatePlayer.y - this.y, 2));
                //this.dist = Math.abs(this.karatePlayer.x - this.x);
                console.log("Distance: " + this.dist);
                this.velocity.x = (this.karatePlayer.x - this.x) / this.dist * WALK;
                if(this.velocity.x > 0){
                    this.facing = this.FACING.RIGHT;
                    this.state = this.STATE.WALK;
                } else if(this.velocity.x < 0){
                    this.facing = this.FACING.LEFT;
                    this.state = this.STATE.WALK;
                } 

            

            //Implementing gravity.
            this.velocity.y += this.fallAcc * TICK;

        } else if(this.state === this.STATE.JUMP){
            this.velocity.y += this.fallAcc * TICK * PARAMS.SCALE;

        }
        //updating
        this.x += this.velocity.x * TICK * PARAMS.SCALE;
        this.y += this.velocity.y * TICK * PARAMS.SCALE;
        this.updateBB();
        // this.collisions();
        //collision
		var that = this;
		this.game.entities.forEach(function (entity) {
            //if(that.velocity.x < 0){
                // if (that.lastBB.left <= that.karatePlayer.BB.right) {
                //     if(that.state === that.STATE.WALK){
                //         that.x = that.karatePlayer.BB.right;
                //         //that.state = that.STATE.IDLE;
                //     } 
                //     that.velocity.x = 0;
                //     that.updateBB();
                // }
                // if(that.lastBB.right >= that.karatePlayer.BB.left){
                //     if(that.state = that.STATE.WALK){
                //         that.x = that.karatePlayer.x;
                //     }
                //     that.velocity.x = 0;
                //     that.updateBB();
                // }
            //}

		});
        this.collisions();
    };
};



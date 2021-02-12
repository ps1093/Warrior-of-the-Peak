class ChunLi {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y});

        this.game.ChunLi = this;

        this.name = "Chun Li";

        //For the Health Bar
        this.maxHitPoints  = 100;

        //Total hit points taken
        this.hitPoints = 100;


        // spritesheet
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/ChunLi.png");

        // ChunLi state variables
        this.state = 0; // 0 = idle, 1 = walking, 2 = jump, 3 = punch, 4 = kick, 5 = jump kick, 6 = super kick, 7 = bird kick, 8 = get hit, 9 = duck, 10 = block
        this.facing = 0; // 0 = right, 1 = left
        this.dead = false;

         //His velocity for movements.
        this.velocity = {
            x:0, 
            y:0
        };

        //Creating the Health Bar
        this.healthbar = new HealthBar(this);
        //This is the falling acceleration for gravity.
        this.fallAcc =100;

        // Idle
        // facing right
        this.idle = [{x: 0, y: 1, w: 42, h: 76}, {x: 50, y: 1, w: 42, h: 76}, {x: 100, y: 0, w: 42, h: 77}, {x: 100, y: 0, w: 42, h: 77}];
        
        // facing left

        // walk
        // facing right
        this.walk = [{x: 210, y: 4, w: 46, h: 74}, {x: 260, y: 1, w: 42, h: 77}, {x: 310, y: 0, w: 37, h: 78}, {x: 360, y: 1, w: 43, h: 77}, 
            {x: 410, y: 3, w: 48, h: 75}, {x: 460, y: 1, w: 42, h: 77}, {x: 510, y: 0, w: 37, h: 78}, {x: 560, y: 1, w: 42, h: 77}];

        // jump
        // facing right
        this.jump = [{x: 620, y: 28, w: 43, h: 65}, {x: 670, y: 0, w: 29, h: 95}, {x: 720, y: 0, w: 35, h: 60}, {x: 770, y: 0, w: 29, h: 95}]; 

        // punch
        // facing right
        this.punch = [{x: 830, y: 0, w: 60, h: 74}, {x: 910, y: 9, w: 76, h: 67}, {x: 990, y: 0, w: 60, h: 74}];

        // kick
        // facing right
        this.kick = [{x: 1100, y: 5, w: 42, h: 80}, {x: 1200, y: 0, w: 73, h: 86}, {x: 1300, y: 11, w: 60, h: 75}, {x: 1400, y: 13, w: 41, h: 73}];

        // jump kick
        // facing right
        this.jKick = [{x: 0, y: 142, w: 43, h: 83}, {x: 80, y: 144, w: 51, h: 81}, {x: 160, y: 134, w: 65, h: 64}, {x: 240, y: 130, w: 31, h: 93}, 
            {x: 320, y: 140, w: 64, h: 80}, {x: 400, y: 150, w: 52, h: 75}];

        // super kick
        // facing right
        this.sKick = [{x: 500, y: 139, w: 63, h: 88}, {x: 590, y: 138, w: 71, h: 90}, {x: 680, y: 143, w: 69, h: 84}, {x: 770, y: 143, w: 78, h: 84}, 
            {x: 860, y: 145, w: 72, h: 83}, {x: 950, y: 143, w: 80, h: 83}, {x: 1040, y: 145, w: 61, h: 83}];

        // bird kick
        // facing right
        this.bKick = [{x: 0, y: 317, w: 39, h: 52}, {x: 90, y: 274, w: 30, h: 96}, {x: 180, y: 284, w: 52, h: 75}, {x: 270, y: 259, w: 64, h: 78},
            {x: 360, y: 250, w: 31, h: 93}, {x: 450, y: 268, w: 32, h: 102}, {x: 540, y: 250, w: 32, h: 93}, {x: 630, y: 266, w: 32, h: 63}, {x: 720, y: 268, w: 85, h: 62},
            {x: 810, y: 268, w: 28, h: 62}, {x: 900, y: 268, w: 85, h: 63}, {x: 990, y: 269, w: 32, h: 102}, {x: 1080, y: 251, w: 31, h: 93}, {x: 1170, y: 260, w: 64, h: 78}, 
            {x: 1260, y: 285, w: 52, h: 75}, {x: 1350, y: 275, w: 29, h: 96}];

        // dead
        // facing right
        this.die = [{x: 0, y: 400, w: 71, h: 64}, {x: 84, y: 400, w: 55, h: 61}, {x: 169, y: 436, w: 81, h: 33}];

        // get hit
        // facing right
        this.gHit = [{x: 320, y: 399, w: 42, h: 76}, {x: 396, y: 393, w: 44, h: 82}, {x: 462, y: 400, w: 60, h: 75}];

        // duck
        // facing right
        this.duck = [{x: 600, y: 398, w: 42, h: 76}, {x: 650, y: 422, w: 38, h: 52}];

        // block
        // facing right
        this.block = [{x: 0, y: 481, w: 49, h: 75}, {x: 57, y: 496, w: 45, h: 60}];


        this.updateBB();

        

         // player animations
         this.animations = [];
         this.loadAnimations();
    };


         loadAnimations() {
            for (var i = 0; i < 11; i++) { // ten states
                this.animations.push([]);
                for (var j = 0; j < 2; j++) { // two directions
                    this.animations[i].push([]);
                }
             }


        
            
             /*

        //ChunLi
        // Idle
        // facing right
        var idle = [{x: 0, y: 1, w: 42, h: 76}, {x: 50, y: 1, w: 42, h: 76}, {x: 100, y: 0, w: 42, h: 77}, {x: 100, y: 0, w: 42, h: 77}];
        
        // facing left

        // walk
        // facing right
        var walk = [{x: 210, y: 4, w: 46, h: 74}, {x: 260, y: 1, w: 42, h: 77}, {x: 310, y: 0, w: 37, h: 78}, {x: 360, y: 1, w: 43, h: 77}, 
            {x: 410, y: 3, w: 48, h: 75}, {x: 460, y: 1, w: 42, h: 77}, {x: 510, y: 0, w: 37, h: 78}, {x: 560, y: 1, w: 42, h: 77}];

        // jump
        // facing right
        var jump = [{x: 620, y: 28, w: 43, h: 65}, {x: 670, y: 0, w: 29, h: 95}, {x: 720, y: 0, w: 35, h: 60}, {x: 770, y: 0, w: 29, h: 95}]; 

        // punch
        // facing right
        var punch = [{x: 830, y: 0, w: 60, h: 74}, {x: 910, y: 9, w: 76, h: 67}, {x: 990, y: 0, w: 60, h: 74}];

        // kick
        // facing right
        var kick = [{x: 1100, y: 5, w: 42, h: 80}, {x: 1200, y: 0, w: 73, h: 86}, {x: 1300, y: 11, w: 60, h: 75}, {x: 1400, y: 13, w: 41, h: 73}];

        // jump kick
        // facing right
        var jKick = [{x: 0, y: 142, w: 43, h: 83}, {x: 80, y: 144, w: 51, h: 81}, {x: 160, y: 134, w: 65, h: 64}, {x: 240, y: 130, w: 31, h: 93}, 
            {x: 320, y: 140, w: 64, h: 80}, {x: 400, y: 150, w: 52, h: 75}];

        // super kick
        // facing right
        var sKick = [{x: 500, y: 139, w: 63, h: 88}, {x: 590, y: 138, w: 71, h: 90}, {x: 680, y: 143, w: 69, h: 84}, {x: 770, y: 143, w: 78, h: 84}, 
            {x: 860, y: 145, w: 72, h: 83}, {x: 950, y: 143, w: 80, h: 83}, {x: 1040, y: 145, w: 61, h: 83}];

        // bird kick
        // facing right
        var bKick = [{x: 0, y: 317, w: 39, h: 52}, {x: 90, y: 274, w: 30, h: 96}, {x: 180, y: 284, w: 52, h: 75}, {x: 270, y: 259, w: 64, h: 78},
            {x: 360, y: 250, w: 31, h: 93}, {x: 450, y: 268, w: 32, h: 102}, {x: 540, y: 250, w: 32, h: 93}, {x: 630, y: 266, w: 32, h: 63}, {x: 720, y: 268, w: 85, h: 62},
            {x: 810, y: 268, w: 28, h: 62}, {x: 900, y: 268, w: 85, h: 63}, {x: 990, y: 269, w: 32, h: 102}, {x: 1080, y: 251, w: 31, h: 93}, {x: 1170, y: 260, w: 64, h: 78}, 
            {x: 1260, y: 285, w: 52, h: 75}, {x: 1350, y: 275, w: 29, h: 96}];

        // dead
        // facing right
        var die = [{x: 0, y: 400, w: 71, h: 64}, {x: 84, y: 400, w: 55, h: 61}, {x: 169, y: 436, w: 81, h: 33}];

        // get hit
        // facing right
        var gHit = [{x: 320, y: 399, w: 42, h: 76}, {x: 396, y: 393, w: 44, h: 82}, {x: 462, y: 400, w: 60, h: 75}];

        // duck
        // facing right
        var duck = [{x: 600, y: 398, w: 42, h: 76}, {x: 650, y: 422, w: 38, h: 52}];

        // block
        // facing right
        var block = [{x: 0, y: 481, w: 49, h: 75}, {x: 57, y: 496, w: 45, h: 60}];

            */

        this.animations[0][0] = new Animator2(this.spritesheet, this.idle, 4, .1, false, true);
        this.animations[0][1] = new Animator2(this.spritesheet, this.idle, 4, .1, false, true);
        this.animations[1][0] = new Animator2(this.spritesheet, this.walk, 8, .1, false, true);
        this.animations[1][1] = new Animator2(this.spritesheet, this.walk, 8, .1, false, true);
        this.animations[2][0] = new Animator2(this.spritesheet, this.jump, 4, .1, false, true);
        this.animations[2][1] = new Animator2(this.spritesheet, this.jump, 4, .1, false, true);
        this.animations[3][0] = new Animator2(this.spritesheet, this.punch, 3, .5, false, true);
        this.animations[3][1] = new Animator2(this.spritesheet, this.punch, 3, .5, false, true);
        this.animations[4][0] = new Animator2(this.spritesheet, this.kick, 4, .5, false, true);
        this.animations[4][1] = new Animator2(this.spritesheet, this.kick, 4, .5, false, true);
        this.animations[5][0] = new Animator2(this.spritesheet, this.jKick, 6, .1, false, true);
        this.animations[5][1] = new Animator2(this.spritesheet, this.jKick, 6, .1, false, true);
        this.animations[6][0] = new Animator2(this.spritesheet, this.sKick, 7, .1, false, true);
        this.animations[6][1] = new Animator2(this.spritesheet, this.sKick, 7, .1, false, true);
        this.animations[7][0] = new Animator2(this.spritesheet, this.walk, 16, .1, false, true);
        this.animations[7][1] = new Animator2(this.spritesheet, this.walk, 16, .1, false, true);
        this.animations[8][0] = new Animator2(this.spritesheet, this.gHit, 2, .1, false, true);
        this.animations[8][1] = new Animator2(this.spritesheet, this.gHit, 2, .1, false, true);
        this.animations[9][0] = new Animator2(this.spritesheet, this.duck, 2, .2, false, true);
        this.animations[9][1] = new Animator2(this.spritesheet, this.duck, 2, .2, false, true);
        this.animations[10][0] = new Animator2(this.spritesheet, this.block, 2, .1, false, true);
        this.animations[10][1] = new Animator2(this.spritesheet, this.block, 2, .1, false, true);
            
    };

    
  
    updateBB(){
        this.lastBB = this.BB;
        
        if (this.state === 0) {
            this.BB = new BoundingBox (this.x, this.y, this.idle[0].w, this.idle[0].h);
        } else if (this.state === 1) {
            this.BB = new BoundingBox (this.x, this.y, this.walk[0].w, this.walk[0].h);
        } else if (this.state === 2) {
            this.BB = new BoundingBox(this.x, this.y, this.jump[0].w, this.jump[0].h);
        } else if (this.state === 3) {
            this.BB = new BoundingBox(this.x, this.y, this.punch[0].w, this.punch[0].h);
        } else if (this.state === 4) {
            this.BB = new BoundingBox(this.x, this.y, this.kick[0].w, this.kick[0].h);
        } else if (this.state === 5) {
            this.BB = new BoundingBox(this.x, this.y, this.jKick[0].w, this.jKick[0].h);
        } else if (this.state === 6) {
            this.BB = new BoundingBox(this.x, this.y, this.sKick[0].w, this.sKick[0].h);
        } else if (this.state === 7) {
            this.BB = new BoundingBox(this.x, this.y, this.bKick[0].w, this.bKick[0].h);
        } else if (this.state === 8) {
            this.BB = new BoundingBox(this.x, this.y, this.gHit[0].w, this.gHit[0].h);
        } else if (this.state === 9) {
            this.BB = new BoundingBox(this.x, this.y, this.duck[0].w, this.duck[0].h);
        } else if (this.state === 10) {
            this.BB = new BoundingBox(this.x, this.y, this.block[0].w, this.block[0].h);
        } 
    };

    die(){
        if (this.maxHitPoints === 0){
            this.dead === true;
        }

    };

    update(){

        //Variables to manipulate the X and Y velocity
        const WALK = 150;
        const FALL_WALK = 1;
        const ROLL = 100;
        const JUMPING = 500;
        const STOP_FALL = 400;
        const TICK = this.game.clockTick;

        //Ground Physics
        if(this.state !== 2){
            //Walking
            if(this.game.D){
                this.velocity.x = WALK;
                this.state = 1;
                this.facing = 0;
            } else if(this.game.A){

                this.velocity.x = -WALK;
                this.facing = 1;
                this.state = 1;
            } else {
                this.velocity.x = 0;
                this.state = 0;
            }
            //Punch, direction does not matter.
            if(this.game.C){
                this.state = 3;
            }
            //Duck
            if(this.game.S){
                this.state = 9;
            } 
            //Rolling
     /*       if(this.game.S && this.game.D){
                this.facing = this.FACING.LEFT;
                this.state = this.STATE.ROLL;
                this.velocity.x = ROLL;
            } else if(this.game.A && this.game.S){
                this.velocity.x = -ROLL;
                this.facing = this.FACING.RIGHT;
                this.state = this.STATE.ROLL;
             } */
            //Implementing gravity.
            this.velocity.y += this.fallAcc * TICK;
            //Jump
            if(this.game.W ){
                this.velocity.y = -JUMPING;
                this.state = 2;
                this.fallAcc = STOP_FALL;
             }  
            //Kick
            if(this.game.P){
                this.state = 4;
            }

         //air physics     
        } else if(this.state === 2) {
            this.velocity.y += this.fallAcc * TICK * 1.25;
            //horizontal air physics
            if(this.game.D && !this.game.A){
                this.facing = 0;
                this.velocity.x += FALL_WALK;
            } else if(this.game.A && !this.game.D){
                this.facing = 1;
                this.velocity.x -= FALL_WALK;   
            } else {
            }               
        }

        //updating
        this.x += this.velocity.x * TICK * 1.25;
        this.y += this.velocity.y * TICK * 1.25;
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
                        //Falling Logic - Level1 - Level2 - Ground
                        if((entity instanceof BackGround || entity instanceof BackScene) && that.lastBB.bottom >= entity.BB.bottom){
                            if(that.state === that.state[2]) that.state = that.state[0];
                            if(that.state === that.state[0]) that.y = entity.BB.top - (that.idle[0].h);
                            else if(that.state === that.state[1]) that.y = entity.BB.top - (that.walk[1].h);
                            else if(that.state === that.state[9]) that.y = entity.BB.top - (that.duck[9].h);
                            else if(that.state === that.state[3]) that.y = entity.BB.top - (that.punch[3].h);  
                            else if(that.state === that.state[4]) that.y = entity.BB.top - (that.kick[4].h);              
                            that.velocity.y = 0;
                            that.updateBB();                         
                        }
                         //Jumping & Kicking to Right - Level2 - Level1
                         if((entity instanceof BackScene || entity instanceof BackGround) && that.lastBB.right >= entity.BB.right){
                            if(that.state === that.state[0]) that.x = entity.BB.right - (that.jump[0].h);
                             that.velocity.y =0;
                             that.updateBB();
                        }
                    }
                }
            })
        };

    

    

    draw(ctx) {

        /*
        ctx.strokeStyle = "White";
        ctx.strokeRect(300, 300, 43 * 3, 80 * 3);
        ctx.save();
        ctx.scale(-1, 1);
        ctx.drawImage(this.spritesheet, 0, 0, 49, 80, -429, 300, 49 * 3, 80 * 3);
        
        */
      //  ctx.scale(-1, 1);
      //  this.animations[6][0].drawFrame(this.game.clockTick, ctx, -535, 429, 1);

        if(PARAMS.DEBUG){
            ctx.strokeStyle = "Red";
            if (this.facing === 0){
                ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width * 1.25, this.BB.height * 1.25);
            } else {
                ctx.save();
                ctx.scale(-1, 1);
                ctx.strokeRect(-(this.BB.x) - 30, this.BB.y, this.BB.width * 1.25, this.BB.height * 1.25);
            }
        };

        if (this.dead) {
            this.die.drawFrame(this.game.clockTick,ctx, this.x, this.y, 1.25);
        } else if (this.facing === 0) {
        this.animations[this.state][this.facing].drawFrame(this.game.clockTick,ctx, this.x, this.y, 1.25);
        this.healthbar.draw(ctx);

        } else {
            ctx.save();
            ctx.scale(-1, 1);
            this.animations[this.state][this.facing].drawFrame(this.game.clockTick,ctx, -(this.x) - 30, this.y, 1.25);
            this.healthbar.draw(ctx);
           

        }
    };
        
 
    
};
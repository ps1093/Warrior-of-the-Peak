class BillyLee {
    constructor(game, x, y, theName, roundCount, map, deathCount, opponent) {
        Object.assign(this, { game, x, y, theName, roundCount, map, deathCount, opponent });
  
      //  this.game.BillyLee = this;

      //  this.name = "Billy Lee";

        //Character Details for HUD and game
        this.name = this.theName;
        this.dead = false;
        this.CPU = false;
        this.deathCount = deathCount;
        this.elapsed = 0;

        //For the Health Bar
        this.maxHitPoints  = 100;

        //Total hit points taken
        this.hitPoints = 100;
  
  
        // spritesheet
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/BillyLee.png")
  
        // DDPlayer state variables
        this.state = 0; // 0 = idle, 1 = walking, 2 = right punch, 3 = left punch, 4 = super punch, 5 = kick, 6 = super kick, 7 = get hit, 8 = jump, 9 = duck 
        this.facing = 0; // 0 = right, 1 = left
       // this.dead = false;

        this.velocity = {x:0, y:0};

         //Creating the Health Bar
        this.healthbar = new HealthBar(this);
        this.fallAcc = 562.5;

        // Idle
        // facing right
        this.idle = [{x: 0, y: 0, w: 20, h: 63}];

        // Walk
        // facing right
        this.walk = [{x: 49, y: 0, w: 21, h: 63}, {x: 80, y: 0, w: 24, h: 62}, {x: 111, y: 0, w: 24, h: 63}, {x: 142, y: 0, w: 18, h: 62}];

        // right punch
        // facing right
        this.rPunch = [{x: 330, y: 0, w: 26, h: 60}, {x: 379, y: 0, w: 47, h: 59}, {x: 429, y: 0, w: 28, h: 58}];

        // left punch
        // facing right
        this.lPunch = [{x: 179, y: 0, w: 30, h: 60}, {x: 229, y: 0, w: 47, h: 59}, {x: 279, y: 0, w: 28, h: 59}];

        // super punch
        // facing right
        this.sPunch = [{x: 0, y: 75, w: 27, h: 59}, {x: 50, y: 75, w: 25, h: 57}, {x: 100, y: 75, w: 35, h: 60}, {x: 150, y: 66, w: 30, h: 70}];

        // kick
        // facing right
        this.kick = [{x: 199, y: 76, w: 28, h: 60}, {x: 250, y: 75, w: 27, h: 61}, {x: 300, y: 79, w: 44, h: 57}];

        // super kick
        // facing right
        this.sKick = [{x: 0, y: 146, w: 24, h: 61}, {x: 50, y: 143, w: 28, h: 64}, {x: 100, y: 150, w: 37, h: 39}, {x: 150, y: 147, w: 44, h: 43}, {x: 200, y: 156, w: 37, h: 39}];
  
        // get Hit
        // facing right
        this.gHit = [{x: 0, y: 218, w: 22, h: 63}, {x: 30, y: 217, w: 27, h: 62}];

        // jump
        // facing right
        this.jump = [{x: 16, y: 435, w: 28, h: 64}, {x: 52, y: 460, w: 37, h: 39}];

        // duck
        // facing right
        this.duck = [{x: 120, y: 216, w: 20, h: 63}, {x: 160, y: 236, w: 30, h: 42}];

        // dead
        // facing right
        this.die = [{x: 250, y: 153, w: 30, h: 42}, {x: 300, y: 161, w: 36, h: 34}, {x: 350, y: 166, w: 47, h: 30}, {x: 400, y: 167, w: 48, h: 30}];


  
        // player animations
        this.animations = [];
        this.loadAnimations();
        this.updateBB();
    };
  
    loadAnimations() {
        for (var i = 0; i < 10; i++) { // ten states
            this.animations.push([]);
            for (var j = 0; j < 2; j++) { // two directions
                this.animations[i].push([]);
            }
         }

        this.animations[0][0] = new Animator2(this.spritesheet, this.idle, 1, .1, false, true);
        this.animations[0][1] = new Animator2(this.spritesheet, this.idle, 1, .1, false, true);
        this.animations[1][0] = new Animator2(this.spritesheet, this.walk, 4, .1, false, true);
        this.animations[1][1] = new Animator2(this.spritesheet, this.walk, 4, .1, false, true);
        this.animations[2][0] = new Animator2(this.spritesheet, this.rPunch, 3, .1, false, true);
        this.animations[2][1] = new Animator2(this.spritesheet, this.rPunch, 3, .1, false, true);
        this.animations[3][0] = new Animator2(this.spritesheet, this.lPunch, 3, .2, false, true);
        this.animations[3][1] = new Animator2(this.spritesheet, this.lPunch, 3, .2, false, true);
        this.animations[4][0] = new Animator2(this.spritesheet, this.sPunch, 4, .1, false, true);
        this.animations[4][1] = new Animator2(this.spritesheet, this.sPunch, 4, .1, false, true);
        this.animations[5][0] = new Animator2(this.spritesheet, this.kick, 3, .1, false, true);
        this.animations[5][1] = new Animator2(this.spritesheet, this.kick, 3, .1, false, true);
        this.animations[6][0] = new Animator2(this.spritesheet, this.sKick, 5, .15, false, true);
        this.animations[6][1] = new Animator2(this.spritesheet, this.sKick, 5, .15, false, true);
        this.animations[7][0] = new Animator2(this.spritesheet, this.gHit, 2, .1, false, true);
        this.animations[7][1] = new Animator2(this.spritesheet, this.gHit, 2, .1, false, true);
        this.animations[8][0] = new Animator2(this.spritesheet, this.jump, 2, .5, false, true);
        this.animations[8][1] = new Animator2(this.spritesheet, this.jump, 2, .5, false, true);
        this.animations[9][0] = new Animator2(this.spritesheet, this.duck, 2, .15, false, true);
        this.animations[9][1] = new Animator2(this.spritesheet, this.duck, 2, .15, false, true);
        this.deadScene = new Animator2(this.spritesheet, this.die, 4, 1, false, true);
        
  

        /*
         // idle animation for state 0
         // facing right
         this.animations[0][0] = new Animator(this.spritesheet, 0, 0, 30, 62, 1, .5, 0, false, true);
  
         // facing left
         this.animations[0][1] = new Animator(this.spritesheet, 0, 0, 30, 62, 1, .5, 0, false, true); // need to update for left facing
  
         // walking animation for state 1
        // facing right
        this.animations[1][0] = new Animator(this.spritesheet, 50, 0, 30, 62, 4, .2, 0, false, true);
  
        // facing left
        this.animations[1][1] = new Animator(this.spritesheet, 50, 0, 30, 62, 4, .5, 0, false, true); // need to update for left facing
  
        // right punch animation for state 2
        // facing right
        this.animations[2][0] = new Animator(this.spritesheet, 330, 0, 50, 62, 3, .2, 0, false, true);
  
        // facing left
        this.animations[2][1] = new Animator(this.spritesheet, 330, 0, 50, 62, 3, .5, 0, false, true); // need to update for left facing
  
        // left punch animation for state 3
        // facing right
        this.animations[3][0] = new Animator(this.spritesheet, 180, 0, 50, 62, 3, .5, 0, false, true);
  
        // facing left
        this.animations[3][1] = new Animator(this.spritesheet, 180, 0, 50, 62, 3, .5, 0, false, true); // need to update for left facing
  
        // super punch animation for state 4
        // facing right
        this.animations[4][0] = new Animator(this.spritesheet, 0, 64, 48, 72, 4, .2, 2, false, true);
  
        // facing left
        this.animations[4][1] = new Animator(this.spritesheet, 0, 64, 48, 72, 4, .2, 2, false, true); // need to update for left facing
  
        // kick animation for state 5
        // facing right
        this.animations[5][0] = new Animator(this.spritesheet, 198, 74, 50, 62, 3, .2, 0, false, true);
  
        // facing left
        this.animations[5][1] = new Animator(this.spritesheet, 198, 74, 50, 62, 3, .5, 0, false, true); // need to update for left facing
  
        // super kick animation for state 6
        // facing right
        this.animations[6][0] = new Animator(this.spritesheet, 0, 142, 50, 64, 5, .2, 0, false, true);
  
        // facing left
        this.animations[6][1] = new Animator(this.spritesheet, 0, 142, 50, 64, 5, .2, 0, false, true); // need to update for left facing
  
        // get hit animation for state 7
        // facing right
        this.animations[7][0] = new Animator(this.spritesheet, 0, 216, 30, 62, 2, .2, 0, false, true);
  
        // facing left
        this.animations[7][1] = new Animator(this.spritesheet, 0, 216, 30, 62, 2, .2, 0, false, true); // need to update for left facing
  
        // jump animation for state 8
        // facing right
        this.animations[8][0] = new Animator(this.spritesheet, 0, 142, 50, 64, 3, .2, 0, false, true);
  
        // facing left
        this.animations[8][1] = new Animator(this.spritesheet, 0, 142, 50, 64, 3, .2, 0, false, true); // need to update for left facing
  
        // duck for state 9
        // facing right
        this.animations[9][0] = new Animator(this.spritesheet, 120, 216, 35, 64, 2, .2, 5, false, true);
  
        // facing left
        this.animations[9][1] = new Animator(this.spritesheet, 120, 216, 35, 64, 2, .2, 5, false, true);  // need to update for left facing
  
        // dead animation
        this.deadAnim = new Animator(this.spritesheet, 250, 153, 49, 64, 5, .2, 1, false, true);
  
         */
  
  
  
  
  
     //DD2
     // Idle
     // this.animation = new Animator(this.spritesheet, 0, 0, 30, 62, 1, .5, 0, false, true); 
  
     // walk
     // this.animation = new Animator(this.spritesheet, 50, 0, 30, 62, 4, .5, 0, false, true);
  
     // left punch
     //this.animation = new Animator(this.spritesheet, 180, 0, 50, 62, 3, .5, 0, false, true);
  
     // right punch
     // this.animation = new Animator(this.spritesheet, 330, 0, 50, 62, 3, .5, 0, false, true);
  
     // super punch
     // this.animation = new Animator(this.spritesheet, 0, 64, 48, 72, 4, .5, 2, false, true);
  
     // kick
     // this.animation = new Animator(this.spritesheet, 198, 74, 50, 62, 3, .5, 0, false, true);
  
     // super kick
     // this.animation = new Animator(this.spritesheet, 0, 142, 50, 64, 5, .2, 0, false, true);
  
     // dead
     // this.animation = new Animator(this.spritesheet, 250, 153, 49, 64, 5, .2, 1, false, true);
  
     // get hit
     // this.animation = new Animator(this.spritesheet, 0, 216, 30, 62, 2, .2, 0, false, true);
  
     // jump
      // this.animation = new Animator(this.spritesheet, 0, 142, 50, 64, 3, .2, 0, false, true);
     
     
  
     
  };

  updateBB(){
    this.lastBB = this.BB;

    if (this.facing === 0) {
        if (this.state === 0) {
            this.BB = new BoundingBox (this.x, this.y, this.idle[this.animations[0][0].currentFrame()].w * PARAMS.BL, this.idle[this.animations[0][0].currentFrame()].h * PARAMS.BL);
        } else if (this.state === 1) {
            this.BB = new BoundingBox (this.x, this.y, this.walk[this.animations[1][0].currentFrame()].w * PARAMS.BL, this.walk[this.animations[1][0].currentFrame()].h * PARAMS.BL);
        } else if (this.state === 2) {
            this.BB = new BoundingBox(this.x, this.y, this.rPunch[this.animations[2][0].currentFrame()].w * PARAMS.BL, this.rPunch[this.animations[2][0].currentFrame()].h * PARAMS.BL);
        } else if (this.state === 3) {
            this.BB = new BoundingBox(this.x, this.y, this.lPunch[this.animations[3][0].currentFrame()].w * PARAMS.BL, this.lPunch[this.animations[3][0].currentFrame()].h * PARAMS.BL);
        } else if (this.state === 4) {
            this.BB = new BoundingBox(this.x, this.y, this.sPunch[this.animations[4][0].currentFrame()].w * PARAMS.BL, this.sPunch[this.animations[4][0].currentFrame()].h * PARAMS.BL);
        } else if (this.state === 5) {
            this.BB = new BoundingBox(this.x, this.y, this.kick[this.animations[5][0].currentFrame()].w * PARAMS.BL, this.kick[this.animations[5][0].currentFrame()].h * PARAMS.BL);
        } else if (this.state === 6) {
            this.BB = new BoundingBox(this.x, this.y, this.sKick[this.animations[6][0].currentFrame()].w * PARAMS.BL, this.sKick[this.animations[6][0].currentFrame()].h * PARAMS.BL);
        } else if (this.state === 7) {
            this.BB = new BoundingBox(this.x, this.y, this.gHit[this.animations[7][0].currentFrame()].w * PARAMS.BL, this.gHit[this.animations[7][0].currentFrame()].h * PARAMS.BL);
        } else if (this.state === 8) {
            this.BB = new BoundingBox(this.x, this.y, this.jump[this.animations[8][0].currentFrame()].w * PARAMS.BL, this.jump[this.animations[8][0].currentFrame()].h * PARAMS.BL);
        } else if (this.state === 9) {
            this.BB = new BoundingBox(this.x, this.y, this.duck[this.animations[9][0].currentFrame()].w * PARAMS.BL, this.duck[this.animations[9][0].currentFrame()].h * PARAMS.BL);
        }  
    } else {
            if (this.state === 0){
                this.BB = new BoundingBox (this.x, this.y, this.idle[this.animations[0][1].currentFrame()].w * PARAMS.BL, this.idle[this.animations[0][1].currentFrame()].h * PARAMS.BL);
            } else if (this.state === 1) {
            this.BB = new BoundingBox (this.x, this.y, this.walk[this.animations[1][1].currentFrame()].w * PARAMS.BL, this.walk[this.animations[1][1].currentFrame()].h * PARAMS.BL);
        } else if (this.state === 2) {
            this.BB = new BoundingBox(this.x, this.y, this.rPunch[this.animations[2][1].currentFrame()].w * PARAMS.BL, this.rPunch[this.animations[2][1].currentFrame()].h * PARAMS.BL);
        } else if (this.state === 3) {
            this.BB = new BoundingBox(this.x, this.y, this.lPunch[this.animations[3][1].currentFrame()].w * PARAMS.BL, this.lPunch[this.animations[3][1].currentFrame()].h * PARAMS.BL);
        } else if (this.state === 4) {
            this.BB = new BoundingBox(this.x, this.y, this.sPunch[this.animations[4][1].currentFrame()].w * PARAMS.BL, this.sPunch[this.animations[4][1].currentFrame()].h * PARAMS.BL);
        } else if (this.state === 5) {
            this.BB = new BoundingBox(this.x, this.y, this.kick[this.animations[5][1].currentFrame()].w * PARAMS.BL, this.kick[this.animations[5][1].currentFrame()].h * PARAMS.BL);
        } else if (this.state === 6) {
            this.BB = new BoundingBox(this.x, this.y, this.sKick[this.animations[6][1].currentFrame()].w * PARAMS.BL, this.sKick[this.animations[6][1].currentFrame()].h * PARAMS.BL);
        } else if (this.state === 7) {
            this.BB = new BoundingBox(this.x, this.y, this.gHit[this.animations[7][1].currentFrame()].w * PARAMS.BL, this.gHit[this.animations[7][1].currentFrame()].h* PARAMS.BL);
        } else if (this.state === 8) {
            this.BB = new BoundingBox(this.x, this.y, this.jump[this.animations[8][1].currentFrame()].w * PARAMS.BL, this.jump[this.animations[8][1].currentFrame()].h* PARAMS.BL);
        } else if (this.state === 9) {
            this.BB = new BoundingBox(this.x, this.y, this.duck[this.animations[9][1].currentFrame()].w * PARAMS.BL, this.duck[this.animations[9][1].currentFrame()].h * PARAMS.BL);
        }  
    }
    

};
  
  
      // (source, x coor, y coor, x width, y width, frame count, duration, padding, reverse, loop)
       //DD2
        // Right Punch
        // this.animation = new Animator(this.spritesheet, 0, 0, 47, 60, 3, .5, 8, false, true); 
  
        // Left Punch
        // this.animation = new Animator(this.spritesheet, 165, 0, 47, 60, 3, .5, 10, false, true);
  
        // Super Right Punch
        // this.animation = new Animator(this.spritesheet, 339, 0, 35, 90, 4, .5, 5, false, true);
  
        // walking
        // this.animation = new Animator(this.spritesheet, 0, 79, 28, 62, 4, .5, 2, false, true);
  
        // kick
        // this.animation = new Animator(this.spritesheet, 140, 79, 44, 62, 3, .5, 6, false, true);
  
        // dead
        //  this.animation = new Animator(this.spritesheet, 290, 102, 49, 45, 4, .5, 1, false, true);
  
         // super kick
        //  this.animation = new Animator(this.spritesheet, 0, 299, 49, 64, 5, .2, 1, false, true);
  
        // duck
        // this.animation = new Animator(this.spritesheet, 120, 216, 35, 64, 2, .2, 5, false, true);
  
  
  
        die(){
            if (this.hitPoints === 0){
                this.dead === true;
            }
    
        };
  
  
  
  update(){

    const TICK = this.game.clockTick;

    const WALK = 250;
    const FALL_WALK = 1;
    const JUMPING = 400;
    const STOP_FALL = 400;
    const JUMP_KICK = 50;

        // ground physics
        if (this.state != 8){
            //walking
          if (this.game.D){
              this.facing = 0;
              this.state = 1;
              this.velocity.x = WALK;
          } else if (this.game.A) {
              this.facing = 1;
              this.state = 1;
              this.velocity.x = -WALK;
          } else {
            this.velocity.x = 0;
            this.state = 0;
          }

          //Punch, direction does not matter.
          if(this.game.C){
            this.state = 2;
        }
        //Duck
        if(this.game.S){
            this.state = 9;
        }

         //Kick
        if(this.game.P){
            this.state = 5;
        }

        // super punch
        if(this.game.K){
            this.state = 4;
        }

        // super kick
        if(this.game.L){
            this.velocity.y = -JUMP_KICK;
            this.state = 6;
            this.fallAcc = STOP_FALL;
        }

            //Implementing gravity.
            this.velocity.y += this.fallAcc * TICK;

            // jump
          if (this.game.W){

            this.velocity.y = -JUMPING;
            this.state = 8;
            this.fallAcc = STOP_FALL;
          }

           //air physics     
        } else if(this.state === 8) {
            this.velocity.y += this.fallAcc * TICK;

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

        if (this.hitPoints === 0){
            this.dead = true;
        }
        if(opponentDeath){
            if(this.roundCount <= 3 && opponentDeathCount <= 3){
                this.elapsed += TICK;
                if(this.elapsed > 2){
                    opponentDeathCount++;
                    this.game.addEntity(new RoundManager(this.game, this.roundCount, this.theName, this.opponent, this.map, this.deathCount, opponentDeathCount));
                }
            } 
         }
         if(this.dead){
            if(this.roundCount <= 3 && this.deathCount <= 3){
                this.elapsed += TICK;
                if(this.elapsed > 2){
                    this.deathCount++;
                    this.game.addEntity(new RoundManager(this.game, this.roundCount, this.theName, this.opponent, this.map, this.deathCount, opponentDeathCount));
                }
            } 
         }
         //updating
         this.x += this.velocity.x * TICK;
         this.y += this.velocity.y * TICK;
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
                    if((entity instanceof BackGround || entity instanceof BackScene || entity instanceof Sky) && that.lastBB.bottom >= entity.BB.bottom){
                        if(that.state === 8) that.state = 0;
                        if(that.state === 0) that.y = entity.BB.bottom - that.idle[that.animations[0][0].currentFrame()].h * PARAMS.BL;
                        else if(that.state === 1) that.y = entity.BB.bottom - that.walk[that.animations[1][0].currentFrame()].h * PARAMS.BL;
                        else if(that.state === 2) that.y = entity.BB.bottom - that.rPunch[that.animations[2][0].currentFrame()].h * PARAMS.BL;
                        else if(that.state === 3) that.y = entity.BB.bottom - that.lPunch[that.animations[3][0].currentFrame()].h * PARAMS.BL;  
                        else if(that.state === 4) that.y = entity.BB.bottom - that.sPunch[that.animations[4][0].currentFrame()].h * PARAMS.BL;
                        else if(that.state === 5) that.y = entity.BB.bottom - that.kick[that.animations[5][0].currentFrame()].h * PARAMS.BL;
                        else if(that.state === 6) that.y = entity.BB.bottom - that.sKick[that.animations[6][0].currentFrame()].h * PARAMS.BL;
                        else if(that.state === 7) that.y = entity.BB.bottom - that.gHit[that.animations[7][0].currentFrame()].h * PARAMS.BL;  
                        else if(that.state === 8) that.y = entity.BB.bottom - that.jump[that.animations[8][0].currentFrame()].h * PARAMS.BL; 
                        else if(that.state === 9) that.y = entity.BB.bottom - that.duck[that.animations[9][0].currentFrame()].h * PARAMS.BL;
                        if(that.state === 8) that.state = 0;           
                        that.velocity.y = 0;
                        that.updateBB();                        
                    }

                    //Falling Logic - Level2/3  - Platform/Propeller
                    if((entity instanceof Platform || entity instanceof Propeller) && that.lastBB.bottom >= entity.BB.top){
                        if(that.state === 8) that.state = 0;
                        if(that.state === 0) that.y = entity.BB.top - that.idle[that.animations[0][0].currentFrame()].h * PARAMS.BL;
                        else if(that.state === 1) that.y = entity.BB.top - that.walk[that.animations[1][0].currentFrame()].h * PARAMS.BL;
                        else if(that.state === 2) that.y = entity.BB.top - that.rPunch[that.animations[2][0].currentFrame()].h * PARAMS.BL;
                        else if(that.state === 3) that.y = entity.BB.top - that.lPunch[that.animations[3][0].currentFrame()].h * PARAMS.BL;  
                        else if(that.state === 4) that.y = entity.BB.top - that.sPunch[that.animations[4][0].currentFrame()].h * PARAMS.BL;
                        else if(that.state === 5) that.y = entity.BB.top - that.kick[that.animations[5][0].currentFrame()].h * PARAMS.BL;
                        else if(that.state === 6) that.y = entity.BB.top - that.sKick[that.animations[6][0].currentFrame()].h * PARAMS.BL;
                        else if(that.state === 7) that.y = entity.BB.top - that.gHit[that.animations[7][0].currentFrame()].h * PARAMS.BL;  
                        else if(that.state === 8) that.y = entity.BB.top - that.jump[that.animations[8][0].currentFrame()].h * PARAMS.BL; 
                        else if(that.state === 9) that.y = entity.BB.top - that.duck[that.animations[9][0].currentFrame()].h * PARAMS.BL;
                       // if(that.state === 8) that.state = 0;           
                        that.velocity.y = 0;
                        that.updateBB();                         
                    }




                     //Walking to Right Logic - Level1 - Level2
                     if((entity instanceof BackScene || entity instanceof BackGround || entity instanceof Sky) && that.lastBB.right >= entity.BB.right){
                      //  if(that.state === 8) that.state = 0;
                        if(that.state === 0) that.x = entity.BB.right - that.idle[that.animations[0][0].currentFrame()].w * PARAMS.BL;
                        else if(that.state === 1) that.x = entity.BB.right - that.walk[that.animations[1][0].currentFrame()].w * PARAMS.BL;
                        else if(that.state === 2) that.x = entity.BB.right - that.rPunch[that.animations[2][0].currentFrame()].w * PARAMS.BL;
                        else if(that.state === 3) that.x = entity.BB.right - that.lPunch[that.animations[3][0].currentFrame()].w * PARAMS.BL;  
                        else if(that.state === 4) that.x = entity.BB.right - that.sPunch[that.animations[4][0].currentFrame()].w * PARAMS.BL;
                        else if(that.state === 5) that.x = entity.BB.right - that.kick[that.animations[5][0].currentFrame()].w * PARAMS.BL;
                        else if(that.state === 6) that.x = entity.BB.right - that.sKick[that.animations[6][0].currentFrame()].w * PARAMS.BL;
                        else if(that.state === 7) that.x = entity.BB.right - that.gHit[that.animations[7][0].currentFrame()].w * PARAMS.BL;  
                        else if(that.state === 8) that.x = entity.BB.right - that.jump[that.animations[8][0].currentFrame()].w * PARAMS.BL; 
                        else if(that.state === 9) that.x = entity.BB.right - that.duck[that.animations[9][0].currentFrame()].w * PARAMS.BL;
                      //  if(that.state === 8) that.state = 0;           
                        that.velocity.x = 0;
                        that.updateBB(); 

                    }
                    //Walking to Left Logic - Level1 - Level2
                     if((entity instanceof BackScene || entity instanceof BackGround || entity instanceof Sky) && that.lastBB.left <= entity.BB.left){
                     that.x = entity.BB.left;
                        /*  // if(that.state === 8) that.state = 0;
                        if(that.state === 0) that.x = entity.BB.left;
                        else if(that.state === 1) that.x = entity.BB.left;
                        else if(that.state === 2) that.x = entity.BB.left;
                        else if(that.state === 3) that.x = entity.BB.left;  
                        else if(that.state === 4) that.x = entity.BB.left;
                        else if(that.state === 5) that.x = entity.BB.left;
                        else if(that.state === 6) that.x = entity.BB.left;
                        else if(that.state === 7) that.x = entity.BB.left;  
                        else if(that.state === 8) that.x = entity.BB.left; 
                        else if(that.state === 9) that.x = entity.BB.left;
                       // if(that.state === 8) that.state = 0;    */       
                        that.velocity.x = 0;
                        that.updateBB();  
                    }
                }
                    
                //Air Collisions
                     if(that.velocity.y < 0){
                        //Jumping logic - Level1
                        if((entity instanceof BackGround) && that.lastBB.bottom <= entity.BB.top){
                            if(that.state === 8) that.y = entity.BB.bottom - that.jump[that.animations[8][0].currentFrame()].h * PARAMS.BL;
                            that.velocity.y = 0;                              
                            that.updateBB();
                        }
                        
                        // jumping logic - level 2 - Platform
                        if((entity instanceof Platform) && that.lastBB.top >= entity.BB.bottom){
                            if(that.state === 8) that.y = entity.BB.bottom;
                            else if(that.state === 5) that.y = entity.BB.bottom;
                            that.velocity.y = 0;
                            that.updateBB();
                        }
                      /*  //Jumping & Kicking to Right - Level2 - Level1
                        if((entity instanceof BackScene || entity instanceof BackGround) && that.lastBB.right >= entity.BB.right){
                            if(that.state === 8) that.x = entity.BB.right - that.jump[that.animations[8][0].currentFrame()].w * PARAMS.BL;
                             that.velocity.y = 0;
                             that.updateBB();
                        } */
                        // jumping on propeller oil righ
                        if((entity instanceof Propeller) &&  that.lastBB.top >= entity.BB.bottom){
                            if(that.state === 8) that.y = entity.BB.bottom; //+ that.jump[that.animations[8][0].currentFrame()].h * PARAMS.BL;
                            else if(that.state === 5) that.y = entity.BB.bottom;// + that.kick[that.animations[5][0].currentFrame()].h * PARAMS.BL;
                            that.hitPoints -= 2;
                            that.velocity.y = 0;
                            that.updateBB(); 
                        }

                        //Jumping & Kicking to Right - any level
                        if((entity instanceof BackScene || entity instanceof BackGround || entity instanceof Sky) && that.lastBB.right >= entity.BB.right){
                           // if(that.state === 8) that.state = 0;
                            if(that.state === 0) that.x = entity.BB.right - that.idle[that.animations[0][0].currentFrame()].w * PARAMS.BL;
                            else if(that.state === 1) that.x = entity.BB.right - that.walk[that.animations[1][0].currentFrame()].w * PARAMS.BL;
                            else if(that.state === 2) that.x = entity.BB.right - that.rPunch[that.animations[2][0].currentFrame()].w * PARAMS.BL;
                            else if(that.state === 3) that.x = entity.BB.right - that.lPunch[that.animations[3][0].currentFrame()].w * PARAMS.BL;  
                            else if(that.state === 4) that.x = entity.BB.right - that.sPunch[that.animations[4][0].currentFrame()].w * PARAMS.BL;
                            else if(that.state === 5) that.x = entity.BB.right - that.kick[that.animations[5][0].currentFrame()].w * PARAMS.BL;
                            else if(that.state === 6) that.x = entity.BB.right - that.sKick[that.animations[6][0].currentFrame()].w * PARAMS.BL;
                            else if(that.state === 7) that.x = entity.BB.right - that.gHit[that.animations[7][0].currentFrame()].w * PARAMS.BL;  
                            else if(that.state === 8) that.x = entity.BB.right - that.jump[that.animations[8][0].currentFrame()].w * PARAMS.BL; 
                            else if(that.state === 9) that.x = entity.BB.right - that.duck[that.animations[9][0].currentFrame()].w * PARAMS.BL;
                            that.velocity.y = 0;
                            that.updateBB();
                    }
                        //Jumping & Kicking to Left - any level
                        if((entity instanceof BackScene || entity instanceof BackGround || entity instanceof Sky) && that.lastBB.left <= entity.BB.left){
                            if(that.state === 8) that.x = entity.BB.left;
                            that.velocity.y = 0;
                            that.updateBB();
                    }

                     
                    /* if(that.velocity.y < 0){
                        //Jumping logic - Level1 - Platform
                        if((entity instanceof BackGround) && that.lastBB.top >= entity.BB.bottom){
                            if(that.state === 8) that.y = entity.BB.bottom - that.jump[that.animations[8][0].currentFrame()].h * PARAMS.BL;
                            that.velocity.y = 0;
                            that.updateBB();
                        }
                        //Jumping & Kicking to Right - Level2 - Level1
                        if((entity instanceof BackScene || entity instanceof BackGround) && that.lastBB.right >= entity.BB.right){
                            if(that.state === 8) that.x = entity.BB.right - that.jump[that.animations[8][0].currentFrame()].h * PARAMS.BL;
                             that.velocity.y = 0;
                             that.updateBB();
                        }
                    } */

                    
                }
            }
        })
    };
  
  
  
    draw(ctx) {

    /*
    if(PARAMS.DEBUG){
        ctx.strokeStyle = "Red";
        ctx.strokeRect(this.x, this.y, this.width*3, this.height*3);
    };
    */

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
            ctx.fillText(this.name, 759 - (cpuNameCount * 14), 60);
            ctx.strokeText(this.name, 759 - (cpuNameCount * 14), 60);
        }
  
        if(PARAMS.DEBUG && this.facing === 0){
            ctx.strokeStyle = "Red";
            ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
        } else if (PARAMS.DEBUG && this.facing === 1) {
            ctx.save();
            ctx.scale(-1, 1);
            ctx.strokeStyle = "Red";
            ctx.strokeRect(-this.BB.x - this.animations[this.state][this.facing].array[this.animations[this.state][this.facing].currentFrame()].w, this.BB.y, (this.BB.width), this.BB.height);
            ctx.restore();
        } else {

        };

        if (this.dead) {
            this.deadScene.drawFrame(this.game.clockTick,ctx, this.x, this.y, PARAMS.BL);
        } else if (this.facing === 0) {
            this.animations[this.state][this.facing].drawFrame(this.game.clockTick,ctx, this.x, this.y, PARAMS.BL);
            this.healthbar.draw(ctx);
        } else {
            ctx.save();
            ctx.scale(-1, 1);
            this.animations[this.state][this.facing].drawFrame(this.game.clockTick,ctx, -(this.x) - this.animations[this.state][this.facing].array[this.animations[this.state][this.facing].currentFrame()].w, this.y, PARAMS.BL);
            this.healthbar.draw(ctx);
            ctx.restore();
            this.healthbar.draw(ctx);
           

        };  
    };
  };
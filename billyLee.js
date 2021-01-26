class BillyLee {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
  
        this.game.BillyLee = this;
  
  
        // spritesheet
        this.billy = ASSET_MANAGER.getAsset("./sprites/BillyLee.png")
  
        // DDPlayer state variables
        this.state = 0; // 0 = idle, 1 = walking, 2 = right punch, 3 = left punch, 4 = super punch, 5 = kick, 6 = super kick, 7 = get hit, 8 = jump, 9 = duck 
        this.facing = 0; // 0 = right, 1 = left
        this.dead = false;
    
  
  
        // player animations
        this.animations = [];
        this.loadAnimations();
    };
  
    loadAnimations() {
        for (var i = 0; i < 10; i++) { // ten states
            this.animations.push([]);
            for (var j = 0; j < 2; j++) { // two directions
                this.animations[i].push([]);
            }
         }
  
         // idle animation for state 0
         // facing right
         this.animations[0][0] = new Animator(this.spritesheet, 0, 0, 30, 62, 1, .5, 0, false, true);
  
         // facing left
         this.animations[0][1] = new Animator(this.spritesheet, 0, 0, 30, 62, 1, .5, 0, false, true); // need to update for left facing
  
         // walking animation for state 1
        // facing right
        this.animations[1][0] = new Animator(this.spritesheet, 50, 0, 30, 62, 4, .5, 0, false, true);
  
        // facing left
        this.animations[1][1] = new Animator(this.spritesheet, 50, 0, 30, 62, 4, .5, 0, false, true); // need to update for left facing
  
        // right punch animation for state 2
        // facing right
        this.animations[2][0] = new Animator(this.spritesheet, 330, 0, 50, 62, 3, .5, 0, false, true);
  
        // facing left
        this.animations[2][1] = new Animator(this.spritesheet, 330, 0, 50, 62, 3, .5, 0, false, true); // need to update for left facing
  
        // left punch animation for state 3
        // facing right
        this.animations[3][0] = new Animator(this.spritesheet, 180, 0, 50, 62, 3, .5, 0, false, true);
  
        // facing left
        this.animations[3][1] = new Animator(this.spritesheet, 180, 0, 50, 62, 3, .5, 0, false, true); // need to update for left facing
  
        // super punch animation for state 4
        // facing right
        this.animations[4][0] = new Animator(this.spritesheet, 0, 64, 48, 72, 4, .5, 2, false, true);
  
        // facing left
        this.animations[4][1] = new Animator(this.spritesheet, 0, 64, 48, 72, 4, .5, 2, false, true); // need to update for left facing
  
        // kick animation for state 5
        // facing right
        this.animations[5][0] = new Animator(this.spritesheet, 198, 74, 50, 62, 3, .5, 0, false, true);
  
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
  
  
  
  die() {
      this.dead = true;
  }
  
  
  
  update(){
  
    let action = false;
    
    // jump state 9
    if(this.game.W) {
        this.state = 9;
        this.game.y -= 10;
        action = true;
    } 
    if (this.game.S) {
        this.state = 9;
        action = true;
    }
  
    // walk state 1
    if(this.game.D) {
        this.facing = 0;
        this.state = 1;
        this.x += 5;
        action = true;
    } else if(this.game.A) {
        this.facing = 1;
        this.state = 1;
        this.x -= 5;
        action = true;
    }
  
    // Kick state 5
    if(this.game.P && (this.facing === 0)) {
        this.facing = 0;
        this.state = 5;
        this.y -= 3;
        this.y += 3;
        action = true;
    } else if (this.game.P && (this.facing === 1)) {
        this.facing = 1;
        this.state = 5;
        this.y -= 3;
        this.y += 3;
        action = true;
    }
  
    // Punch state 4
    if(this.game.C && this.facing === 0) {
        this.facing = 0;
        this.state = 4;
        action = true;
    } else if(this.game.C && this.facing === 1) {
        this.facing = 1;
        this.state = 4;
        action = true;
    }
  
    // Idle with no action
    if(!action? this.state = 0: action = false);
  };
  
  
  
    draw(ctx) {
    if(PARAMS.DEBUG){
        ctx.strokeStyle = "Red";
        ctx.strokeRect(this.x, this.y, this.width*3, this.height*3);
    };
  
    if (this.dead) {
        this.deadAnim.drawFrame(this.spritesheet, 250, 153, 49, 64, 5, .2, 1, false, true);
    } else {
        this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x, this.y, 3);
    }
  
    };
  };
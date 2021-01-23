class DDPlayer {
    constructor(game) {
      Object.assign(this, { game });

  

      // spritesheet
      
      this.billy = ASSET_MANAGER.getAsset("./sprites/BillyLee.png")
      
    


      // mario's animations
    //  this.animations = [];
     // this.loadAnimations();
     this.animations = [];

    
     // king hippo
     //  this.animation = new Animator(this.spritesheet, 7, 758, 58, 98, 7, .20 , 3, false, true); 

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
      this.animation = new Animator(this.spritesheet, 0, 142, 50, 64, 3, .2, 0, false, true);
     
     

     
  };

  loadAnimations() {
      for (var i = 0; i < 6; i++) { // six states
          this.animations.push([]);
          for (var j = 0; j < 3; j++) { // three sizes (star-power not implemented yet)
              this.animations[i].push([]);
              for (var k = 0; k < 2; k++) { // two directions
                  this.animations[i][j].push([]);
              }
          }
      }
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
         this.animation = new Animator(this.spritesheet, 0, 299, 49, 64, 5, .2, 1, false, true);
     
      



  };



  update() {

      
  };

 

  draw(ctx) {

  

   
      

      // animate to canvas drawFrame(this.game.clockTick, ctx, x cord, y cord, scaling)
        this.animations[0].drawFrame(this.game.clockTick, ctx, 25, 175, 3);
        this.animations[1].drawFrame(this.game.clockTick, ctx, 225, 175, 3);
        this.animations[2].drawFrame(this.game.clockTick, ctx, 425, 175, 3);
        this.animations[3].drawFrame(this.game.clockTick, ctx, 625, 150, 3);
        this.animations[4].drawFrame(this.game.clockTick, ctx, 825, 150, 3);
        this.animations[4].drawFrame(this.game.clockTick, ctx, 1025, 150, 3);


   /*   if (this.dead) {
          this.deadAnim.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, PARAMS.SCALE);
      } else {
          this.animations[this.state][this.size][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, PARAMS.SCALE);
      }
      if (PARAMS.DEBUG) {
          ctx.strokeStyle = 'Red';
          ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
      } */
  };
};
class DDPlayer {
    constructor(game) {
      Object.assign(this, { game });

  

      // spritesheet
      
      this.billy = ASSET_MANAGER.getAsset("./sprites/DDPlayer.png")
      
    


      // mario's animations
    //  this.animations = [];
     // this.loadAnimations();
     this.animations = [];
     this.animations.push(new Animator(this.billy, 120, 436, 26, 62, 1, 10, 0, false, true));
     this.animations.push(new Animator(this.billy, 152, 434, 28, 64, 1, 10, 0, false, true));
     this.animations.push(new Animator(this.billy, 188, 459, 38, 40, 1, 10, 0, false, true));
     this.animations.push(new Animator(this.billy, 233, 454, 45, 45, 1, 10, 0, false, true));
     this.animations.push(new Animator(this.billy, 285, 459, 38, 40, 1, 10, 0, false, true));
     
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
      // punching
      this.animations[0][0] = new Animator(this.billy, 165, 278, 26, 60, 1, 10, 0, false, true);
      this.animations[0][1] = new Animator(this.billy, 200, 278, 46, 60, 1, 10, 0, false, true);
      this.animations[0][2] = new Animator(this.billy, 254, 278, 28, 60, 1, 10, 0, false, true);

      // climbing
      this.animations[1][0] = new Animator(this.billy, 14, 173, 26, 60, 1, 10, 0, false, true);
      this.animations[1][1] = new Animator(this.billy, 44, 173, 26, 60, 1, 10, 0, false, true);
      this.animations[1][2] = new Animator(this.billy, 77, 173, 26, 60, 1, 10, 0, false, true);
      this.animations[1][3] = new Animator(this.billy, 109, 173, 26, 60, 1, 10, 0, false, true);
      this.animations[1][4] = new Animator(this.billy, 138, 173, 26, 60, 1, 10, 0, false, true);

      // super punch
      this.animations[2][0] = new Animator(this.billy, 405, 278, 30, 60, 1, 10, 0, false, true);
      this.animations[2][1] = new Animator(this.billy, 440, 278, 26, 60, 1, 10, 0, false, true);
      this.animations[2][2] = new Animator(this.billy, 473, 278, 36, 60, 1, 10, 0, false, true);
      this.animations[2][3] = new Animator(this.billy, 516, 268, 32, 72, 1, 10, 0, false, true);

      // super kick
      this.animations[3][0] = new Animator(this.billy, 120, 436, 26, 62, 1, 10, 0, false, true);
      this.animations[3][1] = new Animator(this.billy, 152, 434, 28, 64, 1, 10, 0, false, true);
      this.animations[3][2] = new Animator(this.billy, 188, 459, 38, 40, 1, 10, 0, false, true);
      this.animations[3][3] = new Animator(this.billy, 233, 454, 45, 45, 1, 10, 0, false, true);
      this.animations[3][4] = new Animator(this.billy, 285, 459, 38, 40, 1, 10, 0, false, true);

      // walking
      this.animations[4][0] = new Animator(this.billy, 405, 278, 30, 60, 1, 10, 0, false, true);
      this.animations[4][1] = new Animator(this.billy, 440, 278, 26, 60, 1, 10, 0, false, true);
      this.animations[4][2] = new Animator(this.billy, 473, 278, 36, 60, 1, 10, 0, false, true);
      this.animations[4][3] = new Animator(this.billy, 516, 268, 32, 72, 1, 10, 0, false, true);


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
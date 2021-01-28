class ChunLi {
    constructor(game) {
        Object.assign(this, { game });

        this.game.ChunLi = this;


        // spritesheet
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/ChunLi.png");

        // ChunLi state variables
        this.state = 0; // 0 = idle, 1 = walking, 2 = jump, 3 = punch, 4 = kick, 5 = high kick, 6 = super kick, 7 = bird kick, 8 = get hit, 9 = duck 
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
        

        //ChunLi
        // Idle
        // facing right
        this.animations[0][0] = new Animator(this.spritesheet, 0, 0, 49, 80, 4, .5, 1, false, true); 
        
        // facing left

        // walk
        // facing right
        this.animations[1][0] = new Animator(this.spritesheet, 210, 0, 49, 80, 8, 1, 1, false, true);

        // jump
        // facing right
        this.animations[2][0] = new Animator(this.spritesheet, 620, 0, 49, 100, 4, .5, 1, false, true);

        // punch
        // facing right
        this.animations[3][0] = new Animator(this.spritesheet, 830, 0, 80, 80, 3, .5, 0, false, true);

        // kick
        // facing right
        this.animations[4][0] = new Animator(this.spritesheet, 1100, 0, 99, 87, 4, .5, 1, false, true);

        // high kick
        // facing right
        this.animations[5][0] = new Animator(this.spritesheet, 0, 130, 80, 100, 6, .5, 0, false, true);

        // super kick
        // facing right
        this.animations[6][0] = new Animator(this.spritesheet, 500, 130, 89, 100, 7, .1, 1, false, true);

        // bird kick
        // facing right
        this.animations[7][0] = new Animator(this.spritesheet, 0, 250, 89, 120, 16, .1, 1, false, true);

        // dead
        // facing right
        this.deadAnim = new Animator(this.spritesheet, 0, 400, 84, 75, 3, .5, 1, false, true);

        // get hit
        // facing right
        this.animations[8][0] = new Animator(this.spritesheet, 300, 392, 80, 90, 3, .5, 0, false, true);

        // duck
        // facing right
        this.animations[9][0] = new Animator(this.spritesheet, 600, 398, 49, 80, 2, .5, 1, false, true);

    };

    update(){

    };

    

    draw(ctx) {

        /*
        ctx.strokeStyle = "White";
        ctx.strokeRect(300, 300, 43 * 3, 80 * 3);
        ctx.save();
        ctx.scale(-1, 1);
        ctx.drawImage(this.spritesheet, 0, 0, 49, 80, -429, 300, 49 * 3, 80 * 3);
        
        */
        ctx.scale(-1, 1);
        this.animations[6][0].drawFrame(this.game.clockTick, ctx, -535, 429, 1);
        
 
    };
};
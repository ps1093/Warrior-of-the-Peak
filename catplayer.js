class catplayer{
    constructor(game, x, y){
        Object.assign(this,{game, x, y});

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/fighterLR.png");
        
        //spritesheet, xstart, ystart, width(character), height(character), frameCount, frameDuration, framePadding, reverse, loop;

        
        
        this.state = 0; //idle =0, walking=1, running=2, jumping=3
        this.size = 0; // small = 0 and large = 1 after finish 
        this.facing = 0; //right = 0, left = 1

        this.animations = []; //putting them all 3 dimensional list in one;
        this.loadAnimations();
        
    };
   

    loadAnimations(){
        for(var i = 0; i < 7; i++){ //6states - idle, walking, running, jumping, punching, kicking, block 
            this.animations.push([]);
            for(var j = 0; j < 1; j++){   //one size
                this.animations[i].push([]);
                for (var k = 0; k < 2; k++){   //facing right left
                    this.animations[i][j].push([]);
                }
            }
        }

        //spritesheet, xstart, ystart, width(character), height(character), frameCount, frameDuration, framePadding, reverse, loop;
        
        this.animations[0][0][0] = new Animator (this.spritesheet, 60, 60, 40, 40, 2, 0.33, 10, false, true ); //idel facing right
        this.animations[1][0][0] = new Animator (this.spritesheet, 161, 8, 40, 40, 2, 0.33, 10, false, true ); //walking right
        this.animations[2][0][0] = new Animator (this.spritesheet, 161, 8, 40, 40, 2, 0.10, 10, false, true ); //running right 
        this.animations[3][0][0] = new Animator (this.spritesheet, 261, 260, 40, 40, 3, 0.20, 12, false, true ); //jumping right 
        this.animations[4][0][0] = new Animator (this.spritesheet, 359, 160, 40, 40, 2, 0.15, 14, false, true ); //punching right
        this.animations[5][0][0] = new Animator (this.spritesheet, 10, 208, 40, 40, 10, 0.15, 9, false, true ); //kicking right
        this.animations[6][0][0] = new Animator (this.spritesheet, 208, 60, 40, 40, 2, 0.20, 10, false, true ); //block right

        this.animations[0][0][1] = new Animator (this.spritesheet, 850, 57, 40, 40, 2, 0.33, 10, false, true ); //idel facing left
        this.animations[1][0][1] = new Animator (this.spritesheet, 748, 8, 40, 40, 2, 0.33, 10, true, true ); //walking left
        this.animations[2][0][1] = new Animator (this.spritesheet, 748, 8, 40, 40, 2, 0.10, 10, true, true ); //running left 
        this.animations[3][0][1] = new Animator (this.spritesheet, 596, 261, 40, 40, 3, 0.20, 12, true, true ); //jumping left 
        this.animations[4][0][1] = new Animator (this.spritesheet, 543, 157, 40, 40, 2, 0.15, 14, true, true ); //punching left 
        this.animations[5][0][1] = new Animator (this.spritesheet, 496, 208, 40, 40, 10, 0.15, 9, true, true ); // kicking left 
        this.animations[6][0][1] = new Animator (this.spritesheet, 693, 59, 40, 40, 2, 0.20, 10, true, true ); //block left


    };

    update(){
        //right
        if(this.game.D){
            this.facing = 0;
            this.state = 1;
            this.x += 5;

        }
        //left
        if(this.game.A){
            this.facing = 1;
            this.state = 1;
            this.x -=5;
        }
        //up
        if(this.game.W){
            if(this.state == 0){
               this.state = 3
            //    this.y -=10;
            
            }else{
                this.state = 0; 
            }
        //    this.game.W = false;
            // this.y +=10;
        }
        //punch
        if(this.game.E){
            if(this.state == 0){
               this.state = 4
            
            }else{
                this.state = 4;
            }
           //this.game.E = false;
        }
        //kick
        if(this.game.R){
            if(this.state == 0){
               this.state = 5
            
            }else{
                this.state = 5;
            }
           //this.game.R = false;
        }
        //block
        if(this.game.S){
            this.state = 6;
        }

        if(!this.game.D && !this.game.A && !this.game.W && !this.game.S && !this.game.E && !this.game.R){
            this.state = 0;
        }

    };

        draw(ctx){
            this.animations[this.state][this.size][this.facing].drawFrame(this.game.clockTick, ctx ,this.x,this.y, 3);
            

     };

};
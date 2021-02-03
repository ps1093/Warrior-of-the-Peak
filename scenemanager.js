/**
 * Authors: Austin Scott
 *          Paras Sharma
 *          Suk Won
 *          Tyler Phippen
 * Austin: Made Scene Manager and Level Two
 * Paras: Put Level one together and added his player.
 * Suk: Loaded his player into level 1.
 * Tyelr: Loaded his player into level 1.
 */
class SceneManager{
	constructor(game){
		this.game = game;
        this.game.camera = this;
<<<<<<< HEAD
        
        //this.loadLevel2();
        this.loadLevel();
        
=======
        //Loading Levels
        this.loadLevel2();
        //this.loadLevel();
>>>>>>> 3e312bcb7b937ab292f5dc40f0d56c7662b9b49a
	};
    clearEntities(){
        this.game.entities = [];
    };
    loadLevel(){
        this.bkground = new BackGround(this.game, 0, 0);
        this.game.addEntity(this.bkground);
        this.catplayer = new catplayer(this.game, 400, 435 );
        this.game.addEntity(this.catplayer);
        this.karateplayer = new KaratePlayer(this.game, 0,550);
        this.game.addEntity(this.karateplayer);
        this.chunLi = new ChunLi(this.game, 450, 375);
        this.game.addEntity(this.chunLi);
        this.billyLee = new BillyLee(this.game, 350, 435);
        this.game.addEntity(this.billyLee);
    };
    loadLevel2(){
        //Loading Background image
        this.backscene = new BackScene(this.game,0,0, 1024, 672);
        this.game.addEntity(this.backscene);
        //Loading Platform to jump on
        this.platform = new Platform(this.game, 360,390, 744);
        this.game.addEntity(this.platform);
<<<<<<< HEAD


         let ground = new Ground(this.game, 0, 736, 1024);
         this.game.addEntity(ground);

         this.karateplayer = new KaratePlayer(this.game, 0, 0);
         this.game.addEntity(this.karateplayer);

      
=======
        //Loading the ground to fight on.
        this.ground = new Ground(this.game, 0, 736, 1024);
        this.game.addEntity(this.ground);
        //Loading Player
        this.karateplayer = new KaratePlayer(this.game, 0, 0);
        this.game.addEntity(this.karateplayer);
>>>>>>> 3e312bcb7b937ab292f5dc40f0d56c7662b9b49a
    };
    update(){
        PARAMS.DEBUG = document.getElementById("debug").checked;
    };
    draw(ctx){
        if(PARAMS.DEBUG){
            // let xV = "xV=" + Math.floor(this.karateplayer.velocity.x);
            // let yV = "yV=" + Math.floor(this.karateplayer.velocity.y);
            // ctx.font="40px Arial";
            // ctx.fillStyle="Red";
            // ctx.fillText(xV, 100, 100);
            // ctx.fillText(yV, 100,200);
        }
    };
};
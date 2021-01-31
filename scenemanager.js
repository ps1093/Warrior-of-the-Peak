class SceneManager{
	constructor(game){
		this.game = game;
        this.game.camera = this;
        
        this.loadLevel2();
        //this.loadLevel();
        
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
        this.backscene = new BackScene(this.game,0,0, 1024, 672);
        this.game.addEntity(this.backscene);

        this.platform = new Platform(this.game, 360,390, 744);
        this.game.addEntity(this.platform);


         let ground = new Ground(this.game, 0, 736, 1024);
         this.game.addEntity(ground);

         this.karateplayer = new KaratePlayer(this.game, 0, 0);
         this.game.addEntity(this.karateplayer);
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
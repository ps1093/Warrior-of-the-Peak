class SceneManager{
	constructor(game){
		this.game = game;
        this.game.camera = this;
        
        this.loadLevel();
        //this.loadlevel2();
	};

    clearEntities(){
        this.game.entities = [];
    };

    loadLevel(){

        this.bkground = new BackGround(this.game, 0, 0);
        this.game.addEntity(this.bkground);
        this.catplayer = new catplayer(this.game, 400, 435 );
        this.game.addEntity(this.catplayer);
        this.karateplayer = new KaratePlayer(this.game, 0, 375);
        this.game.addEntity(this.karateplayer);
        this.chunLi = new ChunLi(this.game, 450, 375);
        this.game.addEntity(this.chunLi);
        this.billyLee = new BillyLee(this.game, 350, 435);
        this.game.addEntity(this.billyLee);
      
    };

    loadlevel2(){

        this.backscene = new BackScene(this.game,0,0, 1023, 628);
        this.game.addEntity(this.backscene);

         let ground = new Ground(this.game, 0, 721, 1024);
         this.game.addEntity(ground);

         this.karateplayer = new KaratePlayer(this.game, 0, 100);
         this.game.addEntity(this.karateplayer);
    };

    update(){
        PARAMS.DEBUG = document.getElementById("debug").checked;
    };

    draw(ctx){
        if(PARAMS.DEBUG){

        };

    };


};
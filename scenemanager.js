class SceneManager{
	constructor(game){
		this.game = game;
        this.game.camera = this;
        
		this.loadLevel();
	};

    clearEntities(){
        this.game.entities = [];
    };

    loadLevel(){
        this.karateplayer = new KaratePlayer(this.game, 400, 350);

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
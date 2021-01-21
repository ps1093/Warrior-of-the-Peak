class SceneManager{
	constructor(game){
		this.game = game;
        this.game.camera = this;
        //this.karateplayer = new KaratePlayer(this.game, 450,300);
		this.loadLevel();
	};

    clearEntities(){
        this.game.entities = [];
    };

    loadLevel(){
        this.mountain = new MountainScene(this.game, 0, 0);
        this.game.addEntity(this.mountain);

    };

    update(){
        PARAMS.DEBUG = document.getElementById("debug").checked;
    };

    draw(ctx){
        if(PARAMS.DEBUG){

        };

    };


};
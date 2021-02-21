/**
 * Authors: Austin Scott
 *          Paras Sharma
 *          Suk Won
 *          Tyler Phippen
 * Austin: Made Scene Manager and Level Two, HUD, OBJECTS for
 * map, player, and CPU loads. 
 * Paras: Put Level one together and added his player.
 * Suk: Loaded his player into level 1.
 * Tyelr: Loaded his player into level 1.
 **/
class SceneManager{
	constructor(game){
		this.game = game;
        this.game.camera = this;
        this.title = true;
        this.titleName = "Warrior of the Peak";
        this.edition = "Frantic Coder Edition";

        this.PlayersChoice = {
            PLAYER: null,
            OPPONENT: null
        }
        this.Level = {
            MAP: null
        }
        this.Players = {
            CHARACTERS: ["Daniel Larusso", "Johnny Lawrence",
                         "Yodha", "Chun Li", "Billy Lee"]
        }
        this.LevelChoice = {
            LEVEL: ["Falls", "Welcome to The Jungle", "Olympus Oil Rig"]
        }
	};
    clearEntities(){
        this.game.entities.forEach(function (entity){
            entity.removeFromWorld = true;
        });
    };
    loadgame(transition, title){
        this.clearEntities();

        switch(this.PlayersChoice.PLAYER){
            //Daniel Larusso
            case this.Players.CHARACTERS[0]:
                this.player = new KaratePlayer(this.game, 50, 0, false, this.Players.CHARACTERS[0]);
                break;
            //Johnny Lawrence
            case this.Players.CHARACTERS[1]:
                this.player = new KaratePlayer(this.game, 50, 0, true, this.Players.CHARACTERS[1]);
                break;
            //Yodha
            case this.Players.CHARACTERS[2]:
                this.player = new catplayer(this.game, 0, 0);
                break;
            //Chun Li
            case this.Players.CHARACTERS[3]:
                this.player = new ChunLi(this.game, 0, 0, this.Players.CHARACTERS[3]);
                break;
            //Billy Lee
            case this.Players.CHARACTERS[4]:
                this.player = new BillyLee(this.game, 0, 0, this.Players.CHARACTERS[4]);
                break;
        }
        switch(this.PlayersChoice.OPPONENT){
            //Daniel Larusso (white Gi)
            case this.Players.CHARACTERS[0]:
                this.opponent = new KaratePlayerCPU(this.game, 960, 0, this.player, false, this.Players.CHARACTERS[0]);
                break;
            //Daniel Larusso (Blue Gi)
            case this.Players.CHARACTERS[1]:
                this.opponent = new KaratePlayerCPU(this.game, 960, 0, this.player, true, this.Players.CHARACTERS[1]);
                break;
            //Yodha
            case this.Players.CHARACTERS[2]:
                this.opponent = new catplayer(this.game, 0, 0);
                break;
            //Chun Li
            case this.Players.CHARACTERS[3]:
                break;
            //Billy Lee
            case this.Players.CHARACTERS[4]:
                break;
        }
        this.title = title;
        if(transition){
            this.game.addEntity(new TransitionScreen(this.game, this.Level.MAP));
        } else {
            switch(this.Level.MAP){
                //Water falls
                case this.LevelChoice.LEVEL[0]:
                    this.loadLevel1();
                    break;
                    //Jungle
                case this.LevelChoice.LEVEL[1]:
                    this.loadLevel2();
                    break;
                //Oil Rig
                case this.LevelChoice.LEVEL[2]:
                    //this.title = false;
                    this.loadlevel3();
                    break;
            }
        }
    };
    loadLevel1(){
        this.bkground = new BackGround(this.game, 0, 0);
        this.game.addEntity(this.bkground);

        //Player HealthBar
        this.healthbar = new HealthBar(this.player);
        this.game.addEntity(this.healthbar);
        
        //Opponent HealthBar
        this.healthbar = new HealthBar(this.opponent);
        this.game.addEntity(this.healthbar);
        
        this.game.addEntity(this.player);

        this.game.addEntity(this.opponent);
    };
    loadLevel2(){
        //Loading Background image
        this.backscene = new BackScene(this.game,0,0, 1024, 672);
        this.game.addEntity(this.backscene);
        //Loading Platform to jump on
        this.platform = new Platform(this.game, 360,390, 744);
        this.game.addEntity(this.platform);

        let ground = new Ground(this.game, 0, 736, 1024);
        this.game.addEntity(ground);

        //Player HealthBar
        this.healthbar = new HealthBar(this.player);
        this.game.addEntity(this.healthbar);
        
        //Opponent HealthBar
        this.healthbar = new HealthBar(this.opponent);
        this.game.addEntity(this.healthbar);

        this.game.addEntity(this.player);

        this.game.addEntity(this.opponent);
    };
    loadlevel3(){
        this.sky = new Sky(this.game, 0,0);
        this.game.addEntity(this.sky);

        this.propeller = new Propeller(this.game, 75, 50);
        this.game.addEntity(this.propeller);

        this.crane = new Crane(this.game, 620, 159);
        this.game.addEntity(this.crane);

        //Player HealthBar
        this.healthbar = new HealthBar(this.player);
        this.game.addEntity(this.healthbar);
        
        //Opponent HealthBar
        this.healthbar = new HealthBar(this.opponent);
        this.game.addEntity(this.healthbar);

        this.game.addEntity(this.player);

        this.game.addEntity(this.opponent);

        this.oilrig = new OilRig(this.game, 0, 446);
        this.game.addEntity(this.oilrig);

        this.ocean = new Ocean(this.game, 0, 719);
        this.game.addEntity(this.ocean);
    };
    update(){
        PARAMS.DEBUG = document.getElementById("debug").checked;
        if(this.game.click){
            if(((this.game.click.y >= 400-12) && (this.game.click.y <= 400 +3) && (this.game.click.x > 0) && (this.game.click.x < this.Players.CHARACTERS[0].length * 12))){
                this.PlayersChoice.PLAYER = this.Players.CHARACTERS[0];  
            } else if(((this.game.click.y >= 450-12) && (this.game.click.y <= 450 +3) && (this.game.click.x > 0) && (this.game.click.x < this.Players.CHARACTERS[1].length * 12))){
                this.PlayersChoice.PLAYER = this.Players.CHARACTERS[1]; 
            } else if(((this.game.click.y >= 500-12) && (this.game.click.y <= 500 +3) && (this.game.click.x > 0) && (this.game.click.x < this.Players.CHARACTERS[2].length * 12))){
                this.PlayersChoice.PLAYER = this.Players.CHARACTERS[2]; 
            } else if(((this.game.click.y >= 550-12) && (this.game.click.y <= 550 +3) && (this.game.click.x > 0) && (this.game.click.x < this.Players.CHARACTERS[3].length * 12))){
                this.PlayersChoice.PLAYER = this.Players.CHARACTERS[3]; 
            } else if(((this.game.click.y >= 600-12) && (this.game.click.y <= 600 +3) && (this.game.click.x > 0) && (this.game.click.x < this.Players.CHARACTERS[4].length * 12))){
                this.PlayersChoice.PLAYER = this.Players.CHARACTERS[4]; 
            }

            if(((this.game.click.y >= 400-12) && (this.game.click.y <= 400 +3) && (this.game.click.x > 400) && (this.game.click.x < 400 + this.Players.CHARACTERS[0].length * 12))){
                this.PlayersChoice.OPPONENT = this.Players.CHARACTERS[0];  
            } else if(((this.game.click.y >= 450-12) && (this.game.click.y <= 450 +3) && (this.game.click.x > 400) && (this.game.click.x < 400 + this.Players.CHARACTERS[1].length * 12))){
                this.PlayersChoice.OPPONENT = this.Players.CHARACTERS[1]; 
            } else if(((this.game.click.y >= 500-12) && (this.game.click.y <= 500 +3) && (this.game.click.x > 400) && (this.game.click.x < 400 + this.Players.CHARACTERS[2].length * 12))){
                this.PlayersChoice.OPPONENT = this.Players.CHARACTERS[2]; 
            } else if(((this.game.click.y >= 550-12) && (this.game.click.y <= 550 +3) && (this.game.click.x > 400) && (this.game.click.x < 400 + this.Players.CHARACTERS[3].length * 12))){
                this.PlayersChoice.OPPONENT = this.Players.CHARACTERS[3]; 
            } else if(((this.game.click.y >= 600-12) && (this.game.click.y <= 600 +3) && (this.game.click.x > 400) && (this.game.click.x < 400 + this.Players.CHARACTERS[4].length * 12))){
                this.PlayersChoice.OPPONENT = this.Players.CHARACTERS[4]; 
            }

            if(((this.game.click.y >= 400-12) && (this.game.click.y <= 400 +3) && (this.game.click.x > 750) && (this.game.click.x < 750 + this.LevelChoice.LEVEL[0].length * 12))){
                this.Level.MAP = this.LevelChoice.LEVEL[0];  
            } else if(((this.game.click.y >= 450-12) && (this.game.click.y <= 450 +3) && (this.game.click.x > 750) && (this.game.click.x < 750 + this.LevelChoice.LEVEL[1].length * 12))){
                this.Level.MAP = this.LevelChoice.LEVEL[1]; 
            } else if(((this.game.click.y >= 500-12) && (this.game.click.y <= 500 +3) && (this.game.click.x > 750) && (this.game.click.x < 750 + this.LevelChoice.LEVEL[2].length * 12))){
                this.Level.MAP = this.LevelChoice.LEVEL[2]; 
            }
    
            if(((this.game.click.y >= 700-30) && (this.game.click.y <= 700 +3) && (this.game.click.x > 300) && (this.game.click.x < 750))){
                if((this.PlayersChoice.PLAYER === null) || (this.PlayersChoice.OPPONENT === null) || (this.Level.MAP === null) || (this.Level.MAP === null)){

                } else {
                    this.loadgame(true, false);
                }
                

            }
        }
    };
    draw(ctx){
        if(PARAMS.DEBUG){
        }
        if(!this.title){
            //Prints the HUD
            var playerNameCount = this.player.name.length; 
            var cpuNameCount = this.opponent.name.length;
            var totalCount = playerNameCount + cpuNameCount;
            var middle = 524;
            var vStart = 250 + ((middle - totalCount) / 2);
            ctx.strokeStyle = "DarkOrange";
            ctx.font = '14px "Press Start 2P"';
            ctx.fillStyle = rgb(183,3,3);
            ctx.fillText(this.player.name, 255 , 60);
            ctx.strokeText(this.player.name, 255 , 60);

            ctx.strokeStyle = "Black";
            ctx.font = '20px "Press Start 2P"';
            ctx.fillStyle = "Red";
            ctx.fillText("VS.", vStart - ("VS.".length * 15)/2, 60);
            ctx.strokeText("VS.", vStart - ("VS.".length * 15)/2, 60);
            
            ctx.strokeStyle = "DarkOrange";
            ctx.font = '14px "Press Start 2P"';
            ctx.fillStyle = rgb(183,3,3);
            ctx.fillText(this.opponent.name, 759 - (cpuNameCount * 15), 60);
            ctx.strokeText(this.opponent.name, 759 - (cpuNameCount * 15), 60);
        } else if(this.title) {
            ctx.fillStyle = "Black";
            ctx.strokeStyle = "Black";
            ctx.fillRect(0,0,1024, 768);
            ctx.strokeStyle = "DarkOrange";
            ctx.font = '90px  "Press Start 2P:';
            ctx.fillStyle = rgb(183, 3, 3);
            ctx.fillText(this.titleName, 150, 100);
            ctx.strokeText(this.titleName, 150, 100);
            ctx.font = '20px "Press Start 2P"';
            ctx.fillText(this.edition, 300, 150);
            ctx.strokeText(this.edition, 300, 150);
    
            //ctx.font = '20px "Press Start 2P"';
            ctx.fillStyle = rgb(183, 3, 3);
            ctx.fillText("---Players---", 0, 350);
            ctx.strokeText("---Players---", 0, 350);
            var counter = 350;
            ctx.font = '12px "Press Start 2P"';
            for(var i = 0; i < 5; i++){
                counter += 50;
                if(this.game.click && (this.game.click.y >= counter-12) && (this.game.click.y <= counter +3) && (this.game.click.x > 0) && (this.game.click.x < this.Players.CHARACTERS[i].length * 12)){
                    ctx.fillStyle = "White";
                } else if(this.game.mouse && (this.game.mouse.y >= counter-12) && (this.game.mouse.y <= counter +3) && (this.game.mouse.x > 0) && (this.game.mouse.x < this.Players.CHARACTERS[i].length * 12)){
                    ctx.fillStyle = "White";
                } else {
                    ctx.fillStyle = rgb(183, 3, 3);
                }
                ctx.fillText(this.Players.CHARACTERS[i], 0, counter);
                ctx.strokeText(this.Players.CHARACTERS[i], 0, counter);
            }
            ctx.font = '20px "Press Start 2P"';
            ctx.fillStyle = rgb(183, 3, 3);
            ctx.fillText("---CPU---", 400, 350);
            ctx.strokeText("---CPU---", 400, 350);
            ctx.font = '12px "Press Start 2P"';
            var counter = 350;
            for(var i = 0; i < 5; i++){
                counter += 50;
                if(this.game.click && (this.game.click.y >= counter-12) && (this.game.click.y <= counter +3) && (this.game.click.x > 400) && (this.game.click.x < 400 + this.Players.CHARACTERS[i].length * 12)){
                    ctx.fillStyle = "White";
                } else if(this.game.mouse && (this.game.mouse.y >= counter-12) && (this.game.mouse.y <= counter +3) && (this.game.mouse.x > 400) && (this.game.mouse.x < 400 + this.Players.CHARACTERS[i].length * 12)){
                    ctx.fillStyle = "White";
                } else {
                    ctx.fillStyle = rgb(183, 3, 3);
                }
                ctx.fillText(this.Players.CHARACTERS[i], 400, counter);
                ctx.strokeText(this.Players.CHARACTERS[i], 400, counter);
            }
            ctx.font = '20px "Press Start 2P"';
            ctx.fillStyle = rgb(183, 3, 3);
            ctx.fillText("---Level---", 750, 350);
            ctx.strokeText("---Level---", 750, 350);
            ctx.font = '12px "Press Start 2P"';
            var counter = 350;
            for(var i = 0; i < 3; i++){
                counter += 50;
                if(this.game.click && (this.game.click.y >= counter-12) && (this.game.click.y <= counter +3) && (this.game.click.x > 750) && (this.game.click.x < 750 + this.LevelChoice.LEVEL[i].length * 12)){
                    ctx.fillStyle = "White";
                } else if(this.game.mouse && (this.game.mouse.y >= counter-12) && (this.game.mouse.y <= counter +3) && (this.game.mouse.x > 750) && (this.game.mouse.x < 750 + this.LevelChoice.LEVEL[i].length * 12)){
                    ctx.fillStyle = "White";
                } else {
                    ctx.fillStyle = rgb(183, 3, 3);
                }
                ctx.fillText(this.LevelChoice.LEVEL[i], 750, counter);
                ctx.strokeText(this.LevelChoice.LEVEL[i], 750, counter);
            }
    
            ctx.font = '30px "Press Start 2P"';
            ctx.fillStyle = this.game.mouse && (this.game.mouse.y >= 700-30) && (this.game.mouse.y <= 700 +3) && (this.game.mouse.x > 300) && (this.game.mouse.x < 750)? "White" : rgb(183, 3, 3);
            ctx.fillText("--- FIGHT! ---", 300, 700);
            ctx.strokeText("--- FIGHT! ---", 300, 700);
        }
    };
};
function rgb(r, g, b){
    return "rgb(" + r + "," + g + "," + b + ")";
};
class TransitionScreen{
    constructor(game, level){
        Object.assign(this,{game, level});
        this.midpoint = 1024 / 2;

        this.elapsed = 0;
    };
    update(){
        console.log("Elapsed Time: " + this.elapsed);
        this.elapsed += this.game.clockTick;
        if(this.elapsed > 2) this.game.camera.loadgame(false, false);
    };
    draw(ctx){
        ctx.fillStyle = "Black";
        ctx.strokeStyle = "Black";
        ctx.fillRect(0,0,1024, 768);
        ctx.strokeStyle = "DarkOrange";
        ctx.font = '90px  "Press Start 2P:';
        ctx.fillStyle = rgb(183, 3, 3);
        if(this.level === "Falls"){
            ctx.fillText(this.level, this.midpoint - ((this.level.length * 45) / 2), 400);
            ctx.strokeText(this.level, this.midpoint - ((this.level.length * 45) / 2), 400); 
        } else if (this.level === "Welcome to The Jungle"){
            ctx.fillText(this.level, this.midpoint - ((this.level.length * 40) / 2), 400);
            ctx.strokeText(this.level, this.midpoint - ((this.level.length * 40) / 2), 400);
        } else {
            ctx.fillText(this.level, this.midpoint - ((this.level.length * 45) / 2), 400);
            ctx.strokeText(this.level, this.midpoint - ((this.level.length * 45) / 2), 400);
        }
    };
};
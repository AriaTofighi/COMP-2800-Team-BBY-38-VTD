import {
    Grid
} from "matter";
import Carrier from "../game_objects/Carrier";
// import Turret1 from "../game_objects/Turret1";
// import Turret2 from "../game_objects/Turret2";
// import Turret3 from "../game_objects/Turret3";
import Bullet from "../game_objects/Bullet";
import {default as r1Config} from "../round_configs/r1Config.json";
import {default as r2Config} from "../round_configs/r2Config.json";
import {default as r3Config} from "../round_configs/r3Config.json";
import {default as rDefaultConfig} from "../round_configs/rDefaultConfig.json";


export class GameScene extends Phaser.Scene {

    /**
     * Constructor for GameScene object.
     */
    constructor() {
        super('Game');
    }

    /**
     * Initializes the game.
     */
    init() {
        // Initializes round configurations
        this.r1Config = r1Config;
        this.r2Config = r2Config;
        this.r3Config = r3Config;
        this.rDefaultConfig = rDefaultConfig; 
        this.roundConfigs = [this.r1Config, this.r2Config, this.r3Config];
        this.currentRound = 0;
        //this.tower1IsSelected = false;
        //this.tower2IsSelected = false;
        //this.tower3IsSelected = false;
    }

    /**
     * Set up the game scene entities.
     */
    preload() {
        // Ones represent grid cells that are path tiles.
        // You cannot place towers on path tiles.
        this.gridCells = [
            [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
            [0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
            [0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
            [0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
            [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0],
            [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]
        ];
    }

    /**
     * Creates the grid, background images, path tiles, carriers, menu, and sidebar.
     */
    create() {
        // Create grid variables
        this.width = this.sys.canvas.width;
        this.height = this.sys.canvas.height;
        this.ui = this.scene.get('UI');
        this.cellWidth = 32;
        this.cellHeight = 32;
        this.halfCell = 16; // Used to move objects to center of cells
        const colCount = this.width / this.cellWidth; // 25 columns; use this.cellWidth * 24 for last column
        const rowCount = this.height / this.cellWidth; // 19 rows; use this.cellWidth * 18 for last row

        this.scene.launch('UI');
        
        // Create and draw grid
        let grid = this.add.grid(0, 0, this.cellWidth * colCount, this.cellWidth * rowCount, this.cellWidth, this.cellWidth, 0x000000, 0, 0x222222, 0); // change last param to 1 to see grid lines
        grid.setDepth(1);
        grid.setOrigin(0, 0);

        //Create background image.
        let bg = this.add.tileSprite(this.width/2, this.height/2, this.width, this.height, 'bg');
        //let bg = this.add.image(this.width/2, this.height/2, 'bg');
        //bg.setDisplaySize(this.width, this.height);

        //Create path tiles.
        let tileX, tileY;
        let pathTile;
        for (let i = 0; i < rowCount; i++) {
            for (let j = 0; j < colCount; j++) {
                if (this.isPathTile(i, j)) {
                    //Position for tile placement  
                    tileX = this.cellWidth * j + this.halfCell;
                    tileY = this.cellWidth * i + this.halfCell;
                    if (i == 10 && j == 3 || i == 15 && j == 1 || i == 7 && j == 9) {
                        // Bottom left corner
                        pathTile = this.add.image(tileX, tileY, 'corner');
                        pathTile.setRotation(Math.PI);
                    } else if (i == 10 && j == 6 || i == 15 && j == 13 || i == 11 && j == 21) {
                        // Bottom right corner
                        pathTile = this.add.image(tileX, tileY, 'corner');
                        pathTile.setRotation(Math.PI / 2);
                    } else if (i == 5 && j == 6 || i == 2 && j == 13 || i == 7 && j == 21) {
                        // Top right corner
                        pathTile = this.add.image(tileX, tileY, 'corner');
                    } else if (i == 5 && j == 1 || i == 2 && j == 9 || i == 11 && j == 16) {
                        // Top left corner
                        pathTile = this.add.image(tileX, tileY, 'corner');
                        pathTile.setRotation(Math.PI / 2 * 3);
                    } else {
                        // Not a corner tile AKA regular tile
                        pathTile = this.add.image(tileX, tileY, 'road');
                        pathTile.setRotation(Math.PI / 2);
                        if (i == 10 && j >= 4 && j <= 5 || 
                            i == 5 && j != 3 && j <= 5 && j >= 2 ||
                            i == 15 && j >= 2 && j <= 12 ||
                            i == 2 && j >= 10 && j <= 12 ||
                            i == 7 && j != 13 && j >= 10 && j <= 21 ||
                            i == 11 && j >= 17 && j <= 20) {
                                pathTile.setRotation();
                        }
                    }
                    pathTile.setDisplaySize(this.halfCell * 2, this.halfCell * 2);
                } 
            }
        }
        //Place city.
        this.add.image((this.cellWidth * 16)+20, this.cellWidth * rowCount - 1, 'city').setScale(0.9);

        //Create frames from spritesheets

        this.anims.create({
            key: 'waterstart',
            frames: this.anims.generateFrameNumbers('water', {start: 0, end: 2}),
            frameRate: 15
        });

        this.anims.create({
            key: 'watershoot',
            frames: this.anims.generateFrameNumbers('water', {start: 3, end: 5}),
            repeat: -1,
            frameRate: 20
        });
        
        // Create and draw path
        let graphics = this.add.graphics();
        graphics.lineStyle(1, 0xFFFFFF);
        this.path = this.add.path(this.cellWidth * 3 + this.halfCell, this.cellWidth * -1 + this.halfCell); // -1 to start off screen
        this.path.lineTo(this.cellWidth * 3 + this.halfCell, this.cellWidth * 10 + this.halfCell);
        this.path.lineTo(this.cellWidth * 6 + this.halfCell, this.cellWidth * 10 + this.halfCell);
        this.path.lineTo(this.cellWidth * 6 + this.halfCell, this.cellWidth * 5 + this.halfCell);
        this.path.lineTo(this.cellWidth * 1 + this.halfCell, this.cellWidth * 5 + this.halfCell);
        this.path.lineTo(this.cellWidth * 1 + this.halfCell, this.cellWidth * 15 + this.halfCell);
        this.path.lineTo(this.cellWidth * 13 + this.halfCell, this.cellWidth * 15 + this.halfCell);
        this.path.lineTo(this.cellWidth * 13 + this.halfCell, this.cellWidth * 2 + this.halfCell);
        this.path.lineTo(this.cellWidth * 9 + this.halfCell, this.cellWidth * 2 + this.halfCell);
        this.path.lineTo(this.cellWidth * 9 + this.halfCell, this.cellWidth * 7 + this.halfCell);
        this.path.lineTo(this.cellWidth * 21 + this.halfCell, this.cellWidth * 7 + this.halfCell);
        this.path.lineTo(this.cellWidth * 21 + this.halfCell, this.cellWidth * 11 + this.halfCell);
        this.path.lineTo(this.cellWidth * 16 + this.halfCell, this.cellWidth * 11 + this.halfCell);
        this.path.lineTo(this.cellWidth * 16 + this.halfCell, this.cellWidth * 19 + this.halfCell); // 19 to end off screen

        // this.path.draw(graphics);

        

        // Pause the game when clicking escape
        this.input.keyboard.on('keydown-ESC', function () {
            this.scene.launch('Pause');
            this.scene.pause('Game');
        }.bind(this));

        // Creating the game objects groups
        this.createGroups();

        // Placing ones in the grid cell array in place of the buttons
        this.placeButtonNumbers();

        //this.currentRoundText = this.add.text(180, 40, "Current round: " + this.currentRound);
    }

    createGroups() {
        this.carriers = this.physics.add.group({
            classType: Carrier,
            runChildUpdate: true
        });
        this.civilians = this.physics.add.group({
            classType: Carrier,
            runChildUpdate: true
        });
        this.turrets = this.physics.add.group({
            runChildUpdate: true
        });
        this.bullets = this.physics.add.group({
            classType: Bullet,
            runChildUpdate: true
        });
    }

    incrementDefaultConfig() {
        this.rDefaultConfig.duration -= 1000; 
        this.rDefaultConfig.carrierHP += 5;
        this.rDefaultConfig.carrierCount += 5;
        this.rDefaultConfig.carrierSpace -= 25;
        console.log("default config adjusted");
    }

    startRound(config) {
            this.currentRound += 1;
            this.ui.currentRoundText.setText("Current round: " + this.currentRound);
            console.log("Starting round " + this.currentRound);
            console.log("Config for this round: " + JSON.stringify(config));
            this.ui.startRoundButton.disableInteractive();
            // Start directly for first time in order to give carrier group an active number immediately
            let carrier = new Carrier(this, this.path, this.cellWidth * 3 + this.halfCell, this.cellWidth * -1 + this.halfCell, 'carrier', config.duration, config.carrierHP);
            this.carriers.add(carrier);
            let intervaler = setInterval(function () {
                let carrier = new Carrier(this, this.path, this.cellWidth * 3 + this.halfCell, this.cellWidth * -1 + this.halfCell, 'carrier', config.duration, config.carrierHP);
                this.carriers.add(carrier);
            }.bind(this), config.carrierSpace);
    
            setTimeout(function () {
                clearInterval(intervaler);
            }.bind(this), (config.carrierCount - 1) * config.carrierSpace); 
            
            // Setting the correct round config for next round 
            this.ui.startRoundButton.once('pointerdown', function() {
                if (this.currentRound <= this.roundConfigs.length - 1) { // -1 because first round is started manually
                     this.startRound(this.roundConfigs[this.currentRound]);   
                } else {
                    console.log("else block hit");
                    if (this.currentRound >= 4) { // if on round 4 when clicking start round 5+
                        // First default config round has passed, begin incrementing
                        this.incrementDefaultConfig();
                    }
                    this.startRound(this.rDefaultConfig);   
                }
            }.bind(this));
    }

    

    placeSidebarNumbers(num) {
        return function () {
            for (let i = 3; i <= 14; i++) {
                for (let j = 23; j <= 25; j++) {
                    this.gridCells[i][j] = num;
                }
            }
        }.bind(this)
    }

    placeButtonNumbers() {
        // Placing ones in the place of the pause button
        for (let i = 0; i <= 1; i++) {
            for (let j = 0; j <= 1; j++) {
                this.gridCells[i][j] = 1;
            }
        }

        // Placing ones in the place of the cancel button and the menu button
        for (let i = 15; i <= 18; i++) {
            for (let j = 23; j <= 24; j++) {
                this.gridCells[i][j] = 1;
            }
        }
    }

    /**
     * Check if it's a path tile or not.
     * @return True if it is a path tile, false otherwise.
     */
    isPathTile(i, j) {
        if (this.gridCells[i] == undefined || this.gridCells[i][j] == undefined) {
            return undefined;
        }
        //Check if given values are inbounds first.
        // if(i >= 0 && j >= 0 && i < this.gridCells.length && j < this.gridCells[i].length)
        return this.gridCells[i][j] === 1;
        // return null;
    }

    /**
     * Update the physics.
     */
    update() {
        this.physics.overlap(this.carriers, this.turrets, this.fire.bind(this));
        this.physics.overlap(this.carriers, this.bullets, this.carrierHit.bind(this));
        if (this.ui.health <= 0) {
            this.scene.launch('GameOver');
            this.scene.pause('Game');
        }

        // Disables/enables the round start button if there are/aren't active carriers
        if (this.carriers.countActive() == 0) {
            this.ui.startRoundButton.setInteractive();
            this.ui.startRoundButton.alpha = 1;
        } else {
            this.ui.startRoundButton.disableInteractive();
            this.ui.startRoundButton.alpha = 0;
        }
    }

    placeTower(turret, i, j){
        this.turrets.add(turret);
        this.gridCells[i][j] = 1;
        console.log(turret);
        console.log(this.turrets);
    }

    fire(carrier, turret){
        turret.fire(carrier);
    }

    carrierHit(carrier, bullet){
        carrier.getHit(bullet);
    }
}
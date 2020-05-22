import Carrier from "../game_objects/Carrier";
import Bullet from "../game_objects/Bullet";
import {
    default as r1Config
} from "../round_configs/r1Config.json";
import {
    default as r2Config
} from "../round_configs/r2Config.json";
import {
    default as r3Config
} from "../round_configs/r3Config.json";
import {
    default as rDefaultConfig
} from "../round_configs/rDefaultConfig.json";

let bgm;
export {bgm};

/**
 * GameScene is the main scene of the game that includes
 * all the game objects.
 */
export class GameScene extends Phaser.Scene {

    /**
     * Constructor for GameScene object.
     */
    constructor() {
        /**
         * Constructor for Phaser.Scene object.
         */
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

        this.carriersMade = 0;
        this.currentConfig = {};
        this.firstRoundStarted = false;
        this.firstSave = true;
        this.loggedIn = true; 
        this.firstSwitch = true;
        this.delta = 0;
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

        this.db = firebase.firestore();
    }

    /**
     * Creates all the challenge entities.
     */
    create() {
        // Create grid variables.
        this.width = this.sys.canvas.width;
        this.height = this.sys.canvas.height;

        // Storing all the challenge ui scene variables in a variable
        this.ui = this.scene.get('UI');

        this.cellWidth = 32;
        this.cellHeight = 32;
        this.speed = 1;
        this.halfCell = 16;
        const colCount = this.width / this.cellWidth;
        const rowCount = this.height / this.cellWidth;

        this.scene.launch('UI');

        // Create and draw grid
        let grid = this.add.grid(0, 0, this.cellWidth * colCount, this.cellWidth * rowCount, this.cellWidth, this.cellWidth, 0x000000, 0, 0x222222, 0);
        grid.setDepth(1);
        grid.setOrigin(0, 0);

        //Create background image.
        let bg = this.add.tileSprite(this.width/2, this.height/2, this.width, this.height, 'bg');

        //Create path tiles.
        let tileX, tileY;
        let pathTile;
        for (let i = 0; i < rowCount; i++) {
            for (let j = 0; j < colCount; j++) {
                if (this.isPathTile(i, j)) {
                    //Position for tile placement.
                    tileX = this.cellWidth * j + this.halfCell;
                    tileY = this.cellWidth * i + this.halfCell;
                    if (i == 10 && j == 3 || i == 15 && j == 1 || i == 7 && j == 9) {
                        // Bottom left corner.
                        pathTile = this.add.image(tileX, tileY, 'corner');
                        pathTile.setRotation(Math.PI);
                    } else if (i == 10 && j == 6 || i == 15 && j == 13 || i == 11 && j == 21) {
                        // Bottom right corner.
                        pathTile = this.add.image(tileX, tileY, 'corner');
                        pathTile.setRotation(Math.PI / 2);
                    } else if (i == 5 && j == 6 || i == 2 && j == 13 || i == 7 && j == 21) {
                        // Top right corner.
                        pathTile = this.add.image(tileX, tileY, 'corner');
                    } else if (i == 5 && j == 1 || i == 2 && j == 9 || i == 11 && j == 16) {
                        // Top left corner.
                        pathTile = this.add.image(tileX, tileY, 'corner');
                        pathTile.setRotation(Math.PI / 2 * 3);
                    } else {
                        // Not a corner tile; AKA regular tile.
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
        this.add.image((this.cellWidth * 16) + 20, this.cellWidth * rowCount - 1, 'city').setScale(0.9);

        //Place decorative elements. This gives a subtle indication of where to not place towers.
        this.add.image(this.width - 100, 100, 'building').setScale(0.6);
        this.add.image(this.width - 240, 100, 'building').setScale(0.6, 0.8);
        this.add.image(210, 60, 'building').setScale(0.3, 0.6);
        this.add.image(320, 410, 'building').setScale(0.5, 0.4);

        //Make towers unplaceable on bg elements.
        //Building topleft.
        for(let x = 5; x <= 7; x++){
            for(let y = 0; y <= 3; y++)
                this.gridCells[y][x] = 1;
        }

        //Building bottom
        for(let x = 8; x <= 11; x++){
            for(let y = 12; y <= 13; y++)
                this.gridCells[y][x] = 1;
        }

        //Top right buildings
        for(let x = 15; x <= 23; x++){
            for(let y = 2; y <= 4; y++)
                this.gridCells[y][x] = 1;
        }

        //City row 1
        for(let x = 11; x <= 21; x++){
            for(let y = 17; y <= 18; y++)
                this.gridCells[y][x] = 1;
        }

        //City row 2
        for(let x = 13; x <= 21; x++){
                this.gridCells[16][x] = 1;
        }

        //City row 3
        for(let x = 17; x <= 21; x++){
            this.gridCells[15][x] = 1;

        // Making towers unplaceable on top side of the game
        for (let i = 0; i <= 1; i++) {
            for (let j = 2; j <= 12; j++) {
                this.gridCells[i][j] = 1;
            }
        }
    }
        
        // Create and draw path
        let graphics = this.add.graphics();
        graphics.lineStyle(1, 0xFFFFFF);
        this.path = this.add.path(this.cellWidth * 3 + this.halfCell, this.cellWidth * -1 + this.halfCell); // -1 to start off screen.
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
        this.path.lineTo(this.cellWidth * 16 + this.halfCell, this.cellWidth * 19 + this.halfCell); // 19 to end off screen.

        // Pause the game when clicking escape.
        this.input.keyboard.on('keydown-ESC', function () {
            bgm.pause();
            this.sound.play('buttonClick');
            this.scene.launch('Pause');
            this.scene.pause('UI');
            this.scene.pause('Game');
        }.bind(this));

        // Creating the game objects groups.
        this.createGroups();

        // Placing ones in the grid cell array in place of the buttons.
        this.placeButtonNumbers();
        
        // Creates and displays the display name / guest and best round
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                // User is signed in.
                this.loggedIn = true;
                this.status = this.add.text(245, 5, "Playing as ");
                this.status.setFontFamily('Arial');
                this.status.setFontSize(15);
                this.status.setStroke('black', 3);
                this.displayName = this.add.text(320, 5, user.displayName);
                this.displayName.setFontFamily('Arial');
                this.displayName.setFontSize(15);
                this.displayName.setFill('red');
                this.displayName.setStroke('black', 3);

                this.bestRound = this.add.text(245, 25, "Best Round: ");
                this.bestRound.setFontFamily('Arial');
                this.bestRound.setFontSize(15);
                this.bestRound.setStroke('black', 3);

                // Listens for changes in the user's best round and updates screen text
                this.db.collection("users").doc(user.uid).onSnapshot(function (userDoc) {
                console.log(userDoc.data());
                let userBestRound = userDoc.data()["bestRound"];
                this.bestRound.setText("Best Round: " + userBestRound);
        }.bind(this));
            } else {
                // User is not signed in.
                this.loggedIn = false;
                this.status = this.add.text(170, 10, "Playing as Guest");
                this.status.setFontFamily('Arial');
                this.status.setFontSize(15);
                this.status.setStroke('black', 3);

            }
        }.bind(this), function (error) {
            console.log(error);
        });

        // Switching the game mode typing 'death'
        this.combo = this.input.keyboard.createCombo('death', {
            resetOnMatch: true
        });
        this.input.keyboard.on('keycombomatch', function () {
            if (this.firstSwitch) {
                this.firstSwitch = false;
                this.scene.stop('UI');
                this.scene.start('Challenge');
            }
        }.bind(this));

        //Creating background music
        bgm = this.sound.add('gameMusic', {
            volume: 0.1,
            loop: true
        });
        bgm.play();

        // Display info box that explains the game 
        this.scene.pause('UI');
        this.scene.pause();
        this.scene.launch('Info');
    }


    /**
     * Create the carriers, civilians, turrets, and bullets.
     */
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

    /**
     * Increment the default configuration to set higher difficulty as rounds progress.
     */
    incrementDefaultConfig() {
        this.rDefaultConfig.duration *= 0.95;
        this.rDefaultConfig.carrierHP += 5;
        this.rDefaultConfig.carrierCount += 5;
        this.rDefaultConfig.carrierSpace *= 0.9;
    }

    /**
     * Enable the start round button.
     */
    enableStartRoundButton() {
        this.ui.startRoundButton.setInteractive({
            cursor: 'pointer'
        });
        this.ui.startRoundButton.alpha = 1;
    }

    /**
     * Disable the start round button.
     */
    disableStartRoundButton() {
        this.ui.startRoundButton.disableInteractive();
        this.ui.startRoundButton.alpha = 0;
    }

    /**
     * Updates the best round that the user has reached on the database.
     */
    updateBestRound() {
        let user = firebase.auth().currentUser;
        this.db.collection("users").doc(user.uid).get().then(function (userDoc) {
            let savedBest = userDoc.data()["bestRound"];
            this.betterRound = Math.max(savedBest, this.currentRound);
            this.db.collection("users").doc(user.uid).update({
                "bestRound": this.betterRound
            });
        }.bind(this));
    }

    /**
     * Starts the round based on the round configurations.
     * 
     * @param config the configurations of the curret round
     */
    startRound(config) {
        this.firstRoundStarted = true;
        this.firstSave = true;
        this.carriersMade = 0;
        this.currentConfig = config;
        this.currentRound += 1;
        this.delta = 0;
        this.ui.currentRoundText.setText("Current round: " + this.currentRound);
        this.disableStartRoundButton();

        // Start directly for first time in order to give carrier group an active number immediately.
        let carrier = new Carrier(this, this.path, this.cellWidth * 3 +
            this.halfCell, this.cellWidth * -1 + this.halfCell, 'carrier', config.duration, config.carrierHP);
        this.carriers.add(carrier);

        // Setting the correct round config for next round 
        this.ui.startRoundButton.once('pointerdown', function () {
            if (this.currentRound <= this.roundConfigs.length - 1) { // -1 because first round is started manually
                this.startRound(this.roundConfigs[this.currentRound]);
            } else {
                if (this.currentRound >= 4) { // if on round 4 when clicking start round 5+
                    // First default config round has passed, begin incrementing
                    this.incrementDefaultConfig();
                }
                this.startRound(this.rDefaultConfig);
            }
        }.bind(this));
    }

    /**
     * Change the numbers on the grid to disallow
     * placing towers on specific places.
     * 
     * @param num either one or zero based on if the sidebar is open or close
     */
    placeSidebarNumbers(num) {
        return function () {
            for (let i = 3; i <= 14; i++) {
                for (let j = 22; j <= 24; j++) {
                    this.gridCells[i][j] = num;
                }
            }
        }.bind(this)
    }

    /**
     * Change the numbers on the grid to disallow
     * placing towers on specific places.
     */
    placeButtonNumbers() {
        // Placing 1s in the place of the pause button and i button.
        for (let i = 0; i <= 3; i++) {
            for (let j = 0; j <= 1; j++) {
                this.gridCells[i][j] = 1;
            }
        }

        // Placing 1s in the place of the cancel button and the menu button.
        for (let i = 15; i <= 18; i++) {
            for (let j = 23; j <= 24; j++) {
                this.gridCells[i][j] = 1;
            }
        }

        // Placing 1s in the place of the start round buttton
        for (let i = 16; i <= 18; i++) {
            for (let j = 0; j <= 2; j++) {
                this.gridCells[i][j] = 1;
            }
        }

        // Placing 1s in the place of the info container
        for (let i = 0; i <= 1; i++) {
            for (let j = 13; j <= 24; j++) {
                this.gridCells[i][j] = 1;
            }
        }
    }

    /**
     * Check if it's a path tile or not.
     * 
     * @return True if it is a path tile, false otherwise.
     */
    isPathTile(i, j) {
        if (this.gridCells[i] == undefined || this.gridCells[i][j] == undefined) {
            return undefined;
        }
        // Check if given values are inbounds first
        return this.gridCells[i][j] === 1;
    }


    /**
     * Spawns a carrier if enough time has elapsed since the last
     * spawn and the number of carriers made for the round isn't
     * reached yet.
     */
    spawnCarrier() {
        if (this.carriersMade < this.currentConfig.carrierCount - 1 && this.delta >= this.currentConfig.carrierSpace) {
            this.spawnStarted = true;
            let carrier = new Carrier(this, this.path, this.cellWidth * 3 + this.halfCell, this.cellWidth * -1 + this.halfCell, 'carrier', this.currentConfig.duration, this.currentConfig.carrierHP);
            this.carriers.add(carrier);
            this.carriersMade++;
            this.delta = 0;
        }
    }

    /**
     * Update the physics.
     */
    update(time, delta) {
        this.physics.overlap(this.carriers, this.turrets, this.fire.bind(this));
        this.physics.overlap(this.carriers, this.bullets, this.carrierHit.bind(this));
        this.delta += delta;

        // Starts GameOver scene if player health has hit zero.
        if (this.ui.health <= 0) {
            this.scene.launch('GameOver', {
                roundReached: this.currentRound
            });
            this.scene.pause('UI');
            this.scene.pause('Game');
        }

        if (this.firstRoundStarted) {
            this.spawnCarrier();
            if (this.carriersAllGone() && this.currentConfig.carrierCount - 1 == this.carriersMade) {
                this.enableStartRoundButton();
                if (this.loggedIn && this.firstSave) {
                    this.updateBestRound();
                    this.firstSave = false;
                }
            } else {
                this.disableStartRoundButton();
            }
        }
    }

    /**
     * Checks if all carriers are gone.
     */
    carriersAllGone() {
        let carrierArray = this.carriers.getChildren();
        for (let i = 0; i < this.carriers.getLength(); i++) {
            if (carrierArray[i].hp != 0 || carrierArray[i].hp != undefined) {
                return false;
            }
        }
        return true;
    }

    /**
     * Placing towers on the game.
     * 
     * @param turret the turret that will be placed
     * @param i the i location of the tower
     * @param j the j location of the tower
     */
    placeTower(turret, i, j) {
        this.turrets.add(turret);
        this.gridCells[i][j] = 1;
    }

    /**
     * Fires bullets to the carriers.
     * 
     * @param carrier the carrier that is getting hit 
     * @param turret the turret that is firing bullets
     */
    fire(carrier, turret) {
        turret.fire(carrier);
    }

    /**
     * Detecting the overlap between the bullet and the carrier.
     * 
     * @param carrier the carrier that has got hit
     * @param bullet the bullet that hit the carrier
     */
    carrierHit(carrier, bullet) {
        carrier.getHit(bullet);
    }
}
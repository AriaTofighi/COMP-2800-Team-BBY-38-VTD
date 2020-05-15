import {
    Grid
} from "matter";
import Carrier from "../game_objects/Carrier";
import Turret1 from "../game_objects/Turret1";
import Turret2 from "../game_objects/Turret2";
import Turret3 from "../game_objects/Turret3";
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
        this.tower1IsSelected = false;
        this.tower2IsSelected = false;
        this.tower3IsSelected = false;
        this.carriersMade = 0;
        this.currentConfig = {};
        this.firstRoundStarted = false;
        this.firstSave = true;
        this.loggedIn = true; 
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
        console.log("DB LOADED IN GAMESCENE: ");
        console.log(this.db);
    }

    /**
     * Creates the grid, background images, path tiles, carriers, menu, and sidebar.
     */
    create() {
        // Create grid variables.
        this.width = this.sys.canvas.width;
        this.height = this.sys.canvas.height;
        this.cellWidth = 32;
        this.cellHeight = 32;
        this.halfCell = 16; // Used to move objects to center of cells.
        const colCount = this.width / this.cellWidth; // 25 columns; use this.cellWidth * 24 for last column.
        const rowCount = this.height / this.cellWidth; // 19 rows; use this.cellWidth * 18 for last row.

        // Create and draw grid.
        let grid = this.add.grid(0, 0, this.cellWidth * colCount, this.cellWidth * rowCount, this.cellWidth, this.cellWidth, 0x000000, 0, 0x222222, 0); // change last param to 1 to see grid lines
        grid.setDepth(1);
        grid.setOrigin(0, 0);

        //Create background image.
        let bg = this.add.tileSprite(this.width / 2, this.height / 2, this.width, this.height, 'bg');
        //let bg = this.add.image(this.width/2, this.height/2, 'bg');
        //bg.setDisplaySize(this.width, this.height);

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

        let walkCycle = this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('carrier', {
                start: 0,
                end: 7
            }),
            frameRate: 12,
            repeat: -1
        });

        // Create and draw a path.
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

        // this.path.draw(graphics);

        // Creates carrier on A keyboard press.
        this.input.keyboard.on('keydown-A', function () {
            // console.log("A pressed");
            // let carrier = new Carrier(this, this.path, this.cellWidth * 3 + this.halfCell, this.cellWidth * -1 + this.halfCell, 'carrier', this.round1Duration, this.round1CarrierHP);
            // this.carriers.add(carrier);

            // Making the bullet follow this carrier.
            // setInterval(function() {
            //     this.physics.moveToObject(this.bullet, this.carrier, 230);
            // }.bind(this), 100);

        }.bind(this));

        // Start round text button.
        // this.startRoundText = this.add.text(180, 20, "Start Round");
        // this.startRoundText.setInteractive({cursor: 'pointer'});
        // this.startRoundText.once('pointerdown', function() {
        //     this.startRound(this.roundConfigs[0]);
        // }.bind(this));
        // this.startRoundText.on('pointerover', function() {
        //     this.startRoundText.setStyle({
        //         color: '#0C0F12'
        //     })
        //     this.startRoundText.setColor(0x0c0f12);
        // }.bind(this));
        // this.startRoundText.on('pointerout', function() {
        //     this.startRoundText.setStyle({
        //         color: '#FFFFFF'
        //     })
        // }.bind(this));

        //Create sidebar.
        this.sidebar = this.add.container(this.width, this.height / 2 - 200);
        let sidebox = this.add.graphics();
        this.sidebar.depth = 1;
        this.sidebar.add(sidebox);
        sidebox.fillStyle(0xff0000);
        sidebox.fillRect(4, -9, 96, 384);

        //Create first tower in menu.
        let menuTower1 = this.add.image(50, 72, 'tower1');
        menuTower1.setInteractive({
            cursor: 'pointer'
        });
        // On pressed down for tower 1 button.
        menuTower1.setInteractive().on('pointerdown', () => {
            // Tower1 has been selected.
            // this.toggleSidebar();
            this.tower1IsSelected = true;
            this.tower2IsSelected = false;
            this.tower3IsSelected = false;
            this.descText.setText("Description: Water Tower");
            this.costText.setText("Cost: 100");
            this.cancelButton.alpha = 1;

            // Once a turret is selected, close the sidebar.
            this.toggleSidebar();

            // Create cursor grid cell hover image.
            this.showTurretExample();
        });

        // Create second tower in menu.
        let menuTower2 = this.add.image(50, 176, 'tower2');
        menuTower2.setInteractive({
            cursor: 'pointer'
        });
        // On pressed down for tower 2 button.
        menuTower2.setInteractive().on('pointerdown', () => {
            // Tower2 has been selected
            this.tower1IsSelected = false;
            this.tower2IsSelected = true;
            this.tower3IsSelected = false;
            this.descText.setText("Description: Soap Tower");
            this.costText.setText("Cost: 200");
            this.cancelButton.alpha = 1;

            // Once a turret is selected, close the sidebar.
            this.toggleSidebar();

            // Create cursor grid cell hover image.
            this.showTurretExample();
        });

        // Create third tower in menu.
        let menuTower3 = this.add.image(50, 280, 'tower3');
        menuTower3.setInteractive({
            cursor: 'pointer'
        });
        // On pressed down for tower 3 button.
        menuTower3.setInteractive().on("pointerdown", () => {
            // Tower3 has been selected
            this.tower1IsSelected = false;
            this.tower2IsSelected = false;
            this.tower3IsSelected = true;
            this.descText.setText("Description: Sanitizer");
            this.costText.setText("Cost: 300");
            this.cancelButton.alpha = 1;

            // Once a turret is selected, close the sidebar.
            this.toggleSidebar();

            // Create cursor grid cell hover image.
            this.showTurretExample();
        });

        // Creating the cancel button.
        this.cancelButton = this.add.image(this.width - 32, this.height - 96, 'cancelButton');
        this.cancelButton.setDisplaySize(64, 64);
        this.cancelButton.alpha = 0;
        this.cancelButton.setInteractive({
            cursor: 'pointer'
        });
        // On hover of cancel tower button.
        this.cancelButton.setInteractive().on('pointerover', () => {
            this.sound.play('buttonHover');
        });
        // On pressed down of cancel tower button.
        this.cancelButton.setInteractive().on('pointerdown', () => {
            this.sound.play('buttonClick');
        });
        // Cancel selection of tower on pressed down of cancel tower button.
        this.cancelButton.setInteractive().on('pointerdown', this.cancelSelection.bind(this));

        // Add all the buttons to the sidebar.
        this.sidebar.add(menuTower1);
        this.sidebar.add(menuTower2);
        this.sidebar.add(menuTower3);

        // Create menu toggle button.
        // let menuButton = this.add.rectangle(this.width - 20, height - 20, 40, 40, 0x00ff00);
        // menuButton.depth = 1;
        // On pressed down of menu toggle button.
        // menuButton.on('pointerdown', () => {
        //     this.toggleSidebar();
        // });

        // Create menu toggle button.
        this.menuShowing = false;
        this.menuButton = this.add.image(this.width - 32, this.height - 32, 'menuButton');
        this.menuButton.setDisplaySize(64, 64);
        this.menuButton.setInteractive({
            cursor: 'pointer'
        });
        // On hover of menu toggle button.
        this.menuButton.setInteractive().on('pointerover', () => {
            this.sound.play('buttonHover');
        });
        // On pressed down of menu toggle button.
        this.menuButton.setInteractive().on('pointerdown', () => {
            this.sound.play('buttonClick');
            this.toggleSidebar();
        });

        // Create description area.
        let infoContainer = this.add.container(this.width - 250, 10);
        this.descText = this.add.text(0, 0, '');
        this.costText = this.add.text(0, this.descText.getBottomCenter().y + 10, '');
        infoContainer.add(this.descText);
        infoContainer.add(this.costText);

        // Create and draw bullet.
        // this.bullet = this.physics.add.image(this.cellWidth * 15 + this.halfCell, this.cellWidth * 18 + this.halfCell, 'bullet');
        // this.bullet.setDisplaySize(32, 32);
        // this.bullet.body.debugShowVelocity = false;
        // this.bullet.body.debugShowBody = false;
        // this.bullet.setInteractive();

        // Create resource information text.
        this.health = 100;
        this.healthText = this.add.text(this.width / 2, 10, "Health: " + this.health);
        this.money = 400;
        this.moneyText = this.add.text(this.width / 2, this.healthText.getBottomCenter().y + 10, 'Money: ' + this.money);

        this.input.keyboard.on('keydown-M', function () {
            this.money += 100;
            this.moneyText.setText("Money: " + this.money);
        }.bind(this));

        // Creating pause button.
        this.pauseButton = this.add.image(1 * 32, 1 * 32, 'pauseButton');
        this.pauseButton.setInteractive({
            cursor: 'pointer'
        });
        // On hover of pause button.
        this.pauseButton.setInteractive().on('pointerover', function () {
            this.sound.play('buttonHover');
        }.bind(this));
        // On pressed down of pause button.
        this.pauseButton.setInteractive().on('pointerdown', function () {
            this.sound.play('buttonClick');
            this.scene.launch('Pause');
            this.scene.pause('Game');
        }.bind(this));

        this.startRoundButton = this.add.image(this.halfCell * 3, this.height - 96 + this.halfCell * 3, 'startRound');
        this.startRoundButton.setDisplaySize(96, 96);
        this.startRoundButton.setInteractive({
            cursor: 'pointer'
        });
        // On hover of start round button.
        this.startRoundButton.setInteractive().on('pointerover', function () {
            this.sound.play('buttonHover');
        }.bind(this));
        // On pressed down of start round button (first time).
        this.startRoundButton.once('pointerdown', function () {
            this.startRound(this.roundConfigs[0]);
            this.firstRoundStarted = true;
        }.bind(this));
        // On pressed down of start round button (after first time).
        this.startRoundButton.setInteractive().on('pointerdown', function () {
            this.sound.play('buttonClick');
        }.bind(this));

        // Pause the game when clicking escape.
        this.input.keyboard.on('keydown-ESC', function () {
            this.sound.play('buttonClick');
            this.scene.launch('Pause');
            this.scene.pause('Game');
        }.bind(this));

        // Creating the game objects groups.
        this.createGroups();

        // Placing ones in the grid cell array in place of the buttons.
        this.placeButtonNumbers();

        // Creates and displays current round
        this.currentRoundText = this.add.text(180, 40, "Current round: " + this.currentRound);
        
        // Creates and displays the display name / guest and best round
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                // User is signed in.
                this.loggedIn = true; 
                this.status = this.add.text(this.width - 170, 10, "Playing as ");
                this.status.setFontFamily('Arial');
                this.status.setFontSize(15);
                this.status.setStroke('black', 3);
                this.displayName = this.add.text(this.width - 95, 10, user.displayName);
                this.displayName.setFontFamily('Arial');
                this.displayName.setFontSize(15);
                this.displayName.setFill('red');
                this.displayName.setStroke('black', 3);

                this.bestRound = this.add.text(this.width - 170, 30, "Best: " + user.bestRound);
                this.bestRound.setFontFamily('Arial');
                this.bestRound.setFontSize(15);
                this.bestRound.setStroke('black', 3);

                // Listens for changes in the user's best round and updates screen text
                this.db.collection("users").doc(user.uid).onSnapshot(function (userDoc) {
                console.log(userDoc.data());
                let userBestRound = userDoc.data()["bestRound"];
                this.bestRound.setText("Best round: " + userBestRound);
        }.bind(this));
            } else {
                // User is not signed in.
                this.loggedIn = false; 
                this.status = this.add.text(this.width - 170, 10, "Playing as Guest");
                this.status.setFontFamily('Arial');
                this.status.setFontSize(15);
                this.status.setStroke('black', 3);

            }
        }.bind(this), function (error) {
            console.log(error);
        });        

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
        this.rDefaultConfig.duration -= 1000;
        this.rDefaultConfig.carrierHP += 5;
        this.rDefaultConfig.carrierCount += 5;
        this.rDefaultConfig.carrierSpace -= 25;
        console.log("default config adjusted");
    }

    /**
     * Enable the start round button.
     */
    enableStartRoundButton() {
        this.startRoundButton.setInteractive({
            cursor: 'pointer'
        });
        this.startRoundButton.alpha = 1;
    }

    /**
     * Disable the start round button.
     */
    disableStartRoundButton() {
        this.startRoundButton.disableInteractive();
        this.startRoundButton.alpha = 0;
    }

    updateBestRound() {
        let user = firebase.auth().currentUser;
        this.db.collection("users").doc(user.uid).get().then(function (userDoc) {
            let savedBest = userDoc.data()["bestRound"];
            console.log("saved best: " + savedBest);
            console.log("current round: " + this.currentRound);
            this.betterRound = Math.max(savedBest, this.currentRound);
            console.log("better round: " + this.betterRound);
            this.db.collection("users").doc(user.uid).update({
                "bestRound": this.betterRound
            });
        }.bind(this));
    }

    startRound(config) {
        this.firstSave = true;
        this.carriersMade = 0;
        this.currentConfig = config;
        this.currentRound += 1;
        this.currentRoundText.setText("Current round: " + this.currentRound);
        console.log("Starting round " + this.currentRound);
        console.log("Config for this round: " + JSON.stringify(config));
        this.disableStartRoundButton();
        // Start directly for first time in order to give carrier group an active number immediately.
        let carrier = new Carrier(this, this.path, this.cellWidth * 3 + this.halfCell, this.cellWidth * -1 + this.halfCell, 'carrier', config.duration, config.carrierHP);
        this.carriers.add(carrier);
        let intervaler = setInterval(function () {
            let carrier = new Carrier(this, this.path, this.cellWidth * 3 + this.halfCell, this.cellWidth * -1 + this.halfCell, 'carrier', config.duration, config.carrierHP);
            this.carriers.add(carrier);
            this.carriersMade++;
        }.bind(this), config.carrierSpace);

        setTimeout(function () {
            clearInterval(intervaler);
        }.bind(this), (config.carrierCount - 1) * config.carrierSpace);

        // Setting the correct round config for next round 
        this.startRoundButton.once('pointerdown', function () {
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

    /**
     * Retracts or expands sidebar.
     */
    toggleSidebar() {
        if (!this.menuShowing) {
            this.tweens.add({
                targets: this.sidebar,
                x: this.width - 100,
                duration: 200
            });
            // Placing 1s in the place of sidebar on the grid array.
            setTimeout(this.placeSidebarNumbers(1), 10);

            this.menuShowing = true;
        } else {
            this.tweens.add({
                targets: this.sidebar,
                x: this.width + 100,
                duration: 200
            });
            // Placing 0s in the place of sidebar on the grid array.
            setTimeout(this.placeSidebarNumbers(0), 10);

            this.menuShowing = false;
        }
    }

    /**
     * Show an example turret.
     */
    showTurretExample() {
        if (this.tower1IsSelected) {
            this.sound.play('towerButtonClick');
            // showing the turret example with its radius.
            this.turretExampleRadius = this.add.circle(-1000, -1000, 60, 0xECDBDB);
            this.turretExampleRadius.alpha = 0.8;
            this.turretExampleRadius.setStrokeStyle(3, 0x046307, 0.8);

            this.turretExample = this.add.image(0, 0, 'tower1');
            this.turretExample.setOrigin(0, 0);
            this.turretExample.setDisplaySize(32, 32);
            this.turretExample.alpha = 0;

            // showing no turret is allowed here.
            this.noTurretHere = this.add.image(0, 0, 'noTurret1');
            this.noTurretHere.setDisplaySize(32, 32);
            this.noTurretHere.setOrigin(0, 0);
            this.noTurretHere.alpha = 0;
        } else if (this.tower2IsSelected) {
            this.sound.play('towerButtonClick');
            // showing the turret example with its radius.
            this.turretExampleRadius = this.add.circle(-1000, -1000, 85, 0xECDBDB);
            this.turretExampleRadius.alpha = 0.8;
            this.turretExampleRadius.setStrokeStyle(3, 0x046307, 0.8);

            this.turretExample = this.add.image(0, 0, 'tower2');
            this.turretExample.setOrigin(0, 0);
            this.turretExample.setDisplaySize(32, 32);
            this.turretExample.alpha = 0;

            // showing no turret is allowed here.
            this.noTurretHere = this.add.image(0, 0, 'noTurret2');
            this.noTurretHere.setDisplaySize(32, 32);
            this.noTurretHere.setOrigin(0, 0);
            this.noTurretHere.alpha = 0;
        } else if (this.tower3IsSelected) {
            this.sound.play('towerButtonClick');
            // showing the turret example with its radius.
            this.turretExampleRadius = this.add.circle(-1000, -1000, 100, 0xECDBDB);
            this.turretExampleRadius.alpha = 0.8;
            this.turretExampleRadius.setStrokeStyle(3, 0x046307, 0.8);

            this.turretExample = this.add.image(0, 0, 'tower3');
            this.turretExample.setOrigin(0, 0);
            this.turretExample.setDisplaySize(32, 32);
            this.turretExample.alpha = 0;

            // showing no turret is allowed here.
            this.noTurretHere = this.add.image(0, 0, 'noTurret3');
            this.noTurretHere.setDisplaySize(32, 32);
            this.noTurretHere.setOrigin(0, 0);
            this.noTurretHere.alpha = 0;
        }

        // Determines if the cursor is over a valid tile for tower placement.
        this.input.on('pointermove', function (pointer) {
            let i = Math.floor(pointer.y / 32); // Row index.
            let j = Math.floor(pointer.x / 32); // Column index.

            this.turretExample.setPosition(j * 32, i * 32);
            this.noTurretHere.setPosition(j * 32, i * 32);
            this.turretExampleRadius.setPosition((j + 0.5) * 32, (i + 0.5) * 32);

            if (this.tower1IsSelected) {
                if (this.isPathTile(i, j)) {
                    this.turretExample.alpha = 0;
                    this.turretExampleRadius.alpha = 0;
                    this.turretExampleRadius.setStrokeStyle(3, 0x046307, 0);
                    this.noTurretHere.alpha = 1;
                } else {
                    this.turretExample.alpha = 1;
                    this.turretExampleRadius.alpha = 0.8;
                    this.turretExampleRadius.setStrokeStyle(3, 0x046307, 0.8);
                    this.noTurretHere.alpha = 0;
                }
            } else if (this.tower2IsSelected) {
                if (this.isPathTile(i, j)) {
                    this.turretExample.alpha = 0;
                    this.turretExampleRadius.alpha = 0;
                    this.turretExampleRadius.setStrokeStyle(3, 0x046307, 0);
                    this.noTurretHere.alpha = 1;
                } else {
                    this.turretExample.alpha = 1;
                    this.turretExampleRadius.alpha = 0.8;
                    this.turretExampleRadius.setStrokeStyle(3, 0x046307, 0.8);
                    this.noTurretHere.alpha = 0;
                }
            } else if (this.tower3IsSelected) {
                if (this.isPathTile(i, j)) {
                    this.turretExample.alpha = 0;
                    this.turretExampleRadius.alpha = 0;
                    this.turretExampleRadius.setStrokeStyle(3, 0x046307, 0);
                    this.noTurretHere.alpha = 1;
                } else {
                    this.turretExample.alpha = 1;
                    this.turretExampleRadius.alpha = 0.8;
                    this.turretExampleRadius.setStrokeStyle(3, 0x046307, 0.8);
                    this.noTurretHere.alpha = 0;
                }
            } else {
                this.turretExample.alpha = 0;
                this.turretExampleRadius.alpha = 0;
                this.turretExampleRadius.setStrokeStyle(3, 0x046307, 0);
                this.noTurretHere.alpha = 0;
            }

        }.bind(this));

        // Place tower.
        this.input.on('pointerdown', this.placeTower.bind(this));
    }

    /**
     * Places the selected tower.
     */
    placeTower(pointer) {
        let i = Math.floor(pointer.y / 32); // Row index.
        let j = Math.floor(pointer.x / 32); // Col index.

        if (this.tower1IsSelected && !this.isPathTile(i, j) && this.money >= 100) {
            this.sound.play('towerBuild');
            this.turret = new Turret1(this, j, i);
            this.turrets.add(this.turret);
            this.money -= this.turret.price;
            this.moneyText.setText('Money: ' + this.money);
            this.gridCells[i][j] = 1;
            this.toggleSidebar();
            this.cancelSelection();
        } else if (this.tower2IsSelected && !this.isPathTile(i, j) && this.money >= 200) {
            this.sound.play('towerBuild');
            this.turret = new Turret2(this, j, i);
            this.turrets.add(this.turret);
            this.money -= this.turret.price;
            this.moneyText.setText('Money: ' + this.money);
            this.gridCells[i][j] = 1;
            this.toggleSidebar();
            this.cancelSelection();
        } else if (this.tower3IsSelected && !this.isPathTile(i, j) && this.money >= 300) {
            this.sound.play('towerBuild');
            this.turret = new Turret3(this, j, i);
            this.turrets.add(this.turret);
            this.money -= this.turret.price;
            this.moneyText.setText('Money: ' + this.money);
            this.gridCells[i][j] = 1;
            this.toggleSidebar();
            this.cancelSelection();
        }
    }

    /**
     * Place the numbers on the sidebar.
     */
    placeSidebarNumbers(num) {
        return function () {
            for (let i = 3; i <= 14; i++) {
                for (let j = 23; j <= 25; j++) {
                    this.gridCells[i][j] = num;
                }
            }
        }.bind(this)
    }

    /**
     * Place the numbers on the buttons.
     */
    placeButtonNumbers() {
        // Placing 1s in the place of the pause button.
        for (let i = 0; i <= 1; i++) {
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
    }

    /**
     * Cancel current tower selection.
     */
    cancelSelection() {
        this.tower1IsSelected = false;
        this.tower2IsSelected = false;
        this.tower3IsSelected = false;
        this.descText.setText("");
        this.costText.setText("");
        this.cancelButton.alpha = 0;
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
        if (this.health <= 0) {
            this.scene.launch('GameOver');
            this.scene.pause('Game');
        }
        if (this.firstRoundStarted) {
            console.log(this.currentConfig.carrierCount - 1);
            console.log(this.carriersMade);
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
     * Fire a turret shot at a carrier (must be here, NOT Turret.js for access to groups)
     * 
     * @param carrier The civilian that carries the infected virus.
     * @param turret The turret that cleans the carriers.
     */
    fire(carrier, turret) {
        if (!(turret.delta >= 1000 / turret.fireRate)) {
            return;
        }
        // console.log("fire");

        // Rotating the turret towards the carrier when firing.
        var angle = Phaser.Math.Angle.Between(turret.x, turret.y, carrier.x, carrier.y);
        turret.setRotation(angle);

        // Creating a bullet.
        this.bullet = new Bullet(this, turret.x + this.halfCell * Math.cos(angle), turret.y + this.halfCell * Math.sin(angle));
        this.bullets.add(this.bullet);
        this.bullet.body.debugShowVelocity = false;

        // Shoots at the carrier.
        this.physics.moveToObject(this.bullet, carrier, turret.bulletSpeed * 100);

        // Follows the carrier all the time.
        // setInterval(function() {
        //     this.physics.moveToObject(this.bullet, carrier, 230);
        // }.bind(this), 100);

        turret.delta = 0;

    }

    /**
     * The carrier is hit by a turret's bullet.
     * 
     * @param carrier The civilian that carries the infected virus.
     * @param turret The turret that cleans the carriers.
     */
    carrierHit(carrier, bullet) {
        // Updating the carrier HP.
        carrier.hp -= bullet.damage;

        // Updating the health bar.
        carrier.barHealth.clear();
        carrier.barHealth.fillStyle(0xffffff);
        var newWidth = Math.floor(30 * (carrier.hp / carrier.maxhp));

        // Checking if the virus is still alive.
        if (newWidth >= 0) {
            carrier.healthRect.width = newWidth;
        } else {
            this.money += 25;
            this.moneyText.setText("Money: " + this.money);
            carrier.clearTint();
            carrier.clean = true;
            this.carriers.remove(carrier);
            this.civilians.add(carrier);
            carrier.barBack.alpha = 0;
            carrier.barHealth.alpha = 0;
        }
        carrier.barHealth.fillRectShape(carrier.healthRect);
        bullet.destroy();
    }
}
import {
    Grid
} from "matter";
import Carrier from "../game_objects/ChallengeCarrier";
// import Turret1 from "../game_objects/Turret1";
// import Turret2 from "../game_objects/Turret2";
// import Turret3 from "../game_objects/Turret3";
import Bullet from "../game_objects/Bullet";
import {default as ChallengeConfig} from "../round_configs/ChallegeConfig.json";
import ChallengeCarrier from "../game_objects/ChallengeCarrier";




export class ChallengeScene extends Phaser.Scene {

    /**
     * Constructor for GameScene object.
     */
    constructor() {
        super('Challenge');
    }

    /**
     * Initializes the game.
     */
    init() {
        this.startChallengeAnimation();
        this.loggedIn = true;
        this.ChallengeConfig = ChallengeConfig;
        this.firstTime = true;
        this.challengeEnded = false;
        this.firstSpawn = true;

        // Starting the challenge after the five seconds
        setTimeout(function () {
            if (this.firstSpawn) {
                this.firstSpawn = false;
                this.timeStarted = new Date();
                this.startRound(this.ChallengeConfig);
            }
        }.bind(this), 8000);
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
     * Creates the grid, background images, path tiles, carriers, menu, and sidebar.
     */
    create() {
        // Create grid variables.
        this.width = this.sys.canvas.width;
        this.height = this.sys.canvas.height;
        this.ui = this.scene.get('ChallengeUI');
        this.cellWidth = 32;
        this.cellHeight = 32;
        this.halfCell = 16; // Used to move objects to center of cells
        const colCount = this.width / this.cellWidth; // 25 columns; use this.cellWidth * 24 for last column
        const rowCount = this.height / this.cellWidth; // 19 rows; use this.cellWidth * 18 for last row

        this.scene.launch('ChallengeUI');
        
        // Create and draw grid
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
        //Place city.
        this.add.image((this.cellWidth * 16)+20, this.cellWidth * rowCount - 1, 'city').setScale(0.9);

        // Create and draw a path.
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

        // Create description area.
        let infoContainer = this.add.container(this.width - 250, 10);
        this.descText = this.add.text(0, 0, '');
        this.costText = this.add.text(0, this.descText.getBottomCenter().y + 10, '');
        infoContainer.add(this.descText);
        infoContainer.add(this.costText);

        // Create resource information text
        this.health = 1;
        this.healthText = this.add.text(585, 25, "Health: " + this.health);
        this.healthText.depth = 1;
        this.healthText.setFill("brown");

        this.money = Infinity;
        this.money = Infinity;this.moneyText = this.add.text(585, this.healthText.getBottomCenter().y + 6, 'Money: ∞');
        this.moneyText.depth = 1;
        this.moneyText.setFill("brown");

        
            
        // Creating the game objects groups.
        this.createGroups();

        // Placing ones in the grid cell array in place of the buttons.
        this.placeButtonNumbers();
        
        // Creates and displays the display name / guest and best round
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                // User is signed in.
                this.loggedIn = true; 
                this.status = this.add.text(170, 10, "Playing as ");
                this.status.setFontFamily('Arial');
                this.status.setFontSize(15);
                this.status.setStroke('black', 3);
                this.displayName = this.add.text(245, 10, user.displayName);
                this.displayName.setFontFamily('Arial');
                this.displayName.setFontSize(15);
                this.displayName.setFill('red');
                this.displayName.setStroke('black', 3);

                this.bestRound = this.add.text(170, 30, "Best: " + user.bestRound);
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
                this.status = this.add.text(170, 10, "Playing as Guest");
                this.status.setFontFamily('Arial');
                this.status.setFontSize(15);
                this.status.setStroke('black', 3);

            }
        }.bind(this), function (error) {
            console.log(error);
        });        

        this.currentRoundText = this.add.text(570, this.moneyText.getBottomCenter().y + 6, "Challenge mode");
        this.currentRoundText.depth = 1;
        this.currentRoundText.setFill("brown");

        this.resourceBorder = this.add.image(630, 55, 'resourceBorder');
        // this.resourceBorder.setOrigin(0, 0);
        this.resourceBorder.setDisplaySize(320, 135);
    }

    lostGame() {
        this.firstTime = false;
        this.challengeEnded = true;
        this.timeEnded = new Date();
        this.timeSurvived = this.timeEnded - this.timeStarted;
        this.timeSurvived /= 1000;
        this.timeSurvived = Math.round(this.timeSurvived);
        this.newBackground = this.add.rectangle(0, 0, 800, 608, 0x000000);
        this.newBackground.setOrigin(0, 0);
        this.newBackground.depth = 2;
        this.newText = this.add.text(120, 270, "You survived for " + this.timeSurvived + " seconds");
        var msg = new SpeechSynthesisUtterance("You survived for " + this.timeSurvived + " seconds");
        window.speechSynthesis.speak(msg);
        this.newText.setFill('red');
        this.newText.setFontSize(35);
        this.newText.depth = 3;

        setTimeout(function () {
            location.reload();
        }, 4000);
    }

    /**
     * Create the carriers, civilians, turrets, and bullets.
     */
    createGroups() {
        this.carriers = this.physics.add.group({
            classType: ChallengeCarrier,
            runChildUpdate: true
        });
        this.civilians = this.physics.add.group({
            classType: ChallengeCarrier,
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

    startRound(config) {
        // Start directly for first time in order to give carrier group an active number immediately
        let carrier = new Carrier(this, this.path, this.cellWidth * 3 + this.halfCell, this.cellWidth * -1 + this.halfCell, 'carrier', config.duration, config.carrierHP);
        this.carriers.add(carrier);
        let intervaler = setInterval(function () {
            if (!this.challengeEnded) {
                let carrier = new Carrier(this, this.path, this.cellWidth * 3 + this.halfCell, this.cellWidth * -1 + this.halfCell, 'carrier', config.duration, config.carrierHP);
                this.carriers.add(carrier);
            }
        }.bind(this), config.carrierSpace);

        setTimeout(function () {
            clearInterval(intervaler);
        }.bind(this), (config.carrierCount - 1) * config.carrierSpace); 
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

    startChallengeAnimation() {
        // Creating the background for the challenge animation
        this.background = this.add.rectangle(0, 0, 800, 608, 0x8DFF7D);
        this.background.setOrigin(0, 0);
        this.background.depth = 2;

        // Removing the background after 4 seconds
        setTimeout(function () {
            this.background.alpha = 0;
            this.challenge.alpha = 0;
        }.bind(this), 4000);

        // Creating the challenge mode animation
        this.challenge = this.add.sprite(-45, 0, 'challengeMode');
        this.challenge.setOrigin(0, 0);
        this.challenge.setDisplaySize(800, 608);
        this.challenge.depth = 2;
        this.anims.create({
            key: 'startChallenge',
            duration: 2400,
            frames: this.anims.generateFrameNames('challengeMode', {start: 0, end: 60}),
            repeat: 1
        });
        this.challenge.play('startChallenge');
    }

    // endChallengeAnimation() {
    //     this.switchBackground = this.add.rectangle(0, 0, 800, 608, 0x000000);
    //     this.switchBackground.setOrigin(0, 0);
    //     let backgroundAlpha = 1;
    //     let interval = setInterval(function () {
    //         backgroundAlpha -= 0.05;
    //         this.switchBackground.alpha = backgroundAlpha;
    //     }.bind(this), 100);

    //     setTimeout(function () {
    //         clearInterval(interval);
    //         this.scene.start('Game');
    //     }.bind(this), 2000);
    // }

    /**
     * Update the physics.
     */
    update() {
        this.physics.overlap(this.carriers, this.turrets, this.fire.bind(this));
        this.physics.overlap(this.carriers, this.bullets, this.carrierHit.bind(this));
        if (this.health <= 0 && this.firstTime) {
            // Starting the lost game animation
            this.lostGame();
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
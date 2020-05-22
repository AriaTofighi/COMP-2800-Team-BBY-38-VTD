import Carrier from "../game_objects/ChallengeCarrier";
import Bullet from "../game_objects/Bullet";
import {default as ChallengeConfig} from "../round_configs/ChallegeConfig.json";
import ChallengeCarrier from "../game_objects/ChallengeCarrier";

const START_CHALLNGE_TIME = 8000;
const PLAYING_AS_X = 170;
const PLAYING_AS_Y = 10;
const BEST_ROUND_X = 170;
const BEST_ROUND_Y = 30;
const NAME_X = 245;
const NAME_Y = 10;
const TEXT_SIZE = 15;
const TEXT_STROKE = 3;
const MS_TO_S = 1000;
const GAME_WIDTH = 800;
const GAME_HEIGHT = 608;
const SURVIVE_X = 120;
const SURVIVE_Y = 270;
const SURVIVE_SIZE = 35;
const RESTART_TIME = 4000;
const CHALLENGE_ANIMATION_DURATION = 4000;

/**
 * ChallengeScene is the easter egg of the game and it is basically
 * a special survivial version of the game with special amount of resources
 * and round configurations. The player has unlimited amount of money
 * with a health of 1. The player can enter this mode with either typing 'death'
 * on the game scene to dragging the current round text.
 */
export class ChallengeScene extends Phaser.Scene {

    /**
     * Constructor for ChallengeScene object.
     */
    constructor() {
        /**
         * Constructor for Phaser.Scene object.
         */
        super('Challenge');
    }

    /**
     * Initializes the Challenge.
     */
    init() {
        this.startChallengeAnimation();
        this.loggedIn = true;
        this.ChallengeConfig = ChallengeConfig;
        this.firstTime = true;
        this.challengeEnded = false;
        this.firstSpawn = true;

        // Starting the challenge round after the eight seconds
        setTimeout(function () {
            if (this.firstSpawn) {
                this.firstSpawn = false;
                this.timeStarted = new Date();
                this.startRound(this.ChallengeConfig);
            }
        }.bind(this), START_CHALLNGE_TIME);
    }

    /**
     * Set up the challenge scene entities.
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
        this.ui = this.scene.get('ChallengeUI');

        this.cellWidth = 32;
        this.cellHeight = 32;
        this.halfCell = 16;
        const colCount = this.width / this.cellWidth;
        const rowCount = this.height / this.cellWidth;
        
        // Create and draw grid
        let grid = this.add.grid(0, 0, this.cellWidth * colCount, 
            this.cellWidth * rowCount, this.cellWidth, this.cellWidth, 0x000000, 0, 0x222222, 0);
        grid.setDepth(1);
        grid.setOrigin(0, 0);

        //Create background image.
        let bg = this.add.tileSprite(this.width / 2, this.height / 2, this.width, this.height, 'bg');

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

        // Create the watershoot animation
        this.anims.create({
            key: 'watershoot',
            frames: this.anims.generateFrameNumbers('water', {start: 3, end: 5}),
            repeat: -1,
            frameRate: 20
        });
        
        // Create and draw path
        let graphics = this.add.graphics();
        graphics.lineStyle(1, 0xFFFFFF);
        this.path = this.add.path(this.cellWidth * 3 + this.halfCell, this.cellWidth * -1 + this.halfCell);
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
        this.path.lineTo(this.cellWidth * 16 + this.halfCell, this.cellWidth * 19 + this.halfCell);

        // Create description area.
        let infoContainer = this.add.container(this.width - 250, 10);
        this.descText = this.add.text(0, 0, '');
        this.costText = this.add.text(0, this.descText.getBottomCenter().y + 10, '');
        infoContainer.add(this.descText);
        infoContainer.add(this.costText);
            
        // Creating the game objects groups.
        this.createGroups();

        // Placing ones in the grid cell array in place of the buttons.
        this.placeButtonNumbers();
        
        // Creates and displays the display name / guest and best round
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                // User is signed in.
                this.loggedIn = true; 
                this.status = this.add.text(PLAYING_AS_X, PLAYING_AS_Y, "Playing as ");
                this.status.setFontFamily('Arial');
                this.status.setFontSize(TEXT_SIZE);
                this.status.setStroke('black', TEXT_STROKE);
                this.displayName = this.add.text(NAME_X, NAME_Y, user.displayName);
                this.displayName.setFontFamily('Arial');
                this.displayName.setFontSize(TEXT_SIZE);
                this.displayName.setFill('red');
                this.displayName.setStroke('black', TEXT_STROKE);

                this.bestRound = this.add.text(BEST_ROUND_X, BEST_ROUND_Y, "Best: " + user.bestRound);
                this.bestRound.setFontFamily('Arial');
                this.bestRound.setFontSize(TEXT_SIZE);
                this.bestRound.setStroke('black', TEXT_STROKE);

                // Listens for changes in the user's best round and updates screen text
                this.db.collection("users").doc(user.uid).onSnapshot(function (userDoc) {
                let userBestRound = userDoc.data()["bestRound"];
                this.bestRound.setText("Best round: " + userBestRound);
        }.bind(this));
            } else {
                // User is not signed in.
                this.loggedIn = false; 
                this.status = this.add.text(PLAYING_AS_X, PLAYING_AS_Y, "Playing as Guest");
                this.status.setFontFamily('Arial');
                this.status.setFontSize(TEXT_SIZE);
                this.status.setStroke('black', TEXT_STROKE);

            }
        }.bind(this), function (error) {
            console.log(error);
        });
    }

    /**
     * All the events that happen once the challenge is finished.
     */
    lostGame() {
        this.scene.remove('ChallengeUI');
        this.firstTime = false;
        this.challengeEnded = true;
        this.timeEnded = new Date();
        this.timeSurvived = this.timeEnded - this.timeStarted;
        this.timeSurvived /= MS_TO_S;
        this.timeSurvived = Math.round(this.timeSurvived);
        this.newBackground = this.add.rectangle(0, 0, GAME_WIDTH, GAME_HEIGHT, 0x000000);
        this.newBackground.setOrigin(0, 0);
        this.newBackground.depth = 2;
        this.newText = this.add.text(SURVIVE_X, SURVIVE_Y, "You survived for " + this.timeSurvived + " seconds");
        var msg = new SpeechSynthesisUtterance("You survived for " + this.timeSurvived + " seconds");
        window.speechSynthesis.speak(msg);
        this.newText.setFill('red');
        this.newText.setFontSize(SURVIVE_SIZE);
        this.newText.depth = 3;

        // Redirect back to the game after 4 seconds.
        setTimeout(function () {
            location.reload();
        }, RESTART_TIME);
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
     * Change the numbers on the grid to disallow
     * placing towers on specific places.
     * 
     * @param num either one or zero based on if the sidebar is open or close
     */
    placeSidebarNumbers(num) {
        return function () {
            for (let i = 3; i <= 14; i++) {
                for (let j = 22; j <= 25; j++) {
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
        // Placing 1s in the place of the cancel button and the menu button.
        for (let i = 15; i <= 18; i++) {
            for (let j = 23; j <= 24; j++) {
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
     * @return True if it is a path tile, false otherwise.
     */
    isPathTile(i, j) {
        if (this.gridCells[i] == undefined || this.gridCells[i][j] == undefined) {
            return undefined;
        }
        //Check if given values are inbounds first.
        return this.gridCells[i][j] === 1;
    }

    /**
     * Starts the challenge animation.
     */
    startChallengeAnimation() {

        // Creating the background for the challenge animation
        this.background = this.add.rectangle(0, 0, 800, 608, 0x8DFF7D);
        this.background.setOrigin(0, 0);
        this.background.depth = 3;

        // Removing the challenge animation after 4 seconds
        setTimeout(function () {
            this.background.alpha = 0;
            this.challenge.alpha = 0;
            this.scene.launch('ChallengeUI');
        }.bind(this), CHALLENGE_ANIMATION_DURATION);

        // Creating the challenge mode animation
        this.challenge = this.add.sprite(-45, 0, 'challengeMode');
        this.challenge.setOrigin(0, 0);
        this.challenge.setDisplaySize(800, 608);
        this.challenge.depth = 3;
        this.anims.create({
            key: 'startChallenge',
            duration: 2400,
            frames: this.anims.generateFrameNames('challengeMode', {start: 0, end: 60}),
            repeat: 1
        });
        this.challenge.play('startChallenge');
    }

    /**
     * Update the physics.
     */
    update() {
        this.physics.overlap(this.carriers, this.turrets, this.fire.bind(this));
        this.physics.overlap(this.carriers, this.bullets, this.carrierHit.bind(this));
        
        // Checking if the player has lost
        if (this.ui.health <= 0 && this.firstTime) {
            // Starting the lost game animation
            this.lostGame();
        }
    }

    /**
     * Placing towers on the game.
     * 
     * @param turret the turret that will be placed
     * @param i the i location of the tower
     * @param j the j location of the tower
     */
    placeTower(turret, i, j){
        this.turrets.add(turret);
        this.gridCells[i][j] = 1;
    }

    /**
     * Fires bullets to the carriers.
     * 
     * @param carrier the carrier that is getting hit 
     * @param turret the turret that is firing bullets
     */
    fire(carrier, turret){
        turret.fire(carrier);
    }

    /**
     * Detecting the overlap between the bullet and the carrier.
     * 
     * @param carrier the carrier that has got hit
     * @param bullet the bullet that hit the carrier
     */
    carrierHit(carrier, bullet){
        carrier.getHit(bullet);
    }
}
import { Grid } from "matter";
import Carrier from "../game_objects/Carrier";
import Turret from "../game_objects/Turret";
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
        this.tower1IsSelected = false;
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
        let height = this.sys.canvas.height; 
        this.cellWidth = 32;
        this.cellHeight = 32;
        this.halfCell = 16; // Used to move objects to center of cells
        const colCount = this.width / this.cellWidth; // 25 columns; use this.cellWidth * 24 for last column
        const rowCount = height / this.cellWidth; // 19 rows; use this.cellWidth * 18 for last row
        
        // Create and draw grid
        let grid = this.add.grid(0, 0, this.cellWidth * colCount , this.cellWidth * rowCount, this.cellWidth, this.cellWidth, 0x000000, 0, 0x222222, 0); // change last param to 1 to see grid lines
        grid.setDepth(1);
        grid.setOrigin(0, 0);
        
        //Create background image.
        let bg = this.add.image(this.width/2, height/2, 'bg');
        bg.setDisplaySize(this.width, height);

        //Create path tiles.
        let tileX, tileY
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

        // Creates carrier on A keyboard press
        this.input.keyboard.on('keydown-A', function() {
            console.log(this.carriers.countActive());
            // console.log("A pressed");
            // let carrier = new Carrier(this, this.path, this.cellWidth * 3 + this.halfCell, this.cellWidth * -1 + this.halfCell, 'carrier', this.round1Duration, this.round1CarrierHP);
            // this.carriers.add(carrier);

            // Making the bullet follow this carrier
            // setInterval(function() {
            //     this.physics.moveToObject(this.bullet, this.carrier, 230);
            // }.bind(this), 100);

        }.bind(this));

        // Start round text button
        this.startRoundText = this.add.text(180, 20, "Start Round");
        this.startRoundText.setInteractive({cursor: 'pointer'});
        this.startRoundText.once('pointerdown', function() {
            this.startRound(this.roundConfigs[0]);
        }.bind(this));
        this.startRoundText.on('pointerover', function() {
            this.startRoundText.setStyle({
                color: '#0C0F12'
            })
            this.startRoundText.setColor(0x0c0f12);
        }.bind(this));
        this.startRoundText.on('pointerout', function() {
            this.startRoundText.setStyle({
                color: '#FFFFFF'
            })
        }.bind(this));
     
        //Create sidebar
        this.sidebar = this.add.container(this.width, height / 2 - 200);
        let sidebox = this.add.graphics();
        this.sidebar.depth = 1;
        this.sidebar.add(sidebox);
        sidebox.fillStyle(0xff0000);
        sidebox.fillRect(0, 0, 100, 400);

        //Create first tower in menu.
        let menuTower1 = this.add.image(54, 64, 'tower1');
        menuTower1.setInteractive().on('pointerdown', () => {
            // Tower has been selected
            // this.toggleSidebar();
            this.tower1IsSelected = true;
            descText.setText("Description: Soap Tower");
            costText.setText("Cost: 100");
            cancelButton.alpha = 1;

            // Create cursor grid cell hover image and draw
            this.createTile();
        });

        // Creating the cancel button
        let cancelButton = this.add.image(54, 370, 'cancelButton');
        cancelButton.setDisplaySize(64, 64);
        cancelButton.alpha = 0;
        cancelButton.setInteractive().on('pointerdown', function() {
            this.tower1IsSelected = false;
            descText.setText("");
            costText.setText("");
            cancelButton.alpha = 0;
        }.bind(this));

        // Add Tower 1 and cancel button to the this.sidebar
        this.sidebar.add(menuTower1);
        this.sidebar.add(cancelButton);

        // Create menu toggle button
        let menuButton = this.add.rectangle(this.width - 20, height - 20, 40, 40, 0x00ff00);
        menuButton.depth = 1;
        menuButton.setInteractive();
        this.menuShowing = false;
        // On-click of menu toggle button
        menuButton.on('pointerdown', () => {
            this.toggleSidebar();
        });

        // Create description area.
        let infoContainer = this.add.container(this.width - 250, 10);
        let descText = this.add.text(0, 0, '');
        let costText = this.add.text(0, descText.getBottomCenter().y + 10, '');
        infoContainer.add(descText);
        infoContainer.add(costText);

        // Create and draw bullet
        // this.bullet = this.physics.add.image(this.cellWidth * 15 + this.halfCell, this.cellWidth * 18 + this.halfCell, 'bullet');
        // this.bullet.setDisplaySize(32, 32);
        // this.bullet.body.debugShowVelocity = false;
        // this.bullet.body.debugShowBody = false;
        // this.bullet.setInteractive();

        // Create resource information text
        this.health = 100;
        this.healthText = this.add.text(this.width / 2, 10, "Health: " + this.health);
        this.money = 400;
        this.moneyText = this.add.text(this.width / 2, this.healthText.getBottomCenter().y + 10, 'Money: ' + this.money);

        this.input.keyboard.on('keydown-M', function() {
            this.money += 100;
            this.moneyText.setText("Money: " + this.money);
        }.bind(this));

        // Creating Pause button
        const pauseButton = this.add.image(1 * 32, 1 * 32, 'pauseButton');
        pauseButton.setInteractive().on('pointerdown', function () {
            // Make carrier
            let carrier = new Carrier(this, this.path, this.cellWidth * 3 + this.halfCell, this.cellWidth * -1 + this.halfCell, 'carrier', this.round1Duration, this.round1CarrierHP);
            this.carriers.add(carrier);

            console.log("Pause button pressed!");
        }.bind(this));

        // Creating the game objects groups
        this.createGroups();

        this.currentRoundText = this.add.text(180, 40, "Current round: " + this.currentRound);
    }

    incrementDefaultConfig() {
        this.rDefaultConfig.round1Duration -= 1000; 
        this.rDefaultConfig.carrierHP += 5;
        this.rDefaultConfig.carrierCount += 5;
        this.rDefaultConfig.carrierSpace -= 25;
        console.log("default config adjusted");
    }

    startRound(config) {
            this.currentRound += 1;
            this.currentRoundText.setText("Current round: " + this.currentRound);
            console.log("Starting round " + this.currentRound);
            console.log("Config for this round: " + JSON.stringify(config));
            this.startRoundText.disableInteractive();
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
            this.startRoundText.once('pointerdown', function() {
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

    createGroups() {
        this.carriers = this.physics.add.group({ classType: Carrier, runChildUpdate: true });
        this.turrets = this.physics.add.group({ classType: Turret, runChildUpdate: true });
        this.bullets = this.physics.add.group({ classType: Bullet, runChildUpdate: true});
    }

    // Retracts or expands sidebar
    toggleSidebar() {
        if (!this.menuShowing) {
            this.tweens.add({
                targets: this.sidebar,
                x: this.width - 100,
                duration: 200
            });
            this.menuShowing = true;
        } else {
            this.tweens.add({
                targets: this.sidebar,
                x: this.width + 100,
                duration: 200
            });
            this.menuShowing = false;
        }
    }

    /**
     * Create the tiles.
     */
    createTile() {
        // showing the turret example with its radius
        this.turretExampleRadius = this.add.circle(0, 0, 60, 0xECDBDB);
        this.turretExampleRadius.alpha = 0.8;
        this.turretExampleRadius.setStrokeStyle(3, 0x046307, 0.8);

        this.turretExample = this.add.image(0, 0, 'tower1');
        this.turretExample.setOrigin(0, 0);
        this.turretExample.setDisplaySize(32, 32);
        this.turretExample.alpha = 0;

        // showing no turret is allowed here
        this.noTurretHere = this.add.image(0, 0, 'noTurret');
        this.noTurretHere.setDisplaySize(32, 32);
        this.noTurretHere.setOrigin(0, 0);
        this.noTurretHere.alpha = 0;
        // Determines if the cursor is over a valid tile for tower placement
        this.input.on('pointermove', function (pointer) {
            let i = Math.floor(pointer.y / 32); // Row index
            let j = Math.floor(pointer.x / 32); // Column index
            
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
            } else {
                this.turretExample.alpha = 0;
                this.turretExampleRadius.alpha = 0;
                this.turretExampleRadius.setStrokeStyle(3, 0x046307, 0);
                this.noTurretHere.alpha = 0;
            }

        }.bind(this));

        // Place tower
        this.input.on('pointerdown', function (pointer) {
            let i = Math.floor(pointer.y / 32); // row index
            let j = Math.floor(pointer.x / 32); // col index
            if (this.tower1IsSelected && !this.isPathTile(i, j) && this.money >= 100) {
                this.turret = new Turret(this, j, i);
                this.turrets.add(this.turret);
                this.money -= this.turret.price;
                this.moneyText.setText('Money: ' + this.money);
                // this.toggleSidebar();
            }
        }.bind(this));
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
        
        this.startRoundText.setText("Start Round " + (this.currentRound + 1)); // add 1 to show queued up round

        // Disables/enables the round start button if there are/aren't active carriers
        if (this.carriers.countActive() == 0) {
            this.startRoundText.setInteractive();
            this.startRoundText.alpha = 1;
        } else {
            this.startRoundText.disableInteractive();
            this.startRoundText.alpha = 0;
        }
    }

    // Fires a turret shot at a carrier (must be here, NOT Turret.js for access to groups)
    fire(carrier, turret) {
        if (!(turret.delta >= 1000 / turret.fireRate)) {
            return;
        }
        // console.log("fire");

        // Rotating the turret towards the carrier when firing
        var angle = Phaser.Math.Angle.Between(turret.x, turret.y, carrier.x, carrier.y);
        turret.setRotation(angle);

        // Creating a bullet
        this.bullet = new Bullet(this, turret.x, turret.y);
        this.bullets.add(this.bullet);
        this.bullet.body.debugShowVelocity = false;

        // Shoots at the carrier
        this.physics.moveToObject(this.bullet, carrier, turret.bulletSpeed * 100);

        // Follows the carrier all the time
        // setInterval(function() {
        //     this.physics.moveToObject(this.bullet, carrier, 230);
        // }.bind(this), 100);

        turret.delta = 0;

    }

    // Triggered when the carrier has been struck by a bullet
    carrierHit(carrier, bullet) {
        // Updating the carrier hp
        carrier.hp -= bullet.damage;

        // Updating the health bar
        carrier.barHealth.clear();
        carrier.barHealth.fillStyle(0xffffff);
        var newWidth =  Math.floor(30 * (carrier.hp / carrier.maxhp));
        
        // Checking if the virus is still alive
        if (newWidth >= 0) {
            carrier.healthRect.width = newWidth;
        } else {
            this.money += 25;
            this.moneyText.setText("Money: " + this.money);
            carrier.destroy();
            carrier.barBack.alpha = 0;
            carrier.barHealth.alpha = 0;
        }
        carrier.barHealth.fillRectShape(carrier.healthRect);
        bullet.destroy();
    }
}

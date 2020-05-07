import { Grid } from "matter";
import Carrier from "../game_objects/Carrier";
import Turret1 from "../game_objects/Turret1";
import Turret2 from "../game_objects/Turret2";
import Turret3 from "../game_objects/Turret3";
import Bullet from "../game_objects/Bullet";

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
        this.tower1IsSelected = false;
        this.tower2IsSelected = false;
        this.tower3IsSelected = false;
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
            [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];
    }

    /**
     * Creates the grid, background images, path tiles, carriers, menu, and sidebar.
     */
    create() {
        // Begin writing game objects/logic here
        // this.add.image(200, 100, 'carrier');
        // this.add.image(300, 100, 'tile');
        // this.add.image(400, 100, 'tower1');

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
                    if (i == 10 && j == 3) { // grid index coordinates for the path corner
                        pathTile = this.add.image(tileX, tileY, 'corner');
                        pathTile.setRotation(Math.PI);
                    } else {
                        pathTile = this.add.image(tileX, tileY, 'road');
                        if (this.isPathTile(i + 1, j))
                            pathTile.setRotation(-Math.PI / 2);
                    }
                    pathTile.setDisplaySize(32, 32);
                } 
            }
        }

        // Create and draw path
        let graphics = this.add.graphics();
        graphics.lineStyle(1, 0xFFFFFF);
        let path = this.add.path(this.cellWidth * 3 + this.halfCell, 0 + this.halfCell);
        path.lineTo(this.cellWidth * 3 + this.halfCell, this.cellWidth * 10 + this.halfCell);
        path.lineTo(this.cellWidth * 24 + this.halfCell, this.cellWidth * 10 + this.halfCell);
        // path.draw(graphics);

        // Creates carrier on A keyboard press
        this.input.keyboard.on('keydown-A', function() {
            // console.log("A pressed");
            this.carrier = new Carrier(this, path, this.cellWidth * 3 + 16, 0 + 16, 'carrier');
            this.carriers.add(this.carrier);

            // Making the bullet follow this carrier
            // setInterval(function() {
            //     this.physics.moveToObject(this.bullet, this.carrier, 230);
            // }.bind(this), 100);

        }.bind(this));

        //Create sidebar
        this.sidebar = this.add.container(this.width, height / 2 - 200);
        let sidebox = this.add.graphics();
        this.sidebar.depth = 1;
        this.sidebar.add(sidebox);
        sidebox.fillStyle(0xff0000);
        sidebox.fillRect(4, -9, 96, 384);

        //Create first tower in menu
        let menuTower1 = this.add.image(54, 35, 'tower1');
        menuTower1.setInteractive().on('pointerdown', () => {
            // Tower1 has been selected
            // this.toggleSidebar();
            this.tower1IsSelected = true;
            this.tower2IsSelected = false;
            this.tower3IsSelected = false;
            descText.setText("Description: Water Tower");
            costText.setText("Cost: 100");
            cancelButton.alpha = 1;

            // Create cursor grid cell hover image
            this.showTurretExample();
        });

        // Create second tower in menu
        let menuTower2 = this.add.image(54, 131, 'tower2');
        menuTower2.setInteractive().on('pointerdown', () => {
            // Tower2 has been selected
            this.tower1IsSelected = false;
            this.tower2IsSelected = true;
            this.tower3IsSelected = false;
            descText.setText("Description: Soap Tower");
            costText.setText("Cost: 200");
            cancelButton.alpha = 1;

            // Create cursor grid cell hover image
            this.showTurretExample();
        });

        // Create third tower in menu
        let menuTower3 = this.add.image(54, 227, 'tower3');
        menuTower3.setInteractive().on("pointerdown", () => {
            // Tower3 has been selected
            this.tower1IsSelected = false;
            this.tower2IsSelected = false;
            this.tower3IsSelected = true;
            descText.setText("Description: Sanitizer");
            costText.setText("Cost: 300");
            cancelButton.alpha = 1;

            // Create cursor grid cell hover image
            this.showTurretExample();
        });

        // Creating the cancel button
        let cancelButton = this.add.image(54, 318, 'cancelButton');
        cancelButton.setDisplaySize(64, 64);
        cancelButton.alpha = 0;
        cancelButton.setInteractive().on('pointerdown', function () {
            this.tower1IsSelected = false;
            this.tower2IsSelected = false;
            this.tower3IsSelected = false;
            descText.setText("");
            costText.setText("");
            cancelButton.alpha = 0;
        }.bind(this));

        // Add all the buttons to the sidebar
        this.sidebar.add(menuTower1);
        this.sidebar.add(menuTower2);
        this.sidebar.add(menuTower3);
        this.sidebar.add(cancelButton);

        // Create menu toggle button
        // let menuButton = this.add.rectangle(this.width - 20, height - 20, 40, 40, 0x00ff00);
        // menuButton.depth = 1;
        // On-click of menu toggle button
        // menuButton.on('pointerdown', () => {
        //     this.toggleSidebar();
        // });

        // Create menu toggle button
        this.menuShowing = false;
        this.menuButton = this.add.image(this.width - 32, height - 32, 'menuButton');
        this.menuButton.setDisplaySize(64, 64);
        // On-click of menu toggle button
        this.menuButton.setInteractive().on('pointerdown', () => {
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
        this.money = 10000;
        this.moneyText = this.add.text(this.width / 2, this.healthText.getBottomCenter().y + 10, 'Money: ' + this.money);

        // Creating Pause button
        const pauseButton = this.add.image(1 * 32, 1 * 32, 'pauseButton');
        pauseButton.setInteractive().on('pointerdown', function () {
            // Make carrier
            this.carrier = new Carrier(this, path, this.cellWidth * 3 + 16, 0 + 16, 'carrier');
            this.carriers.add(this.carrier);

            console.log("Pause button pressed!");
        }.bind(this));

        // Creating the game objects groups
        this.createGroups();

        // Placing ones in the grid cell array in place of the buttons
        this.placeButtonNumbers();
    }

    createGroups() {
        this.carriers = this.physics.add.group({ classType: Carrier, runChildUpdate: true });
        this.turrets = this.physics.add.group({ runChildUpdate: true });
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
            // Placing ones in the place of sidebar on the grid array
            this.placeSidebarNumbers(1);
            this.menuShowing = true;
        } else {
            this.tweens.add({
                targets: this.sidebar,
                x: this.width + 100,
                duration: 200
            });
            // Placing zeros in the place of sidebar on the grid array
            this.placeSidebarNumbers(0)
            this.menuShowing = false;
        }
    }

    showTurretExample() {
        if (this.tower1IsSelected) {
            // showing the turret example with its radius
            this.turretExampleRadius = this.add.circle(0, 0, 60, 0xECDBDB);
            this.turretExampleRadius.alpha = 0.8;
            this.turretExampleRadius.setStrokeStyle(3, 0x046307, 0.8);

            this.turretExample = this.add.image(0, 0, 'tower1');
            this.turretExample.setOrigin(0, 0);
            this.turretExample.setDisplaySize(32, 32);
            this.turretExample.alpha = 0;

            // showing no turret is allowed here
            this.noTurretHere = this.add.image(0, 0, 'noTurret1');
            this.noTurretHere.setDisplaySize(32, 32);
            this.noTurretHere.setOrigin(0, 0);
            this.noTurretHere.alpha = 0;
        }
        else if (this.tower2IsSelected) {
            // showing the turret example with its radius
            this.turretExampleRadius = this.add.circle(0, 0, 85, 0xECDBDB);
            this.turretExampleRadius.alpha = 0.8;
            this.turretExampleRadius.setStrokeStyle(3, 0x046307, 0.8);

            this.turretExample = this.add.image(0, 0, 'tower2');
            this.turretExample.setOrigin(0, 0);
            this.turretExample.setDisplaySize(32, 32);
            this.turretExample.alpha = 0;

            // showing no turret is allowed here
            this.noTurretHere = this.add.image(0, 0, 'noTurret2');
            this.noTurretHere.setDisplaySize(32, 32);
            this.noTurretHere.setOrigin(0, 0);
            this.noTurretHere.alpha = 0;
        }
        else if (this.tower3IsSelected) {
            // showing the turret example with its radius
            this.turretExampleRadius = this.add.circle(0, 0, 100, 0xECDBDB);
            this.turretExampleRadius.alpha = 0.8;
            this.turretExampleRadius.setStrokeStyle(3, 0x046307, 0.8);

            this.turretExample = this.add.image(0, 0, 'tower3');
            this.turretExample.setOrigin(0, 0);
            this.turretExample.setDisplaySize(32, 32);
            this.turretExample.alpha = 0;

            // showing no turret is allowed here
            this.noTurretHere = this.add.image(0, 0, 'noTurret3');
            this.noTurretHere.setDisplaySize(32, 32);
            this.noTurretHere.setOrigin(0, 0);
            this.noTurretHere.alpha = 0;
        }
        
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
            }
            else if (this.tower2IsSelected) {
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
            }
            else if (this.tower3IsSelected) {
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
            }
            else {
                this.turretExample.alpha = 0;
                this.turretExampleRadius.alpha = 0;
                this.turretExampleRadius.setStrokeStyle(3, 0x046307, 0);
                this.noTurretHere.alpha = 0;
            }

        }.bind(this));

        // Place tower
        this.input.on('pointerdown', this.placeTower.bind(this));
    }

    placeTower(pointer) {
        let i = Math.floor(pointer.y / 32); // row index
        let j = Math.floor(pointer.x / 32); // col index

        if (this.tower1IsSelected && !this.isPathTile(i, j) && this.money >= 100) {
            this.turret = new Turret1(this, j, i);
            this.turrets.add(this.turret);
            this.money -= this.turret.price;
            this.moneyText.setText('Money: ' + this.money);
            this.gridCells[i][j] = 1;
            // this.toggleSidebar();
        } else if (this.tower2IsSelected && !this.isPathTile(i, j) && this.money >= 200) {
            this.turret = new Turret2(this, j, i);
            this.turrets.add(this.turret);
            this.money -= this.turret.price;
            this.moneyText.setText('Money: ' + this.money);
            this.gridCells[i][j] = 1;
            // this.toggleSidebar();
        } else if (this.tower3IsSelected && !this.isPathTile(i, j) && this.money >= 300) {
            this.turret = new Turret3(this, j, i);
            this.turrets.add(this.turret);
            this.money -= this.turret.price;
            this.moneyText.setText('Money: ' + this.money);
            this.gridCells[i][j] = 1;
            // this.toggleSidebar();
        }
    }

    placeSidebarNumbers(num) {
        for (let i = 3; i <= 14; i++) {
            for (let j = 23; j <= 25; j++) {
                this.gridCells[i][j] = num;
            }
        }
    }

    placeButtonNumbers() {
        // Placing ones in the place of the pause button
        for (let i = 0; i <= 1; i++) {
            for (let j = 0; j <= 1; j++) {
                this.gridCells[i][j] = 1;
            }
        }
        
        // Placing ones in the place of the menu button
        for (let i = 17; i <= 18; i++) {
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

    carrierHit(carrier, bullet) {
        // Updating the carrier hp
        carrier.hp -= bullet.damage;

        // Updating the health bar
        carrier.barHealth.clear();
        carrier.barHealth.fillStyle(0xffffff);
        var newWidth =  Math.floor(30 * (carrier.hp / 100.0));
        
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

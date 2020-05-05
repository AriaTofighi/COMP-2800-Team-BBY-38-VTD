import { Grid } from "matter";
import Carrier from "../game_objects/Carrier";
import Turret from "../game_objects/Turret";
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
        let width = this.sys.canvas.width;
        let height = this.sys.canvas.height; 
        this.cellWidth = 32;
        this.cellHeight = 32;
        this.halfCell = 16; // Used to move objects to center of cells
        const colCount = width / this.cellWidth; // 25 columns; use this.cellWidth * 24 for last column
        const rowCount = height / this.cellWidth; // 19 rows; use this.cellWidth * 18 for last row
        
        // Create and draw grid
        let grid = this.add.grid(0, 0, this.cellWidth * colCount , this.cellWidth * rowCount, this.cellWidth, this.cellWidth, 0x000000, 0, 0x222222, 0); // change last param to 1 to see grid lines
        grid.setDepth(1);
        grid.setOrigin(0, 0);
        
        //Create background image.
        let bg = this.add.image(width/2, height/2, 'bg');
        bg.setDisplaySize(width, height);

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
            console.log("A pressed");
            this.carrier = new Carrier(this, path, this.cellWidth * 3 + 16, 0 + 16, 'carrier');
            this.carriers.add(this.carrier);

            // Making the bullet follow this carrier
            // setInterval(function() {
            //     this.physics.moveToObject(this.bullet, this.carrier, 230);
            // }.bind(this), 100);

        }.bind(this));

        //Create sidebar
        let sidebar = this.add.container(width, height / 2 - 200);
        let sidebox = this.add.graphics();
        sidebar.depth = 1;
        sidebar.add(sidebox);
        sidebox.fillStyle(0xff0000);
        sidebox.fillRect(0, 0, 100, 400);

        //Create first tower in menu.
        let menuTower1 = this.add.image(54, 64, 'tower1');
        menuTower1.setInteractive().on('pointerdown', () => {
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
        cancelButton.setInteractive().on('pointerdown', function () {
            this.tower1IsSelected = false;
            descText.setText("");
            costText.setText("");
            cancelButton.alpha = 0;
        }.bind(this));

        // Add Tower 1 and cancel button to the sidebar
        sidebar.add(menuTower1);
        sidebar.add(cancelButton);

        //Create menu toggle button
        let menuButton = this.add.rectangle(width - 20, height - 20, 40, 40, 0x00ff00);
        menuButton.depth = 1;
        let menuShowing = false;
        menuButton.setInteractive();
        menuButton.on('pointerdown', () => {
            if (!menuShowing) {
                this.tweens.add({
                    targets: sidebar,
                    x: width - 100,
                    duration: 200
                });
                menuShowing = true;
            } else {
                this.tweens.add({
                    targets: sidebar,
                    x: width + 100,
                    duration: 200
                });
                menuShowing = false;
            }
        });

        //Create description area.
        let infoContainer = this.add.container(width - 250, 10);
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

        // // Create and draw a circle to test overlap/collision
        // this.circle1 = this.add.circle(this.cellWidth * 4 + this.halfCell, this.cellHeight * 4 + this.halfCell, 40, 0x008080 , 0.2);
        // this.circle1.setStrokeStyle(2, 0x046307, 0.8);
        // this.circle2 = this.add.circle(this.cellWidth * 7 + this.halfCell, this.cellHeight * 9 + this.halfCell, 40, 0x008080 , 0.2);
        // this.circle2.setStrokeStyle(2, 0x046307, 0.8);

        // this.physics.world.enable(this.circle1);
        // this.circle1.body.setCircle(40);
        // this.physics.world.enable(this.circle2);
        // this.circle2.body.setCircle(40);

        // // Removes debug outline of physics body
        // this.circle1.body.debugShowBody = false;
        // this.circle2.body.debugShowBody = false;

        // Create resource information text
        this.health = 100;
        this.healthText = this.add.text(width / 2, 10, "Health: " + this.health);
        this.money = 1000;
        this.moneyText = this.add.text(width / 2, this.healthText.getBottomCenter().y + 10, 'Money: ' + this.money);

        // Creating Pause button
        const pauseButton = this.add.image(1 * 32, 1 * 32, 'pauseButton');
        pauseButton.setInteractive().on('pointerdown', function () {
            console.log("Pause button pressed!");
        }.bind(this));

        // Creating the game objects groups
        this.createGroups();
    }

    createGroups() {
        this.carriers = this.physics.add.group({ classType: Carrier, runChildUpdate: true });
        this.turrets = this.physics.add.group({ classType: Turret, runChildUpdate: true });
        this.bullets = this.physics.add.group({ classType: Bullet, runChildUpdate: true});
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

        this.input.on('pointerdown', function (pointer) {
            let i = Math.floor(pointer.y / 32); // row index
            let j = Math.floor(pointer.x / 32); // col index

            if (this.tower1IsSelected && !this.isPathTile(i, j)) {
                this.turret = new Turret(this, j, i);
                this.turrets.add(this.turret);
                this.money -= this.turret.price;
                this.moneyText.setText('Money: ' + this.money);
            }
        }.bind(this));
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
        this.physics.overlap(this.carriers, this.bullets, this.destroyBullet.bind(this));
        // console.log(this.carrier);
        // this.physics.overlap(this.carrier, this.circle1, this.overlap1.bind(this));
        // this.physics.overlap(this.carrier, this.circle2, this.overlap2.bind(this));
    }

    // /**
    //  * Check for overlap on Circle 1. If there's overlap, subtract health.
    //  */
    // overlap1() {
    //     console.log("Circle1 hit.");
    //     this.health = this.health - 0.25;
    //     if (this.health <= 0) {
    //         this.carrier.alpha = 0;
    //         this.carrier.body.destroy();
    //     }
    //     this.healthText.setText("Health: " + this.health.toFixed(0));
    // }

    // /**
    //  * Check for overlap on Circle 2. If there's overlap, subtract health.
    //  */
    // overlap2() {
    //     console.log("Circle2 hit.");
    //     this.health = this.health - 0.25;
    //     if (this.health <= 0) {
    //         this.carrier.alpha = 0;
    //         this.carrier.body.destroy();
    //     }
    //     this.healthText.setText("Health: " + this.health.toFixed(0));
    // }

    fire(carrier, turret) {
        console.log("fire");
        // Updating the carrier hp
        carrier.hp -= 1;

        // Updating the health bar
        carrier.barHealth.clear();
        carrier.barHealth.fillStyle(0xffffff);
        var newWidth =  Math.floor(30 * (carrier.hp / 100.0));
        
        // Checking if the virus is still alive
        if (newWidth >= 0) {
            carrier.healthRect.width = newWidth;
        } else {
            carrier.destroy();
            carrier.barBack.alpha = 0;
            carrier.barHealth.alpha = 0;
        }
        carrier.barHealth.fillRectShape(carrier.healthRect);

        // Rotating the turret towards the carrier when firing
        var angle = Phaser.Math.Angle.Between(turret.x, turret.y, carrier.x, carrier.y);
        turret.setRotation(angle);

        // Creating a bullet
        this.bullet = new Bullet(this, turret.x, turret.y);
        this.bullets.add(this.bullet);
        this.bullet.body.debugShowVelocity = false;

        // Shoots at the carrier
        this.physics.moveToObject(this.bullet, carrier, 230);

        // Follows the carrier all the time
        // setInterval(function() {
        //     this.physics.moveToObject(this.bullet, carrier, 230);
        // }.bind(this), 100);
    }

    destroyBullet(carrier, bullet) {
        bullet.destroy();
    }
}

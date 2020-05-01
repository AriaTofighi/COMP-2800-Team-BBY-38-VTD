import { Grid } from "matter";

export class GameScene extends Phaser.Scene {

    constructor() {
        super('Game');
    }

    preload() {
        // Ones represent grid cells that are path tiles you cannot place towers on
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

    create() {
        // Begin writing game objects/logic here
        // this.add.image(200, 100, 'carrier');
        // this.add.image(300, 100, 'tile');
        // this.add.image(400, 100, 'tower1');

        // Create grid variables
        let width = this.sys.canvas.width;
        let height = this.sys.canvas.height; 
        let cellWidth = 32;
        let cellHeight = 32;
        let halfCell = 16; // used to move objects to center of cells
        const colCount = width / cellWidth; // 25 cols, use cellWidth * 24 for last col
        const rowCount = height / cellWidth; // 19 rows, use cellWidth * 18 for last row
        
        // Create and draw grid
        let grid = this.add.grid(0, 0, cellWidth * colCount , cellWidth * rowCount, cellWidth, cellWidth, 0x000000, 0, 0x222222, 1);
        grid.setOrigin(0, 0);
        
        // Create and draw path
        let graphics = this.add.graphics();
        graphics.lineStyle(1, 0xFFFFFF);
        let path = this.add.path(cellWidth * 3 + halfCell, 0 + halfCell );
        path.lineTo(cellWidth * 3 + halfCell, cellWidth * 10 + halfCell);
        path.lineTo(cellWidth * 24 + halfCell, cellWidth * 10 + halfCell);
        path.draw(graphics);

        // Create cursor grid cell hover image and draw
        this.createTile();

        // Create carrier that follows path
        this.carrier = this.add.follower(path, cellWidth * 3 + 16, 0 + 16, 'carrier');
        this.carrier.setDisplaySize(32, 32);
        this.physics.world.enable(this.carrier);
        this.carrier.body.setCircle(16, 16, 16);
        this.carrier.setRotation(1.5708);
        this.carrier.startFollow({
            rotateToPath: true,
            duration: 5000,
            yoyo: true, // switches directions when end of path is reached
            repeat: -1, // infinite
        });

        //Create sidebar
        let sidebar = this.add.container(width, height / 2 - 200);
        let sidebox = this.add.graphics();
        sidebar.add(sidebox);
        sidebox.fillStyle(0xff0000);
        sidebox.fillRect(0, 0, 100, 400);

        //Create first tower in menu.
        let menuTower1 = this.add.image(54, 64, 'tower1');
        menuTower1.setInteractive().on('pointerdown', () => {
            descText.setText("Description: Soap Tower");
            costText.setText("Cost: 100");
        });
        sidebar.add(menuTower1);

        //Create menu toggle button
        let menuButton = this.add.rectangle(width - 20, height - 20, 40, 40, 0x00ff00);
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
        // let bullet = this.add.image(cellWidth * 24, cellWidth * 18, 'bullet');
        // bullet.setDisplaySize(32, 32);
        // bullet.setOrigin(0, 0);

        // Create and draw a circle to test overlap/collision
        this.circle1 = this.add.circle(cellWidth*4 + halfCell, cellHeight*4 + halfCell, 40, 0xff0000, 0.5);
        this.circle2 = this.add.circle(cellWidth*7 + halfCell, cellHeight*9 + halfCell, 40, 0xff0000, 0.5);

        this.physics.world.enable(this.circle1);
        this.circle1.body.setCircle(40);
        this.physics.world.enable(this.circle2);
        this.circle2.body.setCircle(40);

        // Removes debug outline of physics body
        this.circle1.body.debugShowBody = false;

        // Create health text
        this.healthText = this.add.text(width / 2, 10, "Health: 100");
        this.health = 100;
    }

    createTile() {
        this.tile = this.add.image(0, 0, 'tile');
        this.tile.setDisplaySize(32, 32);
        this.tile.setOrigin(0, 0);
        this.tile.alpha = 0;

        this.input.on('pointermove', function (pointer) {
            // console.log(pointer);
            let i = Math.floor(pointer.y / 32); // row index
            let j = Math.floor(pointer.x / 32); // col index
            this.tile.setPosition(j * 32, i * 32);
            if (this.isPathTile(i, j)) {
                this.tile.alpha = 0;
            } else {
                this.tile.alpha = 1;
            }

        }.bind(this));
    }

    isPathTile(i, j) {
        return this.gridCells[i][j] === 1;
    }

    update() {
        this.physics.overlap(this.carrier, this.circle1, this.overlap1.bind(this));

        this.physics.overlap(this.carrier, this.circle2, this.overlap2.bind(this));
    }

    overlap1() {
        console.log("Circle1 hit.");
        this.health = this.health - 0.1;
        if (this.health <= 0) {
            this.carrier.alpha = 0;
        }
        this.healthText.setText("Health: " + this.health.toFixed(0));
    }

    overlap2() {
        console.log("Circle2 hit.");
        this.health = this.health - 0.1;
        if (this.health <= 0) {
            this.carrier.alpha = 0;
        }
        this.healthText.setText("Health: " + this.health.toFixed(0));
    }
    
}

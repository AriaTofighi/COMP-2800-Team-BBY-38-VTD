import Turret1 from "../game_objects/Turret1";
import Turret2 from "../game_objects/Turret2";
import Turret3 from "../game_objects/Turret3";

export class ChallengeUIScene extends Phaser.Scene {
    /**
     * Constructor for Challenge UIScene object.
     */
    constructor() {
        super('ChallengeUI');
    }

    /**
     * Initializes the game.
     */
    init() {
        // Showing the button after the animation is gone
        setTimeout(function () {
            this.menuButton.alpha = 1;
        }.bind(this), 3900);
    }

    create(){
        this.width = this.sys.canvas.width;
        this.height = this.sys.canvas.height;
        this.halfCell = 16; // Used to move objects to center of cells
        this.game = this.scene.get('Challenge');

        this.tower1IsSelected = false;
        this.tower2IsSelected = false;
        this.tower3IsSelected = false;

        //Create sidebar
        this.sidebar = this.add.container(this.width, this.height / 2 - 200);
        let sidebox = this.add.image(0, 0, 'box');
        sidebox.setOrigin(0,0);
        this.sidebar.depth = 1;
        this.sidebar.add(sidebox);

        // Create menu toggle button
        this.menuShowing = false;
        this.menuButton = this.add.image(this.width - 32, this.height - 32, 'menuButton');
        this.menuButton.alpha = 0;
        this.menuButton.setDisplaySize(64, 64);
        // On-click of menu toggle button
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

        let menuTower1 = this.add.image(50, 72, 'tower1');
        menuTower1.setInteractive({
            cursor: 'pointer'
        });
        menuTower1.setInteractive().on('pointerdown', () => {
            // Tower1 has been selected
            // this.toggleSidebar();
            this.tower1IsSelected = true;
            this.tower2IsSelected = false;
            this.tower3IsSelected = false;
            this.descText.setText("Description: Water Tower");
            this.costText.setText("Cost: 100");
            this.cancelButton.alpha = 1;

            // Once a turret is selected, close the sidebar
            this.toggleSidebar();

            // Create cursor grid cell hover image
            this.showTurretExample();
        });

        // Create second tower in menu
        let menuTower2 = this.add.image(50, 176, 'tower2');
        menuTower2.setInteractive({
            cursor: 'pointer'
        });
        menuTower2.setInteractive().on('pointerdown', () => {
            // Tower2 has been selected
            this.tower1IsSelected = false;
            this.tower2IsSelected = true;
            this.tower3IsSelected = false;
            this.descText.setText("Description: Soap Tower");
            this.costText.setText("Cost: 200");
            this.cancelButton.alpha = 1;

            // Once a turret is selected, close the sidebar
            this.toggleSidebar();

            // Create cursor grid cell hover image
            this.showTurretExample();
        });

        // Create third tower in menu
        let menuTower3 = this.add.sprite(50, 280, 'tower3', 'tower3loaded');
        menuTower3.setInteractive({
            cursor: 'pointer'
        });
        menuTower3.setDisplaySize(32, 32);
        menuTower3.setInteractive().on("pointerdown", () => {
            // Tower3 has been selected
            this.tower1IsSelected = false;
            this.tower2IsSelected = false;
            this.tower3IsSelected = true;
            this.descText.setText("Description: Sanitizer");
            this.costText.setText("Cost: 300");
            this.cancelButton.alpha = 1;

            // Once a turret is selected, close the sidebar
            this.toggleSidebar();

            // Create cursor grid cell hover image
            this.showTurretExample();
        });

        // Creating the cancel button
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

        // Add all the buttons to the sidebar
        this.sidebar.add(menuTower1);
        this.sidebar.add(menuTower2);
        this.sidebar.add(menuTower3);

        let infoContainer = this.add.container(this.width/2 - 10, 10);
        this.infobox = this.add.image(0, 60, 'box');
        this.infobox.setOrigin(0,0);
        this.infobox.setScale(0.7, 1);
        this.infobox.setRotation(-Math.PI/2);
        this.descText = this.add.text(230, 0, '', {fontFamily: 'Odibee Sans'});
        this.costText = this.add.text(230, this.descText.getBottomCenter().y + 10, '', {fontFamily: 'Odibee Sans'});
        infoContainer.add(this.infobox);
        infoContainer.add(this.descText);
        infoContainer.add(this.costText);

        // Create resource information text
        this.health = 100;
        this.healthText = this.add.text(10, 0, "Health: " + this.health, {fontFamily: 'Odibee Sans'});
        this.money = 400;
        this.moneyText = this.add.text(10, this.healthText.getBottomCenter().y + 10, 'Money: ' + this.money, {fontFamily: 'Odibee Sans'});

        infoContainer.add(this.healthText);
        infoContainer.add(this.moneyText);
    }

    toggleSidebar() {
        if (!this.menuShowing) {
            this.tweens.add({
                targets: this.sidebar,
                x: this.width - 100,
                duration: 200
            });
            // Placing ones in the place of sidebar on the grid array
            setTimeout(this.game.placeSidebarNumbers(1), 10);

            this.menuShowing = true;
        } else {
            this.tweens.add({
                targets: this.sidebar,
                x: this.width + 100,
                duration: 200
            });
            // Placing zeros in the place of sidebar on the grid array
            setTimeout(this.game.placeSidebarNumbers(0), 10);

            this.menuShowing = false;
        }
    }

    showTurretExample() {
        // showing no turret is allowed
        this.noTurret = this.add.image(0, 0, 'noTurret');
        this.noTurret.setDisplaySize(32, 32);
        this.noTurret.setOrigin(0, 0);
        this.noTurret.alpha = 0;

        if (this.tower1IsSelected) {
            this.sound.play('towerButtonClick');
            // showing the turret example with its radius
            this.turretExampleRadius = this.add.circle(-1000, -1000, 60, 0xECDBDB);
            this.turretExampleRadius.alpha = 0.8;
            this.turretExampleRadius.setStrokeStyle(3, 0x046307, 0.8);

            this.turretExample = this.add.image(0, 0, 'tower1');
            this.turretExample.setOrigin(0, 0);
            this.turretExample.setDisplaySize(32, 32);
            this.turretExample.alpha = 0;
        } else if (this.tower2IsSelected) {
            this.sound.play('towerButtonClick');
            // showing the turret example with its radius
            this.turretExampleRadius = this.add.circle(-1000, -1000, 85, 0xECDBDB);
            this.turretExampleRadius.alpha = 0.8;
            this.turretExampleRadius.setStrokeStyle(3, 0x046307, 0.8);

            this.turretExample = this.add.image(0, 0, 'tower2');
            this.turretExample.setOrigin(0, 0);
            this.turretExample.setDisplaySize(32, 32);
            this.turretExample.alpha = 0;
        } else if (this.tower3IsSelected) {
            this.sound.play('towerButtonClick');
            // showing the turret example with its radius
            this.turretExampleRadius = this.add.circle(-1000, -1000, 100, 0xECDBDB);
            this.turretExampleRadius.alpha = 0.8;
            this.turretExampleRadius.setStrokeStyle(3, 0x046307, 0.8);

            this.turretExample = this.add.image(0, 0, 'tower3');
            this.turretExample.setOrigin(0, 0);
            this.turretExample.setDisplaySize(32, 32);
            this.turretExample.alpha = 0;
        }

        // Determines if the cursor is over a valid tile for tower placement
        this.input.on('pointermove', function (pointer) {
            let i = Math.floor(pointer.y / 32); // Row index
            let j = Math.floor(pointer.x / 32); // Column index

            this.turretExample.setPosition(j * 32, i * 32);
            this.noTurret.setPosition(j * 32, i * 32);
            this.turretExampleRadius.setPosition((j + 0.5) * 32, (i + 0.5) * 32);

            if (this.tower1IsSelected) {
                if (this.game.isPathTile(i, j)) {
                    this.turretExample.alpha = 0;
                    this.turretExampleRadius.alpha = 0;
                    this.turretExampleRadius.setStrokeStyle(3, 0x046307, 0);
                    this.noTurret.alpha = 1;
                } else {
                    this.turretExample.alpha = 1;
                    this.turretExampleRadius.alpha = 0.8;
                    this.turretExampleRadius.setStrokeStyle(3, 0x046307, 0.8);
                    this.noTurret.alpha = 0;
                }
            } else if (this.tower2IsSelected) {
                if (this.game.isPathTile(i, j)) {
                    this.turretExample.alpha = 0;
                    this.turretExampleRadius.alpha = 0;
                    this.turretExampleRadius.setStrokeStyle(3, 0x046307, 0);
                    this.noTurret.alpha = 1;
                } else {
                    this.turretExample.alpha = 1;
                    this.turretExampleRadius.alpha = 0.8;
                    this.turretExampleRadius.setStrokeStyle(3, 0x046307, 0.8);
                    this.noTurret.alpha = 0;
                }
            } else if (this.tower3IsSelected) {
                if (this.game.isPathTile(i, j)) {
                    this.turretExample.alpha = 0;
                    this.turretExampleRadius.alpha = 0;
                    this.turretExampleRadius.setStrokeStyle(3, 0x046307, 0);
                    this.noTurret.alpha = 1;
                } else {
                    this.turretExample.alpha = 1;
                    this.turretExampleRadius.alpha = 0.8;
                    this.turretExampleRadius.setStrokeStyle(3, 0x046307, 0.8);
                    this.noTurret.alpha = 0;
                }
            } else {
                this.turretExample.alpha = 0;
                this.turretExampleRadius.alpha = 0;
                this.turretExampleRadius.setStrokeStyle(3, 0x046307, 0);
                this.noTurret.alpha = 0;
            }

        }.bind(this));

        // Place tower
        this.input.on('pointerdown', this.placeTower.bind(this));
    }

    placeTower(pointer) {
        let i = Math.floor(pointer.y / 32); // row index
        let j = Math.floor(pointer.x / 32); // col index

        if (this.tower1IsSelected && !this.game.isPathTile(i, j)) {
            this.sound.play('towerBuild');
            let turret = new Turret1(this.game, j, i);
            this.game.placeTower(turret, i, j);
            this.toggleSidebar();
            this.cancelSelection();
        } else if (this.tower2IsSelected && !this.game.isPathTile(i, j)) {
            this.sound.play('towerBuild');
            let turret = new Turret2(this.game, j, i);
            this.game.placeTower(turret, i, j);
            this.toggleSidebar();
            this.cancelSelection();
        } else if (this.tower3IsSelected && !this.game.isPathTile(i, j)) {
            this.sound.play('towerBuild');
            let turret = new Turret3(this.game, j, i);
            this.game.placeTower(turret, i, j);
            this.toggleSidebar();
            this.cancelSelection();
        }
    }

    cancelSelection() {
        this.tower1IsSelected = false;
        this.tower2IsSelected = false;
        this.tower3IsSelected = false;
        this.descText.setText("");
        this.costText.setText("");
        this.cancelButton.alpha = 0;
    }
}
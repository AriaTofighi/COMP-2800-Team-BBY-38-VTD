import Turret1 from "../game_objects/Turret1";
import Turret2 from "../game_objects/Turret2";
import Turret3 from "../game_objects/Turret3";

const SIDEBAR_DURATION = 200;

/**
 * ChallengeUIScene includes the ui of the challenge scene.
 */
export class ChallengeUIScene extends Phaser.Scene {
    /**
     * Constructor for Challenge UIScene object.
     */
    constructor() {
        /**
         * Constructor for Phaser.Scene object.
         */
        super('ChallengeUI');
    }

    /**
     * Creates all the challenge ui entities.
     */
    create(){
        this.width = this.sys.canvas.width;
        this.height = this.sys.canvas.height;
        this.halfCell = 16;
        this.game = this.scene.get('Challenge');
        this.textStrokeThickness = 3;

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
        let tower1Desc = "Description: Soap Shooter";
        menuTower1.setDisplaySize(80, 80);
        menuTower1.setInteractive({
            cursor: 'pointer'
        });
        menuTower1.setInteractive().on("pointerover", () => {
            this.descText.setText(tower1Desc);
            this.costText.setText("Cost: " + Turret1.getPrice());
        });
        menuTower1.setInteractive().on("pointerout", () => {
            this.descText.setText();
            this.costText.setText();
        });
        menuTower1.setInteractive().on('pointerdown', () => {
            // Tower1 has been selected
            this.tower1IsSelected = true;
            this.tower2IsSelected = false;
            this.tower3IsSelected = false;
            this.descText.setText(tower1Desc);
            this.costText.setText("Cost: " + Turret1.getPrice());
            this.cancelButton.alpha = 1;

            // Once a turret is selected, close the sidebar
            this.toggleSidebar();

            // Create cursor grid cell hover image
            this.showTurretExample();
        });

        // Create second tower in menu
        let menuTower2 = this.add.image(50, 176, 'tower2');
        let tower2Desc = "Description: Sanitizer";
        menuTower2.setInteractive({
            cursor: 'pointer'
        });
        menuTower2.setInteractive().on("pointerover", () => {
            this.descText.setText(tower2Desc);
            this.costText.setText("Cost: " + Turret2.getPrice());
        });
        menuTower2.setInteractive().on("pointerout", () => {
            this.descText.setText();
            this.costText.setText();
        });
        menuTower2.setInteractive().on('pointerdown', () => {
            // Tower2 has been selected
            this.tower1IsSelected = false;
            this.tower2IsSelected = true;
            this.tower3IsSelected = false;
            this.descText.setText(tower2Desc);
            this.costText.setText("Cost: " + Turret2.getPrice());
            this.cancelButton.alpha = 1;

            // Once a turret is selected, close the sidebar
            this.toggleSidebar();

            // Create cursor grid cell hover image
            this.showTurretExample();
        });

        // Create third tower in menu
        let menuTower3 = this.add.sprite(50, 280, 'tower3', 'tower3loaded');
        let tower3Desc = "Description: Mask Shooter";
        menuTower3.setInteractive({
            cursor: 'pointer'
        });
        menuTower3.setDisplaySize(32, 32);
        menuTower3.setInteractive().on("pointerover", () => {
            this.descText.setText(tower3Desc);
            this.costText.setText("Cost: " + Turret3.getPrice());
        });
        menuTower3.setInteractive().on("pointerout", () => {
            this.descText.setText();
            this.costText.setText();
        });
        menuTower3.setInteractive().on("pointerdown", () => {
            // Tower3 has been selected
            this.tower1IsSelected = false;
            this.tower2IsSelected = false;
            this.tower3IsSelected = true;
            this.descText.setText(tower3Desc);
            this.costText.setText("Cost: " + Turret3.getPrice());
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

        // Create resource info box
        let infoContainer = this.add.container(415, 5);
        this.infobox = this.add.image(0, 60, 'box');
        this.infobox.setOrigin(0,0);
        this.infobox.setScale(0.7, 1);
        this.infobox.setRotation(-Math.PI/2);
        this.infobox.setDisplaySize(this.halfCell * 4, 384);
        this.descText = this.add.text(230, 0, '', {fontFamily: 'Odibee Sans'});
        this.costText = this.add.text(230, this.descText.getBottomCenter().y + 10, '', {fontFamily: 'Odibee Sans'});
        this.descText.setStroke('black', this.textStrokeThickness);
        this.costText.setStroke('black', this.textStrokeThickness);
        infoContainer.add(this.infobox);
        infoContainer.add(this.descText);
        infoContainer.add(this.costText);

        // Create resource information text
        this.health = 1;
        this.healthText = this.add.text(10, 0, "Health: " + this.health, {fontFamily: 'Odibee Sans'});
        this.healthText.setStroke('black', this.textStrokeThickness);
        this.money = Infinity;
        this.moneyText = this.add.text(10, this.healthText.getBottomCenter().y + 10, 'Money: ∞', {fontFamily: 'Odibee Sans'});
        this.moneyText.setStroke('black', this.textStrokeThickness);

        infoContainer.add(this.healthText);
        infoContainer.add(this.moneyText);
    }

    /**
     * Opens and closes the sidebar based on its current condition.
     */
    toggleSidebar() {
        if (!this.menuShowing) {
            this.tweens.add({
                targets: this.sidebar,
                x: this.width - 100,
                duration: SIDEBAR_DURATION
            });
            // Placing ones in the place of sidebar on the grid array
            setTimeout(this.game.placeSidebarNumbers(1), 10);

            this.menuShowing = true;
        } else {
            this.tweens.add({
                targets: this.sidebar,
                x: this.width + 100,
                duration: SIDEBAR_DURATION
            });
            // Placing zeros in the place of sidebar on the grid array
            setTimeout(this.game.placeSidebarNumbers(0), 10);

            this.menuShowing = false;
        }
    }

    /**
     * Shows and moves turret examples if of
     * any turrets have been selected. 
     */
    showTurretExample() {
        // showing no turret is allowed
        this.noTurret = this.add.image(0, 0, 'noTurret');
        this.noTurret.setDisplaySize(32, 32);
        this.noTurret.setOrigin(0, 0);
        this.noTurret.alpha = 0;

        if (this.tower1IsSelected) {
            this.sound.play('towerButtonClick');
            // showing the turret example with its radius
            this.turretExampleRadius = this.add.circle(-1000, -1000, Turret1.getHitRadius(), 0xECDBDB);
            this.turretExampleRadius.alpha = 0.8;
            this.turretExampleRadius.setStrokeStyle(3, 0x046307, 0.8);

            this.turretExample = this.add.image(0, 0, 'tower1');
            this.turretExample.setDisplaySize(45, 45);
            this.turretExample.alpha = 0;
        } else if (this.tower2IsSelected) {
            this.sound.play('towerButtonClick');
            // showing the turret example with its radius
            this.turretExampleRadius = this.add.circle(-1000, -1000, Turret2.getHitRadius(), 0xECDBDB);
            this.turretExampleRadius.alpha = 0.8;
            this.turretExampleRadius.setStrokeStyle(3, 0x046307, 0.8);

            this.turretExample = this.add.image(0, 0, 'tower2');
            this.turretExample.setDisplaySize(32, 32);
            this.turretExample.alpha = 0;
        } else if (this.tower3IsSelected) {
            this.sound.play('towerButtonClick');
            // showing the turret example with its radius
            this.turretExampleRadius = this.add.circle(-1000, -1000, Turret3.getHitRadius(), 0xECDBDB);
            this.turretExampleRadius.alpha = 0.8;
            this.turretExampleRadius.setStrokeStyle(3, 0x046307, 0.8);

            this.turretExample = this.add.image(0, 0, 'tower3');
            this.turretExample.setDisplaySize(25, 25);
            this.turretExample.alpha = 0;
        }

        // Determines if the cursor is over a valid tile for tower placement
        this.input.on('pointermove', function (pointer) {
            let i = Math.floor(pointer.y / 32); // Row index
            let j = Math.floor(pointer.x / 32); // Column index

            this.turretExample.setPosition(j * 32 + this.halfCell, i * 32 + this.halfCell);
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

    /**
     * Places a tower on the game.
     * 
     * @param pointer the pointer to get the location of the click 
     */
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

    /**
     * Cancels the selection.
     */
    cancelSelection() {
        this.tower1IsSelected = false;
        this.tower2IsSelected = false;
        this.tower3IsSelected = false;
        this.descText.setText("");
        this.costText.setText("");
        this.cancelButton.alpha = 0;
    }
}
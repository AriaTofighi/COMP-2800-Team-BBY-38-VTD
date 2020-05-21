import Bullet2 from "../game_objects/Bullet2";
import Bullet from "./Bullet";

export default class Turret2 extends Phaser.GameObjects.Image {
    /**
     * Constructor for turret 2 object.
     */
    constructor(scene, j, i) {
        super(scene, j, i, 'tower2');
        this.x = j * 32 + this.scene.halfCell;
        this.y = i * 32 + this.scene.halfCell;
        this.scene = scene;
        this.firstFireTimeSet = false;
        this.firstFireTime;
        this.secondFireTime;
        this.delta = 0;
        this.fireRate = 20;
        this.bulletSpeed = 4;
        this.shooting = false;
        this.bullet = new Bullet2(this.scene, this.x, this.y, 1);
        this.showingContainer = false;
        this.tier = 1;
        this.upgradePrice = 80;

        this.setDisplaySize(32, 32);
        this.setPosition(this.x, this.y);

        // Creating the radius of the turret
        this.radius = this.scene.add.circle(0, 0, Turret2.getHitRadius(), 0xECDBDB);
        this.radius.alpha = 0;
        this.radius.setPosition((j + 0.5) * 32, (i + 0.5) * 32);
        this.radius.setStrokeStyle(3, 0x046307, 0);

        this.scene.physics.world.enable(this);
        this.body.setCircle(Turret2.getHitRadius() * 2, -139, -139);
        this.body.debugShowBody = false;

        // Showing the radius of the turret when hovering
        this.setInteractive().on('pointerover', function () {
            this.radius.alpha = 0.8;
            this.radius.setStrokeStyle(3, 0x046307, 0.8);
        }.bind(this));

        // Getting rid of the radius of turret when hovering out
        this.setInteractive().on('pointerout', function () {
            this.radius.alpha = 0;
            this.radius.setStrokeStyle(3, 0x046307, 0);
        }.bind(this));

        // Toggling the edit container
        this.setInteractive().on('pointerdown', function () {
            if (this.showingContainer) {
                this.showingContainer = false;
                this.editContainer.alpha = 0;
                this.tierContainer.alpha = 0;
            } else {
                this.showingContainer = true;
                this.editContainer.alpha = 1;
                this.tierContainer.alpha = 1;
            }
        });

        // Creating the tower edit container
        this.CreateContainer();

        this.scene.add.existing(this);
    }

    static getPrice() {
        return this.price;
    }

    static getHitRadius() {
        return this.hitRadius;
    }
        
        // Creating a bullet
        //this.bullet = new Bullet1(this.scene, this.x + this.scene.halfCell * Math.cos(angle), this.y + this.scene.halfCell * Math.sin(angle));
        //this.scene.bullets.add(this.bullet);

    // // Fires a turret shot at a carrier (must be here, NOT Turret.js for access to groups)
    // fire(carrier) {
    //     if (!(this.delta >= 1000 / this.fireRate)) {
    //         return;
    //     }
    //     // console.log("fire");

    //     // Rotating the turret towards the carrier when firing
    //     var angle = Phaser.Math.Angle.Between(this.x, this.y, carrier.x, carrier.y);
    //     this.setRotation(angle);

    //     // Creating a bullet
    //     this.bullet = new Bullet1(this.scene, this.x + this.scene.halfCell * Math.cos(angle), this.y + this.scene.halfCell * Math.sin(angle));
    //     this.scene.bullets.add(this.bullet);
    //     this.bullet.body.debugShowVelocity = false;

    //     // Shoots at the carrier
    //     this.scene.physics.moveToObject(this.bullet, carrier, this.bulletSpeed * 100);

    //     // Follows the carrier all the time
    //     // setInterval(function() {
    //     //     this.physics.moveToObject(this.bullet, carrier, 230);
    //     // }.bind(this), 100);

    //     this.delta = 0;

    // }

    // Fires a turret shot at a carrier
    fire(carrier) {
        // Rotating the turret towards the carrier when firing
        var angle = Phaser.Math.Angle.Between(this.x, this.y, carrier.x, carrier.y);
        this.setRotation(angle);

        // Creating a bullet
        if (!this.shooting) {
            this.bullet.setVisible(true);
            this.bullet.hitbox.iterate((hBox) =>{
                this.scene.bullets.add(hBox);
            })
            this.bullet.setOrigin(0.5, 1);
            this.shooting = true;
        }

        let offset = 20;
        this.bullet.hitbox.iterate((hBox) => {
            hBox.setPosition(this.x + offset * Math.cos(angle), this.y + offset * Math.sin(angle));
            offset+=20;
        });

        this.bullet.setPosition(this.x + this.scene.halfCell * Math.cos(angle), this.y + this.scene.halfCell * Math.sin(angle));
        this.bullet.setRotation(angle + Math.PI/2);

        this.delta = 0;
    }

    CreateContainer() {
        // The edit container
        this.editContainer = this.scene.add.container(this.x + 20, this.y - 25);
        this.editContainer.alpha = 0;
        this.editBack = this.scene.add.graphics();

        // The background of the container
        this.editBack.fillStyle(0x393939);
        this.editBack.fillRoundedRect(0, 0, 175, 50, 20);

        // The border of the rectangle
        this.editBack.lineStyle(4, 0x66c746, 1);
        this.editBack.strokeRoundedRect(0, 0, 175, 50, 20);
        this.editContainer.add(this.editBack);

        // The line to separate the two tasks
        this.editBack.lineBetween(87.5, 0, 87.5, 50);

        // The left section
        // Creating the selling section
        this.sellText = this.scene.add.text(25, 7, "Sell");
        this.sellText.setFontFamily('Arial');
        this.sellText.setFontSize(23);
        this.sellText.setFill("#66c746");
        this.sellText.setStroke('black', 1);
        this.editContainer.add(this.sellText);

        // The text to show how much money the user will get back
        this.sellPrice = this.scene.add.text(36, 33, "$" + Turret2.getPrice() / 2);
        this.sellPrice.setFontSize(10);
        this.sellPrice.setFill("#66c746");
        this.sellPrice.setStroke('black', 0.35);
        this.editContainer.add(this.sellPrice);

        // Creating the clickable sell section
        this.leftClickBack = this.scene.add.graphics();
        let bound1 = new Phaser.Geom.Rectangle(1, 2, 85, 47);

        this.leftClickBack.setInteractive(bound1, Phaser.Geom.Rectangle.Contains)
        this.leftClickBack.on('pointerover', function() {
            this.leftClickBack.fillStyle(0xffffff, 0.3);
            this.leftClickBack.fillRoundedRect(1, 2, 85, 47, { tl: 20, tr: 0, bl: 20, br: 0});
        }.bind(this));
        this.leftClickBack.on('pointerout', function() {
            this.leftClickBack.clear();
        }.bind(this));

        // selling the tower
        this.leftClickBack.on('pointerdown', function() {
            this.scene.sound.play('towerDestroy');
            this.scene.ui.money += Turret2.getPrice() / 2;
            this.scene.ui.moneyText.setText('Money: ' + this.scene.ui.money);
            this.editContainer.destroy();
            this.tierContainer.destroy();
            this.destroy();
        }.bind(this));
        this.editContainer.add(this.leftClickBack);

        // The right section
        // The upgrade text
        this.upgradeText = this.scene.add.text(95, 9, "Upgrade");
        this.upgradeText.setFontFamily('Arial');
        this.upgradeText.setFontSize(18);
        this.upgradeText.setFill("#66c746");
        this.upgradeText.setStroke('black', 1);
        this.editContainer.add(this.upgradeText);

        this.upgradePriceText = this.scene.add.text(121, 33, "$" + this.upgradePrice);
        this.upgradePriceText.setFontSize(10);
        this.upgradePriceText.setFill("#66c746");
        this.upgradePriceText.setStroke('black', 0.35);
        this.editContainer.add(this.upgradePriceText);

        // Creating the clickable upgrade section
        this.rightClickBack = this.scene.add.graphics();
        let bound2 = new Phaser.Geom.Rectangle(90, 2, 85, 47);

        this.rightClickBack.setInteractive(bound2, Phaser.Geom.Rectangle.Contains)
        this.rightClickBack.on('pointerover', function() {
            this.rightClickBack.fillStyle(0xffffff, 0.3);
            this.rightClickBack.fillRoundedRect(90, 2, 85, 47, { tl: 0, tr: 20, bl: 0, br: 20});
        }.bind(this));
        this.rightClickBack.on('pointerout', function() {
            this.rightClickBack.clear();
        }.bind(this));

        // Upgrading the tower
        this.rightClickBack.on('pointerdown', function() {
            switch(this.tier) {
                case 1:
                    this.upgradeTurret();
                    this.tierText.setText("**");
                    this.tierText.setX(10);
                    break;
                case 2:
                    this.upgradeTurret();
                    this.tierText.setText("***");
                    this.tierText.setX(5.3);
                    break;
                case 3:
                    this.upgradeTurret();
                    this.tierText.setText("****");
                    this.tierText.setX(0);
                    this.upgradeText.setText("Max");
                    this.upgradeText.setX(112);
                    this.upgradePriceText.setText("");
                    break;
              }
        }.bind(this));
        this.editContainer.add(this.rightClickBack);

        // The tier background
        this.tierContainer = this.scene.add.container(this.x -18, this.y - 25);
        this.tierContainer.alpha = 0;

        // The tier background
        this.tierBack = this.scene.add.graphics();
        this.tierBack.fillStyle(0x393939);
        this.tierBack.fillRoundedRect(0, 0, 36, 10, 2);
        this.tierBack.lineStyle(1, 0xffffff, 1);
        this.tierBack.strokeRoundedRect(0, 0, 36, 10, 2);
        this.tierContainer.add(this.tierBack);

        // The tier text
        this.tierText = this.scene.add.text(14, 0, "*");
        this.tierText.setFontSize(15);
        this.tierText.setFill("#66c746");
        this.tierText.setStroke('black', 0.35);
        this.tierContainer.add(this.tierText);

    }

    upgradeTurret() {
        if (this.scene.ui.money >= this.upgradePrice) {
            this.scene.sound.play('towerUpgrade');
            this.scene.ui.money -= this.upgradePrice;
            this.scene.ui.moneyText.setText('Money: ' + this.scene.ui.money);
            this.tier++;
            this.fireRate++;
            this.bulletSpeed++;
        }
    }

    /**
     * Updates the turret 2 object.
     */
    update(time, delta) {
        this.delta += delta;
        if(this.delta >= 20){
            this.shooting = false;
            this.bullet.setVisible(false);
        }
    }
}

// Static variable
Turret2.price = 300;
Turret2.hitRadius = 85;


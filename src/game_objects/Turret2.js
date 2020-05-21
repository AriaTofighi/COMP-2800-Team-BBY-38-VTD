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

        this.scene.add.existing(this);
    }

    static getPrice() {
        return this.price;
    }

    static getHitRadius() {
        return this.hitRadius;
    }

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


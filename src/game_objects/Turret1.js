import Bullet1 from "./Bullet1";

export default class Turret1 extends Phaser.GameObjects.Image {
    constructor(scene, j, i) {
        super(scene, j, i, 'tower1');
        this.x = j * 32 + this.scene.halfCell;
        this.y = i * 32 + this.scene.halfCell;
        this.scene = scene;
        this.delta = 0;
        this.fireRate = 2;
        this.bulletSpeed = 6;

        // Setting the price of the turret
        this.price = 100;

        this.setDisplaySize(32, 32);
        this.setPosition(this.x, this.y);

        // Creating the radius of the turret
        this.radius = this.scene.add.circle(0, 0, 60, 0xECDBDB);
        this.radius.alpha = 0;
        this.radius.setPosition((j + 0.5) * 32, (i + 0.5) * 32);
        this.radius.setStrokeStyle(3, 0x046307, 0);

        this.scene.physics.world.enable(this);
        this.body.setCircle(120, -88.5, -88.5);
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

    // Fires a turret shot at a carrier (must be here, NOT Turret.js for access to groups)
    fire(carrier) {
        if (!(this.delta >= 1000 / this.fireRate)) {
            return;
        }

        // Rotating the turret towards the carrier when firing
        var angle = Phaser.Math.Angle.Between(this.x, this.y, carrier.x, carrier.y);
        this.setRotation(angle);

        // Creating a bullet
        this.bullet = new Bullet1(this.scene, this.x + this.scene.halfCell * Math.cos(angle), this.y + this.scene.halfCell * Math.sin(angle));
        this.scene.bullets.add(this.bullet);
        this.bullet.body.debugShowVelocity = false;

        // Shoots at the carrier
        this.scene.physics.moveToObject(this.bullet, carrier, this.bulletSpeed * 100);

        this.delta = 0;

    }

    update(time, delta) {
        this.delta += delta;
        // console.log('Delta: ' + this.delta);
    }
}
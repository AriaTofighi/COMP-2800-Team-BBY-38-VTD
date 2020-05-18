import Bullet3 from "./Bullet3";

export default class Turret3 extends Phaser.GameObjects.Sprite {
    constructor(scene, j, i) {
        super(scene, j, i, 'tower3');
        this.x = j * 32 + this.scene.halfCell;
        this.y = i * 32 + this.scene.halfCell;
        this.scene = scene;
        this.delta = 0;
        this.fireRate = 2;
        this.bulletSpeed = 6;
        this.hitRadius = 180;

        this.scene.anims.create({
            key: 'loaded',
            frames: [{key: 'tower3', frame: 0}]
        });

        this.scene.anims.create({
            key: 'empty',
            frames: [{key: 'tower3', frame: 1}]
        });

        // Setting the price of the turret
        this.price = 100;

        this.setDisplaySize(20, 20);
        this.setPosition(this.x, this.y);

        // Creating the radius of the turret
        this.radius = this.scene.add.circle(0, 0, 60, 0xECDBDB);
        this.radius.alpha = 0;
        this.radius.setPosition((j + 0.5) * 32, (i + 0.5) * 32);
        this.radius.setStrokeStyle(3, 0x046307, 0);

        this.scene.physics.world.enable(this);
        let offset = -this.hitRadius + 24;
        this.body.setCircle(this.hitRadius, offset, offset);
        this.body.debugShowBody = true;

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
        this.play('empty');
        // Rotating the turret towards the carrier when firing
        var angle = Phaser.Math.Angle.Between(this.x, this.y, carrier.x, carrier.y) + Math.PI/2;
        this.setRotation(angle);

        // Creating a bullet
        this.bullet = new Bullet3(this.scene, this.x + this.scene.halfCell * Math.cos(angle), this.y + this.scene.halfCell * Math.sin(angle));
        this.bullet.target = carrier;
        this.scene.bullets.add(this.bullet);
        this.bullet.body.debugShowVelocity = false;

        // Shoots at the carrier
        this.scene.physics.moveToObject(this.bullet, carrier, this.bulletSpeed * 100);

        //Follows the carrier all the time
        setInterval(function() {
            this.scene.physics.moveToObject(this.bullet, this.bullet.target, 230);
        }.bind(this), 100);

        this.delta = 0;
    }

    update(time, delta) {
        this.delta += delta;
        if(this.delta >= 600){
            this.play('loaded');
        }
    }
}
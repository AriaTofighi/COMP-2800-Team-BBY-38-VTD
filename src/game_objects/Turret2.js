export default class Turret2 extends Phaser.GameObjects.Image {
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

        // Setting the price of the turret
        this.price = 200;

        this.setDisplaySize(32, 32);
        this.setPosition(this.x, this.y);

        // Creating the radius of the turret
        this.radius = this.scene.add.circle(0, 0, 85, 0xECDBDB);
        this.radius.alpha = 0;
        this.radius.setPosition((j + 0.5) * 32, (i + 0.5) * 32);
        this.radius.setStrokeStyle(3, 0x046307, 0);

        this.scene.physics.world.enable(this);
        this.body.setCircle(170, -139, -139);
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

    update(time, delta) {
        this.delta += delta;
        // console.log('Delta: ' + this.delta);
    }
}
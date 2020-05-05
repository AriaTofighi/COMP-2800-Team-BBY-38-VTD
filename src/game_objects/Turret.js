export default class Turret extends Phaser.GameObjects.Image {
    constructor(scene, j, i) {
        super(scene, j, i, 'tower1');

        this.scene = scene;

        // Setting the damage of the turret
        this.damage = 20;

        // Setting the price of the turret
        this.price = 100;

        this.setDisplaySize(32, 32);
        this.setPosition(j * 32 + this.scene.halfCell, i * 32 + this.scene.halfCell);

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

    update() {
        
    }
}
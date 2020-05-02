export default class Turret extends Phaser.GameObjects.Image {
    constructor(scene, x, y) {
        super(scene, x, y, 'tower1');

        this.scene = scene;

        // Setting the damage of the turret
        this.damage = 100;

        this.setDisplaySize(32, 32);
        this.setOrigin(0, 0);
        this.setPosition(x * 32, y * 32);

        // Creating the radius of the turret
        this.radius = this.scene.add.circle(0, 0, 60, 0xECDBDB);
        this.radius.alpha = 0;
        this.radius.setPosition((x + 0.5) * 32, (y + 0.5) * 32);
        this.radius.setStrokeStyle(3, 0x046307, 0);

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
}
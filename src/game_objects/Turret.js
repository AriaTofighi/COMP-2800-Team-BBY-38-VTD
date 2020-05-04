export default class Turret extends Phaser.GameObjects.Image {
    constructor(scene, x, y) {
        super(scene, x, y, 'tower1');

        this.scene = scene;

        // Setting the damage of the turret
        this.damage = 20;

        // Setting the price of the turret
        this.price = 100;

        this.setDisplaySize(32, 32);
        this.setOrigin(0, 0);
        this.setPosition(x * 32, y * 32);

        // Creating the radius of the turret
        this.radius = this.scene.add.circle(0, 0, 60, 0xECDBDB);
        this.radius.alpha = 0;
        this.radius.setPosition((x + 0.5) * 32, (y + 0.5) * 32);
        this.radius.setStrokeStyle(3, 0x046307, 0);

        this.scene.physics.world.enable(this.radius);
        this.radius.body.setCircle(60);
        this.radius.body.debugShowBody = false;

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
        this.scene.physics.overlap(this.scene.carriers, this.scene.turretRadiuses, this.fire.bind(this));
    }

    fire(carrier, radius) {
        console.log("fire");
        // Updating the carrier hp
        carrier.hp -= 1;

        // Updating the health bar
        carrier.barHealth.clear();
        carrier.barHealth.fillStyle(0xd11141);
        var newWidth =  Math.floor(30 * (carrier.hp / 100.0));
        
        // Checking if the virus is still alive
        if (newWidth >= 0) {
            carrier.healthRect.width = newWidth;
        }
        
        carrier.barHealth.fillRectShape(carrier.healthRect);
    }
}
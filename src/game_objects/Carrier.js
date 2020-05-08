import 'phaser';

export default class Carrier extends Phaser.GameObjects.PathFollower {
    constructor(scene, path, x, y, texture, duration, hp) {
        super(scene, path, x, y, texture);
        this.duration = duration;
        this.x = x;
        this.y = y;
        this.scene = scene;
        this.path = path;
        this.hp = hp;
        this.maxhp = this.hp;

        // Creating the health bar for the virus
        this.barBack = this.scene.add.graphics();
        this.barHealth = this.scene.add.graphics();

        // The background part of the bar
        this.barBack.fillStyle(0xA32020);
        this.barBack.fillRect(-this.scene.halfCell, -this.scene.halfCell, this.scene.halfCell * 2, 4);

        // The health part of the bar
        this.healthRect = new Phaser.Geom.Rectangle(-this.scene.halfCell, -this.scene.halfCell, this.scene.halfCell * 2, 4);
        this.barHealth.fillStyle(0xffffff);
        this.barHealth.fillRectShape(this.healthRect);

        // Adding the background part of the bar to a path follower
        this.barBack.pathFollower = this.scene.plugins.get('rexpathfollowerplugin').add(this.barBack, {
            path: this.path,
            t: 0,
        });

        // Starts the background bar movement
        this.scene.tweens.add({
            targets: this.barBack.pathFollower,
            t: 1,
            duration: this.duration,
            yoyo: false, // switches directions when end of path is reached
            repeat: 0, // infinite
        });

        // Adding the health part of the bar to a path follower
        this.barHealth.pathFollower = this.scene.plugins.get('rexpathfollowerplugin').add(this.barHealth, {
            path: this.path,
            t: 0
        });

        // Starts the health bar movement
        this.scene.tweens.add({
            targets: this.barHealth.pathFollower,
            t: 1,
            duration: this.duration,
            yoyo: false, // switches directions when end of path is reached
            repeat: 0, // infinite
        });

        this.setDisplaySize(32, 32);
        this.scene.physics.world.enable(this);
        this.body.debugShowBody = false;
        this.body.setCircle(16, 16, 16);
        this.setRotation(1.5708);
        this.startFollow({
            rotateToPath: true,
            duration: this.duration,
            yoyo: false, // switches directions when end of path is reached
            repeat: 0, // infinite
        });

        this.scene.add.existing(this);

        // Automatically destroys the carrier after path duration complete
        // setTimeout(() => {
        //     this.destroy();
        //     this.barBack.alpha = 0;
        //     this.barHealth.alpha = 0;
        // }, this.duration);

    }

    update() {
        // Destroys this carrier and makes the health bar invisible if reaches end of path
        if (this.reachedEndPath()) {
            this.scene.health -= 5;
            this.scene.healthText.setText("Health: " + this.scene.health);
            this.destroy();
            this.barBack.alpha = 0;
            this.barHealth.alpha = 0;
        }
    }

    reachedEndPath() {
        return this.x == this.scene.cellWidth * 16 + this.scene.halfCell && this.y == this.scene.cellWidth * 19 + this.scene.halfCell;
    }
}
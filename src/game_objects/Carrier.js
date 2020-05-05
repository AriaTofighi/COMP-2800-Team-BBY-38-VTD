export default class Carrier extends Phaser.GameObjects.PathFollower {
    constructor(scene, path, x, y, texture) {
        super(scene, path, x, y, texture);
        
        this.x = x;
        this.y = y;
        this.scene = scene;
        this.path = path;

        // Setting the hp of the virus
        this.hp = 100;

        // Creating the health bar for the virus
        this.barBack = this.scene.add.graphics();
        this.barHealth = this.scene.add.graphics();
        

        // The background part of the bar
        this.barBack.fillStyle(0xA32020);
        this.barBack.fillRect(-15, -20, 30, 6);

        // The health part of the bar
        this.healthRect = new Phaser.Geom.Rectangle(-15, -20, 30, 6);
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
            duration: 50000,
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
            duration: 50000,
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
            duration: 50000,
            yoyo: false, // switches directions when end of path is reached
            repeat: 0, // infinite
        });

        this.scene.add.existing(this);

    }
}
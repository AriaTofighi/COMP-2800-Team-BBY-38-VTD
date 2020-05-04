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
        this.barBack.fillRect(5 * 32, 2 * 32, 30, 6);

        // The health part of the bar
        this.healthRect = new Phaser.Geom.Rectangle(5 * 32, 2 * 32, 30, 6);
        this.barHealth.fillStyle(0xd11141);
        this.barHealth.fillRectShape(this.healthRect);
        
        // this.barBack.setVisible(false);
        // this.barHealth.setVisible(false);

        // this.barBack.generateTexture('barBack');
        // this.barHealth.generateTexture('barHealth');

        // this.barBackFollow = this.scene.add.follower(this.path, 338, 235, 'barBack');
        // this.barHealthFollow = this.scene.add.follower(this.path, 338, 235, 'barHealth');

        // this.barBackFollow.startFollow({
        //     duration: 5000,
        //     yoyo: false, // switches directions when end of path is reached
        //     repeat: 0, // infinite
        // });

        // this.barHealthFollow.startFollow({
        //     duration: 5000,
        //     yoyo: false, // switches directions when end of path is reached
        //     repeat: 0, // infinite
        // });

        this.setDisplaySize(32, 32);
        this.scene.physics.world.enable(this);
        this.body.debugShowBody = false;
        this.body.setCircle(16, 16, 16);
        this.setRotation(1.5708);
        this.startFollow({
            rotateToPath: true,
            duration: 5000,
            yoyo: false, // switches directions when end of path is reached
            repeat: 0, // infinite
        });

        this.scene.add.existing(this);

    }
}
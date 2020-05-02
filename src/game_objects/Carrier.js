export default class Carrier extends Phaser.GameObjects.PathFollower {
    constructor(scene, path, x, y, texture) {
        super(scene, path, x, y, texture);
        
        this.x = x;
        this.y = y;
        this.scene = scene;
        this.path = path;

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
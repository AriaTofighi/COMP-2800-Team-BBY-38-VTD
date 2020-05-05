export default class Bullet extends Phaser.GameObjects.Image {
    constructor(scene, x, y) {
        super(scene, x, y, 'bullet');

        this.scene = scene;

        this.setDisplaySize(8, 8);
        this.setPosition(x + this.scene.halfCell / 2, y + this.scene.halfCell / 2);

        this.scene.physics.world.enable(this);
        this.body.debugShowBody = false;

        this.scene.add.existing(this);
    }
}
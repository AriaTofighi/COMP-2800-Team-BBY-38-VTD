import Bullet from "./Bullet"

export default class Bullet1 extends Bullet {

    /**
     * Constructor for Bullet 1
     * @param {Phaser.Scene} scene The scene this bullet is in.
     * @param {number} x The initial x position of this bullet.
     * @param {number} y The initial y position of this bullet.
     */
    constructor(scene, x, y) {
        super(scene, x, y, 'bullet');
        this.scene = scene;
        this.x = x;
        this.y = y;

        // Setting the damage of the bullet
        this.damage = 8;

        //Set the sizes and position of this object.
        this.setSize(16, 16);
        this.setDisplaySize(16, 16);
        this.setPosition(x + this.scene.halfCell / 2, y + this.scene.halfCell / 2);

        //Enable physics for this bullet.
        this.scene.physics.world.enable(this);

        this.scene.add.existing(this);
    }

    update() {
        //If the bullet goes out of bounds, destroy it.
        if (this.x < -20 || this.x > this.scene.sys.canvas.width + 20 || this.y > this.scene.sys.canvas.height + 20 || this.y < -20) {
            this.destroy();
        }
    }

    kill() {
        //Destroy function called by carrier's on hit.
        this.destroy();
    }
}
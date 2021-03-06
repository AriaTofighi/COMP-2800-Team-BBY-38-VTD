import Bullet from "./Bullet"
/**
 * Bullet3 is Mask Shooter bullet.
 */
export default class Bullet2 extends Bullet {
    /**
     * Constructor for Bullet 3
     * @param {Phaser.Scene} scene The scene this bullet is in.
     * @param {number} x The initial x position of this bullet.
     * @param {number} y The initial y position of this bullet.
     */
    constructor(scene, x, y) {
        super(scene, x, y, 'mask');
        this.scene = scene;
        this.x = x;
        this.y = y;

        // Setting the damage of the bullet
        this.damage = 10;

        //Set the size of this bullet.
        this.setSize(8, 8);
        this.setDisplaySize(8, 8);

        this.scene.physics.world.enable(this);

        this.scene.add.existing(this);
    }

    kill() {
        this.destroy();
    }
}
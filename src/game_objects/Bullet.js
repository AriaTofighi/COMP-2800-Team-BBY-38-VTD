/**
 * Bullet lays the foundation for all bullet types.
 */
export default class Bullet extends Phaser.GameObjects.Sprite {
    /**
     * Bullet constructor called by child bullets.
     * @param {Phaser.Scene} scene 
     * @param {number} x 
     * @param {number} y 
     * @param {Phaser.GameObjects.Sprite} bulletSprite 
     */
    constructor(scene, x, y, bulletSprite) {
        super(scene, x, y, bulletSprite);
    }
}
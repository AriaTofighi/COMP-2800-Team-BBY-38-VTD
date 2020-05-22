import Bullet from "./Bullet"

export default class Bullet2 extends Bullet {
    /**
     * Constructor for Bullet 2
     * @param {Phaser.Scene} scene The scene this bullet is in.
     * @param {number} x The initial x position of this bullet.
     * @param {number} y The initial y position of this bullet.
     * @param {number} angle The angle of the bullet.
     */
    constructor(scene, x, y, angle) {
        super(scene, x, y, 'water');
        this.scene = scene;
        this.x = x;
        this.y = y;

        //Create animations for water stream
        this.scene.anims.create({
            key: 'watershoot',
            frames: this.scene.anims.generateFrameNumbers('water', {
                start: 3,
                end: 5
            }),
            repeat: -1,
            frameRate: 20
        });

        //Create a new container for hitboxes.
        this.hitbox = this.scene.add.container();

        //Add four boxes to the hitbox container.
        for (let i = 1; i <= 4; i++) {
            this.hitbox.add(new Phaser.GameObjects.Rectangle(this.scene, this.x + (20 * i) * Math.cos(angle), this.y + (20 * i) * Math.sin(angle), 10 + (2 * i), 10 + (2 * i)));
        }

        //Enable physics for the hitboxes, set their speed.
        //Create an empty kill function so hitboxes don't go away on hit.
        this.hitbox.iterate((box) => {
            this.scene.physics.world.enable(box);
            box.kill = function () {};
            box.damage = 0.1;
        });

        //Set display size and play animation.
        this.setDisplaySize(24, 85);
        this.play('watershoot');

        //Enable physics
        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);
    }
}
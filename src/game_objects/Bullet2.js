import Bullet from "./Bullet"

export default class Bullet2 extends Bullet {
    constructor(scene, x, y, angle) {
        super(scene, x, y, 'water');
        this.scene = scene;
        this.x = x;
        this.y = y;

        //Create animations for water stream
        this.scene.anims.create({
            key: 'watershoot',
            frames: this.scene.anims.generateFrameNumbers('water', {start: 3, end: 5}),
            repeat: -1,
            frameRate: 20
        });

        this.hitbox = this.scene.add.container();

        for(let i = 1; i <= 4; i++){
            this.hitbox.add(new Phaser.GameObjects.Rectangle(this.scene, this.x + (20*i) * Math.cos(angle), this.y + (20*i) * Math.sin(angle), 10 + (2*i), 10 + (2*i)));
        }

        this.hitbox.iterate((box) => {
            this.scene.physics.world.enable(box);
            box.body.debugShowBody = false;
            box.destroy = function(){};
            box.damage = 0.1 * this.scene.speed;
        });

        this.setDisplaySize(24, 85);

        this.play('watershoot');

        this.scene.physics.world.enable(this);
        this.body.debugShowBody = false;

        this.scene.add.existing(this);
    }
}
import Bullet from "./Bullet"

export default class Bullet2 extends Bullet {
    constructor(scene, x, y) {
        super(scene, x, y, 'mask');
        this.scene = scene;
        this.x = x;
        this.y = y;
        
        // Setting the damage of the bullet
        this.damage = 10;

        this.setSize(8, 8);
        this.setDisplaySize(8,8);

        this.scene.physics.world.enable(this);

        this.scene.add.existing(this);
    }

    kill(){
        this.destroy();
    }
}
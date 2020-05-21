import Bullet from "./Bullet"

export default class Bullet1 extends Bullet {
    constructor(scene, x, y) {
        super(scene, x, y, 'bullet');
        this.scene = scene;
        this.x = x;
        this.y = y;
        
        // Setting the damage of the bullet
        this.damage = 8;

        this.setSize(16, 16);
        this.setDisplaySize(16,16);
        this.setPosition(x + this.scene.halfCell / 2, y + this.scene.halfCell / 2);

        this.scene.physics.world.enable(this);

        this.scene.add.existing(this);
    }

    update() {
        if (this.x < -20 || this.x > this.scene.sys.canvas.width + 20 || this.y > this.scene.sys.canvas.height + 20 || this.y < -20) {
            this.destroy();
        }
    }

    kill(){
        this.destroy();
    }
}
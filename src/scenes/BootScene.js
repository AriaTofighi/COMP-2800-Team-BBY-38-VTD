import logo from "../../assets/logo/vtdlogo.png";
export class BootScene extends Phaser.Scene {

    /**
     * Constructor for GameScene object.
     */
    constructor() {
        super('Boot');
    }

    /**
     * Set up the boot scene entities.
     */
    preload() {
        this.load.image('logo', logo);
    }
    
    create() {
        this.scene.start('Load');
    }

}
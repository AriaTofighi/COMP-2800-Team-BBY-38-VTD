import logo from "../../assets/logo/logo.png";

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

    /**
     * Create the boot scene.
     */
    create() {
        this.scene.start('Load');
    }
}
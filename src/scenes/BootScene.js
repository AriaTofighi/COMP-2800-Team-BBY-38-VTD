import logo from "../../assets/logo/vtdlogo.png";

/**
 * BootScene is the very first scene of the game
 * that includes the game logo.
 */
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
     * Create the boot scene entities.
     */
    create() {
        this.scene.start('Load');
    }

}
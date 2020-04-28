import logo from "../../assets/logo/logo.png";

export class BootScene extends Phaser.Scene {
    constructor() {
        super('Boot');
    }

    preload() {
        this.load.image('logo', logo);
    }

    create() {
        this.scene.start('Load');
    }
}

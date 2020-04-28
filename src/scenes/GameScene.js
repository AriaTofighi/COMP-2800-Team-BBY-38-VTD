import patrick from "../../assets/patrick.png";

export class GameScene extends Phaser.Scene {
    constructor() {
        super('Game');
    }

    preload() {
        this.load.image("patrick", patrick);
    }

    create() {
        this.pat = this.add.image(0, 0, "patrick");
        this.pat.setPosition(this.sys.canvas.width / 2, this.sys.canvas.height / 2);
        this.pat.setDisplaySize(this.sys.canvas.width, this.sys.canvas.height);
        
        // this.add.text(50, 100, "HIIIII");        
    }
}

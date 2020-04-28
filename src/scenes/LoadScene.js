import bullet from "../../assets/ingame/bullet.png";
import carrier from "../../assets/ingame/carrier.png";
import tile from "../../assets/ingame/tile.png";
import tower1 from "../../assets/ingame/tower1.png";
import { BlendModes } from "phaser";

export class LoadScene extends Phaser.Scene {
    constructor() {
        super('Load');
    }

    preload() {
        // Canvas dimensions
        let width = this.sys.canvas.width;
        let height = this.sys.canvas.width; 

        // Display logo
        let logo = this.add.image(0, 0, 'logo');
        logo.setPosition(width / 2, height / 2 - 170);
        logo.setDisplaySize(width / 3, height / 5);
        
        // Display load progress bar
        let loadBar = this.add.graphics();
        let loadBox = this.add.graphics();
        loadBox.fillStyle(0x222222, 0.9);
        loadBox.fillRect(width / 2 - 200, height / 2 - 10, 400, 40);

        // Display loading... text
        let loadingTxt = this.add.text(width / 2, height / 2 - 50, "Loading...", {
            color: "white",
            fontFamily: "Courier"

        });
        loadingTxt.setOrigin();

        // Display percentage text
        let percTxt = this.add.text(width / 2, height / 2 + 10, "0%", {
            color: "white",
            fontFamily: "Courier"

        });
        percTxt.setOrigin();
        

        // Add logo
        this.add.image(logo);

        // Load sprites
        this.load.image('bullet', bullet);
        this.load.image('carrier', carrier);
        this.load.image('tile', tile);
        this.load.image('tower1', tower1);

    }

    create() {   
        // this.scene.start('Game');
    }
}

import bullet from "../../assets/ingame/bullet.png";
import carrier from "../../assets/ingame/carrier.png";
import tile from "../../assets/ingame/tile.png";
import tower1 from "../../assets/ingame/tower1.png";
import cancelButton from "../../assets/buttons/cancel.png";
import pauseButton from "../../assets/buttons/pause.png";
import endButton from "../../assets/buttons/end.png";
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

        // Display loading items text
        let loadItemTxt = this.add.text(width / 2, height / 2 + 60, "Loading asset: " + "fileName", {
            color: "white",
            fontFamily: "Courier"

        });
        loadItemTxt.setOrigin();

        // Listen for load percentage progress and adjust text
        this.load.on('progress', function (value) {
            console.log(value);
            percTxt.setText(Math.round(value * 100) + "%");
            loadBar.clear();
            loadBar.fillStyle(0xffffff, 1);
            loadBar.fillRect(width / 2 - 190, height / 2 - 3, 380 * value, 26);
        });

        // Listens for an asset being loaded and updates text
        this.load.on('fileprogress', function (file) {
            loadItemTxt.setText('Loading asset: ' + file.key);
        });

        // Listens for asset loading to be complete and clears bar
        this.load.on('complete', function () {
            loadItemTxt.destroy();
            loadingTxt.destroy();
            percTxt.destroy();
            loadBar.destroy();
            loadBox.destroy();
        });

        // Add logo
        this.add.image(logo);

        // Load sprites
        this.load.image('bullet', bullet);
        this.load.image('carrier', carrier);
        this.load.image('tile', tile);
        this.load.image('tower1', tower1);

        // Load button images
        this.load.image("cancelButton", cancelButton);
        this.load.image("pauseButton", pauseButton);
        this.load.image("endButton", endButton);

        // Uncomment to test loading visuals
        // for (let i = 0; i < 1000; i ++) {
        //     this.load.image('bullet' + i, bullet);
        // }
    }

    create() {   
        this.scene.start('Game');
    }
}

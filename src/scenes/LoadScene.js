import bullet from "../../assets/ingame/soapbullet.png";
import carrier from "../../assets/ingame/carrier.png";
//import tile from "../../assets/ingame/tile.png";
import tower1 from "../../assets/ingame/tower1.png";
import tower2 from "../../assets/ingame/tower2.png";
import tower3 from "../../assets/ingame/tower3.png";
import cancelButton from "../../assets/buttons/cancel.png";
import pauseButton from "../../assets/buttons/pause.png";
import grass from "../../assets/ingame/grass.png";
import corner from "../../assets/ingame/corner.png";
import road from "../../assets/ingame/road.png";
import noTurret1 from "../../assets/ingame/noTurret1.png";
import noTurret2 from "../../assets/ingame/noTurret2.png";
import noTurret3 from "../../assets/ingame/noTurret3.png";
import menuButton from "../../assets/buttons/menuButton.png"
import resumeButton from "../../assets/pauseMenu/resume.png";
import resumePressButton from "../../assets/pauseMenu/resume_press.png";
import saveButton from "../../assets/pauseMenu/save.png";
import savePressButton from "../../assets/pauseMenu/save_press.png";
import endButton from "../../assets/pauseMenu/End.png";
import endPressButton from "../../assets/pauseMenu/end_press.png";
import pauseBackground from "../../assets/pauseMenu/pause_background.png";
import restartButton from "../../assets/buttons/restart.png";
import restartPressButton from "../../assets/buttons/restart_press.png";
import gameOver from "../../assets/ingame/game_over.png";
import startRound from "../../assets/buttons/startRound.png";
import menuBackground from "../../assets/menu/menu_background.png";
import login from "../../assets/menu/login.png";
import loginPress from "../../assets/menu/login_press.png";
import signup from "../../assets/menu/signup.png";
import signupPress from "../../assets/menu/signup_press.png";
import guest from "../../assets/menu/guest.png";
import guestPress from "../../assets/menu/guest_press.png";
import newGame from "../../assets/menu2/new_game.png";
import newGamePress from "../../assets/menu2/new_game_press.png";
import loadGame from "../../assets/menu2/load_game.png";
import loadGamePress from "../../assets/menu2/load_game_press.png";
import buttonClick from "../../assets/audio/button-click.mp3";
import about from "../../assets/menu/about_button.png";
import aboutPress from "../../assets/menu/about_button_press.png";

import { BlendModes } from "phaser";
import 'phaser';

export class LoadScene extends Phaser.Scene {

    /**
     * Constructor for LoadScene object.
     */
    constructor() {
        super('Load');
    }

    /**
     * Set up the loading screen entities.
     */
    preload() {
        // Canvas dimensions
        let width = this.game.renderer.width;
        let height = this.game.renderer.height; 

        // Display logo
        let logo = this.add.image(0, 0, 'logo');
        logo.setPosition(width / 2, height / 2 - 170);
        logo.setDisplaySize(width / 2, height / 3);
        
        // Display load progress bar
        let loadBar = this.add.graphics();
        let loadBox = this.add.graphics();
        loadBox.fillStyle(0x222222, 0.9);
        loadBox.fillRect(width / 2 - 200, height / 2 - 10, 400, 40);

        // Display "Loading..." text
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

        // Listens for load percentage progress and adjust text
        this.load.on('progress', function (value) {
            // console.log(value);
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

        // Load game over sprite
        this.load.spritesheet({
            key: 'gameOver',
            url: gameOver,
            frameConfig: {
                frameWidth: 800,
                frameHeight: 600
            }
        });

        // Add logo
        this.add.image(logo);

        // Load sprites
        this.load.image('bullet', bullet);
        this.load.spritesheet('carrier', carrier, {frameWidth: 37, frameHeight: 37});
        //this.load.image('tile', tile);
        this.load.image('tower1', tower1);
        this.load.image('tower2', tower2);
        this.load.image('tower3', tower3);
        this.load.image('bg', grass);
        this.load.image('corner', corner);
        this.load.image('road', road);;
        this.load.image('noTurret1', noTurret1);
        this.load.image('noTurret2', noTurret2);
        this.load.image('noTurret3', noTurret3);

        // Load button images
        this.load.image("cancelButton", cancelButton);
        this.load.image("pauseButton", pauseButton);
        this.load.image("menuButton", menuButton);
        this.load.image('restartButton', restartButton);
        this.load.image('restartPressButton', restartPressButton);
        this.load.image('startRound', startRound);

        // Load pause menu images
        this.load.image('pauseBackground', pauseBackground);
        this.load.image('resumeButton', resumeButton);
        this.load.image('resumePressButton', resumePressButton);
        this.load.image('saveButton', saveButton);
        this.load.image('savePressButton', savePressButton);
        this.load.image('endButton', endButton);
        this.load.image('endPressButton', endPressButton);

        // Load menu assets
        this.load.image('menuBackground', menuBackground);
        this.load.image('login', login);
        this.load.image('loginPress', loginPress);
        this.load.image('signup', signup);
        this.load.image('signupPress', signupPress);
        this.load.image('guest', guest);
        this.load.image('guestPress', guestPress);
        this.load.image('newGame', newGame);
        this.load.image('newGamePress', newGamePress);
        this.load.image('loadGame', loadGame);
        this.load.image('loadGamePress', loadGamePress);
        this.load.image('about', about);
        this.load.image('aboutPress', aboutPress);

        this.load.audio('buttonClick', buttonClick);
        // Uncomment to test loading visuals
        // for (let i = 0; i < 600; i ++) {
        //     this.load.image('bullet' + i, bullet);
        // }

        // Importing the follower plugin
        var url;
        url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexpathfollowerplugin.min.js';
        this.load.plugin('rexpathfollowerplugin', url, true);
    }

    /**
     * Create the load scene.
     */
    create() {   
        // TODO: check if user is logged in, if so, take them straight to Menu2
        this.scene.start('Menu1');
    }
}

import bullet from "../../assets/ingame/soapbullet.png";
import carrier from "../../assets/ingame/carrier.png";
import tower1 from "../../assets/ingame/tower1.png";
import tower2 from "../../assets/ingame/tower2.png";
import tower3 from "../../assets/ingame/tower3.png";
import cancelButton from "../../assets/buttons/cancel.png";
import pauseButton from "../../assets/buttons/pause.png";
import grass from "../../assets/ingame/grass.png";
import corner from "../../assets/ingame/corner.png";
import road from "../../assets/ingame/road.png";
import noTurret from "../../assets/ingame/noTurret.png";
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
import play from "../../assets/menu/play.png";
import playPress from "../../assets/menu/play_press.png";
import about from "../../assets/menu/about_button.png";
import aboutPress from "../../assets/menu/about_button_press.png";
import gameMusic from "../../assets/audio/game_music.mp3";
import buttonHover from "../../assets/audio/button_hover.mp3";
import buttonClick from "../../assets/audio/button_click.mp3";
import towerButtonClick from "../../assets/audio/tower_button_click.mp3";
import towerBuild from "../../assets/audio/tower_build.mp3";
import towerDestroy from "../../assets/audio/tower_destroy.mp3";
import towerUpgrade from "../../assets/audio/tower_upgrade.mp3";
import gameOverAudio from "../../assets/audio/game_over.mp3";
import soap from "../../assets/audio/soap.mp3";
import waterStream from "../../assets/audio/water_stream.mp3";
import maskSnap from "../../assets/audio/mask_snap.mp3";
import noMoney from "../../assets/audio/no_money.mp3";
import logout from "../../assets/menu/logout.png";
import logoutPress from "../../assets/menu/logout_press.png";
import leaderboard from "../../assets/menu/leaderboard.png";
import leaderboardPress from "../../assets/menu/leaderboard_press.png";
import fullscreen from "../../assets/buttons/fullscreen.png";
import fullscreenPress from "../../assets/buttons/fullscreen_press.png";
import city from "../../assets/ingame/city.png";
import water from "../../assets/ingame/waterstream.png";
import challenge from "../../assets/ingame/challenge.png";
import mask from "../../assets/ingame/mask.png";
import box from "../../assets/ingame/menubox.png";
import infoBox from "../../assets/ingame/infoBox.png";
import infoBox_2 from "../../assets/ingame/infoBox_2.png";
import arrow from "../../assets/ingame/arrow.png";
import infoButton from "../../assets/buttons/info.png";
import twitter from "../../assets/buttons/twitter.png";
import facebook from "../../assets/buttons/facebook.png";
import building from "../../assets/ingame/building.png";
import 'phaser';


/**
 * LoadScene is the scene where all the assets of game
 * get loaded.
 */
export class LoadScene extends Phaser.Scene {

    /**
     * Constructs the LoadScene object.
     */
    constructor() {
        /**
         * Constructor for Phaser.Scene object.
         */
        super('Load');
    }

    /**
     * Set up the loading screen entities.
     */
    preload() {
        // Canvas dimensions.
        let width = this.game.renderer.width;
        let height = this.game.renderer.height; 

        // Display logo.
        let logo = this.add.image(0, 0, 'logo');
        logo.setPosition(width / 2, height / 2 - 170);
        logo.setDisplaySize(width / 2, height / 3);
        
        // Display load progress bar.
        let loadBar = this.add.graphics();
        loadBar.depth = 2;
        let loadBox = this.add.graphics();
        loadBox.fillStyle(0x000000, 0.9); // 0x222222
        loadBox.fillRect(width / 2 - 200, height / 2 - 10, 400, 40);

        // Display "Loading..." text.
        let loadingTxt = this.add.text(width / 2, height / 2 - 50, "Loading...", {
            color: "white",
            fontFamily: "Courier"
        });
        loadingTxt.setOrigin();
        loadingTxt.setFontFamily('Odibee Sans');
        loadingTxt.setFontSize(25);

        // Display percentage text.
        let percTxt = this.add.text(width / 2, height / 2 + 10, "0%", {
            color: "white",
            fontFamily: "Courier"
        });
        percTxt.setOrigin();
        percTxt.depth = 3;
        percTxt.setFontFamily('Odibee Sans');
        percTxt.setFontSize(20);

        // Display loading items text.
        let loadItemTxt = this.add.text(width / 2, height / 2 + 60, "Loading asset: " + "fileName", {
            color: "white",
            fontFamily: "Courier"
        });
        loadItemTxt.setOrigin();
        loadItemTxt.setFontFamily('Odibee Sans');
        loadItemTxt.setFontSize(20);

        // Listens for load percentage progress and adjust text.
        this.load.on('progress', function (value) {
            // console.log(value);
            percTxt.setText(Math.round(value * 100) + "%");
            loadBar.clear();
            loadBar.fillStyle(0x7A1010, 1);
            loadBar.fillRect(width / 2 - 190, height / 2 - 3, 380 * value, 26);
        });

        // Listens for an asset being loaded and updates text.
        this.load.on('fileprogress', function (file) {
            loadItemTxt.setText('Loading asset: ' + file.key);
        });

        // Listens for asset loading to be complete and clears bar.
        this.load.on('complete', function () {
            loadItemTxt.destroy();
            loadingTxt.destroy();
            percTxt.destroy();
            loadBar.destroy();
            loadBox.destroy();
        });

        // Load game over sprite.
        this.load.spritesheet({
            key: 'gameOver',
            url: gameOver,
            frameConfig: {
                frameWidth: 800,
                frameHeight: 600
            }
        });

        // Load challenge mode sprite.
        this.load.spritesheet({
            key: 'challengeMode',
            url: challenge,
            frameConfig: {
                frameWidth: 1920,
                frameHeight: 1080
            }
        });

        // Add logo.
        this.add.image(logo);

        // Load sprites.
        this.load.image('bullet', bullet);
        this.load.spritesheet('carrier', carrier, {frameWidth: 37, frameHeight: 37});
        this.load.image('tower1', tower1);
        this.load.image('tower2', tower2);
        this.load.spritesheet('tower3', tower3, {frameWidth: 64});
        this.load.image('bg', grass);
        this.load.image('corner', corner);
        this.load.image('road', road);
        this.load.image('noTurret', noTurret);
        this.load.image('city', city);
        this.load.spritesheet('water', water, {frameWidth: 196, frameHeight: 336});
        this.load.image('mask', mask);
        this.load.image('box', box);
        this.load.image('building', building);

        // Load misc button images.
        this.load.image("cancelButton", cancelButton);
        this.load.image("pauseButton", pauseButton);
        this.load.image("menuButton", menuButton);
        this.load.image('restartButton', restartButton);
        this.load.image('restartPressButton', restartPressButton);
        this.load.image('startRound', startRound);
        this.load.image('infoButton', infoButton);
        this.load.image('twitter', twitter);
        this.load.image('facebook', facebook);

        // Load pause menu images.
        this.load.image('pauseBackground', pauseBackground);
        this.load.image('resumeButton', resumeButton);
        this.load.image('resumePressButton', resumePressButton);
        this.load.image('saveButton', saveButton);
        this.load.image('savePressButton', savePressButton);
        this.load.image('endButton', endButton);
        this.load.image('endPressButton', endPressButton);
        this.load.image('fullscreen', fullscreen);
        this.load.image('fullscreenPress', fullscreenPress);

        // Load menu assets.
        this.load.image('menuBackground', menuBackground);
        this.load.image('login', login);
        this.load.image('loginPress', loginPress);
        this.load.image('signup', signup);
        this.load.image('signupPress', signupPress);
        this.load.image('play', play);
        this.load.image('playPress', playPress);
        this.load.image('about', about);
        this.load.image('aboutPress', aboutPress);
        this.load.image('logout', logout);
        this.load.image('logoutPress', logoutPress);
        this.load.image('leaderboard', leaderboard);
        this.load.image('leaderboardPress', leaderboardPress);

        // Load audio
        this.load.audio('gameMusic', gameMusic);
        this.load.audio('buttonHover', buttonHover);
        this.load.audio('buttonClick', buttonClick);
        this.load.audio('towerButtonClick', towerButtonClick);
        this.load.audio('towerBuild', towerBuild);
        this.load.audio('towerDestroy', towerDestroy);
        this.load.audio('towerUpgrade', towerUpgrade);
        this.load.audio('gameOverAudio', gameOverAudio);
        this.load.audio('soap', soap);
        this.load.audio('waterStream', waterStream);
        this.load.audio('maskSnap', maskSnap);
        this.load.audio('noMoney', noMoney);

        // Load info box images.
        this.load.image('infoBox', infoBox);
        this.load.image('infoBox_2', infoBox_2);
        this.load.image('arrow', arrow);

        // Importing the follower plugin.
        var url;
        url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexpathfollowerplugin.min.js';
        this.load.plugin('rexpathfollowerplugin', url, true);
    }

    /**
     * Start the menu scene.
     */
    create() {   
        // Your web app's Firebase configuration
        var firebaseConfig = {
            apiKey: "AIzaSyC5esnkaw9-wOcFU1qaeA7__AEoCNawBuY",
            authDomain: "virustd-8fdd6.firebaseapp.com",
            databaseURL: "https://virustd-8fdd6.firebaseio.com",
            projectId: "virustd-8fdd6",
            storageBucket: "virustd-8fdd6.appspot.com",
            messagingSenderId: "819193398890",
            appId: "1:819193398890:web:393570d53dc05c5eeaec13"
        };
        // Initialize Firebase
        this.app = firebase.initializeApp(firebaseConfig);
        
        this.scene.start('Menu1');
    }
}
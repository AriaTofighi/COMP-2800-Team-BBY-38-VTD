import {bgm} from './GameScene.js';

export class PauseScene extends Phaser.Scene {

    /**
     * Constructor for PauseScene object.
     */
    constructor() {
        super('Pause');
    }
    /**
     * Create the pause scene.
     */
    create() {
        bgm.pause();

        this.scene.bringToTop('Pause');
        this.background = this.add.image(0, 0, 'pauseBackground');
        this.background.setOrigin(0, 0);
        this.background.alpha = 0.7;
        this.background.setDisplaySize(800, 608);

        // Creating the resume button
        this.resumeButton = this.add.image(400, 150, "resumeButton");
        this.resumeButton.setInteractive({
            cursor: 'pointer'
        });
        // On hover of resume button
        this.resumeButton.on('pointerover', function () {
            this.sound.play('buttonHover');
        }.bind(this));
        // On pressed down of resume button
        this.resumeButton.on('pointerdown', function () {
            this.resumeButton.setTexture('resumePressButton');
        }.bind(this));
        // On release of resume button
        this.resumeButton.on('pointerup', function () {
            bgm.play();
            this.sound.play('buttonClick');
            this.resumeButton.setTexture('resumePressButton');
            this.scene.stop(); 
            this.scene.resume('Game');
            this.scene.resume('UI');
        }.bind(this));

        // Creating the fullscreen button
        this.fullScreenButton = this.add.image(400, 250, "fullscreen");
        this.fullScreenButton.setInteractive({
            cursor: 'pointer'
        });
        // On hover of resume button
        this.fullScreenButton.on('pointerover', function () {
            this.sound.play('buttonHover');
        }.bind(this));
        // On pressed down of resume button
        this.fullScreenButton.on('pointerdown', function () {
            this.fullScreenButton.setTexture('fullscreenPress');
        }.bind(this));
        // On release of resume button
        this.fullScreenButton.on('pointerup', function () {
            this.sound.play('buttonClick');
            this.toggleFullscreen();
        }.bind(this));

        // Creating the end button
        this.endButton = this.add.image(400, 350, 'endButton');
        this.endButton.setInteractive({
            cursor: 'pointer'
        });
        // On hover of end button
        this.endButton.on('pointerover', function () {
            this.sound.play('buttonHover');
        }.bind(this));
        // On pressed down of end button
        this.endButton.on('pointerdown', function () {
            this.endButton.setTexture('endPressButton');
        }.bind(this));
        // On release of end button
        this.endButton.on('pointerup', function () {
            this.sound.play('buttonClick');
            this.sound.removeAll();
            this.endButton.setTexture('endPressButton');
            this.scene.stop('Game');
            this.scene.stop('UI');
            this.scene.start('Menu1');
            // TODO: what the end button does
        }.bind(this));

        this.input.on('pointerup', function () {
            this.resumeButton.setTexture('resumeButton');
            this.fullScreenButton.setTexture('fullscreen');
            this.endButton.setTexture('endButton');
        }.bind(this));

        // Resume the game when clicking escape
        this.input.keyboard.on('keydown-ESC', function () {
            bgm.play();
            this.scene.resume('Game');
            this.scene.stop();
        }.bind(this));
    }

    toggleFullscreen() {
        if (!this.fullScreen) {
            this.openFullscreen();
            this.fullScreen = true;
        } else {
            this.closeFullscreen();
            this.fullScreen = false;
        }
    }

    /**
     * @src https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_fullscreen2
     */
    openFullscreen() {
        var elem = document.documentElement;
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) { /* Firefox */
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE/Edge */
            elem.msRequestFullscreen();
        }
    }

    /**
     * @src https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_fullscreen2
     */
    closeFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}
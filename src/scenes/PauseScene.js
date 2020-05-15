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
        this.background = this.add.image(0, 0, 'pauseBackground');
        this.background.setOrigin(0, 0);
        this.background.alpha = 0.4;
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
            this.sound.play('buttonClick');
            this.resumeButton.setTexture('resumePressButton');
            this.scene.resume('Game');
            this.scene.stop();
        }.bind(this));

        // Creating the save button
        this.saveButton = this.add.image(400, 250, "saveButton");
        this.saveButton.setInteractive({
            cursor: 'pointer'
        });
        // On hover of save button
        this.saveButton.on('pointerover', function () {
            this.sound.play('buttonHover');
        }.bind(this));
        // On pressed down of save button
        this.saveButton.on('pointerdown', function () {
            this.saveButton.setTexture('savePressButton');
        }.bind(this));
        // On release of save button
        this.saveButton.on('pointerup', function () {
            this.sound.play('buttonClick');
            this.saveButton.setTexture('savePressButton');
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
            this.endButton.setTexture('endPressButton');
            this.scene.stop('Game');
            this.scene.start('Menu2');
        }.bind(this));
        
        this.input.on('pointerup', function () {
            this.resumeButton.setTexture('resumeButton');
            this.saveButton.setTexture('saveButton');
            this.endButton.setTexture('endButton');
        }.bind(this));

        // Resume the game when clicking escape
        this.input.keyboard.on('keydown-ESC', function () {
            this.scene.resume('Game');
            this.scene.stop();
        }.bind(this));
    }
}
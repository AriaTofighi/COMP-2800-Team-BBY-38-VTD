export class GameOverScene extends Phaser.Scene {

    /**
     * Constructor for GameOverScene object.
     */
    constructor() {
        super('GameOver');
    }

    init(data) {
        this.roundReached = data.roundReached;
    }

    /**
     * Create the scene for Game Over.
     */
    create() {
        // Get canvas width and height
        this.width = this.sys.canvas.width;
        this.height = this.sys.canvas.height;

        // Make background for the game over scene.
        this.background = this.add.rectangle(0, 0, 800, 608, 0x000000, 0.53);
        this.background.setOrigin(0, 0);

        // Creating the game over animation.
        this.gameOver = this.add.sprite(0, 0, 'gameOver');
        this.gameOver.setOrigin(0, 0);
        this.gameOver.setDisplaySize(800, 608);
        this.anims.create({
            key: 'startGameOver',
            duration: 8320,
            frames: this.anims.generateFrameNames('gameOver', {
                start: 0,
                end: 200
            }),
            repeat: -1
        });
        this.gameOver.play('startGameOver');

        //Creating the game over sound effect.
        this.sound.play('gameOverAudio');

        // Creating the restart button.
        this.restartButton = this.add.image(400, 500, "restartButton");
        this.restartButton.setInteractive({
            cursor: 'pointer'
        });

        // On hover for restart button.
        this.restartButton.on('pointerover', function () {
            this.sound.play('buttonHover');
        }.bind(this));

        // On pressed down for restart button.
        this.restartButton.on('pointerdown', function () {
            this.restartButton.setTexture('restartPressButton');
        }.bind(this));

        // On release for restart button.
        this.restartButton.on('pointerup', function () {
            this.sound.play('buttonClick');
            this.restartButton.setTexture('restartPressButton');
            this.scene.start('Game');
        }.bind(this));

        this.input.on('pointerup', function () {
            this.restartButton.setTexture('restartButton');
        }.bind(this));

        // Displays round reached
        this.roundReachedText = this.add.text(this.width / 2, this.height / 2 - 150, "YOU REACHED ROUND " + this.roundReached, {fontFamily: 'Odibee Sans', fontSize: 50});
        this.roundReachedText.setOrigin();
        this.roundReachedText.setStroke('black', 3);
    }
}
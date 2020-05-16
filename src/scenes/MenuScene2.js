// This Menu is for starting or loading a game
export class MenuScene2 extends Phaser.Scene {
    /**
     * Constructor for GameScene object.
     */
    constructor() {
        super('Menu2');
    }

    /**
     * Set up the second menu's entities.
     */
    preload() {}

    /**
     * Create the second menu's scene.
     */
    create() {
        // Canvas dimensions
        let width = this.game.renderer.width;
        let height = this.game.renderer.height;

        // Display menu background
        this.menuBackground = this.add.image(width / 2, height / 2, 'menuBackground');
        this.menuBackground.setDisplaySize(width, height);
        this.menuBackground.alpha = 0.7;

        // Display logo
        this.logo = this.add.image(width / 2, height / 2 - 170, 'logo');
        this.logo.setDisplaySize(width / 2, height / 3);

        // Display New Game button
        this.newGame = this.add.image(width / 2, height / 2, 'newGame');
        this.newGame.setInteractive({
            cursor: 'pointer'
        });
        // On hover of New Game button
        this.newGame.on('pointerover', () => {
            this.sound.play('buttonHover');
        });
        // On pressed down of New Game button
        this.newGame.on('pointerdown', () => {
            this.newGame.setTexture('newGamePress');
        });
        // On release of New Game button
        this.newGame.on('pointerup', () => {
            this.sound.play('buttonClick');
            this.newGame.setTexture('newGame');
            this.scene.start('Game');
        });
        this.input.on('pointerup', () => {
            this.newGame.setTexture('newGame');
        });

        // Display Load Game button
        this.loadGame = this.add.image(width / 2, height / 2 + 70, 'loadGame');
        this.loadGame.setInteractive({
            cursor: 'pointer'
        });
        // On hover of Load Game button
        this.loadGame.on('pointerover', () => {
            this.sound.play('buttonHover');
        });
        // On pressed down of Load Game button
        this.loadGame.on('pointerdown', () => {
            this.loadGame.setTexture('loadGamePress');
        });
        // On release of Load Game button
        this.loadGame.on('pointerup', () => {
            this.sound.play('buttonClick');
            this.loadGame.setTexture('loadGame');
        });
        this.input.on('pointerup', () => {
            this.loadGame.setTexture('loadGame');
        });
    }
}
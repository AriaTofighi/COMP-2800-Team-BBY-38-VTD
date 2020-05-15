// This menu is for logging in or playing as a guest
export class MenuScene1 extends Phaser.Scene {
    /**
     * Constructor for GameScene object.
     */
    constructor() {
        super('Menu1');
    }

    /**
     * Set up the first menu's entities.
     */
    preload() {}

    /**
     * Create the first menu scene.
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

        // Display Login button
        this.login = this.add.image(width / 2, height / 2, 'login');
        this.login.setInteractive({
            cursor: 'pointer'
        });
        // On hover of login button
        this.login.on('pointerover', () => {
            this.sound.play('buttonHover');
        });
        // On pressed down of login button
        this.login.on('pointerdown', () => {
            this.login.setTexture('loginPress');
        });
        // On release of login button
        this.login.on('pointerup', () => {
            this.sound.play('buttonClick');
            this.login.setTexture('login');
            window.location.href = "../../login.html";
        });
        this.input.on('pointerup', () => {
            this.login.setTexture('login');
        });

        // // Display Signup button
        // this.signup = this.add.image(width / 2, height / 2 + 70, 'signup');
        // this.signup.setInteractive({cursor: 'pointer'});
        // this.signup.on('pointerdown', () => {
        //     this.signup.setTexture('signupPress');
        // });
        // this.signup.on('pointerup', () => {
        //     this.sound.play('buttonClick');
        //     this.signup.setTexture('signup');
        // });
        // this.signup.on('pointerover', () => {
        //     this.sound.play('buttonHover');
        // });

        // Display Guest button
        this.guest = this.add.image(width / 2, height / 2 + 70, 'guest');
        this.guest.setInteractive({
            cursor: 'pointer'
        });
        // On hover of guest button
        this.guest.on('pointerover', () => {
            this.sound.play('buttonHover');
        });
        // On pressed down of guest button
        this.guest.on('pointerdown', () => {
            this.guest.setTexture('guestPress');
        });
        // On release of guest button
        this.guest.on('pointerup', () => {
            this.sound.play('buttonClick');
            this.guest.setTexture('guest');
            this.scene.start('Menu2');
        });
        this.input.on('pointerup', () => {
            this.guest.setTexture('guest');
        });

        // Display About button
        this.about = this.add.image(width / 2, height / 2 + 140, 'about');
        this.about.setInteractive({
            cursor: 'pointer'
        });
        // On hover of about button
        this.about.on('pointerover', () => {
            this.sound.play('buttonHover');
        });
        // On pressed down of about button
        this.about.on('pointerdown', () => {
            this.about.setTexture('aboutPress');
        });
        // On release of about button
        this.about.on('pointerup', () => {
            this.sound.play('buttonClick');
            this.about.setTexture('about');
            window.location.href = "../../about.html";
        });
        this.input.on('pointerup', () => {
            this.about.setTexture('about');
        });
    }
}
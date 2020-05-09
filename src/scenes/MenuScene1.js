// This menu is for logging in or playing as a guest
export class MenuScene1 extends Phaser.Scene {
    /**
    * Constructor for GameScene object.
    */
    constructor() {
        super('Menu1');
    }

    preload() {
    }

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
        this.login.setInteractive({cursor: 'pointer'});
        this.login.on('pointerdown', () => {
            this.login.setTexture('loginPress');
        });
        this.login.on('pointerup', () => {
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
        //     this.signup.setTexture('signup');
        // });

        // Display Guest button
        this.guest = this.add.image(width / 2, height / 2 + 70, 'guest');
        this.guest.setInteractive({cursor: 'pointer'});
        this.guest.on('pointerdown', () => {
            this.guest.setTexture('guestPress');
        });
        this.guest.on('pointerup', () => {
            this.guest.setTexture('guest');
            this.scene.start('Menu2');
        });
        this.input.on('pointerup', () => {
            this.guest.add.audio('hover').play();
            this.guest.setTexture('guest');
        });
    }
}
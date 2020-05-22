/**
 * MenuScene1 is the main menu of the game where user
 * can access all the sections of the game.
 */
export class MenuScene1 extends Phaser.Scene {
    /**
     * Constructor for GameScene object.
     */
    constructor() {
        /**
         * Constructor for Phaser.Scene object.
         */
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

        // Create status text
        this.status = this.add.text(10, 40, "");

        // Display Login / Logout button
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                // User is signed in.       
                this.logout = this.add.image(width / 2, height / 2, 'logout');
                this.logout.setInteractive({
                    cursor: 'pointer'
                });
                this.status.setText("Playing as ");
                this.status.setFontFamily('Arial');
                this.status.setFontSize(25);
                this.status.setOrigin(0, 1);
                this.displayName = this.add.text(134, 42, user.displayName);
                this.displayName.setFontFamily('Arial');
                this.displayName.setFontSize(25);
                this.displayName.setFill('red');
                this.displayName.setStroke('black', 5);
                this.displayName.setOrigin(0, 1);
                // On hover of logout button
                this.logout.on('pointerover', () => {
                    this.sound.play('buttonHover');
                });
                // On pressed down of logout button
                this.logout.on('pointerdown', () => {
                    this.logout.setTexture('logoutPress');
                });
                // On release of logout button
                this.logout.on('pointerup', () => {
                    this.sound.play('buttonClick');
                    this.logout.setTexture('logout');
                    this.signUserOut();
                });
                this.input.on('pointerup', () => {
                    this.logout.setTexture('logout');
                });
            } else {
                // User is not signed in.
                this.login = this.add.image(width / 2, height / 2, 'login');
                this.login.setInteractive({
                    cursor: 'pointer'
                });
                this.status.setText("Playing as Guest");
                // this.status = this.add.text(10, 40, "Playing as Guest");
                this.status.setFontFamily('Arial');
                this.status.setFontSize(25);
                this.status.setOrigin(0, 1);
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
            }
        }.bind(this), function (error) {
            console.log(error);
        });


        // Display play button
        this.play = this.add.image(width / 2, height / 2 + 70, 'play');
        this.play.setInteractive({
            cursor: 'pointer'
        });
        // On release of logout button
        this.play.on('pointerover', () => {
            this.sound.play('buttonHover');
        });
        // On release of logout button
        this.play.on('pointerdown', () => {
            this.play.setTexture('playPress');
        });
        // On release of logout button
        this.play.on('pointerup', () => {
            this.sound.play('buttonClick');
            this.play.setTexture('play');
            this.scene.start('Game');
        });
        this.input.on('pointerup', () => {
            this.play.setTexture('play');
        });

        // Display About button
        this.about = this.add.image(width / 2, height / 2 + 70 * 2, 'about');
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

        // Display leaderboard button
        this.leaderboard = this.add.image(width / 2, height / 2 + 70 * 3, 'leaderboard');
        this.leaderboard.setInteractive({
            cursor: 'pointer'
        });
        // On hover of leaderboard button
        this.leaderboard.on('pointerover', () => {
            this.sound.play('buttonHover');
        });
        // On pressed down of leaderboard button
        this.leaderboard.on('pointerdown', () => {
            this.sound.play('buttonClick');
            this.leaderboard.setTexture('leaderboardPress');
        });
        // On release of leaderboard button
        this.leaderboard.on('pointerup', () => {
            this.sound.play('buttonClick');
            this.leaderboard.setTexture('leaderboard');
            window.location.href = "../../leaderboard.html";
        });
        this.input.on('pointerup', () => {
            this.leaderboard.setTexture('leaderboard');
        });

        // Creating the twitter button
        this.twitterUrl = 'https://twitter.com/intent/tweet?text=Come '
                    + 'and play VTD! https://virustd-8fdd6.web.app/';
        this.twitter = this.add.image(350, 570, 'twitter');
        this.twitter.setDisplaySize(87, 32);
        this.twitter.setInteractive({
            cursor: 'pointer'
        });
        this.twitter.on('pointerdown', function () {
            window.open(this.twitterUrl, '_blank');
        }.bind(this));

        // Creating the facebook button
        this.facebookUrl = 'https://facebook.com/share.php?u='
                            + 'http://virustd-8fdd6.web.app';
        this.facebook = this.add.image(450, 570, 'facebook');
        this.facebook.setDisplaySize(87, 32);
        this.facebook.setInteractive({
            cursor: 'pointer'
        });
        this.facebook.on('pointerdown', function () {
            window.open(this.facebookUrl, '_blank');
        }.bind(this));
    }

    signUserOut() {
        firebase.auth().signOut().then(function () {
            // Sign-out successful. 
            console.log("Signed out user.");
        }).catch(function (error) {
            // An error happened.
            console.log(error);
        });
    }
}
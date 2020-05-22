/**
 * InfoScene includes all the information about how to
 * play and how to stay safe against viruses.
 */
export class InfoScene extends Phaser.Scene {

    /**
     * Constructor for InfoScene object.
     */
    constructor() {
        /**
         * Constructor for Phaser.Scene object.
         */
        super('Info');
    }

    /**
     * Set up the scene entities.
     */
    init() {
        this.width = this.sys.canvas.width;
        this.height = this.sys.canvas.height;
    }

    /**
     * Start the InfoScene scene.
     */
    create() {
        this.scene.bringToTop('Info');

        this.background = this.add.image(0, 0, 'pauseBackground');
        this.background.setOrigin(0, 0);
        this.background.alpha = 0.7;
        this.background.setDisplaySize(800, 608);
        
        this.infoBox = this.add.image(this.width / 2, this.height / 2, 'infoBox');
        this.infoBox.setDisplaySize(300, 400);

        this.arrowContainer = this.add.container(this.width / 2, this.height / 2 + this.infoBox.displayHeight / 2);
        
        this.cancelButton = this.add.image(90, 30, 'cancelButton');
        this.cancelButton.setDisplaySize(48, 48);
        this.cancelButton.setInteractive({
            cursor: 'pointer'
        }).on('pointerdown', function() {
            this.sound.play('buttonClick');
            this.scene.stop(); 
            this.scene.resume('Game');
            this.scene.resume('UI');
        }.bind(this));

        this.leftArrow = this.add.image(-30, 30, 'arrow');
        this.leftArrow.setDisplaySize(48, 48);
        this.leftArrow.setRotation(Math.PI);
        this.leftArrow.alpha = 0.5;
        this.leftArrow.on('pointerdown', function() {
            this.sound.play('buttonClick');
            this.infoBox.setTexture('infoBox');
            this.rightArrow.alpha = 1;
            this.rightArrow.setInteractive({
                cursor: 'pointer'
            });
            this.leftArrow.alpha = 0.5;
            this.leftArrow.disableInteractive();
        }.bind(this));

        this.rightArrow = this.add.image(30, 30, 'arrow');
        this.rightArrow.setDisplaySize(48, 48);
        this.rightArrow.setInteractive({
            cursor: 'pointer'
        });
        this.rightArrow.on('pointerdown', function() {
            this.sound.play('buttonClick');
            this.infoBox.setTexture('infoBox_2');
            this.rightArrow.alpha = 0.5;
            this.rightArrow.disableInteractive();
            this.leftArrow.alpha = 1;
            this.leftArrow.setInteractive({
                cursor: 'pointer'
            });
        }.bind(this));

        this.arrowContainer.add(this.cancelButton);
        this.arrowContainer.add(this.leftArrow);
        this.arrowContainer.add(this.rightArrow);    
    }
}
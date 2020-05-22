import 'phaser';

export default class ChallengeCarrier extends Phaser.GameObjects.PathFollower {
    /**
     * 
     * @param {Phaser.Scene} scene 
     * @param {Phaser.Curves.Path} path 
     * @param {number} x 
     * @param {number} y 
     * @param {Phaser.GameObjects.Image} texture 
     * @param {number} duration 
     * @param {number} hp 
     */
    constructor(scene, path, x, y, texture, duration, hp) {
        super(scene, path, x, y, texture);
        this.duration = duration;
        this.x = x;
        this.y = y;
        this.scene = scene;
        this.path = path;
        this.hp = hp;
        this.maxhp = this.hp;
        this.clean = false;

        // Creating the health bar for the virus
        this.barBack = this.scene.add.graphics();
        this.barHealth = this.scene.add.graphics();

        // The background part of the bar
        this.barBack.fillStyle(0xA32020);
        this.barBack.fillRect(-this.scene.halfCell, -this.scene.halfCell, this.scene.halfCell * 2, 4);

        // The health part of the bar
        this.healthRect = new Phaser.Geom.Rectangle(-this.scene.halfCell, -this.scene.halfCell, this.scene.halfCell * 2, 4);
        this.barHealth.fillStyle(0xffffff);
        this.barHealth.fillRectShape(this.healthRect);

        // Adding the background part of the bar to a path follower
        this.barBack.pathFollower = this.scene.plugins.get('rexpathfollowerplugin').add(this.barBack, {
            path: this.path,
            t: 0,
        });

        // Starts the background bar movement
        this.scene.tweens.add({
            targets: this.barBack.pathFollower,
            t: 1,
            duration: this.duration,
            yoyo: false, // switches directions when end of path is reached
            repeat: 0, // infinite
        });

        // Adding the health part of the bar to a path follower
        this.barHealth.pathFollower = this.scene.plugins.get('rexpathfollowerplugin').add(this.barHealth, {
            path: this.path,
            t: 0
        });

        //Create walking animation.
        this.scene.anims.create({
            key: 'walk',
            frames: this.scene.anims.generateFrameNumbers('carrier', {start: 0, end: 7}),
            frameRate: 16,
            repeat: -1 
        });

        //Play walking animation
        this.play('walk');
        //Set tint to indicate carrier status
        this.setTint(0xff000);

        // Starts the health bar movement
        this.scene.tweens.add({
            targets: this.barHealth.pathFollower,
            t: 1,
            duration: this.duration,
            yoyo: false, // switches directions when end of path is reached
            repeat: 0, // infinite
        });

        //Set the display size.
        this.setDisplaySize(24, 24);

        //Enable physics.
        this.scene.physics.world.enable(this);
        
        //Set the hitbox and fix rotation.
        this.body.setCircle(16);
        this.setRotation(1.5708);

        //Set the carrier to follow the path.
        this.startFollow({
            rotateToPath: true,
            duration: this.duration,
            yoyo: false, // Switches directions when end of path is reached
            repeat: 0, // infinite
        });

        this.scene.add.existing(this);
    }

    /**
     * Updates the carrier object
     */
    update() {
        // Destroys this carrier and makes the health bar invisible if reaches end of path
        if (this.reachedEndPath()) {
            if (!this.clean & this.scene.firstTime){
                this.scene.ui.health -= 5;
            }
            this.barBack.alpha = 0;
            this.barHealth.alpha = 0;
            this.destroy();
        }
    }

    /**
     * Carrier reaches end of path
     */
    reachedEndPath() {
        return this.x == this.scene.cellWidth * 16 + this.scene.halfCell && this.y == this.scene.cellWidth * 19 + this.scene.halfCell;
    }

    /**
     * Get hit by a bullet.
     * @param {Bullet} bullet 
     */
    getHit(bullet){
        this.hp -= bullet.damage;

        // Updating the health bar
        this.barHealth.clear();
        this.barHealth.fillStyle(0xffffff);
        var newWidth =  Math.floor(30 * (this.hp / this.maxhp));
        
        // Checking if the virus is still alive
        if (newWidth >= 0) {
            this.healthRect.width = newWidth;
        } else {
            this.clearTint();
            this.clean = true;
            this.scene.carriers.remove(this);
            this.scene.civilians.add(this);
            this.barBack.alpha = 0;
            this.barHealth.alpha = 0;
        }
        this.barHealth.fillRectShape(this.healthRect);
        bullet.destroy();
    }
}
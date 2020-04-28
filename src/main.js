/** @type {import("../typings/phaser")} */
import {GameScene} from "./scenes/GameScene";
import {BootScene} from "./scenes/BootScene";
import {LoadScene} from "./scenes/LoadScene";

// Phaser 
let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scale: {
        parent: 'body',
        mode: Phaser.Scale.FIT,
    },
    roundPixels: true
};

let game = new Phaser.Game(config);
game.scene.add('Game', GameScene);
game.scene.add('Boot', BootScene);
game.scene.add('Load', LoadScene);
game.scene.start('Boot');


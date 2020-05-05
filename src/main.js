/** @type {import("../typings/phaser")} */
import {GameScene} from "./scenes/GameScene";
import {BootScene} from "./scenes/BootScene";
import {LoadScene} from "./scenes/LoadScene";
import phaser from '../node_modules/phaser';
import jquery from '../node_modules/jquery';

// Phaser game config
let config = {
    type: Phaser.AUTO,
    width: 800, // should be multiple of cell width
    height: 608, // should be multiple of cell height
    scale: {
        parent: 'body',
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,

    },
    roundPixels: true,
    physics: {
        default: 'arcade',
        arcade: {debug: true}
    }
};

//Sets up the game and adds the GameScene, BootScene, and LoadScene to the game.
let game = new Phaser.Game(config);
game.scene.add('Game', GameScene);
game.scene.add('Boot', BootScene);
game.scene.add('Load', LoadScene);
game.scene.start('Boot');


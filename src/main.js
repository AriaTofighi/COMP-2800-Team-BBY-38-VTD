/** @type {import("../typings/phaser")} */
import {GameScene} from "./scenes/GameScene";
import {BootScene} from "./scenes/BootScene";
import {LoadScene} from "./scenes/LoadScene";
import { PauseScene } from "./scenes/PauseScene";
import { GameOverScene } from "./scenes/GameOverScene";
import {MenuScene1} from "./scenes/MenuScene1";
import {MenuScene2} from "./scenes/MenuScene2";
import phaser from '../node_modules/phaser';



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

//Sets up the game and adds the GameScene, BootScene, LoadScene, PauseScene, and GameOverScene to the game.
let game = new Phaser.Game(config);
game.scene.add('Game', GameScene);
game.scene.add('Boot', BootScene);
game.scene.add('Load', LoadScene);
game.scene.add('Pause', PauseScene);
game.scene.add('GameOver', GameOverScene);
game.scene.add('Menu1', MenuScene1);
game.scene.add('Menu2', MenuScene2);
game.scene.start('Boot');


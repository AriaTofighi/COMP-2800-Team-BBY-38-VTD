/** @type {import("../typings/phaser")} */
import {GameScene} from "./scenes/GameScene";

let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [GameScene]
}

let game = new Phaser.Game(config);

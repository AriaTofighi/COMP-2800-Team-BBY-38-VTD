// Buttons for cancel pause and end
import { Grid } from "matter";

export class Buttons extends Phaser.Scene {
    constructor() {
        super('Buttons');
    }

    preload() {
    }

    create() {
        // buttons (need proper positioning)
        const cancelButton = this.add.image(740, 560, 'cancelButton');
        cancelButton.setInteractive();
        cancelButton.on('pointerdown', cancelButtonEventHandler);

        const pauseButton = this.add.image(680, 560, 'pauseButton');
        pauseButton.setInteractive();
        pauseButton.on('pointerdown', pauseButtonEventHandler);

        const endButton = this.add.image(620, 560, 'endButton');
        endButton.setInteractive();
        endButton.on('pointerdown', endButtonEventHandler);
    }
}

// what the cancel button does
function cancelButtonEventHandler() {
    console.log("Cancel button test!");
}

// what the pause button does
function pauseButtonEventHandler() {
    console.log("Pause button test!");
}

// what the end game button does
function endButtonEventHandler() {
    console.log("End game button test!");
}
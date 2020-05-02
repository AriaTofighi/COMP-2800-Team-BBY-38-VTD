// Buttons for cancel pause and end
import {
    Grid
} from "matter";

export class Buttons extends Phaser.Scene {
    /**
     * Constructor for Buttons object.
     */
    constructor() {
        super('Buttons');
    }

    /**
     * Set up the buttons entities.
     */
    preload() {}

    /**
     * Create the buttons
     */
    create() {
        // Buttons (need proper positioning)

        // Cancel button
        const cancelButton = this.add.image(740, 560, 'cancelButton');
        cancelButton.setInteractive();
        cancelButton.on('pointerdown', cancelButtonEventHandler);

        // Pause button
        const pauseButton = this.add.image(680, 560, 'pauseButton');
        pauseButton.setInteractive();
        pauseButton.on('pointerdown', pauseButtonEventHandler);

        // End game button
        const endButton = this.add.image(620, 560, 'endButton');
        endButton.setInteractive();
        endButton.on('pointerdown', endButtonEventHandler);
    }
}

/**
 * Cancel button's actions.
 */
function cancelButtonEventHandler() {
    console.log("Cancel button test!");
}

/**
 * Pause button's actions.
 */
function pauseButtonEventHandler() {
    console.log("Pause button test!");
}

/**
 * End game button's actions.
 */
function endButtonEventHandler() {
    console.log("End game button test!");
}
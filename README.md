# VTD
This repo contains the code for the web game, Virus Tower Defense(VTD).

Try out the game [here](https://virustd-8fdd6.web.app/) or visit https://virustd-8fdd6.web.app/

The game was created by: Aria Tofighi, Arash Saadati, Risham Johar, and Benedict Halim

## Table of Contents
[App Organization](#app-organization)

[Languages](#languages)

[Database](#database)

[IDE](#ide)

[Useful Phaser 3 References](#useful-phaser-3-references)

[Testing](#testing)

[Developer Set Up](#developer-set-up)

## App Organization
All game assets, such as graphics, sprites, and audio are placed in the assets folder. Game scripts are in the src folder, where most of the game is running. The styling is in the style folder.
Note: When adding new assets make sure you load them in LoadScene.js.

## Languages
- HTML
- CSS
- JavaScript

## Database
- Firebase

## IDE
- Visual Studio Code

## Useful Phaser 3 References
This game makes heavy use of the Phaser 3 framework for developing games with JavaScript. 

[Phaser 3 Documentation](https://photonstorm.github.io/phaser3-docs/)

[Phaser 3 Examples](https://phaser.io/examples)

Instructions for installing and setting up Phaser 3 will be shown later in this ReadMe.

## Testing
[Link for testing](https://docs.google.com/spreadsheets/d/1NfdKi5wn2WfzfoM7Qvr7vsorEk-WN5nNjkvlAoS7Lok/edit#gid=394496370)

## Developer Set Up
### Step 1: Phaser 3 Set Up
1. Clone the repo to your computer. Unzip it to a local directory.
2. Install [Node.js](https://nodejs.org/en/).
3. Open up the command line to your project directory and install the Parcel Bundler by typing in ‘npm install -g parcel-bundler’. 
4. Once install is complete, type in ‘parcel index.html’. 
5. The parcel bundler will install all dependencies and start a local server at a specified port. On your preferred browser, type in ‘localhost:port’ where the port was the port specified in the command line (Ex. localhost:1234).
6. The game is now playable on your local server.
7. When finished, press CTRL+C to close the local server.
### Step 2: Access Firebase Console
1. Contact us at aria.tofighi1@gmail.com so we can add your account to the Firebase project.
2. Go to [FireBase](https://console.firebase.google.com/).
3. Click on virustd.
4. You now have access to all authentication and database data (no passwords) and can alter records.

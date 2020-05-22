# Virus Tower Defense (VTD)
This repo contains the code for the web game, **Virus Tower Defense (VTD)**.

Try out the game [here](https://virustd-8fdd6.web.app/).

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
Game scripts are in the src folder, where most of the game is running. All game assets, such as graphics, sprites, and audio are placed in the assets folder. The styling is in the style folder. 
- /src
  - /game_objects
  - /round_configs
  - /scenes
  - leaderboard.js
  - login.js
  - main.js
- /assets
  - /about
  - /audio
  - /buttons
  - /ingame
  - /logo
  - /menu
  - /menu2
  - /pauseMenu
- /style
  - about.css
  - index.css
  - leaderboard.css
  - login.css

*Note: When adding new assets make sure you load them in LoadScene.js.*

## Languages
- HTML
- CSS
- JavaScript

## Database
- Firebase

## IDE
- Visual Studio Code

## Useful Phaser 3 References
This game makes heavy use of the Phaser 3 framework for developing games with JavaScript. Some useful references to Phaser 3 can be found here.

[Phaser 3 Documentation](https://photonstorm.github.io/phaser3-docs/)

[Phaser 3 Examples](https://phaser.io/examples)

*Note: Instructions for installing and setting up Phaser 3 will be shown in the [Developer Set Up](#developer-set-up) section of this ReadMe.*

## Testing
You can find our link to testing our user stories and unit tests [here](https://docs.google.com/spreadsheets/d/1NfdKi5wn2WfzfoM7Qvr7vsorEk-WN5nNjkvlAoS7Lok/edit#gid=394496370).

## Developer Set Up
### Step 1: Phaser 3 Set Up
1. Clone the repo to your computer. Unzip it to a local directory.
2. Install [Node.js](https://nodejs.org/en/).
3. This step is for Mac users only. Open up the command line to your project directory and enter `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.2/install.sh | bash` then enter `nvm install stable`.
4. Make sure you've navigated to the repo on your local directory in the command prompt. Once there, you can install the Parcel Bundler by typing in `npm install -g parcel-bundler` on the command line once you are within your directory. 
5. Once install is complete, type in `parcel index.html` on the command line. If you get a “Cannot statically evaluate fs argument” error message, simply re-execute the command.
6. The parcel bundler will install all dependencies and start a local server at a specified port. On your preferred browser, type in ‘localhost:port’ where the port was the port specified in the command line (Ex. localhost:1234).
7. The game is now playable on your local server.
8. Try navigating to the About, Leaderboard, and Login pages. If they do not load, type ‘parcel insertPageHere.html’ (Ex. parcel about.html) on the command line to bundle that specific page. 
9. When finished, press CTRL+C on the command line. Type in ‘Y’ to the “Terminate batch job (Y/N)?” question to close the local server.

### Step 2: Access Firebase Console
1. Contact us at aria.tofighi1@gmail.com so we can add your account to the Firebase project.
2. Log in to [FireBase](https://console.firebase.google.com/).
3. On the main menu, a new project called 'virustd' should pop up. Click on it.
4. You now have access to all authentication, database data (no passwords), and can alter records.

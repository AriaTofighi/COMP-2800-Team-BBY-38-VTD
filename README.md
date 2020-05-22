# VTD
This is the repo contains the work Virus Tower Defense(VTD).
Try out the game at https://virustd-8fdd6.web.app/

This game makes heavy use of the Phaser 3 framework for developing games with JavaScript. 
Phaser 3 Documentation: https://photonstorm.github.io/phaser3-docs/
Phaser 3 Examples: https://phaser.io/examples

Testing: https://docs.google.com/spreadsheets/d/1NfdKi5wn2WfzfoM7Qvr7vsorEk-WN5nNjkvlAoS7Lok/edit#gid=394496370

All game assets, such as sprites and audio, are placed in the assets folder. Game scripts are in the src folder, where most of the game is running.

When adding new assets make sure you load them in LoadScene.js.

Setting it up for development is simple. 

1. Clone the repo to your computer.
2. Make sure you have Parcel Bundler installed. To install, go to the command line and type 'npm install -g parcel-bundler'
3.In the repo directory, type 'parcel index.html'. If successful, the bundler will tell how long it took to build.
4.The parcel bundler will start a local server at the specified port. Go to 'localhost:port' in your preferred browser.
5. The game will be playable from there.
6. When finished, press CTRL+C to close the local server.

With that you can add new assets and modify the game files to make the game into something that is your own.
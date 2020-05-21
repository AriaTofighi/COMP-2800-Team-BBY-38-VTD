// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyC5esnkaw9-wOcFU1qaeA7__AEoCNawBuY",
    authDomain: "virustd-8fdd6.firebaseapp.com",
    databaseURL: "https://virustd-8fdd6.firebaseio.com",
    projectId: "virustd-8fdd6",
    storageBucket: "virustd-8fdd6.appspot.com",
    messagingSenderId: "819193398890",
    appId: "1:819193398890:web:393570d53dc05c5eeaec13"
};
// Initialize Firebase
let app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const rowCount = 10;
const colCount = 2;

/**
 * Gets user names and scores then sorts them by score in an array. 
 * 
 * @param callback fills the leaderboard with data
 */
function getScores(callback) {
    db.collection("users").onSnapshot(function (usersCollection) {
        let userBestRounds = [];
        usersCollection.forEach(function (doc) {
            userBestRounds.push({
                name: doc.data().name,
                bestRound: doc.data().bestRound
            });
        });
        userBestRounds.sort(function (a, b) {
            return b.bestRound - a.bestRound;
        });
        callback(userBestRounds);
    });
}

// Get user scores, then fill leaderboard with data.
getScores(function (userBestRounds) {
    $('.container').attr('style', 'display: flex');
    $('#loader-container').attr('style', 'display: none');
    for (let i = 0; i < rowCount; i++) {
        for (let j = 0; j < colCount; j++) {
            if (j == 0) {
                $(`tr:nth-of-type(${i + 1}) td:nth-of-type(${j + 1})`).html(userBestRounds[i]["name"]);
            } else {
                $(`tr:nth-of-type(${i + 1}) td:nth-of-type(${j + 1})`).html(userBestRounds[i]["bestRound"]);
            }
        }
    }
});

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
console.log(db);


var uiConfig = {
    callbacks: {
        signInSuccessWithAuthResult: function (authResult) {
            let user = authResult.user;
            let uniqueUser = authResult.additionalUserInfo.isNewUser;
            let dbRef = db.collection("users").doc(user.uid);
            // alert(uniqueUser);
            if (uniqueUser) {
                dbRef.set({
                    name: user.displayName,
                    email: user.email,
                    bestRound: 0
                }).then(function () {
                    // alert("New user added to firestore");
                }).catch(function (error) {
                    // alert("Error adding new user: " + error);
                });
            }
            return false;
        },
        uiShown: function () {
            // UI is now displaying.
        }
    },
    // signInSuccessUrl: 'login.html',
    credentialHelper: 'none',
    signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
    // tosUrl and privacyPolicyUrl accept either url string or a callback
    // function.
    // Terms of service url/callback.
    tosUrl: '<your-tos-url>',
    // Privacy policy url/callback.
    privacyPolicyUrl: function () {
        window.location.assign('<your-privacy-policy-url>');
    }
};

// Signs the user out
function signUserOut() {
    firebase.auth().signOut().then(function () {
        // Sign-out successful. 
        location.reload();
    }).catch(function (error) {
        // An error happened.

    });
}

// Alters sign in status visually when window is loaded
initApp = function () {
    let time = new Date().getTime();

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in. 
            let displayName = user.displayName;
            let email = user.email;
            displaySignOut(displayName);
            // user.getIdToken().then(function (accessToken) {
            //     // If need to use ID token
            // });
        } else {
            displaySignIn();
        }
        console.log("Time elapsed: " + (new Date().getTime() - time) / 1000.0 + " seconds");
    }, function (error) {
        console.log(error);
    });
};

function displaySignOut(displayName) {
    document.getElementById('loader-container').style.display = "none";
    document.getElementById('sign-in-status').textContent = 'Signed in as ' + displayName;
    document.getElementById('sign-out-container').style.display = "flex";
    document.getElementById('sign-in-container').style.display = "none";
    document.getElementById('log-out-btn').style.display = "initial";
    document.getElementById('firebaseui-auth-container').style.display = "none";
    document.getElementById('back-to-vtd').disabled = false;
}

function displaySignIn() {
    document.getElementById('loader-container').style.display = 'none';
    document.getElementById('sign-in-status').textContent = '';
    document.getElementById('sign-out-container').style.display = "none";
    document.getElementById('sign-in-container').style.display = "flex";
    document.getElementById('log-out-btn').style.display = "none";
    document.getElementById('firebaseui-auth-container').style.display = "block";
    document.getElementById('back-to-vtd').disabled = false;
}

// Triggers when the window is loaded
window.addEventListener('load', function () {
    // Initialize the FirebaseUI Widget using Firebase.
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    // The start method will wait until the DOM is loaded.
    ui.start('#firebaseui-auth-container', uiConfig);
    document.getElementById('log-out-btn').onclick = signUserOut;
    initApp();

});


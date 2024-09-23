import './style.css'
// import javascriptLogo from './javascript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.js'

import { initializeApp } from "firebase/app";
import { getAuth, 
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        signOut,
        onAuthStateChanged,
        GoogleAuthProvider,
        signInWithPopup,
        updateProfile } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD2g-bOHrSLfnze0FnFDxbOXZ04fNaXY_U",
  authDomain: "login-project-2f3d4.firebaseapp.com",
  projectId: "login-project-2f3d4",
  storageBucket: "login-project-2f3d4.appspot.com",
  messagingSenderId: "723948334005",
  appId: "1:723948334005:web:43d2bec015724f526547fc"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();


document.addEventListener("DOMContentLoaded", () => {
    
    


    const viewLoggedIn = document.getElementById("logged-in-view");
    const viewLoggedOut = document.getElementById("logged-out-view");
    const signInWithGoogleEl = document.getElementById("google");
    const emailInput = document.getElementById("email-input");
    const passwordInput = document.getElementById("password");
    const signInBtnEl = document.getElementById("sign-in-btn");
    const createAccountBtnEl = document.getElementById("create-account-btn");

    const signOutButtonEl = document.getElementById("sign-out-btn")

    const userProfilePictureEl = document.getElementById("user-profile-picture")
    const userGreetingEl = document.getElementById("user-greeting")

    const displayNameInputEl = document.getElementById("display-name-input")
    const photoURLInputEl = document.getElementById("photo-url-input")
    const updateProfileButtonEl = document.getElementById("update-profile-btn")

    // UI event listeners
    signInWithGoogleEl.addEventListener("click", authSignInWithGoogle);
    signInBtnEl.addEventListener("click", authSignInWithEmail);
    createAccountBtnEl.addEventListener("click", authCreateAccountWithEmail);

    signOutButtonEl.addEventListener("click", authSignOut)

    updateProfileButtonEl.addEventListener("click", authUpdateProfile)

    // Main code
    // showLoggedOutView();


    //auth state
    onAuthStateChanged(auth, (user) => {
        if (user) {
            showLoggedInView()
            showProfilePicture(userProfilePictureEl, user)
            showUserGreeting(userGreetingEl, user)
        } else {
            showLoggedOutView()
        }
      })

    // Functions - authentication
    function authSignInWithGoogle() {
        signInWithPopup(auth, provider)
        .then((result) => {
            console.log("signed in with google")
        }).catch((error) => {
            console.error(error.message)
        });
    }

    function authSignInWithEmail() {
        const email = emailInput.value
        const password = passwordInput.value

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
            clearAuthFields()
        })
        .catch((error) => {
            console.error(error.message)
        });
    }

    function authCreateAccountWithEmail() {
        const email = emailInput.value;
        const password = passwordInput.value;

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                clearAuthFields()
            })
            .catch((error) => {
                console.error(error.message);
            });
    }

    function authSignOut() {
        signOut(auth).then(() => {

        }).catch((error) => {
            console.error(error.message)
        });
    }

    function authUpdateProfile(){
        const newDisplayName = displayNameInputEl.value
        const newPhotoURL = photoURLInputEl.value

        updateProfile(auth.currentUser, {
            displayName: newDisplayName, 
            photoURL: newPhotoURL
        }).then(() => {
                location.reload()
                console.log("Profile Updated!")
        }).catch((error) => {
                console.error(error.message)
        });

    }

    // Functions - UI views
    function showLoggedOutView() {
        hideView(viewLoggedIn);
        showView(viewLoggedOut);
    }

    function showLoggedInView() {
        console.log("Logged out view (should hide):", viewLoggedOut);
        hideView(viewLoggedOut);
        showView(viewLoggedIn);
    }

    function showView(view) {
        view.style.display = "flex";
    }

    function hideView(view) {
        view.style.display = "none";
    }

    function myFunction(){
        console.log("hi")
    }

    function clearInputField(field) {
        field.value = ""
    }
    
    function clearAuthFields() {
        clearInputField(emailInput)
        clearInputField(passwordInput)
    }

    function showProfilePicture(imgElement, user){
        const photoURL =user.photoURL

        if (photoURL) {
            imgElement.src = photoURL
        } else {
            imgElement.src = "images/default-profile-picture.jpeg"
        }
    }

    function showUserGreeting(element, user){
        const displayName = user.displayName;

        if (displayName) {
            const userFirstName = displayName.split(" ")[0]
            
            element.textContent = `Hey ${userFirstName}, how are you?`
        } else {
            element.textContent = `Hey friend, how are you?`
        }
    }
});

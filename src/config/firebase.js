import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCte4JxRshb7YtBixQ667gbRyFdSTacW3w",
  authDomain: "sign-in-5e492.firebaseapp.com",
  projectId: "sign-in-5e492",
  storageBucket: "sign-in-5e492.appspot.com",
  messagingSenderId: "326791638442",
  appId: "1:326791638442:web:76e81874d11d7f621b8fd3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { app, auth, provider };
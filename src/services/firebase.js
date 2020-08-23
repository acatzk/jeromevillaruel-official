import firebase from "firebase";
import 'firebase/storage'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAG4Iu8TdRtW4NmYCt5v8RCocLwF47EcYw",
    authDomain: "jj-official-a58dc.firebaseapp.com",
    databaseURL: "https://jj-official-a58dc.firebaseio.com",
    projectId: "jj-official-a58dc",
    storageBucket: "jj-official-a58dc.appspot.com",
    messagingSenderId: "1022924628672",
    appId: "1:1022924628672:web:bac3fdd4fa61263ae74325",
    measurementId: "G-W8D7RY2RME"
  }

  
// firebase utils
const fb = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore()
const auth = firebase.auth()
const currentUser = auth.currentUser
const messaging = firebase.messaging()

export {
  fb,
  db,
  auth,
  messaging,
  currentUser
}
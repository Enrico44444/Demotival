const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: "demotival-e0d0b.firebaseapp.com",
  databaseURL: "https://demotival-e0d0b-default-rtdb.firebaseio.com",
  projectId: "demotival-e0d0b",
  storageBucket: "demotival-e0d0b.firebasestorage.app",
  messagingSenderId: "132158135599",
  appId: "1:132158135599:web:5047f6ee9b60c4960315da"
};

// Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.database();
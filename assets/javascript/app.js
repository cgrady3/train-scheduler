var firebaseConfig = {
    apiKey: "AIzaSyDjZGaBl1Wk7J7qcQP195dJ1BbLyMYKdRg",
    authDomain: "train-scheduler-f3ca1.firebaseapp.com",
    databaseURL: "https://train-scheduler-f3ca1.firebaseio.com",
    projectId: "train-scheduler-f3ca1",
    storageBucket: "train-scheduler-f3ca1.appspot.com",
    messagingSenderId: "584714869111",
    appId: "1:584714869111:web:003f5736502e31f342e972"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // connect to firebase database
  var db = firebase.database();

  // get user input
  // push user input to database
  // retrieve user input from database 
  // do the maths
  // write data to HTML
  // delete inputs who's trains have come and gone

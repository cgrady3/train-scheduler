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

// retrieve user input from database 
// do the maths
// write data to HTML
// update inputs who's trains have come and gone and will come again

// initialize variables
var trainName = '';
var destination = '';
var firstTrain = '';
var frequency = '';

// get user input when submit button is clicked
$('.submit-btn').on('click', function (event) {
    event.preventDefault();

    trainName = $('#train-name').val().trim();
    destination = $('#destination').val().trim();
    firstTrain = parseInt($('#first-train').val().trim());
    frequency = parseInt($('#frequency').val().trim());

    db.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
    })

    //clear text box's
    $('#train-name').val('');
    $('#destination').val('');
    $('#first-train').val('');
    $('#frequency').val('');
})

// push user input to database and write it to HTML
db.ref().on('child_added', function (data) {

    dv = data.val()

    console.log(dv.destination)

    var newTrain = $('<tr>').append(
        $('<td>').text(dv.trainName),
        $('<td>').text(dv.destination),
        $('<td>').text(dv.firstTrain),
        $('<td>').text(dv.frequency + 'minutes'),
        $('<td>').text(timeMaths(dv.frequency, dv.firstTrain)),
    );

    $('#trains').append(newTrain);

}), function (errorHandle) {
    console.log("Errors occured: " + errorHandle.code)
}

function timeMaths(frequency, firstTime) {

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Difference between the times
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var timeRemainder = diffTime % frequency;
    console.log(timeRemainder);

    // Minute Until Train
    var minutesTilTrain= frequency - timeRemainder;
    console.log("MINUTES TILL TRAIN: " + minutesTilTrain);

    // Next Train
    var nextTrain = moment().add(minutesTilTrain, " minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
}

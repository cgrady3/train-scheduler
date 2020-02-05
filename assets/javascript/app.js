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
var trainNum = 0;

// get user input when submit button is clicked
$('.submit-btn').on('click', function (event) {
    event.preventDefault();

    // chceck that user has included all input fields
    if ($("#train-name").val().trim() === "" ||
        $("#destination").val().trim() === "" ||
        $("#first-train").val().trim() === "" ||
        $("#frequency").val().trim() === "") {

        alert("Please fill in all details to add new train");

    } 
    else {

        trainName = $('#train-name').val().trim();
        destination = $('#destination').val().trim();
        firstTrain = parseInt($('#first-train').val().trim());
        frequency = parseInt($('#frequency').val().trim());

        // push train info to firebase
        db.ref().push({
            trainNum: trainNum,
            trainName: trainName,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency,
        })
    }

    //clear text box's
    $('#train-name').val('');
    $('#destination').val('');
    $('#first-train').val('');
    $('#frequency').val('');
})

// push user input to database and write it to HTML
db.ref().on('child_added', function (data) {

    dv = data.val()

    // add a remove button to take a train off the screen
    var removeBtn = $('<button>').html('&#10060').attr('data-trainNum', trainNum).addClass('remove')

    // append new train to train manifest
    var newTrain = $('<tr>').append(
        $('<td>').append(removeBtn),
        $('<td>').text(dv.trainName),
        $('<td>').text(dv.destination),
        $('<td>').text(dv.firstTrain),
        $('<td>').text(dv.frequency + ' minutes'),
        $('<td>').text(timeMaths(dv.frequency, dv.firstTrain)),
    ).attr('id', trainNum);

    trainNum++;

    $('#trains').append(newTrain);

}), function (errorHandle) {
    console.log("Errors occured: " + errorHandle.code)
}

//  enable removal of a train 
$(document.body).on('click', '.remove', function (event) {
    event.preventDefault();

    var trainNum = $(this).attr("data-trainNum");
    var trainRow = $("#" + trainNum)
    trainRow.remove();
})

// math to handle time functions
function timeMaths(frequency, firstTime) {

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

    // Time apart (remainder)
    var timeRemainder = diffTime % frequency;

    // Minute Until Train
    var minutesTilTrain = frequency - timeRemainder;

    // Next Train
    var nextTrain = moment().add(minutesTilTrain, " minutes");

    return minutesTilTrain;
}

// reloads page ever minute to update minutes to train arrival
setInterval(function() {
    window.location.reload();
  }, 60000);
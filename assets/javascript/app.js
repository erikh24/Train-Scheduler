/// INITIALIZE FIREBASE ///
var firebaseConfig = {
    apiKey: "AIzaSyCPNZH3OG2C0FrxKjWjBbGUV8C7wJ0d1eg",
    authDomain: "trainscheduler-482a2.firebaseapp.com",
    databaseURL: "https://trainscheduler-482a2.firebaseio.com",
    projectId: "trainscheduler-482a2",
    storageBucket: "",
    messagingSenderId: "485087358390",
    appId: "1:485087358390:web:3193c5d3d55d3026"
};

firebase.initializeApp(firebaseConfig);

var database = firebase.database();


function displayRealTime() {
    setInterval(function () {
        $('#current-time').html(moment().format('hh:mm A'))
    }, 1000);
}
displayRealTime();

/// CREATE BUTTON FOR ADDING NEW TRAINS  ///
$("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    /// GRABS USER INPUT ///
    var trainName = $("#train-name-input").val().trim();
    var destinationInput = $("#destination-input").val().trim();
    var firstTimeInput = $("#first-time-input").val().trim();
    var frequencyInput = $("#frequency-input").val().trim();


    /// CALCULATE HOW LONG UNTIL THE NEXT TRAIN COMES ///
    var firstTrainConverted = moment(firstTimeInput, "hh:mm").subtract(1, "years");

    var currentTime = moment();

    var difference = moment().diff(moment(firstTrainConverted), "minutes");

    var remainder = difference % frequencyInput;

    var minutesUntilNextTrain = frequencyInput - remainder;

    var nextArrival = moment().add(minutesUntilNextTrain, "minutes").format("hh:mm A");



    /// CREATING NEW LOCAL 'TEMPORARY' OBJECT FOR HOLDING THE TRAIN DATA ///
    var newTrain = {
        name: trainName,
        desination: destinationInput,
        time: firstTimeInput,
        frequency: frequencyInput,
        nextArrival: nextArrival,
        minutesUntilNextTrain: minutesUntilNextTrain,
        currentTime: currentTime.format("hh:mm A")
    };

    /// UPLOADS TRAIN DATA TO THE DATABASE ///
    database.ref().push(newTrain);

 
    alert("Train successfully added");

    /// CLEARING THE TEXT INPUT BOXES ///
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-time-input").val("");
    $("#frequency-input").val("");
});

/// CREATE FIREBASE EVENT FOR ADDING THE TRAIN TO THE DATABASE AND A ROW IN THE HTML WHEN A USER ADDS AN ENTRY ///
database.ref().on("child_added", function (childSnapshot) {

    /// STORE EVERYTHING INTO A VARIABLE ///
    var trainName = childSnapshot.val().name;
    var destinationInput = childSnapshot.val().desination;
    var firstTimeInput = childSnapshot.val().time;
    var frequencyInput = childSnapshot.val().frequency;
    var nextArrival = childSnapshot.val().nextArrival;
    var minutesUntilNextTrain = childSnapshot.val().minutesUntilNextTrain;
    var currentTime = childSnapshot.val().currentTime;


   /// CREATE NEW ROW FOR EACH TRAIN ///
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destinationInput),
        $("<td>").text(frequencyInput),
        $("<td>").text(nextArrival),
        $("<td>").text(minutesUntilNextTrain)
    );

    /// APPEND THE NEW ROW TO THE TABLE
    $("#train-table > tbody").append(newRow);
});


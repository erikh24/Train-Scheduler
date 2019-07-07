
// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new trains - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

//--------------------------------------------------------------//

/// 1. INITIALIZE FIREBASE ///
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

/// 2. CREATE BUTTON FOR ADDING NEW TRAINS - THEN UPDATE HTML + UPDATE THE DATABASE ///
$("#add-train-btn").on("click", function(event) {
    event.preventDefault();

    /// GRABS USER INPUT ///
    var trainName = $("#train-name-input").val().trim();
    var destinationInput =$("#destination-input").val().trim();
    var timeInput = $("#time-input").val().trim();
    var frequencyInput = $("#frequency-input").val().trim();

    /// CREATING NEW LOCAL 'TEMPORARY' OBJECT FOR HOLDING THE TRAIN DATA ///
    var newTrain = {
        name: trainName,
        desination: destinationInput,
        time: timeInput,
        frequency: frequencyInput
    };

    /// UPLOADS TRAIN DATA TO THE DATABASE ///
    database.ref().push(newTrain);

    /// TEST BY LOGGING TO THE CONSOLE ///
    console.log(newTrain.name);
    console.log(newTrain.desination);
    console.log(newTrain.time);
    console.log(newTrain.frequency);

    alert("Train successfully added");
  
    /// CLEARING THE TEXT INPUT BOXES ///
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");
});

/// 3. CREATE FIREBASE EVENT FOR ADDING THE TRAIN TO THE DATABASE AND A ROW IN THE HTML WHEN A USER ADDS AN ENTRY ///
database.ref().on("child_added", function(childSnapshot)    {
    console.log(childSnapshot.val());

    /// STORE EVERYTHING INTO A VARIABLE ///
    var trainName = childSnapshot.val().name;
    var destinationInput = childSnapshot.val().desination;
    var timeInput = childSnapshot.val().time;
    var frequencyInput = childSnapshot.val().frequency;

    /// TRAIN INFO ///
    console.log(trainName);
    console.log(destinationInput);
    console.log(timeInput);
    console.log(frequencyInput);

    /// CREATE NEW ROW FOR EACH TRAIN ///
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destinationInput),
        $("<td>").text(timeInput),
        $("<td>").text(frequencyInput)
    );

    /// APPEND THE NEW ROW TO THE TABLE
    $("#train-table > tbody").append(newRow);
});

// Initialize Firebase
var config = {
    apiKey: "AIzaSyB2uGvYR0lEApcX-rvvcftzhB52R7WCNtI",
    authDomain: "traintime-50cdf.firebaseapp.com",
    databaseURL: "https://traintime-50cdf.firebaseio.com",
    projectId: "traintime-50cdf",
    storageBucket: "traintime-50cdf.appspot.com",
    messagingSenderId: "530535535259"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  

  var trainName = "";
  var destination = "";
  var frequency = "";
  var nextArrival = "";
  var minsAway = "";

$("#add-train").on("click", function(event){
    event.preventDefault();

    trainName = $("#name-input").val().trim();
    destination = $("#destination-input").val().trim();
    frequency = $("#frequency-input").val().trim();
    nextArrival = $("#time-input").val().trim();

    var newTrain = {
        trainName: trainName,
        destination: destination,
        frequency: frequency,
        nextArrival: nextArrival
    };

    database.ref().push(newTrain);
    
    $("#name-input").val("");
    $("#destination-input").val("");
    $("#frequency-input").val("");
    $("#time-input").val("");
    
});

database.ref().on("child_added", function(snapshot){

    console.log(snapshot.val());

    var trainName = snapshot.val().trainName;
    var destination = snapshot.val().destination;
    var frequency = snapshot.val().frequency;
    var nextArrival = snapshot.val().nextArrival;

    console.log(trainName);
    console.log(destination);
    console.log(frequency);
    console.log(nextArrival);

    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(frequency),
        $("<td>").text(nextArrival)
    );

    $("#train-table > tbody").append(newRow);

    // $("#name-display").text(snapshot.val().trainName);
    // $("#destination-display").text(snapshot.val().destination);
    // $("#frequency-display").text(snapshot.val().frequency);
    // $("#arrival-display").text(snapshot.val().nextArrival);

}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});
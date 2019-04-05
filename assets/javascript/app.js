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

    database.ref().set({
        trainName: trainName,
        destination: destination,
        frequency: frequency,
        nextArrival: nextArrival
    });
});

database.ref().on("value", function(snapshot){

    console.log(snapshot.val());
    console.log(snapshot.val().trainName);
    console.log(snapshot.val().destination);
    console.log(snapshot.val().frequency);
    console.log(snapshot.val().nextArrival);

    $("#name-display").text(snapshot.val().trainName);
    $("#destination-display").text(snapshot.val().destination);
    $("#frequency-display").text(snapshot.val().frequency);
    $("#arrival-display").text(snapshot.val().nextArrival);

}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});
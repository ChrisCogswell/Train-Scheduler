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

  

//   var trainName = "";
//   var destination = "";
//   var frequency = "";
//   var firstArrival = "";
//   var nextTrain = "";
//   var minsAway = "";


  function update() {
    $("#clock-display").html(moment().format("MMMM Do YYYY, h:mm:ss a"));
  }
  
  setInterval(update, 1000);

  function autoRefreshPage() {
    
        window.location = window.location.href;
    }
    setInterval(autoRefreshPage, 60000);

  

$("#add-train").on("click", function(event){
    event.preventDefault();

    trainName = $("#name-input").val().trim();
    destination = $("#destination-input").val().trim();
    frequency = $("#frequency-input").val().trim();
    firstArrival = moment($("#time-input").val().trim(), "HH:mm").format("HH:mm");

    var newTrain = {
        trainName: trainName,
        destination: destination,
        frequency: frequency,
        firstArrival: firstArrival
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
    var firstArrival = snapshot.val().firstArrival;

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstArrivalConverted = moment(firstArrival, "HH:mm").subtract(1, "years");

    var currentTime = moment();

    var timeDiff = moment().diff(moment(firstArrivalConverted), "minutes");
    
    var timeRemainder = timeDiff % frequency;

    var minsAway = frequency - timeRemainder;

    var nextTrain = moment().add(minsAway, "minutes");

    var nextTrainSimple = moment(nextTrain).format("HH:mm");
    
    
    // var nextArrivalPretty = moment.unix(nextArrival).format("HH:mm");
    // var minsAway = moment().diff(moment(nextArrival, "X"), "minutes");
    
    
    
    
    
    console.log(trainName);
    console.log(destination);
    console.log(frequency);
    console.log(firstArrival);
    console.log(firstArrivalConverted);
    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));
    console.log("DIFFERENCE IN TIME: " + timeDiff);
    console.log(timeRemainder);
    console.log("MINUTES TILL TRAIN: " + minsAway);
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));
    
   

    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(frequency),
        $("<td>").text(firstArrival),
        $("<td>").text(nextTrainSimple),
        $("<td>").text(minsAway)
    );

    $("#train-table > tbody").append(newRow);

    
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
    
});


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyC9Zt9kC8Npa8vg7F2jHRPFRZLxAtpkSrQ",
    authDomain: "trainschedule-6d012.firebaseapp.com",
    databaseURL: "https://trainschedule-6d012.firebaseio.com",
    projectId: "trainschedule-6d012",
    storageBucket: "trainschedule-6d012.appspot.com",
    messagingSenderId: "42043721516"
  };
  firebase.initializeApp(config);
var database = firebase.database();

$("#submit").on("click", function(){
    event.preventDefault();
    var trainName = $("#Name").val();
    var destination = $("#Destination").val();
    var trainTime = $("#First").val();
    var frequency = $("#Frequency").val();

    var $row = $("<tr>");
    $row.append('<td>' + trainName + '</td>');
    $row.append('<td>' + destination + '</td>');
    $row.append('<td>' + trainTime + '</td>');
    $row.append('<td>' + frequency + '</td>');

    database.ref().push({
        trainName: trainName,
        destination: destination,
        trainTime: trainTime,
        frequency: frequency
    });

    $("tbody").append($row);
});

database.ref().on("child_added", function(snapshot){ 
    var item = snapshot.val();

    var trainName = item.trainName;
    var destination = item.destination;
    var trainTime = item.trainTime;
    var frequency = item.frequency;
    
    var $row = $("<tr>");
    $row.append('<td>' + trainName + '</td>');
    $row.append('<td>' + destination + '</td>');
    $row.append('<td>' + trainTime + '</td>');
    $row.append('<td>' + frequency + '</td>');
    
    $("tbody").append($row);
});
console.log(moment("01/01/2019", "MM/DD/YYYY"));

console.log(moment.calendar());
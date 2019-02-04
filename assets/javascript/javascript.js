
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
    $row.append('<td>' + frequency + '</td>');
    var minutesAway = calculateTime(frequency, trainTime);
    trainTime = moment().add(minutesAway, "minutes").calendar();
    $row.append('<td>' + trainTime + '</td>');

    $row.append('<td>' + minutesAway + '<td>');
    
    if(trainName === "" || destination === "" || trainTime === "" || frequency === ""){
        console.log("Must fill out all fields.");
    } else {
        database.ref().push({
            trainName: trainName,
            destination: destination,
            trainTime: trainTime,
            frequency: frequency
        });
    
        // $("tbody").append($row);
    }
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
    $row.append('<td>' + frequency + '</td>');
    var minutesAway = calculateTime(frequency, trainTime);
    trainTime = moment().add(minutesAway, "minutes").calendar();
    $row.append('<td>' + trainTime + '</td>');

    $row.append('<td>' + minutesAway + '<td>');
    

    // console.log(moment().add(minutesAway, 'minutes').calendar());

    $("tbody").append($row);
});


function calculateTime(frequency, trainTime){
    var hours = parseInt(moment(trainTime, 'm').format('m'));
    var minutes = parseInt(moment(trainTime,'h:mm').format('m'));
    minutes = minutes + (hours * 60);
    console.log("Train Time: "+minutes);

    var ourHours = parseInt(moment().format('h'));
    var ourMinutes = parseInt(moment().format('m'));
    ourMinutes = ourMinutes + (ourHours * 60);
    console.log("Our Time: " + ourMinutes);

    var difference = minutes - ourMinutes;
    console.log("Difference: " + difference);

    var minutesAway;
    if(difference > 0){
        console.log("next train in: " + difference + " minutes");
        minutesAway = difference;
    } else {
        var newHours = (parseInt(difference) + parseInt(frequency));
        while(newHours < 0){
            newHours = newHours + parseInt(frequency);
        }
        console.log("next train in: " + newHours + " minutes");
        minutesAway = newHours;
    }
    return minutesAway;
}

// console.log(moment.calendar());
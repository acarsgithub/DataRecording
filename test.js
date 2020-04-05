var Bleacon = require('./index');

// Scanning for whether we want to start or stop the recording
Bleacon.startScanning('e2c56db5dffb48d2b060d0f5a71096e0', 0, 1);
Bleacon.startScanning('e2c56db5dffb48d2b060d0f5a71096e0', 0, 0)

// logging output to console
Bleacon.on('discover', function(bleacon) {

  if (bleacon.minor == 0){
    console.log("Bleacon signal to end the recording has been picked up: ");

    /** STOP EXECUTING RECORDING (PROPERLY) AND BREAK OUT OF FUNCTION COMPLETELY!!! */


    // Bleacon advertisement for recording state 'terminated'
    Bleacon.startAdvertising('e2c56db5dffb48d2b060d0f5a71096e0', 0, 2);


  } else if (bleacon.minor == 1){
    console.log("Bleacon signal to start the recording has been picked up: ");


    // Bleacon advertisement for recording state 'in session'
    Bleacon.startAdvertising('e2c56db5dffb48d2b060d0f5a71096e0', 0, 3);

    /** WRITE CODE TO GET RECORDING TO START EXECUTING!!! */


  } else {
    console.log("Error, bleacon minor is not 0 or 1. Invalid bleacon scanned....");
  }
  // console.log('bleacon found: ' + JSON.stringify(bleacon));
});

/*
// confirmation to user
if(userInput == 'start'){
  console.log("The recording has started and the beacon signal with minor value 0 is being advertised...");
} else {
  console.log("No recording is in progress currently...")
}

// activate a beacon signal, the minor portion of the signal is unique to "start" and "stop"
if(userInput == "start"){
  // advertising to start recording
  Bleacon.startAdvertising('e2c56db5dffb48d2b060d0f5a71096e0', 0, 0, -59);

  // here we need to execute the recording and transmit a signal back for the state of the recording being 'active'


} else {
  // advertising that it is not recording
  Bleacon.startAdvertising('e2c56db5dffb48d2b060d0f5a71096e0', 0, 1, -59);
}


// logging output to console
Bleacon.on('discover', function(bleacon) {
  console.log('bleacon found: ' + JSON.stringify(bleacon));
});

// Scan for the advertised beacon to log output to console
Bleacon.startScanning('e2c56db5dffb48d2b060d0f5a71096e0', 0, 0);

//Bleacon.startScanning('e2c56db5dffb48d2b060d0f5a71096e0', 0, 1);
*/
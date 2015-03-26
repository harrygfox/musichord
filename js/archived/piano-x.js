// For in here
    // function([x]) {
        // create an oscillator
        // map to appropriate frequency 
    // }

var AudioContext = window.AudioContext || window.webkitAudioContext;


// $( ".key" ).click(function() {
//     console.log('key: ', $( this )[0].dataset.key);
// });

// for (var i = 0; i < keys.length; i++) {
//     // keys[i].addEventListener("mousedown", addToPressed(keys[i]));
//     keys[i].addEventListener("mousedown", console.log('down'));
//     // keys[i].addEventListener("mouseup", removeFromPressed(keys[i]));
//     keys[i].addEventListener("mousedown", console.log('down'));
//     // Attatch event listeners for moousedown and mouseup
// };

// function addToPressed (elem) {
//     time = new Date(); //time in milliseconds
//     window.onmouseup = function() {
//         diff = new Date() - time;
//         window.onmouseup = null;
//     }
//     pressed.push(elem.dataset.key);
//     console.log(pressed);
// }

// function removeFromPressed (elem) {
//     index = pressed.indexOf(elem.dataset.key)
//     if(index > -1) {
//         pressed.splice(index, 1);
//             // second parameter of splice is number of # to be removed
//     }
        
// }




function createNote (val, val2) {
    var context = new AudioContext();
    var osc = context.createOscillator();
    var gain = context.createGain();

    osc.type = 'sine';
    osc.frequency.value = val;
    osc.start(0);
    osc.stop(0.5);

    osc.connect(gain);

    gain.gain.value = 1;
    gain.connect(context.destination);

    if(val2) {
        var osc2 = context.createOscillator();

        osc2.frequency.value = val2;
        osc2.connect(gain);
        osc2.start(0);
        osc2.stop(0.5);
    }
    
}



// For in here (piano.js):
    // Notes data (var main, var chopsticks)
    // Listeners for key presses
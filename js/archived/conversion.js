// implement variations on var notes and pass those values through a convertor.
// The convertor will change the format and pass the vlaue to var main. 

var read = [],
    i,
    j;
var play = [];


console.log("from conversion.js. var keyPress: ", keyPress.piano);

if (keyPress[0]) {
    console.log('registered');
}

// read the rendered notes 
// for (i = 0; i < notesBar1.length; i++) {
//     if (notesBar1[i].noteType === "n") {
//         // TODO come bakc here and fix the problems with accidentals being interpreted
        
//         // if (notesBar1[i].keyProps[i].accidental === null) {
//         //     read.push(notesBar1[i].keys);
//         // };
        
//     };
// };
console.log('read: ',read);

// create the play array
for (i = 0; i < read.length; i++) {
    play.push([]);
    for (j = 0; j < read[i].length; j++) {
        play[i].push(read[i][j].replace(/\//g, ""));
    };
};

// replace the values to be read by piano
for (i = 0; i < play.length; i++) {
    for (j = 0; j < play[i].length; j++) {
        switch (play[i][j]) {
            case "c4":
                play[i][j] = -12;
                break;
            case "c4":
                play[i][j] = -12;
                break;
            case "c4":
                play[i][j] = -12;
                break;
            case "c4":
                play[i][j] = -12;
                break;
            case "c4":
                play[i][j] = -12;
                break;
        }
    };
};
// c/4 = -12
// c/4.addAccidental(0, new Vex.Flow.Accidental("#")) = -11
// d/4 = -10
// eb/4 = -9
// e/4 = -8
// f/4 = -7
// f/4.addAccidental(0, new Vex.Flow.Accidental("#")) = -6
// g/4 = -5
// ab/4 = -4
// a/4 = -3
// bb/4 = -2
// b/4 = -1
// c/5 = 0 = middle c.

// c/6.addAccidental(0, new Vex.Flow.Accidental("#")) = 13;

// 
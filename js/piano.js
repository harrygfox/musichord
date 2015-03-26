/*! Copyright (c) 2013 - Peter Coles (mrcoles.com)
 *  Licensed under the MIT license: http://mrcoles.com/media/mit-license.txt
 */

var keyPress = {
        piano: [],
        stave: []
    },
    notesBar1 = [],
    pressed = [],
    addToStave = true,
    renderer;

function clearNotes() {
    // Clear stave and redraw empty
    ctx.clear();
    staveBar1.setContext(ctx).draw();
    // Empty data references
    preMain = [];
    main = [];
    notesBar1 = [];
    data.splice(1, 100);
}

function renderNotes() {
    defineMain();
    ctx.clear();
    // staveBar1.addClef("treble").setContext(ctx).draw();
    staveBar1.setContext(ctx).draw();
    // staveBar2.setContext(ctx).draw();
    Vex.Flow.Formatter.FormatAndDraw(ctx, staveBar1, notesBar1);
    // Vex.Flow.Formatter.FormatAndDraw(ctx, staveBar2, notesBar2);
}

function drawNote(arr, accidental) {
    var note,
        down = -1,
        up = 1;

    for (var i = 0; i < arr.length; i++) {
        if (accidental) {
            note = new Vex.Flow.StaveNote({
                keys: [arr[i]],
                duration: "q"
            })
            .addAccidental(0, new Vex.Flow.Accidental(accidental));
            if (arr[i].indexOf("5", 1) > -1 || arr[i].indexOf("6", 1) > -1) {
                note.setStemDirection(down);
                notesBar1.push(note);
            } else {
                note.setStemDirection(up);
                notesBar1.push(note);
            }
        } else {
            note = (new Vex.Flow.StaveNote({
                keys: [arr[i]],
                duration: "q"
            }));
            if (arr[i].indexOf("5", 1) > -1 || arr[i].indexOf("6", 1) > -1) {
                note.setStemDirection(down);
                notesBar1.push(note);
            } else {
                note.setStemDirection(up);
                notesBar1.push(note);
            }
        }
    };
    renderNotes();
}

function conversion(val, acc) {
    keyPress.stave.push(val);
    drawNote(keyPress.stave, acc);
    keyPress.stave.splice(keyPress.stave.indexOf(val), 1);
}

function noteConvert(a) {
    for (var i = 0; i < a.length; i++) {
        switch (a[i].toString()) {
            case "-12":
                conversion("c/4", false);
                break;
            case "-11":
                conversion("c/4", '#');
                break;
            case "-10":
                conversion("d/4", false);
                break;
            case "-9":
                conversion("eb/4", "b");
                break;
            case "-8":
                conversion("e/4", false);
                break;
            case "-7":
                conversion("f/4", false);
                break;
            case "-6":
                conversion("f/4", "#");
                break;
            case "-5":
                conversion("g/4", false);
                break;
            case "-4":
                conversion("ab/4", "b");
                break;
            case "-3":
                conversion("a/4", false);
                break;
            case "-2":
                conversion("bb/4", "b");
                break;
            case "-1":
                conversion("b/4", false);
                break;
            // Middle C
            case "0":
                conversion("c/5", false);
                break;
            case "1":
                conversion("c/5", '#');
                break;
            case "2":
                conversion("d/5", false);
                break;
            case "3":
                conversion("eb/5", "b");
                break;
            case "4":
                conversion("e/5", false);
                break;
            case "5":
                conversion("f/5", false);
                break;
            case "6":
                conversion("f/5", "#");
                break;
            case "7":
                conversion("g/5", false);
                break;
            case "8":
                conversion("ab/5", "b");
                break;
            case "9":
                conversion("a/5", false);
                break;
            case "10":
                conversion("bb/5", "b");
                break;
            case "11":
                conversion("b/5", false);
                break;
            case "12":
                conversion("c/6", false);
                break;
            case "13":
                conversion("c/6", "#");
                break;
        }
    };
}

 // Setup keys!
//

var notesOffset = 0;

var blackKeys = {
    1: 1,
    3: 3,
    6: 1,
    8: 2,
    10: 3
};
$.each(blackKeys, function(k, v) {
    blackKeys[k] = ' black black'+v;;
});

function blackKeyClass(i) {
    return blackKeys[(i % 12) + (i < 0 ? 12 : 0)] || '';
}

var $keys = $('<div>', {'class': 'keys'}).appendTo('#piano');

var buildingPiano = false;

var isIos = navigator.userAgent.match(/(iPhone|iPad)/i);

function buildPiano() {
    if (buildingPiano) return;
    buildingPiano = true;

    $keys.trigger('build-start.piano');
    $keys.empty().off('.play');

    function addKey(i) {
        var dataURI = isIos ? '' : Notes.getDataURI(i);

        // trick to deal with note getting hit multiple times before finishing...
        var sounds = [
            new Audio(dataURI),
            new Audio(dataURI),
            new Audio(dataURI)
        ];
        var curSound = 0;
        var pressedTimeout;
        dataURI = null;
        function play(evt) {
            // sound
            sounds[curSound].pause();
            try {
                sounds[curSound].currentTime = 0.001; //HACK - was for mobile safari, but sort of doesn't matter...
            } catch (x) {
                console.log(x);
            }
            sounds[curSound].play();
            curSound = ++curSound % sounds.length;

            var $k = $keys.find('[data-key='+i+']').addClass('pressed');

            //TODO - it'd be nice to have a single event for triggering and reading
            $keys.trigger('played-note.piano', [i, $k]);

            // visual feedback
            window.clearTimeout(pressedTimeout);
            pressedTimeout = window.setTimeout(function() {
                $k.removeClass('pressed');
            }, 200);

        }
        $keys.on('note-'+i+'.play', play);
        var $key = $('<div>', {
            'class': 'key' + blackKeyClass(i),
            'data-key': i,
            'id': i,
            mousedown: function(evt) {
                $keys.trigger('note-'+i+'.play');
/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
                    if (addToStave) {
                        keyPress.piano.push(this.dataset.key);
                        preMain.push(
                                parseInt(this.dataset.key)
                            );
                        noteConvert(keyPress.piano);
                    }
/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
                },
                mouseup: function(evt) {
/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
                    if (addToStave) {
                        keyPress.piano.splice(keyPress.piano.indexOf(this.dataset.key), 1);
                            // second parameter of splice is number of # to be removed
                    }
/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
                }
        }).appendTo($keys);
    }
    // delayed for-loop to stop browser from crashing :'(
    // go slower on Chrome...
    var i = -12, max = 14, addDelay = /Chrome/i.test(navigator.userAgent) ? 80 : 0;
    (function go() {
        addKey(i + notesOffset);
        if (++i < max) {
            window.setTimeout(go, addDelay);
        } else {
            buildingPiano = false;
            $keys.trigger('build-done.piano');
        }
    })();
}

buildPiano();



//
// Setup synth controls
//

function camelToText(x) {
    x = x.replace(/([A-Z])/g, ' $1');
    return x.charAt(0).toUpperCase() + x.substring(1);
}

//
// Setup keyboard interaction
//

var keyNotes = {
    /*a*/ 65: 0, // c
    /*w*/ 87: 1, // c#
    /*s*/ 83: 2, // d
    /*e*/ 69: 3, // d#
    /*d*/ 68: 4, // e
    /*f*/ 70: 5, // f
    /*t*/ 84: 6, // f#
    /*g*/ 71: 7, // g
    /*y*/ 89: 8, // g#
    /*h*/ 72: 9, // a
    /*u*/ 85: 10, // a#
    /*j*/ 74: 11, // b
    /*k*/ 75: 12, // c
    /*o*/ 79: 13, // c#
    /*l*/ 76: 14, // d
    /*p*/ 80: 15, // d#
    /*;*/ 186: 16, // e
    /*;*/ 59: 16, // e (sometimes 186 and sometimes 59)
    /*,*/ 222: 17, // f
    /*]*/ 221: 18, // f#
    /*enter*/ 13: 19 // g
};
var notesShift = -12;
var downKeys = {};

function isModifierKey(evt) {
    return evt.metaKey || evt.shiftKey || evt.altKey;
}

/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    this part will really only become important when considering
    laptop users.
    ie. not when using an ipad which is expected main behaviour.
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

var toStave = {
    0: -12,
    1: -11,
    2: -10,
    3: -9,
    4: -8,
    5: -7,
    6: -6,
    7: -5,
    8: -4,
    9: -3,
    10: -2,
    11: -1,
    12: 0,
    13: 1,
    14: 2,
    15: 3,
    16: 4,
    16: 5,
    17: 6,
    18: 7,
    19: 8
}

var key;
$(window).keydown(function(evt) {
    var keyCode = evt.keyCode;
    // prevent repeating keys
    if (!downKeys[keyCode] && !isModifierKey(evt)) {
        downKeys[keyCode] = 1;
        key = keyNotes[keyCode];
        if (typeof key != 'undefined') {
            $keys.trigger('note-'+(key+notesShift+notesOffset)+'.play');
            evt.preventDefault();
        } else if (evt.keyCode == 188) {
            notesShift = -12;
        } else if (evt.keyCode == 190) {
            notesShift = 0;
        } // else if (keyCode == 37 || keyCode == 39) {
        //     notesOffset += (keyCode == 37 ? -1 : 1) * 12;
        //     buildPiano();
        // }
    }
/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
    if (addToStave) {
        keyPress.piano.push(toStave[key]);
        preMain.push(
                parseInt(toStave[key])
            );
        noteConvert(keyPress.piano);
    }

/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */


}).keyup(function(evt) {
    delete downKeys[evt.keyCode];


/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
    if (addToStave) {
        keyPress.piano.splice(keyPress.piano.indexOf(key), 1);
    }

/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

});




//
// Help controls
//

var $help = $('.help');



window.setTimeout(function() {
    $help.removeClass('show');
}, 0);
// prevent quick find...
$(window).keydown(function(evt) {
    if (evt.target.nodeName != 'INPUT' && evt.target.nodeName != 'TEXTAREA') {
        if (evt.keyCode == 222) {
            evt.preventDefault();
            return false;
        }
    }
    return true;
});


var preMain = [];
var main = [
                [16, -12, -9, -5],
                [16],
                [16, -12, -8, -5],
                [16]
    ];

function defineMain () {
    var demoSpeed = 64,
        noteLength = Math.round(demoSpeed/main.length);

    function listToMatrix(list, elementsPerSubArray) {
        var matrix = [], i, k;

        for (i = 0, k = -1; i < list.length; i++) {
            if (i % elementsPerSubArray === 0) {
                k++;
                matrix[k] = [noteLength];
            }

            matrix[k].push(list[i]);
        }

        return matrix;
    }
    main = [];
    main = listToMatrix(preMain, 1);
    return main;
}


//
// Demo
//
var data = [
    {
        'style': 'wave',
        'volume': 'linearFade',
        'notesOffset': 0
    }
];

function chopsticks() {
    data.splice(1, 100);
        // So bait... Empties the data array after the first
        // config element so that all notes are given the same time signature
    data.push.apply(data, main);
    return data;
};


var demoing = false, demoingTimeout;

function demo(data) {
    var cfg = data[0];
    if (!buildingPiano && !demoing) {
        demoing = true;
        cfg.style && (DataGenerator.style.default = DataGenerator.style[cfg.style]);
        cfg.volume && (DataGenerator.volume.default = DataGenerator.volume[cfg.volume]);
        cfg.notesOffset !== undefined && (notesOffset = cfg.notesOffset);
        $keys.one('build-done.piano', function() {
            //NOTE - jQuery.map flattens arrays
            var i = 0,
                song = $.map(data, function(x, i) {
                    return i == 0 ? null : [x];
                });
            (function play() {
                if (!demoing) return;
                if (i >= song.length) { i = 0; }
                var part = song[i++];
                if (part) {
                    var delay = part[0];
                    demoingTimeout = window.setTimeout(function() {
                        demoing && play();
                        for (var j=1, len=part.length; j<len; j++) {
                            $keys.trigger('note-'+(part[j]+notesOffset)+'.play');
                        }
                    }, delay*50);
                }
            })();
        });
        buildPiano();
    }
}

function demoHandler(evt) {
    if (evt.type === 'click' || (evt.keyCode == 77 && !isModifierKey(evt))) {
        if (demoing) {
            demoing = false;
            window.clearTimeout(demoingTimeout);
            $keys.unbind('build-done.piano');
            addToStave = true;
        } else {
            demo(chopsticks());
            addToStave = false;
        }
    }
}

$(window).keyup(demoHandler);
$('#play-button').click(demoHandler);
$('#clear').click(clearNotes);
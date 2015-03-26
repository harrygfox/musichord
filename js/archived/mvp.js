// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // PIANO THINGY MVP
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

var notes,
    voice,
    formatter;

var width = 600;

// ----------------------------------------------------
// RENDER THE STAVE IN CANVAS

var canvas = $("div.canvas-wrapper canvas")[0];
    // Need to use array notation because jquery select returns an array of one.
var renderer = new Vex.Flow.Renderer(
        canvas,
        Vex.Flow.Renderer.Backends.CANVAS
    );
    // Creates an object with a context property
    // ctx: CanvasRenderingContext2D
        // "This rendering context gives VexFlow a consistent 2D drawing interface,
        // which is modeled on HTML5 Canvas"
    // ** For more information see: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
var ctx = renderer.getContext()
    // Alternatively renderer.ctx produces the same object.
var stave = new Vex.Flow.Stave(50, -10, width);
    // Stave(x-pos, y-pos, width);
        // Drawn in the same directions as SVG (top-left to bottom,right)

// Pass the rendering context to the stave object and call draw()
stave.addClef("treble").setContext(ctx).draw();


    // The data model of the renderer requires the following structure:

        // a set of notes or a single note is a StaveNote.
        // a StaveNote belongs on a stem.
            // a stem can be up or down.
        // a StaveNote has an associated duration.

        // a group of StaveNotes is a Voice
        // Voices has a time signature and all the StaveNotes inside the Voice
        // MUST use all the beats in the voice - e.g. 4/4 must have 4 quarter beats.

        // a group of at least one Voice is a VoiceGroup

        // Formatter takes a voice group and justifies the voices on the stave
        // to make them all look pretty.

// ----------------------------------------------------
// ADDING NOTES

notes = [
        // quarter Cm
    new Vex.Flow.StaveNote({
        keys: ["c/4", "bb/4", "g/4"],
        duration: "q"
    })
    .addAccidental(2, new Vex.Flow.Accidental("b")),
        // quarter A
    new Vex.Flow.StaveNote({
        keys: ["a/4"],
        duration: "q"
    }),
        // quarter rest
    new Vex.Flow.StaveNote({
        keys: ["e/4", "b/4"],
        duration: "q"
            // NOTES this is a quarter rest
                // it is given a glyph sub-property 
                // position: "b/4"
                // rest: true
                // stem: false (others will be true)
    }),
        // quarter C
    new Vex.Flow.StaveNote({
        keys: ["c/4", "e/4", "g/4"],
        duration: "q"
    })
];

// ----------------------------------------------------
// CREATE A VOICE

voice = new Vex.Flow.Voice({
    // create the voice object and pass it time properties
    beat_value: 4,
    num_beats: 4,
    resolution: Vex.Flow.RESOLUTION
        // Defines the time object which is a property of the new voice object
});

voice.addTickables(notes);
    // creates a property tickables which is passed an array of notes

formatter = new Vex.Flow.Formatter()
                .joinVoices([voice])
                .format([voice], width);
    // join the voices together (only one for now)
    // format the justification of the voice to the width of the stave.
// ***********************************************
// ***********************************************
// voice.draw(ctx, stave);
// ***********************************************
// ***********************************************
    // To draw the voice - pass it the renderer context and the stave on which it
    // will be drawn.


// ----------------------------------------------------
// FOR REFERENCE -
    // ALL NOTE TYPES
        console.log("All note types", Vex.Flow.keyProperties.note_values);
    // ALL ACCIDENTALS
        console.log("All accidentals (sharps and flats)", Vex.Flow.accidentalCodes.accidentals);
    // ALL SCALES
        console.log("All scales", Vex.Flow.keySignature.keySpecs);


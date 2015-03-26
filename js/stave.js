var canvas = $('.canvas-wrapper canvas')[0],
    renderer = new Vex.Flow.Renderer(canvas, Vex.Flow.Renderer.Backends.CANVAS),
    ctx = renderer.getContext(),
    notesBar2,
    staveWidth = 680,
    x = 10,
    y = -10;

// Stave 1
var staveBar1 = new Vex.Flow.Stave(x, y, staveWidth);

staveBar1.setBegBarType(2);
// setBegBarType(Vex.Flow.Barline.type.REPEAT_BEGIN);
    // DOUBLE = 2
    // END = 3
    // REPEAT_BEGIN = 4 
    // REPEAT_END = 5
    // REPEAT_BOTH = 6 
    // NONE = 7
staveBar1.setEndBarType(3);
//     new Vex.Flow.StaveNote({
//         keys: ["c/4", "e/4", "g/4"],
//         duration: "q"
//             // NOTES this is a quarter rest
//                 // it is given a glyph sub-property 
//                 // position: "b/4"
//                 // rest: true
//                 // stem: false (others will be true)
//     }),


// var staveBar2 = new Vex.Flow.Stave(staveBar1.width + staveBar1.x, staveBar1.y, staveWidth);

staveBar1.addClef("treble").setContext(ctx).draw();
// staveBar2.setContext(ctx).draw();
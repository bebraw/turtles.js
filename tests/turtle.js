define(['bunit', '../src/turtle'], function(bunit, turtle) {
    var suite = bunit.suite;
    var assert = bunit.assert;
    var turtle = turtle.turtle;

    var context = {
        center: function() {},
        translate: function() {},
        rotate: function() {},
        line: function() {},
        clear: function() {}
    };

    suite('Turtle initializers', {
        empty: function() {
            // XXX: might want to raise an exception instead
            assert(turtle()).equals(null);
        },
        context: function() {
            assert(turtle(context)).is('object');
        },
        invalidContext: function() {
            // XXX: might want to raise an exception instead
            assert(turtle({})).equals(null);
        }
    });

    // TODO: test the API commands and recording
});

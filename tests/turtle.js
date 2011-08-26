define(['bunit', '../src/turtle'], function(bunit, turtle) {
    var suite = bunit.suite;
    var assert = bunit.assert;
    var turtle = turtle.turtle;

    var context = function() {
        return {
            center: function() {
                this.atCenter = true;
            },
            translate: function(x, y) {
                this.translation = y;
            },
            rotate: function(degrees) {
                if(degrees == 180) {
                    this.pointsNorth = true;
                }
            },
            line: function() {},
            clear: function() {},
            atCenter: false,
            pointsNorth: false,
            translation: 0
        };
    };

    suite('Turtle initializers', {
        empty: function() {
            // XXX: might want to raise an exception instead
            assert(turtle()).equals(null);
        },
        context: function() {
            assert(turtle(context())).is('object');
        },
        invalidContext: function() {
            // XXX: might want to raise an exception instead
            assert(turtle({})).equals(null);
        },
        atCenter: function() {
            var ctx = context();
            var joe = turtle(ctx);

            assert(ctx.atCenter).equals(true);
            assert(ctx.pointsNorth).equals(true);
            assert(joe.penState()).equals('down');
        }
    });

    suite('Turtle pen', {
        _: {
            joe: turtle(context())
        },
        setPenDown: function() {
            this.joe.penDown();

            assert(this.joe.penState()).equals('down');
        },
        setPenUp: function() {
            this.joe.penUp();

            assert(this.joe.penState()).equals('up');
        }
    });

    suite('Turtle move', {
        forward: function() {
            var ctx = context();
            var joe = turtle(ctx);
            
            joe.forward(100);

            assert(ctx.translation).equals(100);
        },
        backward: function() {
            var ctx = context();
            var joe = turtle(ctx);

            joe.backward(100);

            assert(ctx.translation).equals(-100);
        }
    });

    suite('Turtle rotate', {
        //_: initTurtle(),
        left: function() {
            //this.joe.rotate(-90);
        },
        right: function() {
            //this.joe.rotate(90);
        }
    });

    suite('Turtle recording', {
        
    });

    suite('Turtle reset', {
        
    });

    suite('Turtle repeat', {
        
    });

    // TODO: test the API commands and recording
    // TODO: implement proper setUp
});

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
                this.translation += y;
            },
            rotate: function(degrees) {
                this.rotation = degrees;

                if(degrees == 180) {
                    this.pointsNorth = true;
                }
            },
            line: function() {},
            clear: function() {},
            atCenter: false,
            pointsNorth: false,
            translation: 0,
            rotation: 0
        };
    };

    var setUpTurtle = function() {
        var ctx = context();
        var joe = turtle(ctx);

        return [ctx, joe];       
    };

    var initialState = function(ctx, joe) {
        // turtle should be at center, pen down, facing north initially
        assert(ctx.atCenter).equals(true);
        assert(ctx.pointsNorth).equals(true);
        assert(joe.penState()).equals('down');        
    };

    suite('Turtle initializers', {
        setUp: setUpTurtle,
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
        initialState: initialState
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
        setUp: setUpTurtle,
        forward: function(ctx, joe) {
            joe.forward(100);

            assert(ctx.translation).equals(100);
        },
        backward: function(ctx, joe) {
            joe.backward(100);

            assert(ctx.translation).equals(-100);
        }
    });

    suite('Turtle rotate', {
        setUp: setUpTurtle,
        left: function(ctx, joe) {
            joe.rotate(-90);

            assert(ctx.rotation).equals(-90);
        },
        right: function(ctx, joe) {
            joe.rotate(90);

            assert(ctx.rotation).equals(90);
        }
    });

    suite('Turtle recording', {
        setUp: setUpTurtle,
        recordLeft: function(ctx, joe) {
            joe.record('left');
            joe.rotate(-90);
            joe.stop();

            // should not affect rotation since we're recording
            assert(ctx.rotation).equals(180);

            joe.left();
            assert(ctx.rotation).equals(-90);
        }
    });

    suite('Turtle reset', {
        setUp: setUpTurtle,
        simple: function(ctx, joe) {
            joe.forward(100);
            joe.rotate(-45);
            joe.forward(50);

            joe.reset();

            initialState(ctx, joe);
        }
    });

    suite('Turtle repeat', {
        setUp: setUpTurtle,
        simple: function(ctx, joe) {
            joe.repeat(4, 'forward', 100);

            assert(ctx.translation).equals(400);
        },
        template: function(ctx, joe) {
            joe.record('longForward');
            joe.repeat(4, 'forward', '<distance>');
            joe.stop();

            joe.longForward({distance: 100});
            assert(ctx.translation).equals(400);
        }
    });

    // TODO: set color, set width, set image, recursion (spiral)
});

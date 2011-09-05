define(['bunit', '../src/turtle', 'assert'], function(bunit, turtle, assert) {
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
            color: function(col) {
                this.col = col;
            },
            lineWidth: function(w) {
                this.w = w;
            },
            line: function() {},
            clear: function() {},
            atCenter: false,
            pointsNorth: false,
            translation: 0,
            rotation: 0,
            col: null,
            w: 0
        };
    };

    var setUpTurtle = function() {
        var ctx = context();
        var joe = turtle(ctx);

        return [ctx, joe];       
    };

    var initialState = function(ctx, joe) {
        assert(ctx.atCenter).equals(true);
        assert(ctx.pointsNorth).equals(true);
        assert(ctx.col.toArray()).equals([0, 0, 0, 1]);
        assert(ctx.w).equals(1);

        assert(joe.penState()).equals('down');     
        assert(joe.color().toArray()).equals([0, 0, 0, 1]);
        assert(joe.lineWidth()).equals(1);
    };

    bunit('Turtle initializers', {
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
            //assert(turtle({})).equals(null); // XXXXX
        },
        initialState: initialState
    });

    bunit('Turtle pen', {
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

    bunit('Turtle move', {
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

    bunit('Turtle rotate', {
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

    bunit('Turtle recording', {
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

    bunit('Turtle reset', {
        setUp: setUpTurtle,
        simple: function(ctx, joe) {
            joe.forward(100);
            joe.rotate(-45);
            joe.forward(50);

            joe.reset();

            initialState(ctx, joe);
        }
    });

    bunit('Turtle repeat', {
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

            joe.reset();
            joe.longForward({distance: 20});
            assert(ctx.translation).equals(480);
        }
    });

    bunit('Turtle color', {
        setUp: setUpTurtle,
        simple: function(ctx, joe) {
            joe.color('red');

            assert(joe.color().toArray()).equals([1, 0, 0, 1]);
            assert(ctx.col.toArray()).equals([1, 0, 0, 1]);
        }
    });

    bunit('Turtle line width', {
        setUp: setUpTurtle,
        simple: function(ctx, joe) {
            joe.lineWidth(10);

            assert(joe.lineWidth()).equals(10);
            assert(ctx.w).equals(10);
        }
    })

    // TODO: set image, fill (toggle)
});

define(['turtle', 'demoUtils', 'utils'], function(turtle, demoUtils, utils) {
    return {
        run: function() {
            // based on http://www.leeds.ac.uk/jcom/turtle/turtlepascal.htm
            var canvas = demoUtils.createCanvas();
            var ctx = turtle.context(canvas);
            var joe = turtle.turtle(ctx);

            joe.record('blot');
            joe.repeat(4, 'forward', '<radius>', 'rotate', 90);
            joe.stop();

            joe.record('prong');
            joe.penUp();
            joe.forward('<len>');
            joe.penDown();
            
            joe.blot({radius: 10});
            
            joe.penUp();
            joe.backward('<len>');
            joe.stop();

            utils.each(function(k) {
                joe.color({r: Math.random(), g: Math.random(), b: Math.random()});
                joe.prong({
                    len: k
                });
                joe.rotate(61);
            }, utils.reverse(utils.range(360)));
        }
    }
});

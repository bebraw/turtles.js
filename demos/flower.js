define(['turtle', 'context', 'demoUtils'], function(turtle, context, demoUtils) {
    return {
        run: function() {
            var canvas = demoUtils.createCanvas();
            var ctx = context.normal(canvas);
            var joe = turtle(ctx);

            joe.lineWidth(2);

            joe.record('box');
            joe.repeat(4, 'forward', '<radius>', 'rotate', 90);
            joe.stop();

            joe.record('flower');
            joe.repeat('<parts>', 'box', null, 'rotate', '<rotation>');
            joe.stop();

            var options = {
                parts: 36,
                rotation: 10,
                radius: 90
            };

            joe.flower(options);

            joe.rotate(-10);
            joe.forward(150);
            joe.flower(options);

            joe.rotate(-140);
            joe.forward(200);
            joe.flower(options);

            joe.rotate(100);
            joe.forward(220);
            joe.flower(options);
        }
    }
});

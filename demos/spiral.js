define(['turtle'], function(turtle) {
    return {
        run: function() {
            return;
            
            var ctx = turtle.context(); // TODO: pass elem
            var joe = turtle.turtle();

            // TODO
            joe.record('spiral');
            joe.stopIf('<size> > 100');
            joe.forward('<size>');
            joe.rotate('<angle>');
            joe.spiral({
                size: '<size> + 2', 
                angle: '<angle>'
            }); // figure out how to deal with recursion step while recording
            joe.stop();

            // TODO: render a few spirals
        }
    }
});

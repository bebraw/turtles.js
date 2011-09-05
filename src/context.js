define(function() {
    // TODO: might want to implement other contexts too
    var normal = function(canvas) {
        if(!canvas) {
            return null;
        }

        var ctx = canvas.getContext("2d");

        return {
            center: function() {
                ctx.setTransform(1, 0, 0, 1, 0, 0);

                ctx.translate(canvas.width / 2, canvas.height / 2);
            },
            translate: function(x, y) {
                ctx.translate(x, y);
            },
            rotate: function(degrees) {
                ctx.rotate(degrees / 360 * 2 * Math.PI);
            },
            line: function(distance) {
                ctx.beginPath();

                ctx.moveTo(0, 0);
                ctx.lineTo(0, distance);

                ctx.stroke();
            },
            clear: function() {
                ctx.save();

                ctx.setTransform(1, 0, 0, 1, 0, 0);

                ctx.clearRect(0, 0, canvas.width, canvas.height);

                ctx.restore();
            },
            color: function(col) {
                ctx.strokeStyle = col.toCSS();
            }
        };
    };

    return {
        normal: normal
        // radial, mirror, etc.
    };
});
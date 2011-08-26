define(function() {
    return {
        createCanvas: function() {
            var canvas = document.createElement('canvas');
            canvas.width = 800;
            canvas.height = 600;

            document.body.appendChild(canvas);

            return canvas;
        }
    };
});

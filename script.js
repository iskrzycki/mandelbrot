var CANVAS = {
    WIDTH: 1000,
    HEIGHT: 600
};

var MANDELBROT = {
    MIN_X: -2.5,
    MAX_X: 1,
    MIN_Y: -1.25,
    MAX_Y: 1.25
};

var COLOR_PALETTE = ["red", "black", "white"];
var MAX_ITERATIONS = 500;

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

canvas.width = CANVAS.WIDTH;
canvas.height = CANVAS.HEIGHT;

function drawPoint (x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, 1, 1);
}

function normalize (value, max, newMax, newMin) {
    return (value / max) * (newMax - newMin) + newMin;
}

(function mandelbrot () {
    var i, j, x0, y0, x, y, iteration, xTemp, color;
    var paletteLength = COLOR_PALETTE.length;

    for (i = 0; i < CANVAS.WIDTH; i++) {
        for (j = 0; j < CANVAS.HEIGHT; j++) {
            x = 0;
            y = 0;
            iteration = 0;
            
            x0 = normalize(i, CANVAS.WIDTH, MANDELBROT.MAX_X, MANDELBROT.MIN_X);
            y0 = normalize(j, CANVAS.HEIGHT, MANDELBROT.MAX_Y, MANDELBROT.MIN_Y);

            while (x*x + y*y < 4 && iteration < MAX_ITERATIONS) {
                xTemp = x*x - y*y + x0;
                y = 2*x*y + y0;
                x = xTemp;
                iteration++;
            }
            color = COLOR_PALETTE[iteration % paletteLength];
            drawPoint(i, j, COLOR_PALETTE[iteration % paletteLength]);
        }
    }
})();
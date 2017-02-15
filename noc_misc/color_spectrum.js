var col;
var colors;

function setup() {
    col = createVector(255, 0, 0);
    colors = new Array();

    createCanvas(windowWidth, windowHeight);
    background(0);
    for (var r = 0; r < 255; r++) {
        for (var g = 0; g < 255; g++) {
            colors.push(createVector(255 - r, g, 0))
        }
    }
}

function draw() {
    background(0);

    fill(colors[frameCount].x, colors[frameCount].y, 0);
    ellipseMode(RADIUS);
    noStroke();
    ellipse(width / 2, height / 2, 100);
}
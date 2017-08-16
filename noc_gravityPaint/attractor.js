var attractors;
var particles;
var g;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);
    particle = new Particle();
    particles = new Array();
    attractors = new Array();
    partid = 0;
    g = 5;

    //spawn lightweight particles
    for (i = 0; i < 20000; i++) {
        particles.push(new Particle(0.4, 2));

    }

    //spawn heavy particles
    for (i = 0; i < 4000; i++) {
        particles.push(new Particle(2, 4));

    }

    attractors.push(new Attractor(width / 2, height / 2));
}

/*
function mousePressed() {
    attractors.push(new Attractor(mouseX, mouseY));
*/

function draw() {
    background(0);
    for (i = 0; i < particles.length; i++) {
        var p = particles[i];
        p.id = i
        p.run();

        if (p.velocity.mag() > 25) {
            particles.splice(i, 1);
        }
    }

    for (j = 0; j < attractors.length; j++) {
        var a = attractors[j];
        a.render();
    }
}

//classes

function Attractor(posx, posy) {
    this.position = createVector(posx, posy);
    this.radius = 3;
    this.mass = 15;

    this.render = function() {
        ellipseMode(RADIUS);
        stroke(255)
        fill(0, 0, 0);
        ellipse(this.position.x, this.position.y, this.radius);
        /*
        noStroke();
        fill(255);
        textAlign(LEFT);
        textSize(12);
        text(floor(this.mass), this.position.x + 10, this.position.y)
        */
    }
}
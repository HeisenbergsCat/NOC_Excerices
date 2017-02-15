var bodies;
var g; //gravitional constant
var attracor;
var p;

function setup() {
	bodies = new Array();
	createCanvas(1000,600);
	background(0);
	p = createP();
	attracor = new Attractor(50, width/2, height/2);
	g = 0.1;

	mouseClicked =  function() {
		append(bodies, new Body(random(7, 14), mouseX, mouseY))
		return false;
	}
/*
	for (var i = 0; i < 200; i++) {
		bodies[i] = new Body(random(7, 25), random(0, width - 50), random(0, height - 50));
	}
*/
}

function draw() {

	p.html(frameRate());
	background(0);
	attracor.render();


	if (bodies.length > 0) {
		for (var i = 0; i < bodies.length; i++) {
			for(var j = 0; j < bodies.length; j++) {
				if (i != j) {
					bodies[i].applyForce(bodies[i].calcGravity(bodies[j], g));
				}
			}
		}
	}

if (bodies.length > 0) {
	for (var i = 0; i < bodies.length; i++) {
		bodies[i].applyForce(bodies[i].calcGravity(attracor, g));
		bodies[i].render();
		bodies[i].update();
		bodies[i].checkedges();
	}
}

}

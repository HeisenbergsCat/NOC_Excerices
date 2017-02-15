var system1;
var gravity;


function setup() {
	createCanvas(windowWidth,windowHeight);
	background(0);

	gravity = createVector(0, 0.2);
	system1 = new ParticleSystem(width/2, 100);


}

function draw() {
	background(0);
	system1.run();
	system1.emmiterPos.x = mouseX
	system1.emmiterPos.y = mouseY

	}

 var ref;


function setup() {
	createCanvas(640,480);
	ref = createP();
}

function draw() {
	background(125);

	var mouse = new p5.Vector(mouseX, mouseY);


	/* PURE CHAOS
	var mouse3 = new p5.Vector(mouseX, mouseY);
	var center = new p5.Vector(width/2, height/2);
	mouse.sub(center);
	mouse3.sub(center);
	mouse.mult(0.5);
	var mouse2 = new p5.Vector(mouse.x, mouse.y);
	var mouse4 = new p5.Vector(mouse2.x, mouse2.y)
	mouse4.mult(mouse2.mag());
	var bpoint = 1;

	translate(width/2, height/2);
	stroke(255,0,0);
	line(0, 0, mouse.x + bpoint, mouse.y + bpoint);
	stroke(0,255,0);
	line(mouse2.x + bpoint, mouse2.y + bpoint, mouse3.x, mouse3.y);
	stroke(0,0,255);
	line(mouse4.x + bpoint, mouse4.y + bpoint, mouse3.x, mouse3.y);
	*/

	ref.html( "X: " + mouseX + " Y: " +  mouseY);
}

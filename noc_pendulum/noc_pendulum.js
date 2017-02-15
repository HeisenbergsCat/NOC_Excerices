var g = 0.2;
var pend;
var pend2;
var pend3;
var drawpoints;

var pendulums;

function setup() {
	createCanvas(windowWidth,windowHeight);
	background(0);

	pend = new Pendulum(50, width/2, height/2 -100, PI/2);
	pendulums = new Array();
	drawpoints = new Array();

	for (var i = 0; i < 8; i++) {
		append(pendulums, new Pendulum(50, 0,0, TWO_PI + i));
	}
}

function draw() {
	background(0);
	pend.update();
	pend.render();

	pendulums[0] = pend;

	for (var i = 1; i < pendulums.length; i++) {
		pendulums[i].update();
		pendulums[i].origin.x = pendulums[i-1].position.x;
		pendulums[i].origin.y = pendulums[i-1].position.y;
		pendulums[i].r = (10 -i) *10
		//pendulums[i].angle += i/50;
		pendulums[i].render();
	}
/*
	for (var i = 0; i < pendulums.length; i++) {
		append(drawpoints, pendulums[pendulums.length - 1].position.copy());
	}
	noFill();

	for (var i = 0; i < drawpoints.length; i++) {
		point(drawpoints[i].x, drawpoints[i].y);
	}
	*/

}

function Pendulum(arm, originx, originy, angle) {
	this.r = arm;
	this.angVel = 0;
	this.angAcc = 0;
	this.angle = angle;
	this.origin = createVector(originx, originy);
	this.position = createVector();

	this.update = function() {
		this.angAcc = (-1 * sin(this.angle) * g)/this.r;
		this.angVel += this.angAcc;
		this.angle += this.angVel;

		//this.angVel *= 0.99;

		this.position.x = this.r * sin(this.angle);
		this.position.y = this.r * cos(this.angle);
		this.position.add(this.origin);
	}

	this.render = function() {
		ellipseMode(RADIUS);
		fill(255,255,255);
		stroke(255,255,255,100);
		//noStroke();
		strokeWeight(2);
		line(this.origin.x, this.origin.y, this.position.x, this.position.y);
		ellipse(this.position.x, this.position.y, 5);
	}
}

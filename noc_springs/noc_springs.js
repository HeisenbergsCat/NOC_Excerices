var spring;
var bob;
var gravity;

function setup() {
	createCanvas(windowWidth,windowHeight);
	background(0);

	spring = new Spring();
	bob = new Bob();
	gravity = createVector(0,0.7);

}

function draw() {
	background(0);
	spring.connect(bob);
	bob.update();
	bob.render();
	spring.render(bob);

}

function Bob() {
	this.position = createVector(0,0);
	this.velocity = createVector(0,0);
	this.acceleration = createVector(0,0);

	this.radius = 10;
	this.mass = 5;

	this.applyForce = function(force) {

		f = p5.Vector.mult(force, this.mass);
		this.acceleration.add(f);
	}

	this.calcUnit = function() {

		var uv = this.velocity.copy();
		uv.normalize();
		uv.mult(-1);

		return uv;
	}
	this.calcDrag = function(medium) {

		var drag = this.calcUnit();
		var speed = this.velocity.mag();

		var dragMag = medium * speed * speed;

		drag.mult(dragMag);

		return drag;
	}


	this.update = function() {

		this.applyForce(this.calcDrag(0.001));
		this.applyForce(gravity);
		this.velocity.add(this.acceleration);
		this.position.add(this.velocity);

		this.acceleration.mult(0);
	}

	this.render = function() {
		ellipseMode(RADIUS);
		fill(255,255,0);
		ellipse(this.position.x, this.position.y, 25);
	}
}


function Spring() {
	this.k = 0.02
	this.restLen = 120;
	this.anchor = createVector(width/2, 50);

	this.connect = function(bob) {
		var force = p5.Vector.sub(bob.position, this.anchor);

		var d = force.mag();
		var strech = d - this.restLen;

		force.normalize();
		force.mult((-1 * this.k * strech) / bob.mass);
		bob.applyForce(force);


	}

	this.render = function(bob) {
		ellipseMode(RADIUS);
		fill(255, 0, 0);
		ellipse(this.anchor.x, this.anchor.y, 5);
		noFill();
		stroke(255,255,255, 128);
		//line(this.anchor.x, this.anchor.y, bob.position.x, bob.position.y)

		push();
		translate(this.anchor.x, this.anchor.y);


		var springNum = 64
		leng = p5.Vector.sub(bob.position, this.anchor)
		rate = leng.mag() /springNum;
		stroke(255);
		beginShape();
		for (var i = 0; i <= springNum; i++) {
			spc = springNum/i;
				ellipse(leng.x /spc, leng.y/spc, 5);
		}

		endShape();
		pop();

	}
}

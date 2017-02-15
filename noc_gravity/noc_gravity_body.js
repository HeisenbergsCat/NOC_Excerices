function Body(radius, posx, posy) {
	//dynamic properities
	this.position = createVector(posx, posy);
	this.velocity = createVector(0,0);
	this.acceleration = createVector(0,5);

	this.aAcceleration = 1;
	this.aVelocity = 0;
	this.angle = 0


	//physical properities
	this.radius = radius;
	this.density = 0.1 // unit per pixel
	this.area = PI * this.radius * this.radius
	this.mass = this.area * this.density;

	this.applyForce = function(force) {
	this.acceleration.add(force);
	}

	this.calcGravity = function(body, gconst) {
		var force = p5.Vector.sub(this.position, body.position);
		force.normalize();
		force.mult(-1);

		var distance = p5.Vector.dist(this.position, body.position);
		var m = (gconst * this.mass * body.mass) / (distance * distance);
		force.mult(m);

		return force;

	}

	this.update = function() {


		this.velocity.add(this.acceleration);
		this.velocity.limit(100);
		this.position.add(this.velocity);
		this.acceleration.mult(0);

		this.angle = this.velocity.heading();

	}

	this.render = function() {

		noStroke();
		fill(255);
		ellipseMode(RADIUS);
		rectMode(CENTER);
		angleMode(DEGREES);

		push();
		translate(this.position.x, this.position.y);
		rotate(this.angle);
		rect(0, 0, this.radius + 30, this.radius)
		pop();




		textAlign(CENTER);
		textSize(this.radius);
		fill(255, 0, 0);
		text(floor(this.mass), this.position.x, this.position.y);



	}

	this.checkedges = function () {
		if (this.position.x > width) {

			this.position.x = 0;
			//this.velocity.x *= - 1;

		} else if (this.position.x < 0) {

			//this.velocity.x *= - 1;
			this.position.x = width;
		}

		if (this.position.y > height) {

			this.position.y = 0;
			//this.velocity.y *= -1;
		}

		if (this.position.y < 0) {

			//this.velocity.y *= -1;
			this.position.y = height;
		}
	}
}

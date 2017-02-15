function Attractor(radius, posx, posy) {
	//dynamic properities
	this.position = createVector(posx, posy);
	this.velocity = createVector(0,0);
	this.acceleration = createVector(0,0);


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
		var m = gconst * (this.mass * body.mass / distance * distance);
		force.mult(m);
		return force;

	}

	this.update = function() {

		this.velocity.add(this.acceleration);
		this.position.add(this.velocity);
		this.acceleration.mult(0);

	}


	this.render = function() {

		fill(255);
		ellipseMode(RADIUS);
		ellipse(this.position.x, this.position.y, this.radius, this.radius)

		textAlign(CENTER);
		textSize(this.radius);
		fill(255, 0, 0);
		text(floor(this.mass), this.position.x, this.position.y);

	}

}

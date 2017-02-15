function Mover(mass, dens,  xpos, ypos) {
	this.position = createVector(xpos, ypos);
	this.velocity = createVector(0,0);
	this.acceleration = createVector(0,0);
	this.accrate = 0.07;
	this.brakerate = 0.98;
	this.mass = mass;
	this.c = 1 // friction coefficient
	this.drag = 0
	this.density = dens;
	this.inwater = false;

	this.keyControl = function() {
			if (keyCode === UP_ARROW) {
				this.acceleration.y = -this.accrate;
			} else if (keyCode === DOWN_ARROW) {
				this.acceleration.y = this.accrate;
			} else if (keyCode === 32) {
				this.acceleration.y = 0;
				this.acceleration.x = 0;
				this.velocity.mult(this.brakerate);
			} else if (keyCode === LEFT_ARROW) {
				this.acceleration.x = - this.accrate;
			} else if (keyCode === RIGHT_ARROW) {
				this.acceleration.x = this.accrate;
			}

	}

	this.randomForce = function() {
		if(keyCode == 32) {
			if (keyIsPressed === true){
				randomV = p5.Vector.random2D();
				randomV.mult(5);
				this.acceleration.add(randomV);
			}
		}
	}

	this.applyForce = function(force) {

		var f = p5.Vector.div(force, this.mass);

		this.acceleration.add(f);
	}

	this.applyGravity = function(force) {

		var f = p5.Vector.div(force, this.mass);
		f.mult(this.mass);
		f.mult(this.density);
		this.acceleration.add(f);
	}

	this.calcUnit = function() {

		var uv = this.velocity.copy();
		uv.normalize();
		uv.mult(-1);

		return uv;
	}

	this.calcFriction = function() {
		var n = 1; //normal
		var f = this.calcUnit();

		var mag = this.c * n;

		f.mult(mag);

		return f;
	}

	this.calcDrag = function(medium) {

		var drag = this.calcUnit();
		var speed = this.velocity.mag();

		var dragMag = medium * speed * speed;

		drag.mult(dragMag);
		drag.mult(this.density);
		//drag.mult(0.5);

		return drag;
	}

	this.bouoyCalc  = function() {
		var bouoy = createVector(0,-0.03);
		bouoy.div(this.density);
		bouoy.mult(this.mass);
		this.acceleration.add(bouoy);
		return bouoy;
	}

	this.update = function() {

		//this.keyControl();
		this.randomForce();

		if (this.floorCheck()) {
			this.applyForce(this.calcFriction());
		}


		this.applyForce(wind);
		this.applyForce(this.calcDrag(this.drag));
		this.applyGravity(gravity);

		this.velocity.add(this.acceleration);
		this.position.add(this.velocity);
		this.acceleration.mult(0);
	}

	this.render = function(r,g,b) {
		fill(r,g,b);
		noStroke();
		ellipse(this.position.x, this.position.y, mass * 5, mass * 5);
	}

	this.waterCheck = function(medium) {
		if (this.position.x > medium.posx && this.position.x < medium.posx + medium.w &&
			this.position.y > medium.posy && this.position.y < medium.posy + medium.h) {

				this.inwater = true;
				return true;

			} else {

				this.inwater = false;
				return false;
			}
	}

	this.floorCheck = function() {
		if (this.position.y >= height) {
			return true;
		} else {
			return false;
		}
	}

	this.checkedges = function () {
		if (this.position.x > width) {

			this.position.x = width;
			this.velocity.x *= - 1;

		} else if (this.position.x < 0) {

			this.velocity.x *= - 1;
			this.position.x = 0;
		}

		if (this.position.y > height) {

			this.position.y = height;
			this.velocity.y *= -1;
		}

		if (this.position.y < 0) {

			this.velocity.y *= -1;
			this.position.y = 0;
		}
	}
}

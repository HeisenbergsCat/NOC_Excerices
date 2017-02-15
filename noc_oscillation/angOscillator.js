function angOscillator() {

	this.radiusmin = 1;
	this.radiusmax = 20;
	this.randColor = random(0,3);
	this.colors = createVector(0,0,0);

	this.angle = createVector(0,0);
	this.aVelocity = createVector(random(-0.01,0.01), random(-0.01,0.01));
	this.position = createVector(0,0);
	this.amplitude = createVector(random(30, 300), random(30,300));
	this.radius = random(this.radiusmin, this.radiusmax);

	this.aVelocity.x = map(this.radius, this.radiusmin, this.radiusmax, -0.02, 0.02);
	this.aVelocity.y = map(this.radius, this.radiusmin, this.radiusmax, -0.02, 0.02);

	this.oscillate = function() {
		this.angle.add(this.aVelocity);
		this.position.x = sin(this.angle.x) * this.amplitude.x;
		this.position.y = sin(this.angle.y) * this.amplitude.y;
	}

	this.render = function() {

		ellipseMode(RADIUS);
		noStroke();
		if (floor(this.randColor) == 0) {
			this.colors = createVector(255,random(0, 255),random(0, 255))
		} else if (floor(this.randColor) == 1) {
			this.colors = createVector(random(0, 255),255,random(0, 255));
		} else if (floor(this.randColor) == 2){
			this.colors = createVector(random(0, 255),random(0, 255),255);
		}

		fill(this.colors.x, this.colors.y, this.colors.z);
		//fill(map(this.radius, this.radiusmin, this.radiusmax, 50, 255));

		push();
		translate(width/2, height/2);
		//aline(0,0,this.position.x, this.position.y);
		ellipse(this.position.x, this.position.y, this.radius);
		pop();
	}

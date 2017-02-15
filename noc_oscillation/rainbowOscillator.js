function rainbowOscillator(ampx, ampy, periodx, periody, startposx, startposy) {
	this.amplitude = createVector(ampx,ampy);
	this.period = createVector(periodx, periody);
	this.position = createVector();
	this.angle = 0;
	this.colors = createVector(0,0,0);

	this.positionCalc = function() {
		this.position.x = this.amplitude.x * sin(TWO_PI * frameCount / this.period.x);
		this.position.y = this.amplitude.y * sin(TWO_PI * frameCount / this.period.y);
	}

	this.colorsCalc = function() {
		this.colors.x = map(this.position.x, - this.amplitude.x, this.amplitude.x, 0, 255) //RED
		this.colors.y = map(this.position.x, - this.amplitude.x, this.amplitude.x, 255, 0) //GREEN
		this.colors.z = map(this.position.y, - this.amplitude.y, this.amplitude.y, 255, 0) //BLUE
	}

	this.rnd = function(min, max) {
		return random(min, max);
	}

	this.render = function() {

		var r = this.colors.x;
		var g = this.colors.y;
		var b = this.colors.z;

		push();
		translate(startposx, startposy);
		rotate(this.angle);

		ellipseMode(RADIUS);
		noStroke();
		fill(r, g, b);
		if (this.angle <= TWO_PI) {
			ellipse(this.position.x, this.position.y, map((abs(this.position.y)+abs(this.position.x))/2, -this.amplitude.x, this.amplitude.x, -10, 10));

		}
		pop();
		this.angle += TWO_PI/7200
	}

	this.hud = function() {

		ellipseMode(RADIUS);
		fill(0)
		ellipse(0,-5,30)
		textSize(16);
		fill(255);
		textAlign(CENTER);
		text(floor(map(this.angle, 0, TWO_PI, 0, 360)), 0, 0);

	}

}

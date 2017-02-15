var w;
var ppos;
var tex;
var frate;

function setup () {
	createCanvas(800,500);
	background(0);
	fill(0,0,0,0);
	w = new Walker();
	frameRate(120)
	frate = createP();
	ppos = createP();
	tex = createP();
}

function draw () {
	w.move();
	w.randomize(0);
	w.render(25);
	tex.html(w.locations.length);
	ppos.html(frameCount);
	frate.html(floor(frameRate()));
}

function Walker() {
	this.pos = createVector(width/2, height/2);
	this.init = createVector(width/2, height/2);
	this.speed = 10;
	this.siz = 10;
	this.col = (0);
	this.locations = [this.init];
	this.check = false;
	this.scalefactor = 0;
	this.sizes = [];

	this.decide = function() {
		var returnVector = createVector();
		var picknumber = random(100);

		if (picknumber < 11.1) {
			returnVector.add(0,this.speed);
		} else if (picknumber < 22.2) {
			returnVector.add(this.speed,this.speed);
		} else if (picknumber < 33.3) {
			returnVector.add(this.speed,0);
		} else if (picknumber < 44.4) {
			returnVector.add(this.speed,-this.speed);
		} else if (picknumber < 55.5) {
			returnVector.add(0,-this.speed);
		} else if (picknumber < 66.6) {
			returnVector.add(-this.speed, -this.speed);
		} else if (picknumber < 77.7) {
			returnVector.add(-this.speed, 0);
		} else if (picknumber < 88.8) {
			returnVector.add(-this.speed,this.speed);
		} else {
			returnVector.add(0,0);
		}
		return returnVector;
	}

	this.move = function() {
		test_pos = this.pos.copy();
		delta = this.decide();
		test = false;

		if (!this.checklocation()) {
			append(this.locations, test_pos)
		}

		this.pos.add(delta);


		if (this.pos.x > width) {
			this.pos.x = 0;
		}
		if (this.pos.y > height) {
			this.pos.y = 0;
		}
		if (this.pos.x < 0) {
			this.pos.x = width;
		}
		if (this.pos.y < 0) {
			this.pos.y = height;
		}
	}

	this.randomize = function(val) {

		rate = val
		randx = random(-rate, rate);
		randy = random(-rate, rate);
		randv = createVector(randx, randy);
		this.speed += randx;
	}

	this.checklocation = function() {
		test_pos = this.pos.copy();
		for(var i = 0; i < this.locations.length; i++) {
			if (test_pos.equals(this.locations[i])) {
				return true;
			}
		}
		return false;

	}

	this.render = function(alpha) {
		noStroke()
		if (this.checklocation()) {
			ellipse(this.pos.x, this.pos.y, this.siz - 5);
			fill(0, 150, 255, alpha + 5);
		} else {
			ellipse(this.pos.x, this.pos.y, this.siz + 5);
			fill(0, 0, 255, alpha);
		}
	}
}

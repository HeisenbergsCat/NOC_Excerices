var popul;
var lifespan = 400;
var lifeP;
var hitP;
var maxP;
var maxscore = 0;
var hits = 0;
var count = 0;
var maxforce = 0.2;
var dead = 0;
var target_dir = 'R';
var currentx;
var target;

var rx = 80;
var ry = 220;
var rw = 170;
var rh = 10;

function setup() {
	createCanvas(360,400);
	popul = new Population();
	lifeP = createP();
	hitP = createP();
	maxP = createP();
	target = createVector(50, 50)

}

function draw() {
	background(135);
	popul.run();
	lifeP.html(count)
	hitP.html('score: ' + hits);
	maxP.html('hiscore: ' + maxscore);


	if (count == lifespan) {
		popul.evaluate();
		popul.selection();
		count = 0;
	}

/*
	for (var i = 0; i < popul.rockets.length; i++) {
		if(popul.rockets[i].crashed) {
			dead++;
		}
	}
	console.log(dead);
*/
	fill(255);
	rect(rx, ry, rw, rh)

	count++

	ellipse(target.x, target.y, 10, 10);

}

function DNA(genes) {
	if (genes) {
		this.genes = genes;
	} else {
		this.genes = [];
	for (var i = 0; i < lifespan; i++) {
		this.genes[i] = p5.Vector.random2D();
		this.genes[i].setMag(maxforce);
		}
	}

	this.cross = function(partner) {
		var newgenes = [];
		var midpoint = floor(random(this.genes.length));
		for (i = 0; i < this.genes.length; i++) {
			if (i > midpoint) {
				newgenes[i] = this.genes[i];
			} else {
				newgenes[i] = partner.genes[i];
			}
		}
		return new DNA(newgenes);
	}

	this.mutation = function() {
		for (i = 0; i < this.genes.length; i++) {
			if (random(1) < 0.01) {
				this.genes[i] = p5.Vector.random2D();
				this.genes[i].setMag(maxforce);
			}
		}
	}
}

function Population() {
	this.rockets = [];
	this.popsize = 80;
	this.matePool = [];

	for (var i = 0; i < this.popsize; i++) {
		this.rockets[i] = new Rocket();
	}

	this.evaluate = function() {
		var maxfit = 0;
		var maxtime = 0;
		for (var i = 0; i < this.popsize; i++) {
			this.rockets[i].calcFitness();
			if (this.rockets[i].fitness > maxfit) {
				maxfit = this.rockets[i].fitness;
			}
			if (this.rockets[i].ftime > maxtime) {
				maxtime = this.rockets[i].ftime;
			}
		}

		for (var i  = 0; i < this.popsize; i++) {
			this.rockets[i].fitness /= maxfit;
		}
		createP('maxfit: ' + maxfit);
		createP('record time: ' + maxtime);

		this.matePool = [];
		if (hits > maxscore) {
			maxscore = hits;
		}
		hits = 0;

		for (var i = 0; i < this.popsize; i++) {
			var n = this.rockets[i].fitness * 100;
			for (var j = 0; j < n; j++) {
				this.matePool.push(this.rockets[i]);
			}
		}
	}

	this.selection  = function() {
		var newrockets = [];
		for (i = 0; i < this.rockets.length; i++) {
			var parentA = random(this.matePool).dna;
			var parentB = random(this.matePool).dna;
			var child = parentA.cross(parentB);
			child.mutation();
			newrockets[i] = new Rocket(child);
		}

		this.rockets = newrockets;
	}

	this.run = function() {
		for (var i = 0; i < this.popsize; i++) {
			this.rockets[i].update();
			this.rockets[i].show();
		}
	}
}

function Rocket(dna) {
	this.pos = createVector(width/2, height);
	this.vel = createVector();
	this.acc = createVector();
	this.lvector = createVector();
	this.completed = false;
	this.crashed = false;
	this.ftime = 0;
	if (dna) {
		this.dna = dna;
	} else {
		this.dna = new DNA();
	}
	this.fitness = 0;

	this.calcFitness = function() {
		var d = dist(this.pos.x, this.pos.y, target.x, target.y);
		this.fitness = map(d, 0, height - target.y, 100, 0);
		if (this.completed) {
			this.ftime = f;
			this.fitness *= this.ftime;
		}
		if (this.crashed) {
			this.fitness *= 0.01;
		}
	}

	this.applyForce = function(force) {
		this.acc.add(force);
	}

	this.update = function() {
		var d = dist(this.pos.x, this.pos.y, target.x, target.y);
		if (d <10) {
			this.completed = true;
			this.pos = target.copy();
			hits++;
		}

		if (this.pos.x > rx && this.pos.x < rx + rw && this.pos.y > ry && this.pos.y < ry + rh) {
			this.crashed = true;
		}

		if (this.pos.x > width || this.pos.x < 0) {
			this.crashed = true;
		}

		if (this.pos.y > height +10 || this.pos.y < 0) {
			this.crashed = true;
		}

		this.applyForce(this.dna.genes[count]);

		if (!this.completed && !this.crashed) {
			this.vel.add(this.acc);
			this.pos.add(this.vel);
			this.acc.mult(0);
			this.vel.limit(4);
		}
	}

	this.show  = function() {
		push();
		noStroke();
		translate(this.pos.x, this.pos.y);
		rotate(this.vel.heading());
		rectMode(CENTER);
		rect(0, 0, 25, 5);
		pop();
	}


}

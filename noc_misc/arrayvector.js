var vectors;
var test;
var tempv;
var x;
var y;

function setup() {
	test = createVector(0,4);
	vectors = [createVector(1,6), createVector(2,4), createVector(9,3), createVector(7,3), createVector(0,1), createVector(2,9), createVector(6,0)];

	/*
		for (var i = 0; i < 10; i++) {
			x = floor(random(0,10));
			y = floor(random(0,10));
			tempv = createVector(x,y);
			append(vectors, tempv);
		}
	*/

	console.log(presence());

}
function presence() {

	for (var i = 0; i < vectors.length; i++) {
		if (test.equals(vectors[i])) {
			return true;
		}
	}

	return false;

}

function draw() {

}

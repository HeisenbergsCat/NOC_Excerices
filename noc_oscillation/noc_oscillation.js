
var oscillator;
var oscillators;

function setup() {
	createCanvas(windowWidth,windowHeight);
	background(0);

	oscillator = new angOscillator();
	oscillators = new Array();

	// oscillators setup

	for (var i = 0; i < 64; i++) {
		append(oscillators, new angOscillator());
	}
}

function draw() {
	background(0);
	strokeWeight(1);

	//connect object with lines

	push();
	translate(width/2, height/2);
	for (var i = 0; i < oscillators.length; i++) {
		for (var j = 0; j < oscillators.length; j++) {
			if (i == 5) {
				var firstColor = oscillators[i].colors.copy();
				var secondColor = oscillators[j].colors.copy();
				var strokeColor = firstColor.add(secondColor);
				stroke(strokeColor.x, strokeColor.y, strokeColor.z);
				line(oscillators[i].position.x, oscillators[i].position.y,
						oscillators[j].position.x, oscillators[j].position.y);
			}
		}
	}
	pop();

	//draw oscillators

	for (var i = 0; i < oscillators.length; i++) {
		oscillators[i].oscillate();
		oscillators[i].render();
	}
}

}

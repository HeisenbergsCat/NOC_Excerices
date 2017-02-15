var m;
var p;

var wind;
var gravity;
var friction;
var airdrag;

var movers;
var watertank;

var mindens;
var maxdens;
var watertanks;

function setup() {
	createCanvas(800,600);
	background(0);
	p = createP();
	movers = new Array();
	watertank = new Liquid(0,250,width/2,250);
	watertank2 = new Liquid(550, 200, 150, 250);
	watertanks = [watertank2, watertank]
	//frameRate(30);

	//FORCES DECLARATION
	wind = createVector(0.01,0);
	gravity = createVector(0,0.2);
	airdrag = 0.02;

	mindens = 0.2;
	maxdens = 2;


	// POPULATING
	for (var i = 0; i < 50; i ++) {
		movers[i] = new Mover(random(3, 10), random(mindens, maxdens), random(0, width - 40), random(0, height - 350));
	}
}

function draw() {
	background(0);
	//p.html(movers[3].floorCheck);
	for (var i = 0; i < watertanks.length; i++) {
		watertanks[i].render();
	}

		for (var i = 0; i < movers.length; i++) {
			for (var j = 0; j < watertanks.length; j++) {
				if (movers[i].waterCheck(watertanks[j])) {
					movers[i].drag = watertanks[j].c;
					movers[i].applyForce(movers[i].bouoyCalc());
				} else {
					movers[i].drag = airdrag;
				}
				var densmap = map(movers[i].density, mindens, maxdens, 100, 255)
				movers[i].render(densmap, densmap, densmap);
				movers[i].update();
				movers[i].checkedges();
			}
		}

}

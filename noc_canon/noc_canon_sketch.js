var ground_height;
var mcanon;
var crosshair;
var gravity;
var bullet;
var drag;
var friction;
var wind;

function calcWind() {
    wind = createVector(0,0);
    return wind;
}

function setup() {
  createCanvas(800,600);
  ground_height = 550;
  noCursor();

  //world properities
  gravity = createVector(0,1);
  drag = 0.01;
  friction = 0.1;

  //canon object setup
  mcanon = new canonBody(100, 5);
  crosshair = new Pointer(10);
  mcanon.position.x = 150
  mcanon.position.y = ground_height - mcanon.height/2 - mcanon.wheelradius;
}


function draw() {
  background(0);

  wind = calcWind();

  //ground setup
  stroke(255);
  line(0, ground_height, width,ground_height);

  //ui
  crosshair.update();
  crosshair.render();

  //canonade!
  mcanon.render();
  mcanon.update();
  mcanon.checkEdges()
}

var fala;
var angle;
var angleB;
var aVel;
var aVelB;
var amplitude;
var amplitudeB;

var points

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);
    frameRate(30);

    stroke(255,255,255);
    noFill();

    angle = 0;
    angleB = 0;
    posx = 0;
    aVel = 0.03;
    aVelB = 0.4;
    amplitude = 150;
    amplitudeB = 10;
    startAngle = 0;
}

function draw() {
  background(0);
  beginShape();
    for (var posx = 0; posx < width; posx += 1) {
      var posy = (amplitude * sin(angle) + (amplitudeB * sin(angleB)) );
      //var posy = map(noise(angle), 0, 1, 0, 200)
      vertex(posx, posy + height/2);
      angle += aVel;
      angleB += aVelB;
      amplitude = map(posx, 0, width, -150, 150);
      amplitudeB = map(posx, 0, width, -10, 10);
    }
    endShape();
    //angle = 0;
    //angleB = 0;




}

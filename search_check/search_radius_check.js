var hero;

function setup() {
  createCanvas(windowWidth,windowHeight);
  background(0);

  //obejct instances setup
  hero = new Wanderer(5);
}

function draw() {
  background(0);

  //updates
  hero.updateMotion();
  hero.checkEdges();
  hero.searchIt();
  hero.render();
  //hero.renderSearchRadius();


}

// classes declarations

function Wanderer(radius) {
  this.position = createVector(width/2, height/2);
  this.velocity = createVector();
  this.acceleration = createVector();

  this.radius = radius;
  this.searchRadius = this.radius * 30;

  //forces calculation

  this.calcRandomForce = function(min, max) {
    var randomForce = createVector(random(min,max), random(min,max));
    return randomForce;
  }

  // basic motion engine

  this.applyForce = function(force) {
    this.acceleration.add(force);
  }

  this.updateMotion = function() {

    this.applyForce(this.calcRandomForce(-0.5,0.5));

    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);

    this.velocity.limit(5);

  }

  // appearencce

  this.render = function() {
    fill(255);
    noStroke();
    ellipseMode(RADIUS);
    ellipse(this.position.x, this.position.y, this.radius);
  }

  this.renderSearchRadius = function() {
    noFill();
    stroke(255,0,0);
    ellipseMode(RADIUS);
    ellipse(this.position.x, this.position.y, this.searchRadius);
  }

  this.checkEdges = function() {
    if (this.position.x > width) {
      this.position.x = 0;
    } else if (this.position.x < 0) {
      this.position.x = width;
    }

    if (this.position.y > height) {
      this.position.y = 0;
    } else if (this.position.y < 0) {
      this.position.y = height;
    }
  }

  // bahavior

  this.searchIt = function() {
    for (var i = 0; i < 512; i++) {
      var randomRadius = random(this.searchRadius - (this.radius + 5));
      var angle = random(PI*2);
      var searchSpot =  createVector(randomRadius * cos(angle), randomRadius * sin(angle));
      //stroke(255,255,0,100);
      //line (this.position.x, this.position.y, this.position.x + randomX, this.position.y + randomY);
      noStroke();
      fill(255,0,0);
      ellipseMode(RADIUS);
      ellipse(this.position.x + searchSpot.x, this.position.y + searchSpot.y, 1);
    }



  }




}

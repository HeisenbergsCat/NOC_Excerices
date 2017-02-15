function Projectile(startx, starty) {

  //motion properities
  this.acceleration = createVector(0,0);
  this.velocity = createVector(0,0);
  this.position = createVector(startx, starty);

  //physical properities
  this.mass = random(1,1.2);
  this.gravity = gravity;
  this.drag = drag;
  this.c = friction;


  this.applyForce = function(force) {
    this.acceleration.add(force)
  }

  this.applyGravity = function(force) {
    var f = p5.Vector.mult(force, this.mass);
    f.mult(this.mass);
    //f.mult(this.density);
    this.acceleration.add(f);
  }

  this.boom = function(force) {
    boomF = new p5.Vector();
    boomF = force.copy();
    this.applyForce(boomF);
  }

  this.update = function() {

    this.applyGravity(gravity);
    this.applyForce(wind);
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);

  }
  this.render = function() {

    stroke(255);
    fill(255);
    ellipse(this.position.x, this.position.y, 3);

  }

}

function canonBody(canonw, canonh) {
  this.width = canonw;
  this.height = canonh;

  this.position = createVector(0,0);
  this.acceleration = createVector(0,0);
  this.velocity = createVector(0,0);

  this.aAcceleration = 0;
  this.aVelocity = 0;

  this.keyForce = 1; // motor (keyboard)
  this.drag = drag; // drag coefficient
  this.c = friction; // friction coefficient

  this.bullets = new Array();

  //wheels initilization
  this.wheelradius = 10;
  this.lw = new canonWheel(this.position.x, this.position.y, this.wheelradius);
  this.rw = new canonWheel(this.position.x, this.position.y, this.wheelradius);
  //barrel initilization
  this.bar = new canonBarrel(this.position.x, this.position.y)

  this.calcUnit = function() {
    uv = this.velocity.copy();
    uv.normalize();
    uv.mult(-1);
    return uv;
  }

  this.calcFriction = function() {
    var normal = 1;
    var univ = this.calcUnit();
    var mag = this.c * normal;

    univ.mult(mag);

    return univ;
  }

  this.calcDrag = function(medium) {

		var drag = this.calcUnit();
		var speed = this.velocity.mag();
    var dragMag = medium * speed * speed;

		drag.mult(dragMag);

		return drag;
  }

  this.applyForce = function(force) {
    this.acceleration.add(force);
  }

  this.keyControl = function() {
   if(keyCode == LEFT_ARROW) {
     if (keyIsPressed === true) {
       leftF = createVector(-this.keyForce,0);
       this.acceleration.add(leftF);
     }
   } else if (keyCode == RIGHT_ARROW) {
     if (keyIsPressed === true) {
       rightF = createVector(this.keyForce,0);
       this.acceleration.add(rightF);
     }
   }
  }
  this.mouseClicked = function() {
    if (mouseButton = LEFT) {
      this.spawnBullet();
      console.log('click');
    }
  }
  this.mouseControl = function() {
    if (mouseIsPressed) {
      this.mouseClicked()
    }
  }
/* backup
  this.mouseControl = function() {
    if (mouseIsPressed) {
      if (mouseButton = LEFT) {
        this.spawnBullet();
        console.log('click');
      }
    }
  } */

  this.calcWheelRotation = function() {
    var outrot = 0;
    var vel = this.velocity.copy();
    outrot += vel.x * 0.1;
    return outrot;
  }

  this.calcBarRotation = function() {
    var mouseVector = createVector(mouseX, mouseY)
    var direction = this.position.copy();
    var pointer = mouseVector.sub(direction);
    pointer.normalize();

    return pointer.heading();
  }

  this.trajectory = function() {

    var mouseVector = createVector(mouseX, mouseY);
    var mouseCopy = mouseVector.copy();
    var direction = this.position.copy();
    var trajectory = mouseCopy.sub(direction);
    trajectory.normalize();
    return trajectory;

  }

  this.shotForce = function() {

    var shot = this.trajectory();
    var vel = this.velocity.copy();
    shot = shot.copy();

    //shot.mult(vel);
    shot.mult(random(28,32));

    return shot;

  }

  this.spawnBullet = function() { - 1
    append(this.bullets, new Projectile(this.position.x, this.position.y))
    this.bullets[this.bullets.length - 1].boom(this.shotForce());
  }

  this.checkEdges = function() {
    if (this.position.x > width) {
      this.position.x = 0;
    } else if (this.position.x < 0) {
      this.position.x = width;
    }
  }

  this.update = function() {

    //cart update
    this.mouseControl();
    this.keyControl();
    this.applyForce(this.calcFriction());
    this.applyForce(this.calcDrag(this.drag));
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity)
    this.acceleration.mult(0);

    //wheels angle
    this.aAcceleration = this.calcWheelRotation();
    this.aVelocity += this.aAcceleration;
    this.aAcceleration *= 0;

    //wheels update
    this.lw.posx = this.position.x - this.width/2;
    this.lw.posy = this.position.y + this.height/2;
    this.rw.posx = this.position.x + this.width/2;
    this.rw.posy = this.position.y + this.height/2;

    //barrel update
    this.bar.position.x = this.position.x;
    this.bar.position.y = this.position.y;

    this.bar.angle = this.calcBarRotation();

    for (var i = 0; i < this.bullets.length; i++) {

      this.bullets[i].update();
      this.bullets[i].render();

      if (this.bullets[i].position.y > ground_height) {
        this.bullets.splice(i, 1);
      }
    }


  }

  this.render = function() {
    rectMode(CENTER);
    noStroke();
    fill(255,0,0);
    rect(this.position.x, this.position.y, this.width, this.height);

    this.lw.render(this.lw.posx, this.lw.posy, this.wheelradius, this.aVelocity);
    this.rw.render(this.rw.posx, this.rw.posy, this.wheelradius, this.aVelocity);

    this.bar.render();

  }
}

function canonWheel(wheelx, wheely, wheelr) {
  this.posx = wheelx;
  this.posy = wheely;
  this.radius = wheelr;

  this.render = function(renderx, rendery, renderr, rotation) {
    stroke(0,255,0);
    noFill();
    ellipseMode(RADIUS);

    push();
    translate(renderx, rendery);
    rotate(rotation);
    ellipse(0, 0, renderr);
    line(0, 0, 0, 0 + renderr - 1);
    pop();
  }
}

function canonBarrel(barx, bary) {
  this.position = createVector(barx,bary);
  this.angle = 0;

  this.render = function() {
    fill(255,255,0)
    noStroke();
    push();
    rectMode(CORNER);
    translate(this.position.x, this.position.y);
    rotate(this.angle);
    rect(0,0, 30, 5);
    pop();
  }
}

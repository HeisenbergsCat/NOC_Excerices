function Particle(l) {
    this.position = l.copy();
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(0, 0);
    this.color = createVector(255, 255, 0)

    this.radius = random(2, 4);
    this.lifespan = 150;

    this.check = true;

    this.isDead = function() {
        if (this.lifespan <= 0) {
            return true;
        } else {
            return false;
        }
    }

    this.applyForce = function(force) {
        this.acceleration.add(force);
    }

    this.pushForce = function(force) {
        if (this.check) {
            this.acceleration.add(force);
            this.check = false;
        }
    }

    this.update = function() {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
        this.lifespan -= 2;

    }

    this.forces = function() {
        var pforce = createVector(random(-3, 3), 0);
        this.pushForce(pforce);
        this.applyForce(gravity);
    }

    this.render = function() {
        noStroke();
        ellipseMode(RADIUS);
        fill(this.lifespan);
        ellipse(this.position.x, this.position.y, 10);
        //stroke(255,128);
        //rectMode(RADIUS);
        //var levels = 12;
        /*for (var i = 0; i < levels; i++) {
          //fill(this.color.x, this.color.y, this.color.z, alphamap);
          noFill();
          rect(this.position.x, this.position.y, (i*i)/this.radius, (i*i)/this.radius);
          this.color.y = map(i, 0, levels, 255, 0);
          var alphamap = map(i, 0, levels, 255/levels, 0) */

    }

    this.run = function() {
        this.update();
        this.render();
        this.forces();
    }
}
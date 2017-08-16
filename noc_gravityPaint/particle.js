function Particle(massmin, massmax) {
    this.position = createVector(random(0, width), random(0, height));
    this.velocity = p5.Vector.random2D();
    this.velocity.mult(2);
    this.accel = createVector();
    this.mass = random(massmin, massmax);

    //make color of particle mass dependent
    this.color = createVector();
    this.color.y = map(this.mass, 0.4, 4, 0, 255)
    this.color.x = map(this.mass, 0.4, 4, 255, 0)
    this.color.z = 0;

    if (this.mass < 1.5) {
        this.color = createVector(128, 128, 255);
    }
    this.color.setMag(255);

    //make velocity mass dependent
    this.velocity.div(this.mass);

    this.render = function() {
        stroke(this.color.x, this.color.y, this.color.z);
        point(this.position.x, this.position.y);
    }

    this.renderB = function() {
        //blendMode(ADD);
        noStroke();
        fill(this.color.x, this.color.y, this.color.z, 255);
        ellipse(this.position.x, this.position.y, map(this.mass, 0.4, 4, 0.8, 2.2));
    }

    this.update = function() {

        //adds the attraction force of all the attractors in the world;
        var sumattract = createVector();
        var sumparticles = createVector();

        for (k = 0; k < attractors.length; k++) {
            var a = attractors[k];
            sumattract.add(this.attraction(a, particles));
        }

        this.checkedges(particles);
        this.applyForce(sumparticles);
        this.applyForce(sumattract);
        this.velocity.add(this.accel);
        this.position.add(this.velocity);
        this.accel.mult(0);

        //this.velocity.limit(500);

    }

    this.applyForce = function(force) {
        this.accel.add(force);
    }

    this.attraction = function(target, particle_array) {
        var force = p5.Vector.sub(target.position, this.position);
        var dsquared = force.magSq();
        force.normalize();
        force.mult((g * this.mass * target.mass) / dsquared);

        if (sqrt(dsquared) < 20) {
            target.mass += this.mass * 0.01;
            particle_array.splice(particle_array.indexOf(this), 1)
        }
        return force;

    }

    //deletes a particle from array after it travels some distance of the screen
    this.checkedges = function(target) {
        if (this.position.x > width + 500) {
            target.splice(target.indexOf(this), 1)
        } else if (this.position.x < -500) {
            target.splice(target.indexOf(this), 1)
        }
        if (this.position.y > height + 500) {
            target.splice(target.indexOf(this), 1)
        }
        if (this.position.y < -500) {
            target.splice(target.indexOf(this), 1)
        }
    }

    this.run = function() {
        this.update();
        this.renderB();
    }
} //end of Particle
function ParticleSystem(posx, posy) {
    this.particles = new Array();
    this.emmiterPos = createVector(posx, posy);

    this.run = function() {
        for (var i = 0; i < 1; i++) {
            this.particles.push(new Particle(this.emmiterPos));
        }
        for (var i = this.particles.length - 1; i >= 0; i--) {
            var p = this.particles[i];
            p.run();
            if (p.isDead()) {
                this.particles.splice(i, 1);
            }
        }
    }


}
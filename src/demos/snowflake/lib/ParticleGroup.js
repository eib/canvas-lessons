var particleFactory = require('./particleFactory');

function ParticleGroup(numParticles, screen) {
    this.particles = particleFactory(numParticles, screen);
    this.angle = 0;
}

ParticleGroup.prototype.particleColor = 'rgba(255, 255, 255, 0.8)';
ParticleGroup.prototype.radiansPerMs = 0.0007;

ParticleGroup.prototype.draw = function (ctx, screen) {
    ctx.fillStyle = this.particleColor;
    ctx.beginPath();
    this.particles.forEach(function (particle) {
        particle.addPath(ctx);
    });
    ctx.fill();
};

ParticleGroup.prototype.update = function (screen, millisDelta) {
    var ii,
        particle,
        isBlowingRight;
    this.angle += this.radiansPerMs * millisDelta;
    isExitingFromRight = Math.sin(this.angle) > 0;
    for (ii = 0; ii < this.particles.length; ii++) {
        particle = this.particles[ii];
        particle.move(this.angle);
        if (!screen.containsParticle(particle)) {
            this.resetParticle(particle, ii, isBlowingRight, screen);
        }
    }
};

ParticleGroup.prototype.reposition = function (particle) {
    particle.y += Math.cos(this.angle + particle.density) + 1 + particle.radius / 2;
    particle.x += Math.sin(this.angle) * 2;
};

ParticleGroup.prototype.resetParticle = function (particle, index, isBlowingRight, screen) {
    var resetToTop = index % 3 > 0,
        isExitingFromRight;
    if (resetToTop) {
        particle.x = Math.random() * screen.width;
        particle.y = -10;
    } else {
        if (isBlowingRight) { //then enter from left
            particle.x = -5;
            particle.y = Math.random() * screen.height;
        } else {
            particle.x = screen.width + 5;
            particle.y = Math.random() * screen.height;
        }
    }
}

module.exports = ParticleGroup;
var particleFactory = require('./particleFactory');

function ParticleGroup(screen, numParticles) {
    this.numParticles = numParticles || this.defaults.numParticles;
    this.particles = particleFactory(this.numParticles, screen);
    this.angle = 0;
    this.particleColor = this.defaults.particleColor;
    this.radiansPerMs = this.defaults.radiansPerMs;
    this.percentToResetFromTop = this.defaults.percentToResetFromTop;
}

ParticleGroup.prototype.defaults = {
    numParticles: 100,
    particleColor: 'rgba(255, 255, 255, 0.8)',
    radiansPerMs: 0.0004,
    percentToResetFromTop: 66,
};

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
    isBlowingRight = Math.sin(this.angle) > 0;
    for (ii = 0; ii < this.particles.length; ii++) {
        particle = this.particles[ii];
        particle.move(this.angle);
        if (!screen.containsParticle(particle)) {
            this.resetParticle(particle, ii, isBlowingRight, screen);
        }
    }
};

ParticleGroup.prototype.shouldResetFromTop = function (particle, index) {
    //This would actually be perfectly correct if it was a function of screen dimensions and angle
    return Math.random() <= this.percentToResetFromTop / 100;
};

ParticleGroup.prototype.reposition = function (particle) {
    particle.y += Math.cos(this.angle + particle.density) + 1 + particle.radius / 2;
    particle.x += Math.sin(this.angle) * 2;
};

ParticleGroup.prototype.resetParticle = function (particle, index, isBlowingRight, screen) {
    var resetToTop = this.shouldResetFromTop(particle, index),
        isExitingFromRight;
    if (resetToTop) {
        particle.x = Math.random() * screen.width;
        particle.y = -screen.particleOutset * 2;
    } else {
        if (isBlowingRight) { //then enter from left
            particle.x = -screen.particleOutset;
            particle.y = Math.random() * screen.height;
        } else {
            particle.x = screen.width + screen.particleOutset;
            particle.y = Math.random() * screen.height;
        }
    }
};

module.exports = ParticleGroup;
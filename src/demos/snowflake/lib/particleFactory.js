var Particle = require('./Particle');

module.exports = function particleFactory(numParticles, screen) {
    var particles = [],
        ii;
    for (ii = 0; ii < numParticles; ii++) {
        particles.push(new Particle(screen, numParticles));
    }
    return particles;
};
function Particle(screen, numParticles) {
    this.x = Math.random() * screen.width;
    this.y = Math.random() * screen.height;
    this.radius = Math.random() * 4 + 1;
    this.density = Math.random() * numParticles;
}

Particle.prototype.addPath = function (ctx) {
    ctx.moveTo(this.x, this.y);
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
};

//We will add 1 to the cos function to prevent negative values which will lead flakes to move upwards
Particle.prototype.move = function (angleOfMovement) {
    this.x += Math.sin(angleOfMovement) * 2;
    this.y += Math.cos(angleOfMovement + this.density) + 1 + this.radius / 2;
};

module.exports = Particle;
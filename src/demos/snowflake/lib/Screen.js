function Screen(width, height) {
    this.width = width;
    this.height = height;
    this.particleOutset = this.defaults.particleOutset;
    this.backgroundColor = this.defaults.backgroundColor;
}

Screen.prototype.defaults = {
    particleOutset: 5,
    backgroundColor: '#000000',
};

Screen.prototype.clear = function (ctx) {
    ctx.fillStyle = this.backgroundColor;
    ctx.fillRect(0, 0, this.width, this.height);
};

Screen.prototype.containsParticle = function (particle) {
    return (-this.particleOutset * 2 <= particle.x) &&
            (particle.x <= this.width + this.particleOutset * 2) &&
            (particle.y <= this.height);
};

module.exports = Screen;
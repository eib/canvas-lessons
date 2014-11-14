function Screen(width, height) {
    this.width = width;
    this.height = height;
}

Screen.prototype.backgroundColor = '#000000';

Screen.prototype.clear = function (ctx) {
    ctx.fillStyle = this.backgroundColor;
    ctx.fillRect(0, 0, this.width, this.height);
};

Screen.prototype.containsParticle = function (particle) {
    return -5 <= particle.x &&
            particle.x <= this.width + 5 &&
            particle.y <= this.height;
};

module.exports = Screen;
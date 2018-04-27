var Screen = require('./Screen'),
    SnowflakeFactory = require('./snowflakeFactory'),
    Screen = require('./Screen'),
    ParticleGroup = require('./ParticleGroup');

function Scene() {
    this.screen = new Screen(window.innerWidth, window.innerHeight);
    window.addEventListener('resize', this.updateScreen.bind(this), false);
    window.addEventListener('orientationchange', this.updateScreen.bind(this), false);

//    window.setInterval(resetSnowflakes, 15000);
    this.resetParticles();
    this.resetSnowflakes();
}

Scene.prototype.draw = function (ctx, millisElapsed, millisDelta) {
    this.screen.clear(ctx);
    this.particles.draw(ctx, this.screen);
    this.drawSnowflakes(ctx, millisElapsed);
    this.particles.update(this.screen, millisDelta);
};

Scene.prototype.drawSnowflakes = function (ctx, millisElapsed) {
    ctx.save();
    ctx.translate(canvasEl.width/2, canvasEl.height/2);
    this.snowflakes.forEach(function (snowflake) {
        snowflake.draw(ctx, millisElapsed);
    });
    ctx.restore();
};

Scene.prototype.resetParticles = function () {
    var oldAngle = this.particles && this.particles.angle || 0;
    this.particles = new ParticleGroup(this.screen);
    this.particles.angle = oldAngle;
    console.log(oldAngle, this.particles.angle);
};

Scene.prototype.resetSnowflakes = function () {
    this.snowflakes = new SnowflakeFactory().createSnowflakes();
};

Scene.prototype.updateScreen = function () {
    this.screen.width = window.innerWidth;
    this.screen.height = window.innerHeight;
};

module.exports = Scene;
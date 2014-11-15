var config = require('./lib/config'),
    autoResize = require('./lib/autoResize'),
    Animator = require('../lib/Animator'),
    SnowflakeFactory = require('./lib/snowflakeFactory'),
    Screen = require('./lib/Screen'),
    ParticleGroup = require('./lib/ParticleGroup'),
    screen,
    snowflakes = [],
    particles;

function documentReady() {
    var canvasEl = document.getElementById('canvasEl'),
        animator = new Animator(canvasEl, animate);
    resetScreen();
    resetParticles();
    resetSnowflakes();
    animator.start();
}

function animate(ctx, millisElapsed, millisDelta) {
    screen.clear(ctx);
    particles.draw(ctx, screen);
    drawSnowflakes(ctx, millisElapsed);
    particles.update(screen, millisDelta);
}

function drawSnowflakes(ctx, millisElapsed) {
    ctx.save();
    ctx.translate(canvasEl.width/2, canvasEl.height/2);
    snowflakes.forEach(function(snowflake) {
        snowflake.draw(ctx, millisElapsed);
    });
    ctx.restore();
}

function resetScreen() {
    screen = new Screen(window.innerWidth, window.innerHeight);
}

function resetParticles() {
    particles = new ParticleGroup(screen);
}

function resetSnowflakes() {
    snowflakes = new SnowflakeFactory().createSnowflakes();
}

window.setInterval(resetSnowflakes, 15000);
window.addEventListener('resize', resetScreen, false);
window.addEventListener('orientationchange', resetScreen, false);

autoResize();
documentReady();
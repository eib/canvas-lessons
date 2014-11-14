var Animator = require('../lib/Animator'),
    snowflakeFactory = require('./snowflakeFactory'),
    snowflakes = [];

function documentReady() {
    var canvasEl = document.getElementById('canvasEl'),
        animator = new Animator(canvasEl, animate);
    resetSnowflakes();
    animator.start();
}

function animate(ctx, millisElapsed) {
    ctx.save();

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);
    ctx.translate(canvasEl.width/2, canvasEl.height/2);

    snowflakes.forEach(function(snowflake) {
        snowflake.draw(ctx, millisElapsed);
    });

    ctx.restore();
}

function resetSnowflakes() {
    snowflakes = snowflakeFactory();
}

window.setInterval(resetSnowflakes, 5000);

documentReady();
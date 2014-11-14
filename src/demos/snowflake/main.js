var Animator = require('../lib/Animator'),
    tau = 2 * Math.PI,
    RADIANS_PER_DEGREES = Math.PI / 360,
    rpms = 10,
    degreesPerMs = rpms * 360 / 60 / 1000,
    image = new Image();

function documentReady() {
    var canvasEl = document.getElementById('canvasEl'),
        animator = new Animator(canvasEl, animate);
    image.src = './snowflake.png';
    animator.start();
}

function animate(ctx, millisElapsed) {
    ctx.save();

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);
    ctx.translate(canvasEl.width/2, canvasEl.height/2);

    drawSnowflake(ctx, millisElapsed);

    ctx.restore();
}

function drawSnowflake(ctx, millisElapsed) {
    var degreesElapsed = (degreesPerMs * millisElapsed),
        radiansElapsed = degreesElapsed * RADIANS_PER_DEGREES;

    ctx.scale(0.1, 0.1);
    ctx.rotate(-radiansElapsed);
    ctx.drawImage(image, -image.width/2, -image.height/2, image.width, image.height);
}

documentReady();

function documentReady() {
    var canvasEl = document.getElementById('canvas');
    canvasEl.style.marginLeft = '-' + (canvasEl.width/2) + 'px';
    canvasEl.style.marginTop = '-' + (canvasEl.height/2) + 'px';

    var animator = new Animator(canvasEl, animate);
    animator.start();
}

function animate(ctx, millisElapsed) {
    var canvasWidth = 600,
        canvasHeight = 600,
        spinnerRadius = 50,
        strokeWidth = 8,
        rpms = 30,
        radiansPerMs = rpms * (2*Math.PI) / 60 / 1000,
        radiansElapsed = radiansPerMs * millisElapsed,
        barWidth = canvasWidth / 8,
        pxPerS = 400,
        pxElapsed = pxPerS / 1000 * millisElapsed,
        barX = (pxElapsed) % canvasWidth;

    ctx.save();
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    ctx.strokeStyle = 'black';
    ctx.fillStyle = 'white';
    ctx.lineWidth = strokeWidth;
    ctx.lineCap = 'round';

    ctx.beginPath();
    ctx.moveTo(barX, 30);
    ctx.lineTo(barX + barWidth, 30);
    ctx.stroke();

    ctx.save();
    ctx.translate(-canvasWidth, 0);
    ctx.beginPath();
    ctx.moveTo(barX, 30);
    ctx.lineTo(barX + barWidth, 30);
    ctx.stroke();
    ctx.restore();

    ctx.save();
    ctx.lineCap = 'round';
    ctx.translate(canvasWidth / 2, canvasHeight / 2);
    ctx.rotate(radiansElapsed);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(spinnerRadius, 0);
    ctx.stroke();
    ctx.restore();

    ctx.restore();
}

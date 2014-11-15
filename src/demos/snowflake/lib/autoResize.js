var resizeCanvas = require('../../lib/resizeCanvas'),
    container = document.getElementById('canvasContainer'),
    canvas = document.getElementById('canvasEl');

function autoResizeCanvas() {
    window.requestAnimationFrame(function () {
        resizeCanvas(container, canvas);
    });
}

window.addEventListener('resize', autoResizeCanvas, false);
window.addEventListener('orientationchange', autoResizeCanvas, false);

module.exports = autoResizeCanvas;
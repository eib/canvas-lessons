var module = module || {};

function resizeCanvas(container, canvas) {
    var newWidth = window.innerWidth;
    var newHeight = window.innerHeight;
    container.style.height = newHeight + 'px';
    container.style.width = newWidth + 'px';

    container.style.marginTop = (-newHeight / 2) + 'px';
    container.style.marginLeft = (-newWidth / 2) + 'px';

    canvas.width = newWidth;
    canvas.height = newHeight;
}

module.exports = resizeCanvas;
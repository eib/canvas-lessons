function resizeCanvas(container, canvas, widthToHeight) {
    var newWidth = window.innerWidth;
    var newHeight = window.innerHeight;
    var newWidthToHeight = newWidth / newHeight;

    if (newWidthToHeight > widthToHeight) {
        newWidth = newHeight * widthToHeight;
        container.style.height = newHeight + 'px';
        container.style.width = newWidth + 'px';
    } else {
        newHeight = newWidth / widthToHeight;
        container.style.width = newWidth + 'px';
        container.style.height = newHeight + 'px';
    }

    container.style.marginTop = (-newHeight / 2) + 'px';
    container.style.marginLeft = (-newWidth / 2) + 'px';

    canvas.width = newWidth;
    canvas.height = newHeight;
}
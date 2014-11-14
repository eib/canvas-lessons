
var canvasDimensions,
    Graph = require('../lib/graph'),
    Animator = require('../lib/Animator'),
    graph,
    graphingFunction = function (x) {
        return x * x * x / 1000;
    },
    durationMs = 15 * 1000,
    animator;

function documentReady() {
    var canvasEl = document.getElementById('canvas');
    canvasDimensions = {
        width: canvasEl.width,
        height: canvasEl.height,
    };
    graph = new Graph(canvasEl.width, canvasEl.height, 10);
    animator = new Animator(canvasEl, animate);
    animator.start();
}

function animate(ctx, millisElapsed) {
    var startX = graph.bounds.minX,
        endX = startX + canvasDimensions.width * millisElapsed / durationMs,
        coords = fillCoords(startX, endX, graphingFunction);
    if (millisElapsed >= durationMs) {
        animator.end();
    }

    reset(ctx);

    ctx.save();
    ctx.translate(canvasDimensions.width / 2, canvasDimensions.height / 2);
    ctx.scale(1, -1);
    drawGraph(graph, ctx);
    drawCoordinates(ctx, coords);
    graph.drawText(ctx, "Y = X^3/1000", [125, 250], 20);
    ctx.restore();
}

function reset(ctx) {
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvasDimensions.width, canvasDimensions.height);

    ctx.strokeStyle = '#000000';
    ctx.fillStyle = '#000000';
    ctx.lineWidth = 1;
    ctx.lineCap = 'butt';
}

function fillCoords(startX, endX, graphingFunction) {
    var coords = [],
        x, y;
    endX = Math.ceil(endX);
    for (x = Math.floor(startX); x <= endX; x++) {
        y = graphingFunction(x);
        coords.push([x, y]);
        //TODO: NaN
    }
    return coords;
}

function drawGraph(graph, ctx) {
    graph.draw(ctx);
}

function drawCoordinates(ctx, coords) {
    ctx.beginPath();
    ctx.moveTo(coords[0][0], coords[0][1]);
    coords.forEach(function (point) {
        ctx.lineTo(point[0], point[1]);
    });
    ctx.stroke();
}

global.documentReady = documentReady;


var Grid = require('../lib/Grid'),
    SingleSelectStrategy = require('../lib/SingleSelectStrategy'),
    GridListener = require('../lib/GridListener'),
    Animator = require('../lib/Animator'),
    grid,
    selectionStrategy;

function documentReady() {
    var canvasEl = document.getElementById('canvas');

    grid = new Grid(canvasEl.width, canvasEl.height, 8, 8);
    selectionStrategy = new SingleSelectStrategy(grid);
    selectionStrategy.highlightColor = 'red';
    new GridListener(grid, selectionStrategy).attach(canvasEl);
    new Animator(canvasEl, animate).start();
}

function animate(ctx, millisElapsed) {
    ctx.strokeStyle = 'black';
    ctx.fillStyle = 'white';
    ctx.lineWidth = 1;
    ctx.lineCap = 'round';

    ctx.save();
    grid.draw(ctx);
    selectionStrategy.draw(ctx);
    ctx.restore();
}

global.documentReady = documentReady;

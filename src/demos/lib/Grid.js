var Cell = require('./Cell');

function Grid(width, height, spacesX, spacesY) {
    this.width = width;
    this.height = height;
    this.spacesX = spacesX;
    this.spacesY = spacesY;
    this.spaceWidth = width / spacesX;
    this.spaceHeight = height / spacesY;
}

Grid.prototype.primaryColor = 'white'; //color of the top-left space
Grid.prototype.alternateColor = 'black';

Grid.prototype.draw = function (ctx) {
    this.drawBackground(ctx);
};

Grid.prototype.drawBackground = function (ctx) {
    var ii, jj, cell, style;
    for (ii = 0; ii < this.spacesX; ii++) {
        for (jj = 0; jj < this.spacesY; jj++) {
            cell = [ii, jj];
            style = Cell.isPrimary(cell) ? this.primaryColor : this.alternateColor;
            this.fillCell(ctx, cell, style);
        }
    }
};
Grid.prototype.fillCell = function (ctx, cell, style) {
    ctx.fillStyle = style;
    ctx.fillRect(cell[0] * this.spaceWidth, cell[1] * this.spaceHeight, this.spaceWidth, this.spaceHeight);
};
Grid.prototype.edgeCell = function (ctx, cell, style, width) {
    ctx.lineWidth = width;
    ctx.strokeStyle = style;
    ctx.strokeRect(cell[0] * this.spaceWidth, cell[1] * this.spaceHeight, this.spaceWidth, this.spaceHeight);
};

Grid.prototype.cellForPoint = function (pointX, pointY) {
    var cellX = Math.floor(pointX / this.spaceWidth),
        cellY = Math.floor(pointY / this.spaceHeight);
    if ((cellX < 0 || this.spacesX <= cellX) ||
            (cellY < 0 || this.spacesY <= cellY)) {
        return null;
    } else {
        return [cellX, cellY];
    }
};

module.exports = Grid;
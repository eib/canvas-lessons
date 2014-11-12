var Cell = require('./Cell');

function SingleSelectStrategy(grid) {
    this.grid = grid;
    this.selectionStartCell = null;
    this.selectedCell = null;
    this.highlightedCell = null;
    this.isDeselect = false;
}

SingleSelectStrategy.prototype.primarySelectionColor = 'green';
SingleSelectStrategy.prototype.alternateSelectionColor = 'green';
SingleSelectStrategy.prototype.highlightColor = 'blue';

SingleSelectStrategy.prototype.onCellHover = function (cell) {
    this.highlightedCell = cell;
};

SingleSelectStrategy.prototype.onCellPressed = function (cell) {
    this.selectedCell = cell;
    this.highlightedCell = null;
};

SingleSelectStrategy.prototype.onCellDrag = function (cell) {
    this.selectedCell = cell;
};

SingleSelectStrategy.prototype.onCellReleased = function (cell) {
};

SingleSelectStrategy.prototype.draw = function (ctx) {
    this.drawSelection(ctx);
    this.drawHighlights(ctx);
};

SingleSelectStrategy.prototype.drawSelection = function (ctx) {
    var cell = this.selectedCell,
        style = Cell.isPrimary(cell) ? this.primarySelectionColor : this.alternateSelectionColor;
    if (cell) {
        this.grid.fillCell(ctx, cell, style);
    }
};

SingleSelectStrategy.prototype.drawHighlights = function (ctx) {
    var cell = this.highlightedCell,
        style = this.highlightColor,
        lineWidth = 3;
    if (cell) {
        this.grid.edgeCell(ctx, cell, style, lineWidth);
    }
};

SingleSelectStrategy.prototype.isHighlighted = function (cell) {
    return Cell.areEqual(cell, this.highlightedCell);
};

SingleSelectStrategy.prototype.isSelected = function (cell) {
    return Cell.areEqual(cell, this.selectedCell);
};

module.exports = SingleSelectStrategy;
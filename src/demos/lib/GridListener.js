function GridListener(grid, strategy) {
    var self = this,
        isMouseDown = false;
    
    this.grid = grid;
    this.onMouseDown = function (evt) {
        var cell = self.cellForEvent(evt);
        strategy.onCellPressed(cell);
        isMouseDown = true;
    };
    this.onMouseUp = function (evt) {
        var cell = self.cellForEvent(evt);
        strategy.onCellReleased(cell);
        isMouseDown = false;
    };
    this.onMouseMove = function (evt) {
        var cell = self.cellForEvent(evt);
        if (isMouseDown) {
            strategy.onCellDrag(cell);
        } else {
            strategy.onCellHover(cell);
        }
    };
}
GridListener.prototype.cellForEvent = function (evt) {
    var bounds = evt.target.getBoundingClientRect(),
        cell = this.grid.cellForPoint(evt.clientX - bounds.left, evt.clientY - bounds.top);
    return cell;
};

GridListener.prototype.attach = function (el) {
    el.addEventListener('mousedown', this.onMouseDown);
    el.addEventListener('mouseup', this.onMouseUp);
    el.addEventListener('mousemove', this.onMouseMove);
};

GridListener.prototype.detach = function (el) {
    el.removeEventListener('mousedown', this.onMouseDown);
    el.removeEventListener('mouseup', this.onMouseUp);
    el.removeEventListener('mousemove', this.onMouseMove);
};

module.exports = GridListener;
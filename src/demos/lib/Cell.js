//function Cell(x, y) {
//    this.x = x;
//    this.y = y;
//    this.isPrimary = (this.x + this.y) % 2 === 0;
//}
//Cell.prototype.toString = function () {
//    return [this.x, this.y].toString();
//};
//Cell.prototype.equals = function (other) {
//    return this.x === other.x && this.y === other.y;
//};

var Cell = {
    isPrimary: function (cell) {
        return cell && ((cell[0] + cell[1]) % 2 === 0);
    },
    areEqual: function (a, b) {
        return a && b && a[0] === b[0] && a[1] === b[1];
    },
};

exports = module.exports = Cell;
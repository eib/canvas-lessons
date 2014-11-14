function Graph(width, height) {
    this.bounds = {
        minY: -width / 2,
        maxY: width / 2,
        minX: -height / 2,
        maxX: height / 2,
    };
}

Graph.prototype.pxPerMajorTick = 50;
Graph.prototype.tickRadius = 5;
Graph.prototype.majorLabelFontSize = 15;
Graph.prototype.minorLabelFontSize = 10;

Graph.prototype.draw = function draw(ctx) {
    this.drawAxes(ctx);
    this.drawMajorTicks(ctx);
    this.drawLabels(ctx);
};

Graph.prototype.drawAxes = function draw(ctx) {
    ctx.beginPath();
    ctx.moveTo(this.bounds.minX, 0);
    ctx.lineTo(this.bounds.maxX, 0);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, this.bounds.minY);
    ctx.lineTo(0, this.bounds.maxY);
    ctx.stroke();
};

Graph.prototype.drawMajorTicks = function (ctx) {
    var xx,
        yy;
    for (xx = this.bounds.minX; xx < this.bounds.maxX; xx += this.pxPerMajorTick) {
        ctx.beginPath();
        ctx.moveTo(xx, -this.tickRadius);
        ctx.lineTo(xx, this.tickRadius);
        if (xx !== 0) {
            this.drawText(ctx, xx, [xx + 5, -3 * this.tickRadius], this.minorLabelFontSize);
        }
        ctx.stroke();
    }
    for (yy = this.bounds.minY; yy < this.bounds.maxY; yy += this.pxPerMajorTick) {
        ctx.beginPath();
        ctx.moveTo(-this.tickRadius, yy);
        ctx.lineTo(this.tickRadius, yy);
        if (yy !== 0) {
            this.drawText(ctx, yy, [2 * this.tickRadius, yy + 3], this.minorLabelFontSize);
        }
        ctx.stroke();
    }
    this.drawText(ctx, "0", [2 * this.tickRadius, -3 * this.tickRadius], this.minorLabelFontSize);
};

Graph.prototype.drawText = function (ctx, text, coords, pts) {
    ctx.save();
    ctx.font = pts + "pt Arial";
    ctx.scale(1, -1);
    ctx.fillText(text, coords[0], -coords[1]);
    ctx.restore();
};

Graph.prototype.drawLabels = function (ctx) {
    this.drawText(ctx, "-X", [this.bounds.minX + 30, 25], this.majorLabelFontSize);
    this.drawText(ctx, "X", [this.bounds.maxX - 30, 25], this.majorLabelFontSize);
    this.drawText(ctx, "-Y", [25, this.bounds.minY + 30], this.majorLabelFontSize);
    this.drawText(ctx, "Y", [25, this.bounds.maxY - 30], this.majorLabelFontSize);
};

module.exports = Graph;
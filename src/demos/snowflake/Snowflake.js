var RADIANS_PER_DEGREES = Math.PI / 360;

function Snowflake(scale, startDegrees, rpms, position) {
    this.scale = scale || 0.1;
    this.startRadians = startDegrees && (startDegrees * RADIANS_PER_DEGREES) || 0;
    this.rpms = rpms || -5;
    this.position = position || [0, 0];
}

Snowflake.prototype.image = new Image();
Snowflake.prototype.image.src = './snowflake.png';

Object.defineProperty(Snowflake.prototype, 'radiansPerMs', {
    enumerable: true,
    get: function () {
       return this.rpms /*rev/m*/
               * 2*Math.PI /*rad/rev*/
               * 1/60 /*m/s*/
               * 1/1000 /*s/ms*/;
    },
});


Snowflake.prototype.getRotation = function (millisElapsed) {
    var radiansElapsed = this.radiansPerMs * millisElapsed;
    return this.startRadians + radiansElapsed;
};

Snowflake.prototype.draw = function (ctx, millisElapsed) {
    var image = this.image;
    ctx.save();
    ctx.translate(this.position[0], this.position[1]);
    ctx.scale(this.scale, this.scale);
    ctx.rotate(this.getRotation(millisElapsed));
    ctx.drawImage(image, -image.width/2, -image.height/2, image.width, image.height);
    ctx.restore();
};

module.exports = Snowflake;
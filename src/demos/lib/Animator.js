function Animator(canvasEl, animateFn) {
    this.canvasEl = canvasEl;
    this.animate = animateFn;

    this.startTime = null;
    this.lastTime = null;
    this.isEnded = false;

    Object.defineProperty(this, 'millisPerFrame', {
        get: function() {
            return 1000 / this.fps;
        },
        enumerable: true,
    });
}

Animator.prototype.fps = 60;

Animator.prototype.start = function () {
    console.log('Starting animator...');
    window.requestAnimationFrame(this.step.bind(this));
};

Animator.prototype.step = function (timestamp) {
    if (!this.startTime) {
        this.startTime = timestamp;
        this.lastTime = timestamp;
    }
    var millisElapsed = timestamp - this.startTime,
        millisDelta = timestamp - this.lastTime,
        ctx = this.canvasEl.getContext('2d');

    this.lastTime = timestamp;
    this.animate(ctx, millisElapsed, millisDelta);
    window.requestAnimationFrame(this.step.bind(this));
};

Animator.prototype.end = function () {
    this.isEnded = true;
    console.log('Stopped animator.');
};

module.exports = Animator;
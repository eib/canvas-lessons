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

Animator.prototype.fps = 30;

Animator.prototype.start = function () {
    console.log('Starting animator...');
    this.lastId = this.tick(this.step.bind(this));
};

Animator.prototype.step = function (timestamp) {
    if (this.isEnded) {
        return;
    }
    if (!this.startTime) {
        this.startTime = timestamp;
        this.lastTime = timestamp;
    }
    var millisElapsed = timestamp - this.startTime,
        millisDelta = timestamp - this.lastTime,
        ctx = this.canvasEl.getContext('2d');

    this.lastTime = timestamp;
    this.animate(ctx, millisElapsed, millisDelta);
    this.tick();
};

Animator.prototype.end = function () {
    this.isEnded = true;
    console.log('Stopped animator.');
};

var animationTick = window.requestAnimationFrame || function (callback) {
    return window.setTimeout(function () {
        callback(Date.now());
    }, this.millisPerFrame);
};
var cancelAnimation = window.cancelAnimationFrame || function (timerId) {
    window.clearTimeout(timerId);
};

Animator.prototype.tick = function () {
    this.lastId = animationTick(this.step.bind(this));
};
Animator.prototype.cancelTick = function () {
    if (this.lastId) {
        cancelAnimation(this.lastId);
        this.lastId = null;
    }
};

module.exports = Animator;
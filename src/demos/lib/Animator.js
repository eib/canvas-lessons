function Animator(canvasEl, animateFn) {
    this.canvasEl = canvasEl;
    this.animate = animateFn;

    this.startTime = null;
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
    this.step();
};

Animator.prototype.step = function (timestamp) {
    if (!this.startTime) {
        this.startTime = timestamp;
    }
    var millisElapsed = timestamp - this.startTime,
        ctx = this.canvasEl.getContext('2d');

    this.animate(ctx, millisElapsed);
    window.requestAnimationFrame(this.step.bind(this));
};

Animator.prototype.end = function () {
    this.isEnded = true;
    console.log('Stopped animator.');
};

module.exports = Animator;
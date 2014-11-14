function Animator(canvasEl, animateFn) {
    this.canvasEl = canvasEl;
    this.animate = animateFn;

    this.beforeAnimate = [];
    this.afterAnimate = [];

    this.timerId = null;
    this.startMillis = -1;

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
    this.lastMillis = this.startMillis = Date.now();
    this.step();
    this.timerId = window.setInterval(this.step.bind(this), this.millisPerFrame);
    return this;
};

Animator.prototype.step = function () {
    var currentTime = Date.now(),
        millisElapsed = currentTime - this.startMillis,
        millisDelta = currentTime - this.lastMillis,
        ctx = this.canvasEl.getContext('2d');

    fireCallbacks(this, this.beforeAnimate);
    this.animate(ctx, millisElapsed, millisDelta);
    fireCallbacks(this, this.afterAnimate);
};

Animator.prototype.end = function () {
    if (this.timerId) {
        window.clearInterval(this.timerId);
        this.timerId = null;
    }
    console.log('Stopped animator.');
};

function fireCallbacks(animator, callbacks) {
    callbacks.forEach(function (callback) {
        callback(animator);
    });
}

var config = require('./lib/config'),
    autoResize = require('./lib/autoResize'),
    Animator = require('../lib/Animator'),
    Scene = require('./lib/scene');

function documentReady() {
    var canvasEl = document.getElementById('canvasEl'),
        scene = new Scene(),
        animator = new Animator(canvasEl, function (ctx, millisElapsed, millisDelta) {
            scene.draw(ctx, millisElapsed, millisDelta);
        }),
        profiles = [];

    config.profiles[0](scene);
    animator.start();

    window.addEventListener('keyup', function (evt) {
        var profileCode = evt.keyCode - 48; //zero key
        if (0 <= profileCode && profileCode < config.profiles.length) {
            config.profiles[profileCode](scene);
        }
    });
}

autoResize();
documentReady();
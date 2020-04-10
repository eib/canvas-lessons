var Animator = require('../../lib/Animator'),
    Screen = require('./Screen'),
    Snowflake = require('./Snowflake'),
    SnowflakeFactory = require('./snowflakeFactory'),
    ParticleGroup = require('./ParticleGroup'),
    imageSrc = require('../snowflake.png');

function updateDimensions(width, height) {
    SnowflakeFactory.prototype.positionRange = {
        x: [-width / 2, width / 2],
        y: [-height / 2, height / 2],
    };
}
//window.addEventListener('resize', updateDimensions, false);
//window.addEventListener('orientationchange', updateDimensions, false);
//updateDimensions();
Snowflake.prototype.image.src = imageSrc;
Screen.prototype.backgroundColor = '#000000';
Animator.prototype.fps = 60;

function noSnowflake(scene) {
    console.log('no snowflake');
    SnowflakeFactory.prototype.defaults.countRange = [0, 0];
    scene.resetSnowflakes();
}
function noParticles(scene) {
    console.log('No particles');
    ParticleGroup.prototype.defaults.numParticles = 0;
    scene.resetParticles();
}
function oneSnowflake(scene) {
    console.log('One snowflake');
    updateDimensions(0, 0);
    SnowflakeFactory.prototype.defaults = {
        countRange: [1, 1],
        scaleRange: [0.6, 0.6],
        degreesRange: [0, 0],
        rpmRange: [3, 3],
    };
    Snowflake.prototype.defaults = {
        scale: 0.1,
        rpms: -5,
        position: [0, 0],
    };
    scene.resetSnowflakes();
}
function moreParticles(scene) {
    console.log('more');
    ParticleGroup.prototype.defaults.numParticles += 50;
    scene.resetParticles();
}
function normalParticles(scene) {
    console.log('normal');
    ParticleGroup.prototype.defaults.numParticles = 150;
    ParticleGroup.prototype.defaults.radiansPerMs = 0.0004;
    scene.resetParticles();
}
function prettySnowflakes(scene) {
    console.log('pretty');
    updateDimensions(window.innerWidth, window.innerHeight);
    SnowflakeFactory.prototype.defaults = {
        countRange: [15, 30],
        scaleRange: [0.1, 0.4],
        degreesRange: [0, 360],
        rpmRange: [2, 8],
    };
    Snowflake.prototype.defaults = {
        scale: 0.1,
        rpms: -5,
        position: [0, 0],
    };
    scene.resetSnowflakes();
}

exports = module.exports = {
    profiles: [
        function (scene) { //0
            noParticles(scene);
            noSnowflake(scene);
        },
        noSnowflake,
        oneSnowflake,
        prettySnowflakes,
        noParticles,
        moreParticles,
    ]
};
var fs = require('fs');
var Animator = require('../../lib/Animator'),
    Screen = require('./Screen'),
    Snowflake = require('./Snowflake'),
    SnowflakeFactory = require('./snowflakeFactory'),
    ParticleGroup = require('./ParticleGroup'),
    data = fs.readFileSync(__dirname + '/../snowflake.png', 'base64');

Animator.prototype.fps = 60;
Snowflake.prototype.image.src = 'data:image/png;base64,' + data;

SnowflakeFactory.prototype.defaults = {
    countRange: [15, 30],
    scaleRange: [0.1, 0.4],
    degreesRange: [0, 360],
    rpmRange: [2, 8],
    positionXRange: [-600, 600],
    positionYRange: [-300, 300],
};

Snowflake.prototype.defaults = {
    scale: 0.1,
    rpms: -5,
    position: [0, 0],
};

Screen.prototype.defaults = {
    particleOutset: 5,
    backgroundColor: '#000000', //'#002233'
};

ParticleGroup.prototype.defaults = {
    numParticles: 100,
    particleColor: 'rgba(255, 255, 255, 0.8)',
    radiansPerMs: 0.0004,
    percentToResetFromTop: 67,
};

module.exports = {};
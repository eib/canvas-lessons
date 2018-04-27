var Snowflake = require('./Snowflake'),
    sortByKey = require('../../lib/sortByKey');

function SnowflakeFactory(options) {
    options = options || this.defaults;
    this.countRange = options.countRange;
    this.scaleRange = options.scaleRange;
    this.degreesRange = options.degreesRange;
    this.rpmRange = options.rpmRange;
}

SnowflakeFactory.prototype.positionRange = {
    x: [-600, 600],
    y: [-300, 300],
};

SnowflakeFactory.prototype.defaults = {
    countRange: [15, 30],
    scaleRange: [0.1, 0.4],
    degreesRange: [0, 360],
    rpmRange: [2, 8],
};

SnowflakeFactory.prototype.createSnowflakes = function () {
    var numSnowflakes = randomValueWithinRange(this.countRange),
        snowflakes = [],
        ii;
    for (ii = 0; ii < numSnowflakes; ii++) {
        snowflakes.push(this.createMakeSnowflake());
    }
    snowflakes = sortByKey(snowflakes, 'scale');
    return snowflakes;
};

SnowflakeFactory.prototype.createMakeSnowflake = function () {
    var scale = randomValueWithinRange(this.scaleRange),
        degrees = randomValueWithinRange(this.degreesRange),
        rpms = randomValueWithinRange(this.rpmRange),
        direction = Math.random() < 0.5 ? 1 : -1,
        positionX = randomValueWithinRange(this.positionRange.x),
        positionY = randomValueWithinRange(this.positionRange.y);
    //TODO: plug the Snowflake.image property in here
    return new Snowflake(scale, degrees, direction * rpms, [positionX, positionY]);
};

function randomValueWithinRange(range) {
    var min = range[0],
        max = range[1];
    return Math.random() * (max - min) + min;
}

module.exports = SnowflakeFactory;
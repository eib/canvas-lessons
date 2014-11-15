var Snowflake = require('./Snowflake'),
    sortByKey = require('../../lib/sortByKey');

function SnowflakeFactory(options) {
    options = options || this.defaults;
    this.countRange = options.countRange;
    this.scaleRange = options.scaleRange;
    this.degreesRange = options.degreesRange;
    this.rpmRange = options.rpmRange;
    this.positionXRange = options.positionXRange;
    this.positionYRange = options.positionYRange;
}

SnowflakeFactory.prototype.defaults = {
    countRange: [15, 30],
    scaleRange: [0.1, 0.4],
    degreesRange: [0, 360],
    rpmRange: [2, 8],
    positionXRange: [-600, 600],
    positionYRange: [-300, 300],
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
        positionX = randomValueWithinRange(this.positionXRange),
        positionY = randomValueWithinRange(this.positionYRange);
    return new Snowflake(scale, degrees, direction * rpms, [positionX, positionY]);
};

//function updateDimensions() {
//    var width = window.innerWidth,
//        height = window.innerHeight,
//        area = width * height;
//    positionXRange = [-width / 2, width / 2];
//    positionYRange = [-height / 2, height / 2];
//    countRange = [8, 15];
//}
//
//window.addEventListener('resize', updateDimensions, false);
//window.addEventListener('orientationchange', updateDimensions, false);
//updateDimensions();

function randomValueWithinRange(range) {
    var min = range[0],
        max = range[1];
    return Math.random() * (max - min) + min;
}

module.exports = SnowflakeFactory;
var Snowflake = require('./Snowflake'),
    sortByKey = require('../lib/sortByKey');

var countRange = [5, 12],
    scaleRange = [0.01, 0.3],
    degreesRange = [0, 360],
    rpmRange = [2, 8],
    positionXRange = [-600, 600], //TODO: look at the window/canvas bounds? (Or transform the canvas)
    positionYRange = [-300, 300];

function randomValueWithinRange(range) {
    var min = range[0],
        max = range[1];
    return Math.random() * (max - min) + min;
}

function makeRandomSnowflake() {
    var scale = randomValueWithinRange(scaleRange),
        degrees = randomValueWithinRange(degreesRange),
        rpms = randomValueWithinRange(rpmRange),
        direction = Math.random() < 0.5 ? 1 : -1,
        positionX = randomValueWithinRange(positionXRange),
        positionY = randomValueWithinRange(positionYRange);
    return new Snowflake(scale, degrees, direction * rpms, [positionX, positionY]);
}
module.exports = function snowflakeFactory() {
    var numSnowflakes = randomValueWithinRange(countRange),
        snowflakes = [],
        ii;
    for (ii = 0; ii < numSnowflakes; ii++) {
        snowflakes.push(makeRandomSnowflake());
    }
    snowflakes = sortByKey(snowflakes, 'scale');
    return snowflakes;
};
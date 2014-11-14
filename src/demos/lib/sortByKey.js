function objectByGroupingWithKey(array, property) {
    var obj = {},
        row,
        ii;
    array.forEach(function (row) {
        var value = row[property],
            group = obj[value] || [];
        group.push(row);
        obj[value] = group;
    });
    return obj;
}

module.exports = function sortByKey(array, property) {
    var rowsByKey = objectByGroupingWithKey(array, property),
        keys = Object.keys(rowsByKey),
        sorted = [];

    keys.sort();
    keys.forEach(function (key) {
        var rows = rowsByKey[key];
        rows.forEach(function (row) {
            sorted.push(row);
        });
    });
    return sorted;
};
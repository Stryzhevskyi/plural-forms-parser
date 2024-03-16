const parse = require('./interpreter');

const cache = new Map();
function resetCache() {
    cache.clear();
}

function fnMemoized(expression) {
    if (!cache[expression]) {
        cache[expression] = parse(expression);
    }

    return cache[expression];
}

module.exports = {
    parse: fnMemoized,
    resetCache,
};

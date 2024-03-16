const parse = require('./reverse-polish-notation/interpreter');
const parseMemo = require('./reverse-polish-notation/interpreter-memoized');

module.exports = {
    parse,
    parseMemoized: parseMemo.parse,
    resetCache: parseMemo.resetCache,
};

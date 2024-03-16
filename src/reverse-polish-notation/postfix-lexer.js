const { DIGITS_REGEXP, SPACES_REGEXP, isNumber } = require('../utils');

module.exports = function tokenize(header) {
    const withPadding = header
        .replace(DIGITS_REGEXP, ' $1 ')
        .replaceAll('n', ' n ')
        .replace(SPACES_REGEXP, ' ')
        .split(')')
        .join(' ) ')
        .split('(')
        .join(' ( ');
    return withPadding
        .split(' ')
        .filter(Boolean)
        .map((token) => (isNumber(token) ? parseInt(token) : token));
};

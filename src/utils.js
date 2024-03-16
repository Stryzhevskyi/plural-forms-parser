const DIGITS_REGEXP = /(\d+)/g;
const SPACES_REGEXP = /(\s+)/g;

const LP = '(';
const RP = ')';
const TERNARY_OPEN_IF = 'ternary-open-if';
const TERNARY_ELSE = 'ternary-else';
const TERNARY_CLOSED_IF = '?:';

/**
 * @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_precedence#table
 */
const operators = {
    '*': { precedence: 12, associativity: 'left' },
    '/': { precedence: 12, associativity: 'left' },
    '%': { precedence: 12, associativity: 'left' },
    '+': { precedence: 11, associativity: 'left' },
    '-': { precedence: 11, associativity: 'left' },
    '>': { precedence: 9, associativity: 'left' },
    '<': { precedence: 9, associativity: 'left' },
    '>=': { precedence: 9, associativity: 'left' },
    '<=': { precedence: 9, associativity: 'left' },
    '==': { precedence: 8, associativity: 'left' },
    '===': { precedence: 8, associativity: 'left' },
    '!=': { precedence: 8, associativity: 'left' },
    '!==': { precedence: 8, associativity: 'left' },
    '&&': { precedence: 4, associativity: 'left' },
    '||': { precedence: 3, associativity: 'left' },
    '?': { precedence: 2, associativity: 'right' },
    ':': { precedence: 1, associativity: 'right' },
    [TERNARY_CLOSED_IF]: { precedence: 2, associativity: 'right' },
};

const operations = {
    '+': function (a, b) {
        return a + b;
    },
    '-': function (a, b) {
        return a - b;
    },
    '*': function (a, b) {
        return a * b;
    },
    '/': function (a, b) {
        return a / b;
    },
    '%': function (a, b) {
        return a % b;
    },
    '&&': function (a, b) {
        return a && b;
    },
    '||': function (a, b) {
        return a || b;
    },
    '==': function (a, b) {
        return a === b;
    },
    '===': function (a, b) {
        return a === b;
    },
    '!=': function (a, b) {
        return a !== b;
    },
    '!==': function (a, b) {
        return a !== b;
    },
    '<': function (a, b) {
        return a < b;
    },
    '>': function (a, b) {
        return a > b;
    },
    '<=': function (a, b) {
        return a <= b;
    },
    '>=': function (a, b) {
        return a >= b;
    },
    [TERNARY_CLOSED_IF](a, b, c) {
        return a ? b : c;
    },
};

function isNumber(token) {
    return (
        (Number.isInteger(token) && !Number.isNaN(token)) ||
        !Number.isNaN(parseInt(token))
    );
}
function isNumberOrN(token) {
    return token === 'n' || isNumber(token);
}

function isOperator(token) {
    return operators.hasOwnProperty(token);
}

function getOperatorPriority(operator) {
    if (isOperator(operator)) {
        return operators[operator].precedence;
    }

    throw new Error(`Unknown operator ${operator}`);
}

function isOperatorLeftToRight(operator) {
    if (isOperator(operator)) {
        return operators[operator].associativity === 'left';
    }

    throw new Error(`Unknown operator ${operator}`);
}

const assert = (predicate) => {
    if (!predicate) {
        throw new Error('Assertion failed due to invalid token');
    }
};

module.exports = {
    operators,
    operations,
    isNumberOrN,
    isNumber,
    isOperator,
    getOperatorPriority,
    isOperatorLeftToRight,
    assert,
    LP,
    RP,
    TERNARY_OPEN_IF,
    TERNARY_ELSE,
    TERNARY_CLOSED_IF,
    DIGITS_REGEXP,
    SPACES_REGEXP,
};

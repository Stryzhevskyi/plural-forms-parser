const DIGITS_REGEXP = /(\d+)/g;
const SPACES_REGEXP = /(\s+)/g;

const LP = '(';
const RP = ')';
const TERNARY_OPEN_IF = 'ternary-open-if';
const TERNARY_ELSE = 'ternary-else';
const TERNARY_CLOSED_IF = '?:';
const L_ASSOCIATIVITY = 'left';
const R_ASSOCIATIVITY = 'right';

/**
 * @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_prec#table
 */
const operators = {
    '*': { prec: 12, assoc: L_ASSOCIATIVITY },
    '/': { prec: 12, assoc: L_ASSOCIATIVITY },
    '%': { prec: 12, assoc: L_ASSOCIATIVITY },
    '+': { prec: 11, assoc: L_ASSOCIATIVITY },
    '-': { prec: 11, assoc: L_ASSOCIATIVITY },
    '>': { prec: 9, assoc: L_ASSOCIATIVITY },
    '<': { prec: 9, assoc: L_ASSOCIATIVITY },
    '>=': { prec: 9, assoc: L_ASSOCIATIVITY },
    '<=': { prec: 9, assoc: L_ASSOCIATIVITY },
    '==': { prec: 8, assoc: L_ASSOCIATIVITY },
    '===': { prec: 8, assoc: L_ASSOCIATIVITY },
    '!=': { prec: 8, assoc: L_ASSOCIATIVITY },
    '!==': { prec: 8, assoc: L_ASSOCIATIVITY },
    '&&': { prec: 4, assoc: L_ASSOCIATIVITY },
    '||': { prec: 3, assoc: L_ASSOCIATIVITY },
    '?': { prec: 2, assoc: R_ASSOCIATIVITY },
    ':': { prec: 1, assoc: R_ASSOCIATIVITY },
    [TERNARY_CLOSED_IF]: { prec: 2, assoc: R_ASSOCIATIVITY },
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
        return operators[operator].prec;
    }

    throw new Error(`Unknown operator ${operator}`);
}

function isOperatorLeftToRight(operator) {
    if (isOperator(operator)) {
        return operators[operator].assoc === L_ASSOCIATIVITY;
    }

    throw new Error(`Unknown operator ${operator}`);
}

module.exports = {
    operators,
    operations,
    isNumberOrN,
    isNumber,
    isOperator,
    getOperatorPriority,
    isOperatorLeftToRight,
    LP,
    RP,
    TERNARY_OPEN_IF,
    TERNARY_ELSE,
    TERNARY_CLOSED_IF,
    DIGITS_REGEXP,
    SPACES_REGEXP,
};

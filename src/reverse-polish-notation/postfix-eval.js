const { operations, isNumber, TERNARY_CLOSED_IF } = require('../utils');

module.exports = function evaluate(postfixExpression) {
    const stack = [];

    postfixExpression.forEach((token) => {
        if (isNumber(token)) {
            stack.push(token);
        } else if (token === TERNARY_CLOSED_IF) {
            const c = stack.pop();
            const b = stack.pop();
            const a = stack.pop();
            const value = operations[token](a, b, c);
            stack.push(value);
        } else if (token in operations) {
            const b = stack.pop();
            const a = stack.pop();
            const value = operations[token](a, b);
            stack.push(value);
        }
    });

    if (stack.length > 1) {
        throw new Error(
            `Invalid postfix expression : ${postfixExpression.join(' ')}`
        );
    }

    return stack[0];
};

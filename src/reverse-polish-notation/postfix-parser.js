const {
    isNumberOrN,
    isOperator,
    getOperatorPriority,
    isOperatorLeftToRight,
    LP,
    RP,
    TERNARY_OPEN_IF,
    TERNARY_CLOSED_IF,
} = require('../utils');

function checkInput(inFixExpression) {
    function count(str) {
        return inFixExpression.filter((el) => el === str).length;
    }
    if (count(LP) !== count(RP)) {
        throw new Error('Number of left end right parenthesis does not equal');
    }
}

/**
 *
 * @param {any[]} expression
 * @see https://en.wikipedia.org/wiki/Shunting-yard_algorithm
 * @see https://stackoverflow.com/a/35609169
 */
function inToPostFix(expression) {
    const stack = [];
    let queue = [];

    checkInput(expression);
    const peek = () => stack[stack.length - 1];

    while (expression.length) {
        const token = expression.shift();
        let _token;

        if (isNumberOrN(token)) {
            queue.push(token);
        } else if (token === LP) {
            stack.push(token);
        } else if (token === RP) {
            while ((_token = stack.pop()) !== LP) {
                queue.push(_token);
            }
        } else if (isOperator(token)) {
            let last = peek();
            while (
                isOperator(last) &&
                ((isOperatorLeftToRight(token) &&
                    getOperatorPriority(token) <= getOperatorPriority(last)) ||
                    (!isOperatorLeftToRight(token) &&
                        getOperatorPriority(token) < getOperatorPriority(last)))
            ) {
                queue.push(stack.pop());
                last = peek();
            }

            /* ternary-start */
            if (token === '?') {
                stack.push(TERNARY_OPEN_IF);
                continue;
            }
            if (token === ':') {
                while (peek() !== TERNARY_OPEN_IF) {
                    stack.pop();
                }
                if (peek() === TERNARY_OPEN_IF) {
                    stack.pop();
                    stack.push(TERNARY_CLOSED_IF);
                }
                continue;
            }
            /* ternary-end */

            stack.push(token);
        }
    }
    if (stack.length) {
        queue = queue.concat(stack.reverse());
    }

    return queue;
}
module.exports = inToPostFix;

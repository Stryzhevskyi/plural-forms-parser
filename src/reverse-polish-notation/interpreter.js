const tokenize = require('./postfix-lexer');
const parse = require('./postfix-parser');
const evaluate = require('./postfix-eval');

function fn(expression) {
    const tokens = tokenize(expression);
    const postfix = parse(tokens);

    return {
        postfix,
        evaluate: (n) =>
            evaluate(postfix.map((token) => (token === 'n' ? n : token))),
    };
}

module.exports = fn;

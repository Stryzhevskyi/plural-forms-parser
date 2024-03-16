const parse = require('./interpreter');

const cache = new Map();

function resetCache() {
    cache.clear();
}

class MemoizedParsedExpression {
    #cache = new Map();
    #expression;
    postfix;

    constructor(expression) {
        this.#expression = parse(expression);
        this.postfix = this.#expression.postfix;
    }

    evaluate(n) {
        if (this.#cache.has(n)) {
            return this.#cache.get(n);
        }

        const value = this.#expression.evaluate(n);
        this.#cache.set(n, value);

        return value;
    }
}

function fnMemoized(expression) {
    if (!cache[expression]) {
        cache[expression] = new MemoizedParsedExpression(expression);
    }

    return cache[expression];
}

module.exports = {
    parse: fnMemoized,
    resetCache,
};

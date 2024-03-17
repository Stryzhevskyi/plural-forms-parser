## plural-forms-parser

This library can parse [Plural Forms](https://www.gnu.org/software/gettext/manual/html_node/Translating-plural-forms.html) header without violation of [unsafe-eval](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src#unsafe_eval_expressions) rule from Content Security Policy.

It is using Shunting yard algorithm instead of `eval()` or `new Function()`.

### Example
```js
const { parse } = require('plural-froms-parser');
const expression = 'n > 1 ? 2 : 3';
const rpnExpression = parse(expression);
//  {
//    postfix: [ 'n', 1, '>', 2, 3, '?:' ],
//    evaluate: [Function: evaluate]
//  }
rpnExpression.evaluate(1) // 2
rpnExpression.evaluate(2) // 3
```

_There is also `parseMemoized` function, which caches results of evaluation._

## References
- [Shunting yard algorithm](https://en.wikipedia.org/wiki/Shunting_yard_algorithm)
- [Extending the shunting-yard algorithm to support the conditional ternary operator](https://stackoverflow.com/a/35609169)
- [Operator precedence in JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_precedence#table)

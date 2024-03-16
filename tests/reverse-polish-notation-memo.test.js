import { expressions, langs } from './input';
import { parseMemoized } from '../src';

describe.each(langs)('langMemo', (lang) => {
    const exp = lang.pluralsText;
    const evalFunction = new Function('n', `return ${exp}`);
    const parsedExpression = parseMemoized(exp);

    describe.each([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])('arg', (n) => {
        test(`${lang.name} ${lang.pluralsText}, [${n}]`, () => {
            expect(lang.pluralsFunc(n)).toEqual(evalFunction(n));
            expect(parsedExpression.evaluate(n)).toEqual(evalFunction(n));
        });
    });
});

describe.each(expressions)('parseMemoized', (expressions) => {
    const parsedExpression = parseMemoized(expressions);
    const evalFn = new Function('n', `return ${expressions}`);

    describe.each([0, 1, 2, 3])('arg', (n) => {
        test(`${expressions}; rpn: ${parsedExpression.postfix.join('  ')}; arg: ${n}`, () => {
            expect(parsedExpression.evaluate(n)).toEqual(evalFn(n));
        });
    });
});

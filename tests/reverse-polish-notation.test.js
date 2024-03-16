import { expressions } from './input';
import parse from '../src/reverse-polish-notation/interpreter';
import { parse as parseMemo } from '../src/reverse-polish-notation/interpreter-memoized';
import plurals from 'node-gettext/lib/plurals';

const langs = Object.values(plurals)
    .filter(({ pluralsText, pluralsFunc, name }) => pluralsFunc && pluralsText)
    .map((lang) => {
        return {
            name: lang.name,
            pluralsText: lang.pluralsText,
            pluralsFunc: lang.pluralsFunc,
        };
    });

describe.each(langs)('lang', (lang) => {
    const exp = lang.pluralsText.match(/plural\s\=\s([^;]+)/)[1];
    const evalFunction = new Function('n', `return ${exp}`);
    const parsedExpression = parse(exp);

    describe.each([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])('arg', (n) => {
        it(`${lang.name} ${lang.pluralsText}, [${n}]`, () => {
            expect(lang.pluralsFunc(n)).toEqual(evalFunction(n));
            expect(parsedExpression.evaluate(n)).toEqual(evalFunction(n));
        });
    });
});

describe.each(expressions)('parser', (expressions) => {
    const parsedExpression = parse(expressions);
    const evalFn = new Function('n', `return ${expressions}`);

    describe.each([0, 1, 2, 3])('arg', (n) => {
        it(`${expressions}; rpn: ${parsedExpression.postfix.join('  ')}; arg: ${n}`, () => {
            expect(parsedExpression.evaluate(n)).toEqual(evalFn(n));
        });
    });
});
describe.each(expressions)('parser', (expressions) => {
    const parsedExpression = parseMemo(expressions);
    const evalFn = new Function('n', `return ${expressions}`);

    describe.each([0, 1, 2, 3])('arg', (n) => {
        it(`${expressions}; rpn: ${parsedExpression.postfix.join('  ')}; arg: ${n}`, () => {
            expect(parsedExpression.evaluate(n)).toEqual(evalFn(n));
        });
    });
});

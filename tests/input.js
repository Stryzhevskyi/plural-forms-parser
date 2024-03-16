import plurals from 'node-gettext/lib/plurals';

export const expressions = [
    'n + 1',
    'n * 2',
    '(n + n) * 3',
    '((n + 2) * (n + 3)) / n',
    'n % 100 > 0',
    'n==0',
    'n ? (1 + 1) : (2 * 3)',
    'n > 1 ? 2 : 3',
    'n==0 ? 1 : n >= 2 ? 3 : 4',
    'n==0 ? 1 : (n >= 2) ? 3 : 4',
    '(n==0) ? 1 : (n >= 2) ? 3 : 4',
    '(n==0) ? 1 : (n >= 2) ? 3 : 4 + 1',
];

export const expressionsForMemo = expressions.slice();

export const langs = Object.values(plurals)
    .filter(({ pluralsText, pluralsFunc, name }) => pluralsFunc && pluralsText)
    .map((lang) => {
        return {
            name: lang.name,
            pluralsText: lang.pluralsText.match(/plural\s\=\s([^;]+)/)[1],
            pluralsFunc: lang.pluralsFunc,
        };
    });

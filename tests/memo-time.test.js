import { langs } from './input';
import { parse, parseMemoized } from '../src';

const LOOPS_COUNT = 10;
const ARGS_MAX = 200;

// empirical performance difference for GitHub CI
const MEMO_TIMES_FASTER = 40;

function run(parseImpl) {
    const start = Date.now();
    for (let i = 0; i < LOOPS_COUNT; i++) {
        for (let n = 0; n < ARGS_MAX; n++) {
            langs.forEach((lang) => {
                const parsedExpression = parseImpl(lang.pluralsText);
                if (lang.pluralsFunc(n) !== parsedExpression.evaluate(n)) {
                    throw new Error(
                        `Results are not the same for ${lang.pluralsText}`
                    );
                }
            });
        }
    }

    return Date.now() - start;
}

describe('time difference', () => {
    test(`memo should be at least ${MEMO_TIMES_FASTER} times faster`, () => {
        const memoTime = run(parseMemoized);
        const regularTime = run(parse);
        console.log({ regularTime, memoTime });
        expect(regularTime / memoTime).toBeGreaterThan(MEMO_TIMES_FASTER);
    });
});

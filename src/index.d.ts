export type TokenTernaryClosedIf = '?:';
export type TokenOperator =
    | '*'
    | '/'
    | '%'
    | '+'
    | '-'
    | '>'
    | '<'
    | '>='
    | '<='
    | '=='
    | '==='
    | '!='
    | '!=='
    | '&&'
    | '||'
    | '?'
    | ':'
    | TokenTernaryClosedIf;
export type TokenVariable = 'n';
export type Token = number | TokenVariable | TokenOperator;

export type Expression<N = number, R = number> = {
    postfix: Token[];
    evaluate: (n: N) => R;
};
export function parse<N = number, R = number>(
    expression: string
): Expression<N, R>;

export function parseMemoized<N = number, R = number>(
    expression: string
): Expression<N, R>;

export const resetCache: () => void;

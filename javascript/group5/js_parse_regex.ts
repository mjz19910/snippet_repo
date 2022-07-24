export type First<T extends string>=T extends `${infer U}${string}`? U:''
export type RemoveFirst<T extends string>=T extends `${string}${infer U}`? U:''
export type AnyOf<T>=T extends `${infer U}${infer X}`? X extends ''? never:U|AnyOf<X>:''
export type Range<T extends object,I>=T extends 0? [0,I]:Range<T,I>
// export type AnyOf<T> = T extends [infer U, infer X] ? X extends '' ? never : U | AnyOf<X> : ''
export type T1=AnyOf<"1234">
const TAG_STATE_IN_FUNCTION=1
const TAG_STATE_VAR_DEFINE=2
const TAG_STATE_LET_DEFINE=3
const TAG_TYPE_WORD=1
const TAG_TYPE_WHITESPACE=2
const TAG_TYPE_SPECIAL=3
const TAG_TYPE_KEYWORD=4
const TAG_BOXED_START=5
const TAG_BOXED_STATES=6
const TAG_BOXED_TOKENS=7
const TAG_BOXED_END=8
const TAG_TYPE_INVALID=9
const TAG_TYPE_ERROR=10
export type TAG_TYPE_WORD=1
export type TAG_TYPE_WHITESPACE=2
export type TAG_TYPE_SPECIAL=3
export type TAG_TYPE_KEYWORD=4
export type TAG_BOXED_START=5
export type TAG_BOXED_STATES=6
export type TAG_BOXED_TOKENS=7
export type TAG_BOXED_END=8
export type TAG_TYPE_INVALID=9
export type TAG_TYPE_ERROR=10
export type TYPE_VALID=TAG_TYPE_WORD|TAG_TYPE_SPECIAL|TAG_TYPE_KEYWORD
export type TokenTypeWord=[TAG_TYPE_WORD,string]
export type TokenTypeWhitespace=[TAG_TYPE_WHITESPACE,AnyOf<" \n\t">]
export type TokenTypeSpecial=[TAG_TYPE_SPECIAL,AnyOf<"(){}|;.=:">]
export type TokenType=TokenTypeWord|TokenTypeWhitespace|TokenTypeSpecial
export type JS_BLOCK_OPEN_CHARS=First<"()">|First<"{}">
export type JS_BLOCK_CLOSE_CHARS=RemoveFirst<"()">|RemoveFirst<"{}">
/**
 * @typedef {typeof TAG_STATE_IN_FUNCTION} StateInFunction
 * @typedef {typeof TAG_STATE_VAR_DEFINE} StateVarDefine
 * @typedef {typeof TAG_STATE_LET_DEFINE} StateLetDefine
 * @typedef {StateInFunction|StateVarDefine} StateType
 * @typedef {[TAG_BOXED_STATES, StateType[]]} BoxedStatesValue
 * @typedef {BoxedStatesValue|BoxedTokensValue} BoxedValue
 * @typedef {[typeof TAG_BOXED_TOKENS, TokenType[]]} BoxedTokensValue
 * @typedef {[typeof TAG_TYPE_SPECIAL, JS_SPECIAL_CHARS]} TokenTypeSpecial
 * @typedef {" "|"\n"|"\t"} WhitespaceType
 * @typedef {[typeof TAG_TYPE_WHITESPACE, WhitespaceType]} TokenTypeWhitespace
 * @typedef {"function"|"var"|"let"} JSKeywordType
 * @typedef {[typeof TAG_TYPE_KEYWORD, JSKeywordType]} TokenTypeKeyword
 * @typedef {[typeof TAG_TYPE_WORD, string]} TokenTypeWord
 * @typedef {[typeof TAG_TYPE_INVALID]} TokenTypeInvalid
 * @typedef {TokenTypeKeyword|TokenTypeWord|TokenTypeWhitespace|TokenTypeSpecial|TokenTypeInvalid|BoxedTokensValue} TokenType
 * @typedef {["function", "var", "let"]} KeywordTypeList */

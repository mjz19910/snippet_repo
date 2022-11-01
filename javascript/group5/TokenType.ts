import {BoxedTokensValue} from "./BoxedTokensValue.js"
import {TokenTypeInvalid} from "./TokenTypeInvalid.js"
import {TokenTypeSpecial} from "./TokenTypeSpecial.js"
import {TokenTypeKeyword} from "./TokenTypeKeyword.js"
import {TokenTypeWhitespace} from "./TokenTypeWhitespace.js"
import {TokenTypeWord} from "./TokenTypeWord.js"

export type TokenType=
	TokenTypeWord|
	TokenTypeWhitespace|
	TokenTypeSpecial|
	TokenTypeKeyword|
	TokenTypeWhitespace|
	TokenTypeSpecial|
	TokenTypeInvalid|
	BoxedTokensValue

import {BoxedTokensValue} from "./BoxedTokensValue"
import {TokenTypeInvalid} from "./TokenTypeInvalid"
import {TokenTypeSpecial} from "./TokenTypeSpecial"
import {TokenTypeKeyword} from "./TokenTypeKeyword"
import {TokenTypeWhitespace} from "./TokenTypeWhitespace"
import {TokenTypeWord} from "./TokenTypeWord"

export type TokenType=
	TokenTypeWord|
	TokenTypeWhitespace|
	TokenTypeSpecial|
	TokenTypeKeyword|
	TokenTypeWhitespace|
	TokenTypeSpecial|
	TokenTypeInvalid|
	BoxedTokensValue

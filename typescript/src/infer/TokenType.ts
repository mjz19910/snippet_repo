import {BoxedTokensValue} from "./BoxedTokensValue.js";
import {TokenTypeInvalid} from "./TokenTypeInvalid.js";
import {TokenTypeKeyword} from "./TokenTypeKeyword.js";
import {TokenTypeSpecial} from "./TokenTypeSpecial.js";
import {TokenTypeWhitespace} from "./TokenTypeWhitespace.js";
import {TokenTypeWord} from "./TokenTypeWord.js";

export type TokenType=
	BoxedTokensValue|
	TokenTypeWord|
	TokenTypeWhitespace|
	TokenTypeSpecial|
	TokenTypeKeyword|
	TokenTypeInvalid|
	never;

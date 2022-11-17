import {HTMLTokenizer} from "./HTMLTokenizer.jstxt/index.js";
import {lexerMarkupDeclarationOpen} from "./onLexerMarkupDeclarationOpen.js";
import {lexerRAWTEXT} from "./onLexerRAWTEXT.js";
import {lexerRCDATA} from "./onLexerRCDATA.js";

/** @param {HTMLTokenizer} state */
export function on_any_html(state) {
	lexerMarkupDeclarationOpen(state);
	lexerRAWTEXT(state);
	lexerRCDATA(state);
}

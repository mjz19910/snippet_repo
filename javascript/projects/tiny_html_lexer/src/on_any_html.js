import {HTMLLexerState} from "./HTMLLexerState.js";
import {lexerMarkupDeclarationOpen} from "./onLexerMarkupDeclarationOpen.js";
import {lexerRAWTEXT} from "./onLexerRAWTEXT.js";
import {lexerRCDATA} from "./onLexerRCDATA.js";

/** @param {HTMLLexerState} state */
export function on_any_html(state) {
	lexerMarkupDeclarationOpen(state);
	lexerRAWTEXT(state);
	lexerRCDATA(state);
}

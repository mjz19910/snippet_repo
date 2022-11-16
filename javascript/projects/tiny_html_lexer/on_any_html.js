import {lexerData} from "./onLexerData.js";
import {lexerMarkupDeclarationOpen} from "./onLexerMarkupDeclarationOpen.js";
import {lexerRAWTEXT} from "./onLexerRAWTEXT.js";
import {lexerRCDATA} from "./onLexerRCDATA.js";

/**
 * @param {import("./HTMLLexerState").HTMLLexerState} state
 */
export function on_any_html(state) {
	lexerData(state);
	lexerMarkupDeclarationOpen(state);
	lexerRAWTEXT(state);
	lexerRCDATA(state);
}

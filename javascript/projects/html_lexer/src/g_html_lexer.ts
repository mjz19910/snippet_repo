import {HTMLLexerAPI} from "./HTMLLexerAPI.js";
import {BaseBox} from "./BaseBox.js";

export const g_html_lexer=new BaseBox<HTMLLexerAPI>(new HTMLLexerAPI);

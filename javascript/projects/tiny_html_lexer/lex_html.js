import {HTMLToken} from "HTMLToken.js";
import {log_parse_error} from "log_parse_error.js";
import {get_char_type} from "src/get_char_type.js";
import {NodeInternalData} from "../page_loader/NodeInternalData.js";
import {PageLoaderState} from "../page_loader/PageLoaderState.js";
import {HTMLDataLex} from "../tiny_html_general_box/HTMLDataLexBox.js";
import {HTMLEntityLex} from "../tiny_html_general_box/HTMLEntityLexBox.js";
import {HTMLSpecialLex} from "../tiny_html_general_box/HTMLSpecialLexBox.js";
import {HTMLTagLex} from "../tiny_html_general_box/HTMLTagLex.js";
import {HTMLLexerResult} from "./HTMLLexerResult";
import {HTMLLexerState} from "./HTMLLexerState.js";
import {js_type_html_lex_arr} from "./js_type_html_lex_arr.js";
import {State} from "./State.js";
import {state_to_string} from "./state_to_string";

export const abc_chars="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

export const num_chars="0123456789";

/**@type {number[]}*/
export const ok_char_int8s=[];

export const h_enc={
	raquo: [187],
	nbsp: [160],
	copy: [169],
	amp: [38],
};

/** @arg {PageLoaderState} state @param {Uint8Array} html */
export function lex_html(state,html) {
	state.lexer_state=new HTMLLexerState(html);
	let lexer=state.lexer_state;
	var document_root=new NodeInternalData('root',0,[],null);
	/**@type {0|1|2}*/
	lexer.lex_mode=0;
	lexer.is_in_tag_attrs=false;
	lexer.is_in_tag_content=true;
	lexer.is_in_script_tag=false;
	/**@type {(ReturnType<typeof js_type_html_lex_arr>)[]} */
	lexer.lex_arr=[];
	// stage 1, handle script and style tags and ending and opening of html
	// tags (also newline and crlf)
	for(lexer.i=0;lexer.i<lexer.html.length;lexer.i++) {
		lexer.cur_lex=lexer.html[lexer.i];
		lexer.cur_char=lexer.dec(lexer.i,1);
		let state=lexer;
		switch(lexer.m_current_state) {
			case State.TagOpen: {
				console.log(state.i,state.cur_char);
				switch(get_char_type(state.cur_char)) {
					case '!':
						console.log(`["${state.cur_char}"] Reconsume in MarkupDeclarationOpen`);
						state.m_current_state=State.MarkupDeclarationOpen;
						break;
					case '/': state.m_current_state=State.EndTagOpen; break;
					case 'ASCII_ALPHA':
						state.create_new_token(HTMLToken.Type.StartTag);
						// Reconsume in
						state.m_current_state=State.TagName;
						break;
					case '?':
						log_parse_error();
						state.create_new_token(HTMLToken.Type.Comment);
						if(!state.m_current_token) throw new Error("Bad");
						state.m_current_token.set_start_position({},state.nth_last_position(2));
						state.reconsume_in(State.BogusComment);
					case 'EOF':
						log_parse_error();
						state.m_queued_tokens.push(HTMLToken.make_character('<'));
						return state.emit_eof();
					default:
						if(state.cur_char===null) throw new Error("Typecheck assert");
						log_parse_error();
						state.emitCharacterAndReconsumeIn('<',State.Data);
				}
			} break;
			default: throw new Error(`State (${state_to_string(lexer.m_current_state)}) not implemented.`);
		}
		console.log(lexer.i,lexer.cur_char);
	}
	// stage 2, collect into tags marked if they open or close
	/**@type {(HTMLSpecialLex|HTMLDataLex|HTMLEntityLex|HTMLTagLex)[]} */
	let elements=[];
	for(let i=0;i<lexer.lex_arr.length;i++) {
		let item=lexer.lex_arr[i];
		switch(item.type) {
			case 'data': elements.push(item); break;
			case 'special':
				throw new Error("Not implemented yet");
		}
	}
	return new HTMLLexerResult(state,function() {
		return elements;
	},document_root);
}

export function use_types() {
	return [
		js_type_html_lex_arr,
	];
}

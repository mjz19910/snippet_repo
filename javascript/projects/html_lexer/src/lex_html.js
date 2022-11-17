import {HTMLDataLexBox} from "../../box_plugin/index.js";
import {HTMLEntityLexBox} from "../../box_plugin/src/HTMLEntityLexBox.js";
import {HTMLSpecialLexBox} from "../../box_plugin/src/HTMLSpecialLexBox.js";
import {HTMLTagLexBox} from "../../box_plugin/src/HTMLTagLexBox.js";
import {NodeInternalData,PageLoaderState} from "../../page_loader/index.js";
import {get_char_type} from "./get_char_type.js";
import {HTMLLexerResult} from "./HTMLLexerResult";
import {HTMLToken} from "./HTMLToken.js";
import {HTMLTokenizer} from "./HTMLTokenizer.js";
import {js_type_html_lex_arr} from "./js_type_html_lex_arr.js";
import {lex_data} from "./lex_data.js";
import {log_parse_error} from "./log_parse_error.js";
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
	state.lexer_state=new HTMLTokenizer(html);
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
		lexer.cur_char=lexer.decode_range(lexer.i,1);
		if(lexer.i > 32) {
			break;
		}
		let state=lexer;
		switch(lexer.m_current_state) {
			case State.MarkupDeclarationOpen: {
				lexer.DONT_CONSUME_NEXT_INPUT_CHARACTER();
                if (consume_next_if_match("--"sv)) {
                    create_new_token(HTMLToken::Type::Comment);
                    m_current_token.set_start_position({}, nth_last_position(3));
                    SWITCH_TO(CommentStart);
                }
                if (consume_next_if_match("DOCTYPE"sv, CaseSensitivity::CaseInsensitive)) {
                    SWITCH_TO(DOCTYPE);
                }
                if (consume_next_if_match("[CDATA["sv)) {
                    // We keep the parser optional so that syntax highlighting can be lexer-only.
                    // The parser registers itself with the lexer it creates.
                    if (m_parser != nullptr && m_parser->adjusted_current_node().namespace_() != Namespace::HTML) {
                        SWITCH_TO(CDATASection);
                    } else {
                        create_new_token(HTMLToken::Type::Comment);
                        m_current_builder.append("[CDATA["sv);
                        SWITCH_TO_WITH_UNCLEAN_BUILDER(BogusComment);
                    }
                }
                ANYTHING_ELSE
                {
                    log_parse_error();
                    create_new_token(HTMLToken::Type::Comment);
                    SWITCH_TO(BogusComment);
                }
			} break;
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
						state.m_current_token.set_start_position("Badge_HTMLTokenizer",state.nth_last_position(2));
						state.reconsume_in(State.BogusComment);
					case 'EOF':
						log_parse_error();
						state.m_queued_tokens.push(HTMLToken.make_character('<'));
						return state.emit_eof();
					default:
						if(state.cur_char===null) throw new Error("Typecheck assert");
						log_parse_error();
						state.emit_character_and_reconsume_in('<',State.Data);
				}
			} break;
			case State.Data: {
				switch(state.cur_char) {
					case '\0': lex_data(state); break;
					case '&':
						state.m_return_state=State.Data;
						state.m_current_state=State.CharacterReference;
						break;
					case '<':
						state.m_current_state=State.TagOpen;
						lex_data(state);
						break;
					case null: state.m_is_eof=true; break;
					default: lex_data(state); break;
				}
			} break;
			default: throw new Error(`State (${state_to_string(lexer.m_current_state)}) not implemented.`);
		}
		console.log(lexer.i,lexer.cur_char);
	}
	// stage 2, collect into tags marked if they open or close
	/**@type {(HTMLDataLexBox|HTMLEntityLexBox|HTMLSpecialLexBox|HTMLTagLexBox)[]} */
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

import {lex_data} from "./lex_data.js";

export class BasicHtmlLexer {
	/** @type {number} */
	lex_mode=0;
	do_html_lex_step() {
		let state=this;
		if(state.lex_mode===0) {
			if(state.html[state.i-1]<128) {
				lex_data(state);
				return;
			}
			if(state.html[state.i-1]<128&&state.m_cur_lex===160) {
				lex_data(state);
				return;
			}
			if(state.lex_arr.at(-3)?.value==="<"&&state.lex_arr.at(-1)?.value===">") {
				let mid=state.lex_arr.at(-2);
				if(!mid)
					throw new Error("Lexer array underflow");
				if(mid.value.trim().startsWith("script")) {
					console.log('enter script tag',mid);
					console.log('TODO: parse',state,'script');
					throw 1;
				}
				if(mid.value.trim().startsWith("style")) {
					console.log('enter style tag',mid);
					console.log('TODO: parse',state,'style');
					throw 1;
				}
			}
		}
		if(state.lex_mode===1) {
			lex_data(state);
			if(state.m_cur_lex!=='"'.charCodeAt(0)) return;
			state.lex_mode=0;
			return;
		}
		if(state.lex_mode===2) {
			lex_data(state);
			if(state.m_cur_lex!=="'".charCodeAt(0)) return;
			state.lex_mode=0;
		}
	}
	/** @param {any} html */
	constructor(html) {
		this.i=0;
		this.html=html;
		this.m_cur_lex=0;
		/** @type {{ value: string; }[]} */
		this.lex_arr=[];
	}
}

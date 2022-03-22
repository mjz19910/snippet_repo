import {lex_html_attributes} from "../tiny_html_lexer/lex_html_attributes.js";
import {HTMLDataLex} from "./HTMLDataLex.js";
export class HTMLTagLex {
	/**@readonly */
	type = "tag";
	m_start_tag;
	/**
	 * @arg {HTMLDataLex} value
	 * @param {string} start_value
	 * @param {string} end_value
	 */
	constructor(start_value, end_value, value) {
		if(start_value === '<') {
			this.m_start_tag??=0;
			this.m_start_tag++;
			this.attrs=lex_html_attributes(value.value);
			let first=this.attrs.shift();
			if(!first)throw new Error("Bad");
			this.value=first.a;
		} else if(start_value === '</') {
			this.m_end_tag = true;
			this.value=value.value;
		} else if(start_value === '<!') {
			this.attrs=lex_html_attributes(value.value);
			let first=this.attrs.shift();
			let doc_type_value=this.attrs.shift();
			if(!first)throw new Error("Bad");
			if(!doc_type_value)throw new Error("Bad");
			if(first.a === 'DOCTYPE') {
				this.m_is_doctype=true;
			}
			this.value = first.a;
			this.attrs=[doc_type_value.a];
		}
		else {
			console.log('unk_start_tag', start_value);
		}
		if(end_value === '>') {
			if(!this.m_end_tag){
				this.m_start_tag??=0;
				this.m_start_tag++;
			} else {
				delete this.m_start_tag;
			}
		} else if(end_value === '/>'){
			this.m_end_tag = true;
			delete this.m_start_tag;
		} else {
			console.log('wrong_tag_end', end_value);
		}
		if(this.m_start_tag === 0){
			delete this.m_start_tag;
		}
	}
}

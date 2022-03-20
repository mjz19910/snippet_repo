import {lex_html_attributes} from "../lex_html_attributes.js";
import {HTMLDataLex} from "./HTMLDataLex.js";
export class HTMLTagLex {
	/**@readonly */
	type = "tag";
	/**
	 * @arg {HTMLDataLex} value
	 * @param {string} start_value
	 * @param {string} end_value
	 */
	constructor(start_value, end_value, value) {
		if(start_value === '<') {
			this.m_start_tag = true;
			this.attrs=lex_html_attributes(value.value);
			let first=this.attrs.shift();
			if(!first)throw new Error("Bad");
			this.value=first.a;
		} else if(start_value === '</') {
			this.m_end_tag = true;
			this.value=value.value;
		}
		if(end_value === '>'){

		} else if(end_value === '/>'){
			this.m_end_tag = true;
		} else {
			console.log('wrong_tag_end', end_value);
		}
	}
}

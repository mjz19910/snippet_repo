import {StringDecoder} from "string_decoder";
import {createContext, Script} from "vm";
import {ctx_exec} from "./ctx_exec.js";
import {del_all_properties} from "./del_all_properties.js";
import {make_rec_revokable_proxy} from "./make_rec_revokable_proxy.js";
import {DelPropertiesState} from "./DelPropertiesState.js";
import {run_script} from "./run_script.js";
export class HTMLLexerState {
	/**
	 * @param {number} off
	 * @param {number} len
	 */
	dec(off, len) {
		return this.text_decoder.end(Buffer.from(this.html.subarray(this.i + off, this.i + off + len)));
	}
	text_decoder = new StringDecoder('ascii');
	constructor() {
		this.ctx = createContext(Object.create(null));
		/**@type {any}*/
		this.ctx_inner = null;
		/**@type {Script|null}*/
		this.script = null;
		run_script(this);
		ctx_exec();
		/**
		 * @type {number}
		 */
		this.cur_lex = -1;
		/**
		 * @type {any[]}
		 */
		this.lex_arr = [];
		/**
		 * @type {number}
		 */
		this.lex_mode = 0;
		this.is_in_tag_attrs = false;
		this.is_in_tag_content = false;
		this.is_in_script_tag = false;
		this.i = 0;
		/**
		 * @type {Uint8Array}
		 */
		this.html = new Uint8Array();
	}
}

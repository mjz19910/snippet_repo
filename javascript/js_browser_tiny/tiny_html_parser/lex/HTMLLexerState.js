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
		console.log(this.ctx, this.ctx_inner);
		let s = new DelPropertiesState;
		this.ctx.del_all_properties = del_all_properties;
		this.ctx.s = s;
		this.ctx.console = console;
		/**
		 * @type {never[]}
		 */
		let r_proxy_list = [];
		this.ctx.obj_api = make_rec_revokable_proxy(r_proxy_list, Object);
		s.ctx_req = [console, s, del_all_properties];
		s.cur = this.ctx_inner;
		ctx_exec(this);
		debugger;
		this.cur_lex = undefined;
		this.lex_arr = undefined;
		this.lex_mode = undefined;
		this.is_in_tag_attrs = undefined;
		this.is_in_tag_content = undefined;
		this.is_in_script_tag = undefined;
		this.i = 0;
		/**
		 * @type {Uint8Array}
		 */
		this.html = new Uint8Array();
		this.lex_inc = undefined;
	}
}

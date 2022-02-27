import {ecma_sections, local_dumper} from "./DebugAPI.user";

export class SimpleJavascriptParser {
	token_generator = null;
	ecma_262_section_12_factory() {
		return ecma_sections;
	}
	ecma_262_section_script_parse_factory() {
		/**
		 * @type {never[]}
		 */
		let generated_class_vec = [];
		return generated_class_vec;
	}
	ecma_262_section_module_parse_factory() {}
	/**
	 * @param {any} utf8_string
	 */
	get_sequence_of_input_elements(utf8_string) {
		local_dumper.m_dump_value(utf8_string);
	}
	ecma_262_pseudo() {
		return {
			ParseText
		};
	}
	create_token_generator() {
		let token_matcher_array = this.ecma_262_section_12_factory();
		class js_root {
			static init() {
				this._init = true;
				/**
				 * @type {any[][]}
				 */
				this.export_list = [];
				for(let i of token_matcher_array)
					i._attach(js_root);
			}
			/**
			 * @param {string} name
			 */
			static import(name) {
				if(this._init === void 0)
					this.init();
				let item = name.split(':');
				let toc = item[0];
				let fn = item[1];
				let mat = this.export_list.find(e => e[1] === toc && e[2].includes(fn));
				let cls = mat[0];
				return cls.prototype[fn];
			}
			/**
			 * @param {any} _class
			 * @param {any} toc_loc
			 * @param {any} name_vec
			 */
			static export(_class, toc_loc, name_vec) {
				if(this._init === void 0)
					this.init();
				this.export_list.push([_class, toc_loc, name_vec]);
			}
			static import_all_items(trg_class) {
				if(this._init === void 0)
					this.init();
				let arr = this.export_list;
				rt: for(let i = 0; i < arr.length; i++) {
					let cur = arr[i];
					let n_arr = cur[2];
					let src_class = cur[0];
					for(let x of n_arr) {
						if(x === 'constructor') {
							continue;
						}
						if(trg_class.prototype[x] === src_class.prototype[x]) {
							continue rt;
						}
						trg_class.prototype[x] = src_class.prototype[x];
					}
				}
			}
			/**
			 * @param {string} toc_loc
			 * @param {{ prototype: { [x: string]: any; }; }} trg_class
			 */
			static import_all(toc_loc, trg_class) {
				if(this._init === void 0)
					this.init();
				let arr = this.export_list.filter(e => e[1] === toc_loc);
				for(let i = 0; i < arr.length; i++) {
					let cur = arr[i];
					for(let x of cur[2]) {
						if(x === 'constructor') {
							continue;
						}
						trg_class.prototype[x] = this.import(toc_loc + ':' + x);
					}
				}
			}
		}
		class js_token_generator {
			static EOF_TOKEN = Symbol();
			/**
			 * @param {undefined} [str]
			 */
			constructor(str) {
				this.str = null;
				this.index = 0;
			}
			/**
			 * @param {any[]} token_value
			 */
			describe_token(token_value) {
				let tok_str = this.str.slice(token_value[2], token_value[2] + token_value[1]);
				let token_type = token_value[0];
				if(token_type === js_token_generator.EOF_TOKEN) {
					token_type = 'EOF';
				}
				return [token_value[0], tok_str];
			}
			/**
			 * @param {any} string
			 */
			set_str(string) {
				this.str = string;
			}
			reset() {
				this.index = 0;
			}
			next_token() {
				let cur;
				let ret;
				if(this.str === null) {
					return [js_token_generator.EOF_TOKEN, 0, 0];
				}
				if(this.index >= this.str.length) {
					return [js_token_generator.EOF_TOKEN, 0, this.index];
				}
				cur = this.InputElementDiv(this.str, this.index);
				if(cur[0] !== null) {
					if(cur[1] === 0) {
						ret = [cur[0], cur[1], this.index];
						return ret;
					}
					ret = [cur[0], cur[1], this.index];
					this.index += cur[1];
					return ret;
				}
			}
			static add_proto() {
				js_root.import_all_items(this);
			}
		}
		js_token_generator.add_proto();
		this.token_generator = new js_token_generator();
	}
}

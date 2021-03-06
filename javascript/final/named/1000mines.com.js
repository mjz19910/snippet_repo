/* spell:words
--- version_list item 2 ---
v1 (spl-f): snippet_repo_v2/javascript/final/1000mines.com.js
*/
function main() {
	var fnlist = [];
	var fnname = [];
	{
		function add_func(name, func) {
			var y = fnlist.push(func);
			if (fnname.indexOf(name) > -1) {
				throw SyntaxError("Name conflict")
			}
			var x = fnname.push(name);
			func.user_run_name = name;
			if (x != y) {
				throw SyntaxError("unbalanced function or name number")
			}
			return x;
		}
		var execute = function(t, pre_exec, post_exec) {
			var r_fnname = fnname[t]
			var func = fnlist[t]
			try {
				var sf = func.toString();
				if (sf.indexOf("/*arg_start*/") > -1) {
					let eval_func;
					{
						var func_split = sf.split(/(\/\*arg_start\*\/|\/\*arg_end\*\/)/)
						var no_head = func_split[4].trim().slice(1).trim().slice(1)
						var body = no_head.slice(0, no_head.length - 2)
						var is_strict
						var is_strict_p1 = body.split('"use strict"')
						is_strict = is_strict_p1.length > 1
						if (is_strict) {
							body = is_strict_p1[1].trim()
						}
						var args = "/*arg_start*/" + func_split[2].trim() + "/*arg_end*/";
						var n;
						let src_url = '//' + '# sourceURL=' + r_fnname;
						let func_str;
						if (is_strict) {
							func_str = `"use strict";\nconsole.log("run ${r_fnname}")\n${body}\n${src_url}`
							eval_func = new Function(args,func_str);
						} else {
							func_str = `console.log("run ${r_fnname}")\n${body}\n${src_url}`
							eval_func = new Function(args,func_str);
						}
						var s = eval_func.length
						if (window.hasOwnProperty('mc')) {
							mc.port2.onmessage = function() {}
							mc.port2.close()
							mc.port1.onmessage = function() {}
							mc.port1.close()
							delete window.mc;
							if (typeof mc != 'undefined') {
								window.mc = undefined
							}
						}
						console.log("fi:", eval_func.name == "anonymous", "len:", eval_func.length);
					}
					if (eval_func) {
						eval_func(func);
					}
					let ret = eval_func()
					if (post_exec)
						post_exec(ret);
					return ret;
				} else {
					if (pre_exec) {
						pre_exec(func);
					}
					let ret = func();
					if (post_exec)
						post_exec(ret);
					return ret;
				}
			} finally {}
			return;
		}
		let stt = eval(`(class {
			static #unused = this.#init();
			static #init(){
				
			}
			static _f(){}
			static _n = "<empty>";
			static n_on = true;
			static f_on = true;
		})`);
		window.CustomInputMatcher = class {
			constructor(t_needle, t_string_getter) {
				this.ts_get = t_string_getter;
				this.tr = t_needle;
			}
			get test_string() {
				return this.ts_get();
			}
			get test_needle() {
				return this.tr;
			}
		}
		var cur = class extends stt {
			static get f() {
				return this._f
			}
			static set f(f) {
				let cur = this._ln;
				this._lf = f;
				if (fnlist.indexOf(this._lf) == -1) {
					add_func(this._ln, this._lf)
				}
				if (cur instanceof CustomInputMatcher) {
					let custom_str = cur.test_string;
					let needle = cur.test_needle;
					if (custom_str.match(needle) == null) {
						this._f = f;
						return;
					}
				}
				if (this.f_on) {
					this.f_on = false
					this._f = f
				}
			}
			static get n() {
				return this._n
			}
			static set n(n) {
				let cur = n;
				if (cur instanceof CustomInputMatcher) {
					let custom_str = cur.test_string;
					let m_needle = cur.test_needle;
					if (m_needle instanceof RegExp) {
						let m_match = custom_str.match(m_needle);
						if (m_match == null) {
							this._ln = n;
							return;
						} else if (this.rx_off === undefined) {
							this.rx_off = true;
							this.rx_lx = n;
						}
					}
					if (typeof m_needle == 'string' && custom_str != m_needle) {
						this._ln = n;
						return;
					}
				}
				this._ln = n;
				if (this.n_on) {
					this.n_on = false
					this._n = n
				}
			}
		}
		let sym = Symbol();
		var cur__class = {
			[sym]: cur
		};
		cur.self_sym = sym;
		cur.funcs = fnlist;
		cur.names = fnname;
	}
	cur.n = '1000mines.com';
	cur.f = function() {
		let return_value;
		debug = debug;
		debug.u = undebug;
		x: {
			let x = debug;
			x.fo = [];
			__fo = x.fo;
			x.st = new Set;
			x.sarr = [];
			x.ne = [];
			{
				let test = function(e) {
					return e[0]
				}
				let test_fail = Symbol(1)
				let test_works = Symbol(2);
				x(test, 'e=[e[1]];0')
				let test_ret = test([test_fail, test_works]);
				if (test_ret === test_fail) {
					console.log('needs new debug function')
					delete debug;
					return null
				}
			}
			function __add_set() {
				for (c of Object.keys(x.o)) {
					let v = x.o[c]
					if (!x.st.has(v)) {
						x.st.add(v);
						x.sarr.push(v);
						x.ne.push(v);
					}
				}
			}
			{
				let a = []
				for (let i = "a".charCodeAt(0); i < "z".charCodeAt(0); i++) {
					a.push(String.fromCharCode(i))
				}
				for (let i = "A".charCodeAt(0); i < "Z".charCodeAt(0); i++) {
					a.push(String.fromCharCode(i))
				}
				a.push('_', '$');
				let b = a.slice();
				for (let i = "0".charCodeAt(0); i < "9".charCodeAt(0); i++) {
					b.push(String.fromCharCode(i))
				}
				x.__ident_start_chars = a;
				x.__ident_chars = b;
			}
			//__ident_start_chars&&__ident_chars
			x.__all_vars = `{
				let __nf=Symbol(1);
				let __get=__e=>{try{return eval(__e)}catch(e){return __nf}};
				{
					let x=debug;
					x.u(x.f);
					x.o={};
					let pl=x.__ident_start_chars;
					for(let i=0;i<pl.length;i++){
						let t=x.o;
						let k=pl[i];
						let v=__get(k);
						if(v!==__nf){t[k]=v}
					}
				}
			};0;`
			x.__getter_names = `{
				let __nf=Symbol(1);
				let __get=__e=>{try{return eval(__e)}catch(e){return __nf}};
				debug.__error_sym=Symbol("Error");
				debug.__result_sym=Symbol("Result");
				debug.__trg_eval=__e=>{
					try{
						return [debug.__result_sym,eval(__e)]
					}catch(e){
						return [debug.__error_sym,e]
					}
				};
				{
					let x=debug;
					x.u(x.f);
					let cb=x.cb;
					if(cb)cb(__get);
					x.gr={};
					let pl=x.__name_list;
					for(let i=0;i<pl.length;i++){
						let t=x.gr;
						let k=pl[i];
						let v=__get("(function(){return "+k+"})");
						if(v!==__nf){t[k]=v}
					}
				}
			};0;`
			x.__get_list = `{
				let __nf=Symbol(1);
				let __get=__e=>{try{return eval(__e)}catch(e){return __nf}};
				{
					let x=debug;x.u(x.f);x.o={};
					for(let i of x.__name_list){
						let t=x.o;
						let v=__get(i);
						if(v!==__nf){t[i]=v}
					}
				}
			};0`
			x.rx = {};
			let w = {};
			x.rx = w;
			{
				let mquery = /.+{.+?new (.+)\.fn.init\(.+,.+\)\}/;
				let jqts = jQuery.toString();
				let res = jqts.match(mquery)
				let grps = res.slice(1);
				x.__name_list = grps;

			}
			let __nf = Symbol(2);
			function __run(fn, bp_str, ...args) {
				x.o = __nf;
				x.u(fn);
				x.f = fn;
				x(fn, bp_str);
				try {
					let ret = fn(...args)
					return [ret, x.o]
				} catch {
					return __nf
				}
			}
			let ret;
			//__name_list
			ret = __run(jQuery, x.__all_vars, "")
			if (ret[1] === __nf) {
				return x.o;
			}
			x.rx.jQuery = ret[1];
			function __run_noisy(fn, bp_str, ...args) {
				x(fn, bp_str);
				try {
					return fn(...args)
				} catch (e) {
					console.log(e);
					return __nf
				}
			}
			//x.f=$('#control')[G.expando].events.mouseup[0].handler
			{
				let game_ctrl = document.querySelector('#control');
				/*G:event expando{typeof T is Y;expando:string}*/
				x.f = game_ctrl[w.jQuery.G.expando].events.mouseup[0].handler;
			}
			__run(x.f, x.__all_vars);
			let __nx_name = null;
			function get_code_formatted(func, dbg=false) {
				let stk = [];
				let cs = [];
				let s_stk = [];
				let ss_sp = '';
				let is_classy = false;
				let func_as_string = null;
				if (typeof func != 'function') {
					console.log('Tried to get formatted code for non-function')
					return null;
				}
				x: {
					/*js_get is_classy*/
					let fd = Object.getOwnPropertyDescriptors(func)
					let fdp = fd.prototype;
					if (fdp.value?.constructor !== func) {
						break x;
					}
					if (fdp.writable) {
						break x;
					}
					func_as_string = func.toString();
					if (func_as_string.slice(0, 5) === 'class')
						is_classy = true;
				}
				func_as_string ??= func.toString();
				let jsfilt = [func.toString()];
				let jsfout = [];
				let js_out;
				let js_parse_no_white = e=>{
					let m = null;
					if (e[0].match(/ /)) {
						m = e.match(/^[ ]+/)
						jsfout.push(m[0])
					}
					if (e[0].match(/\n/)) {
						m = e.match(/^[\n]+/)
						jsfout.push(m[0])
					}
					if (e[0].match(/\t/)) {
						m = e.match(/^[\t]+/)
						jsfout.push(m[0])
					}
					if (m) {
						jsfout.push(e.slice(m[0].length));
					} else {
						jsfout.push(e);
					}
				}
				let js_parse_class = e=>{
					if (e.slice(0, 5) == 'class') {
						jsfout.push('class');
						jsfout.push(e.slice(5));
						return;
					}
					jsfout.push(e);
				}
				function fe_block(func) {
					jsfilt.forEach(func);
					jsfilt = jsfout;
					jsfout = [];
				}
				let js_parse_ident = (js_in,js_tmp)=>{
					let js_out = [];
					let wt = js_in.pop()
					let m;
					if (m = wt.match(/^[a-zA-Z_$]/)) {
						m = wt.match(/^[a-zA-z_$]([0-9a-zA-Z$_]+)?/);
						js_out.push(m[0])
						js_out.push(wt.slice(m[0].length));
					}
					return [js_out, js_in, js_tmp];
				}
				let js_parse_func_def_head = (str)=>{
					let js_out = [];
					if (str[0].match(/\(/) && str[1] == ')') {
						return ['(', ')', str.slice(2)];
					}
					if (str[0] == '(') {
						js_out.push('()'[0])
						let[ret] = js_parse_ident([str.slice(1)], [])
						if (ret[1][0] == ')') {
							return ['(', ret[0], ')', str.slice(2 + ret[0].length)];
						}
						js_out.push(ret[0])
						let cc = ret[0].length + 1 + 1;
						while (ret[1][0] == ',') {
							js_out.push(',');
							[ret] = js_parse_ident([str.slice(cc)], []);
							js_out.push(ret[0]);
							if (ret[1][0] == ')') {
								js_out.push('()'[1]);
								js_out.push(ret[1].slice(1));
								return js_out
							}
							debugger ;
						}
					}
				}
				let js_parse_function = (e)=>{
					let fn = e.slice(0, 8)
					if (fn == 'function') {
						jsfout.push(fn);
						jsfout.push(e.slice(8));
						let wt = jsfout.pop();
						let ret = js_parse_func_def_head(wt)
						jsfout.push(...ret);
						return;
					}
					jsfout.push(e);
				}
				if (is_classy) {
					fe_block(js_parse_class);
				} else {
					fe_block(js_parse_function)
				}
				fe_block(js_parse_no_white);
				let parse_stack = [];
				let loop_max_count = 100;
				let loop_counter = 0;
				let js_parse_loop_whitespace = (js_in,js_tmp)=>{
					let js_out = [];
					let top_item = js_in.pop();
					jsfout = [];
					jsfilt = [top_item];
					do {
						fe_block(js_parse_no_white);
						if (loop_counter++ > loop_max_count) {
							break;
						} else if (jsfilt.length > 1) {
							let nx = jsfilt.pop();
							js_out.push(...jsfilt);
							jsfilt = [nx];
						} else if (jsfilt.length == 1) {
							break;
						}
					} while (true)return [js_out, js_in, js_tmp];
				}
				let js_parse_ident_dot = (js_in,js_tmp)=>{
					let js_out = [];
					let wt = js_in.pop()
					let m;
					if (m = wt.match(/^[a-zA-Z_$]/)) {
						m = wt.match(/^[a-zA-z_$]([0-9a-zA-Z$_]+)?/);
						js_out.push(m[0])
						wt = wt.slice(m[0].length);
					} else {
						js_out.push(wt);
						return [js_out, js_in, js_tmp];
					}
					if (wt[0] == '.') {
						let dc = js_out.pop() + '.';
						let ret = js_parse_ident([wt.slice(1)], []);
						let js_out_tmp = ret[0];
						js_out.push(dc + js_out_tmp[0], js_out_tmp[1]);
					}
					return [js_out, js_in, js_tmp];

				}
				let is_constructor = false;
				function js_parse_eq(e) {
					return e
				}
				let is_class_function = false;
				let js_parse_block_enter = e=>{
					if (e[0].match(/{/)) {
						let js_class_methods = [];
						let js_func_ident, js_func_args;
						jsfout.push(e[0])
						jsfout.push(e.slice(1));
						let ret = js_parse_loop_whitespace(jsfout, jsfilt);
						let js_tmp = jsfilt;
						[js_out,jsfout,jsfilt] = ret;
						jsfout.push(...js_out, ...js_tmp);
						if (is_classy) {
							ret = js_parse_ident(jsfout, jsfilt);
							[js_out,jsfout,jsfilt] = ret;
							js_func_ident = js_out[0];
							jsfout.push(js_out[0], js_out[1]);
							if (js_out[0] === 'constructor') {
								parse_stack.push('frame');
								parse_stack.push(['classy', is_classy, e=>is_classy = e]);
								is_constructor = true;
								is_classy = false;
								let wt = jsfout.pop();
								ret = js_parse_func_def_head(wt);
								wt = ret.pop();
								js_func_args = ret.slice();
								jsfout.push(...ret);
								parse_stack.push([jsfout, jsfilt])
								jsfout = [wt];
								jsfilt = [];
								ret = js_parse_loop_whitespace(jsfout, jsfilt);
								js_tmp = jsfilt;
								[js_out,jsfout,jsfilt] = ret;
								[jsfout,jsfilt] = parse_stack.pop();
								jsfout.push(...js_out, ...js_tmp);
								wt = jsfout.pop();
								parse_stack.push([jsfout, jsfilt])
								jsfout = [];
								jsfilt = [wt];
								fe_block(js_parse_block_enter);
								js_tmp.push(jsfilt.pop());
								js_class_methods.push([js_func_ident, js_func_args, jsfilt.slice()]);
								jsfilt.push(js_tmp.pop());
								js_tmp = jsfilt;
								[jsfout,jsfilt] = parse_stack.pop();
								js_tmp.forEach(e=>jsfout.push(e));
								let p_cur = parse_stack.pop();
								//['classy',is_classy,e=>is_classy=e]
								if (p_cur[0] === 'classy') {
									p_cur[2](p_cur[1]);
								}
								p_cur = parse_stack.pop()
								if (p_cur != 'frame') {
									throw ["Lost frame", parse_stack.slice()]
								}
							}
							parse_stack.push(['loop_counter', loop_counter, loop_max_count])
							loop_counter = 0;
							loop_max_count = 40;
							function call_loop_parse_whitespace() {
								ret = js_parse_loop_whitespace(jsfout, jsfilt);
								js_tmp = jsfilt;
								[js_out,jsfout,jsfilt] = ret;
								jsfout.push(...js_out, ...js_tmp);
							}
							function call_parse_ident() {
								ret = js_parse_ident(jsfout, jsfilt);
								[js_out,jsfout,jsfilt] = ret;
								jsfout.push(js_out[0], js_out[1]);
							}
							while (jsfout[jsfout.length - 1].match(/^[ \t\n]*}/) == null) {
								call_loop_parse_whitespace();
								call_parse_ident();
								let js_func_ident = js_out[0];
								parse_stack.push('frame');
								parse_stack.push(['classy', is_classy, e=>is_classy = e]);
								is_class_function = true;
								is_classy = false;
								let wt = jsfout.pop();
								ret = js_parse_func_def_head(wt);
								let js_func_args = ret.slice(0, -1);
								jsfout.push(...ret);
								call_loop_parse_whitespace();
								wt = jsfout.pop();
								parse_stack.push([jsfout, jsfilt])
								jsfout = [];
								jsfilt = [wt];
								fe_block(js_parse_block_enter);
								js_tmp.push(jsfilt.pop());
								js_class_methods.push([js_func_ident, js_func_args, jsfilt.slice()]);
								jsfilt.push(js_tmp.pop());
								js_tmp = jsfilt;
								[jsfout,jsfilt] = parse_stack.pop();
								js_tmp.forEach(e=>jsfout.push(e));
								let p_cur = parse_stack.pop();
								//['classy',is_classy,e=>is_classy=e]
								if (p_cur[0] === 'classy') {
									p_cur[2](p_cur[1]);
								}
								p_cur = parse_stack.pop()
								if (p_cur != 'frame') {
									throw ["Lost frame", parse_stack.slice()]
								}
								loop_counter++;
								if (loop_counter > loop_max_count) {
									break;
								}
							}
							let first_met = js_class_methods[0];
							let fm_idx = jsfout.indexOf(first_met[0]);
							jsfout = jsfout.slice(0, fm_idx).concat(js_class_methods, jsfout.slice(-1));
							let wt = jsfout.pop();
							parse_stack.push([jsfout, jsfilt]);
							ret = js_parse_loop_whitespace([wt], []);
							js_tmp = jsfilt;
							[js_out,jsfout,jsfilt] = ret;
							[jsfout] = parse_stack.pop();
							jsfout.push(...js_out, ...js_tmp);
						} else {
							let wt = jsfout.join('');
							let block_match_rx = /^((?![{}])(?![/][*])(?:.|[=;\n])+?)?([{}]|[\n]?\/\*)/m;
							function parse_bracket_down(cur_idx, skip_len) {
								let cc = wt[cur_idx], cur, cs;
								cs = wt.slice(cur_idx);
								cur = cs.match(block_match_rx);
								if (cur == null) {
									return [cur_idx, skip_len];
								}
								if (cur[2] == '{') {
									if (cur[1])
										skip_len = cur[1].length;
									cur_idx += cur[0].length;
									cs = wt.slice(cur_idx);
									cur = cs.match(block_match_rx);
									if (cur == null) {
										return [cur_idx, skip_len];
									}
									if (cur[2] == '/*') {
										cur_idx += cur[0].length;
										cs = wt.slice(cur_idx)
										cur = cs.match(/((.|[\n])+?)?\*\//);
										cur_idx += cur[0].length;
										cs = wt.slice(cur_idx);
										cur = cs.match(block_match_rx);
									}
									while (cur[2] == '{') {
										[cur_idx,] = parse_bracket_down(cur_idx + cur[0].length - 1);
										cs = wt.slice(cur_idx);
										if (cs.length == 0) {
											return [cur_idx, skip_len]
										}
										cur = cs.match(block_match_rx);
										if (cur == null) {
											return cur_idx;
										}
									}
									cur_idx = cur_idx + cur[0].length;
									return [cur_idx, skip_len];
								}
							}
							let[len,skip_len] = parse_bracket_down(0);
							let ret = [];
							let got = false;
							if (skip_len) {
								ret.push(wt.slice(0, skip_len));
								ret.push(wt[skip_len]);
								ret.push(wt.slice(skip_len + 1, len - 1))
								ret.push(wt[len - 1]);
							} else {
								ret.push(wt[0], wt.slice(1, len - 1), wt[len - 1]);
							}
							if (wt.length > len) {
								ret.push(wt.slice(len));
							}
							let oci = 0
							  , cc = 0
							  , i = 0
							for (let o_cia = -1; i < jsfout.length; i++) {
								let t_cur = jsfout[i];
								let o_cur = ret[cc];
								if (o_cia < cc && o_cur.length > t_cur.length) {
									oci += t_cur.length;
									o_cia = cc;
								}
								let oc = o_cur.slice(oci, oci + t_cur.length);
								if (oc == t_cur) {
									oci += oc.length;
								} else if (oc == '') {
									cc++;
									got = true;
									break;
								}
							}
							if (got) {
								jsfout.length = i;
								ret = ret.slice(cc);
							} else {
								jsfout.length = 0;
							}
							jsfout.push(...ret);
							return
						}
						return;
					}
					jsfout.push(e);
				}
				fe_block(js_parse_block_enter);
				let maybe = true;
				if (maybe)
					return jsfilt;
				maybe = false;
				let spf = func.toString().split(/([ .,{}()=;\?\:])/).forEach((e,x)=>{
					let ls;
					if (cs.length > 0) {
						ls = cs[cs.length - 1];
					}
					if (e == 'if') {
						cs.push(e);
						ss_sp = 'if';
						return x;
					}
					if (e.match(/\w/)) {
						cs.push(e);
						return;
					}
					function dn(e, bf=false) {
						stk.push(cs)
						let nx = [];
						if (bf) {
							cs.push(e);
							cs.push(nx);
							cs = nx;
							return;
						}
						cs.push(nx)
						cs = nx;
						cs.push(e);
					}
					if (e == '(') {
						let isp = ss_sp;
						s_stk.push(ss_sp);
						ss_sp = '';
						if (isp == 'if') {
							return dn(e);
						}
						if (ls == 'function') {
							cs.push(e);
							ss_sp = 'fn';
							return;
						} else {
							return dn(e);
						}
					}
					if (e == ')') {
						cs.push(e);
						let ix2 = ss_sp;
						let isp = s_stk.pop();
						ss_sp = isp;
						if (ss_sp == 'if') {
							cs = stk.pop();
							ss_sp = 'ifblk';
							return;
						}
						if (ix2 == 'fn') {
							return
						} else {
							cs = stk.pop();
							return;
						}
					}
					if (e == '{') {
						s_stk.push(ss_sp);
						ss_sp = '';
						return dn(e, true);
					}
					if (e == '}') {
						ss_sp = s_stk.pop();
						if (stk.length > 0)
							cs = stk.pop();
					}
					cs.push(e);
				}
				);
				if (maybe)
					return spf;
				let fb = cs.slice(-3, -2)[0];
				function f_down(arr) {
					let stk = [];
					let statement = [stk];
					arr.forEach((e,x,a)=>{
						stk.push(e)
						function dep() {
							stk = [];
							statement.push(stk)
						}
						if (e == ',')
							dep()
						if (e == ';')
							dep()
						if (e == '?') {
							let bg = stk.pop();
							statement.push([bg])
							dep();
						}
						if (e == ':') {
							let bg = stk.pop();
							statement.push([bg])
							dep();
						}
						if (e == '{') {
							let bg = stk.pop();
							statement.push([bg])
							dep();
						}
						if (e == '}') {
							let en = stk.pop()
							let ex = stk.pop();
							let ts = statement.pop();
							if (ex.length > 1) {
								ex = f_down(ex);
							}
							statement.push(ex);
							statement.push([en]);
							statement.push(ts);
						}
					}
					)
					return statement;
				}
				let statement = f_down(fb);
				let res_code = [];
				function __statement() {
					for (let i = 0; i < statement.length; i++) {
						let e = statement[i];
						if (e[0] == 'var') {
							res_code.push(e);
							continue;
						}
						if (e.length == 1) {
							res_code.push(e[0])
							continue;
						}
						if (e[1] !== '.') {
							res_code.push(e);
							continue;
						}
						if (e[e.length - 1] == ',') {
							if (e.slice(-3, -2).length > 0) {
								res_code.push([e.slice(0, -3).join(''), e.slice(-3, -2)[0].join(''), e.slice(-2).join('')]);
								continue;
							}
							res_code.push(e)
							continue;
						} else {
							res_code.push([...e.slice(0, -2), ...e.slice(-2, -1)[0]]);
							continue;
						}
					}
				}
				__statement();
				return [cs, res_code, statement];
			}
			//__nx_names,__for_code=get_code_formatted
			{
				let fc = get_code_formatted;
				__for_code = fc;
				fc.targets = [];
				fc.targets.push(debug.f);
				let ret = fc(debug.f);
				let bs = ret.indexOf('{');
				let be = ret.lastIndexOf('}');
				let bd = ret.slice(bs + 1, be);
				let sc = bd[0].split(',');
				__nx_name = sc[2].split(/[()]/)[0];
			}
			x.f = x.o[__nx_name];
			__run(x.f, x.__all_vars);
			__lst = [];
			__lst.push(x.o);
			x.f = x.o.e;
			let cw = Math.floor(window.innerWidth / 2)
			let ch = Math.floor(window.innerHeight / 2);
			__run_noisy(x.f, x.__all_vars, cw, ch, false);
			x.fo.push([x.f, x.o]);
			__add_set();
			ret = x.o;
			__ret = ret;
			w.I_listener = {
				__f: x.f,
				...ret
			};
			__w = w;
			let dom = document.querySelector('#ctl-home')
			let jq_dom_data = dom[jQuery.expando + '1'];
			//x.__name_list
			x.f = jq_dom_data.events.click[0].handler;
			__run(x.f, x.__all_vars);
			ret = x.o;
			w.game_scope = {
				__f: x.f,
				...ret
			};
			let real_return;
			__m = ret.m;
			x.f = __m.click;
			let o = x.o;
			x.u(x.f);
			x(x.f, x.__all_vars)
			__m.click(0, 0);
			if (o === x.o) {
				real_return = {
					...x.o
				};
				__r_ret = real_return;
				real_return.__f = x.f;
				return real_return;
			}
			x.fo.push([x.f, x.o]);
			__add_set();
			let cmc = __for_code(__m.click);
			//???
			`${cmc}`
			x.f = x.o.u;
			x(x.f, x.__all_vars);
			x.f.call(Object.create(x.f.prototype));
			x.fo.push([x.f, x.o]);
			__add_set();
			__ret = x.o;
			w.obj_field = {
				__f: x.f,
				...__ret
			};
			let ret_val = [...x.st, x.o];
			__res = ret_val;
			let _instance = new cur._class[cur._n];
			__instance = _instance;
			ret = __for_code(__instance.constructor, true);
			console.log(ret);
			return_value=w;
			break x;
		}
		return return_value;
	}
	let n_class = class {
		constructor() {
			this.is_init = false;
			this.__get_m = ()=>null;
			this.created();
		}
		event_fire(noisy) {
			let t = this;
			if (!t.is_init)
				t.init();
			__m = t.__get_m();
			let cur;
			cur = [Object.keys(__m.opened.field).filter(e=>__m.mines.field[e] == false)]
			cur = cur.map(e=>{
				let st, ed, gr = ()=>Math.floor(Math.random() * e.length);
				let ret, mx = Math.floor(e.length / 8), mn = Math.floor(e.length / 16);
				st = gr();
				ed = st + Math.floor(gr() / mn) + 4;
				ret = e.slice(st, ed);
				return ret
			}
			)[0].map(e=>e.split('x'))
			cur = cur.map(e=>[parseInt(e[0]), parseInt(e[1])])
			cur.forEach(e=>{
				if (__m.opened.get(e[0], e[1]) == false) {
					console.log(e);
					return
				}
				;__w.I_listener.I(e[0], e[1])
			}
			);
		}
		init() {
			let t = this;
			let x = debug;
			x.f = __w.game_scope.E;
			x.__name_list = ['m'];
			x.__replace_func ??= {};
			x.__orig_func ??= {};
			x.__orig_func.S = __w.game_scope.S;
			x.__replace_func.S = function() {
				throw "no";
			}
			x.cb = function(__eval) {
				__eval('(function(){S=debug.__replace_func.S})()');
			}
			x(x.f, x.__getter_names);
			try {
				let fn = x.f;
				fn();
			} catch {}
			x.__trg_eval('(function(){S=debug.__orig_func.S})()');
			t.__get_m = x.gr.m;
			t.is_init = true;
		}
		run() {
			let t = this;
			if (!t.is_init)
				t.init();
			__m = this.__get_m();
			function find_closed_gen(f, n, s) {
				let e = 0
				  , q = 0;
				if (n == 'x')
					e = s;
				if (n == 'y')
					q = s;
				f = function(x, y) {
					if (__m.opened.field[x + 'x' + y] == 0) {
						return f(x + e, y + q)
					}
					x -= e;
					y -= q;
					return f.fp(x, y);
				}
				f.fp = function(x, y) {
					if (__m.opened.field[x + 'x' + y] == undefined)
						return null
					return [x, y]
				}
				return f;
			}
			window.find_closed_up_x = find_closed_gen(null, 'x', 1);
			window.find_closed_up_y = find_closed_gen(null, 'y', 1);
			window.find_closed_dn_x = find_closed_gen(null, 'x', -1);
			window.find_closed_dn_y = find_closed_gen(null, 'y', -1);
			return window.find_closed_up_x(0, 0);
		}
		comment_function() {
			/*
				{let __g=[-4,0];
				if(__instance.ret)__g=JSON.parse([...__instance.ret[1].entries()].sort((e,q)=>q[1]-e[1]).map(e=>e[0])[1]);
				__instance.run();
				let log=new Set();
				let cnt_map=new Map();
				let obj_arr=[]
				let ff=function(o,r,f,sq,or,st){
				if(!log.has(JSON.stringify(st))){
				log.add(JSON.stringify(st));
				console.log(st);
				}
				if(r){
				__w.I_listener.I(...r);
				let c=f.fp(...sq);
				if(c){
				__w.I_listener.I(...sq);
				};
				let ovf=function(fn,arg){
				let sa=JSON.stringify(arg);
				if(cnt_map.has(sa)){
				cnt_map.set(sa,cnt_map.get(sa)+1);
				}else{
				cnt_map.set(sa,1);
				}
				return arg;
				}
				if(r[0]>st.x.g)([obj_arr.indexOf(f),'dt',...ovf(f,r)]);
				if(r[0]<st.x.l)([obj_arr.indexOf(f),'dt',...ovf(f,r)]);
				if(r[1]>st.y.g)([obj_arr.indexOf(f),'dt',...ovf(f,r)]);
				if(r[1]<st.y.l)([obj_arr.indexOf(f),'dt',...ovf(f,r)]);
				if(r[0]>o.max_x)o.max_x=r[0];if(r[1]>o.max_y)o.max_y=r[1];
				if(r[0]<o.min_x)o.min_x=r[0];if(r[1]<o.min_y)o.min_y=r[1];
				}
				}
				let f_for=function(func){
				let o={};
				o.max_x=-128,o.max_y=-128,o.min_x=128,o.min_y=128;
				let s_pos=__g,r_x=find_closed_up_x(...s_pos)[0];
				for(let s=find_closed_dn_x(...s_pos)[0],q=s;q<r_x;q++)for(let r=find_closed_up_y(...s_pos)[1],m=find_closed_dn_y(...s_pos)[1],j=m;j<r;j++){
				if(obj_arr.indexOf(func)==-1)obj_arr.push(func);
				ff(o,func(q,j),func,[q,j],function(id,val){
				if(id=='v+'){}
				if(id=='v-'){}
				if(id=='h+'){}
				if(id=='h-'){}
				},{x:{g:r_x,l:s},y:{g:r,l:m}});
				}
				return o;
				}
				let na,str=__g+"\n",co={};
				na='dn_x';co[na]=f_for(window['find_closed_'+na]);str+=`${na}:{x:{${co[na].max_x} to ${co[na].min_x}},y:{${co[na].max_y} to ${co[na].min_y}}}\n`
				na='up_x';co[na]=f_for(window['find_closed_'+na]);str+=`${na}:{x:{${co[na].max_x} to ${co[na].min_x}},y:{${co[na].max_y} to ${co[na].min_y}}}\n`
				na='dn_y';co[na]=f_for(window['find_closed_'+na]);str+=`${na}:{x:{${co[na].max_x} to ${co[na].min_x}},y:{${co[na].max_y} to ${co[na].min_y}}}\n`
				na='up_y';co[na]=f_for(window['find_closed_'+na]);str+=`${na}:{x:{${co[na].max_x} to ${co[na].min_x}},y:{${co[na].max_y} to ${co[na].min_y}}}\n`
				__instance.ret=[str.slice(0,-1),cnt_map];
				__instance.ret[0];
				};
			*/
			void 0;
		}
		created() {
			let t = this;
			let target = document;
			target.onkeydown = function(e) {
				if (e.key == '*') {
					t.event_fire();
				}
				if (e.key == 'r' && e.altKey) {
					if (this !== target) {
						return t.run();
					}
					console.log(t.run());
				}
			}
		}
	}
	cur__class[cur._ln] = n_class;
	do_cur = function(...e) {
		var i;
		if (cur.rx_lx) {
			i = fnname.indexOf(cur.rx_lx);
		} else {
			i = fnname.indexOf(cur.n);
		}
		let px_fn = function(fn) {
			fn.argv = e;
		}
		var _result = execute(i, px_fn);
		return _result;
	}
	let ret;
	if (top !== window) {
		if (window.debugApi == undefined) {
			debugApi = new DebugAPI;
		}
		//console.log('restart on top frame');
		ret = debugApi.asyncExecuteFunction(top, main);
	} else {
		ret = do_cur();
	}
	if (ret instanceof Promise) {
		ret.then(()=>void 0).catch(e=>console.error(e));
	}
	cur.value = ret;
	return {
		...cur,
		_class: cur__class
	};
	//# sourceURL=snippet:///%24_2
}
window.__ret = main();

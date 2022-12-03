/* spell:words
--- version_list item 2 ---
v1 (cur): snippet_repo/javascript/final/1000mines.com.js
*/
function main() {
	/**
	 * @type {any[]}
	 */
	var fnlist=[];
	/**
	 * @type {any[]}
	 */
	var fnname=[];
	/**
	 * @param {any} name
	 * @param {{ user_run_name: any; }} func
	 */
	function add_func(name,func) {
		var y=fnlist.push(func);
		if(fnname.indexOf(name)>-1) {
			throw SyntaxError("Name conflict");
		}
		var x=fnname.push(name);
		func.user_run_name=name;
		if(x!=y) {
			throw SyntaxError("unbalanced function or name number");
		}
		return x;
	}
	function execute(/** @type {number} */ t,/** @type {{ (fn: any): void; (arg0: any): void; }} */ pre_exec,/** @type {((arg0: any) => void) | undefined} */ post_exec) {
		var r_fnname=fnname[t];
		var func=fnlist[t];
		try {
			var sf=func.toString();
			if(sf.indexOf("/*arg_start*/")>-1) {
				let eval_func;
				{
					var func_split=sf.split(/(\/\*arg_start\*\/|\/\*arg_end\*\/)/);
					var no_head=func_split[4].trim().slice(1).trim().slice(1);
					var body=no_head.slice(0,no_head.length-2);
					var is_strict;
					var is_strict_p1=body.split('"use strict"');
					is_strict=is_strict_p1.length>1;
					if(is_strict) {
						body=is_strict_p1[1].trim();
					}
					var args="/*arg_start*/"+func_split[2].trim()+"/*arg_end*/";
					let src_url='//'+'# sourceURL='+r_fnname;
					let func_str;
					if(is_strict) {
						func_str=`"use strict";\nconsole.log("run ${r_fnname}")\n${body}\n${src_url}`;
						eval_func=new Function(args,func_str);
					} else {
						func_str=`console.log("run ${r_fnname}")\n${body}\n${src_url}`;
						eval_func=new Function(args,func_str);
					}
					if('mc' in window&&window.mc instanceof MessageChannel) {
						let mc=window.mc;
						mc.port2.onmessage=function() {};
						mc.port2.close();
						mc.port1.onmessage=function() {};
						mc.port1.close();
						delete window.mc;
						if(typeof mc!='undefined') {
							window.mc=undefined;
						}
					}
					console.log("fi:",eval_func.name=="anonymous","len:",eval_func.length);
				}
				if(eval_func) {
					eval_func(func);
				}
				let ret=eval_func();
				if(post_exec)
					post_exec(ret);
				return ret;
			} else {
				if(pre_exec) {
					pre_exec(func);
				}
				let ret=func();
				if(post_exec)
					post_exec(ret);
				return ret;
			}
		} finally {}
	};
	let stt=eval(`(class {
			static #unused = this.#init()
			static #init(){
			}
			static _f(){}
			static _n = "<empty>"
			static n_on = true
			static f_on = true
		})`);
	window.CustomInputMatcher=class {
		/**
		 * @param {any} t_needle
		 * @param {any} t_string_getter
		 */
		constructor(t_needle,t_string_getter) {
			this.ts_get=t_string_getter;
			this.tr=t_needle;
		}
		get test_string() {
			return this.ts_get();
		}
		get test_needle() {
			return this.tr;
		}
	};
	class cur extends stt {
		/** @type {any} */
		// @ts-ignore
		static get f() {
			return this._f;
		}
		// @ts-ignore
		static set f(f) {
			let cur=this._ln;
			this._lf=f;
			if(fnlist.indexOf(this._lf)==-1) {
				add_func(this._ln,this._lf);
			}
			if(cur instanceof CustomInputMatcher) {
				let custom_str=cur.test_string;
				let needle=cur.test_needle;
				if(typeof custom_str==='string'&&custom_str.match(needle)==null) {
					this._f=f;
					return;
				}
			}
			if(this.f_on) {
				this.f_on=false;
				this._f=f;
			}
		}
		/** @type {any} */
		static get n() {
			return this._n;
		}
		static set n(n) {
			let cur=n;
			if(cur instanceof CustomInputMatcher) {
				let custom_str=cur.test_string;
				let m_needle=cur.test_needle;
				if(m_needle instanceof RegExp&&typeof custom_str=='string') {
					let m_match=custom_str.match(m_needle);
					if(m_match==null) {
						this._ln=n;
						return;
					} else if(this.rx_off===undefined) {
						this.rx_off=true;
						this.rx_lx=n;
					}
				}
				if(typeof m_needle=='string'&&custom_str!=m_needle) {
					this._ln=n;
					return;
				}
			}
			this._ln=n;
			if(this.n_on) {
				this.n_on=false;
				this._n=n;
			}
		}
	};
	let sym=Symbol();
	var cur__class={
		[sym]: cur
	};
	cur.self_sym=sym;
	cur.funcs=fnlist;
	cur.names=fnname;

	cur.n='1000mines.com';
	// @ts-ignore
	cur.f=function() {
		let return_value;
		if(!debug) throw new Error("Missing debug function (open devtools)");
		debug=debug;
		debug.u=undebug;
		x: {
			let x=debug;
			__fo=[];
			x.fo=__fo;
			x.st=new Set;
			x.sarr=[];
			x.ne=[];
			{
				let test=function(/** @type {any[]} */ e) {
					return e[0];
				};
				let test_fail=Symbol(1);
				let test_works=Symbol(2);
				x(test,'e=[e[1]];0');
				let test_ret=test([test_fail,test_works]);
				if(test_ret===test_fail) {
					console.log('needs new debug function');
					delete window.debug;
					return null;
				}
			}
			function __add_set() {
				if(!('o' in x)) throw new Error("1");
				if(!(x.o instanceof Object)) throw new Error("1");
				for(let c of Object.keys(x.o)) {
					let v=x.o[c];
					if(!x.st.has(v)) {
						x.st.add(v);
						x.sarr.push(v);
						x.ne.push(v);
					}
				}
			}
			{
				let a=[];
				for(let i="a".charCodeAt(0);i<"z".charCodeAt(0);i++) {
					a.push(String.fromCharCode(i));
				}
				for(let i="A".charCodeAt(0);i<"Z".charCodeAt(0);i++) {
					a.push(String.fromCharCode(i));
				}
				a.push('_','$');
				let b=a.slice();
				for(let i="0".charCodeAt(0);i<"9".charCodeAt(0);i++) {
					b.push(String.fromCharCode(i));
				}
				x.__ident_start_chars=a;
				x.__ident_chars=b;
			}
			//__ident_start_chars&&__ident_chars
			x.__all_vars=`{
				let __nf=Symbol(1)
				let __get=__e=>{try{return eval(__e)}catch(e){return __nf}}
				{
					let x=debug
					x.u(x.f)
					x.o={}
					let pl=x.__ident_start_chars
					for(let i=0;i<pl.length;i++){
						let t=x.o
						let k=pl[i]
						let v=__get(k)
						if(v!==__nf){t[k]=v}
					}
				}
			};0;`;
			x.__getter_names=`{
				let __nf=Symbol(1)
				let __get=__e=>{try{return eval(__e)}catch(e){return __nf}}
				debug.__error_sym=Symbol("Error")
				debug.__result_sym=Symbol("Result")
				debug.__trg_eval=__e=>{
					try{
						return [debug.__result_sym,eval(__e)]
					}catch(e){
						return [debug.__error_sym,e]
					}
				}
				{
					let x=debug
					x.u(x.f)
					let cb=x.cb
					if(cb)cb(__get)
					x.gr={}
					let pl=x.__name_list
					for(let i=0;i<pl.length;i++){
						let t=x.gr
						let k=pl[i]
						let v=__get("(function(){return "+k+"})")
						if(v!==__nf){t[k]=v}
					}
				}
			};0;`;
			x.__get_list=`{
				let __nf=Symbol(1)
				let __get=__e=>{try{return eval(__e)}catch(e){return __nf}}
				{
					let x=debug;x.u(x.f);x.o={}
					for(let i of x.__name_list){
						let t=x.o
						let v=__get(i)
						if(v!==__nf){t[i]=v}
					}
				}
			};0`;
			x.rx={};
			/** @type {typeof x['rx']} */
			let w={};
			x.rx=w;
			{
				let mquery=/.+{.+?new (.+)\.fn.init\(.+,.+\)\}/;
				let jqts=jQuery.toString();
				let res=jqts.match(mquery);
				if(!res) throw new Error("jQuery constructor did not match the regex designed to match it");
				let grps=res.slice(1);
				x.__name_list=grps;

			}
			let __nf=Symbol(2);
			/**
			 * @param {(...a:any[])=>any} fn
			 * @param {string} bp_str
			 * @param {(string | undefined)[]} args
			 * @returns {symbol | [any,any]}
			 */
			function __run(fn,bp_str,...args) {
				x.o=__nf;
				x.u(fn);
				x.f=fn;
				x(fn,bp_str);
				try {
					let ret=fn(...args);
					return [ret,x.o];
				} catch {
					return __nf;
				}
			}
			//__name_list
			let ret=__run(jQuery,x.__all_vars,"");
			if(typeof ret==='symbol') return x.o;
			if(ret[1]===__nf) {
				return x.o;
			}
			x.rx.jQuery=ret[1];
			/**
			 * @param {(...arg0: any[]) => any} fn
			 * @param {string} bp_str
			 * @param {(number | boolean)[]} args
			 */
			function __run_noisy(fn,bp_str,...args) {
				x(fn,bp_str);
				try {
					return fn(...args);
				} catch(e) {
					console.log(e);
					return __nf;
				}
			}
			//x.f=$('#control')[G.expando].events.mouseup[0].handler
			{
				let game_ctrl=document.querySelector('#control');
				if(!game_ctrl) throw new Error("missing element with id=control");
				if(!w.jQuery) throw new Error("1");
				let expando_data=game_ctrl[w.jQuery.G.expando];
				if(!expando_data) throw new Error("Missing jquery expando key on element");
				x.f=expando_data.events.mouseup[0].handler;
			}
			__run(x.f,x.__all_vars);
			/**
			 * @param {CallableFunction} func
			 */
			function get_code_formatted(func) {
				/**
				 * @type {any[][]}
				 */
				let stk=[];
				/**
				 * @type {any[]}
				 */
				let cs=[];
				/**
				 * @type {string[]}
				 */
				let s_stk=[];
				let ss_sp='';
				let is_classy=false;
				let is_constructor=false;
				let func_as_string=null;
				if(typeof func!='function') {
					console.log('Tried to get formatted code for non-function');
					return null;
				}
				x: {
					let fd=Object.getOwnPropertyDescriptors(func);
					let fdp=fd.prototype;
					if(fdp.value?.constructor!==func) {
						break x;
					}
					if(fdp.writable) {
						break x;
					}
					func_as_string=func.toString();
					if(func_as_string.slice(0,5)==='class')
						is_classy=true;
				}
				func_as_string??=func.toString();
				let jsfilt=[func.toString()];
				/**
				 * @type {any[]}
				 */
				let jsfout=[];
				let js_out;
				let js_parse_no_white=(/** @type {string} */ e) => {
					let m=null;
					if(e[0].match(/ /)) {
						let m=e.match(/^[ ]+/);
						if(!m) throw new Error("1");
						jsfout.push(m[0]);
					}
					if(e[0].match(/\n/)) {
						m=e.match(/^[\n]+/);
						if(!m) throw new Error("1");
						jsfout.push(m[0]);
					}
					if(e[0].match(/\t/)) {
						m=e.match(/^[\t]+/);
						if(!m) throw new Error("1");
						jsfout.push(m[0]);
					}
					if(m) {
						jsfout.push(e.slice(m[0].length));
					} else {
						jsfout.push(e);
					}
				};
				let js_parse_class=(/** @type {string} */ e) => {
					if(e.slice(0,5)=='class') {
						jsfout.push('class');
						jsfout.push(e.slice(5));
						return;
					}
					jsfout.push(e);
				};
				/**
				 * @param {{ (e: any): void; (e: any): void; (e: any): void; (e: any): void; (e: any): void; (e: any): void; (e: any): void; (value: any, index: number, array: any[]): void; }} func
				 */
				function fe_block(func) {
					jsfilt.forEach(func);
					jsfilt=jsfout;
					jsfout=[];
				}
				let js_parse_ident=(/** @type {any[]} */ js_in,/** @type {any[]} */ js_tmp) => {
					let js_out=[];
					let wt=js_in.pop();
					let m;
					if(m=wt.match(/^[a-zA-Z_$]/)) {
						m=wt.match(/^[a-zA-z_$]([0-9a-zA-Z$_]+)?/);
						js_out.push(m[0]);
						js_out.push(wt.slice(m[0].length));
					}
					return [js_out,js_in,js_tmp];
				};
				/**
				 * @param {string} str
				 * @returns {any[]}
				 */
				function js_parse_func_def_head(str) {
					let js_out=[];
					if(str[0].match(/\(/)&&str[1]==')') {
						return ['(',')',str.slice(2)];
					}
					if(str[0]=='(') {
						js_out.push('()'[0]);
						let [ret]=js_parse_ident([str.slice(1)],[]);
						if(ret[1][0]==')') {
							return ['(',ret[0],')',str.slice(2+ret[0].length)];
						}
						js_out.push(ret[0]);
						let cc=ret[0].length+1+1;
						while(ret[1][0]==',') {
							js_out.push(',');
							([ret]=js_parse_ident([str.slice(cc)],[]));
							js_out.push(ret[0]);
							if(ret[1][0]==')') {
								js_out.push('()'[1]);
								js_out.push(ret[1].slice(1));
								return js_out;
							}
							debugger;
						}
					}
					throw new Error("Failed to parse function head");
				}
				let js_parse_function=(/** @type {string | any[]} */ e) => {
					let fn=e.slice(0,8);
					if(fn=='function') {
						jsfout.push(fn);
						jsfout.push(e.slice(8));
						let wt=jsfout.pop();
						let ret=js_parse_func_def_head(wt);
						jsfout.push(...ret);
						return;
					}
					jsfout.push(e);
				};
				if(is_classy) {
					fe_block(js_parse_class);
				} else {
					fe_block(js_parse_function);
				}
				fe_block(js_parse_no_white);
				/**
				 * @type {any[]}
				 */
				let parse_stack=[];
				let loop_max_count=100;
				let loop_counter=0;
				let js_parse_loop_whitespace=(/** @type {any[]} */ js_in,/** @type {any[]} */ js_tmp) => {
					let js_out=[];
					let top_item=js_in.pop();
					jsfout=[];
					jsfilt=[top_item];
					do {
						fe_block(js_parse_no_white);
						if(loop_counter++>loop_max_count) {
							break;
						} else if(jsfilt.length>1) {
							let nx=jsfilt.pop();
							if(!nx) throw new Error("1");
							js_out.push(...jsfilt);
							jsfilt=[nx];
						} else if(jsfilt.length==1) {
							break;
						}
					} while(true); return [js_out,js_in,js_tmp];
				};
				let js_parse_block_enter=(/** @type {string | any[]} */ e) => {
					if(e[0].match(/{/)) {
						let js_class_methods=[];
						let js_func_ident,js_func_args;
						jsfout.push(e[0]);
						jsfout.push(e.slice(1));
						let ret=js_parse_loop_whitespace(jsfout,jsfilt);
						let js_tmp=jsfilt;
						[js_out,jsfout,jsfilt]=ret;
						jsfout.push(...js_out,...js_tmp);
						if(is_classy) {
							ret=js_parse_ident(jsfout,jsfilt);
							[js_out,jsfout,jsfilt]=ret;
							js_func_ident=js_out[0];
							jsfout.push(js_out[0],js_out[1]);
							if(js_out[0]==='constructor') {
								parse_stack.push('frame');
								parse_stack.push(['classy',is_classy,(/** @type {boolean} */ e) => is_classy=e]);
								is_constructor=true;
								is_classy=false;
								parse_stack.push(['constructor',is_constructor,(/** @type {boolean} */ e) => is_constructor=e]);
								let wt=jsfout.pop();
								ret=js_parse_func_def_head(wt);
								wt=ret.pop();
								js_func_args=ret.slice();
								jsfout.push(...ret);
								parse_stack.push([jsfout,jsfilt]);
								jsfout=[wt];
								jsfilt=[];
								ret=js_parse_loop_whitespace(jsfout,jsfilt);
								js_tmp=jsfilt;
								[js_out,jsfout,jsfilt]=ret;
								[jsfout,jsfilt]=parse_stack.pop();
								jsfout.push(...js_out,...js_tmp);
								wt=jsfout.pop();
								parse_stack.push([jsfout,jsfilt]);
								jsfout=[];
								jsfilt=[wt];
								fe_block(js_parse_block_enter);
								let last=jsfilt.pop();
								if(!last) throw new Error("1");
								js_tmp.push(last);
								js_class_methods.push([js_func_ident,js_func_args,jsfilt.slice()]);
								last=js_tmp.pop();
								if(!last) throw new Error("1");
								jsfilt.push(last);
								js_tmp=jsfilt;
								[jsfout,jsfilt]=parse_stack.pop();
								js_tmp.forEach(e => jsfout.push(e));
								let p_cur=parse_stack.pop();
								//['classy',is_classy,e=>is_classy=e]
								if(p_cur[0]==='classy') {
									p_cur[2](p_cur[1]);
								}
								p_cur=parse_stack.pop();
								if(p_cur!='frame') {
									throw ["Lost frame",parse_stack.slice()];
								}
							}
							parse_stack.push(['loop_counter',loop_counter,loop_max_count]);
							loop_counter=0;
							loop_max_count=40;
							function call_loop_parse_whitespace() {
								ret=js_parse_loop_whitespace(jsfout,jsfilt);
								js_tmp=jsfilt;
								[js_out,jsfout,jsfilt]=ret;
								jsfout.push(...js_out,...js_tmp);
							}
							function call_parse_ident() {
								ret=js_parse_ident(jsfout,jsfilt);
								[js_out,jsfout,jsfilt]=ret;
								jsfout.push(js_out[0],js_out[1]);
							}
							while(jsfout[jsfout.length-1].match(/^[ \t\n]*}/)==null) {
								call_loop_parse_whitespace();
								call_parse_ident();
								let js_func_ident=js_out[0];
								parse_stack.push('frame');
								is_classy=false;
								parse_stack.push(['classy',is_classy,(/** @type {boolean} */ e) => is_classy=e]);
								let is_class_function=true;
								parse_stack.push(['class_function',is_class_function,(/** @type {boolean} */ e) => is_class_function=e]);
								let wt=jsfout.pop();
								ret=js_parse_func_def_head(wt);
								let js_func_args=ret.slice(0,-1);
								jsfout.push(...ret);
								call_loop_parse_whitespace();
								wt=jsfout.pop();
								parse_stack.push([jsfout,jsfilt]);
								jsfout=[];
								jsfilt=[wt];
								fe_block(js_parse_block_enter);
								let last=jsfilt.pop();
								if(!last) throw new Error("1");
								js_tmp.push(last);
								js_class_methods.push([js_func_ident,js_func_args,jsfilt.slice()]);
								last=js_tmp.pop();
								if(!last) throw new Error("1");
								jsfilt.push(last);
								js_tmp=jsfilt;
								[jsfout,jsfilt]=parse_stack.pop();
								js_tmp.forEach(e => jsfout.push(e));
								let p_cur=parse_stack.pop();
								['classy',is_classy,(/** @type {boolean} */ e) => is_classy=e];
								if(p_cur[0]==='classy') {
									p_cur[2](p_cur[1]);
								}
								p_cur=parse_stack.pop();
								if(p_cur!='frame') {
									throw ["Lost frame",parse_stack.slice()];
								}
								loop_counter++;
								if(loop_counter>loop_max_count) {
									break;
								}
							}
							let first_met=js_class_methods[0];
							let fm_idx=jsfout.indexOf(first_met[0]);
							jsfout=jsfout.slice(0,fm_idx).concat(js_class_methods,jsfout.slice(-1));
							let wt=jsfout.pop();
							parse_stack.push([jsfout,jsfilt]);
							ret=js_parse_loop_whitespace([wt],[]);
							js_tmp=jsfilt;
							[js_out,jsfout,jsfilt]=ret;
							[jsfout]=parse_stack.pop();
							jsfout.push(...js_out,...js_tmp);
						} else {
							let wt=jsfout.join('');
							let block_match_rx=/^((?![{}])(?![/][*])(?:.|[=;\n])+?)?([{}]|[\n]?\/\*)/m;
							/**
							 * @param {number} cur_idx
							 * @param {number} [skip_len]
							 * @returns {[any,any]}
							 */
							function parse_bracket_down(cur_idx,skip_len) {
								let cur,cs;
								cs=wt.slice(cur_idx);
								cur=cs.match(block_match_rx);
								if(cur==null) {
									return [cur_idx,skip_len];
								}
								if(cur[2]=='{') {
									if(cur[1])
										skip_len=cur[1].length;
									cur_idx+=cur[0].length;
									cs=wt.slice(cur_idx);
									cur=cs.match(block_match_rx);
									if(cur==null) {
										return [cur_idx,skip_len];
									}
									if(cur[2]=='/*') {
										cur_idx+=cur[0].length;
										cs=wt.slice(cur_idx);
										cur=cs.match(/((.|[\n])+?)?\*\//);
										if(!cur) throw new Error("1");
										cur_idx+=cur[0].length;
										cs=wt.slice(cur_idx);
										cur=cs.match(block_match_rx);
										if(!cur) throw new Error("1");
									}
									while(cur[2]=='{') {
										[cur_idx,]=parse_bracket_down(cur_idx+cur[0].length-1);
										cs=wt.slice(cur_idx);
										if(cs.length==0) {
											return [cur_idx,skip_len];
										}
										cur=cs.match(block_match_rx);
										if(cur==null) {
											return [cur_idx,null];
										}
									}
									cur_idx=cur_idx+cur[0].length;
									return [cur_idx,skip_len];
								}
								throw new Error("1");
							}
							let [len,skip_len]=parse_bracket_down(0);
							let ret=[];
							let got=false;
							if(skip_len) {
								ret.push(wt.slice(0,skip_len));
								ret.push(wt[skip_len]);
								ret.push(wt.slice(skip_len+1,len-1));
								ret.push(wt[len-1]);
							} else {
								ret.push(wt[0],wt.slice(1,len-1),wt[len-1]);
							}
							if(wt.length>len) {
								ret.push(wt.slice(len));
							}
							let oci=0
								,cc=0
								,i=0;
							for(let o_cia=-1;i<jsfout.length;i++) {
								let t_cur=jsfout[i];
								let o_cur=ret[cc];
								if(o_cia<cc&&o_cur.length>t_cur.length) {
									oci+=t_cur.length;
									o_cia=cc;
								}
								let oc=o_cur.slice(oci,oci+t_cur.length);
								if(oc==t_cur) {
									oci+=oc.length;
								} else if(oc=='') {
									cc++;
									got=true;
									break;
								}
							}
							if(got) {
								jsfout.length=i;
								ret=ret.slice(cc);
							} else {
								jsfout.length=0;
							}
							jsfout.push(...ret);
							return;
						}
						return;
					}
					jsfout.push(e);
				};
				fe_block(js_parse_block_enter);
				let maybe=true;
				if(maybe)
					return jsfilt;
				maybe=false;
				/** @template T @param {T[]} arr */
				function unwrap_pop(arr) {
					let ret=arr.pop();
					if(!ret) throw new Error("panic");
					return ret;
				}
				let spf=func.toString().split(/([ .,{}()=;\?\:])/).forEach((/** @type {string} */ e,/** @type {any} */ x) => {
					let ls;
					if(cs.length>0) {
						ls=cs[cs.length-1];
					}
					if(e=='if') {
						cs.push(e);
						ss_sp='if';
						return x;
					}
					if(e.match(/\w/)) {
						cs.push(e);
						return;
					}
					/**
					 * @param {any} e
					 */
					function dn(e,bf=false) {
						stk.push(cs);
						/**
						 * @type {any[]}
						 */
						let nx=[];
						if(bf) {
							cs.push(e);
							cs.push(nx);
							cs=nx;
							return;
						}
						cs.push(nx);
						cs=nx;
						cs.push(e);
					}
					if(e=='(') {
						let isp=ss_sp;
						s_stk.push(ss_sp);
						ss_sp='';
						if(isp=='if') {
							return dn(e);
						}
						if(ls=='function') {
							cs.push(e);
							ss_sp='fn';
							return;
						} else {
							return dn(e);
						}
					}
					if(e==')') {
						cs.push(e);
						let ix2=ss_sp;
						let isp=unwrap_pop(s_stk);
						if(!isp) throw new Error("1");
						ss_sp=isp;
						if(ss_sp=='if') {
							cs=unwrap_pop(stk);
							ss_sp='ifBlock';
							return;
						}
						if(ix2=='fn') {
							return;
						} else {
							cs=unwrap_pop(stk);
							return;
						}
					}
					if(e=='{') {
						s_stk.push(ss_sp);
						ss_sp='';
						return dn(e,true);
					}
					if(e=='}') {
						ss_sp=unwrap_pop(s_stk);
						if(stk.length>0)
							cs=unwrap_pop(stk);
					}
					cs.push(e);
				}
				);
				if(maybe)
					return spf;
				let fb=cs.slice(-3,-2)[0];
				/**
				 * @param {any[]} arr
				 */
				function f_down(arr) {
					/**
					 * @type {any[]}
					 */
					let stk=[];
					let statement=[stk];
					arr.forEach((/** @type {string} */ e) => {
						stk.push(e);
						function dep() {
							stk=[];
							statement.push(stk);
						}
						if(e==',')
							dep();
						if(e==';')
							dep();
						if(e=='?') {
							let bg=unwrap_pop(stk);
							statement.push([bg]);
							dep();
						}
						if(e==':') {
							let bg=unwrap_pop(stk);
							statement.push([bg]);
							dep();
						}
						if(e=='{') {
							let bg=unwrap_pop(stk);
							statement.push([bg]);
							dep();
						}
						if(e=='}') {
							let en=unwrap_pop(stk);
							let ex=unwrap_pop(stk);
							let ts=statement.pop();
							if(!ts) throw new Error("parser underflow (statement array out of elements)");
							if(ex.length>1) {
								ex=f_down(ex);
							}
							statement.push(ex);
							statement.push([en]);
							statement.push(ts);
						}
					}
					);
					return statement;
				}
				let statement=f_down(fb);
				/**
				 * @type {any[][]}
				 */
				let res_code=[];
				function __statement() {
					for(let i=0;i<statement.length;i++) {
						let e=statement[i];
						if(e[0]=='var') {
							res_code.push(e);
							continue;
						}
						if(e.length==1) {
							res_code.push(e[0]);
							continue;
						}
						if(e[1]!=='.') {
							res_code.push(e);
							continue;
						}
						if(e[e.length-1]==',') {
							if(e.slice(-3,-2).length>0) {
								res_code.push([e.slice(0,-3).join(''),e.slice(-3,-2)[0].join(''),e.slice(-2).join('')]);
								continue;
							}
							res_code.push(e);
							continue;
						} else {
							res_code.push([...e.slice(0,-2),...e.slice(-2,-1)[0]]);
							continue;
						}
					}
				}
				__statement();
				return [cs,res_code,statement];
			}
			/**
			 * @type {any[]}
			 */
			get_code_formatted.targets=[];
			/**
			 * @type {[]}
			 */
			let __nx_names=[];
			__nx_names;
			__for_code=get_code_formatted;
			{
				let fc=__for_code;
				fc.targets.length=0;
				fc.targets.push(debug.f);
				let ret=fc(debug.f);
				let bs=ret.indexOf('{');
				let be=ret.lastIndexOf('}');
				let bd=ret.slice(bs+1,be);
				let sc=bd[0].split(',');
				let __nx_name=sc[2].split(/[()]/)[0];
				if(!__nx_name) throw new Error("1");
				x.f=x.o[__nx_name];
			}
			__run(x.f,x.__all_vars);
			__lst=[];
			__lst.push(x.o);
			x.f=x.o.e;
			let cw=Math.floor(window.innerWidth/2);
			let ch=Math.floor(window.innerHeight/2);
			__run_noisy(x.f,x.__all_vars,cw,ch,false);
			x.fo.push([x.f,x.o]);
			__add_set();
			ret=x.o;
			__ret=ret;
			if(typeof ret!=='symbol') {
				w.I_listener={
					__f: x.f,
					...ret,
				};
			} else {
				w.I_listener={
					__f: x.f,
					ret,
				};
			}
			__w=w;
			let dom=document.querySelector('#ctl-home');
			if(!dom) throw new Error("missing element with id=ctl-home");
			if(!('expando' in jQuery)) throw new Error("missing jQuery.expando");
			if(typeof jQuery.expando!=='string') throw new Error("wrong type for jQuery.expando");
			let expando_str=jQuery.expando+'1';
			/** @template {string} T @arg {T} v @returns {v is ExpandoKey} */
			function to_expando_key(v) {
				return v.endsWith("1");
			}
			if(!to_expando_key(expando_str)) throw new Error("1");
			let jq_dom_data=dom[expando_str];
			if(!jq_dom_data) throw 1;
			x.__name_list=[];
			x.f=jq_dom_data.events.click[0].handler;
			__run(x.f,x.__all_vars);
			ret=x.o;
			if(typeof ret!=='symbol') {
				w.game_scope={
					__f: x.f,
					...ret,
				};
			} else {
				w.game_scope={
					__f: x.f,
					ret,
				};
			}
			let real_return;
			if(typeof ret==='symbol') throw new Error("1");
			if(!('m' in ret)) throw new Error("1");
			let __m=ret.m;
			if(!__m) throw new Error("1");
			if(!(typeof __m==='object')) throw new Error("1");
			if(!('click' in __m)) throw new Error("1");
			if(!(__m.click instanceof Function)) throw new Error("1");
			/** @template {Function} T @arg {T} x @returns {x is (...x:any[])=>any} */
			function as_any_func(x) {return true;}
			if(!as_any_func(__m.click)) throw new Error("1");
			x.f=__m.click;
			let o=x.o;
			x.u(x.f);
			x(x.f,x.__all_vars);
			__m.click(0,0);
			if(o===x.o) {
				real_return={
					...x.o
				};
				__r_ret=real_return;
				real_return.__f=x.f;
				return real_return;
			}
			x.fo.push([x.f,x.o]);
			__add_set();
			let cmc=__for_code(__m.click);
			//???
			`${cmc}`;
			x.f=x.o.u;
			x(x.f,x.__all_vars);
			x.f.call(Object.create(x.f.prototype));
			x.fo.push([x.f,x.o]);
			__add_set();
			__ret=x.o;
			w.obj_field={
				__f: x.f,
				ret: __ret
			};
			let ret_val=[...x.st,x.o];
			__res=ret_val;
			let _instance=new cur._class[cur._n];
			__instance=_instance;
			ret=__for_code(__instance.constructor,true);
			console.log(ret);
			return_value=w;
			break x;
		}
		return return_value;
	};
	/** @extends {SymbolIndexable} */
	class n_class {
		constructor() {
			this.is_init=false;
			/** @type {()=>any} */
			this.__get_m=() => null;
			this.created();
		}
		event_fire() {
			let t=this;
			if(!t.is_init)
				t.init();
			let __m=t.__get_m();
			let cur;
			cur=[Object.keys(__m.opened.field).filter(e => __m.mines.field[e]==false)];
			cur=cur.map(e => {
				let st,ed,gr=() => Math.floor(Math.random()*e.length);
				let ret,mn=Math.floor(e.length/16);
				st=gr();
				ed=st+Math.floor(gr()/mn)+4;
				ret=e.slice(st,ed);
				return ret;
			}
			)[0].map(e => e.split('x'));
			cur=cur.map(e => [parseInt(e[0]),parseInt(e[1])]);
			cur.forEach(e => {
				if(__m.opened.get(e[0],e[1])==false) {
					console.log(e);
					return;
				}
				__w.I_listener.I(e[0],e[1]);
			}
			);
		}
		init() {
			if(!debug) throw new Error("missing debug function (open devtools)");
			let t=this;
			let x=debug;
			x.f=__w.game_scope.E;
			x.__name_list=['m'];
			x.__replace_func??={};
			x.__orig_func??={};
			x.__orig_func.S=__w.game_scope.S;
			x.__replace_func.S=function() {
				throw "no";
			};
			x.cb=function(/** @type {(arg0: string) => void} */ __eval) {
				__eval('(function(){S=debug.__replace_func.S})()');
			};
			x(x.f,x.__getter_names);
			try {
				let fn=x.f;
				fn();
			} catch {}
			x.__trg_eval('(function(){S=debug.__orig_func.S})()');
			t.__get_m=x.gr.m;
			t.is_init=true;
		}
		init_if_needed() {
			if(!this.is_init)
				this.init();
		}
		run() {
			this.init_if_needed();
			let __m=this.__get_m();
			/**
			 * @param {{ (arg0: any, arg1: any): any; (x: any, y: any): any; fp?: any; } | null} f
			 * @param {string} n
			 * @param {number} s
			 */
			function find_closed_gen(f,n,s) {
				let e=0
					,q=0;
				if(n=='x')
					e=s;
				if(n=='y')
					q=s;
				f=function(/** @type {number} */ x,/** @type {number} */ y) {
					if(!f) throw new Error("1");
					if(__m.opened.field[x+'x'+y]==0) {
						return f(x+e,y+q);
					}
					x-=e;
					y-=q;
					return f.fp(x,y);
				};
				f.fp=function(/** @type {string} */ x,/** @type {string} */ y) {
					if(__m.opened.field[x+'x'+y]==undefined)
						return null;
					return [x,y];
				};
				return f;
			}
			window.find_closed_up_x=find_closed_gen(null,'x',1);
			window.find_closed_up_y=find_closed_gen(null,'y',1);
			window.find_closed_dn_x=find_closed_gen(null,'x',-1);
			window.find_closed_dn_y=find_closed_gen(null,'y',-1);
			return window.find_closed_up_x(0,0);
		}
		comment_function() {
			/*
				{let __g=[-4,0]
				if(__instance.ret)__g=JSON.parse([...__instance.ret[1].entries()].sort((e,q)=>q[1]-e[1]).map(e=>e[0])[1])
				__instance.run()
				let log=new Set()
				let cnt_map=new Map()
				let obj_arr=[]
				let ff=function(o,r,f,sq,or,st){
				if(!log.has(JSON.stringify(st))){
				log.add(JSON.stringify(st))
				console.log(st)
				}
				if(r){
				__w.I_listener.I(...r)
				let c=f.fp(...sq)
				if(c){
				__w.I_listener.I(...sq)
				}
				let ovf=function(fn,arg){
				let sa=JSON.stringify(arg)
				if(cnt_map.has(sa)){
				cnt_map.set(sa,cnt_map.get(sa)+1)
				}else{
				cnt_map.set(sa,1)
				}
				return arg
				}
				if(r[0]>st.x.g)([obj_arr.indexOf(f),'dt',...ovf(f,r)])
				if(r[0]<st.x.l)([obj_arr.indexOf(f),'dt',...ovf(f,r)])
				if(r[1]>st.y.g)([obj_arr.indexOf(f),'dt',...ovf(f,r)])
				if(r[1]<st.y.l)([obj_arr.indexOf(f),'dt',...ovf(f,r)])
				if(r[0]>o.max_x)o.max_x=r[0];if(r[1]>o.max_y)o.max_y=r[1]
				if(r[0]<o.min_x)o.min_x=r[0];if(r[1]<o.min_y)o.min_y=r[1]
				}
				}
				let f_for=function(func){
				let o={}
				o.max_x=-128,o.max_y=-128,o.min_x=128,o.min_y=128
				let s_pos=__g,r_x=find_closed_up_x(...s_pos)[0]
				for(let s=find_closed_dn_x(...s_pos)[0],q=s;q<r_x;q++)for(let r=find_closed_up_y(...s_pos)[1],m=find_closed_dn_y(...s_pos)[1],j=m;j<r;j++){
				if(obj_arr.indexOf(func)==-1)obj_arr.push(func)
				ff(o,func(q,j),func,[q,j],function(id,val){
				if(id=='v+'){}
				if(id=='v-'){}
				if(id=='h+'){}
				if(id=='h-'){}
				},{x:{g:r_x,l:s},y:{g:r,l:m}})
				}
				return o
				}
				let na,str=__g+"\n",co={}
				na='dn_x';co[na]=f_for(window['find_closed_'+na]);str+=`${na}:{x:{${co[na].max_x} to ${co[na].min_x}},y:{${co[na].max_y} to ${co[na].min_y}}}\n`
				na='up_x';co[na]=f_for(window['find_closed_'+na]);str+=`${na}:{x:{${co[na].max_x} to ${co[na].min_x}},y:{${co[na].max_y} to ${co[na].min_y}}}\n`
				na='dn_y';co[na]=f_for(window['find_closed_'+na]);str+=`${na}:{x:{${co[na].max_x} to ${co[na].min_x}},y:{${co[na].max_y} to ${co[na].min_y}}}\n`
				na='up_y';co[na]=f_for(window['find_closed_'+na]);str+=`${na}:{x:{${co[na].max_x} to ${co[na].min_x}},y:{${co[na].max_y} to ${co[na].min_y}}}\n`
				__instance.ret=[str.slice(0,-1),cnt_map]
				__instance.ret[0]
				}
			*/
			void 0;
		}
		created() {
			let t=this;
			let target=document;
			target.onkeydown=function(e) {
				if(e.key=='*') {
					t.event_fire();
				}
				if(e.key=='r'&&e.altKey) {
					if(this!==target) {
						return t.run();
					}
					console.log(t.run());
				}
			};
		}
	};
	/** @arg {any} x @returns {any} */
	function any(x) {return x;}
	/**@type {{[x: symbol]: typeof cur;} & typeof cur} */
	let n_class_x=any(n_class);
	cur__class[cur._ln]=n_class_x;
	/**
	 * @param {undefined[]} e
	 */
	function do_cur(...e) {
		var i;
		if(cur.rx_lx) {
			i=fnname.indexOf(cur.rx_lx);
		} else {
			i=fnname.indexOf(cur.n);
		}
		let px_fn=function(/** @type {{ argv: any[]; }} */ fn) {
			fn.argv=e;
		};
		var _result=execute(i,px_fn);
		return _result;
	}
	cur.value=cur.do_cur();
	return cur;
	//# sourceURL=snippet:///%24_2
}
window.__ret=main();

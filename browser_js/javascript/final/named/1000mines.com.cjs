function main() {
	class CustomInputMatcher {
		/** @arg {any} t_needle @arg {any} t_string_getter @arg {string} result_name */
		constructor(t_needle,t_string_getter,result_name) {
			this.ts_get=t_string_getter;
			this.tr=t_needle;
			this.result_name=result_name;
		}
		get test_string() {
			return this.ts_get();
		}
		get test_needle() {
			return this.tr;
		}
	}
	class Runner {
		/** @returns {{type:"runner",value:Runner}} */
		make_ret() {
			return {
				type: "runner",
				value: this,
			};
		}
		/** @type {(any[])|null} */
		argv=null;
		/** @type {string|CustomInputMatcher|null} */
		_ln=null;
		value=null;
		/** @type {((...x:any[])=>any)[]} */
		funcs=[];
		/** @type {string[]} */
		names=[];
		self_sym=Symbol();
		/** @arg {any[]} e */
		do_cur(...e) {
			var i;
			debugger;
			this.argv=e;
			if(this.rx_lx) {
				i=this.names.indexOf(this.rx_lx.result_name);
			} else {
				if(this._ln instanceof CustomInputMatcher) {
					i=this.names.indexOf(this._ln.result_name);
				} else if(typeof this._ln==='string') {
					i=this.names.indexOf(this._ln);
				} else {
					i=-1;
				}
			}
			if(i>=0) return this.execute(i);
			return null;
		}
		/** @arg {number} t */
		execute(t) {
			var function_name=this.names[t];
			var function_value=this.funcs[t];
			try {
				var sf=function_value.toString();
				if(sf.indexOf("/*arg_start*/")>-1) {
					let eval_func; {
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
						let src_url='//'+'# sourceURL='+function_name;
						let func_str;
						if(is_strict) {
							func_str=`"use strict";\nconsole.log("run ${function_name}")\n${body}\n${src_url}`;
							eval_func=new Function(args,func_str);
						} else {
							func_str=`console.log("run ${function_name}")\n${body}\n${src_url}`;
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
					return eval_func();
				} else {
					return function_value();
				}
			} finally {}
		}
		/** @arg {string|CustomInputMatcher} name @arg {((...x: any[]) => any)} func */
		add_func(name,func) {
			var y=this.funcs.push(func);
			if(!(name instanceof CustomInputMatcher)) {
				if(this.names.indexOf(name)>-1)
					throw SyntaxError("Name conflict");
				var x=this.names.push(name);
				/** @template T @arg {T} _obj @returns {asserts _obj is {user_run_name?: string}}  */
				function assume_has_run_name(_obj) {}
				assume_has_run_name(func);
				func.user_run_name=name;
				if(x!=y) throw SyntaxError("unbalanced function or name number");
				return x;
			}
			console.log("handle add_func for",name);
			throw new Error("Unexpected type");
		}
		/** @type {((...x:any[])=>any)} */
		get f() {
			if(!this._f) throw new Error("no function to get");
			return this._f;
		}
		set f(f) {
			if(!this._ln) throw new Error("no last name");
			let cur=this._ln;
			this._lf=f;
			if(this.funcs.indexOf(this._lf)==-1) {
				this.add_func(this._ln,this._lf);
			}
			if(cur instanceof CustomInputMatcher) {
				let custom_str=cur.test_string;
				let needle=cur.test_needle;
				if(typeof custom_str=='string'&&custom_str.match(needle)==null) {
					this._f=f;
					return;
				}
			}
			if(this.f_on) {
				this.f_on=false;
				this._f=f;
			}
		}
		/** @type {string|CustomInputMatcher|undefined} */
		get n() {
			return this._n;
		}
		/** @arg {string|CustomInputMatcher} n_value */
		set n(n_value) {
			if(n_value instanceof CustomInputMatcher) {
				let custom_str=n_value.test_string;
				let m_needle=n_value.test_needle;
				if(m_needle instanceof RegExp&&typeof custom_str=='string') {
					let m_match=custom_str.match(m_needle);
					if(m_match==null) {
						this._ln=n_value.result_name;
						return;
					} else if(this.rx_off===undefined) {
						this.rx_off=true;
						this.rx_lx=n_value;
					}
				}
				if(typeof m_needle=='string'&&custom_str!=m_needle) {
					this._ln=n_value;
					return;
				}
			}
			this._ln=n_value;
			if(this.n_on) {
				this.n_on=false;
				this._n=n_value;
			}
		}
	}
	let cur=new Runner;
	cur.n='1000mines.com';
	cur.f=function() {
		let return_value;
		if(!window.debug||!window.undebug) throw new Error("Missing debug function (open devtools)");
		window.debug.u=window.undebug;
		x: {
			let x=window.debug;
			x.fo=[];
			x.st=new Set;
			x.set_arr=[];
			x.ne=[]; {
				let test=function( /** @type {any[]} */ e) {
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
						x.set_arr.push(v);
						x.ne.push(v);
					}
				}
			} {
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
			x.rx=w; {
				let match_jquery_code=/.+{.+?new (.+)\.fn.init\(.+,.+\)\}/;
				let jquery_string=jQuery.toString();
				let res=jquery_string.match(match_jquery_code);
				if(!res) throw new Error("jQuery constructor did not match the regex designed to match it");
				let res_off=res.slice(1);
				x.__name_list=res_off;

			}
			let __nf=Symbol(2);
			/** @arg {(...a:any[])=>any} fn @arg {string} bp_str @arg {(string | undefined)[]} args @returns {symbol | [any,any]} */
			function __run(fn,bp_str,...args) {
				if(!x.u) throw 1;
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
			/** @arg {(...arg0: any[]) => any} fn @arg {string} bp_str @arg {(number | boolean)[]} args */
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
				if(!expando_data.events.mouseup) throw 1;
				x.f=expando_data.events.mouseup[0].handler;
			}
			__run(x.f,x.__all_vars);
			/** @arg {CallableFunction} func */
			function get_code_formatted(func) {
				/** @type {any[][]} */
				let stk=[];
				/** @type {any[]} */
				let cs=[];
				/** @type {string[]} */
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
				func_as_string=func.toString();
				let js_filt=[func.toString()];
				/** @type {any[]} */
				let js_out=[];
				let js_parse_no_white=( /** @type {string} */ e) => {
					let m=null;
					if(e[0].match(/ /)) {
						let m=e.match(/^[ ]+/);
						if(!m) throw new Error("1");
						js_out.push(m[0]);
					}
					if(e[0].match(/\n/)) {
						m=e.match(/^[\n]+/);
						if(!m) throw new Error("1");
						js_out.push(m[0]);
					}
					if(e[0].match(/\t/)) {
						m=e.match(/^[\t]+/);
						if(!m) throw new Error("1");
						js_out.push(m[0]);
					}
					if(m) {
						js_out.push(e.slice(m[0].length));
					} else {
						js_out.push(e);
					}
				};
				let js_parse_class=( /** @type {string} */ e) => {
					if(e.slice(0,5)=='class') {
						js_out.push('class');
						js_out.push(e.slice(5));
						return;
					}
					js_out.push(e);
				};
				/** @arg {(value: string, index: number, array: string[])=> void} func */
				function fe_block(func) {
					js_filt.forEach(func);
					js_filt=js_out;
					js_out=[];
				}
				/**
				 * @param {string[]} js_in
				 * @param {string[]} js_tmp
				 * @returns {[[]|[string,string],string[],string[]]}
				 */
				function js_parse_ident(js_in,js_tmp){
					let js_out=[];
					let [wt,...rest]=js_in;
					let m;
					if(m=wt.match(/^[a-zA-Z_$]/)) {
						if(m=wt.match(/^[a-zA-z_$]([0-9a-zA-Z$_]+)?/)) {;
							js_out.push(m[0]);
							let p2=wt.slice(m[0].length);
							return [[m[0],p2],rest,js_tmp];
						} else {
							debugger;
						}
					}
					return [[],rest,js_tmp];
				};
				/** @param {string} str
				 * @returns {any[]} */
				function js_parse_func_def_head(str) {
					let js_out=[];
					if(str[0].match(/\(/)&&str[1]==')') {
						return ['(',')',str.slice(2)];
					}
					if(str[0]=='(') {
						js_out.push('()'[0]);
						let [ret]=js_parse_ident([str.slice(1)],[]);
						if(ret.length===0)throw new Error("failed");
						if(ret[1][0]==')') {
							return ['(',ret[0],')',str.slice(2+ret[0].length)];
						}
						js_out.push(ret[0]);
						let cc=ret[0].length+1+1;
						while(ret[1][0]==',') {
							js_out.push(',');
							([ret]=js_parse_ident([str.slice(cc)],[]));
							if(ret.length===0)throw new Error("failed");
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
				let js_parse_function=( /** @type {string | any[]} */ e) => {
					let fn=e.slice(0,8);
					if(fn=='function') {
						js_out.push(fn);
						js_out.push(e.slice(8));
						let wt=js_out.pop();
						let ret=js_parse_func_def_head(wt);
						js_out.push(...ret);
						return;
					}
					js_out.push(e);
				};
				if(is_classy) {
					fe_block(js_parse_class);
				} else {
					fe_block(js_parse_function);
				}
				fe_block(js_parse_no_white);
				/** @type {any[]} */
				let parse_stack=[];
				let loop_max_count=100;
				let loop_counter=0;
				let js_parse_loop_whitespace=( /** @type {any[]} */ js_in, /** @type {any[]} */ js_tmp) => {
					let js_out=[];
					let top_item=js_in.pop();
					js_out=[];
					js_filt=[top_item];
					do {
						fe_block(js_parse_no_white);
						if(loop_counter++>loop_max_count) {
							break;
						} else if(js_filt.length>1) {
							let nx=js_filt.pop();
							if(!nx) throw new Error("1");
							js_out.push(...js_filt);
							js_filt=[nx];
						} else if(js_filt.length==1) {
							break;
						}
					} while(true);
					return [js_out,js_in,js_tmp];
				};
				let js_parse_block_enter=( /** @type {string | any[]} */ e) => {
					if(e[0].match(/{/)) {
						let js_class_methods=[];
						let js_func_ident,js_func_args;
						js_out.push(e[0]);
						js_out.push(e.slice(1));
						let ret=js_parse_loop_whitespace(js_out,js_filt);
						let js_tmp=js_filt;
						[js_out,js_out,js_filt]=ret;
						js_out.push(...js_out,...js_tmp);
						if(is_classy) {
							ret=js_parse_ident(js_out,js_filt);
							[js_out,js_out,js_filt]=ret;
							js_func_ident=js_out[0];
							js_out.push(js_out[0],js_out[1]);
							if(js_out[0]==='constructor') {
								parse_stack.push('frame');
								parse_stack.push(['classy',is_classy,( /** @type {boolean} */ e) => is_classy=e]);
								is_constructor=true;
								is_classy=false;
								parse_stack.push(['constructor',is_constructor,( /** @type {boolean} */ e) => is_constructor=e]);
								let wt=js_out.pop();
								ret=js_parse_func_def_head(wt);
								wt=ret.pop();
								js_func_args=ret.slice();
								js_out.push(...ret);
								parse_stack.push([js_out,js_filt]);
								js_out=[wt];
								js_filt=[];
								ret=js_parse_loop_whitespace(js_out,js_filt);
								js_tmp=js_filt;
								[js_out,js_out,js_filt]=ret;
								[js_out,js_filt]=parse_stack.pop();
								js_out.push(...js_out,...js_tmp);
								wt=js_out.pop();
								parse_stack.push([js_out,js_filt]);
								js_out=[];
								js_filt=[wt];
								fe_block(js_parse_block_enter);
								let last=js_filt.pop();
								if(!last) throw new Error("1");
								js_tmp.push(last);
								js_class_methods.push([js_func_ident,js_func_args,js_filt.slice()]);
								last=js_tmp.pop();
								if(!last) throw new Error("1");
								js_filt.push(last);
								js_tmp=js_filt;
								[js_out,js_filt]=parse_stack.pop();
								js_tmp.forEach(e => js_out.push(e));
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
								ret=js_parse_loop_whitespace(js_out,js_filt);
								js_tmp=js_filt;
								[js_out,js_out,js_filt]=ret;
								js_out.push(...js_out,...js_tmp);
							}

							function call_parse_ident() {
								ret=js_parse_ident(js_out,js_filt);
								[js_out,js_out,js_filt]=ret;
								js_out.push(js_out[0],js_out[1]);
							}
							while(js_out[js_out.length-1].match(/^[ \t\n]*}/)==null) {
								call_loop_parse_whitespace();
								call_parse_ident();
								let js_func_ident=js_out[0];
								parse_stack.push('frame');
								is_classy=false;
								parse_stack.push(['classy',is_classy,( /** @type {boolean} */ e) => is_classy=e]);
								let is_class_function=true;
								parse_stack.push(['class_function',is_class_function,( /** @type {boolean} */ e) => is_class_function=e]);
								let wt=js_out.pop();
								ret=js_parse_func_def_head(wt);
								let js_func_args=ret.slice(0,-1);
								js_out.push(...ret);
								call_loop_parse_whitespace();
								wt=js_out.pop();
								parse_stack.push([js_out,js_filt]);
								js_out=[];
								js_filt=[wt];
								fe_block(js_parse_block_enter);
								let last=js_filt.pop();
								if(!last) throw new Error("1");
								js_tmp.push(last);
								js_class_methods.push([js_func_ident,js_func_args,js_filt.slice()]);
								last=js_tmp.pop();
								if(!last) throw new Error("1");
								js_filt.push(last);
								js_tmp=js_filt;
								[js_out,js_filt]=parse_stack.pop();
								js_tmp.forEach(e => js_out.push(e));
								let p_cur=parse_stack.pop();
								['classy',is_classy,( /** @type {boolean} */ e) => is_classy=e];
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
							let fm_idx=js_out.indexOf(first_met[0]);
							js_out=js_out.slice(0,fm_idx).concat(js_class_methods,js_out.slice(-1));
							let wt=js_out.pop();
							parse_stack.push([js_out,js_filt]);
							ret=js_parse_loop_whitespace([wt],[]);
							js_tmp=js_filt;
							[js_out,js_out,js_filt]=ret;
							[js_out]=parse_stack.pop();
							js_out.push(...js_out,...js_tmp);
						} else {
							let wt=js_out.join('');
							let block_match_rx=/^((?![{}])(?![/][*])(?:.|[=;\n])+?)?([{}]|[\n]?\/\*)/m;
							/** @param {number} cur_idx
							 * @param {number} [skip_len]
							 * @returns {[any,any]} */
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
							let oci=0,
								cc=0,
								i=0;
							for(let o_cia=-1;i<js_out.length;i++) {
								let t_cur=js_out[i];
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
								js_out.length=i;
								ret=ret.slice(cc);
							} else {
								js_out.length=0;
							}
							js_out.push(...ret);
							return;
						}
						return;
					}
					js_out.push(e);
				};
				fe_block(js_parse_block_enter);
				let maybe=true;
				if(maybe)
					return null;
				maybe=false;
				/** @template T @param {T[]} arr */
				function unwrap_pop(arr) {
					let ret=arr.pop();
					if(!ret) throw new Error("panic");
					return ret;
				}
				func.toString().split(/([ .,{}()=;\?\:])/).forEach(( /** @type {string} */ e) => {
					let ls;
					if(cs.length>0) {
						ls=cs[cs.length-1];
					}
					if(e=='if') {
						cs.push(e);
						ss_sp='if';
						return;
					}
					if(e.match(/\w/)) {
						cs.push(e);
						return;
					}
					/** @param {string} e */
					function dn(e,bf=false) {
						stk.push(cs);
						/** @type {any[]} */
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
				});
				if(maybe)
					return null;
				let fb=cs.slice(-3,-2)[0];
				/** @param {any[]} arr */
				function f_down(arr) {
					/** @type {any[]} */
					let stk=[];
					let statement=[stk];
					arr.forEach(( /** @type {string} */ e) => {
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
					});
					return statement;
				}
				let statement=f_down(fb);
				/** @type {any[][]} */
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
				return {cs,res_code,statement};
			}
			/** @type {any[]} */
			get_code_formatted.targets=[]; {
				debugger;
				let fc=get_code_formatted;
				fc.targets.length=0;
				fc.targets.push(window.debug.f);
				let ret=fc(window.debug.f);
				if(!ret) throw 1;
				let bs=ret.cs.indexOf('{');
				let be=ret.cs.lastIndexOf('}');
				let bd=ret.cs.slice(bs+1,be);
				let sc=bd[0].split(',');
				let __nx_name=sc[2].split(/[()]/)[0];
				if(!__nx_name) throw new Error("1");
				console.log(__nx_name);
				// x.f=x.o[__nx_name];
			}
			__run(x.f,x.__all_vars);
			__lst=[];
			let cw=Math.floor(window.innerWidth/2);
			let ch=Math.floor(window.innerHeight/2);
			__run_noisy(x.f,x.__all_vars,cw,ch,false);
			// x.fo.push([x.f,x.o]);
			__add_set();
			// ret=x.o;
			window.__ret={
				type: "site",
				from: "1000mines.com",
				ret,
			};
			if(typeof ret!=='symbol') {
				/*w.I_listener={
					__f: x.f,
					...ret,
				};*/
			} else {
				/* w.I_listener={
					__f: x.f,
					ret,
				}; */
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
			if(!jq_dom_data.events.click) throw 1;
			x.f=jq_dom_data.events.click[0].handler;
			__run(x.f,x.__all_vars);
			// ret=x.o;
			if(typeof ret!=='symbol') {
				/* w.game_scope={
					__f: x.f,
					...ret,
				}; */
			} else {
				/* w.game_scope={
					__f: x.f,
					ret,
				}; */
			}
			// let real_return;
			if(typeof ret==='symbol') throw new Error("1");
			if(!('m' in ret)) throw new Error("1");
			let __m=ret.m;
			if(!__m) throw new Error("1");
			if(!(typeof __m==='object')) throw new Error("1");
			if(!('click' in __m)) throw new Error("1");
			if(!(__m.click instanceof Function)) throw new Error("1");
			/** @template {Function} T @arg {T} x @returns {x is (...x:any[])=>any} */
			function as_any_func(x) {
				x;
				return true;
			}
			if(!as_any_func(__m.click)) throw new Error("1");
			x.f=__m.click;
			let o=x.o;
			if(!x.u) throw 1;
			x.u(x.f);
			x(x.f,x.__all_vars);
			__m.click(0,0);
			if(o===x.o) {
				/* real_return={
					...x.o
				}; */
				/* __r_ret=real_return;
				real_return.__f=x.f;
				return real_return; */
				return x.o;
			}
			// x.fo.push([x.f,x.o]);
			__add_set();
			// let cmc=get_code_formatted(__m.click);
			// x.f=x.o.u;
			x(x.f,x.__all_vars);
			x.f.call(Object.create(x.f.prototype));
			// x.fo.push([x.f,x.o]);
			__add_set();
			window.__ret={
				/** @type {"site"} */
				type: "site",
				/** @type {"1000mines.com"} */
				from: "1000mines.com",
				ret: [{},{}],
			};
			/* w.obj_field={
				__f: x.f,
				ret: window.__ret,
			}; */
			// let ret_val=[...x.st,x.o];
			// __res=ret_val;
			return_value=w;
			break x;
		}
		return return_value;
	};
	cur.value=cur.do_cur();
	return cur.make_ret();
	//# sourceURL=snippet:///1000mines.com.js
}

window.__ret=main();

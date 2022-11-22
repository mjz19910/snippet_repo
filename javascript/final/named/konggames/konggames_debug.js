/* spell:words konggames
--- version_list item 2 ---
v1 (cur): snippet_repo/javascript/final/konggames/konggames_debug.js
*/
function main() {
	/** @arg {any} v */
	function any(v){return v;}
	class CustomInputMatcher {
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
	}
	class curTy {
		/** @type {(undefined[])|null} */
		argv=null;
		/** @type {string|CustomInputMatcher|null} */
		_ln=null;
		value=null;
		/** @type {(((...x:any[])=>any)&{ user_run_name: unknown; argv:any[] })[]} */
		funcs=[];
		/** @type {string[]} */
		names=[];
		self_sym=Symbol();
		px_fn(/** @type {{ argv: any[]; }} */ fn) {
			if(!this.argv) throw new Error("1");
			fn.argv=this.argv;
		}
		/**
		 * @param {undefined[]} e
		 */
		do_cur(...e) {
			var i;
			this.argv=e;
			if(cur.rx_lx) {
				i=cur.names.indexOf(cur.rx_lx);
			} else {
				i=cur.names.indexOf(cur.n);
			}
			if(i<0) {
				console.log("no function to run was matched");
				return null;
			}
			var _result=cur.execute(i);
			return _result;
		}
		/**
		 * @param {number} t
		 */
		execute(t) {
			var r_fnname=this.names[t];
			var func=this.funcs[t];
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
					let ret=eval_func();
					return ret;
				} else {
					if(!('argv' in func)) throw 1;
					if(!(func.argv instanceof Array)) throw 1;
					this.px_fn(func);
					let ret=func();
					return ret;
				}
			} finally {}
		}
		/**
		 * @param {string|CustomInputMatcher} name
		 * @param {((...x: any[]) => any) & { user_run_name: unknown; argv: any[]}} func
		 */
		add_func(name,func) {
			var y=this.funcs.push(func);
			if(name instanceof CustomInputMatcher) {
			} else {
				if(this.names.indexOf(name)>-1)
					throw SyntaxError("Name conflict");
				var x=this.names.push(name);
				func.user_run_name=name;
				if(x!=y)
					throw SyntaxError("unbalanced function or name number");
				return x;
			}
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
			if(this.funcs.indexOf(any(this._lf))==-1) {
				this.add_func(this._ln,any(this._lf));
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
		/** @type {any} */
		get n() {
			return this._n;
		}
		set n(n) {
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
	}
	let cur=new curTy;
	var cur__class={[cur.self_sym]: cur};
	cur.n="debug_js_call_konggames";
	cur.f=function() {
		class DebugState {
			/**
			 * @type {symbol}
			 */
			call_info=Symbol.for("Unknown");
			/**
			 * @type {any}
			 */
			breakpoint_function;
			/**
			 * @type {any}
			 */
			root;
			/**
			 * @type {symbol[]}
			 */
			info=[];
			/**
			 * @type {any}
			 */
			breakpoint_function_path;
			/**
			 * @type {{ abort: symbol; error: symbol; success: symbol; failure: symbol; debug: symbol; }}
			 */
			sym={
				abort: Symbol('abort'),
				error: Symbol('error'),
				success: Symbol("success"),
				failure: Symbol("failure"),
				debug: Symbol("debug"),
			};
			/**
			 * @type {number}
			 */
			depth=0;
		}
		class debug_class {
			/**
			 * @param {DebugState} state
			 */
			constructor(state) {
				this.data={
					ghost_tree: null,
				};
				/**
				 * @type {any[]}
				 */
				this.error_array=[];
				var id=Math.floor(Math.random()*(1<<(24))*(1<<8+8+4)).toString(16);
				let key='_debugger_'+id;
				this.key=key;
				this.state=state;
				this.breakpoint_function_path=state.breakpoint_function_path;
				if(state.sym) {
					this.sym=state.sym;
				} else {
					this.sym={
						abort: Symbol('abort'),
						error: Symbol('error'),
						success: Symbol("success"),
						failure: Symbol("failure"),
						debug: Symbol("debug"),
					};
					state.sym=this.sym;
				}
				state.info=[];
				/**
				 * @type {((e: any) => void) | undefined}
				 */
				this.on_internal_callback=undefined;
				/**
				 * @type {((e: any) => void) | undefined}
				 */
				this.on_breakpoint_clear=undefined;
				this.in_callback=false;
			}
			/**
			 * @param {any} event_foward_function
			 */
			async clear(event_foward_function) {
				if(this.state.root) {
					var nop=function() {};
					this.event_foward_function=event_foward_function;
					nop.call(null);
					await this.promise;
					this.clear_root();
					if(this.next) {
						await this.next.clear(() => {
							console.log('prev clear done');
						});
						/**
						 * @type {debug_class | null}
						 */
						this.next=null;
					}
					return;
				}
				var nop=function() {};
				Reflect.apply(this.breakpoint_function,nop,[]);
				await this.promise;
			}
			clear_root() {
				throw new Error("Method not implemented.");
			}
			run() {
				var t=this;
				var state=this.state;
				window[this.key]=this;
				if(state&&!state.breakpoint_function) {
					/** @type {any} */
					let g=window;
					let pth=this.breakpoint_function_path.split(".");
					for(let c;c=pth.shift();) {
						g=g[c];
					}
					state.breakpoint_function=g;
				}
				this.breakpoint_function=state.breakpoint_function;
				/**
				 * @type {{ arg: any[][]; m_this: { (start?: number | undefined, end?: number | undefined): any[]; (v: PropertyKey): boolean; }; }[]}
				 */
				this.failed_check=[];
				var make_internal_promise=function(/** @type {(arg0: any) => void} */ a) {
					t.on_internal_callback=function(e) {
						a(e);
					};
				};
				this.internal_promise=new Promise(make_internal_promise);
				var make_promise=function(/** @type {(arg0: any) => void} */ a) {
					t.on_breakpoint_clear=function(e) {
						a(e);
					};
				};
				var ret=new Promise(make_promise);
				this.promise=ret;
				this.on_page_unload=function() {
					if(t.has_breakpoint) {
						t.clear_breakpoint(null);
					}
				};
				window.addEventListener('unload',this.on_page_unload);
				if(this.in_callback) {
					console.log('not setting breakpoint in breakpoint');
				} else {
					this.set_breakpoint();
				}
			}
			/**
			 * @param {any} info
			 */
			do_internal_callback(info) {
				this.internal_result=info;
				if(!this.on_internal_callback) return;
				this.on_internal_callback(this.internal_result);
			}
			/**
			 * @param {{ arg: any[][]; m_this: { (start?: number | undefined, end?: number | undefined): any[]; (v: PropertyKey): boolean; }; }} info
			 */
			callback(info) {
				x: {
					if(this.state.info&&info.arg?.[1]?.[0]!==undefined&&this.state.info.indexOf(info.arg[1][0])>-1) {
						let arg_info=info.arg[1][0];
						let dbg_sym=this.sym.debug;
						if(arg_info==dbg_sym) {
							let idx=this.state.info.indexOf(dbg_sym);
							this.state.info.splice(idx,1);
							this.do_internal_callback(info);
						}
						return;
					}
					if(!this.failed_check) throw new Error("");
					if(this.failed_check.length>256) {
						break x;
					}
					if(info.m_this===Array.prototype.slice) {
						this.failed_check.push(info);
						console.log('1');
						return;
					}
					if(info.m_this===Object.prototype.hasOwnProperty) {
						this.failed_check.push(info);
						console.log('2',...info.arg);
						return;
					}
					this.clear_breakpoint(info);
				}
			}
			/**
			 * @param {{ arg: any[][]; m_this: { (start?: number | undefined, end?: number | undefined): any[]; (v: PropertyKey): boolean; }; } | null | undefined} result
			 */
			clear_breakpoint(result) {
				var error;
				if(arguments.length<1) {
					error=new Error("Not enough arguments");
				}
				if(result===undefined) {
					error=new Error("required argument 'result' is undefined");
				}
				if(error) {
					Error.captureStackTrace(error,this.clear_breakpoint);
					throw error;
				}
				if(this.event_foward_function) {
					this.event_foward_function('clear '+this.key);
				} else {
					console.log('clear '+this.key);
				}
				undebug(this.breakpoint_function);
				delete window[this.key];
				if(this.on_page_unload&&result!==null) {
					window.removeEventListener('unload',this.on_page_unload.bind(this));
				}
				if(result!==null) {
					this.result=result;
				}
				this.do_breakpoint_clear();
			}
			do_breakpoint_clear() {
				if(!this.on_breakpoint_clear) return;
				this.on_breakpoint_clear({});
			}
			set_breakpoint() {
				if(!debug) throw new Error("devtools");
				console.log('set debug breakpoint',this.breakpoint_function);
				this.first=true;
				debug(this.breakpoint_function,this.get_breakpoint_string());
				this.has_breakpoint=true;
			}
			get_breakpoint_string() {
				var tmp=`
				x:{
					try{
						let function_path="${this.breakpoint_function_path}"
						let key_for_dbg="${this.key}"
						if(window[key_for_dbg]===undefined){
							if(function_path){
								console.log("Bad breakpoint","try undebug")
								undebug(new Function("return "+function_path))
							}
							console.log("Bad breakpoint")
							1
							break x
						}
						let _debugger=window[key_for_dbg]
						let info={m_this:this,arg:arguments}
						info.scope_accessor=function(e){
							try{
								var r=eval(e)
								return [_debugger.sym.success,r]
							}
							catch(q){
								var x=q
								return [_debugger.sym.failure,x]
							}
						}
						if(_debugger.first){
							//_debugger.first=false
							console.log(_debugger.state.root?"HERE.root":"HERE")
						}
						_debugger.in_callback=true
						_debugger.callback(info)
						_debugger.in_callback=false
					}
					catch(e){
						console.log('at_bp',e)
						1
					}
				}
				`;
				var a=tmp.split("\n");
				var b=a.shift();
				var c=a.pop();
				var pad_str=a[0].match(/\s+/)?.[0];
				if(pad_str) {
					let t_len=pad_str.length;
					for(var i=0;i<a.length;i++) {
						a[i]=a[i].slice(t_len);
					}
				}
				if(!b) {
					let ul_p1='snippet://dbg/dbg_bp.';
					var src_url='//'+"# sourceURL="+ul_p1+this.state.depth+".js";
					if(this.state.root)
						src_url='//'+"# sourceURL="+ul_p1+"root.js";
					return ([...a,c,src_url]).join("\n");
				}
				return ([b,...a,c]).join("\n");
			}
		}
		function run_sync_code() {
			/**
			 * @param {()=>DebugState} pre_init
			 * @arg {(x:debug_class,s:DebugState)=>unknown} at_init
			 * @arg {(x:debug_class,s:DebugState)=>unknown} done_cb
			 */
			function dbg_init(pre_init,at_init,done_cb) {
				var state=pre_init();
				let _debugger=new debug_class(state);
				at_init(_debugger,state);
				_debugger.run();
				done_cb(_debugger,state);
				return _debugger;
			}
			let _debugger=dbg_init(function() {
				debug=debug;
				undebug=undebug;
				var state=new DebugState;
				state.breakpoint_function_path="Function.prototype.call";
				state.root=true;
				state.depth=0;
				return state;
			},function(_debugger,state) {
				var d_sym=_debugger.sym.debug;
				state.info.push(d_sym);
				state.call_info=d_sym;
			},function(/** @type {{ clear_root: () => void; }} */ _debugger,/** @type {{ call_info: any; }} */ state) {
				/**
				 * @param {any[]} x
				 */
				function nop(...x) {
					x;
				}
				nop.call(null,[state.call_info]);
				window.dz=_debugger;
				_debugger.clear_root=function() {
					delete window.dz;
				};
			});
			var promise_debugger=_debugger;
			if(!_debugger.internal_promise) throw new Error("Missing internal promise (call run first)");
			_debugger.internal_promise.then(function(z) {
				console.log([z.scope_accessor]);
				if(promise_debugger.breakpoint_function.rep===undefined) {
					return;
				}
				var access_res=z.scope_accessor('data');
				if(access_res[0]!==promise_debugger.sym.success) {
					promise_debugger.error_array.push(access_res[1]);
					console.log('failure',access_res[0],Object.getPrototypeOf(access_res[1]).name+":"+access_res[1].message);
					return;
				}
				var ghost_tree=access_res[1].original;
				let r=dbg_init(function() {
					var state=new DebugState;
					Object.assign(state,promise_debugger.state);
					state.breakpoint_function_path="Function.prototype.call";
					state.depth++;
					debugger;
					return state;
				},function(_debugger,state) {
					state.breakpoint_function=ghost_tree.Function.prototype.call;
				},function(_debugger) {
					_debugger.data.ghost_tree=ghost_tree;
					promise_debugger.next=_debugger;
				});
				console.log(r);
				return r;
			});
			if(!_debugger.state.root)
				console.log(_debugger);
			return _debugger;
		}
		var _debugger=window.dz;
		if(_debugger) {
			var run_async_code=async function() {
				console.log('async clear');
				await _debugger.clear((/** @type {any} */ e) => console.log(e));
				return run_sync_code();
			};
			var _promise=run_async_code();
			return _promise;
		}
		var result=run_sync_code();
		return result;
	};
	let ret;
	let debug_flag=false;
	if(top!==window) {
		if(window.debugApi==undefined) {
			debugApi=new DebugAPI;
		}
		if(debug_flag) console.log('restart on top frame');
		ret=debugApi.asyncExecuteFunction(top,main);
	} else {
		ret=cur.do_cur();
	}
	if(ret instanceof Promise) {
		ret.then(() => void 0).catch(e => console.error(e));
	}
	cur.value=ret;
	return {...cur,_class: cur__class};
	//# sourceURL=snippet:///%24_2
}
window.__ret=main();

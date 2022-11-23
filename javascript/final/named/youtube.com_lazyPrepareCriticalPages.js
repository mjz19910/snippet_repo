/* spell:words
--- version_list item 2 ---
v1 (cur): snippet_repo/javascript/final/youtube.com_lazyPrepareCriticalPages.js
*/
function main() {
	/** @type {import("./__global.js").Holder} */
	let holder={
		use() {}
	};
	holder.use();
	/** @arg {any} v */
	function any(v) {return v;}
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
	if(/youtube.com/) {
		cur.n=new CustomInputMatcher(/youtube.com/,() => location.origin);
		let bp_class=class {
			/**
			 * @param {any} a
			 * @param {any} b
			 */
			constructor(a,b) {
				this.a=a;
				this.b=b;
			}
		};
		let preparePage_breakpoint=new bp_class(`{
			let v=f.preparePage
			Object.defineProperty(f,'preparePage',{get:function(){debugger;return v},set:function(x){v=x}})
			false
		}
		/*atString(lazyPrepareCriticalPages).getObjectVar()==="f"*/`,'desktop_polymer.js');
		preparePage_breakpoint.a;
	}
	cur.f=function() {
		if(!debug) throw new Error("needs devtools open for debug function");
		if(!undebug) throw new Error("1");
		debug.u=undebug;
		debug=debug;
		/**
		 * @param {any[]} e
		 */
		function ts(e) {
			return e[0];
		}
		debug(ts,'e=[e[1]];0');
		let ret=ts([0,1]);
		console.log(ret);
		undebug(ts);
		if(ret!=1) {
			console.log('old_console_api');
			delete window.debug;
			return;
		}
		/**
		 * @param {debug} x
		 * @param {new () => any} func_obj
		 */
		function test_callback_root(x,func_obj) {
			let tst;
			if(x.fo_test) {
				tst=x.fo_test;
			} else {
				tst=new func_obj;
				x.fo_test=tst;
			}
			if(tst.is_open) {
				tst.abort();
				tst.is_open=false;
			}
			tst.open('GET',location.origin);
			tst.is_open=true;
			tst.send();
		};
		/**
		 * @param {string} a
		 * @param {"send"} n
		 * @param {(x: debug, func_obj: new () => any)=>void} test_callback
		 */
		function runner(a,n,test_callback) {
			if(!debug) throw new Error("needs devtools open for debug function");
			/**
			 * @param {{ [x: string]: () => void; }} proto
			 * @param {string} name
			 * @param {any} func_obj
			 * @param {(x: debug, func_obj: new () => any)=>void} test_callback
			 */
			function bp_proto(proto,name,func_obj,test_callback) {
				if(!debug) throw new Error("needs devtools open for debug function");
				let x=debug;
				x.f=proto[name];
				x.u(x.f);
				x(x.f,`
				{
					let __uf=Symbol(2),__get=function(__arg){try{return eval(__arg)}catch{return __uf}}
					{
						let x=debug
						try{
							if(x.cb)x.cb(__get)
						}catch(e){
							console.log('uerr',e)
						}
						x.u(x.f)
					}
				};0`);
				test_callback(x,func_obj);
			}
			/** @type {any} */
			let func_obj=window[a];
			let func_proto=func_obj.prototype;
			function native_callback() {
				if(!debug) throw new Error("needs devtools open for debug function");
				if(func_proto[n].toString().indexOf('[native code]')>-1) {
					class callback {
						constructor() {
							/** @type {{send():void}|null} */
							this.xmhrp=null;
						}
						/**
						 * @param {any} g_val
						 */
						run(g_val) {
							if(!this.xmhrp) throw new Error("Missing xmhrp value");
							this.r_get=g_val;
							console.log('ncb',func_proto[n],this.xmhrp[n]);
						}
					}
					debug.cb=new callback;
					bp_proto(func_proto,n,func_obj,function() {});
					return true;
				}
			}
			let ret=native_callback();
			if(ret) {
				return;
			}
			class callback {
				constructor() {
					/** @type {{send():void}|null} */
					this.xmhrp=null;
				}
				/**
				 * @param {(arg0: string) => { send(): void; } | null} g_val
				 */
				run(g_val) {
					this.get=g_val;
					this.xmhrp=g_val(a+'_prototype');
					if(!this.xmhrp) throw new Error("failed to get xmhrp from some prototype");
					let _xmhrp=func_obj.prototype;
					let xmhrp_send=this.xmhrp.send;
					let _xmhrp_send=_xmhrp.send;
					this.xmhrp.send=_xmhrp_send;
					_xmhrp.send=xmhrp_send;
					console.log('ntv_val',xmhrp_send);
					Promise.resolve().then(() => native_callback());
				}
			}
			debug.cb=new callback;
			bp_proto(func_proto,n,func_obj,test_callback);
		}
		/**
		 * @param {debug} x
		 * @param {new () => any} func_obj
		 */
		function do_test_callback_root(x,func_obj) {
			test_callback_root(x,func_obj);
		}
		runner('XMLHttpRequest','send',do_test_callback_root);
		return 'done';
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
	return cur;
	//# sourceURL=snippet:///%24_2
}
window.__ret=main();

/* spell:words
--- version_list item 2 ---
v1 (spl-f): snippet_repo_v2/javascript/final/youtube.com_lazyPrepareCriticalPages.js
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
		let sym=Symbol();
		var cur__class = {[sym]:cur};
		cur.self_sym=sym;
		cur.funcs=fnlist;
		cur.names=fnname;
	}
	if (/youtube.com/) {
		cur.n = new CustomInputMatcher(/youtube.com/,()=>location.origin);
		let bp_class = class {
			constructor(a, b) {
				this.a = a;
				this.b = b
			}
		}
		let preparePage_breakpoint = new bp_class(`{
			let v=f.preparePage;
			Object.defineProperty(f,'preparePage',{get:function(){debugger;return v},set:function(x){v=x}});
			false
		};
		/*atString(lazyPrepareCriticalPages).getObjectVar()==="f"*/`,'desktop_polymer.js');
	}
	cur.f = function() {
		debug.u = undebug;
		debug = debug;
		let ts = function(e) {
			return e[0]
		};
		debug(ts, 'e=[e[1]];0');
		let ret = ts([0, 1]);
		console.log(ret);
		undebug(ts);
		if (ret != 1) {
			console.log('old_console_api')
			delete debug;
			return
		}
		(function(a, n, test_callback) {
			function bp_proto(proto, name, func_obj, test_callback) {
				let x = debug;
				x.f = proto[name];
				x.u(x.f);
				x(x.f, `;
				{
					let __uf=Symbol(2),__get=function(__arg){try{return eval(__arg)}catch{return __uf}};
					{
						let x=debug;
						try{
							if(x.cb)x.cb(__get);
						}catch(e){
							console.log('uerr',e);
						}
						x.u(x.f)
					}
				};0`);
				test_callback(x, func_obj);
			}
			let func_obj = window[a];
			let func_proto = func_obj.prototype;
			function native_callback() {
				if (func_proto[n].toString().indexOf('[native code]') > -1) {
					debug.cb = function(g_val) {
						let x = this;
						x.r_get = g_val;
						console.log('ncb', func_proto[n], x.xmhrp[n]);
					}
					bp_proto(func_proto, n, func_obj, function() {});
					return true
				}
			}
			let ret = native_callback()
			if (ret) {
				return;
			}
			debug.cb = function(g_val) {
				let x = this;
				x.get = g_val;
				x.xmhrp = g_val(a + '_prototype');
				let _xmhrp = func_obj.prototype
				  , xmhrp_send = x.xmhrp.send
				  , _xmhrp_send = _xmhrp.send;
				x.xmhrp.send = _xmhrp_send;
				_xmhrp.send = xmhrp_send;
				console.log('ntv_val', xmhrp_send);
				Promise.resolve().then(e=>native_callback());
			}
			bp_proto(func_proto, n, func_obj, test_callback);
		}
		)('XMLHttpRequest', 'send', function(x, func_obj) {
			let tst;
			if (x.fo_test) {
				tst = x.fo_test;
			} else {
				tst = new func_obj
				x.fo_test = tst;
			}
			;if (tst.is_open) {
				tst.abort();
				tst.is_open = false;
			}
			tst.open('GET', location.origin);
			tst.is_open = true;
			tst.send();
		});
		return 'done';
	}
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
	cur.value=ret;
	return {...cur,_class:cur__class};
	//# sourceURL=snippet:///%24_2
}
window.__ret=main();

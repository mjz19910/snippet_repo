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
	cur.n = 'Hero_js'
	cur.f = function() {
		let mode = 'async_map_find'
		if (mode === 'it_find_func_scope') {
			undebug = undebug;
			debug = debug;
			debug.fn = game_objects.Player.instance.game.update;
			let dbg_src_url = '//' + '# sourceURL=snippet://js/js_1.js';
			debug(debug.fn, `
			window.out={};
			debug.get_from=function(e){return eval(e)};
			debug.g();
			undebug(debug.fn);
			` + dbg_src_url);
			let eok = (function() {
				"use strict";
				let src_url = '//' + '# ' + 'sourceURL=snippet://js/js_2.js';
				return eval(`function x(f_in,cb){
					if(cb){
						return class tb extends f_in{
							constructor(...a){
								super(...a)
								cb(this)
							}
						}
					}else{
						return class tt extends f_in {
							constructor(...a){
								super(...a);
								tt.instance=this;
							}
						}
					}${src_url}
				};x`)
			}
			)()
			class str_to_var {
				fel(...a) {
					try {
						let g = debug.get_from;
						let __nxs = String.fromCharCode(...a);
						if (__nxs == '0') {
							return true
						}
						;if (__nxs == 'i') {
							return true
						}
						;if (window[__nxs]) {
							console.log("skip_wind", __nxs);
							return true;
						}
						let __x = new Function(__nxs,"return " + __nxs);
						if (__x.length == 1) {
							__x = g("__x(" + __nxs + ")");
							if (__x !== undefined)
								out[__nxs] = __x;
						}
					} catch {}
				}
				fet(...a) {
					let __nxs = String.fromCharCode(...a);
					let __x = new Function(__nxs,"return " + __nxs);
					if (__x.length == 1) {
						return true;
					}
				}
				g() {
					var vvl = []
					for (var ji__ = 0; ji__ < 256; ji__++) {
						var kok = this.fet(ji__)
						if (kok) {
							vvl.push(ji__)
						}
					}
					var v2l = [];
					for (var ji__1 = 0; ji__1 < 256; ji__1++) {
						var kok = this.fet(ji__)
						if (kok) {
							v2l.push(ji__, ji__1)
						}
					}
					return [...vvl, ...v2l]
				}
			}
			window.func_want = eok;
			str_to_var = eok(str_to_var);
			let t = new str_to_var()
			debug.g = str_to_var.instance.g;
			return;
		}
		_player = game_objects.Player;
		game = game_objects.Player.instance.game;
		async function run() {
			"use strict";
			var static_part = eval(`(class {
			static ar=[];
			time=null;
			w=null;
			timeout=true;
		})`)
			class timeout_class extends static_part {
				constructor(time) {
					super();
					this.time = time;
					timeout_class.instance = this;
				}
				static do_back(iid) {
					var n = timeout_class.ar[iid];
					n.w();
					if (n.timeout) {
						timeout_class.ar.splice(iid, 1);
					}
				}
				static w_in(x) {
					var n = timeout_class.instance;
					n.w = x;
					var iid = timeout_class.ar.push(n) - 1
					timeout_class.instance = null;
					n.cint = setTimeout(timeout_class.do_back, timeout_class.time, iid)
				}
			}
			function w(t) {
				var c = new timeout_class(t);
				return new Promise(timeout_class.w_in)
			}
			if (game.dungeonHeroes.length < 6) {
				game.addHero(new game_objects['creature.Hero'](_player));
				await w(60);
			}
			let tx = 0;
			let tx_div = 3
			let to = [];
			let rr = new Map
			let cc = 0;
			let con = Symbol(0)
			let brk = Symbol(1)
			let a = [];
			let rf = (function(e, dz) {
				var ret = con;
				if (!rr.has(e.map)) {
					rr.set(e.map, e)
					e.map.setCounts();
					//console.log('t_new', dz,e.map.countFloors - e.map.countExplored);
					ret = brk;
				}
				var mp_no_exp = e.map.countFloors - e.map.countExplored;
				return [con, [mp_no_exp, e, dz]];
			}
			)
			let c = game.dungeonHeroes;
			for (let x = c.entries(), y = x.next(); y.done == false; y = x.next()) {
				let e = y.value;
				let d = e[0];
				let r = rf(e[1], d, c);
				let z = r[1];
				a[d] = z;
				if (z[0] > 0)
					console.log('h_info', z[0], z[2]);
				if (r[0] === brk) {
					await w(60);
				}
			}
			console.log('rr>', rr.size);
			a.forEach(function(e) {
				if (e[0] > (tx / tx_div)) {
					if (e[0] > tx)
						tx = e[0];
					to.push(e)
				}
			});
			let ll = []
			to = to.filter(e=>e[0] > (tx / tx_div));
			to.forEach(e=>{
				ll.push(e[0])
			}
			);
			ll.sort()
			if (ll.pop() > 3000) {
				tx_div = 4
			}
			let find_res_ar = a.filter(function(e) {
				return e[0] == tx
			});
			let find_res = find_res_ar[0];
			let find_id = find_res[2];
			let t = function(f, ...x) {
				f.dep = 0;
				return f.apply(null, [f, ...x])
			}
			let hero_deep = []
			let tx_ = t(function(f, e, ...x) {
				var oe = e;
				if (!e) {
					console.log(f.dep, 'undef', arguments.length);
					return []
				}
				e = e.slice(1)
				let ret = null;
				if (x[0]instanceof Array) {
					if (x.length > 1) {
						f.dep++
						ret = [...e, ...f(f, ...x.slice(0, x.length / 2)), ...f(f, ...x.slice(x.length / 2, x.length))];
						f.dep--
					} else {
						f.dep++
						ret = [...e, ...f(f, ...x)];
						f.dep--
					}
				} else {
					f.dep++
					ret = [...e, ...x]
					f.dep--
				}
				hero_deep.push(oe);
				return ret;
			}, ...to)
			let ss = Symbol('[')
			let sa = Symbol(',')
			let sb = Symbol(']')
			hero_deep = hero_deep.sort(function(a, b) {
				return a[0] - b[0]
			})
			game.dungeonHeroes = game.dungeonHeroes.sort((e,b)=>{
				let a = hero_deep.findIndex(t=>t[1] == e);
				let c = hero_deep.findIndex(t=>t[1] == b);
				if (c == -1) {
					c = 0
				}
				;if (a == -1) {
					a = 0
				}
				;if (c > a) {
					return 1
				}
				if (a > c) {
					return -1
				}
				if (c == a) {
					return 0
				}
			}
			);
			a = game.dungeonHeroes.map((e,dz)=>{
				//e.map.setCounts();
				let mp_no_exp = e.map.countFloors - e.map.countExplored;
				return [mp_no_exp, e, dz]
			}
			);
			find_res_ar = a.filter(function(e) {
				return e[0] == tx
			});
			ll = [];
			a.filter(e=>e[0] > (tx / tx_div)).map(e=>{
				ll.push(e[0]);
				return e.slice(1)
			}
			);
			find_res = find_res_ar[0];
			find_id = find_res[2];
			game.scrollDungeonHeroTo(find_id);
			return [ss, sb, find_id, tx, ss, ...tx_, sa, ...ll, sb, find_res];
		}
		return run();
	}
	/* cspell: disable-next-line */
	cur.n = "debug_js_call_konggames"
	cur.f = function() {
		let raw_str = function(d, ...s) {
			var str = d.raw[0];
			let x = 1;
			for (i of s) {
				str += i;
				str += d.raw[x++];
			}
			return str
		}
		var debug_class = class {
			constructor(state) {
				this.data = {};
				this.error_array = [];
				var id = Math.floor(Math.random() * (1 << (24)) * (1 << 8 + 8 + 4)).toString(16);
				let key = '_debugger_' + id;
				this.key = key;
				this.state = state;
				this.breakpoint_function_path = state.breakpoint_function_path
				if (state.sym) {
					this.sym = state.sym
				} else {
					this.sym = {};
					this.sym.abort = Symbol('abort')
					this.sym.error = Symbol('error')
					this.sym.success = Symbol('success')
					this.sym.failure = Symbol('failure')
					this.sym.debug = Symbol('debug')
					state.sym = this.sym;
				}
				state.info = [];
			}
			async clear(event_foward_function) {
				if (this.state.root) {
					var nop = function() {}
					this.event_foward_function = event_foward_function
					nop.call(null)
					await this.promise
					this.clear_root();
					if (this.next) {
						await this.next.clear();
						this.next = null;
					}
					return
				}
				var nop = function() {}
				Reflect.apply(this.breakpoint_function, nop, [])
				await this.promise;
			}
			run() {
				var t = this;
				var state = this.state;
				window[this.key] = this;
				if (state && !state.breakpoint_function) {
					let g = window
					let pth = this.breakpoint_function_path.split(".")
					for (let c; c = pth.shift(); ) {
						g = g[c]
					}
					state.breakpoint_function = g
				}
				this.breakpoint_function = state.breakpoint_function;
				this.failed_check = [];
				var make_internal_promise = function(a) {
					t.on_internal_callback = function(e) {
						a(e)
					}
				}
				this.internal_promise = new Promise(make_internal_promise)
				var make_promise = function(a) {
					t.on_breakpoint_clear = function(e) {
						a(e)
					}
				}
				var ret = new Promise(make_promise);
				this.promise = ret;
				this.on_page_unload = function() {
					if (t.has_breakpoint) {
						t.clear_breakpoint(null);
					}
				}
				window.addEventListener('unload', this.on_page_unload)
				if (this.in_callback) {
					console.log('not setting breakpoint in breakpoint')
				} else {
					this.set_breakpoint()
				}
			}
			callback(info) {
				x: {
					if (this.state.info && info.arg?.[1]?.[0] !== undefined && this.state.info.indexOf(info.arg[1][0]) > -1) {
						let arg_info = info.arg[1][0]
						let dbg_sym = this.sym.debug
						if (arg_info == dbg_sym) {
							let idx = this.state.info.indexOf(dbg_sym)
							this.state.info.splice(idx, 1)
							this.internal_result = info
							this.on_internal_callback(info)
						}
						return
					}
					if (this.failed_check.length > 256) {
						break x
					}
					if (info.m_this === Array.prototype.slice) {
						this.failed_check.push(info);
						console.log('1');
						return
					}
					if (info.m_this === Object.prototype.hasOwnProperty) {
						this.failed_check.push(info);
						console.log('2', ...info.arg);
						return
					}
					this.clear_breakpoint(info)
				}
			}
			clear_breakpoint(result) {
				var error;
				if (arguments.length < 1) {
					error = new Error("Not enough arguments")
				}
				if (result === undefined) {
					error = new Error("required argument 'result' is undefined")
				}
				if (error) {
					Error.captureStackTrace(error, this.clear_breakpoint)
					throw error;
				}
				if (this.event_foward_function) {
					this.event_foward_function('clear ' + this.key)
				} else {
					console.log('clear ' + this.key)
				}
				undebug(this.breakpoint_function);
				delete window[this.key];
				if (result !== null) {
					window.removeEventListener('unload', this.on_page_unload);
					this.result = result;
				}
				this.on_breakpoint_clear();
			}
			set_breakpoint() {
				console.log('set debug breakpoint', this.breakpoint_function);
				this.first = true;
				debug(this.breakpoint_function, this.get_breakpoint_string());
				this.has_breakpoint = true;
			}
			get_breakpoint_string() {
				var tmp = `
				x:{
					try{
						let function_path="${this.breakpoint_function_path}";
						let key_for_dbg="${this.key}";
						if(window[key_for_dbg]===undefined){
							if(function_path){
								console.log("Bad breakpoint","try undebug");
								undebug(new Function("return "+function_path));
							}
							console.log("Bad breakpoint");
							1;
							break x;
						}
						let _debugger=window[key_for_dbg]
						let info={m_this:this,arg:arguments};
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
						console.log('at_bp',e);
						1;
					}
				}
				`;
				var a = tmp.split("\n")
				var b = a.shift();
				var c = a.pop();
				var pad_str = a[0].match(/\s+/)?.[0]
				if (pad_str) {
					let t_len = pad_str.length
					for (var i = 0; i < a.length; i++) {
						a[i] = a[i].slice(t_len)
					}
				}
				if (!b) {
					let ul_p1 = 'snippet://dbg/dbg_bp.'
					var src_url = '//' + "# sourceURL=" + ul_p1 + this.state.depth + ".js";
					if (this.state.root)
						src_url = '//' + "# sourceURL=" + ul_p1 + "root.js";
					return ([...a, c, src_url]).join("\n");
				}
				return ([b, ...a, c]).join("\n")
				return tmp;
			}
		}
		function run_sync_code() {
			function dbg_init(pre_init, at_init, done_cb) {
				var state = pre_init()
				let _debugger = new debug_class(state);
				at_init(_debugger, state)
				_debugger.run();
				done_cb(_debugger, state)
				return _debugger;
			}
			let _debugger = dbg_init(function() {
				debug = debug
				undebug = undebug
				var state = {};
				state.breakpoint_function_path = "Function.prototype.call"
				state.root = true;
				state.depth = 0;
				return state
			}, function(_debugger, state) {
				var d_sym = _debugger.sym.debug
				state.info.push(d_sym)
				state.call_info = d_sym
			}, function(_debugger, state) {
				var nop = function() {}
				nop.call(null, [state.call_info])
				window.dz = _debugger;
				_debugger.clear_root = function() {
					delete window.dz;
				}
			});
			var promise_debugger = _debugger;
			_debugger.internal_promise.then(function(z) {
				console.log([z.scope_accessor]);
				if (promise_debugger.breakpoint_function.rep === undefined) {
					return
				}
				var access_res = z.scope_accessor('data')
				if (access_res[0] !== promise_debugger.sym.success) {
					promise_debugger.error_array.push(access_res[1])
					console.log('failure', access_res[0], Object.getPrototypeOf(access_res[1]).name + ":" + access_res[1].message)
					return
				}
				var ghost_tree = access_res[1].original;
				let r = dbg_init(function() {
					var state = {}
					Object.assign(state, promise_debugger.state)
					state.breakpoint_function_path = "Function.prototype.call"
					var original_sym = state.sym
					state.sym = {}
					Object.assign(state.sym, original_sym)
					state.depth++;
					debugger ;return state;
				}, function(_debugger, state) {
					state.breakpoint_function = ghost_tree.Function.prototype.call
				}, function(_debugger, state) {
					_debugger.data.ghost_tree = ghost_tree;
					promise_debugger.next = _debugger;
				});
				console.log(r);
				return r;
			});
			if (!_debugger.state.root)
				console.log(_debugger)
			return _debugger
		}
		var _debugger = window.dz
		if (_debugger) {
			var run_async_code = async function() {
				console.log('async clear')
				await _debugger.clear(e=>console.log(e));
				return run_sync_code()
			}
			var _promise = run_async_code();
			return _promise;
		}
		var result = run_sync_code()
		return result
	}
	cur.n = "reddit"
	cur.f = function() {
		//x: {
		//	break x;
		//	/* cspell: disable-next-line */
		//	document.querySelector("[id^='continueThread']").__reactInternalInstance$fh55rrshmcw
		//}
		var dom = document.body.children["2x-container"];
		dom = dom._reactRootContainer._internalRoot.current.child.child.child.child.child.child.child.child.child.child.child.child.child.child.child.child.child.child.child.child.child.child.stateNode
		var do_ar = Object.getOwnPropertyNames(dom);
		var react_ii = do_ar.find(e=>e.indexOf("__reactInternalInstance") == 0);
		window.react_ii = react_ii;
		(function(f) {
			f(f);
		}
		)(async function(f) {
			console.log('en');
			var get_dom = ()=>document.querySelector("[id^='continueThread']");
			var dom = get_dom();
			let count = 0;
			if (!dom) {
				dom = await new Promise(function(a) {
					count++;
					setTimeout(function t() {
						var c_dom = get_dom();
						if (c_dom) {
							a(c_dom);
							return
						}
						count++;
						if (count > 45) {
							var want = [...document.all].filter(e=>e[react_ii]).map(e=>e[react_ii]).filter(e=>e.key == 'commentsPaneWrapper').map(e=>e);
							if (want.length == 0) {
								cint = setTimeout(t, 33);
								return;
							}
							var w2 = want[0].stateNode.querySelectorAll('[target=_blank][rel]:not([id])');
							var a_link = w2.item(w2.length - 1)
							a_link.target = '';
							a_link.rel = '';
							a_link.href = a_link.href.replace("old.reddit.com", "reddit.com")
							a_link.click();
							cint = setTimeout(t, 12000);
							return
						}
						cint = setTimeout(t, 33);
					}, 33);
				}
				);
				console.log('wc', count);
			}
			var do_ar = Object.getOwnPropertyNames(dom);
			var root_new = dom[react_ii];
			window.root_new = root_new;
			function get_inner() {
				try {
					return root_new.child.sibling.child.child.child.child.child.child.child.child.child.child.child.stateNode;
				} catch {}
				return null;
			}
			count = 0;
			var n_dom = await new Promise(function(a) {
				function t() {
					var c_dom = get_inner();
					if (c_dom) {
						a(c_dom);
						return
					}
					count++;
					cint = setTimeout(t, 33);
				}
				t();
			}
			);
			console.log('wb', count);
			if (n_dom) {
				console.log('ts');
				return setTimeout(e=>{
					dom = get_dom();
					do_ar = Object.getOwnPropertyNames(dom);
					root_new = dom[react_ii];
					window.root_new = root_new;
					n_dom = get_inner();
					n_dom.click();
					window.inner_dom = n_dom;
					cint = setTimeout(function() {
						cint = f(f)
					}, 1500);
				}
				, 33)
			}

		});
		x: {
			let maybe=true;
			if(maybe){
				return
			}
		}
		var dom = document.querySelector("[id^='continueThread']")
		var do_ar = Object.getOwnPropertyNames(dom)
		var root_new = dom[do_ar.find(e=>e.indexOf("__reactInternalInstance") == 0)];
		let refs = [];
		function add_root(r) {
			if (typeof root_new != 'undefined') {
				r.push(root_new)
			} else {
				let x = document.body.children["2x-container"];
				let a = x._reactRootContainer;
				r.push(a._internalRoot);
			}
		}
		if (!window.refs) {
			window.refs = refs
			add_root(refs)
		} else {
			window.refs = refs
			add_root(refs)
		}
		for (let j = 0; j < 2; j++) {
			var s_refs = [];
			let rar = [];
			for (let i of refs) {
				rar.push(i)
			}
			console.log(rar.length);
			for (let i of rar) {
				if (typeof i == 'string') {
					continue;
				}
				s_refs.push(Object.entries(Object.getOwnPropertyDescriptors(i)).map(([n,e])=>{
					if (e.get || e.set) {
						var n = {};
						if (e.get)
							n.get = e.get;
						if (e.set)
							n.set = e.set;
						return [n, n]
					}
					var v = e.value;
					var f = false;
					function or(b) {
						f = f || b
					}
					or(typeof v == 'number');
					or(typeof v == 'function');
					or(typeof v == 'string');
					or(v === null);
					or(v === true || v === false);
					or(v === undefined);
					or(v instanceof Node);
					if (f) {
						return [n, v]
					}
					refs.indexOf(v) == -1 ? refs.push(v) : 0;
					return {
						n: n,
						r: refs.indexOf(v)
					}
				}
				))
			}
			console.log(j, s_refs.length)
		}
		window.sr = s_refs;
		return refs;
	}
	cur.n = "yet_another_merge_game";
	cur.f = function() {
		var lnc;
		if (!Function.func_log) {
			console.log("Wrong frame")
			return
		}
		if (Function.func_log.length < 3 && typeof cf == 'undefined') {
			console.log("Not called from main.js:633")
			do_cur.count = 8
			return
		}
		if (typeof cf == 'undefined') {
			fi_ob = Function.func_log[2].args;
			cf = Function.func_log[2].args[0].toString()
			if (Math.random() > 0.4) {
				do_cur.count++;
			}
		}
		fi_ob = Function.func_log[Function.func_log.length - 1].args;
		cf = Function.func_log[Function.func_log.length - 1].args[0].toString();
		console.log("el", cur._f.argv[0].split("\n")[3])
		var error_line = cur._f.argv[0].split("\n")[3]
		var line_func_info
		if (error_line.includes("eval at createFunction")) {
			line_func_info = error_line.split(/(\(.+\))/g)[1].slice(1, -1).split(/(\(.+\))/g)[2].slice(2).split(":")
		} else {
			debugger ;
		}
		lnc = line_func_info[2] - 1;
		var line_num_idx = line_func_info[1] - 1
		var fs_str = cf.split("\n")[line_num_idx];
		var d_idx = fs_str.indexOf(String.fromCharCode(125), lnc) + 2;
		var t_idx = fs_str.lastIndexOf(String.fromCharCode(123), lnc) - 1
		var e_js_call = d_idx
		console.log(fs_str.slice(t_idx, d_idx))
		for (var cc = 0; cc < 10; cc++) {
			let cv = fs_str.lastIndexOf(String.fromCharCode(123), t_idx);
			let c2 = fs_str.lastIndexOf(",", t_idx);
			if (c2 > cv) {
				cv = c2;
			}
			console.log(t_idx, fs_str.slice(cv + 1, d_idx))
			let oi = d_idx;
			d_idx = cv;
			if (fs_str.slice(cv - 1, d_idx) == String.fromCharCode(125)) {
				var t_idx = fs_str.lastIndexOf(String.fromCharCode(123), d_idx) - 1
				continue;
			}
			if (fs_str.slice(cv - 1, d_idx) == ",") {
				var t_idx = fs_str.lastIndexOf(String.fromCharCode(123), d_idx) + 1
				console.log(t_idx, cv + 1 == t_idx, fs_str.slice(t_idx, oi))
				if (cv + 1 == t_idx) {
					let c1 = fs_str.lastIndexOf(String.fromCharCode(123), t_idx - 1)
					let c2 = fs_str.lastIndexOf(",", t_idx - 1)
					let c3 = fs_str.lastIndexOf(String.fromCharCode(40), t_idx - 1)
					let cc = Math.min(c1, c2, c3)
					console.log(fs_str.slice(cc - 2, e_js_call))
					let can_try_again = true;
					let end_char = e_js_call;
					var ix_pc = function(n) {
						return fs_str.indexOf(n, end_char + 1);
					}
					var w_ext = {}
					w_ext._l = function(...a) {
						if (a.length > 0)
							Array._log("l", ...a)
						return {
							v: a
						};
					}
					w_ext._v = function(...a) {
						if (a.length > 0)
							Array._log("v", ...a)
						if (a.length == 1)
							return a[0];
						return a;
					}
					w_ext._c = function(...a) {
						if (a.length > 0)
							Array._log("c", ...a)
						return {
							v: a
						};
					}
					w_ext._e = function(...a) {
						/* cspell: disable */
						console.log("new Empty VNode", a.length)
						return {
							vnode: null
						}
						/* cspell: enable */
					}
					w_ext._s = function(...a) {
						return a
					}
					w_ext.getQuantumFoam = fi_ob[1].getQuantumFoam
					w_ext.matterThisPrestige = fi_ob[1].matterThisPrestige
					{
						let do_def = ["prestigeGame", "formatNumber", "getQFMilestoneInfo"]
						for (let i of do_def) {
							w_ext[i] = fi_ob[1][i];
						}
					}
					Array.tv = w_ext;
					with (w_ext) {
						Array._eval = function(s) {
							eval(s);
						}
					}
					for (var ov, i = 0; (ov = can_try_again,
					can_try_again = false,
					ov && i < 120); i++) {
						try {
							let events = fs_str.slice(cc - 2, end_char);
							console.log(fs_str.slice(cc - 2, end_char + 32))
							Array.s = events;
							Array._log = (...e)=>{
								console.log(...e)
							}
							if (!Array.s.includes("getQuantumFoam(matterThisPrestige).lte(0)")) {
								debugger ;
							}
							Array._log("Sl:", Array.s.length)
							Array._eval(Array.s)
							cf = void 0;
							if (!Array.s.includes("getQuantumFoam(matterThisPrestige).lte(0)")) {
								debugger ;
							}
							break
						} catch (e) {
							let is_token_error = e.message == "Invalid or unexpected token";
							let is_eoi_error = e.message == "Unexpected end of input";
							let aal = e.message.indexOf("after argument list") > 3;
							let kno_err = is_token_error || is_eoi_error || aal;
							if (kno_err) {
								can_try_again = true
								let c1 = ix_pc(String.fromCharCode(125));
								let c2 = Math.min(c1, ix_pc(String.fromCharCode(93)));
								c1 = Math.min(c2, ix_pc(String.fromCharCode(41)))
								end_char = c1
							}
							let ndi = e.message.indexOf(" is not defined")
							if (ndi > 0) {
								var s_name = e.message.slice(0, ndi)
								if (fi_ob[1][s_name]) {
									w_ext[s_name] = fi_ob[1][s_name]
									console.log("for VUE defined:", s_name)
									can_try_again = true;
								}
								//can_try_again=true
							}
							console.log(e.message);
						}
					}
					break
				} else {
					console.log(fs_str.slice(cv - 8, oi))
				}
			}
			console.log(t_idx, fs_str.slice(cv - 1, d_idx))
			break;
		}
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

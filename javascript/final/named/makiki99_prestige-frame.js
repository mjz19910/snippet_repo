/* spell:words makiki99
--- version_list item 2 ---
v1 (spl-f): snippet_repo_v2/javascript/final/makiki99_prestige-frame.js
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
	cur.n = new CustomInputMatcher("https://makiki99.github.io/prestige-frame/",()=>location.href);
	cur.f = function() {
		class IframeExt extends HTMLIFrameElement {
			constructor() {
				super();
			}
			get src() {
				return super.src;
			}
			set src(e) {
				switch (e) {
				case 'https://makiki99.github.io/prestige':
					this.width = 800;
					this.height = 424;
					break;
				case 'https://makiki99.github.io/metaprestige/':
					this.width = 800;
					this.height = 472;
					break;
				}
				super.src = e;
			}
			getClientCode(url) {
				return 0,
`x:{
if(activatePrestige.length==3){
nx_l=function(x,y,l){return nx_df(x,y,l,x,y,l+1)};nx_x=function(x,y,l){return nx_df(x,y,l,x+1,y,l)};nx_y=function(x,y,l){return nx_df(x,y,l,x,y+1,l)};nx_df=function(x1,y1,l1,x2,y2,l2){let ret,nx=getRequirement(x2,y2,l2);for(let i=0;i<=nx;i++){if (canActivatePrestige(x1,y1,l1)){activatePrestige(x1,y1,l1)}else{ret=[i,nx];break}};activatePrestige(x2,y2,l2);if(!ret)ret=[-1,nx];return ret};
}else{
nx_x=function(x,y){return nx_df(x,y,x+1,y)};nx_y=function(x,y){return nx_df(x,y,x,y+1)};nx_df=function(x1,y1,x2,y2){let ret,nx=getRequirement(x2,y2);for(let i=0;i<=nx;i++){if (canActivatePrestige(x1,y1)){activatePrestige(x1,y1)}else{ret=[i,nx];break}};activatePrestige(x2,y2);if(!ret)ret=[-1,nx];return ret};
}
};
if(activatePrestige.length==3){
al:for(let i=0;i<7;i++){let r=[...nx_x(0,0,0),...nx_y(0,0,0),...nx_l(0,0,0)];let zc=0,om=[];for(let y=0;y<r.length;y+=2){if(r[y]==0){zc++};om.push(r[y+1])};console.log(om,zc);if(zc===3){break}};
}else{
al:for(let i=0;i<6;i++){let r=[...nx_x(0,0),...nx_y(0,0)];let zc=0,om=[];for(let y=0;y<r.length;y+=2){if(r[y]==0){zc++};om.push(r[y+1])};console.log(om,zc);if(zc===2){break}};
}`
			}
		}
		Object.defineProperty(IframeExt.prototype, Symbol.toStringTag, {
			value: 'HTMLIFrameExtElement',
			configurable: true
		});
		window.IframeExt = IframeExt;
		fr = document.getElementById('frames');
		if (fr.rows.length == 0) {
			fr.insertRow();
		}
		frame_row = fr.rows[0];
		let make_cell = function(c_row) {
			if (c_row.cells.length == 0) {
				return c_row.insertCell();
			}
			return c_row.cells[c_row.cells.length - 1];
		}
		cd = make_cell(frame_row);
		function run_for_cell(cd) {
			[...cd.children].map(e=>e.remove());
		}
		run_for_cell(cd);
		if (customElements.get('iframe-ext')) {
			location.reload();
			return;
		}
		customElements.define('iframe-ext', IframeExt, {
			extends: "iframe"
		});
		let create_iframe_cell_for_url = function(url) {
			let frame_row = fr.insertRow();
			let cd = frame_row.insertCell();
			rr = document.createElement('iframe', {
				is: 'iframe-ext'
			});
			rr.src = url;
			cd.append(rr);
		}
		rr = document.createElement('iframe', {
			is: 'iframe-ext'
		});
		rr.src = 'https://makiki99.github.io/prestige';
		cd.append(rr);
		create_iframe_cell_for_url('https://makiki99.github.io/metaprestige/');
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

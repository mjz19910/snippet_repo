/* spell:words
--- version_list item 2 ---
v1 (cur): snippet_repo/javascript/final/lunar-atoms-tycoon.js
*/
function main() {
	/** @type {import("./__global.js").Holder} */
	let holder={
		use() {}
	};
	holder.use();
	var fnlist=[];
	var fnname=[];
	{
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
		var execute=function(/** @type {number} */ t,/** @type {{ (fn: any): void; (arg0: any): void; }} */ pre_exec,/** @type {((arg0: any) => void) | undefined} */ post_exec) {
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
			return;
		};
		class stt {
			static #unused=this.#init();
			static #init() {
				this.#unused;
			}
			static _f() {}
			static _n="<empty>";
			static n_on=true;
			static f_on=true;
		}
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
		var cur=class extends stt {
			static get f() {
				return this._f;
			}
			static set f(f) {
				let cur=this._ln;
				this._lf=f;
				if(fnlist.indexOf(this._lf)==-1) {
					add_func(this._ln,this._lf);
				}
				if(cur instanceof CustomInputMatcher&&typeof cur.test_string=='string') {
					let custom_str=cur.test_string;
					let needle=cur.test_needle;
					if(custom_str.match(needle)==null) {
						this._f=f;
						return;
					}
				}
				if(this.f_on) {
					this.f_on=false;
					this._f=f;
				}
			}
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
		var cur__class={[sym]: cur};
		cur.self_sym=sym;
		cur.funcs=fnlist;
		cur.names=fnname;
	}
	/* cspell: disable-next-line */
	cur.n="crazygames.com/game/lunar-atoms-tycoon";
	cur.f=function() {
		var etm=window.events;
		var e;
		var t=window.syms;
		e=etm;
		class Logger {
			/**
			 * @param {any[]} a
			 */
			log(...a) {
				console.log(...a);
			}
		}
		var logger=new Logger;
		t.root[t.log_sym]=logger;
		logger.log=console.log.bind(console);
		var event_info=e[134];
		window.event_info=event_info;
		var state=window.state;
		/*class_gen_scope*/ {
			/*class_scope*/ {
				t.data_arr.put=function(/** @type {{ [x: string]: any[][]; }} */ obj,/** @type {string | number} */ target,/** @type {string | any[]} */ cur) {
					var nv=cur.slice(1+this.off,cur[this.off]+1);
					/** @type {any[][]} */
					var arr_out=[];
					var cc=-1;
					for(let i=0;i<nv.length;i++) {
						if(nv[i] instanceof state.sym_null_class) {
							cc++;
							arr_out.push([]);
							arr_out[cc].push(nv[i]);
						} else {
							arr_out[cc].push(nv[i]);
						}
					}
					var arr_rep=arr_out.slice();
					for(cc=0;cc<arr_rep.length;cc++) {
						arr_rep[cc][0].array_put(arr_rep,cc,arr_rep[cc]);
					}
					obj[target]=arr_rep;
					var rest=cur.slice(cur[this.off]+1);
					if(rest.length>0)
						this[t.log_sym].log(rest);
					return cur[this.off]+1;
				};
			}
		}
		var x0=event_info[0].submit(event_info);
		let lnx="EventTarget";
		t.root[t.log_sym].log(lnx+" ".repeat(28-x0.str.length-lnx.length)+x0.str,...x0.arr);
		var x1=x0.arr[1][1];
		var y=Function.events[x1.__bound_event_id__];
		var x2=y[0].submit(y);
		lnx="Function";
		t.root[t.log_sym].log(lnx+" ".repeat(28-x2.str.length-lnx.length)+x2.str,...x2.arr);
		window.x2=x2;
		return 'done';
	};
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

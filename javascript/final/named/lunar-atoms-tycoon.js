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
	var cur__class={[cur.self_sym]: cur};
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

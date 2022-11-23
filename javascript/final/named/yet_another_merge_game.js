/* spell:words
--- version_list item 2 ---
v1 (cur): snippet_repo/javascript/final/yet_another_merge_game.js
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
		/** @type {((...x:any[])=>any)&{user_run_name:unknown;argv:any[]}} */
		_f=(function() {
			function x() {};
			x.user_run_name="";
			/** @type {any[]} */
			x.argv=[];
			return x;
		})();
		/** @type {(...x:any[])=>any} */
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
	let do_cur_count=0;
	cur.n="yet_another_merge_game";
	cur.f=function() {
		if(!('func_log' in Function)) throw new Error("1");
		if(!(Function.func_log instanceof Array)) throw new Error("1");
		var lnc;
		let cf;
		let fi_ob;
		if(!Function.func_log) {
			console.log("Wrong frame");
			return;
		}
		if(Function.func_log.length<3&&typeof cf=='undefined') {
			console.log("Not called from main.js:633");
			do_cur_count=8;
			console.log("cur_count",do_cur_count);
			return;
		}
		if(typeof cf=='undefined') {
			fi_ob=Function.func_log[2].args;
			cf=Function.func_log[2].args[0].toString();
			if(Math.random()>0.4) {
				do_cur_count++;
			}
		}
		fi_ob=Function.func_log[Function.func_log.length-1].args;
		cf=Function.func_log[Function.func_log.length-1].args[0].toString();
		if(!cur._f) throw 1;
		console.log("el",cur._f.argv[0].split("\n")[3]);
		var error_line=cur._f.argv[0].split("\n")[3];
		var line_func_info;
		if(error_line.includes("eval at createFunction")) {
			line_func_info=error_line.split(/(\(.+\))/g)[1].slice(1,-1).split(/(\(.+\))/g)[2].slice(2).split(":");
		} else {
			debugger;
		}
		lnc=line_func_info[2]-1;
		var line_num_idx=line_func_info[1]-1;
		var fs_str=cf.split("\n")[line_num_idx];
		var d_idx=fs_str.indexOf(String.fromCharCode(125),lnc)+2;
		var t_idx=fs_str.lastIndexOf(String.fromCharCode(123),lnc)-1;
		var e_js_call=d_idx;
		console.log(fs_str.slice(t_idx,d_idx));
		function _log_fn(/** @type {any} */ ...e) {
			console.log(...e);
		}
		for(var cc=0;cc<10;cc++) {
			let cv=fs_str.lastIndexOf(String.fromCharCode(123),t_idx);
			let c2=fs_str.lastIndexOf(",",t_idx);
			if(c2>cv) {
				cv=c2;
			}
			console.log(t_idx,fs_str.slice(cv+1,d_idx));
			let oi=d_idx;
			d_idx=cv;
			if(fs_str.slice(cv-1,d_idx)==String.fromCharCode(125)) {
				var t_idx=fs_str.lastIndexOf(String.fromCharCode(123),d_idx)-1;
				continue;
			}
			if(fs_str.slice(cv-1,d_idx)==",") {
				let t_idx=fs_str.lastIndexOf(String.fromCharCode(123),d_idx)+1;
				console.log(t_idx,cv+1==t_idx,fs_str.slice(t_idx,oi));
				if(cv+1==t_idx) {
					let c1=fs_str.lastIndexOf(String.fromCharCode(123),t_idx-1);
					let c2=fs_str.lastIndexOf(",",t_idx-1);
					let c3=fs_str.lastIndexOf(String.fromCharCode(40),t_idx-1);
					let cc=Math.min(c1,c2,c3);
					console.log(fs_str.slice(cc-2,e_js_call));
					let can_try_again=true;
					let end_char=e_js_call;
					function ix_pc(/** @type {string} */ n) {
						return fs_str.indexOf(n,end_char+1);
					}
					var w_ext={};
					w_ext._l=function(/** @type {any[]} */ ...a) {
						if(a.length>0) _log_fn("l",...a);
						return {
							v: a
						};
					};
					w_ext._v=function(/** @type {any[]} */ ...a) {
						if(a.length>0) _log_fn("v",...a);
						if(a.length==1)
							return a[0];
						return a;
					};
					w_ext._c=function(/** @type {any[]} */ ...a) {
						if(a.length>0) _log_fn("c",...a);
						return {
							v: a
						};
					};
					w_ext._e=function(/** @type {any[]} */ ...a) {
						/* cspell: disable */
						console.log("new Empty VNode",a.length);
						return {
							vnode: null
						};
						/* cspell: enable */
					};
					w_ext._s=function(/** @type {any} */ ...a) {
						return a;
					};
					w_ext.getQuantumFoam=fi_ob[1].getQuantumFoam;
					w_ext.matterThisPrestige=fi_ob[1].matterThisPrestige;
					{
						/** @type {["prestigeGame","formatNumber","getQFMilestoneInfo"]} */
						let do_def=["prestigeGame","formatNumber","getQFMilestoneInfo"];
						for(let i of do_def) {
							switch(i) {
								case 'formatNumber': {
									if(!(i in w_ext)) continue;
									w_ext[i]=fi_ob[1][i];
								} break;
								case 'getQFMilestoneInfo': {
									if(!(i in w_ext)) continue;
									w_ext[i]=fi_ob[1][i];
								} break;
								case 'prestigeGame': {
									if(!(i in w_ext)) continue;
									w_ext[i]=fi_ob[1][i];
								} break;
							}
						}
					}
					let wb_eval;
					// @ts-ignore
					with(w_ext) {
						function wb_eval_(/** @type {any} */ s) {
							eval(s);
						}
						wb_eval=wb_eval_;
					}
					for(var ov,i=0;(ov=can_try_again,
						can_try_again=false,
						ov&&i<120);i++) {
						try {
							let events=fs_str.slice(cc-2,end_char);
							console.log(fs_str.slice(cc-2,end_char+32));
							if(!events.includes("getQuantumFoam(matterThisPrestige).lte(0)")) {
								debugger;
							}
							_log_fn("Sl:",events.length);
							wb_eval(events);
							cf=void 0;
							if(!events.includes("getQuantumFoam(matterThisPrestige).lte(0)")) {
								debugger;
							}
							break;
						} catch(e) {
							if(!(e instanceof Error)) {
								console.error(e);
								break;
							}
							let is_token_error=e.message=="Invalid or unexpected token";
							let is_eoi_error=e.message=="Unexpected end of input";
							let aal=e.message.indexOf("after argument list")>3;
							let kno_err=is_token_error||is_eoi_error||aal;
							if(kno_err) {
								can_try_again=true;
								let c1=ix_pc(String.fromCharCode(125));
								let c2=Math.min(c1,ix_pc(String.fromCharCode(93)));
								c1=Math.min(c2,ix_pc(String.fromCharCode(41)));
								end_char=c1;
							}
							let ndi=e.message.indexOf(" is not defined");
							if(ndi>0) {
								var s_name=e.message.slice(0,ndi);
								if(fi_ob[1][s_name]) {
									w_ext[s_name]=fi_ob[1][s_name];
									console.log("for VUE defined:",s_name);
									can_try_again=true;
								}
							}
							console.log(e.message);
						}
					}
					break;
				} else {
					console.log(fs_str.slice(cv-8,oi));
				}
			}
			console.log(t_idx,fs_str.slice(cv-1,d_idx));
			break;
		}
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

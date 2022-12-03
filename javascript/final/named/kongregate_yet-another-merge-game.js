/* spell:words
--- version_list item 2 ---
v1 (cur): snippet_repo/javascript/final/kongregate_yet-another-merge-game.js
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
		str="";
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
	if("https://www.kongregate.com/games/cook1eegames/yet-another-merge-game") {
		/* cspell: disable-next-line */
		let rx=/https:\/\/www\.kongregate\.com\/games\/cook1eegames\/yet-another-merge-game/;
		//@cspell-enable
		let mx=() => location.origin+location.pathname;
		let mto=new CustomInputMatcher(rx,mx);
		cur.n=mto;
		mto.str="https://www.kongregate.com/games/cook1eegames/yet-another-merge-game";
	}
	cur.f=function() {
		let _function=function() {
			console.log('run');
			let do_zero_spawn_timer=false;
			if(do_zero_spawn_timer) {
				zero_spawn_timer();
			}
			function zero_spawn_timer() {
				game.spawnTime.cd=0;
			}
			if(window.cint)
				clearInterval(window.cint);
			if(window.citv)
				clearInterval(window.citv);
			window.citv=setInterval(function() {
				let g_u_maxObjects_int=Upgrade.apply(game.upgrades.maxObjects).toNumber();
				let g_mO_l=game.mergeObjects.length;
				if(g_mO_l>=g_u_maxObjects_int)
					return;
				let scd=game.spawnTime.cd;
				let scd_c=scd;
				for(;scd_c<30;)
					scd_c+=0.075;
				gameFunctions.decreaseSpawnCooldown(scd_c-scd);
			},100);
			window.cint=setInterval(function() {
				gameFunctions.maxUpgrades(game.matter,game.upgrades);
			},150);
			x: {
				let time_disabled=true;
				function time_main() {
					if(time_disabled) {
						return 0;
					}
					let tb=new Float64Array(1);
					function time_base() {
						let ps=performance.now();
						return performance.now()-ps;
					}
					function time_it() {
						let ps=performance.now();
						for(let i=0;i<8;i++) {
							tb[0]=0;
						}
						return performance.now()-ps;
					}
					let c=0
						,tc=1000;
					/**
					 * @param {number} tc
					 * @param {number} c
					 */
					function time_loop_1(tc,c) {
						for(let i=0;i<tc;i++)
							c+=time_it();
						return c;
					}
					/**
					 * @param {number} tc
					 * @param {number} c
					 */
					function time_loop_2(tc,c) {
						for(let i=0;i<tc;i++)
							c+=time_base();
						return c;
					}
					for(;c<120;) {
						c=time_loop_1(tc,0);
						console.log('time_2',c);
						tc*=2;
					}
					tc/=2;
					let ct=0;
					let cb=0;
					let tx=7;
					let carr=[];
					for(let i=0;i<tx;i++) {
						c=time_loop_1(tc,0);
						console.log('time_c1',c);
						c=time_loop_2(tc,0);
						console.log('time_c2',c);
					}
					for(let i=0;i<tx;i++) {
						c=time_loop_1(tc,0);
						carr.push(c);
						console.log('time_ct',c);
						ct+=c;
					}
					for(let i=0;i<tx;i++) {
						c=time_loop_2(tc,0);
						carr.push(c);
						console.log('time_cb',c);
						cb+=c;
					}
					let rt=ct-cb;
					let ret=(rt/tx)/tc;
					ret=ret*1000000;
					return ret;
				}
				let ret=time_main();
				return ret;
			}
		};
		if(document.gameiframe) {
			if(window.debugApi && 'asyncExecuteEval' in window.debugApi && typeof window.debugApi.asyncExecuteEval==='function') {
				return window.debugApi.asyncExecuteEval(document.gameiframe,_function);
			} else {
				throw new Error("Missing debugApi");
			}
		} else {
			if(top===window) {
				console.log('no document.gameiframe');
			}
		}
	};
	let ret;
	let debug_flag=false;
	if(top!==window) {
		if(debug_flag) console.log('restart on top frame');
		if(window.debugApi) {
			ret=window.debugApi.asyncExecuteFunction(top,main);
		} else {
			ret=Promise.reject(new Error("Missing debugApi"));
		}
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

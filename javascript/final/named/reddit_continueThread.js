/* spell:words
--- version_list item 2 ---
v1 (cur): snippet_repo/javascript/final/reddit_continueThread.js
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
		var cur=class {
			static do_cur() {
				throw new Error("Method not implemented.");
			}
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
	cur.n="reddit";
	cur.f=function() {
		var dom=document.body.children["2x-container"];
		dom=dom._reactRootContainer._internalRoot.current.child.child.child.child.child.child.child.child.child.child.child.child.child.child.child.child.child.child.child.child.child.child.stateNode;
		var do_ar=Object.getOwnPropertyNames(dom);
		var react_ii_=do_ar.find(e => e.indexOf("__reactInternalInstance")==0);
		if(!react_ii_) throw new Error("1");
		window.react_ii=react_ii_;
		let react_ii=react_ii_;
		/** @param {any} x */
		function any(x) {return x;}
		(function(/** @type {(arg0: any) => void} */ f) {
			f(f);
		}
		)(async function(/** @type {(arg0: any) => number | undefined} */ f) {
			console.log('en');
			var get_dom=() => document.querySelector("[id^='continueThread']");
			var dom=get_dom();
			let count=0;
			if(!dom) {
				dom=await new Promise(function(a,r) {
					if(!react_ii) return r(new Error("missing react_ii"));
					count++;
					setTimeout(function t() {
						if(!react_ii) return r(new Error("missing react_ii"));
						var c_dom=get_dom();
						if(c_dom)
							return a(c_dom);
						count++;
						if(count>45) {
							var want=[...any(document).all].filter(e => e[react_ii]).map(e => e[react_ii]).filter(e => e.key=='commentsPaneWrapper').map(e => e);
							if(want.length==0) {
								window.cint=setTimeout(t,33);
								return;
							}
							var w2=want[0].stateNode.querySelectorAll('[target=_blank][rel]:not([id])');
							var a_link=w2.item(w2.length-1);
							a_link.target='';
							a_link.rel='';
							a_link.href=a_link.href.replace("old.reddit.com","reddit.com");
							a_link.click();
							window.cint=setTimeout(t,12000);
							return;
						}
						window.cint=setTimeout(t,33);
					},33);
				}
				);
				console.log('wc',count);
			}
			if(!dom) throw new Error("1");
			var do_ar=Object.getOwnPropertyNames(dom);
			console.log(do_ar);
			var root_new=dom[react_ii];
			window.root_new=root_new;
			function get_inner() {
				try {
					return root_new.child.sibling.child.child.child.child.child.child.child.child.child.child.child.stateNode;
				} catch {}
				return null;
			}
			count=0;
			var n_dom=await new Promise(function(a) {
				function t() {
					var c_dom=get_inner();
					if(c_dom) {
						a(c_dom);
						return;
					}
					count++;
					window.cint=setTimeout(t,33);
				}
				t();
			}
			);
			console.log('wb',count);
			if(n_dom) {
				console.log('ts');
				return setTimeout(() => {
					dom=get_dom();
					if(!dom) throw new Error("1");
					do_ar=Object.getOwnPropertyNames(dom);
					root_new=dom[react_ii];
					window.root_new=root_new;
					n_dom=get_inner();
					n_dom.click();
					window.inner_dom=n_dom;
					window.cint=setTimeout(function() {
						window.cint=f(f);
					},1500);
				}
					,33);
			}

		});
		x: {
			let maybe=true;
			if(maybe) {
				return;
			}
		}
		var dom=document.querySelector("[id^='continueThread']");
		var do_ar=Object.getOwnPropertyNames(dom);
		var root_new=dom[do_ar.find(e => e.indexOf("__reactInternalInstance")==0)];
		let refs=[];
		/**
		 * @param {any[]} r
		 */
		function add_root(r) {
			if(typeof root_new!='undefined') {
				r.push(root_new);
			} else {
				let x=document.body.children["2x-container"];
				let a=x._reactRootContainer;
				r.push(a._internalRoot);
			}
		}
		if(!window.refs) {
			window.refs=refs;
			add_root(refs);
		} else {
			window.refs=refs;
			add_root(refs);
		}
		for(let j=0;j<2;j++) {
			var s_refs=[];
			let rar=[];
			for(let i of refs) {
				rar.push(i);
			}
			console.log(rar.length);
			/** @arg {[string, PropertyDescriptor]} arg0 @returns {['get_set', PropertyDescriptor]|['refs',string,number]|['or',string,any]} */
			function map_own_properties([n,e]) {
				if(e.get||e.set) {
					let n={};
					if(e.get)
						n.get=e.get;
					if(e.set)
						n.set=e.set;
					return ['get_set',n];
				}
				var v=e.value;
				var f=false;
				/** @param {boolean} b */
				function or(b) {f=f||b;}
				or(typeof v=='number');
				or(typeof v=='function');
				or(typeof v=='string');
				or(v===null);
				or(v===true||v===false);
				or(v===undefined);
				or(v instanceof Node);
				if(f) return ['or',n,v];
				if(refs.indexOf(v)==-1) {
					refs.push(v);
				}
				return ["refs",n,refs.indexOf(v)];
			}
			for(let i of rar) {
				if(typeof i=='string') {
					continue;
				}
				let own_properties=Object.getOwnPropertyDescriptors(i);
				let own_properties_entries=Object.entries(own_properties);
				let result=own_properties_entries.map(map_own_properties);
				s_refs.push(result);
			}
			console.log(j,s_refs.length);
		}
		window.s_refs=s_refs;
		return refs;
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

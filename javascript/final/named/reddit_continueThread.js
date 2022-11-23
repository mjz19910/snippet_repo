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
	cur.n="reddit";
	cur.f=function() {
		function get_dom() {
			return document.querySelector("[id^='continueThread']");
		}
		var dom=document.getElementById("2x-container");
		if(!dom) throw 1;
		if(!('_reactRootContainer' in dom)) throw 1;
		if(!(dom._reactRootContainer instanceof Object)) throw 1;
		class RedditNodeIter {
			/** @param {Object} node */
			constructor(node) {
				this.m_iter_node=node;
			}
			current() {
				if(!('current' in this.m_iter_node)) throw 1;
				if(!(this.m_iter_node.current instanceof Object)) throw 1;
				this.m_iter_node=this.m_iter_node.current;
				return this;
			}
			_internalRoot() {
				if(!('_internalRoot' in this.m_iter_node)) throw 1;
				if(!(this.m_iter_node._internalRoot instanceof Object)) throw 1;
				this.m_iter_node=this.m_iter_node._internalRoot;
				return this;
			}
		}
		let node_iter=new RedditNodeIter(dom._reactRootContainer);
		dom=root_container._internalRoot.current.child.child.child.child.child.child.child.child.child.child.child.child.child.child.child.child.child.child.child.child.child.child.stateNode;
		var do_ar=Object.getOwnPropertyNames(dom);
		var react_ii_=do_ar.find(e => e.indexOf("__reactInternalInstance")==0);
		if(!react_ii_) throw new Error("1");
		window.react_ii=react_ii_;
		let react_ii=react_ii_;
		(function(/** @type {(arg0: any) => void} */ f) {
			f(f);
		}
		)(async function(/** @type {(arg0: any) => number | undefined} */ f) {
			console.log('en');
			var dom=get_dom();
			let count=0;
			var n_dom;
			function ts_timeout_func() {
				dom=get_dom();
				if(!dom)
					throw new Error("1");
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
			n_dom=await new Promise(function(a) {
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
				return setTimeout(ts_timeout_func,33);
			}

		});
		{
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
					class xy {
						/** @param {PropertyDescriptor} e */
						constructor(e) {
							if(e.get)
								this.get=e.get;
							if(e.set)
								this.set=e.set;
						}
					}
					let n=new xy(e);
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

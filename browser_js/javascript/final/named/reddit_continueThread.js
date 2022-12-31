import {Runner} from "../support/Runner.js";

/* spell:words
--- version_list item 2 ---
v1 (cur): snippet_repo/javascript/final/reddit_continueThread.js
*/
function main() {
	/** @type {import("./__global.js")} */
	let holder=1;
	holder;
	/** @arg {any} v */
	function any(v) {return v;}
	let cur=new Runner;
	cur.n="reddit";
	cur.f=function() {
		function get_dom() {
			return document.querySelector("[id^='continueThread']");
		}
		var dom_0=document.getElementById("2x-container");
		if(!dom_0) throw 1;
		if(!('_reactRootContainer' in dom_0)) throw 1;
		if(!(dom_0._reactRootContainer instanceof Object)) throw 1;
		class RedditNodeIter {
			/** @arg {Object} node */
			constructor(node) {
				this.m_iter_node=node;
			}
			get current() {
				if(!('current' in this.m_iter_node)) throw 1;
				if(!(this.m_iter_node.current instanceof Object)) throw 1;
				this.m_iter_node=this.m_iter_node.current;
				return this;
			}
			get _internalRoot() {
				if(!('_internalRoot' in this.m_iter_node)) throw 1;
				if(!(this.m_iter_node._internalRoot instanceof Object)) throw 1;
				this.m_iter_node=this.m_iter_node._internalRoot;
				return this;
			}
			get child() {
				if(!('child' in this.m_iter_node)) throw 1;
				if(!(this.m_iter_node.child instanceof Object)) throw 1;
				this.m_iter_node=this.m_iter_node.child;
				return this;
			}
			get stateNode() {
				if(!('stateNode' in this.m_iter_node)) throw 1;
				if(!(this.m_iter_node.stateNode instanceof Object)) throw 1;
				this.m_iter_node=this.m_iter_node.stateNode;
				return this;
			}
			get_value() {
				return this.m_iter_node;
			}
		}
		let node_iter=new RedditNodeIter(dom_0._reactRootContainer);
		let dom_state_node=node_iter._internalRoot.current.child.child.child.child.child.child.child.child.child.child.child.child.child.child.child.child.child.child.child.child.child.child.stateNode.get_value();
		var do_ar=Object.getOwnPropertyNames(dom_state_node);
		var react_ii_=do_ar.find(e => e.indexOf("__reactInternalInstance")==0);
		if(!react_ii_) throw new Error("1");
		window.react_ii=react_ii_;
		/** @type {"__reactInternalInstance"} */
		let react_ii=any(react_ii_);
		(function(/** @type {(arg0: any) => void} */ f) {
			f(f);
		}
		)(async function(/** @type {(arg0: any) => number} */ f) {
			console.log('en');
			var dom=get_dom();
			let count=0;
			var n_dom;
			function ts_timeout_func() {
				dom=get_dom();
				if(!dom)
					throw new Error("1");
				do_ar=Object.getOwnPropertyNames(dom);
				if(!(react_ii in dom)) throw 1;
				/** @type {any} */
				let root_new_=dom[react_ii];
				root_new=root_new_;
				// window.root_new=root_new;
				n_dom=get_inner();
				if(!n_dom) throw 1;
				n_dom.click();
				// window.inner_dom=n_dom;
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
			if(!(react_ii in dom)) throw 1;
			class InternalInstanceType extends HTMLElement {
				get child() {return this;}
				get sibling() {return this;}
				get stateNode() {return this;}
			}
			/** @type {any} */
			var root_new_=dom[react_ii];
			/** @type {InternalInstanceType} */
			let root_new=root_new_;
			// window.root_new=root_new;
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
			return null;
		});
		{
			let maybe=true;
			if(maybe) {
				return;
			}
		}
		var dom_thread=document.querySelector("[id^='continueThread']");
		if(!dom_thread) throw 1;
		var do_ar=Object.getOwnPropertyNames(dom_thread);
		let found_name_=do_ar.find(e => e.indexOf("__reactInternalInstance")==0);
		if(!found_name_) throw 1;
		/** @type {"__reactInternalInstance"} */
		let found_name=any(found_name_);
		if(!(found_name in dom_thread)) throw 1;
		var root_new=dom_thread[found_name];
		/**
		 * @type {any[]}
		 */
		let refs=[];
		/**
		 * @arg {any[]} r
		 */
		function add_root(r) {
			if(typeof root_new!='undefined') {
				r.push(root_new);
			} else {
				let x=document.getElementById("2x-container");
				if(!x) throw 1;
				if(!('_reactRootContainer' in x)) throw 1;
				let a=x._reactRootContainer;
				if(!(a instanceof Object)) throw 1;
				if(!('_internalRoot' in a)) throw 1;
				r.push(a._internalRoot);
			}
		}
		if(!window.refs) {
			// window.refs=refs;
			add_root(refs);
		} else {
			// window.refs=refs;
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
						/** @arg {PropertyDescriptor} e */
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
				/** @arg {boolean} b */
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
		// window.s_refs=s_refs;
		return refs;
	};
	cur.value=cur.do_cur();
	return cur.make_ret();
	//# sourceURL=snippet:///%24_2
}
window.__ret=main();

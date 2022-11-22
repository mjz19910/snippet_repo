/* spell:words
--- version_list item 2 ---
v1 (cur): snippet_repo/javascript/final/ret_do_cur_debug_api/ret_do_cur_debugApi.js
*/
function main() {
	/** @type {any[]} */
	var fnlist=[];
	/** @type {any[]} */
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
		class CustomInputMatcher {
			/**
			 * @param {string} t_needle
			 * @param {any} string_getter
			 */
			constructor(t_needle,string_getter) {
				this.m_string_getter=string_getter;
				this.tr=t_needle;
			}
			get test_string() {
				return this.m_string_getter();
			}
			get test_needle() {
				return this.tr;
			}
		};
		var cur=class {
			static do_cur() {
				throw new Error("Method not implemented.");
			}
			/**
			 * @type {any}
			 */
			static _f;
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
			/**
			 * @type {any}
			 */
			static _n;
			static get n() {
				return this._n;
			}
			static set n(n) {
				let cur=n;
				if(cur instanceof CustomInputMatcher) {
					let custom_str=cur.test_string;
					let m_needle=cur.test_needle;
					if(typeof custom_str=='string') {
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

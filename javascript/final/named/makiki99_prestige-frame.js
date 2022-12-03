/* spell:words makiki99
--- version_list item 2 ---
v1 (cur): snippet_repo/javascript/final/makiki99_prestige-frame.js
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
		/** @type {((...x:any[])=>any)[]} */
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
	cur.n=new CustomInputMatcher("https://makiki99.github.io/prestige-frame/",() => location.href);
	cur.f=function() {
		class HTMLIFrameExt extends HTMLIFrameElement {
			get src() {
				return super.src;
			}
			set src(e) {
				switch(e) {
					case 'https://makiki99.github.io/prestige':
						this.width=""+800;
						this.height=""+424;
						break;
					case 'https://makiki99.github.io/metaprestige/':
						this.width=""+800;
						this.height=""+472;
						break;
				}
				super.src=e;
			}
		}
		Object.defineProperty(HTMLIFrameExt.prototype,Symbol.toStringTag,{
			value: 'HTMLIFrameExtElement',
			configurable: true
		});
		window.HTMLIFrameExt=HTMLIFrameExt;
		let fr=document.getElementById('frames');
		if(!fr) throw new Error("1");
		if(!(fr instanceof HTMLTableElement)) throw new Error("1");
		let fr_table=fr;
		if(fr.rows.length==0) {
			fr.insertRow();
		}
		let frame_row=fr.rows[0];
		/** @param {HTMLTableRowElement} c_row */
		function make_cell(c_row) {
			if(c_row.cells.length==0) {
				return c_row.insertCell();
			}
			return c_row.cells[c_row.cells.length-1];
		}
		let cd=make_cell(frame_row);
		/**
		 * @param {{ children: any; }} cd
		 */
		function run_for_cell(cd) {
			[...cd.children].map(e => e.remove());
		}
		run_for_cell(cd);
		if(customElements.get('iframe-ext')) {
			location.reload();
			return;
		}
		customElements.define('iframe-ext',HTMLIFrameExt,{
			extends: "iframe"
		});
		function create_iframe_cell_for_url(/** @type {string} */ url) {
			let frame_row=fr_table.insertRow();
			let cd=frame_row.insertCell();
			let rr=document.createElement('iframe',{
				is: 'iframe-ext'
			});
			rr.src=url;
			cd.append(rr);
		}
		let rr=document.createElement('iframe',{
			is: 'iframe-ext'
		});
		rr.src='https://makiki99.github.io/prestige';
		cd.append(rr);
		create_iframe_cell_for_url('https://makiki99.github.io/metaprestige/');
	};
	cur.value=cur.do_cur();
	return cur;
	//# sourceURL=snippet:///%24_2
}
window.__ret=main();

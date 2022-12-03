import {CustomInputMatcher} from "./CustomInputMatcher.js";

export class curTy {
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
		if(this.rx_lx) {
			i=this.names.indexOf(this.rx_lx);
		} else {
			i=this.names.indexOf(this.n);
		}
		if(i<0) {
			console.log("no function to run was matched");
			return null;
		}
		var _result=this.execute(i);
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
				return eval_func();
			} else {
				return func();
			}
		} finally {}
	}
	/**
	 * @param {string|CustomInputMatcher} name
	 * @param {((...x: any[]) => any)} func
	 */
	add_func(name,func) {
		var y=this.funcs.push(func);
		if(!(name instanceof CustomInputMatcher)) {
			if(this.names.indexOf(name)>-1)
				throw SyntaxError("Name conflict");
			var x=this.names.push(name);
			/** @template T @arg {T} _obj @returns {asserts _obj is {user_run_name?: string}}  */
			function assume_has_run_name(_obj) {}
			assume_has_run_name(func);
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
		if(this.funcs.indexOf(this._lf)==-1) {
			this.add_func(this._ln,this._lf);
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

import { CustomInputMatcher } from "./CustomInputMatcher.js";

export class Runner {
	/** @returns {{type:"runner",value:Runner}} */
	make_ret() {
		return {
			type: "runner",
			value: this,
		};
	}
	/** @type {(any[])|null} */
	argv = null;
	/** @type {string|CustomInputMatcher|null} */
	_ln = null;
	value = null;
	/** @type {((...x:any[])=>any)[]} */
	funcs = [];
	/** @type {string[]} */
	names = [];
	self_sym = Symbol();
	/** @arg {any[]} e */
	do_cur(...e) {
		let i;
		this.argv = e;
		if (this.rx_lx) {
			i = this.names.indexOf(this.rx_lx.result_name);
		} else {
			if (this.n instanceof CustomInputMatcher) {
				i = this.names.indexOf(this.n.result_name);
			} else if (typeof this.n === "string") {
				i = this.names.indexOf(this.n);
			} else {
				i = -1;
			}
		}
		if (i >= 0) return this.execute(i);
		return null;
	}
	/** @arg {number} t */
	execute(t) {
		const r_fn_name = this.names[t];
		const func = this.funcs[t];
		try {
			const sf = func.toString();
			if (sf.indexOf("/*arg_start*/") > -1) {
				let eval_func;
				{
					const func_split = sf.split(/(\/\*arg_start\*\/|\/\*arg_end\*\/)/);
					const no_head = func_split[4].trim().slice(1).trim().slice(1);
					let body = no_head.slice(0, no_head.length - 2);
					const is_strict_p1 = body.split('"use strict"');
					const is_strict = is_strict_p1.length > 1;
					if (is_strict) {
						body = is_strict_p1[1].trim();
					}
					const args = "/*arg_start*/" + func_split[2].trim() + "/*arg_end*/";
					const src_url = "//" + "# sourceURL=" + r_fn_name;
					let func_str;
					if (is_strict) {
						func_str =
							`"use strict";\nconsole.log("run ${r_fn_name}")\n${body}\n${src_url}`;
						eval_func = new Function(args, func_str);
					} else {
						func_str = `console.log("run ${r_fn_name}")\n${body}\n${src_url}`;
						eval_func = new Function(args, func_str);
					}
					if ("mc" in window && window.mc instanceof MessageChannel) {
						const mc = window.mc;
						mc.port2.onmessage = function () {};
						mc.port2.close();
						mc.port1.onmessage = function () {};
						mc.port1.close();
						delete window.mc;
						if (typeof mc != "undefined") {
							window.mc = undefined;
						}
					}
					console.log(
						"fi:",
						eval_func.name == "anonymous",
						"len:",
						eval_func.length,
					);
				}
				return eval_func();
			} else {
				return func();
			}
		} finally {
			//
		}
	}
	/** @arg {string|CustomInputMatcher} name @arg {((...x: any[]) => any)} func */
	add_func(name, func) {
		/** @template T @arg {T} _obj @returns {asserts _obj is {user_run_name?: string}}  */
		function assume_has_run_name(_obj) {}
		const y = this.funcs.push(func);
		if (!(name instanceof CustomInputMatcher)) {
			if (this.names.indexOf(name) > -1) {
				throw SyntaxError("Name conflict");
			}
			const x = this.names.push(name);
			assume_has_run_name(func);
			func.user_run_name = name;
			if (x != y) throw SyntaxError("unbalanced function or name number");
			return x;
		}
		console.log("handle add_func for", name);
		throw new Error("Unexpected type");
	}
	/** @type {((...x:any[])=>any)} */
	get f() {
		if (!this._f) throw new Error("no function to get");
		return this._f;
	}
	set f(f) {
		if (!this._ln) throw new Error("no last name");
		const cur = this._ln;
		this._lf = f;
		if (this.funcs.indexOf(this._lf) == -1) {
			this.add_func(this._ln, this._lf);
		}
		if (cur instanceof CustomInputMatcher) {
			const custom_str = cur.test_string;
			const needle = cur.test_needle;
			if (typeof custom_str == "string" && custom_str.match(needle) == null) {
				this._f = f;
				return;
			}
		}
		if (this.f_on) {
			this.f_on = false;
			this._f = f;
		}
	}
	/** @type {string|CustomInputMatcher|undefined} */
	get n() {
		return this._n;
	}
	/** @arg {string|CustomInputMatcher} n_value */
	set n(n_value) {
		if (n_value instanceof CustomInputMatcher) {
			const custom_str = n_value.test_string;
			const m_needle = n_value.test_needle;
			if (m_needle instanceof RegExp && typeof custom_str == "string") {
				const m_match = custom_str.match(m_needle);
				if (m_match == null) {
					this._ln = n_value.result_name;
					return;
				} else if (this.rx_off === undefined) {
					this.rx_off = true;
					this.rx_lx = n_value;
				}
			}
			if (typeof m_needle == "string" && custom_str != m_needle) {
				this._ln = n_value;
				return;
			}
		}
		this._ln = n_value;
		if (this.n_on) {
			this.n_on = false;
			this._n = n_value;
		}
	}
}

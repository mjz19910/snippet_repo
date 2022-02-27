import {RustSimpleParser} from "../../RustSimpleParser";
import {SimpleJavascriptParser} from "../../SimpleJavascriptParser";
import {static_event_target, random_data_generator} from "../../DebugAPI.user";

export class DebugAPI {
	next_remote_id = 0;
	data_store = new Map;
	event_handler = static_event_target;
	static simple_parser = new RustSimpleParser;
	static javascript_parser = new SimpleJavascriptParser;
	/**@type {DebugAPI|null} */
	static the_instance = null;
	/**@returns {DebugAPI} */
	static the() {
		if(!this.the_instance) {
			this.the_instance = new this;
		}
		return this.the_instance;
	}
	/**
	 * @param {string} key
	 */
	hasData(key) {
		return this.data_store.has(key);
	}
	/**
	 * @param {string} key
	 */
	getData(key) {
		return this.data_store.get(key);
	}
	/**
	 * @param {string} key
	 * @param {{}} value
	 */
	setData(key, value) {
		this.data_store.set(key, value);
		return this;
	}
	/**
	 * @param {string} key
	 */
	deleteData(key) {
		return this.data_store.delete(key);
	}
	/**
	 * @param {any} debug
	 * @param {any} undebug
	 * @param {any} func
	 * @param {any} name
	 */
	get_event_listener_var_vec_1(debug, undebug, func, name) {
		let __d = this.weak_root.deref();
		__d.attach(debug, undebug, null);
		/**
		 * @param {Function} func
		 * @param {any} f_this
		 * @param {ArrayLike<any>} c_args
		 */
		function do_activate(func, f_this, c_args) {
			try {
				return Reflect.apply(func, f_this, c_args);
			} catch {}
		}
		let activate = do_activate.bind(null, func, {}, [{
			get target() {
				throw 1;
			}
		}]);
		return __d.debuggerGetVar_a(func, activate, name);
	}
	/**
	 * @param {any} debug
	 * @param {any} undebug
	 * @param {any} getEventListeners
	 */
	attach(debug, undebug, getEventListeners) {
		//Attach to the chrome DebugApi functions the user specified.
		let obj_debug = this.getData('d');
		let obj_undebug = this.getData('u');
		let get_ev_lis = this.getData('getEventListeners');
		if(obj_debug !== debug || obj_undebug !== undebug || get_ev_lis !== getEventListeners) {
			this.setData('d', debug);
			this.setData('u', undebug);
			this.setData('getEventListeners', getEventListeners);
		}
		return this;
	}
	/**
	 * @param {new (arg0: any) => any} class_value
	 * @param {any} arg_vec
	 */
	activateClass(class_value, arg_vec) {
		return new class_value(...arg_vec);
	}
	/**
	 * @param {Function} function_value
	 * @param {any} target_obj
	 * @param {ArrayLike<any>} arg_vec
	 */
	activateApply(function_value, target_obj, arg_vec) {
		return Reflect.apply(function_value, target_obj, arg_vec);
	}
	debuggerBreakpointCode() {
		window.DebugAPI.the().getData("__k").get = (/** @type {string} */ __v) => {
			if(__v === '__v') {
				return {
					type: 'eval-hidden-var',
					data: null,
				};
			}
			try {
				return {
					type: 'var',
					data: [__v, eval(__v)]
				};
			} catch {
				return {
					type: 'no-var',
					data: null
				};
			}
		};
		{
			if(!window.DebugAPI.the().clearCurrentBreakpoint()) {
				console.log("failed to clear breakpoint");
			};
		}
		0;
	}
	clearCurrentBreakpoint() {
		let undebug;
		if(undebug = this.getData("u")) {
			undebug(this.current_function_value);
			return true;
		}
		return false;
	}
	/**
	 * @argument {Function} function_value
	 * @returns {string}
	*/
	stringifyFunction(function_value) {
		let function_code = function_value.toString();
		if(function_code.includes("{}"[0])) {
			function_code = function_code.slice(function_code.indexOf("{}"[0]));
		} else {
			console.log(function_code);
		}
		return function_code;
	}
	/**
	 * @param {any} function_value
	 * @param {{ (class_value: any, arg_vec: any): any; (function_value: any, target_obj: any, arg_vec: any): any; (arg0: any, arg1: any): any; }} activate
	 * @param {string} var_match
	 * @param {any[][]} activate_vec
	 */
	debuggerGetVarArray_a(function_value, activate, var_match, ...activate_vec) {
		if(!this.hasData("d") || !this.getData("u")) {
			return {
				type: 'invalid-state-error',
				data: null
			};
		}
		if(typeof function_value != 'function') {
			return {
				type: 'argument-error',
				data: null
			};
		}
		let ma = var_match.matchAll(/.-.|./g);
		let sr = [];
		let qs = [...ma].map(e => e[0]);
		for(let j of qs) {
			if(j.length === 1) {
				sr.push(j.charCodeAt(0));
				continue;
			}
			let fs = j.split('-');
			let sa = fs[0].charCodeAt(0);
			let se = fs[1].charCodeAt(0);
			for(let i = sa; i <= se; i++) {
				sr.push(i);
			}
		}
		let vars_arr = sr.map(e => String.fromCharCode(e));
		let rng_bytes = Array(5).fill('').map(() => random_data_generator.next_byte()).join('');
		let __y = this.event_handler;
		this.current_function_value = function_value;
		let breakpoint_code_string = this.stringifyFunction(this.debuggerBreakpointCode);
		let rep_arr = [];
		{
			rep_arr.push('__v', '__v_' + rng_bytes);
			rep_arr.push('__k', '__k_' + rng_bytes);
			rep_arr.push('__x', '__x_' + rng_bytes);
		}
		let tmp_key = '__k';
		{
			for(let i = 0; i < rep_arr.length; i += 2) {
				let cur0 = rep_arr[i];
				let cur1 = rep_arr[i] + 1;
				if(tmp_key === cur0) {
					tmp_key = cur1;
				}
				breakpoint_code_string = breakpoint_code_string.replaceAll(cur0, cur1);
			}
		}
		let tmp_value = {};
		this.setData(tmp_key, tmp_value);
		let debug = this.getData('d');
		debug(this.current_function_value, `${breakpoint_code_string}`);
		// ---- Activate ----
		let exec_return = activate(function_value, ...activate_vec);
		let exec_res_arr = [];
		if(tmp_value.get) {
			for(let j of vars_arr) {
				let res = tmp_value.get(j);
				let arg_index = -1;
				switch(res.type) {
					case 'var':
						exec_res_arr.push(res.data);
						break;
					case 'no-var':
						break;
					case 'eval-hidden-var':
						console.log('can\'t use dynamic eval for var hidden by eval argument "' + j + '"');
				}
			}
		}
		this.deleteData(tmp_key);
		if(exec_res_arr.length) {
			return {
				type: 'data',
				data: {
					result: exec_res_arr,
					return: exec_return
				}
			};
		}
		return {
			type: 'no-response',
			data: {
				result: null,
				return: exec_return
			}
		};
	}
	/**
	 * @param {any} class_value
	 * @param {any} target_arg_vec
	 * @param {any} var_match
	 */
	debuggerGetVarArray_c(class_value, target_arg_vec, var_match) {
		if(target_arg_vec instanceof Array) {
			return this.debuggerGetVarArray_a(class_value, this.activateClass, var_match, target_arg_vec);
		}
		return {
			type: 'argument-error',
			data: null
		};
	}
	/**
	 * @param {any} function_value
	 * @param {any} target_obj
	 * @param {any} target_arg_vec
	 * @param {any} var_match
	 */
	debuggerGetVarArray(function_value, target_obj, target_arg_vec, var_match) {
		if(target_arg_vec instanceof Array) {
			return this.debuggerGetVarArray_a(function_value, this.activateApply, var_match, target_obj, target_arg_vec);
		}
		return {
			type: 'argument-error',
			data: null
		};
	}
	/**
	 * @param {any} function_value
	 * @param {{ (class_value: any, arg_vec: any): any; (function_value: any, target_obj: any, arg_vec: any): any; (arg0: any, arg1: any): any; }} activate
	 * @param {any} var_name
	 * @param {any[][]} activate_vec
	 */
	debuggerGetVar_a(function_value, activate, var_name, ...activate_vec) {
		if(!this.hasData("d") || !this.getData("u")) {
			return {
				type: 'invalid-state-error',
				data: null
			};
		}
		if(typeof function_value != 'function') {
			return {
				type: 'argument-error',
				data: null
			};
		}
		let rng_bytes = Array(5).fill('').map(() => random_data_generator.next_byte()).join('');
		this.current_function_value = function_value;
		let dbg_str_func = this.stringifyFunction(this.debuggerBreakpointCode);
		let rep_arr = [];
		{
			rep_arr.push('__v', '__v_' + rng_bytes);
			rep_arr.push('__k', '__k_' + rng_bytes);
			rep_arr.push('__x', '__x_' + rng_bytes);
		}
		let map_arr = [dbg_str_func];
		let tmp_key = '__k';
		{
			for(let i = 0; i < rep_arr.length; i += 2) {
				let cur0 = rep_arr[i];
				let cur1 = rep_arr[i] + 1;
				if(tmp_key === cur0) {
					tmp_key = cur1;
				}
				map_arr[0] = map_arr[0].replaceAll(cur0, cur1);
			}
			dbg_str_func = map_arr[0];
		}
		let tmp_value = {};
		this.setData(tmp_key, tmp_value);
		this.getData('d')(this.current_function_value, `${dbg_str_func}`);
		// ---- Activate ----
		let activate_return = activate(function_value, ...activate_vec);
		let breakpoint_result = null;
		if(tmp_value.get) {
			breakpoint_result = tmp_value.get(var_name);
		}
		this.deleteData(tmp_key);
		if(breakpoint_result?.type === 'var') {
			return {
				type: 'data',
				data: {
					result: breakpoint_result.data,
					return: activate_return
				}
			};
		}
		if(breakpoint_result) {
			return {
				type: 'unexpected',
				data: {
					result: breakpoint_result,
					return: activate_return
				}
			};
		}
		return {
			type: 'no-response',
			data: {
				result: null,
				return: activate_return
			}
		};

	}
	/**
	 * @param {any} class_value
	 * @param {any} target_arg_vec
	 * @param {any} var_name
	 */
	debuggerGetVar_c(class_value, target_arg_vec, var_name) {
		if(typeof class_value != 'function') {
			return {
				type: 'argument-error',
				value: null
			};
		}
		if(target_arg_vec instanceof Array) {
			return this.debuggerGetVar_a(class_value, this.activateClass, var_name, target_arg_vec);
		}
		return {
			type: 'argument-error',
			value: null
		};
	}
	/**
	 * @param {any} function_value
	 * @param {any} target_obj
	 * @param {any} target_arg_vec
	 * @param {any} var_name
	 */
	debuggerGetVar(function_value, target_obj, target_arg_vec, var_name) {
		if(typeof function_value != 'function') {
			return {
				type: 'argument-error',
				value: null
			};
		}
		if(target_arg_vec instanceof Array) {
			return this.debuggerGetVar_a(function_value, this.activateApply, var_name, target_obj, target_arg_vec);
		}
		return {
			type: 'argument-error',
			value: null
		};
	}
}

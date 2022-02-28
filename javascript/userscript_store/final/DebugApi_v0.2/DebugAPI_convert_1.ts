import {random_data_generator, static_event_target} from "types/DebugAPI.user";
import {RustSimpleParser} from "../../RustSimpleParser";
import {SimpleJavascriptParser} from "../../SimpleJavascriptParser";
import {ActivateClassBox} from "./ActivateClassBox";
import {ClassArgs} from "./ClassArgs";
import {ClassCallbackArgs} from "./ClassCallbackArgs";
import {ApiData} from "./DebuggerInitData";
import {FnArgsObj} from "./FnArgsObj";
import {FunctionCallbackArgs} from "./FunctionCallbackArgs";
export class DebugAPI {
	next_remote_id = 0;
	data_store = new Map;
	event_handler = static_event_target;
	static simple_parser = new RustSimpleParser;
	static javascript_parser = new SimpleJavascriptParser;
	static the_instance: DebugAPI | null = null;
	static the(): DebugAPI {
		if(!this.the_instance) {
			this.the_instance = new this;
		}
		return this.the_instance;
	}
	root: DebugAPI | null = null;
	constructor(root: DebugAPI | null = null) {
		if(root) {
			this.root = root;
		} else {
			this.root = this;
		}
	}
	hasData(key: string) {
		return this.data_store.has(key);
	}
	getData(key: string) {
		return this.data_store.get(key);
	}
	setData(key: string, value: {}) {
		this.data_store.set(key, value);
		return this;
	}
	deleteData(key: string) {
		return this.data_store.delete(key);
	}
	get_event_listener_var_vec_1(debug: (to_dbg: () => void) => void, undebug: (to_un_dbg: () => void) => void, func: () => void, name: string) {
		let __d = this.root;
		if(!__d) {
			return {
				type: 'error',
				data: null
			};
		}
		__d.attach(debug, undebug, null);
		/**@type {FnArgsObj} */
		let pk_args: FnArgsObj = ['function', {}, []];
		/**@type {FunctionCallbackArgs} */
		let pk_activate_box: FunctionCallbackArgs = ['function', func, pk_args];
		/**@type {ApiData} */
		let dbg_data: ApiData = ['function', this.activate, pk_activate_box];
		return __d.debuggerGetVar_a(dbg_data, name);
	}
	attach(debug: any, undebug: any, getEventListeners: any) {
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
	activate(v: FunctionCallbackArgs | ClassCallbackArgs) {
		if(v[0] === 'function') {
			let [, target, rs] = v;
			let [, thisArgument, argumentsList] = rs;
			return Reflect.apply(target, thisArgument, argumentsList);
		} else {
			let [, target_type, rs] = v;
			let [, argumentsList] = rs;
			return Reflect.construct(target_type, argumentsList);
		}
	}
	debuggerBreakpointCode() {
		window.DebugAPI.the().getData("__k").get = (/** @type {string} */ __v: string) => {
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
			undebug(this.current_debug_data);
			return true;
		}
		return false;
	}
	/**
	 * @argument {Function} function_value
	 * @returns {string}
	*/
	stringifyFunction(function_value: Function): string {
		let function_code = function_value.toString();
		if(function_code.includes("{}"[0])) {
			function_code = function_code.slice(function_code.indexOf("{}"[0]));
		} else {
			console.log(function_code);
		}
		return function_code;
	}
	/**@type {ApiData | null} */
	current_debug_data: ApiData | null = null;
	/**
	 * @param {ApiData} debug_data
	 * @param {string} var_match
	 */
	debuggerGetVarArray_a(debug_data: ApiData, var_match: string) {
		let activate_fn_box, function_run_box;
		if(!this.hasData("d") || !this.getData("u")) {
			return {
				type: 'invalid-state-error',
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
			for(let i = sa;i <= se;i++) {
				sr.push(i);
			}
		}
		let vars_arr = sr.map(e => String.fromCharCode(e));
		let rng_bytes = Array(5).fill('').map(() => random_data_generator.next_byte()).join('');
		let __y = this.event_handler;
		if(debug_data[0] === 'class') {
			this.current_debug_data = debug_data;
		} else if(debug_data[0] === 'function') {
			this.current_debug_data = debug_data;
		} else {
			throw new Error("Invalid state");
		}
		let breakpoint_code_string = this.stringifyFunction(this.debuggerBreakpointCode);
		let rep_arr = [];
		{
			rep_arr.push('__v', '__v_' + rng_bytes);
			rep_arr.push('__k', '__k_' + rng_bytes);
			rep_arr.push('__x', '__x_' + rng_bytes);
		}
		let tmp_key = '__k';
		{
			for(let i = 0;i < rep_arr.length;i += 2) {
				let cur0 = rep_arr[i];
				let cur1 = rep_arr[i] + 1;
				if(tmp_key === cur0) {
					tmp_key = cur1;
				}
				breakpoint_code_string = breakpoint_code_string.replaceAll(cur0, cur1);
			}
		}
		let tmp_value = {
			/**@returns {{type:'no-var'|'eval-var'|null} | {type:'var', data:null}} */
			get(/**@type {string}*/_q: string): {type: 'no-var' | 'eval-var' | null;} | {type: 'var'; data: null;} {return {type: null};}
		};
		this.setData(tmp_key, tmp_value);
		let debug = this.getData('d');
		debug(this.current_debug_data[1], `${breakpoint_code_string}`);
		// ---- Activate ----
		let exec_return = null;
		if(this.current_debug_data[0] === 'class') {
			let [, p2, p3] = this.current_debug_data;
			let [t1, v1, v2] = p3;
			p2([t1, v1, v2]);
		} else if(this.current_debug_data[0] === 'function') {
			let [, p2, p3] = this.current_debug_data;
			let [t1, v1, v2] = p3;
			p2([t1, v1, v2]);
		}
		let exec_res_arr = [];
		if(tmp_value.get) {
			for(let j of vars_arr) {
				let res = tmp_value.get(j);
				if(!res) continue;
				let arg_index = -1;
				switch(res.type) {
					case null: continue;
					case 'var':
						exec_res_arr.push(res.data);
						break;
					case 'no-var':
						break;
					// TODO: `eval-hidden-var` -> `eval-var`
					case 'eval-var':
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
	debuggerGetVarArray_c(class_value: new (...a: ClassArgs) => {}, target_arg_vec: ClassArgs, var_match: string) {
		/**@type {ClassCallbackArgs} */
		let run_box: ClassCallbackArgs = ['class', class_value, ['class', target_arg_vec]];
		let data: ApiData = ['class', this.activate, run_box];
		return this.debuggerGetVarArray_a(data, var_match);
	}
	/**
	 * @param {ApiData} run_box
	 * @param {string} var_match
	 */
	debuggerGetVarArray(run_box: ApiData, var_match: string) {
		if(run_box[0] === 'function') {
			return this.debuggerGetVarArray_a(run_box, var_match);
		} else if(run_box[0] === 'class') {
			return this.debuggerGetVarArray_a(run_box, var_match);
		}
	}
	/**
	 * @param {ApiData} debug_data
	 * @param {string} var_name
	 */
	debuggerGetVar_a(debug_data: ApiData, var_name: string) {
		if(!this.hasData("d") || !this.getData("u")) {
			return {
				type: 'invalid-state-error',
				data: null
			};
		}
		let rng_bytes = Array(5).fill('').map(() => random_data_generator.next_byte()).join('');
		this.current_debug_data = debug_data;
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
			for(let i = 0;i < rep_arr.length;i += 2) {
				let cur0 = rep_arr[i];
				let cur1 = rep_arr[i] + 1;
				if(tmp_key === cur0) {
					tmp_key = cur1;
				}
				map_arr[0] = map_arr[0].replaceAll(cur0, cur1);
			}
			dbg_str_func = map_arr[0];
		}
		let tmp_value = {
			type: 'none',
			/**@arg {string} v */
			get(v: string) {
				return {
					type: 'none',
					data: null
				};
			}
		};
		this.setData(tmp_key, tmp_value);
		this.getData('d')(this.current_debug_data, `${dbg_str_func}`);
		let activate_return = null;
		// ---- Activate ----
		if(this.current_debug_data[0] === 'class') {
			let [, activate, p3] = this.current_debug_data;
			let [t1, v1, v2] = p3;
			activate_return = activate([t1, v1, v2]);
		} else if(this.current_debug_data[0] === 'function') {
			let [, activate, p3] = this.current_debug_data;
			let [t1, v1, v2] = p3;
			activate_return = activate([t1, v1, v2]);
		}
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
	 * @param {ApiData} class_value
	 * @param {string} var_name
	 */
	debuggerGetVar_c(class_value: ApiData, var_name: string) {
		if(typeof class_value != 'function') {
			return {
				type: 'argument-error',
				value: null
			};
		}
		return this.debuggerGetVar_a(class_value, var_name);
	}
	/**
	 * @param {ApiData} function_value
	 * @param {string} var_name
	 */
	debuggerGetVar(function_value: ApiData, var_name: string) {
		return this.debuggerGetVar_a(function_value, var_name);
	}
}

import {RustSimpleParser} from "../../RustSimpleParser";
import {SimpleJavascriptParser} from "../../SimpleJavascriptParser";
import {static_event_target, random_data_generator} from "../../DebugAPI.user";
/**
 * @typedef {['class', (v: ClassCallbackArgs) => any, ClassCallbackArgs] | ['function', (v: FunctionCallbackArgs) => any, FunctionCallbackArgs]} DebuggerInitData
 */

/**
 * @typedef {{type: 'function'; run: (v: FunctionCallbackArgs) => void}} ActivateFunctionBox
 * @typedef {{type: 'class'; run: (v: ClassCallbackArgs) => void}} ActivateClassBox
 * @typedef {ActivateFunctionBox | ActivateClassBox} ActivateBoxTypes
 */

/**
 * @typedef {['function', ActivateFunctionBox, FunctionCallbackArgs]} FnTypeAll
 */

/**
 * @typedef {['class', ActivateClassBox, ClassCallbackArgs]} ClassTypeAll
 */

/**
 * @typedef {'class'} ClassStr
 * @typedef {any[]} ClassArgs_x
 * @typedef {[type: 'class', args: ClassArgs_x]} ClassArgs
 * @typedef {[ClassStr, new (...v:ClassArgs[1])=>any]} ClassUnit
 * @typedef {[t:ClassStr, v: ClassCallbackArgs, a: ClassArgs[1]]} UseClass
 * @typedef {[type: 'class']} HCT
 * @typedef {{type:'class', run:(v:ClassCallbackArgs)=>void}} TargetClassType
 * 
 * @typedef {'function'} FnStr
 * @typedef {any[]} FnArgs_x
 * @typedef {[any, any[]]} UseFnB
 * @typedef {[FnStr, (...v:FnArgs_x) => void]} FnUnit
 * @typedef {[t:FnStr, v: FunctionCallbackArgs, a: FnArgs_x, o: any]} UseFn
 * @typedef {[type: 'function', obj:{}, args:any[]]} FunctionArgs
 * @typedef {[args: any[]]} HCV
 * @typedef {{type:'function', run:(v:FunctionCallbackArgs)=> void}} TargetFnType
 * 
 * 
 * @typedef {TargetClassType|TargetFnType} TargetType
 * @typedef {ClassUnit|FnUnit|null} AnyCallable
 * 
 * 
 *
 * @typedef {[t: 'class', r: any[]]} ClassArgsObj
 * @typedef {[t: 'function', o: {} | null, r: any[]]} FnArgsObj
 * @typedef {['class', new (...a:ClassArgsObj[1])=>{}, ClassArgsObj]} ClassCallbackArgs
 * @typedef {['function', (this:FnArgsObj[1], ...a:FnArgsObj[2])=>any, FnArgsObj]} FunctionCallbackArgs
 */

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
	/**@type {DebugAPI} */
	root;
	/**@arg {DebugAPI|null} root */
	constructor(root = null) {
		if(root) {
			this.root = root;
		} else {
			this.root = this;
		}
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
	 * @arg {(to_dbg:()=>void)=>void} debug @arg {(to_un_dbg:()=>void)=>void} undebug
	 * @arg {()=>void} func
	 * @arg {string} name
	 */
	get_event_listener_var_vec_1(debug, undebug, func, name) {
		let __d = this.root;
		__d.attach(debug, undebug, null);
		/**@type {FnArgsObj} */
		let pk_args=['function', {}, []];
		/**@type {FunctionCallbackArgs} */
		let pk_activate_box=['function', func, pk_args];
		/**@type {DebuggerInitData} */
		let dbg_data=['function', this.activate, pk_activate_box];
		return __d.debuggerGetVar_a(dbg_data, name);
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
	 * @arg {FunctionCallbackArgs | ClassCallbackArgs} v
	 */
	activate(v) {
		if(v[0] === 'function'){
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
			undebug(this.current_debug_data);
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
	/**@type {DebuggerInitData | null} */
	current_debug_data = null;
	/**
	 * @param {DebuggerInitData} debug_data
	 * @param {string} var_match
	 */
	debuggerGetVarArray_a(debug_data, var_match) {		
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
			for(let i = sa; i <= se; i++) {
				sr.push(i);
			}
		}
		let vars_arr = sr.map(e => String.fromCharCode(e));
		let rng_bytes = Array(5).fill('').map(() => random_data_generator.next_byte()).join('');
		let __y = this.event_handler;
		if(debug_data[0] === 'class') {
			this.current_debug_data = debug_data;
		} else if (debug_data[0] === 'function'){
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
			for(let i = 0; i < rep_arr.length; i += 2) {
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
			get(/**@type {string}*/_q) {return {type: null};}
		};
		this.setData(tmp_key, tmp_value);
		let debug = this.getData('d');
		debug(this.current_debug_data[1], `${breakpoint_code_string}`);
		// ---- Activate ----
		let exec_return = null;
		if(this.current_debug_data[0] === 'class') {
			let [, p2, p3]=this.current_debug_data;
			let [t1, v1, v2]=p3;
			p2([t1, v1, v2]);
		} else if(this.current_debug_data[0] === 'function') {
			let [, p2, p3]=this.current_debug_data;
			let [t1, v1, v2]=p3;
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
	/**
	 * @param {any} class_value
	 * @param {any} target_arg_vec
	 * @param {any} var_match
	 */
	debuggerGetVarArray_c(class_value, target_arg_vec, var_match) {
		if(target_arg_vec instanceof Array) {
			/**@type {ActivateClassBox} */
			let activate = {
				type: 'class',
				run: this.activate
			};
			/**@type {ClassCallbackArgs} */
			let run_box=['class', class_value, ['class', target_arg_vec]];
			return this.debuggerGetVarArray_a(['class', this.activate, run_box], var_match);
		}
		return {
			type: 'argument-error',
			data: null
		};
	}
	/**
	 * @param {DebuggerInitData} run_box
	 * @param {string} var_match
	 */
	debuggerGetVarArray(run_box, var_match) {
		if(run_box[0] === 'function'){
			return this.debuggerGetVarArray_a(run_box, var_match);
		} else if(run_box[0] === 'class') {
			return this.debuggerGetVarArray_a(run_box, var_match);
		}
	}
	/**
	 * @param {DebuggerInitData} debug_data
	 * @param {string} var_name
	 */
	debuggerGetVar_a(debug_data, var_name) {
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
		let tmp_value = {
			type:'none',
			/**@arg {string} v */
			get(v) {
				return {
					type:'none',
					data:null
				};
			}
		};
		this.setData(tmp_key, tmp_value);
		this.getData('d')(this.current_debug_data, `${dbg_str_func}`);
		let activate_return = null;
		// ---- Activate ----
		if(this.current_debug_data[0] === 'class') {
			let [, activate, p3]=this.current_debug_data;
			let [t1, v1, v2]=p3;
			activate_return = activate([t1, v1, v2]);
		} else if(this.current_debug_data[0] === 'function') {
			let [, activate, p3]=this.current_debug_data;
			let [t1, v1, v2]=p3;
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
	 * @param {DebuggerInitData} class_value
	 * @param {string} var_name
	 */
	debuggerGetVar_c(class_value, var_name) {
		if(typeof class_value != 'function') {
			return {
				type: 'argument-error',
				value: null
			};
		}
		return this.debuggerGetVar_a(class_value, var_name);
	}
	/**
	 * @param {DebuggerInitData} function_value
	 * @param {string} var_name
	 */
	debuggerGetVar(function_value, var_name) {
		return this.debuggerGetVar_a(function_value, var_name);
	}
}

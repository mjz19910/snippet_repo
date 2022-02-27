import {ScriptStateHost} from "../ScriptStateHost";
import {is_in_ignored_from_src_fn, is_in_userscript, is_in_userscript_fn, cur_event_fns} from "../rebuild_the_universe_auto_typed_v0.2";
import {get_nearest_script} from "./get_nearest_script";

export function find_all_scripts_using_string_apis(): [typeof scripts_weak_arr, typeof register_obj_with_registry] {
	let scripts = new WeakSet;
	let scripts_holders = [];
	type TokenPtr = {
		token: symbol;
	};

	type TokenType = {
		key: symbol;
		ref: WeakRef<TokenPtr>;
	};

	let scripts_tokens: (TokenType | null)[] = [];
	type WeakFinalInfo = {
		key: symbol;
		id: number;
		ref: WeakRef<any>;
	};

	let scripts_weak_arr: (WeakFinalInfo | null)[] = [];
	let script_registry: FinalizationRegistry<unknown>;
	let script_id = 1;
	window.is_in_ignored_fn = function() {
		return is_in_ignored_from_src_fn;
	};
	ScriptStateHost.event_target.addEventListener((e: any) => {
		is_in_userscript = false;
	});
	function type_verify_extract<T>(val: null[] | T[]): val is T[] {
		return true;
	}
	function retype_arr<T>(in_val: null[] | T[]): T[] | null {
		if(type_verify_extract<T>(in_val)) {
			return in_val;
		}
		return null;
	}
	function register_obj_with_registry(obj: any) {
		let obj_id;
		let scripts_res: WeakFinalInfo[] = [];
		for(let i = 0;i < scripts_weak_arr.length;i++) {
			let elem = scripts_weak_arr[i];
			if(elem !== null) {
				scripts_res.push(elem);
			}
		}
		let obj_ref = scripts_weak_arr.find((e: null | {ref: {deref: () => any;};}) => e && e.ref.deref() === obj);
		if(obj_ref) {
			obj_id = obj_ref.id;
			return obj_id;
		}
		obj_id = script_id;
		script_id++;
		let held_obj = {
			type: 'held',
			id: obj_id,
			key: Symbol(obj_id)
		};
		let token_sym = {token: Symbol(-obj_id)};
		scripts_holders.push(held_obj);
		scripts_tokens.push({key: held_obj.key, ref: new WeakRef(token_sym)});
		scripts_weak_arr.push({
			key: held_obj.key,
			id: obj_id,
			ref: new WeakRef(obj)
		});
		script_registry.register(obj, held_obj, token_sym);
		return obj_id;
	}
	function replace_cb_with_safe_proxy(args: any[], index: number) {
		let value = args[index];
		if(index && args && value instanceof Function) {
			if(is_in_userscript) {
				value.is_userscript_fn = true;
			}
			if(is_in_userscript_fn) {
				value.is_userscript_fn = true;
			}
			if(document.currentScript) {
				value.reg_id = register_obj_with_registry(document.currentScript);
			}
			args[index] = new Proxy(value, {
				apply(...a) {
					let ret;
					let should_reset = false;
					cur_event_fns.push(a[0]);
					let idx = cur_event_fns.indexOf(a[0]);
					if(a[0].is_userscript_fn) {
						is_in_ignored_from_src_fn = true;
						if(is_in_userscript_fn === false) {
							is_in_userscript_fn = true;
							should_reset = true;
						}
					}
					try {
						ret = Reflect.apply(...a);
					} finally {
						if(should_reset) {
							is_in_userscript_fn = false;
							should_reset = false;
						}
						is_in_ignored_from_src_fn = false;
						delete cur_event_fns[idx];
					}
					delete cur_event_fns[idx];
					return ret;
				}
			});
			args = [];
			index = -1;
		}
		value = null;
	}
	EventTarget.prototype.addEventListener = new Proxy(EventTarget.prototype.addEventListener, {
		apply(...a) {
			// this will always be EventTarget.prototype.addEventListener (the real one)
			// let target_fn=a[0];
			cur_event_fns.push(a[0]);
			let idx = cur_event_fns.indexOf(a[0]);
			let target_obj = a[1];
			let call_args = a[2];
			replace_cb_with_safe_proxy(call_args, 1);
			// ignore any calls from this script
			if(!is_in_userscript) {
				debugger;
				console.log(target_obj, call_args);
			}
			let ret;
			try {
				ret = Reflect.apply(...a);
			} finally {
				delete cur_event_fns[idx];
			}
			delete cur_event_fns[idx];
			return ret;
		}
	});
	window.requestAnimationFrame = new Proxy(requestAnimationFrame, {
		apply(...a) {
			// let target_obj = a[1];
			let call_args = a[2];
			replace_cb_with_safe_proxy(call_args, 0);
			return Reflect.apply(...a);
		}
	});
	window.proxy_set = [];
	window.proxy_set.push(EventTarget.prototype.addEventListener);
	Promise.prototype.then = new Proxy(Promise.prototype.then, {
		apply(...a) {
			// let target_obj = a[1];
			let call_args = a[2];
			replace_cb_with_safe_proxy(call_args, 0);
			replace_cb_with_safe_proxy(call_args, 1);
			return Reflect.apply(...a);
		}
	});
	function str_index_of_inject() {
		let cur_script = get_nearest_script();
		if(cur_script === void 0) {
			if(is_in_ignored_from_src_fn)
				return;
			if(!is_in_userscript)
				throw new Error("No");
			// a userscript is running
			return;
		}
		let had_script = scripts.has(cur_script);
		if(!had_script) {
			try {
				scripts.add(cur_script);
			} catch(e) {
				debugger;
			}
			let id = register_obj_with_registry(cur_script);
			console.log('new registry id', id);
		}
		if(!had_script) {
			if(cur_script.src.includes("opentracker")) {
				cur_script.remove();
				cur_script = null;
				throw new Error("No tracking");
			}
			console.log(cur_script);
		}
		cur_script = null;
	}
	String.prototype.indexOf = new Proxy(String.prototype.indexOf, {
		apply(...a) {
			str_index_of_inject();
			return Reflect.apply(...a);
		}
	});
	type CleanupType = {
		arr_key: any;
	};

	script_registry = new FinalizationRegistry(function cleanup(held: CleanupType) {
		let arr_key = held.arr_key;
		let weak_state_index = scripts_weak_arr.findIndex(e => e && e.key === arr_key);
		let token_index = scripts_tokens.findIndex(e => e && e.key === arr_key);
		if(weak_state_index === -1) {
			console.log('prev gc', held);
		}
		let token = null;
		let weak_state = null;
		if(token_index > -1)
			token = scripts_tokens[token_index];
		if(weak_state_index > -1)
			weak_state = scripts_weak_arr[weak_state_index];
		console.log('gc', weak_state_index, token_index, arr_key, token, weak_state);
		scripts_weak_arr[weak_state_index] = null;
		scripts_tokens[token_index] = null;
	});
	return [scripts_weak_arr, register_obj_with_registry];
}

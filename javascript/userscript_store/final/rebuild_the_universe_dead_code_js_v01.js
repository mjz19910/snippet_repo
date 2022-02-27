/**@arg {string[]} arr @arg {string} key */
export function does_array_include(arr, key) {
	return arr.includes(key);
}
/**@typedef {import("../rebuild_the_universe_auto_typed_v0.2.js").AsyncTrigger} AsyncTriggerT */
/**@implements {AsyncTriggerT} */
class AsyncTrigger {
	m_set_flag;
	/**
	 * @type {null}
	 */
	trigger_handler;
	promise_set;
	/**
	 * @type {(value: any) => void}
	 */
	m_set_result;
	/**
	 * @type {(arg0?: any) => void}
	 */
	m_set_error;
	/**
	 * @type {((value: any) => void)|null}
	 */
	m_notify_result = null;
	/**
	 * @type {((arg0?: any) => void)|null}
	 */
	m_notify_error = null;
	constructor() {
		this.notify_promise = null;
		this.m_set_flag = true;
		this.trigger_handler = null;
		this.m_can_notify = false;
		/**@type {null| ((value: any) => void)} */
		let accept_fn = null;
		/**@type {null | ((reason?: any) => void)} */
		let reject_fn = null;
		this.promise_set = new Promise((accept, reject) => {
			accept_fn = accept;
			reject_fn = reject;
		});
		if(accept_fn && reject_fn) {
			this.m_set_result = accept_fn;
			this.m_set_error = reject_fn;
		} else {
			this.m_set_result = this.default_accept.bind(this);
			this.m_set_error = this.default_reject.bind(this);
		}
		this.m_set_flag = false;
	}
	/**
	 * @param {any} _value
	 */
	default_accept(_value) {
		return;
	}
	/**
	 * @param {any} error
	 */
	default_reject(error) {
		throw error;
	}
	/**
	 * @param {any} cnt
	 */
	set(cnt) {
		if(!this.m_set_flag) {
			this.m_set_result(cnt);
			this.m_set_flag = true;
		}
	}
	/**
	 * @param {any} opt_error
	 */
	set_error(opt_error) {
		if(!this.m_set_flag) {
			if(opt_error) this.m_set_error(opt_error);
			else this.m_set_error(null);
		}
	}
	async wait() {
		let ret = this.promise_set;
		return ret;
	}
	/**
	 * @param {any} cnt
	 */
	notify(cnt) {
		if(this.m_can_notify && this.m_notify_result) {
			this.m_notify_result(cnt);
			this.m_can_notify = false;
		}
	}
	/**
	 * @param {any} error
	 */
	notify_error(error) {
		if(this.m_can_notify && this.m_notify_error) {
			this.m_notify_error(error);
			this.m_can_notify = false;
		}
	}
	async notified() {
		let t = this;
		this.notify_promise = new Promise(function(accept, reject) {
			t.m_notify_result = accept;
			t.m_notify_error = reject;
		});
		this.m_can_notify = true;
	}
}
export class AsyncSemaphore {
	constructor() {
		/**@type {any[]} */
		this.notify_waiters_vec = [];
		this.count = 0;
	}
	/**@arg {number} cnt */
	async inc(cnt) {
		let wait_trigger = new AsyncTrigger;
		while(this.count > 0) {
			if(!this.notify_waiters_vec.includes(wait_trigger)) {
				this.notify_waiters_vec.push(wait_trigger);
			}
			await wait_trigger.wait();
			wait_trigger.notify(cnt);
		}
		this.count += cnt;
	}
	/**@arg {number} cnt */
	async dec(cnt) {
		this.count -= cnt;
		if(this.count <= 0) {
			do {
				let waiter = this.notify_waiters_vec.shift();
				if(!waiter) break;
				waiter.set(cnt);
				let used_count = await waiter.notified();
				cnt -= used_count;
			} while(cnt > 0);
		}
	}
}
/**
 * @this {any[]}
 * @param {any} e
 * @param {number} i
 */
export function map_to_tuple(e, i) {
	return [e, this[i]];
}
export class VMReturnsBoxedPromiseR {
	/**@type {"function_box"} */
	type = "function_box";
	/**@type {"promise"} */
	return_type = "promise";
	/**@type {"value"} */
	await_type = "value";
	/**@arg {"function"} _to_match */
	get_matching_typeof(_to_match) {
		return null;
	}
	/**@arg {any} value */
	constructor(value) {
		this.value = value;
	}
}
/**@typedef {import("types/vm/instruction/mod.js").InstructionType} InstructionType */
class VMTemplateImpl {
	/** @arg {InstructionType} instruction */
	execute_instruction(instruction) {
		switch(instruction[0]) {
			default: {
				console.log('execute', instruction[0], instruction.slice(1));
			} break;
		}
	}
}
export class VMTemplate extends VMTemplateImpl {
	/**
	 * @param {InstructionType} instruction
	 */
	execute_instruction(instruction) {
		switch(instruction[0]) {
			default/*Base class*/: super.execute_instruction(instruction); break;
		}
	}
}
export class IndexAccessBox {
	/**@type {"object_index"} */
	type = "object_index";
	/**@type {"value"} */
	index_type = "value";
	/**@type {import("types/vm/IndexAccess.js").default<Box>} */
	value;
	/**@arg {'function'} _to_match */
	get_matching_typeof(_to_match) {
		return null;
	}
	/**@arg {import("types/vm/IndexAccess.js").default<Box>} value */
	constructor(value) {
		this.value = value;
	}
}
/**@type {<T extends {}>(o:T)=>o is T} */
function can_be_object(v) {
	if(v === null) {
		return false;
	}
	if(typeof v === 'object') {
		return true;
	}
	return false;
}
/**@type {<T>(v:T)=>({} & T)|null} */
export function as_object_or_null(v) {
	if(can_be_object(v)) {
		return v;
	}
	return null;
}
/**@typedef {import("types/vm/box/mod.js").ExtractKey<Box, 'value'>} BoxInner */
/**@typedef {import("types/vm/box/mod.js").Box} Box */
class BaseBox {
	/**@type {'object_box'} */
	type = "object_box";
	/**@type {'BaseBox'} */
	from = "BaseBox";
	/**@type {BoxInner['value']} */
	value;
	/**@arg {string} v */
	as_type(v) {
		if(typeof this.value === v) {
			return this;
		}
		return null;
	}
	/**@arg {BoxInner} value */
	constructor(value) {
		switch(typeof value) {
			case 'string':this.value = value; break;
			case 'number':
			case 'bigint': this.value = value; break;
			case 'boolean':
			case 'symbol':
				this.value = value;
				break;
			case 'undefined':
				this.value = value;
				break;
			case 'object': this.value = value; break;
			case 'function':
				this.value = value;
			default: this.value = value; break;
		}
		this.value = value;
	}
	/**@arg {'object'|'function'} to_match */
	as_box(to_match) {
		if(typeof this.value === to_match) return this;
		return null;
	}
}
export class VMIndexedCallableValueR extends BaseBox {
	/**@type {"object_box"} */
	type = "object_box";
	/**@type {'function'} */
	extension = 'function';
	/**@type {"callable_box"} */
	index_type = "callable_box";
}
export class EmptyArrayBoxImpl {
	/**@type {"array_box"} */
	type = "array_box";
	/**@arg {'function'|'object'} type */
	as_type(type) {
		if(typeof this.value === type) {
			return this;
		}
		return null;
	}
	/**@arg {[]} v */
	constructor(v) {
		this.value = v;
	}
}
export class ArrayBoxImpl {
	/**@type {"array_box"} */
	type = "array_box";
	/**@type {"value"} */
	item_type = "value";
	/**
	 * @param {'function'} _typeof_val
	 */
	as_type(_typeof_val) {
		return null;
	}
	/**@arg {Box[]} value */
	constructor(value) {
		this.value = value;
	}
}
/**@type {<T extends {}>(v:T, k:keyof T)=>v is {[U in keyof T]:T[U]}} */
function does_have_property(v, k) {
	if(v.hasOwnProperty(k)) return true;
	if(v[k] !== void 0) return true;
	return false;
}
/**@type {<T, F>(v:T, k:(v:T)=>F)=>v is (T & F)} */
function does_have_property_as_type(v, k) {
	let rr = v && k;
	void rr;
	return true;
}
/**
* @type {<T, F>(v:T, k:(v:T)=>F)=>T|null}
*/
export function with_has_property_as_type(v, k) {
	if(does_have_property_as_type(v, k)) return v;
	return null;
}
/**@type {<A extends {}, B extends A>(o:B, k:keyof A)=>{[T in keyof A]:A[T]}|null} */
export function with_has_property(o, k) {
	if(does_have_property(o, k)) {
		return o;
	}
	return null;
}
/**@type {<T extends {[K in keyof T]:T[K]}>(q:T)=>q is {[K in keyof T]:T[K]}} */
function can_cast_indexed(q) {
	if(q)return true;
	return true;
}
/**@type {<T extends {}>(...v:[T, keyof T])=>T|null} */
export function as_indexed(value) {
		if(can_cast_indexed(value)){
			return value;
		}
	return null;
}
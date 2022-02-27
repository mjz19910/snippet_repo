/**@arg {string[]} arr @arg {string} key */
function does_array_include(arr, key){
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
	m_notify_result=null;
	/**
	 * @type {((arg0?: any) => void)|null}
	 */
	m_notify_error=null;
	constructor(){
		this.notify_promise = null;
		this.m_set_flag = true;
		this.trigger_handler = null;
		this.m_can_notify = false;
		/**@type {null| ((value: any) => void)} */
		let accept_fn=null;
		/**@type {null | ((reason?: any) => void)} */
		let reject_fn=null;
		this.promise_set = new Promise((accept, reject) => {
			accept_fn = accept;
			reject_fn = reject;
		});
		if(accept_fn && reject_fn){
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
	default_accept(_value){
		return;
	}
	/**
	 * @param {any} error
	 */
	default_reject(error){
		throw error;
	}
	/**
	 * @param {any} cnt
	 */
	set(cnt){
		if(!this.m_set_flag){
			this.m_set_result(cnt);
			this.m_set_flag=true;
		}
	}
	/**
	 * @param {any} opt_error
	 */
	set_error(opt_error){
		if(!this.m_set_flag){
			if(opt_error) this.m_set_error(opt_error);
			else this.m_set_error(null);
		}
	}
	async wait(){
		let ret=this.promise_set;
		return ret;
	}
	/**
	 * @param {any} cnt
	 */
	notify(cnt){
		if(this.m_can_notify && this.m_notify_result){
			this.m_notify_result(cnt);
			this.m_can_notify=false;
		}
	}
	/**
	 * @param {any} error
	 */
	notify_error(error){
		if(this.m_can_notify && this.m_notify_error){
			this.m_notify_error(error);
			this.m_can_notify=false;
		}
	}
	async notified(){
		let t=this;
		this.notify_promise=new Promise(function(accept, reject){
			t.m_notify_result=accept;
			t.m_notify_error=reject;
		});
		this.m_can_notify=true;
	}
}
class AsyncSemaphore {
	constructor(){
		/**@type {any[]} */
		this.notify_waiters_vec=[];
		this.count=0;
	}
	/**@arg {number} cnt */
	async inc(cnt){
		let wait_trigger=new AsyncTrigger;
		while(this.count > 0){
			if(!this.notify_waiters_vec.includes(wait_trigger)){
				this.notify_waiters_vec.push(wait_trigger);
			}
			await wait_trigger.wait();
			wait_trigger.notify(cnt);
		}
		this.count+=cnt;
	}
	/**@arg {number} cnt */
	async dec(cnt){
		this.count-=cnt;
		if(this.count <= 0){
			do{
				let waiter=this.notify_waiters_vec.shift();
				if(!waiter)break;
				waiter.set(cnt);
				let used_count=await waiter.notified();
				cnt-=used_count;
			} while(cnt > 0);
		}
	}
}
/**
 * @this {any[]}
 * @param {any} e
 * @param {number} i
 */
function map_to_tuple(e, i){
	return [e, this[i]];
}
/**@typedef {import("../types/SimpleVMTypes.js").CallableReturnPromiseBox} VMReturnsBoxedPromise */
/**@implements {VMReturnsBoxedPromise} */
class VMReturnsBoxedPromiseR {
	/**@type {"function_box"} */
	type="function_box"
	/**@type {"promise"} */
	return_type="promise";
	/**@type {"value"} */
	await_type="value";
	/**@arg {"function"} _to_match */
	get_matching_typeof(_to_match) {
		return null;
	}
	/**@arg {VMReturnsBoxedPromise['value']} value */
	constructor(value){
		this.value=value;
	}
}
/**@typedef {import("types/SimpleVMTypes.js").InstructionType} InstructionType */
class VMTemplateImpl {
		/** @arg {InstructionType} instruction */
		execute_instruction(instruction){
			switch(instruction[0]){
				default:{
					console.log('execute', instruction[0], instruction.slice(1));
				} break;
			}
		}
	}
	class VMTemplate extends VMTemplateImpl {
		/**
		 * @param {InstructionType} instruction
		 */
		execute_instruction(instruction){
			switch(instruction[0]) {
				default/*Base class*/:super.execute_instruction(instruction);break;
			}
		}
	}

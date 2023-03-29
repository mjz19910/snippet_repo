import {UniqueIdGenerator} from "./ns.js";
import {
	ReplyClearSingle,
	ReplySetRepeating,
	ReplySetSingle,
	TIMER_REPEATING,
	TIMER_SINGLE,
	TIMER_TAG_COUNT
} from "./constants.js";
import {DispatchMessageType} from "./constant_types.js";
import {
	TimeoutClearStrings,
	TimeoutSetStrings
} from "./interfaces.js";
import {SetMessageData} from "./SetMessageData.js";
import {TimerApi} from "./TimerApi.js";
import {TimerState} from "./TimerState.js";
import {TimerTag} from "./TimerTag.js";
import {WorkerApi} from "./WorkerApi.js";

export class Timer {
	id_generator;
	m_remote_id_to_main_state_map: any;
	m_api_map;
	m_api_info: TimerApi;
	weak_worker_state: WeakRef<WorkerApi>|null;
	m_remote_id_to_state_map: Map<number|string,TimerState>;
	constructor(id_generator: UniqueIdGenerator,api_info: TimerApi) {
		this.id_generator=id_generator;
		this.m_remote_id_to_state_map=new Map;
		this.weak_worker_state=null;
		this.m_api_map=new Map;
		this.m_api_info=api_info;
		this.set_api_names(api_info.set_names,api_info.clear_names);
	}
	set_map_names(names: TimerApi['set_names']|TimerApi['clear_names']) {
		this.m_api_map.set(names.single,window[names.single]);
		this.m_api_map.set(names.repeating,window[names.repeating]);
	}
	base_id: number|undefined;
	set_api_names(set: TimeoutSetStrings,clear: TimeoutClearStrings) {
		this.set_map_names(set);
		this.set_map_names(clear);
		this.base_id=window[set.single](() => {});
		window[clear.single](this.base_id);
		this.id_generator.set_current(this.base_id);
	}
	set_worker_state(worker_state_value: any) {
		this.weak_worker_state=new WeakRef(worker_state_value);
	}
	// If you cause any side effects, please
	// wrap this call in try{}finally{} and
	// revert all side effects...
	verify_tag(tag: TimerTag) {
		if(!this.validate_tag(tag)) {
			throw new Error("Verify failed in Timer.verify_tag");
		}
	}
	verify_state(state: TimerState,remote_id: number) {
		if(!this.weak_worker_state)
			return;
		if(!this.validate_state(state)) {
			let worker_state=this.weak_worker_state.deref();
			if(!worker_state)
				return;
			worker_state.postMessage({
				t: this.m_api_info.msg_types.worker.clear.any,
				v: remote_id
			});
			throw new Error("Verify failed in Timer.verify_timer_state");
		}
	}
	validate_tag(tag: TimerTag) {
		if(tag!=TIMER_SINGLE&&tag!=TIMER_REPEATING) {
			console.assert(false,"Assertion failure in Timer.validate_tag: tag=%o is out of range");
			console.info("Info: range is TIMER_SINGLE to TIMER_TAG_COUNT-1 (%o...%o-1)",tag,TIMER_SINGLE,TIMER_TAG_COUNT);
			return false;
		}
		return true;
	}
	validate_state(state: TimerState) {
		return this.validate_tag(state.type);
	}
	fire(tag: TimerTag,remote_id: number) {
		let state=this.get_state_by_remote_id(remote_id);
		if(!state) {
			this.force_clear(tag,remote_id);
			return;
		}
		if(!this.weak_worker_state)
			return;
		try {
			if(state.active) {
				if(state.target_fn instanceof Function) {
					state.target_fn.apply(null,state.target_args);
				} else {
					let fn=new Function(state.target_fn);
					state.target_fn=fn;
					state.target_fn.apply(null,state.target_args);
				}
			}
		} finally {
			if(tag===TIMER_SINGLE) {
				state.active=false;
				this.clear(tag,remote_id);
			}
			let worker_state=this.weak_worker_state.deref();
			if(!worker_state)
				return;
			worker_state.postMessage({
				t: this.m_api_info.msg_types.worker.reply.fire.single,
				v: remote_id
			});
		}
	}
	set(tag: TimerTag,target_fn: TimerHandler,timeout: number|undefined,target_args: any) {
		let remote_id=this.id_generator.next();
		let is_repeating=false;
		this.verify_tag(tag);
		if(tag===TIMER_REPEATING) {
			is_repeating=true;
		}
		if(typeof timeout==='string') {
			let tmp_timeout=parseInt(timeout,10);
			if(!Number.isNaN(tmp_timeout)) {
				timeout=tmp_timeout;
			} else {
				timeout=30;
			}
		}
		if(!timeout||timeout<0)
			timeout=0;
		let state=new TimerState(tag,is_repeating,target_fn,target_args,timeout);
		this.store_state_by_remote_id(state,remote_id);
		this.send_worker_set_message(tag,{
			t: remote_id,
			v: timeout
		});
		return remote_id;
	}
	send_worker_set_message(tag: TimerTag,obj: SetMessageData) {
		if(!this.weak_worker_state)
			return;
		let worker_state=this.weak_worker_state.deref();
		if(!worker_state) {
			console.assert(false,'tried to send_worker_message, but the gc collected the worker_state, referenced with a WeakRef (weak_worker_state)');
			return;
		}
		let msg_id=(tag => {
			switch(tag) {
				case TIMER_SINGLE: return this.m_api_info.msg_types.worker.set.single;
				case TIMER_REPEATING: return this.m_api_info.msg_types.worker.set.repeating;
			}
		})(tag);
		if(!msg_id) {
			console.assert(false,'Unknown timer_tag',tag);
			console.info('TypeError like: let v:TIMER_SINGLE|TIMER_REPEATING (%o|%o) = %o',TIMER_SINGLE,TIMER_REPEATING,tag);
			return;
		}
		worker_state.postMessage({
			t: msg_id,
			v: obj
		});
	}
	is_state_stored_by_remote_id(remote_id: number) {
		return this.m_remote_id_to_state_map.has(remote_id);
	}
	get_state_by_remote_id(remote_id: number) {
		let state=this.m_remote_id_to_state_map.get(remote_id);
		if(!state)
			return null;
		this.verify_state(state,remote_id);
		return state;
	}
	store_state_by_remote_id(state: TimerState,remote_id: number) {
		this.m_remote_id_to_state_map.set(remote_id,state);
	}
	delete_state_by_remote_id(remote_id: number) {
		this.m_remote_id_to_state_map.delete(remote_id);
	}
	remote_id_to_state_entries() {
		return this.m_remote_id_to_state_map.entries();
	}
	on_result(result: DispatchMessageType) {
		console.log(result);
		debugger;
		switch(result.t) {
			case this.m_api_info.msg_types.worker.clear.single: {
				let remote_id=result.v;
				if(!remote_id)
					return;
				this.delete_state_by_remote_id(remote_id);
				break;
			}
			case this.m_api_info.msg_types.worker.clear.repeating: {
				let remote_id=result.v;
				if(!remote_id)
					return;
				this.delete_state_by_remote_id(remote_id);
				break;
			}
			default:
				console.assert(false,'on_result timer_result_msg needs a handler for',result.t);
		}
	}
	on_reply(result: DispatchMessageType) {
		switch(result.t) {
			case this.m_api_info.msg_types.worker.clear.single: {
				debugger;
				let remote_id=result.v;
				this.delete_state_by_remote_id(remote_id);
				break;
			}
			case this.m_api_info.msg_types.worker.clear.repeating: {
				debugger;
				let remote_id=result.v;
				this.delete_state_by_remote_id(remote_id);
				break;
			}
			case ReplySetSingle: {
				//debugger
			} break;
			case ReplySetRepeating: {
				// debugger
			} break;
			case ReplyClearSingle: {
				debugger;
			} break;
			default:
				console.log('reply',result);
				console.assert(false,'on_result msg needs a handler for',result);
				debugger;
		}
	}
	force_clear(tag: TimerTag,remote_id: number) {
		if(!this.weak_worker_state)
			return;
		this.verify_tag(tag);
		let worker_state=this.weak_worker_state.deref();
		if(!worker_state)
			return;
		let state=this.get_state_by_remote_id(remote_id);
		if(!state)
			throw new Error("No state for id");
		if(state.active) {
			return this.clear(tag,remote_id);
		}
		// we have to trust the user, go ahead and send the message
		// anyway (this can technically send structured cloneable objects)
		if(tag===TIMER_SINGLE) {
			worker_state.postMessage({
				t: this.m_api_info.msg_types.worker.clear.single,
				v: remote_id
			});
		} else if(tag===TIMER_REPEATING) {
			worker_state.postMessage({
				t: this.m_api_info.msg_types.worker.clear.repeating,
				v: remote_id
			});
		}
	}
	clear(tag: TimerTag,remote_id?: number) {
		this.verify_tag(tag);
		if(remote_id===void 0)
			return;
		let state=this.get_state_by_remote_id(remote_id);
		if(!this.weak_worker_state)
			return;
		if(state?.active) {
			let worker_state=this.weak_worker_state.deref();
			if(!worker_state)
				return;
			if(state.type===TIMER_SINGLE) {
				worker_state.postMessage({
					t: this.m_api_info.msg_types.worker.clear.single,
					v: remote_id
				});
			} else if(state.type===TIMER_REPEATING) {
				worker_state.postMessage({
					t: this.m_api_info.msg_types.worker.clear.repeating,
					v: remote_id
				});
			}
			state.active=false;
		}
	}
	destroy() {
		let api_info=this.m_api_info;
		let api_map=this.m_api_map;
		window[api_info.set_names.single]=api_map.get(api_info.set_names.single);
		window[api_info.set_names.repeating]=api_map.get(api_info.set_names.repeating);
		window[api_info.clear_names.single]=api_map.get(api_info.clear_names.single);
		window[api_info.clear_names.repeating]=api_map.get(api_info.clear_names.repeating);
		for(var state_entry of this.remote_id_to_state_entries()) {
			let id=state_entry[0];
			void id;
			let state=state_entry[1];
			if(state.type===TIMER_SINGLE) {
				// if the timer might get reset when calling the function while
				// the timer functions are reset to the underlying api
				if(state.target_fn instanceof Function) {
					state.target_fn.apply(null,state.target_args);
				} else {
					eval(state.target_fn);
				}
			}
		}
		this.m_api_map.clear();
	}
}

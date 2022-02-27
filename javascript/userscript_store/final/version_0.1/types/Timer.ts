import {UniqueIdGenerator} from "./UniqueIdGenerator";
import {TimerApiInfo} from "./TimerApiInfo";
import {WorkerState} from "./WorkerState";
import {ApiMapData} from "./ApiMapData";
import {MapObject} from "./MapObject";
import {TimerState} from "./TimerState";
import {AnyOfArr} from "./AnyOfArr";
import {TimerTypeTag, TIMER_SINGLE, TIMER_TAG_COUNT, TIMER_REPEATING} from "./rebuild_the_universe_auto_typed_v0.1";
import {timer_nop} from "./timer_nop";

export class Timer {
	id_generator;
	m_remote_id_to_main_state_map;
	m_api_map: MapObject<ApiMapData>;
	weak_worker_state: WeakRef<WorkerState> | null;
	m_api_info: Partial<TimerApiInfo>;
	base_id: number;
	constructor(api_info: Partial<TimerApiInfo>) {
		this.m_remote_id_to_main_state_map = new Map;
		this.weak_worker_state = null;
		this.m_api_map = new Map<keyof ApiMapData, ApiMapData[keyof ApiMapData]>() as MapObject<ApiMapData>;
		this.m_api_info = api_info;
		if(api_info.set_single)
			this.m_api_map.set(api_info.set_single, window[api_info.set_single]);
		if(api_info.set_repeating)
			this.m_api_map.set(api_info.set_repeating, window[api_info.set_repeating]);
		if(api_info.clear_single)
			this.m_api_map.set(api_info.clear_single, window[api_info.clear_single]);
		if(api_info.clear_repeating)
			this.m_api_map.set(api_info.clear_repeating, window[api_info.clear_repeating]);
		if(api_info.set_single && api_info.clear_single) {
			this.base_id = window[api_info.set_single](timer_nop);
			window[api_info.clear_single](this.base_id);
		} else if(api_info.set_repeating && api_info.clear_repeating) {
			this.base_id = window[api_info.set_repeating](timer_nop);
			window[api_info.clear_repeating](this.base_id);
		} else {
			console.info('Timer ids not linked with underlying api');
			this.base_id = 1;
		}
		this.id_generator = new UniqueIdGenerator(this.base_id);
	}
	set_worker_state(worker_state_value: WorkerState) {
		this.weak_worker_state = new WeakRef(worker_state_value);
	}
	// If you cause any side effects, please
	// wrap this call in try{}finally{} and
	// revert all side effects...
	verify_timer_type_tag(type_tag: TimerTypeTag) {
		if(!this.validate_timer_type_tag(type_tag)) {
			throw new Error("Verify failed in Timer.verify_timer_type_tag");
		}
	}
	verify_timer_state(main_state: TimerState, remote_id: number) {
		if(!this.validate_timer_state(main_state)) {
			if(!this.weak_worker_state)
				throw new Error("Invalid state");
			let worker_state = this.weak_worker_state.deref();
			if(!worker_state)
				throw new Error("Invalid state");
			if(this.m_api_info.clear_any_msg_id) {
				worker_state.postMessage({
					t: this.m_api_info.clear_any_msg_id,
					v: remote_id
				});
			} else {
				throw new Error("Verify failed in Timer.verify_timer_state");
			}
		}
	}
	validate_timer_type_tag(type_tag: TimerTypeTag) {
		if(type_tag < TIMER_SINGLE || type_tag >= TIMER_TAG_COUNT) {
			console.assert(false, "Assertion failure in Timer.validate_timer_type_tag: type_tag=%o is out of range");
			console.info("Info: range is TIMER_SINGLE to TIMER_TAG_COUNT-1 (%o...%o-1)", type_tag, TIMER_SINGLE, TIMER_TAG_COUNT);
			return false;
		}
		return true;
	}
	validate_timer_state(main_state: {type: TimerTypeTag;}) {
		return this.validate_timer_type_tag(main_state.type);
	}
	fire(type: TimerTypeTag, remote_id: any) {
		let main_state = this.get_main_state_by_id(remote_id);
		if(!main_state) {
			this.force_clear(type, remote_id);
			return;
		}
		if(main_state.active) {
			main_state.target_function.apply(null, main_state.target_arguments);
		}
		if(type === TIMER_SINGLE) {
			main_state.active = false;
			this.clear(type, remote_id);
		}
	}
	set(type: TimerTypeTag, target_function: any, delay: number, target_arguments: any[]) {
		let remote_id = this.id_generator.next();
		let is_repeating = false;
		this.verify_timer_type_tag(type);
		if(type === TIMER_REPEATING) {
			is_repeating = true;
		}
		if(delay < 0)
			delay = 0;
		let main_state = {
			active: true,
			type: type,
			repeat: is_repeating,
			target_function,
			target_arguments,
			delay
		};
		this.store_main_state_by_id(remote_id, main_state);
		if(!this.m_api_info.set_single_msg_id)
			throw new Error("Invalid state");
		if(!this.m_api_info.set_repeating_msg_id)
			throw new Error("Invalid state");
		if(!this.weak_worker_state)
			throw new Error("Invalid state");
		let worker_state = this.weak_worker_state.deref();
		if(!worker_state)
			throw new Error("Invalid state");
		let types: [0, 203, 204] = [0, 203, 204];
		let do_set_message_id: AnyOfArr<typeof types> = 0;
		if(type === TIMER_SINGLE)
			do_set_message_id = this.m_api_info.set_single_msg_id;
		if(type === TIMER_REPEATING)
			do_set_message_id = this.m_api_info.set_repeating_msg_id;
		if(do_set_message_id === 0)
			throw new Error("Invalid state");
		worker_state.postMessage({
			t: do_set_message_id,
			v: {
				t: remote_id,
				v: delay
			}
		});
		if(type === TIMER_REPEATING) {
			worker_state.postMessage({
				t: this.m_api_info.set_repeating_msg_id,
				v: {
					t: remote_id,
					v: delay
				}
			});
		}

		return remote_id;
	}
	is_main_state_stored_by_id(remote_id: any) {
		return this.m_remote_id_to_main_state_map.has(remote_id);
	}
	get_main_state_by_id(remote_id: number) {
		let main_state = this.m_remote_id_to_main_state_map.get(remote_id);
		if(!main_state)
			return null;
		this.verify_timer_state(main_state, remote_id);
		return main_state;
	}
	store_main_state_by_id(remote_id: number, main_state: {active: boolean; type: any; repeat: boolean; target_function: any; target_arguments: any; delay: any;}) {
		this.m_remote_id_to_main_state_map.set(remote_id, main_state);
	}
	delete_main_state_by_id(remote_id: any) {
		this.m_remote_id_to_main_state_map.delete(remote_id);
	}
	main_state_entries() {
		return this.m_remote_id_to_main_state_map.entries();
	}
	on_result(timer_result_msg: {t: 205 | 206; v: number;}) {
		let timer_result_msg_id = timer_result_msg.t;
		switch(timer_result_msg_id) {
			case 205: {
				let remote_id = timer_result_msg.v;
				this.delete_main_state_by_id(remote_id);
				break;
			}
			case 206: {
				let remote_id = timer_result_msg.v;
				this.delete_main_state_by_id(remote_id);
				break;
			}
			default:
				console.log(timer_result_msg);
				debugger;
		}
	}
	force_clear(type: TimerTypeTag, remote_id: any) {
		this.verify_timer_type_tag(type);
		if(!this.weak_worker_state)
			throw new Error("Invalid state");
		let worker_state = this.weak_worker_state.deref();
		let main_state = this.get_main_state_by_id(remote_id);
		if(main_state.active) {
			return this.clear(type, remote_id);
		}
		// we have to trust the user, go ahead and send the message
		// anyway (this can technically send structured cloneable objects)
		if(!worker_state)
			throw new Error("Invalid state");
		if(!this.m_api_info.clear_single_msg_id)
			throw new Error("Invalid state");
		if(!this.m_api_info.clear_repeating_msg_id)
			throw new Error("Invalid state");
		if(type === TIMER_SINGLE) {
			worker_state.postMessage({
				t: this.m_api_info.clear_single_msg_id,
				v: remote_id
			});
		} else if(type === TIMER_REPEATING) {
			worker_state.postMessage({
				t: this.m_api_info.clear_repeating_msg_id,
				v: remote_id
			});
		}
	}
	clear(type: TimerTypeTag, remote_id: number) {
		this.verify_timer_type_tag(type);
		let main_state = this.get_main_state_by_id(remote_id);
		if(!main_state)
			return;
		if(!this.weak_worker_state)
			throw new Error("Invalid state");
		if(!this.m_api_info.clear_single_msg_id)
			throw new Error("Invalid state");
		if(!this.m_api_info.clear_repeating_msg_id)
			throw new Error("Invalid state");
		if(main_state.active) {
			let worker_state = this.weak_worker_state.deref();
			if(!worker_state)
				throw new Error("Invalid state");
			if(main_state.type === TIMER_SINGLE) {
				worker_state.postMessage({
					t: this.m_api_info.clear_single_msg_id,
					v: remote_id
				});
			} else if(main_state.type === TIMER_REPEATING) {
				worker_state.postMessage({
					t: this.m_api_info.clear_repeating_msg_id,
					v: remote_id
				});
			}
			main_state.active = false;
		}
	}
	destroy() {
		let api_info = this.m_api_info;
		let api_map = this.m_api_map;
		if(api_info.set_single)
			window[api_info.set_single] = api_map.get(api_info.set_single);
		if(api_info.set_repeating)
			window[api_info.set_repeating] = api_map.get(api_info.set_repeating);
		if(api_info.clear_single)
			window[api_info.clear_single] = api_map.get(api_info.clear_single);
		if(api_info.clear_repeating)
			window[api_info.clear_repeating] = api_map.get(api_info.clear_repeating);
		for(var timer_map_entry of this.main_state_entries()) {
			const [, main_state] = timer_map_entry;
			if(main_state.type === TIMER_SINGLE) {
				// if the timer might get reset when calling the function while
				// the timer functions are reset to the underlying api
				main_state.target_function.apply(null, main_state.target_arguments);
			}
		}
		this.m_api_map.clear();
	}
}

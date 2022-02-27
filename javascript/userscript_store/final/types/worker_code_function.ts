import {WorkerMessageReply2} from "./WorkerMessageReply2";
import {WorkerReplyMsg} from "./WorkerReplyMsg";
import {RemoteWorkerMessage101} from "./RemoteWorkerMessage101";
import {RemoteWorkerMessage102} from "./RemoteWorkerMessage102";
import {RemoteWorkerMessage205} from "./RemoteWorkerMessage205";
import {RemoteWorkerMessage206} from "./RemoteWorkerMessage206";
import {RemoteWorkerMessage} from "./RemoteWorkerMessage";
import {WorkerMsgData} from "./WorkerMsgData";
import {TimerTypeTag} from "./rebuild_the_universe_auto_typed_v0.1";

export function worker_code_function(verify_callback: (a: {
	TIMER_SINGLE: 1; TIMER_REPEATING: 2; TIMER_TAG_COUNT: 3;
}) => void) {
	const TIMER_SINGLE = 1;
	const TIMER_REPEATING = 2;
	const TIMER_TAG_COUNT = 3;
	if(verify_callback) {
		verify_callback({
			TIMER_SINGLE,
			TIMER_REPEATING,
			TIMER_TAG_COUNT
		});
	}
	class RemoteWorkerState {
		unique_script_id: number;
		m_timer: RemoteTimer | null;
		constructor() {
			this.m_timer = null;
			this.unique_script_id = 1;
		}
		set_timer(timer: RemoteTimer) {
			this.m_timer = timer;
		}
		timer_set(timer_type_tag: TimerTypeTag, remote_id: number, timeout: number) {
			if(this.m_timer)
				return this.m_timer.set(timer_type_tag, remote_id, timeout);
		}
		do_timer_clear(timer_clear_msg: RemoteWorkerMessage205 | RemoteWorkerMessage206) {
			if(this.m_timer)
				return this.m_timer.do_clear(timer_clear_msg);
		}
	}
	function timer_nop() {};
	function fire_timer(timer: RemoteTimer, remote_id: number) {
		timer.fire(remote_id);
	}
	type RemoteTimerState = {
		type: 1 | 2;
		active: boolean;
		id: number;
	};
	type RemoteTimerApiInfo = {
		async_reply_msg_id: 1;
		timer_reply_msg_id: 2;
		r_reply_msg_id: 100;
		fire_single_msg_id: 101;
		fire_repeating_msg_id: 102;
		l_reply_msg_id: 200;
		worker_update_code: 201;
		async_worker_ready_msg_id: 202;
		set_single_msg_id: 203;
		set_repeating_msg_id: 204;
		clear_single_msg_id: 205;
		clear_repeating_msg_id: 206;
		clear_any_msg_id: 207;
		set_single: "setTimeout";
		set_repeating: "setInterval";
		clear_single: "clearTimeout";
		clear_repeating: "clearInterval";
	};
	class RemoteTimer {
		m_remote_to_local_timer_state_map: Map<unknown, RemoteTimerState>;
		m_api_info: RemoteTimerApiInfo;
		base_id: number;
		constructor(api_info: RemoteTimerApiInfo) {
			this.m_remote_to_local_timer_state_map = new Map;
			this.m_api_info = api_info;
			this.base_id = globalThis[this.m_api_info.set_single](timer_nop);
			globalThis[this.m_api_info.clear_single](this.base_id);
		}
		fire(remote_id: number) {
			let local_state = this.m_remote_to_local_timer_state_map.get(remote_id);
			if(!local_state)
				return;
			this.verify_timer_state(local_state, remote_id);
			if(!local_state.active) {
				debugger;
				console.log('fire inactive', remote_id, local_state);
				return;
			};
			if(local_state.type === TIMER_SINGLE) {
				postMessage({
					t: this.m_api_info.fire_single_msg_id,
					v: remote_id
				} as RemoteWorkerMessage101);
				this.m_remote_to_local_timer_state_map.delete(remote_id);
			} else if(local_state.type === TIMER_REPEATING) {
				postMessage({
					t: this.m_api_info.fire_repeating_msg_id,
					v: remote_id
				} as RemoteWorkerMessage102);
			}
		}
		set(type_tag: TimerTypeTag, remote_id: number, delay: number) {
			this.verify_timer_type_tag(type_tag);
			let local_id = -1;
			if(type_tag === TIMER_SINGLE) {
				local_id = globalThis[this.m_api_info.set_single](fire_timer, delay, this, remote_id);
			}
			if(type_tag === TIMER_REPEATING) {
				local_id = globalThis[this.m_api_info.set_repeating](fire_timer, delay, this, remote_id);
			}
			this.m_remote_to_local_timer_state_map.set(remote_id, {
				active: true,
				id: local_id,
				type: type_tag
			});
			return local_id;
		}
		verify_timer_type_tag(type_tag: TimerTypeTag) {
			if(!this.validate_timer_type_tag(type_tag)) {
				throw new Error("type_tag verification failed on remote_worker");
			}
		}
		verify_timer_state(local_state: RemoteTimerState, remote_id: number) {
			if(!this.validate_timer_state(local_state)) {
				console.info("Removed invalid local_state");
				globalThis[this.m_api_info.clear_single](local_state.id);
				globalThis[this.m_api_info.clear_repeating](local_state.id);
				this.m_remote_to_local_timer_state_map.delete(remote_id);
				throw new Error("type_tag verification failed on remote_worker");
			}
		}
		validate_timer_type_tag(type_tag: TimerTypeTag) {
			if(type_tag < TIMER_SINGLE || type_tag >= TIMER_TAG_COUNT) {
				console.assert(false, "Assertion failed in RemoteTimer.validate_timer_type_tag: type_tag=%o is out of range");
				console.info("Info: range is TIMER_SINGLE to TIMER_TAG_COUNT-1 (%o...%o-1)", type_tag, TIMER_SINGLE, TIMER_TAG_COUNT);
				return false;
			}
			return true;
		}
		validate_timer_state(local_state: {type: TimerTypeTag;}) {
			return this.validate_timer_type_tag(local_state.type);
		}
		clear(remote_id: number) {
			if(this.m_remote_to_local_timer_state_map.has(remote_id)) {
				let local_state = this.m_remote_to_local_timer_state_map.get(remote_id);
				if(local_state) {
					this.verify_timer_state(local_state, remote_id);
					if(local_state.type === TIMER_SINGLE) {
						globalThis[this.m_api_info.clear_single](local_state.id);
					}
					if(local_state.type === TIMER_REPEATING) {
						globalThis[this.m_api_info.clear_repeating](local_state.id);
					}
					local_state.active = false;
					this.m_remote_to_local_timer_state_map.delete(remote_id);
				}
			}
		}
		do_clear(clear_msg: RemoteWorkerMessage205 | RemoteWorkerMessage206) {
			let remote_id = clear_msg.v;
			this.clear(remote_id);
			const reply_data = {
				t: clear_msg.t,
				v: remote_id
			};
			const reply_message: WorkerMessageReply2 = {
				t: this.m_api_info.timer_reply_msg_id,
				v: reply_data
			};
			const message: WorkerReplyMsg<WorkerMessageReply2> = {
				t: 100,
				v: reply_message
			};
			postMessage(message);
			return;
		}
	}
	let remote_worker_state = new RemoteWorkerState;
	(globalThis as any as {remote_worker_state: RemoteWorkerState;}).remote_worker_state = remote_worker_state;
	remote_worker_state.set_timer(new RemoteTimer({
		async_reply_msg_id: 1,
		timer_reply_msg_id: 2,
		r_reply_msg_id: 100,
		fire_single_msg_id: 101,
		fire_repeating_msg_id: 102,
		l_reply_msg_id: 200,
		worker_update_code: 201,
		async_worker_ready_msg_id: 202,
		set_single_msg_id: 203,
		set_repeating_msg_id: 204,
		clear_single_msg_id: 205,
		clear_repeating_msg_id: 206,
		clear_any_msg_id: 207,
		set_single: "setTimeout",
		set_repeating: "setInterval",
		clear_single: "clearTimeout",
		clear_repeating: "clearInterval"
	}));
	onmessage = function(e: MessageEvent<RemoteWorkerMessage>) {
		let msg = e.data;
		switch(msg.t) {
			case 200 /*reply*/: {
				let result = msg.v;
				console.assert(false, "unhandled result on remote worker", result);
			} break;
			case 201 /*remote worker init*/: {
				let user_msg = msg.v;
				let worker_str = "()"[0];
				worker_str += user_msg.init;
				worker_str += "()"[1];
				worker_str += "()";
				worker_str += "\n";
				worker_str += "onmessage=";
				worker_str += user_msg.onmessage;
				worker_str += "\n";
				worker_str += "//# sourceURL=$__.";
				worker_str += remote_worker_state.unique_script_id;
				eval(worker_str);
				remote_worker_state.unique_script_id++;
				const message: WorkerReplyMsg<WorkerMsgData<typeof msg['t']>> = {
					t: 100,
					v: {
						t: 1,
						v: msg.t
					}
				};
				postMessage(message);
			} break;
			case 202 /**/: {
				const message: WorkerReplyMsg<WorkerMsgData<typeof msg['t']>> = {
					t: 100,
					v: {
						t: 1,
						v: msg.t
					}
				};
				postMessage(message);
			} break;
			case 203 /*remote timer set single*/: {
				let user_msg = msg.v;
				let remote_timer_id = remote_worker_state.timer_set(TIMER_SINGLE, user_msg.t, user_msg.v);
				void remote_timer_id;
			} break;
			case 204 /*remote timer set repeating*/: {
				let user_msg = msg.v;
				let remote_timer_id = remote_worker_state.timer_set(TIMER_REPEATING, user_msg.t, user_msg.v);
				void remote_timer_id;
			} break;
			case 205 /*remote timer do_clear single*/: {
				let clear_msg = msg;
				remote_worker_state.do_timer_clear(clear_msg);
			} break;
			case 206 /*remote timer do_clear repeating*/: {
				let clear_msg = msg;
				remote_worker_state.do_timer_clear(clear_msg);
			} break;
			default: {
				console.assert(false, "RemoteWorker: Unhandled message", msg);
			} break;
		}
	};
}

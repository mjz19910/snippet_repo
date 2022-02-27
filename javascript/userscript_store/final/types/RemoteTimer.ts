import {fire_timer} from "./fire_timer";
import {RemoteTimerState} from "./RemoteTimerState";
import {timer_nop, TIMER_SINGLE, TIMER_REPEATING, TimerTypeTag, TIMER_TAG_COUNT} from "./rebuild_the_universe_auto_typed_v0.1";
import {RemoteWorkerMessage206} from "./RemoteWorkerMessage206";
import {RemoteWorkerMessage205} from "./RemoteWorkerMessage205";
import {RemoteWorkerMessage102} from "./RemoteWorkerMessage102";
import {RemoteWorkerMessage101} from "./RemoteWorkerMessage101";
import {WorkerReplyMsg} from "./WorkerReplyMsg";
import {WorkerMessageReply2} from "./WorkerMessageReply2";
import {TimerApiInfo} from "./TimerApiInfo";


export class RemoteTimer {
	m_remote_to_local_timer_state_map: Map<number, RemoteTimerState>;
	m_api_info: TimerApiInfo;
	base_id: number;
	constructor(api_info: TimerApiInfo) {
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
	validate_timer_state(local_state: RemoteTimerState) {
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
			}
			this.m_remote_to_local_timer_state_map.delete(remote_id);
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

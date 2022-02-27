import {RemoteTimer} from "./RemoteTimer";
import {TimerTypeTag} from "./rebuild_the_universe_auto_typed_v0.1";
import {RemoteWorkerMessage206} from "./RemoteWorkerMessage206";
import {RemoteWorkerMessage205} from "./RemoteWorkerMessage205";


export class RemoteWorkerState {
	unique_script_id: number;
	m_timer: RemoteTimer | null;
	constructor() {
		this.m_timer = null;
		this.unique_script_id = 1;
	}
	set_timer(timer: RemoteTimer) {
		this.m_timer = timer;
	}
	timer_set(type: TimerTypeTag, remote_id: number, timeout: number) {
		if(this.m_timer)
			return this.m_timer.set(type, remote_id, timeout);
	}
	do_timer_clear(timer_clear_msg: RemoteWorkerMessage205 | RemoteWorkerMessage206) {
		if(this.m_timer)
			return this.m_timer.do_clear(timer_clear_msg);
	}
}

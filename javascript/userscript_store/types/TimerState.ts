import {TimerTag} from "rebuild_the_universe_auto_typed_v0.2";

export class TimerState {
	active;
	type;
	repeat;
	target_fn;
	target_args;
	timeout;
	constructor(tag: TimerTag, is_repeating: boolean, target_fn: TimerHandler, target_args: any[], timeout: number) {
		this.active = true;
		this.type = tag;
		this.repeat = is_repeating;
		this.target_fn = target_fn;
		this.target_args = target_args;
		this.timeout = timeout;
	}
}

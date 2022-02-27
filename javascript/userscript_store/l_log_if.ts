import {local_logging_level} from "./rebuild_the_universe_auto_typed_v0.2";

export function l_log_if(level: number, ...args: any[]) {
	if(level <= local_logging_level) {
		console.log(...args);
	}
}

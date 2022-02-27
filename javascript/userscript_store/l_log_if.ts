import {local_logging_level} from "./typed_mod_rebuild_auto";

export function l_log_if(level: number, ...args: any[]) {
	if(level <= local_logging_level) {
		console.log(...args);
	}
}

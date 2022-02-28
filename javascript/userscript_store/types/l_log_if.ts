export const LOG_LEVEL_ERROR = 1;
export const LOG_LEVEL_WARN = 2;
export const LOG_LEVEL_INFO = 3;
export const LOG_LEVEL_VERBOSE = 4;
export const LOG_LEVEL_TRACE = 5;


export let logging_state = {
	level:3
}

export function l_log_if(level: number, ...args: any[]) {
	if(level <= logging_state.level) {
		console.log(...args);
	}
}

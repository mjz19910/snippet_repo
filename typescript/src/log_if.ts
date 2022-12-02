export let logging_state={
	level: 3
}

export function log_if(level: number,...args: any[]) {
	if(level<=logging_state.level) {
		console.log(...args)
	}
}

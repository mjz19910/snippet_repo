import {PromiseExecutorHandle} from "./PromiseExecutorHandle";
import {worker_code_function} from "./worker_code_function";
import {WorkerState} from "./WorkerState";
import {Timer} from "./Timer";
import {VERIFY} from "./VERIFY";
import {TIMER_REPEATING, TIMER_TAG_COUNT, TIMER_SINGLE} from "./rebuild_the_universe_auto_typed_v0.1";

export function move_timers_to_worker_promise_executor(
	executor_accept: (value: WorkerState | null) => void,
	executor_reject: (reason?: any) => void) {
	if(globalThis.hasOwnProperty('remote_worker_state')) {
		postMessage({
			t: 300
		});
		executor_accept(null);
		return;
	}
	if(WorkerState.maybe_delete_old_global_state())
		return null;
	worker_code_function(function(verify_obj) {
		VERIFY(verify_obj.TIMER_REPEATING === TIMER_REPEATING, "TIMER_SINGLE constant matches");
		VERIFY(verify_obj.TIMER_REPEATING === TIMER_REPEATING, "TIMER_REPEATING constant matches");
		VERIFY(verify_obj.TIMER_TAG_COUNT === TIMER_TAG_COUNT, "TIMER_TAG_COUNT constant matches");
		VERIFY(Object.keys(verify_obj).length === 3, "keys(verify_obj).length is expected value");
		return;
	});
	const worker_code_blob = new Blob(["(", worker_code_function.toString(), ")()", "\n//# sourceURL=$__.0"]);
	let timer = new Timer({
		set_single_msg_id: 203,
		set_repeating_msg_id: 204,
		clear_single_msg_id: 205,
		clear_repeating_msg_id: 206,
		set_single: "setTimeout",
		clear_single: "clearTimeout",
		set_repeating: "setInterval",
		clear_repeating: "clearInterval"
	});
	let executor_handle = new PromiseExecutorHandle<WorkerState>(executor_accept, executor_reject);
	const worker_state = new WorkerState(worker_code_blob, timer, executor_handle);
	const weak_worker_state = new WeakRef(worker_state);
	const setTimeout_global = setTimeout;
	/**@type {typeof setTimeout} */
	function remoteSetTimeout(handler: TimerHandler, timeout = 0, ...target_arguments: any[]) {
		if(!worker_state) {
			window.setTimeout = setTimeout_global;
			console.log('lost worker_state in timer');
			return setTimeout_global(handler, timeout, ...target_arguments);
		}
		return worker_state.timer.set(TIMER_SINGLE, handler, timeout, target_arguments);
	}
	const clearTimeout_global = clearTimeout;
	/**@type {typeof clearTimeout} */
	function remoteClearTimeout(id?: number | undefined): void {
		if(!worker_state) {
			window.clearTimeout = clearTimeout_global;
			console.log('lost worker_state in timer');
			return clearTimeout_global(id);
		}
		if(id !== void 0)
			worker_state.timer.clear(TIMER_SINGLE, id);
	}
	const setInterval_global = setInterval;
	/**@type {typeof setInterval} */
	function remoteSetInterval(handler: TimerHandler, timeout = 0, ...target_arguments: any[]) {
		if(!worker_state) {
			window.setInterval = setInterval_global;
			console.log('lost worker_state in timer');
			return setInterval_global(handler, timeout, ...target_arguments);
		}
		return worker_state.timer.set(TIMER_REPEATING, handler, timeout, target_arguments);
	}
	const clearInterval_global = clearInterval;
	/**@type {typeof clearInterval} */
	function remoteClearInterval(id?: number) {
		if(!worker_state) {
			window.clearInterval = clearInterval_global;
			console.log('lost worker_state in timer');
			return clearInterval_global(id);
		}
		if(id !== void 0)
			worker_state.timer.clear(TIMER_REPEATING, id);
	}
	window.setTimeout = remoteSetTimeout;
	window.setInterval = remoteSetInterval;
	window.clearTimeout = remoteClearTimeout;
	window.clearInterval = remoteClearInterval;
	return {
		get() {
			return weak_worker_state.deref();
		}
	};
}

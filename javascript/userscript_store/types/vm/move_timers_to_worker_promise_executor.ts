import {TimerApi} from "./TimerApi"
import {UniqueIdGenerator} from "./UniqueIdGenerator"
import {worker_code_function} from "./worker_code_function"
import {WorkerState} from "./WorkerState"
import {Timer} from "./Timer"
import {do_worker_verify} from "./do_worker_verify"
import {l_log_if} from "./l_log_if"
import {PromiseExecutorHandle} from "./PromiseExecutorHandle"
import {LOG_LEVEL_WARN, TIMER_REPEATING, TIMER_SINGLE, WorkerDestroyMessage} from "types/constants"

export function move_timers_to_worker_promise_executor(
	executor_accept: (arg0: WorkerState | null) => void,
	executor_reject: () => void) {
	let failed = false
	if(globalThis.remote_worker_state) {
		postMessage({t: WorkerDestroyMessage})
		executor_accept(null)
		return
	}
	if(WorkerState.maybe_delete_old_global_state())
		return null
	try {
		worker_code_function(do_worker_verify)
	} catch(e) {
		console.log(e)
		executor_accept(null)
		failed = true
	}
	const worker_code_blob = new Blob(["(", worker_code_function.toString(), ")()", "\n//# sourceURL=$__.0"])
	let id_generator = new UniqueIdGenerator
	let timer = new Timer(id_generator, new TimerApi)
	/**@type {PromiseExecutorHandle|null} */
	let executor_handle = null
	if(!failed) {
		executor_handle = new PromiseExecutorHandle(executor_accept, executor_reject)
	}
	if(!executor_handle)throw 1
	const worker_state = new WorkerState(worker_code_blob, timer, executor_handle)
	worker_state.set_failed(failed)
	worker_state.init()
	const weak_worker_state = new WeakRef(worker_state)
	const setTimeout_global = setTimeout
	function remoteSetTimeout(handler: TimerHandler, timeout: number | undefined, ...target_args: any[]) {
		if(!worker_state) {
			window.setTimeout = setTimeout_global
			l_log_if(LOG_LEVEL_WARN, 'lost worker_state in timer')
			return setTimeout_global(handler, timeout, ...target_args)
		}
		return worker_state.timer.set(TIMER_SINGLE, handler, timeout, target_args)
	}
	const clearTimeout_global = clearTimeout
	/**@arg {number} id */
	function remoteClearTimeout(id?: number) {
		if(!worker_state) {
			window.clearTimeout = clearTimeout_global
			l_log_if(LOG_LEVEL_WARN, 'lost worker_state in timer')
			return clearTimeout_global(id)
		}
		worker_state.timer.clear(TIMER_SINGLE, id)
	}
	const setInterval_global = setInterval
	function remoteSetInterval(handler: TimerHandler, timeout?: number, ...target_args: any[]) {
		if(!worker_state) {
			window.setInterval = setInterval_global
			l_log_if(LOG_LEVEL_WARN, 'lost worker_state in timer')
			return setInterval_global(handler, timeout, ...target_args)
		}
		return worker_state.timer.set(TIMER_REPEATING, handler, timeout, target_args)
	}
	const clearInterval_global = clearInterval
	function remoteClearInterval(id: number | undefined) {
		if(!worker_state) {
			window.clearInterval = clearInterval_global
			l_log_if(LOG_LEVEL_WARN, 'lost worker_state in timer')
			return clearInterval_global(id)
		}
		worker_state.timer.clear(TIMER_REPEATING, id)
	}
	window.remoteSetTimeout = remoteSetTimeout
	window.remoteSetInterval = remoteSetInterval
	window.remoteClearTimeout = remoteClearTimeout
	window.remoteClearInterval = remoteClearInterval
	if(!failed) {
		window.setTimeout = remoteSetTimeout
		window.setInterval = remoteSetInterval
		window.clearTimeout = remoteClearTimeout
		window.clearInterval = remoteClearInterval
	}
	return {
		get() {
			return weak_worker_state.deref()
		}
	}
}

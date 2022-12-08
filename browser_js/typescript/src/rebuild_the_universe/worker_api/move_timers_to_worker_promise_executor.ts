import {TimerApi} from "./TimerApi.js";
import {worker_code_function} from "./worker_code_function.js";
import {WorkerApi as WorkerApi} from "./WorkerApi.js";
import {Timer} from "./Timer.js";
import {do_worker_verify} from "./do_worker_verify.js";
import {PromiseExecutorHandle} from "./PromiseExecutorHandle.js";
import {TIMER_REPEATING,TIMER_SINGLE,WorkerDestroyType} from "./constants.js";
import {RemoteWorkerState} from "./RemoteWorkerState.js";
import {log_if, LOG_LEVEL_WARN, UniqueIdGenerator} from "./ns.js";

declare global {
	interface Window {
		remoteSetTimeout: (handler: TimerHandler,timeout?: number,...target_args: any[]) => number;
		remoteSetInterval: (handler: TimerHandler,timeout?: number,...target_args: any[]) => number;
		remoteClearTimeout: (id?: number) => void;
		remoteClearInterval: (id?: number) => void;
	}

	module globalThis {
		var remote_worker_state: RemoteWorkerState|undefined;
	}
}

export function move_timers_to_worker_promise_executor(p_accept: (arg0: WorkerApi|null) => void,p_reject: () => void) {
	if(globalThis.remote_worker_state) {
		postMessage({t: WorkerDestroyType});
		p_accept(null);
		return;
	}
	if(WorkerApi.maybe_delete_old_global_state())
		return;
	try {
		worker_code_function(do_worker_verify);
	} catch(e) {
		console.log(e);
		p_accept(null);
		return;
	}
	const worker_code_blob=new Blob(["(",worker_code_function.toString(),")()","\n//# sourceURL=$__.0"]);
	const id_generator=new UniqueIdGenerator;
	const timer=new Timer(id_generator,new TimerApi);
	const executor_handle=new PromiseExecutorHandle(p_accept,p_reject);
	const worker_api=new WorkerApi(worker_code_blob,timer,executor_handle);
	const setTimeout_global=setTimeout;
	function remoteSetTimeout(handler: TimerHandler,timeout: number|undefined,...target_args: any[]) {
		if(!worker_api.flags.get("connected")) {
			window.setTimeout=setTimeout_global;
			log_if(LOG_LEVEL_WARN,'worker not connected');
			return setTimeout_global(handler,timeout,...target_args);
		}
		return worker_api.timer.set(TIMER_SINGLE,handler,timeout,target_args);
	}
	window.remoteSetTimeout=remoteSetTimeout;
	const clearTimeout_global=clearTimeout;
	function remoteClearTimeout(id?: number) {
		if(!worker_api.flags.get("connected")) {
			window.clearTimeout=clearTimeout_global;
			log_if(LOG_LEVEL_WARN,'worker not connected');
			return clearTimeout_global(id);
		}
		worker_api.timer.clear(TIMER_SINGLE,id);
	}
	window.remoteClearTimeout=remoteClearTimeout;
	const setInterval_global=setInterval;
	function remoteSetInterval(handler: TimerHandler,timeout?: number,...target_args: any[]) {
		if(!worker_api.flags.get("connected")) {
			window.setInterval=setInterval_global;
			log_if(LOG_LEVEL_WARN,'worker not connected');
			return setInterval_global(handler,timeout,...target_args);
		}
		return worker_api.timer.set(TIMER_REPEATING,handler,timeout,target_args);
	}
	window.remoteSetInterval=remoteSetInterval;
	const clearInterval_global=clearInterval;
	function remoteClearInterval(id: number|undefined) {
		if(!worker_api.flags.get("connected")) {
			window.clearInterval=clearInterval_global;
			log_if(LOG_LEVEL_WARN,'worker not connected');
			return clearInterval_global(id);
		}
		worker_api.timer.clear(TIMER_REPEATING,id);
	}
	window.remoteClearInterval=remoteClearInterval;
	window.setTimeout=remoteSetTimeout as typeof setTimeout;
	window.setInterval=remoteSetInterval as typeof setInterval;
	window.clearTimeout=remoteClearTimeout as typeof clearTimeout;
	window.clearInterval=remoteClearInterval as typeof clearInterval;
	return {
		worker_api,
	};
}

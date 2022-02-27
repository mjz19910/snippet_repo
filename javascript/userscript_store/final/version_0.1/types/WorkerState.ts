import {PromiseExecutorHandle} from "./PromiseExecutorHandle";
import {WorkerMessageReply2} from "./WorkerMessageReply2";
import {WorkerMessageReply201} from "./WorkerMessageReply201";
import {WorkerMessageReply202} from "./WorkerMessageReply202";
import {RemoteWorkerMessage} from "./RemoteWorkerMessage";
import {Timer} from "./Timer";

export class WorkerState {
	rejected: boolean;
	valid: boolean;
	connected: boolean;
	worker_code: Blob;
	timer: Timer;
	executor_handle: PromiseExecutorHandle<WorkerState>;
	worker: Worker | null;
	worker_url: string | null;
	constructor(worker_code_blob: Blob, timer: Timer, executor_handle: PromiseExecutorHandle<WorkerState>) {
		let has_blob = false;
		if(worker_code_blob instanceof Blob)
			has_blob = true;
		if(!has_blob)
			throw new Error("WorkerState requires a blob with javascript code to execute on a worker");
		if(!timer)
			throw new Error("WorkerState needs a timer");
		if(!executor_handle)
			throw new Error("WorkerState needs a executor_handle");
		if(executor_handle.closed())
			throw new Error("WorkerState needs a executor_handle that is not closed");
		this.rejected = false;
		this.valid = false;
		this.connected = false;
		this.worker_code = worker_code_blob;
		this.timer = timer;
		timer.set_worker_state(this);
		this.executor_handle = executor_handle;
		this.worker = null;
		this.worker_url = null;
		this.init();
	}
	init() {
		if(this.connected || this.valid) {
			this.destroy();
		}
		this.connected = false;
		let weak_worker_state = new WeakRef(this);
		this.worker_url = URL.createObjectURL(this.worker_code);
		this.worker = new Worker(this.worker_url);
		this.worker.onmessage = function onmessage(e: MessageEvent) {
			var msg = e.data;
			let worker_state = weak_worker_state.deref();
			if(!worker_state) {
				console.log('lost worker state');
				this.terminate();
				return;
			}
			switch(msg.t) {
				case 100 /*worker_state dispatch_message*/: {
					worker_state.dispatch_message(msg.v);
					break;
				}
				case 101 /*worker_state.timer single fire*/: {
					worker_state.timer.fire(TIMER_SINGLE, msg.v);
					break;
				}
				case 102 /*worker_state.timer repeating fire*/: {
					worker_state.timer.fire(TIMER_REPEATING, msg.v);
					break;
				}
				case 300 /*worker_state destroy*/:
					worker_state.destroy();
					break;
				default: {
					console.assert(false, "Main: Unhandled message", msg);
					break;
				}
			}
		};
		this.valid = true;
		this.worker.postMessage({
			t: 202
		});
	}
	set_executor_handle(handle: PromiseExecutorHandle<WorkerState>) {
		this.executor_handle = handle;
	}
	on_result(result: (WorkerMessageReply201 | WorkerMessageReply202)['v']) {
		switch(result) {
			case 201: {
				console.log("remote_worker onmessage function changed");
				break;
			}
			case 202: {
				if(this.executor_handle.closed()) {
					console.assert(false, "WorkerState used with closed executor_handle");
					break;
				}
				console.log("remote_worker ready");
				WorkerState.set_global_state(this);
				this.executor_handle.accept(this);
				this.connected = true;
				break;
			}
		}
	}
	dispatch_message(result: WorkerMessageReply2 | WorkerMessageReply201 | WorkerMessageReply202) {
		switch(result.t) {
			case 1: {
				this.on_result(result.v);
				break;
			}
			case 2: {
				this.timer.on_result(result.v);
				break;
			}
			default: {
				console.assert(false, "unhandled result", result);
			}
		}
	}
	postMessage(data: RemoteWorkerMessage) {
		if(this.worker) {
			return this.worker.postMessage(data);
		} else {
			console.info("message lost %o", data);
			throw new Error("Tried to post a message and worker was null");
		}
	}
	static has_global_state() {
		return window.hasOwnProperty("worker_state");
	}
	static has_old_global_state_value(worker_state_value: WorkerState) {
		return this.has_global_state() && !this.equals_global_state(worker_state_value);
	}
	static equals_global_state(worker_state_value: WorkerState) {
		return this.get_global_state() === worker_state_value;
	}
	static maybe_delete_old_global_state_value(worker_state_value: WorkerState) {
		if(this.has_old_global_state_value(worker_state_value)) {
			this.delete_old_global_state();
		}
	}
	static maybe_delete_old_global_state() {
		if(this.has_global_state()) {
			this.delete_old_global_state();
			return true;
		}
		return false;
	}
	static delete_old_global_state() {
		let old_worker_state = this.get_global_state();
		if(old_worker_state) {
			this.destroy_old_worker_state(old_worker_state, 'delete_global_state');
		}
	}
	static destroy_old_worker_state(worker_state_value: WorkerState, before_destroy_call_name: keyof typeof WorkerState) {
		if(before_destroy_call_name === 'delete_global_state') {
			this[before_destroy_call_name]();
		} else {
			console.assert(false, "before_destroy_name was not delete_global_state");
		}
		worker_state_value.destroy();
	}

	static get_global_state(): WorkerState {
		return (<any>window)[this.global_state_key];
	}
	static set_global_state(worker_state_value: WorkerState) {
		(<any>window)[<any>this.global_state_key] = worker_state_value;
	}
	static delete_global_state() {
		delete window[<any>this.global_state_key];
	}
	static get global_state_key(): "g_worker_state" {
		return "g_worker_state";
	}
	destroy() {
		if(this.worker) {
			this.worker.terminate();
			this.worker = null;
			if(this.worker_url) {
				URL.revokeObjectURL(this.worker_url);
				this.worker_url = null;
			}
			if(!this.executor_handle.closed()) {
				this.executor_handle.reject(new Error("Worker destroyed before it was connected"));
			}
			this.connected = false;
		};
		this.timer.destroy();
		this.valid = false;
	}
}

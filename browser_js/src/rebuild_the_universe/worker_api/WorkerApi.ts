import {
	GlobalWorkerApiKey,
	ReplyFromWorker,
	ReplySetRepeating,
	ReplySetSingle,
	ReplyToLocalTimer,
	ReplyToWorkerState,
	TimeoutClearRepeating,
	TimeoutClearSingle,
	WorkerDestroyType,
	WorkerReadyReply,
	WorkerUpdateMessageHandlerReply
} from "./constants.ts";
import {
	DispatchMessageType,
	WorkerReplyTypes,
	WorkerSendTypes
} from "./constant_types.ts";
import {PromiseExecutorHandle} from "./PromiseExecutorHandle.ts";
import {Timer} from "./Timer.ts";

declare global {
	interface Window {
		[GlobalWorkerApiKey]?: WorkerApi;
	}
}

export class WorkerApi {
	flags: Map<string,boolean>;
	worker_code;
	timer: Timer;
	executor_handle;
	worker: Worker|null;
	worker_url: string|null;
	constructor(worker_code_blob: Blob,timer: Timer,executor_handle: PromiseExecutorHandle|null) {
		this.flags=new Map;
		this.flags.set('has_blob',false);
		if(worker_code_blob instanceof Blob)
			this.flags.set('has_blob',true);
		if(!this.flags.get('has_blob'))
			throw new Error("WorkerState requires a blob with javascript code to execute on a worker");
		if(!timer)
			throw new Error("WorkerState needs a timer");
		this.flags.set('rejected',false);
		this.flags.set('valid',false);
		this.flags.set('connected',false);
		this.worker_code=worker_code_blob;
		this.timer=timer;
		timer.set_worker_state(this);
		this.executor_handle=executor_handle;
		this.worker=null;
		this.worker_url=null;
		this.flags.set('connected',false);
		let weak_worker_state: WeakRef<WorkerApi>=new WeakRef(this);
		this.worker_url=URL.createObjectURL(this.worker_code);
		this.worker=new Worker(this.worker_url);
		this.worker.onmessage=function onmessage(e: MessageEvent<WorkerReplyTypes>) {
			var msg=e.data;
			let worker_state=weak_worker_state.deref();
			if(!worker_state) {
				console.log('lost worker state');
				this.terminate();
				return;
			}
			switch(msg.t) {
				case WorkerDestroyType /*worker_state destroy*/:
					worker_state.destroy();
					break;
				case ReplyToWorkerState:
				case ReplyToLocalTimer /*worker_state dispatch_message_unpacked*/: {
					debugger;
					worker_state.dispatch_message(msg);
					break;
				}
				case ReplyFromWorker /*worker_state dispatch_message*/: {
					worker_state.dispatch_message(msg.v);
					break;
				}
				default: {
					console.assert(false,"Main: Unhandled message",msg);
					debugger;
					break;
				}
			}
		};
		this.flags.set('valid',true);
	}
	set_executor_handle(handle: PromiseExecutorHandle) {
		this.executor_handle=handle;
	}
	on_result(result: DispatchMessageType) {
		if(!this.executor_handle)
			return;
		switch(result.v) {
			default:
				console.log('handler needed',result);
		}
	}
	dispatch_message(result: DispatchMessageType) {
		switch(result.t) {
			case WorkerUpdateMessageHandlerReply: {
				debugger;
				this.on_result(result);
			} break;
			case WorkerReadyReply: {
				// debugger
				this.on_result(result);
			} break;
			case ReplyToWorkerState: {
				debugger;
				this.on_result(result);
			} break;
			case ReplyToLocalTimer: {
				debugger;
				this.timer.on_result(result);
			} break;
			case ReplySetSingle: {
				// debugger
				this.timer.on_reply(result);
			} break;
			case ReplySetRepeating: {
				// debugger
				this.timer.on_reply(result);
			} break;
			case TimeoutClearRepeating: {
				// debugger
				this.timer.on_reply(result);
			} break;
			case TimeoutClearSingle: {
				// debugger
				this.timer.on_reply(result);
			} break;
			default: {
				console.assert(false,"unhandled result",result);
				debugger;
			}
		}
	}
	postMessage(data: WorkerSendTypes) {
		if(!this.worker) return;
		return this.worker.postMessage(data);
	}
	static has_old_global_state_value(worker_state_value: WorkerApi) {
		return this.has_global_state()&&!this.equals_global_state(worker_state_value);
	}
	static equals_global_state(worker_state_value: WorkerApi) {
		return this.get_global_state()===worker_state_value;
	}
	static maybe_delete_old_global_state_value(worker_state_value: WorkerApi) {
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
		let old_worker_state=this.get_global_state();
		if(old_worker_state) {
			const before_destroy_call_name='delete_global_state';
			this.destroy_old_worker_state(old_worker_state,before_destroy_call_name);
		}
	}
	static destroy_old_worker_state(worker_state_value: {destroy: () => void;},before_destroy_call_name: 'delete_global_state') {
		this[before_destroy_call_name]();
		worker_state_value.destroy();
	}
	static has_global_state() {
		return window.hasOwnProperty(GlobalWorkerApiKey);
	}
	static get_global_state(): WorkerApi|undefined {
		return window[GlobalWorkerApiKey];
	}
	static set_global_state(worker_state_value: WorkerApi) {
		this.maybe_delete_old_global_state_value(worker_state_value);
		window[GlobalWorkerApiKey]=worker_state_value;
	}
	static delete_global_state() {
		delete window[GlobalWorkerApiKey];
	}
	destroy() {
		if(this.worker) {
			this.worker.terminate();
			this.worker=null;
			if(this.worker_url)
				URL.revokeObjectURL(this.worker_url);
			this.worker_url=null;
			this.flags.set('connected',false);
			this.flags.set('valid',false);
			if(this.executor_handle&&!this.executor_handle.closed()) {
				this.executor_handle.reject(new Error("Worker destroyed before it was connected"));
			}
		}
		this.timer.destroy();
	}
}

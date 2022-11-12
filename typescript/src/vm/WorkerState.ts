import {PromiseExecutorHandle} from "./PromiseExecutorHandle.js"
import {MessageTimeoutSetR} from "./MessageTimeoutSetR.js"
import {MessageTimeoutSetS} from "./MessageTimeoutSetS.js"
import {MessageTimeoutSingleReply} from "./MessageTimeoutSingleReply.js"
import {MessageTimeoutClearA} from "./MessageTimeoutClearA.js"
import {DispatchMessageType} from "./DispatchMessageType.js"
import {MessageTimeoutClearR} from "./MessageTimeoutClearR.js"
import {MessageTimeoutClearS} from "./MessageTimeoutClearS.js"
import {MessageTypesForWorkerReplies} from "./MessageTypesForWorkerReplies.js"
import {MessageTimeoutFireS} from "./MessageTimeoutFireS.js"
import {Timer} from "./Timer.js"
import {ReplyFromWorker,ReplyMessage1,ReplyMessage2,ReplySetRepeating,ReplySetSingle,TimeoutClearR,TimeoutClearS,WorkerDestroyMessage,WorkerReadyReply,WorkerUpdateMessageHandlerReply} from "../constants.js"
import {GlobalStateKey} from "./GlobalStateKey.js"

export class WorkerState {
	flags: Map<string,boolean>
	worker_code
	timer: Timer
	executor_handle
	worker: Worker|null
	worker_url: string|null
	constructor(worker_code_blob: Blob,timer: Timer,executor_handle: PromiseExecutorHandle|null) {
		this.flags=new Map
		this.flags.set('has_blob',false)
		if(worker_code_blob instanceof Blob)
			this.flags.set('has_blob',true)
		if(!this.flags.get('has_blob'))
			throw new Error("WorkerState requires a blob with javascript code to execute on a worker")
		if(!timer)
			throw new Error("WorkerState needs a timer")
		this.flags.set('rejected',false)
		this.flags.set('valid',false)
		this.flags.set('connected',false)
		this.flags.set('failed',false)
		this.worker_code=worker_code_blob
		this.timer=timer
		timer.set_worker_state(this)
		this.executor_handle=executor_handle
		this.worker=null
		this.worker_url=null
	}
	set_failed(has_failed: boolean) {
		this.flags.set('failed',has_failed)
	}
	init() {
		if(this.flags.get('connected')||this.flags.get('valid')) {
			this.destroy()
		}
		this.flags.set('connected',false)
		let weak_worker_state: WeakRef<WorkerState>=new WeakRef(this)
		this.worker_url=URL.createObjectURL(this.worker_code)
		if(this.flags.get('failed'))
			return
		this.worker=new Worker(this.worker_url)
		this.worker.onmessage=function onmessage(e: MessageEvent<MessageTypesForWorkerReplies>) {
			var msg=e.data
			let worker_state=weak_worker_state.deref()
			if(!worker_state) {
				console.log('lost worker state')
				this.terminate()
				return
			}
			switch(msg.t) {
				case WorkerDestroyMessage /*worker_state destroy*/:
					worker_state.destroy()
					break
				case ReplyMessage1:
				case ReplyMessage2 /*worker_state dispatch_message_unpacked*/: {
					debugger
					worker_state.dispatch_message(msg)
					break
				}
				case ReplyFromWorker /*worker_state dispatch_message*/: {
					worker_state.dispatch_message(msg.v)
					break
				}
				default: {
					console.assert(false,"Main: Unhandled message",msg)
					debugger
					break
				}
			}
		}
		this.flags.set('valid',true)
	}
	set_executor_handle(handle: PromiseExecutorHandle) {
		this.executor_handle=handle
	}
	on_result(result: DispatchMessageType) {
		if(!this.executor_handle)
			return
		switch(result.v) {
			default:
				console.log('handler needed',result)
		}
	}
	dispatch_message(result: DispatchMessageType) {
		switch(result.t) {
			case WorkerUpdateMessageHandlerReply: {
				debugger
				this.on_result(result)
			} break
			case WorkerReadyReply: {
				// debugger
				this.on_result(result)
			} break
			case ReplyMessage1: {
				debugger
				this.on_result(result)
			} break
			case ReplyMessage2: {
				debugger
				this.timer.on_result(result)
			} break
			case ReplySetSingle: {
				// debugger
				this.timer.on_reply(result)
			} break
			case ReplySetRepeating: {
				// debugger
				this.timer.on_reply(result)
			} break
			case TimeoutClearR: {
				// debugger
				this.timer.on_reply(result)
			} break
			case TimeoutClearS: {
				// debugger
				this.timer.on_reply(result)
			} break
			default: {
				console.assert(false,"unhandled result",result)
				debugger
			}
		}
	}
	postMessage(data: MessageTimeoutFireS|MessageTimeoutClearA|MessageTimeoutSingleReply|MessageTimeoutClearS|MessageTimeoutSetS|MessageTimeoutSetR|MessageTimeoutClearR) {
		if(this.worker)
			return this.worker.postMessage(data)
	}
	static has_old_global_state_value(worker_state_value: WorkerState) {
		return this.has_global_state()&&!this.equals_global_state(worker_state_value)
	}
	static equals_global_state(worker_state_value: WorkerState) {
		return this.get_global_state()===worker_state_value
	}
	static maybe_delete_old_global_state_value(worker_state_value: WorkerState) {
		if(this.has_old_global_state_value(worker_state_value)) {
			this.delete_old_global_state()
		}
	}
	static maybe_delete_old_global_state() {
		if(this.has_global_state()) {
			this.delete_old_global_state()
			return true
		}
		return false
	}
	static delete_old_global_state() {
		let old_worker_state=this.get_global_state()
		if(old_worker_state) {
			const before_destroy_call_name='delete_global_state'
			this.destroy_old_worker_state(old_worker_state,before_destroy_call_name)
		}
	}
	static destroy_old_worker_state(worker_state_value: {destroy: () => void},before_destroy_call_name: 'delete_global_state') {
		this[before_destroy_call_name]()
		worker_state_value.destroy()
	}
	static has_global_state() {
		return window.hasOwnProperty(GlobalStateKey)
	}
	static get_global_state(): WorkerState|undefined {
		return window[GlobalStateKey]
	}
	static set_global_state(worker_state_value: WorkerState) {
		this.maybe_delete_old_global_state_value(worker_state_value)
		window[GlobalStateKey]=worker_state_value
	}
	static delete_global_state() {
		delete window[GlobalStateKey]
	}
	destroy() {
		if(this.worker) {
			this.worker.terminate()
			this.worker=null
			if(this.worker_url)
				URL.revokeObjectURL(this.worker_url)
			this.worker_url=null
			this.flags.set('connected',false)
			this.flags.set('valid',false)
			if(this.executor_handle&&!this.executor_handle.closed()) {
				this.executor_handle.reject(new Error("Worker destroyed before it was connected"))
			}
		}
		this.timer.destroy()
	}
}

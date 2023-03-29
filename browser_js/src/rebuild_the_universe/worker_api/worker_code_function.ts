import {
	TimeoutSetSingleMessageT,
	ReplyToWorkerT,
	TimeoutClearRepeatingT,
	TimeoutClearSingleT,
	TimeoutMessageReplyT,
	TimeoutRepeatingReplyT,
	TimeoutSingleReplyT,
	WorkerUpdateMessageHandlerT,
	TimeoutClearSingleMessageT,
	TimeoutClearRepeatingMessageT,
	TimeoutSetRepeatingMessageT,
	WorkerVerifyCallback
} from "./constant_types.js";
import {TimeoutWorkerTypes} from "./interfaces.js";
import {TimerApi} from "./TimerApi.js";
import {TimerTag} from "./TimerTag.js";

export function worker_code_function(verify_callback?: WorkerVerifyCallback) {
	const TIMER_SINGLE=1;
	const TIMER_REPEATING=2;
	const TIMER_TAG_COUNT=3;
	if(verify_callback) {
		verify_callback({
			TIMER_SINGLE,
			TIMER_REPEATING,
			TIMER_TAG_COUNT
		});
	}
	class RemoteWorkerState {
		m_timer: RemoteTimer|null;
		unique_script_id;
		constructor() {
			this.m_timer=null;
			this.unique_script_id=1;
		}
		set_timer(timer: RemoteTimer) {
			this.m_timer=timer;
		}
		set(tag: TimerTag,remote_id: number,timeout: number) {
			if(!this.m_timer) throw new Error("Bad");
			return this.m_timer.set(tag,remote_id,timeout);
		}
		clear(msg: TimeoutClearSingleMessageT|TimeoutClearRepeatingMessageT) {
			if(this.m_timer)
				return this.m_timer.do_clear(msg);
		}
	}
	function nop_fn() {}
	function fire_timer(timer: RemoteTimer,remote_id: number) {
		timer.fire(remote_id);
	}
	type NL<T>=T|null;
	let remote_api_info_instance: NL<TimerApi>=null;
	let message_types: NL<TimerApi['msg_types']>=null;
	let reply_message_types: NL<TimerApi['msg_types']['reply']>=null;
	let fire_pause: any[]=[];
	class RemoteTimerItem {
		type: TimerTag;
		local_id: number=-1;
		active=true;
		constructor(type: TimerTag) {
			this.type=type;
		}
	}
	class RemoteTimer {
		m_remote_id_to_state_map: Map<number,RemoteTimerItem>;
		m_api_info: NL<TimerApi>;
		base_id;
		constructor(api_info: NL<TimerApi>) {
			this.m_remote_id_to_state_map=new Map;
			if(!api_info) {
				this.m_api_info=null;
				return;
			}
			this.m_api_info=api_info;
			this.base_id=globalThis[this.m_api_info.set_names.single](nop_fn);
			globalThis[this.m_api_info.clear_names.single](this.base_id);
		}
		fire(remote_id: number) {
			let local_state=this.m_remote_id_to_state_map.get(remote_id);
			if(!local_state)
				return;
			this.validate_state(local_state,remote_id);
			if(!local_state.active) {
				console.log('fire inactive',remote_id,local_state);
				return;
			}
			let tag=local_state.type;
			let msg_id;
			let reply_id!: TimeoutSingleReplyT|TimeoutRepeatingReplyT;
			if(!this.m_api_info)
				return;
			switch(tag) {
				case TIMER_SINGLE: {
					msg_id=this.m_api_info.msg_types.fire.single;
					reply_id=this.m_api_info.msg_types.worker.reply.fire.single;
				} break;
				case TIMER_REPEATING: {
					msg_id=this.m_api_info.msg_types.fire.repeating;
					reply_id=this.m_api_info.msg_types.worker.reply.fire.repeating;
				} break;
			}
			if(!msg_id) {
				console.assert(false,'Unknown tag in RemoteWorker.fire',tag);
				console.info('TypeError like: let v:TIMER_SINGLE|TIMER_REPEATING (%o|%o) = %o',TIMER_SINGLE,TIMER_REPEATING,tag);
				return;
			}
			if(fire_pause.includes(remote_id)) {
				return;
			} else {
				fire_pause.push(remote_id);
			}
			console.log('worker fire',msg_id,remote_id);
			postMessage({
				t: msg_id,
				v: {
					t: reply_id,
					v: remote_id
				}
			});
		}
		set(tag: TimerTag,remote_id: number,timeout: number) {
			this.verify_tag(tag);
			let obj=new RemoteTimerItem(tag);
			this.m_remote_id_to_state_map.set(remote_id,obj);
			let api_name=this.get_name_for_tag(tag);
			obj.local_id=globalThis[api_name](fire_timer,timeout,this,remote_id);
			return obj.local_id;
		}
		get_name_for_tag(tag: TimerTag): TimerApi["set_names"]["single"]|TimerApi["set_names"]["repeating"] {
			if(!this.m_api_info) throw new Error("No m_api_info on RemoteTimer class");
			switch(tag) {
				case TIMER_SINGLE: return this.m_api_info.set_names.single;
				case TIMER_REPEATING: return this.m_api_info.set_names.repeating;
			}
		}
		// Please verify your type tag is valid before changing any state, or you might end up in an invalid state
		verify_tag(tag: TimerTag) {
			if(!this.validate_tag(tag)) {
				throw new Error("tag verification failed in RemoteTimer");
			}
		}
		verify_state(state: RemoteTimerItem,remote_id: number) {
			if(!this.validate_state(state,remote_id)) {
				console.info("Removed invalid local_state");
				if(!this.m_api_info)
					return;
				globalThis[this.m_api_info.clear_names.single](state.local_id);
				globalThis[this.m_api_info.clear_names.repeating](state.local_id);
				this.m_remote_id_to_state_map.delete(remote_id);
				throw new Error("Tag verification failed in RemoteWorker");
			}
		}
		validate_tag(tag: TimerTag) {
			if(tag<TIMER_SINGLE||tag>=TIMER_TAG_COUNT) {
				console.assert(false,"Assertion failed in RemoteTimer.validate_tag: tag=%o is out of range");
				console.info("Info: range is TIMER_SINGLE to TIMER_TAG_COUNT-1 (%o...%o-1)",tag,TIMER_SINGLE,TIMER_TAG_COUNT);
				return false;
			}
			return true;
		}
		validate_state(state: RemoteTimerItem,_remote_id: number) {
			return this.validate_tag(state.type);
		}
		clear(remote_id: number): number|null {
			if(this.m_remote_id_to_state_map.has(remote_id)) {
				let state=this.m_remote_id_to_state_map.get(remote_id)!;
				this.verify_state(state,remote_id);
				if(!this.m_api_info)
					return null;
				if(state.type===TIMER_SINGLE) {
					globalThis[this.m_api_info.clear_names.single](state.local_id);
				}
				if(state.type===TIMER_REPEATING) {
					globalThis[this.m_api_info.clear_names.repeating](state.local_id);
				}
				state.active=false;
				this.m_remote_id_to_state_map.delete(remote_id);
				return state.local_id;
			}
			return null;
		}
		do_clear(msg: TimeoutClearSingleMessageT|TimeoutClearRepeatingMessageT) {
			let remote_id=msg.v;
			let maybe_local_id=this.clear(remote_id);
			if(!message_types)
				return;
			if(!reply_message_types)
				return;
			if(maybe_local_id===void 0)
				return;
			if(maybe_local_id===null)
				return;
			// debugger
			switch(msg.t) {
				case message_types.worker.clear.single: {
					// debugger
					const message: {
						t: typeof reply_message_types.from_worker;
						v: {
							t: typeof message_types.reply.clear.single;
							v: [remote_id: number,local_id: number,msg_from: TimeoutClearSingleT];
						};
					}={
						t: reply_message_types.from_worker,
						v: {
							t: message_types.reply.clear.single,
							v: [remote_id,maybe_local_id,msg.t]
						}
					};
					postMessage(message);
				} break;
				case message_types.worker.clear.repeating: {
					// debugger
					const message: {
						t: typeof reply_message_types.from_worker;
						v: {
							t: typeof message_types.reply.clear.repeating;
							v: [remote_id: number,local_id: number,msg_from: TimeoutClearRepeatingT];
						};
					}={
						t: reply_message_types.from_worker,
						v: {
							t: message_types.reply.clear.repeating,
							v: [remote_id,maybe_local_id,msg.t]
						}
					};
					postMessage(message);
				} break;
				default: {
					console.error("RemoteTimer.do_clear unexpected message");
					debugger;
				} break;
			}
		}
	}
	let remote_worker_state=new RemoteWorkerState;
	globalThis.remote_worker_state=remote_worker_state;
	remote_worker_state.set_timer(new RemoteTimer(remote_api_info_instance));
	let stored_for_later_messages: WorkerMessageType[]=[];
	type ReplyToWorkerMessageType={
		t: ReplyToWorkerT;
		v: never;
	};
	type UpdateWorkerMessageHandler={
		t: WorkerUpdateMessageHandlerT;
		v: UpdateMessageHandlerType;
	};
	type MessageTimeoutMessageR={
		t: TimeoutMessageReplyT;
		v: never;
	};
	type WorkerMessageType=TimeoutClearRepeatingMessageT|ReplyToWorkerMessageType|UpdateWorkerMessageHandler|MessageTimeoutMessageR|TimeoutSetSingleMessageT|TimeoutSetRepeatingMessageT|TimeoutClearSingleMessageT;
	type UpdateMessageHandlerType={
		init: string;
		onmessage: string;
	};
	onmessage=function(e: MessageEvent<WorkerMessageType>) {
		if(!message_types) return;
		let worker_msg_types=new TimeoutWorkerTypes;
		let msg=e.data;
		if(!remote_worker_state.m_timer) {
			console.log('got message but don\'t have a timer');
			return;
		}
		if(!reply_message_types||!message_types) {
			stored_for_later_messages.push(e.data);
			return;
		}
		switch(msg.t) {
			case reply_message_types.to_worker /*reply*/: {
				let result=msg.v;
				console.assert(false,"unhandled result on remote worker",result);
				debugger;
			} break;
			case worker_msg_types.update_message_handler /*remote worker init*/: {
				debugger;
				let user_msg=msg.v;
				let worker_str="()"[0];
				worker_str+=user_msg.init;
				worker_str+="()"[1];
				worker_str+="()";
				worker_str+="\n";
				worker_str+="onmessage=";
				worker_str+=user_msg.onmessage;
				worker_str+="\n";
				worker_str+="//# sourceURL=$__.";
				worker_str+=remote_worker_state.unique_script_id;
				eval(worker_str);
				remote_worker_state.unique_script_id++;
				const message={
					t: reply_message_types.from_worker,
					v: {
						t: 1,
						v: msg.t
					}
				};
				postMessage(message);
			} break;
			case message_types.worker.ready: {
				const message={
					t: reply_message_types.from_worker,
					v: {
						t: message_types.reply.ready,
						v: msg.t
					}
				};
				postMessage(message);
			} break;
			case message_types.worker.set.single /*remote timer set single*/: {
				// debugger
				let user_msg=msg.v;
				console.log('worker set single',user_msg.t,user_msg.v);
				let local_id=remote_worker_state.set(TIMER_SINGLE,user_msg.t,user_msg.v);
				if(!local_id)
					return;
				const message={
					t: reply_message_types.from_worker,
					v: {
						t: message_types.reply.set.single,
						v: [local_id,msg.t,user_msg.t,user_msg.v]
					}
				};
				postMessage(message);
			} break;
			case message_types.worker.set.repeating /*remote timer set repeating*/: {
				// debugger
				let user_msg=msg.v;
				console.log('worker set repeating',user_msg.t,user_msg.v);
				let local_id=remote_worker_state.set(TIMER_REPEATING,user_msg.t,user_msg.v);
				if(!local_id)
					return;
				const message: {
					t: typeof reply_message_types.from_worker;
					v: {
						t: typeof message_types.reply.set.repeating;
						v: [typeof local_id,typeof msg.t,typeof user_msg.t,typeof user_msg.v];
					};
				}={
					t: reply_message_types.from_worker,
					v: {
						t: message_types.reply.set.repeating,
						v: [local_id,msg.t,user_msg.t,user_msg.v]
					}
				};
				postMessage(message);
			} break;
			case message_types.worker.clear.single /*remote timer do_clear single*/: {
				// debugger
				remote_worker_state.clear(msg);
			} break;
			case message_types.worker.clear.repeating /*remote timer do_clear repeating*/: {
				// debugger
				remote_worker_state.clear(msg);
			} break;
			default: {
				console.assert(false,"RemoteWorker: Unhandled message",msg);
				debugger;
			} break;
		}
	};
}

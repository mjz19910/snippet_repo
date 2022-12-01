// ==UserScript==
// @name         remote_worker_timers script
// @namespace    http://tampermonkey.net/
// @version      3.2.2
// @description  try to take over the world!
// @author       You
// @match        https://rebuildtheuniverse.com/test_remote_setTimeout
// @grant        none
// @run-at       document-start
// @updateURL    https://github.com/mjz19910/snippet_repo/raw/master/javascript/modules/remote_worker_timers/remote_worker_timers.meta.js
// @downloadURL  https://github.com/mjz19910/snippet_repo/raw/master/javascript/modules/remote_worker_timers/remote_worker_timers.user.js
// ==/UserScript==
/* eslint-disable no-undef,no-lone-blocks,no-eval */

(function() {
	'use strict';
	const LOG_LEVEL_CRIT=1;
	const LOG_LEVEL_ERROR=2;
	const LOG_LEVEL_WARN=3;
	const LOG_LEVEL_NOTICE=4;
	const LOG_LEVEL_INFO=5;
	const LOG_LEVEL_DEBUG=6;
	const local_logging_level=LOG_LEVEL_WARN;
	/**
	 * @param {number} level
	 * @param {string[]} args
	 */
	function l_log_if(level,...args) {
		if(level<=local_logging_level) {
			console.log(...args);
		}
	}
	l_log_if(LOG_LEVEL_CRIT,"Critical: test");
	l_log_if(LOG_LEVEL_ERROR,"Error: test");
	l_log_if(LOG_LEVEL_NOTICE,"Notice: test");
	l_log_if(LOG_LEVEL_DEBUG,"Debug: test");
	class TimerTagSingle {
		/** @readonly */
		value=TIMER_SINGLE;
	}
	class TimerTagRepeating {
		/** @readonly */
		value=TIMER_REPEATING;
	}
	/**@typedef {TimerTagSingle|TimerTagRepeating} TimerTagValues */
	/**@typedef {TimerTagValues['value']} TimerTag */
	class TimerState {
		/**
		 * @arg {TimerTag} tag
		 * @arg {number} id
		 * @param {boolean} is_repeating
		 * @param {TimerHandler} target_fn
		 * @param {any} target_args
		 * @param {number} timeout
		 */
		constructor(id,tag,is_repeating,target_fn,target_args,timeout) {
			this.id=id;
			this.active=true;
			/**@type {TimerTag} */
			this.type=tag;
			/**@type {boolean} */
			this.repeat=is_repeating;
			/**@type {TimerHandler} */
			this.target_fn=target_fn;
			this.target_args=target_args;
			/**@type {number} */
			this.timeout=timeout;
		}
	}
	class ActiveTimerState {
		/**
		 * @arg {TimerTag} type
		 * @arg {number} id
		 * @param {boolean} is_repeating
		 * @param {Function} target_fn
		 * @param {any} target_args
		 * @param {number} timeout
		 */
		constructor(id,type,is_repeating,target_fn,target_args,timeout) {
			this.id=id;
			this.active=true;
			/**@type {TimerTag} */
			this.type=type;
			/**@type {boolean} */
			this.repeat=is_repeating;
			/**@type {Function} */
			this.target_fn=target_fn;
			this.target_args=target_args;
			/**@type {number} */
			this.timeout=timeout;
		}
	}
	function timer_nop() {}
	class PromiseExecutorHandle {
		/**
		 * @param {any} accept
		 * @param {any} reject
		 */
		constructor(accept,reject) {
			this.m_closed=false;
			this.m_accept=accept;
			this.m_reject=reject;
		}
		/**
		 * @param {any} value
		 */
		accept(value) {
			if(this.m_closed) throw new Error("accept called on closed handle");
			let accept=this.m_accept;
			accept(value);
			this.close();
		}
		/**
		 * @param {any} error
		 */
		reject(error) {
			if(this.m_closed) throw new Error("accept called on closed handle");
			let reject=this.m_reject;
			reject(error);
			this.close();
		}
		closed() {
			return this.m_closed;
		}
		close() {
			this.m_closed=true;
			this.m_accept=null;
			this.m_reject=null;
		}
	}
	const TIMER_SINGLE=1;
	const TIMER_REPEATING=2;
	const TIMER_TAG_COUNT=3;
	const TimeoutFireSingle=101;
	const TimeoutFireRepeating=102;
	const WorkerUpdateMessageHandler=201;
	const TimeoutMessageR=202;
	const TimeoutSetS=203;
	const TimeoutSetR=204;
	const TimeoutClearSingle=205;
	const TimeoutClearRepeating=206;
	const TimeoutClearA=207;
	const WorkerDestroyMessage=300;
	const WorkerReadyReply=302;
	const ReplySetSingle=303;
	const ReplySetRepeating=304;
	const ReplyClearSingle=305;
	const ReplyClearRepeating=306;
	const ReplyClearAny=307;
	const ReplyMessage1=401;
	const ReplyMessage2=402;
	const ReplyFromWorker=500;
	const ReplyToWorker=600;
	const TimeoutSingleReply=700;
	const TimeoutRepeatingReply=701;
	const WorkerAsyncMessage=801;
	const TimerWorkerSetTypes=1001;
	class ReplyClearMessages {
		/** @readonly */
		single=ReplyClearSingle;
		/** @readonly */
		repeating=ReplyClearRepeating;
		/** @readonly */
		any=ReplyClearAny;
	}
	class ReplySetMessages {
		/** @readonly */
		single=ReplySetSingle;
		/** @readonly */
		repeating=ReplySetRepeating;
	};
	class ReplyTypes {
		/** @readonly */
		destroy_worker=WorkerDestroyMessage;
		/** @readonly */
		update_handler=301;
		/** @readonly */
		ready=WorkerReadyReply;
		/** @readonly */
		msg1=ReplyMessage1;
		/** @readonly */
		msg2=ReplyMessage2;
		/** @readonly */
		from_worker=ReplyFromWorker;
		/** @readonly */
		to_worker=ReplyToWorker;
		set=new ReplySetMessages;
		clear=new ReplyClearMessages;
	}
	class TimeoutFireInfo {
		/** @readonly */
		single=TimeoutFireSingle;
		/** @readonly */
		repeating=TimeoutFireRepeating;
	}
	class TimeoutSetInfo {
		/** @readonly */
		single=TimeoutSetS;
		/** @readonly */
		repeating=TimeoutSetR;
	}
	class TimeoutClearInfo {
		/** @readonly */
		single=TimeoutClearSingle;
		/** @readonly */
		repeating=TimeoutClearRepeating;
		/** @readonly */
		any=TimeoutClearA;
	}
	class WorkerFireReplyTypes {
		/** @readonly */
		single=TimeoutSingleReply;
		/** @readonly */
		repeating=TimeoutRepeatingReply;
	}
	class WorkerReplyTypes {
		fire=new WorkerFireReplyTypes;
	}
	class TimeoutWorkerTypes {
		reply=new WorkerReplyTypes;
		/** @readonly */
		update_message_handler=WorkerUpdateMessageHandler;
		/** @readonly */
		ready=TimeoutMessageR;
		set=new TimeoutSetInfo;
		clear=new TimeoutClearInfo;
		/** @readonly */
		set_types=TimerWorkerSetTypes;
	}
	const TimeoutSetStringS="setTimeout";
	const TimeoutSetStringR="setInterval";
	const TimeoutClearStringS="clearTimeout";
	const TimeoutClearStringR="clearInterval";
	class TimeoutSetStrings {
		/** @readonly */
		single=TimeoutSetStringS;
		/** @readonly */
		repeating=TimeoutSetStringR;
	}
	class TimeoutClearStrings {
		/** @readonly */
		single=TimeoutClearStringS;
		/** @readonly */
		repeating=TimeoutClearStringR;
	}
	class TimerApi {
		/** @readonly */
		async=WorkerAsyncMessage;
		/** @readonly */
		worker_set_types=TimerWorkerSetTypes;
		reply=new ReplyTypes;
		fire=new TimeoutFireInfo;
		worker=new TimeoutWorkerTypes;
		set_names=new TimeoutSetStrings;
		clear_names=new TimeoutClearStrings;
		validate() {
			console.log(this.reply);
		}
	}
	let g_timer_api=new TimerApi;
	class UniqueIdGenerator {
		constructor() {
			this.m_current=-1;
		}
		/**
		 * @param {number} current_value
		 */
		set_current(current_value) {
			this.m_current=current_value;
		}
		current() {
			return this.m_current;
		}
		next() {
			return this.m_current++;
		}
	}
	class VerifyError extends Error {
		/**
		 * @param {string | undefined} message
		 */
		constructor(message) {
			super(message);
			this.name="VerifyError";
		}
	}
	class AssertionError extends Error {
		/**
		 * @param {string | undefined} message
		 */
		constructor(message) {
			super(message);
			this.name="AssertionError";
		}
	}
	/**
	 * @param {boolean} assert_result
	 * @param {string} assert_message
	 */
	function VERIFY(assert_result,assert_message) {
		if(!assert_result) {
			throw new VerifyError(assert_message);
		}
	}
	/** @arg {unknown} value @returns {asserts value is NonNullable<value>} */
	function assert_non_null(value) {
		if(value===null) {
			throw new AssertionError("Failed assert non null");
		}
	}
	class Timer {
		/** @arg {UniqueIdGenerator} id_generator @arg {TimerApi} api_info */
		constructor(id_generator,api_info) {
			this.id_generator=id_generator;
			/**@type {Map<number, TimerState>} */
			this.m_remote_id_to_state_map=new Map;
			this.worker_state=null;
			this.m_api_map=new Map;
			this.m_raw_api_info=api_info;
			this.set_api_names(g_timer_api.set_names,g_timer_api.clear_names);
			/**@type {Map<number, ActiveTimerState>} */
			this.m_active_state_map=new Map;
		}
		/**@arg {TimerApi['set_names']|TimerApi['clear_names']} names */
		set_map_names(names) {
			this.add_one_name(names.single);
			this.add_one_name(names.repeating);
		}
		/**
		 * @param {keyof Window} key
		 */
		add_one_name(key) {
			this.m_api_map.set(key,window[key]);
		}
		/**@arg {TimerApi['set_names']} set @arg {TimerApi['clear_names']} clear */
		set_api_names(set,clear) {
			this.set_map_names(set);
			this.set_map_names(clear);
			this.base_id=window[set.single](timer_nop);
			window[clear.single](this.base_id);
			this.id_generator.set_current(this.base_id);
		}
		/**
		 * @param {WorkerState} worker_state_value
		 */
		set_worker_state(worker_state_value) {
			this.worker_state=worker_state_value;
		}
		/** @returns {asserts this is {worker_state: NonNullable<Timer['worker_state']>}} */
		assert_valid_worker() {
			assert_non_null(this.worker_state);
		}
		/**
		 * @arg {TimerTag} tag
		 * @param {number} remote_id
		 */
		fire(tag,remote_id) {
			this.assert_valid_worker();
			let state=this.get_state_by_remote_id(remote_id);
			if(!state) throw new Error("No state for id");
			let active_state=this.activate_state(state);
			try {
				if(active_state.active) {
					active_state.target_fn.apply(null,state.target_args);
				}
			} finally {
				if(tag===TIMER_SINGLE) {
					state.active=false;
					this.clear(tag,remote_id);
				}
				this.worker_state.postMessage({
					type: g_timer_api.worker.reply.fire.single,
					value: remote_id
				});
			}
		}
		/** @arg {TimerState} state */
		activate_state(state) {
			let id=state.id;
			if(!this.m_active_state_map.has(id)) {
				if(typeof state.target_fn==='string') {
					let func=new Function(state.target_fn);
					let active_state=new ActiveTimerState(id,state.type,state.repeat,func,state.target_args,state.timeout);
					this.m_active_state_map.set(id,active_state);
				}
			}
			let value=this.m_active_state_map.get(id);
			if(!value) throw new Error("Invalid");
			return value;
		}
		/**
		 * @param {1|2} tag
		 * @param {any} target_fn
		 * @param {number} timeout
		 * @param {any} target_args
		 */
		set(tag,target_fn,timeout,target_args) {
			let remote_id=this.id_generator.next();
			let is_repeating=false;
			if(tag===TIMER_REPEATING) {
				is_repeating=true;
			}
			if(timeout<0) timeout=0;
			let state=new TimerState(remote_id,tag,is_repeating,target_fn,target_args,timeout);
			this.store_state_by_remote_id(remote_id,state);
			this.send_worker_set_message(tag,{
				type: remote_id,
				value: timeout
			});
			return remote_id;
		}
		/**
		 * @param {any} tag
		 * @param {{ type: any; value: any; }} obj
		 */
		send_worker_set_message(tag,obj) {
			this.assert_valid_worker();
			let msg_id;
			switch(tag) {
				case TIMER_SINGLE: msg_id=g_timer_api.worker.set.single; break;
				case TIMER_REPEATING: msg_id=g_timer_api.worker.set.repeating; break;
			}
			if(!msg_id) {
				console.assert(false,'Unknown timer_tag',tag);
				console.info('TypeError like: let value:TIMER_SINGLE | TIMER_REPEATING (%o | %o) = %o',TIMER_SINGLE,TIMER_REPEATING,tag);
				return;
			}
			this.worker_state.postMessage({
				type: msg_id,
				value: obj
			});
		}
		/**
		 * @param {number} remote_id
		 */
		is_state_stored_by_remote_id(remote_id) {
			return this.m_remote_id_to_state_map.has(remote_id);
		}
		/**@arg {number} remote_id */
		get_state_by_remote_id(remote_id) {
			return this.m_remote_id_to_state_map.get(remote_id);
		}
		/**
		 * @param {number} remote_id
		 * @arg {TimerState} state
		 */
		store_state_by_remote_id(remote_id,state) {
			this.m_remote_id_to_state_map.set(remote_id,state);
		}
		/**
		 * @param {number} remote_id
		 */
		delete_state_by_remote_id(remote_id) {
			this.m_remote_id_to_state_map.delete(remote_id);
		}
		remote_id_to_state_entries() {
			return this.m_remote_id_to_state_map.entries();
		}
		/** @arg {ReplyMessageType2|TimeoutClearSingleMsg|TimeoutClearRepeatingMsg} msg */
		on_result(msg) {
			console.log(msg);
			switch(msg.type) {
				case g_timer_api.worker.clear.single: {
					let remote_id=msg.value;
					this.delete_state_by_remote_id(remote_id);
					break;
				}
				case g_timer_api.worker.clear.repeating: {
					let remote_id=msg.value;
					this.delete_state_by_remote_id(remote_id);
					break;
				}
				case ReplyMessage2: {
					console.assert(false,'on_result timer_result_msg needs a handler for ReplyMessage2');
				} break;
				default:
					console.assert(false,'on_result timer_result_msg needs a handler for',msg);
			}
		}
		/**
		 * @param {any} msg
		 */
		on_reply(msg) {
			switch(msg.type) {
				case g_timer_api.worker.clear.single: {
					let remote_id=msg.value;
					this.delete_state_by_remote_id(remote_id);
				} break;
				case g_timer_api.worker.clear.repeating: {
					let remote_id=msg.value;
					this.delete_state_by_remote_id(remote_id);
				} break;
				case g_timer_api.reply.clear.single: break;
				case g_timer_api.reply.clear.repeating: break;
				default: {
					console.log('reply for',msg);
				} break;
			}
		}
		/**
		 * @param {1|2} tag
		 * @param {number} remote_id
		 */
		force_clear(tag,remote_id) {
			this.assert_valid_worker();
			let state=this.get_state_by_remote_id(remote_id);
			if(!state) return;
			if(state.active) {
				return this.clear(tag,remote_id);
			}
			// we have to trust the user, go ahead and send the message anyway
			if(tag===TIMER_SINGLE) {
				this.worker_state.postMessage({
					type: g_timer_api.worker.clear.single,
					value: remote_id
				});
			} else if(tag===TIMER_REPEATING) {
				this.worker_state.postMessage({
					type: g_timer_api.worker.clear.repeating,
					value: remote_id
				});
			}
		}
		/**
		 * @param {TimerTag} tag
		 * @param {number} remote_id
		 */
		clear(tag,remote_id) {
			this.assert_valid_worker();
			let state=this.get_state_by_remote_id(remote_id);
			if(!state) return;
			if(state.active) {
				if(state.type===TIMER_SINGLE&&tag===TIMER_SINGLE) {
					this.worker_state.postMessage({
						type: g_timer_api.worker.clear.single,
						value: remote_id
					});
				} else if(state.type===TIMER_REPEATING&&tag===TIMER_REPEATING) {
					this.worker_state.postMessage({
						type: g_timer_api.worker.clear.repeating,
						value: remote_id
					});
				}
				state.active=false;
			}
		}
		destroy() {
			let api_map=this.m_api_map;
			window[g_timer_api.set_names.single]=api_map.get(g_timer_api.set_names.single);
			window[g_timer_api.set_names.repeating]=api_map.get(g_timer_api.set_names.repeating);
			window[g_timer_api.clear_names.single]=api_map.get(g_timer_api.clear_names.single);
			window[g_timer_api.clear_names.repeating]=api_map.get(g_timer_api.clear_names.repeating);
			for(var state_entry of this.remote_id_to_state_entries()) {
				let id=state_entry[0];
				void id;
				let state=state_entry[1];
				let active_state=this.activate_state(state);
				if(active_state.type===TIMER_SINGLE) {
					// if the timer might get reset when calling the function while
					// the timer functions are reset to the underlying api
					active_state.target_fn.apply(null,state.target_args);
				}
			}
			this.m_api_map.clear();
		}
	}
	class RemoteWorkerTypes {
		/** @readonly */
		async=WorkerAsyncMessage;
		reply=new ReplyTypes;
		fire=new TimeoutFireInfo;
		worker=new TimeoutWorkerTypes;
	}



	class TimeoutFireSMsg {
		/** @readonly */
		type=TimeoutFireSingle;
		value=0;
	}
	class TimeoutFireRMsg {
		/** @readonly */
		type=TimeoutFireRepeating;
		value=0;
	}
	class ReplyFromWorkerMsg {
		/** @readonly */
		type=ReplyFromWorker;
		value={};
	}
	class ReplyMessageType1 {
		/** @readonly */
		type=ReplyMessage1;
		value={};
	}
	class ReplyMessageType2 {
		/** @readonly */
		type=ReplyMessage2;
		value={};
	}
	class WorkerReadyReplyMsg {
		/** @readonly */
		type=WorkerReadyReply;
		value={};
	}
	class ReplySetSingleMsg {
		/** @readonly */
		type=ReplySetSingle;
		value={};
	}
	class ReplySetRepeatingMsg {
		/** @readonly */
		type=ReplySetRepeating;
		value={};
	}
	class ReplyClearSingleMsg {
		/** @readonly */
		type=ReplyClearSingle;
		value={};
	}
	class ReplyClearRepeatingMsg {
		/** @readonly */
		type=ReplyClearRepeating;
		value={};
	}
	class TimerWorkerSetTypesMsg {
		/** @readonly */
		type=TimerWorkerSetTypes;
		worker_types=new RemoteWorkerTypes;
	}
	class TimeoutClearSingleMsg {
		/** @readonly */
		type=TimeoutClearSingle;
		value=0;
	}
	class TimeoutClearRepeatingMsg {
		/** @readonly */
		type=TimeoutClearRepeating;
		value=0;
	}
	/**
	 * @template T
	 * @template {abstract new (...args: any)=>any} U
	 * @arg {T} _obj
	 * @arg {U} _fn
	 * @returns {asserts _obj is InstanceType<U>}
	 * */
	function assert_as_instance(_obj,_fn) {}
	/** @extends {EmptyStateMessage} */
	class WorkerStateMessage {
		/** @arg {WorkerStateMessage} msg */
		static as_reply_type_1(msg) {
			assert_as_instance(msg,ReplyMessageType1);
			return msg;
		}
		/** @arg {WorkerStateMessage} msg */
		static as_reply_type_2(msg) {
			assert_as_instance(msg,ReplyMessageType2);
			return msg;
		}
		/** @arg {WorkerStateMessage} msg */
		static as_reply_from_worker(msg) {
			assert_as_instance(msg,ReplyFromWorkerMsg);
			return msg;
		}
		/** @arg {WorkerStateMessage} msg */
		static as_timeout_fire(msg) {
			assert_as_instance(msg,TimeoutFireSMsg);
			return msg;
		}
		/** @arg {WorkerStateMessage} msg */
		static as_timer_fire(msg) {
			assert_as_instance(msg,TimeoutFireRMsg);
			return msg;
		}
		/** @type {typeof TimeoutFireSingle|typeof TimeoutFireRepeating|typeof WorkerDestroyMessage|typeof ReplyMessage1|typeof ReplyMessage2|typeof ReplyFromWorker} */
		type=TimeoutFireSingle;
		/** @type {number|{}|null} */
		value=null;
		static as_any_of() {
			let fv=false;
			if(fv) {return new ReplyMessageType1;}
			if(fv) {return new ReplyMessageType2;}
			if(fv) {return new TimeoutFireRMsg;}
			return new TimeoutFireRMsg;
		}
	}
	const WorkerStateMessageV=WorkerStateMessage.as_any_of();
	class WorkerState {
		/**
		 * @param {Blob} worker_code_blob
		 * @arg {Timer} timer
		 * @arg {PromiseExecutorHandle} executor_handle
		 */
		constructor(worker_code_blob,timer,executor_handle) {
			let has_blob=false;
			if(worker_code_blob instanceof Blob) has_blob=true;
			if(!has_blob) throw new Error("WorkerState requires a blob with javascript code to execute on a worker");
			if(!timer) throw new Error("WorkerState needs a timer");
			this.rejected=false;
			this.valid=false;
			this.connected=false;
			this.worker_code=worker_code_blob;
			this.timer=timer;
			this.executor_handle=executor_handle;
			this.failed=false;
			timer.set_worker_state(this);
			WorkerState.set_global_state(this);
			/** @type {string|null} */
			this.worker_url=URL.createObjectURL(this.worker_code);
			/** @type {Worker|null} */
			this.worker=new Worker(this.worker_url);
		}
		init() {
			if(!this.worker) {
				return;
			}
			if(this.connected||this.valid) {
				this.destroy();
			}
			this.connected=false;
			this.worker.onmessage=function onmessage(e) {
				let worker_state=WorkerState.get_global_state();
				if(!worker_state) {
					console.log('lost worker state');
					this.terminate();
					return;
				}
				worker_state.handle_message(e);
			};
			this.valid=true;
			this.worker.postMessage({
				type: g_timer_api.worker_set_types,
				value: g_timer_api
			});
		}
		/** @arg {MessageEvent<typeof WorkerStateMessageV>} e */
		handle_message(e) {
			let msg=e.data;
			let worker_state=this;
			switch(msg.type) {
				case TimeoutFireSingle: {
					let m_msg=WorkerStateMessage.as_timeout_fire(msg);
					worker_state.timer.fire(TIMER_SINGLE,m_msg.value);
					break;
				}
				case TimeoutFireRepeating/*worker_state.timer repeating fire*/: {
					let m_msg=WorkerStateMessage.as_timer_fire(msg);
					worker_state.timer.fire(TIMER_REPEATING,m_msg.value);
				} break;
				case WorkerDestroyMessage/*worker_state destroy*/: {
					worker_state.destroy();
				} break;
				case ReplyMessage1: {
					let m_msg=WorkerStateMessage.as_reply_type_1(msg);
					worker_state.dispatch_message(m_msg);
				} break;
				case ReplyMessage2/*worker_state dispatch_message_raw*/: {
					let m_msg=WorkerStateMessage.as_reply_type_2(msg);
					worker_state.dispatch_message(m_msg);
				} break;
				case ReplyFromWorker/*worker_state dispatch_message*/: {
					let m_msg=WorkerStateMessage.as_reply_from_worker(msg);
					worker_state.dispatch_message(m_msg);
					break;
				}
				default: {
					console.assert(false,"Main: Unhandled message",msg);
					debugger;
					break;
				}
			}
		}
		/**
		 * @param {any} handle
		 */
		set_executor_handle(handle) {
			this.executor_handle=handle;
		}
		/**
		 * @param {ReplySetSingleMsg|WorkerReadyReplyMsg|ReplyMessageType1|ReplyMessageType2} msg
		 */
		on_result(msg) {
			if(!this.worker) throw new Error("No worker");
			switch(msg.value) {
				case g_timer_api.worker.ready: {
					if(this.executor_handle===null||this.executor_handle.closed()) {
						console.assert(false,"WorkerState on_result called with invalid executor_handle");
						break;
					}
					l_log_if(LOG_LEVEL_INFO,"remote_worker ready");
					this.executor_handle.accept(this);
					this.connected=true;
					break;
				}
				case g_timer_api.worker_set_types: {
					this.worker.postMessage({
						type: g_timer_api.worker.ready
					});
				} break;
			}
		}
		/**
		 * @param {TimerWorkerSetTypesMsg|ReplyClearRepeatingMsg|ReplyClearSingleMsg|ReplySetRepeatingMsg|ReplySetSingleMsg|WorkerReadyReplyMsg|ReplyMessageType1|ReplyMessageType2|ReplyFromWorkerMsg} msg
		 */
		dispatch_message(msg) {
			switch(msg.type) {
				case WorkerReadyReply: {
					this.on_result(msg);
				} break;
				case ReplySetSingle: {
					this.on_result(msg);
				} break;
				case ReplyMessage1: {
					this.on_result(msg);
				} break;
				case ReplyMessage2: {
					this.timer.on_result(msg);
				} break;
				case ReplySetRepeating: {
					this.timer.on_reply(msg);
				} break;
				case g_timer_api.reply.clear.single: {
					this.timer.on_reply(msg);
				} break;
				case g_timer_api.reply.clear.repeating: {
					this.timer.on_reply(msg);
				} break;
				case g_timer_api.worker_set_types: {
					this.on_result_ex(msg);
				} break;
				default: {
					console.assert(false,"unhandled result",msg);
					debugger;
				}
			}
		}
		/** @arg {TimerWorkerSetTypesMsg} msg */
		on_result_ex(msg) {
			if(!this.worker) throw new Error("No worker");
			console.log("result_ex",msg);
		}
		/**
		 * @param {any} data
		 */
		postMessage(data) {
			if(!this.worker) throw 1;
			return this.worker.postMessage(data);
		}
		/**
		 * @param {WorkerState} worker_state_value
		 */
		static has_old_global_state_value(worker_state_value) {
			return this.has_global_state()&&!this.equals_global_state(worker_state_value);
		}
		/**
		 * @param {WorkerState} worker_state_value
		 */
		static equals_global_state(worker_state_value) {
			return this.get_global_state()===worker_state_value;
		}
		/**
		 * @param {WorkerState} worker_state_value
		 */
		static maybe_delete_old_global_state_value(worker_state_value) {
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
			this.delete_global_state();
			old_worker_state.destroy();
		}
		/** @readonly */
		static global_state_key="g_worker_state";
		static has_global_state() {
			return window.hasOwnProperty(this.global_state_key);
		}
		/** @returns {WorkerState} */
		static get_global_state() {
			/** @type {any} */
			let any_window=window;
			return any_window[this.global_state_key];
		}
		/**
		 * @param {WorkerState} worker_state_value
		 */
		static set_global_state(worker_state_value) {
			/** @type {any} */
			let any_window=window;
			this.maybe_delete_old_global_state_value(worker_state_value);
			any_window[this.global_state_key]=worker_state_value;
		}
		static delete_global_state() {
			/** @type {any} */
			let any_window=window;
			delete any_window[this.global_state_key];
		}
		destroy() {
			if(!this.worker_url||!this.worker) {
				this.timer.destroy();
				this.valid=false;
				return;
			}
			this.worker.terminate();
			this.worker=null;
			URL.revokeObjectURL(this.worker_url);
			this.worker_url=null;
			if(this.executor_handle!==null&&!this.executor_handle.closed()) {
				this.executor_handle.reject(new Error("Worker destroyed before it was connected"));
			}
			this.connected=false;
			this.timer.destroy();
			this.valid=false;
		}
	}
	/**
	 * @param {(arg0: null) => void} executor_accept
	 * @param {(arg0: Error) => void} executor_reject
	 */
	function set_timeout_on_remote_worker_executor(executor_accept,executor_reject) {
		let failed=false;
		/** @type {any} */
		let any_global=globalThis;
		if(any_global.remote_worker_state) {
			postMessage({t: WorkerDestroyMessage});
			executor_accept(null);
			return;
		}
		if(WorkerState.maybe_delete_old_global_state()) return null;
		try {
			worker_code_function(function(/** @type {{ TIMER_REPEATING: number; TIMER_TAG_COUNT: number; TimerWorkerSetTypes: number; }} */ verify_obj) {
				VERIFY(verify_obj.TIMER_REPEATING===TIMER_REPEATING,"TIMER_SINGLE constant matches");
				VERIFY(verify_obj.TIMER_REPEATING===TIMER_REPEATING,"TIMER_REPEATING constant matches");
				VERIFY(verify_obj.TIMER_TAG_COUNT===TIMER_TAG_COUNT,"TIMER_TAG_COUNT constant matches");
				VERIFY(verify_obj.TimerWorkerSetTypes===TimerWorkerSetTypes,"TimerWorkerSetTypes constant matches");
				return;
			},function verify_fail() {
				executor_reject(new Error("verify_fail called"));
				failed=true;
			});
			if(failed) {
				return;
			}
		} catch(e) {
			console.log(e);
			executor_reject(new Error("worker_code_function caused an error"));
			failed=true;
			return;
		}
		let id_generator=new UniqueIdGenerator;
		let timer=new Timer(id_generator,new TimerApi);
		let executor_handle=new PromiseExecutorHandle(executor_accept,executor_reject);
		let worker_code_blob=new Blob(["(",worker_code_function.toString(),")()","\n//# sourceURL=$__.0"]);
		let worker_state=new WorkerState(worker_code_blob,timer,executor_handle);
		worker_state.init();
		const setTimeout_global=setTimeout;
		/**
		 * @param {TimerHandler} handler
		 * @param {number | undefined} timeout
		 * @param {any[]} target_args
		 */
		function remoteSetTimeout(handler,timeout,...target_args) {
			if(!worker_state) {
				setTimeout=setTimeout_global;
				l_log_if(LOG_LEVEL_WARN,'lost worker_state in timer');
				return setTimeout_global(handler,timeout,...target_args);
			}
			if(typeof timeout==='undefined') timeout=0;
			return worker_state.timer.set(TIMER_SINGLE,handler,timeout,target_args);
		}
		const clearTimeout_global=clearTimeout;
		/**@arg {number|undefined} id */
		function remoteClearTimeout(id) {
			if(!worker_state) {
				clearTimeout=clearTimeout_global;
				l_log_if(LOG_LEVEL_WARN,'lost worker_state in timer');
				return clearTimeout_global(id);
			}
			if(id) {
				worker_state.timer.clear(TIMER_SINGLE,id);
			}
		}
		const setInterval_global=setInterval;
		/**
		 * @param {TimerHandler} handler
		 * @param {any[]} target_args
		 */
		function remoteSetInterval(handler,timeout=0,...target_args) {
			if(!worker_state) {
				setInterval=setInterval_global;
				l_log_if(LOG_LEVEL_WARN,'lost worker_state in timer');
				return setInterval_global(handler,timeout,...target_args);
			}
			if(typeof timeout==='undefined') timeout=0;
			return worker_state.timer.set(TIMER_REPEATING,handler,timeout,target_args);
		}
		const clearInterval_global=clearInterval;
		/**@arg {number} id */
		function remoteClearInterval(id) {
			if(!worker_state) {
				clearInterval=clearInterval_global;
				l_log_if(LOG_LEVEL_WARN,'lost worker_state in timer');
				return clearInterval_global(id);
			}
			worker_state.timer.clear(TIMER_REPEATING,id);
		}
		window.old_local={
			setTimeout,
			setInterval,
			clearTimeout,
			clearInterval
		};
		/**
		 * @param {{ [x: string]: any; setTimeout?: (handler: any, timeout: any, ...target_args: any[]) => any; setInterval?: (handler: any, timeout?: number, ...target_args: any[]) => any; clearTimeout?: (id?: number) => void; clearInterval?: (id: number) => void; }} obj
		 */
		function connect_local_to_remote_timer_api(obj) {
			/** @type {any} */
			let any_window=window;
			for(let key in obj) {
				any_window[key]=obj[key];
			}
			return obj;
		}
		window.g_remote_timer_api=connect_local_to_remote_timer_api({
			setTimeout: remoteSetTimeout,
			setInterval: remoteSetInterval,
			clearTimeout: remoteClearTimeout,
			clearInterval: remoteClearInterval
		});
		return worker_state;
	}
	/**
	 * @param {{ (verify_obj: any): void; (arg0: { TIMER_SINGLE: number; TIMER_REPEATING: number; TIMER_TAG_COUNT: number; TimerWorkerSetTypes: number; }): void; }} verify_callback
	 * @param {() => void} verify_fail
	 */
	function worker_code_function(verify_callback,verify_fail) {
		const TIMER_SINGLE=1;
		const TIMER_REPEATING=2;
		const TIMER_TAG_COUNT=3;
		const TimerWorkerSetTypes=1001;
		if(verify_callback) {
			verify_callback({
				/** @type {typeof TIMER_SINGLE} */
				TIMER_SINGLE: TIMER_SINGLE,
				/** @type {typeof TIMER_REPEATING} */
				TIMER_REPEATING: TIMER_REPEATING,
				/** @type {typeof TIMER_TAG_COUNT} */
				TIMER_TAG_COUNT: TIMER_TAG_COUNT,
				/** @type {typeof TimerWorkerSetTypes} */
				TimerWorkerSetTypes: TimerWorkerSetTypes
			});
		}
		/** @type {any[]} */
		const cached_messages=[];
		/** @template T @arg {T} value @returns {asserts value is NonNullable<T>} */
		function assert_non_nullable_object(value) {
			if(typeof value!=='object') throw 1;
			if(value===null) throw 1;
		}
		assert_non_nullable_object;
		/** @template T @arg {T} value @returns {{[U in keyof T]: T[U]}} */
		function decay_to_object(value) {
			return value;
		}
		decay_to_object;
		/**
		 * @param {MessageEvent<TimerWorkerSetTypesMsg>} e
		 */
		function message_without_types_handler(e) {
			if(!g_timer_api.worker_set_types) throw 1;
			let msg=e.data;
			switch(msg.type) {
				case g_timer_api.worker_set_types: {
					let value=msg.worker_types;
					let v_async=value.async;
					if(v_async===WorkerAsyncMessage) {
						g_timer_api.on_set_types(value);
					} else {
						throw new Error("Invalid timer_api_types");
					}
					if(!g_timer_api.reply) throw new Error("Failed to set timer_api.types");
					postMessage({
						type: g_timer_api.reply.from_worker,
						source_type: g_timer_api.worker_set_types,
					});
				} break;
				default: {
					cached_messages.push({data: msg});
				} break;
			}
		}
		/**
		 * @param {MessageEvent<any>} e
		 */
		function message_with_types_handler(e) {
			if(!g_timer_api.worker) throw new Error("Invalid");
			if(!g_timer_api.reply) throw new Error("Invalid");
			let msg=e.data;
			switch(msg.type) {
				case g_timer_api.reply.to_worker/*reply*/: {
					let result=msg.value;
					console.assert(false,"unhandled result on remote worker",result);
					debugger;
				} break;
				case g_timer_api.worker.ready/**/: {
					// debugger;
					postMessage({
						type: g_timer_api.reply.from_worker,
						value: {
							type: g_timer_api.reply.ready,
							value: msg.type
						}
					});
				} break;
				case g_timer_api.worker.set.single/*remote timer set single*/: {
					// debugger;
					let user_msg=msg.value;
					console.log('worker set single',user_msg.type,user_msg.value);
					let local_id=remote_worker_state.set(TIMER_SINGLE,user_msg.type,user_msg.value);
					postMessage({
						type: g_timer_api.reply.from_worker,
						from_data: g_timer_api.reply.set.single,
						args: [local_id,msg.type,user_msg.type,user_msg.value],
					});
				} break;
				case g_timer_api.worker.set.repeating/*remote timer set repeating*/: {
					// debugger;
					let user_msg=msg.value;
					console.log('worker set repeating',user_msg.type,user_msg.value);
					let local_id=remote_worker_state.set(TIMER_REPEATING,user_msg.type,user_msg.value);
					postMessage({
						type: g_timer_api.reply.from_worker,
						from_data: g_timer_api.reply.set.repeating,
						args: [local_id,msg.type,user_msg.type,user_msg.value],
					});
				} break;
				case g_timer_api.worker.clear.single: {
					remote_worker_state.clear(msg);
				} break;
				case g_timer_api.worker.clear.repeating: {
					remote_worker_state.clear(msg);
				} break;
				case g_timer_api.worker.reply.fire.single: break;
				case g_timer_api.worker.reply.fire.repeating: break;
				default: {
					console.assert(false,"RemoteWorker: Unhandled message",msg);
				} break;
			}
		}
		class RemoteTimerApi {
			/**@type {typeof WorkerAsyncMessage} */
			async=WorkerAsyncMessage;
			/**@type {typeof TimerWorkerSetTypes} */
			worker_set_types=TimerWorkerSetTypes;
			/**@typedef {import("../../../typescript/src/vm/ReplyTypesTy.js").ReplyTypesTy} ReplyTypesTy */
			/**@type {ReplyTypesTy} */
			reply=new ReplyTypes;
			/**@typedef {import("../../../typescript/src/vm/TimeoutFireInfoTy.js").TimeoutFireInfoTy} TimeoutFireInfoTy */
			/**@type {TimeoutFireInfoTy} */
			fire=new TimeoutFireInfo;
			/**@typedef {import("../../../typescript/src/vm/TimeoutWorkerTypesTy.js").TimeoutWorkerTypesTy} TimeoutWorkerTypesTy */
			/**@type {TimeoutWorkerTypesTy} */
			worker=new TimeoutWorkerTypes;
			/**@type {{single:"setTimeout",repeating:"setInterval"}} */
			set_names={
				single: "setTimeout",
				repeating: "setInterval"
			};
			/**@type {{single:"clearTimeout",repeating:"clearInterval"}} */
			clear_names={
				single: "clearTimeout",
				repeating: "clearInterval"
			};
			/**
			 * @param {RemoteWorkerTypes} types
			 */
			on_set_types(types) {
				this.async=types.async;
				this.reply=types.reply;
				this.fire=types.fire;
				this.worker=types.worker;
				for(let i=0;i<cached_messages.length;i++) {
					message_with_types_handler(cached_messages[i]);
				}
				onmessage=message_with_types_handler;
			}
		}
		class RemoteWorkerState {
			constructor() {
				/**@type {RemoteTimer|null} */
				this.m_timer=null;
				this.unique_script_id=1;
			}
			/** @arg {RemoteTimer} timer */
			set_timer(timer) {
				this.m_timer=timer;
			}
			/**
			 * @param {number} tag
			 * @param {any} remote_id
			 * @param {any} timeout
			 */
			set(tag,remote_id,timeout) {
				if(!this.m_timer) throw 1;
				return this.m_timer.set(tag,remote_id,timeout);
			}
			/**
			 * @param {any} msg
			 */
			clear(msg) {
				if(!this.m_timer) throw 1;
				return this.m_timer.do_clear(msg);
			}
		}
		function nop_fn() {};
		/**
		 * @param {RemoteTimer} timer
		 * @param {number} remote_id
		 */
		function fire_timer(timer,remote_id) {
			timer.fire(remote_id);
		}
		const g_timer_api=new RemoteTimerApi;
		class RemoteTimerState {
			/**
			 * @param {any} type
			 */
			constructor(type) {
				this.type=type;
				this.local_id=0;
			}
		}
		class RemoteTimer {
			constructor() {
				this.m_remote_id_to_state_map=new Map;
				this.base_id=globalThis[g_timer_api.set_names.single](nop_fn);
				globalThis[g_timer_api.clear_names.single](this.base_id);
			}
			/**
			 * @param {any} remote_id
			 */
			fire(remote_id) {
				if(!g_timer_api.fire) throw 1;
				let local_state=this.m_remote_id_to_state_map.get(remote_id);
				if(!local_state) return;
				this.validate_state(local_state);
				if(!local_state.active) {
					console.log('fire inactive',remote_id,local_state);
					return;
				};
				let tag=local_state.type;
				let msg_id;
				switch(tag) {
					case TIMER_SINGLE: msg_id=g_timer_api.fire.single; break;
					case TIMER_REPEATING: msg_id=g_timer_api.fire.repeating; break;
				}
				if(!msg_id) {
					console.assert(false,'Unknown tag in RemoteWorker.fire',tag);
					console.info('TypeError like: let value:TIMER_SINGLE | TIMER_REPEATING (%o | %o) = %o',TIMER_SINGLE,TIMER_REPEATING,tag);
					return;
				}
				console.log('worker fire',msg_id,remote_id);
				postMessage({
					type: msg_id,
					value: remote_id
				});
			}
			/**
			 * @param {any} tag
			 * @param {any} remote_id
			 * @param {number | undefined} timeout
			 */
			set(tag,remote_id,timeout) {
				// debugger;
				this.verify_tag(tag);
				let obj={
					active: true,
					local_id: -1,
					type: tag
				};
				this.m_remote_id_to_state_map.set(remote_id,obj);
				/**@type {typeof g_timer_api.set_names.single|typeof g_timer_api.set_names.repeating|null} */
				let api_name=null;
				switch(tag) {
					case TIMER_SINGLE: api_name=g_timer_api.set_names.single; break;
					case TIMER_REPEATING: api_name=g_timer_api.set_names.repeating; break;
				}
				if(!api_name) return;
				obj.local_id=globalThis[api_name](fire_timer,timeout,this,remote_id);
				return obj.local_id;
			}
			// Please verify your type tag is valid before changing any state, or you might end up in an invalid state
			/**
			 * @param {any} tag
			 */
			verify_tag(tag) {
				if(!this.validate_tag(tag)) {
					throw new Error("tag verification failed in RemoteTimer");
				}
			}
			/**
			 * @param {RemoteTimerState} state
			 * @param {any} remote_id
			 */
			verify_state(state,remote_id) {
				if(!this.validate_state(state)) {
					console.info("Removed invalid local_state");
					globalThis[g_timer_api.clear_names.single](state.local_id);
					globalThis[g_timer_api.clear_names.repeating](state.local_id);
					this.m_remote_id_to_state_map.delete(remote_id);
					throw new Error("Tag verification failed in RemoteWorker");
				}
			}
			/**
			 * @param {number} tag
			 */
			validate_tag(tag) {
				if(tag<TIMER_SINGLE||tag>=TIMER_TAG_COUNT) {
					console.assert(false,"Assertion failed in RemoteTimer.validate_tag: tag=%o is out of range");
					console.info("Info: range is TIMER_SINGLE to TIMER_TAG_COUNT-1 (%o...%o-1)",tag,TIMER_SINGLE,TIMER_TAG_COUNT);
					return false;
				}
				return true;
			}
			/**
			 * @param {{ type: any; }} state
			 */
			validate_state(state) {
				return this.validate_tag(state.type);
			}
			/**
			 * @param {any} remote_id
			 */
			clear(remote_id) {
				if(this.m_remote_id_to_state_map.has(remote_id)) {
					let state=this.m_remote_id_to_state_map.get(remote_id);
					this.verify_state(state,remote_id);
					if(state.type===TIMER_SINGLE) {
						globalThis[g_timer_api.clear_names.single](state.local_id);
					}
					if(state.type===TIMER_REPEATING) {
						globalThis[g_timer_api.clear_names.repeating](state.local_id);
					}
					state.active=false;
					this.m_remote_id_to_state_map.delete(remote_id);
					return state.local_id;
				}
				return null;
			}
			/**
			 * @param {{ type: any, value: any; }} msg
			 */
			do_clear(msg) {
				if(!g_timer_api.worker) throw 1;
				if(!g_timer_api.reply) throw 1;
				let remote_id=msg.value;
				let maybe_local_id=this.clear(remote_id);
				// debugger;
				switch(msg.type) {
					case g_timer_api.worker.clear.single: {
						// debugger;
						postMessage({
							type: g_timer_api.reply.from_worker,
							value: {
								type: g_timer_api.reply.clear.single,
								value: [remote_id,maybe_local_id,msg.type]
							}
						});
					} break;
					case g_timer_api.worker.clear.repeating: {
						// debugger;
						postMessage({
							type: g_timer_api.reply.from_worker,
							value: {
								type: g_timer_api.reply.clear.repeating,
								value: [remote_id,maybe_local_id,msg.type]
							}
						});
					} break;
					default: {
						console.error("RemoteTimer.do_clear unexpected message");
						debugger;
					} break;
				}
			}
		}
		let remote_worker_state=new RemoteWorkerState;
		/** @type {any} */
		let any_global=globalThis;
		any_global.remote_worker_state=remote_worker_state;
		remote_worker_state.set_timer(new RemoteTimer);
		onmessage=message_without_types_handler;
	}
	function on_remote_worker_active() {
		console.log('setTimeout activation moved to Worker thread successfully');
	}
	let move_timers_to_worker=new Promise(set_timeout_on_remote_worker_executor);
	move_timers_to_worker.then(on_remote_worker_active);
})();

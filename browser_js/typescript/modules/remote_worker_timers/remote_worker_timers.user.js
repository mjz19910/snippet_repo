// ==UserScript==
// @name         remote_worker_timers script
// @namespace    http://tampermonkey.net/
// @version      0.1.0.0
// @description  try to take over the world!
// @author       You
// @match        https://rebuildtheuniverse.com/test_remote_setTimeout
// @grant        none
// @run-at       document-start
// @updateURL    https://github.com/mjz19910/snippet_repo/raw/master/userscript/remote_worker_timers/remote_worker_timers.meta.js
// @downloadURL  https://github.com/mjz19910/snippet_repo/raw/master/userscript/remote_worker_timers/remote_worker_timers.user.js
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
	 * @arg {number} level
	 * @arg {string[]} args
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
		 * @arg {boolean} is_repeating
		 * @arg {TimerHandler} target_fn
		 * @arg {any} target_args
		 * @arg {number} timeout
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
		 * @arg {boolean} is_repeating
		 * @arg {Function} target_fn
		 * @arg {any} target_args
		 * @arg {number} timeout
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
		 * @arg {any} accept
		 * @arg {any} reject
		 */
		constructor(accept,reject) {
			this.m_closed=false;
			this.m_accept=accept;
			this.m_reject=reject;
		}
		/**
		 * @arg {any} value
		 */
		accept(value) {
			if(this.m_closed) throw new Error("accept called on closed handle");
			let accept=this.m_accept;
			accept(value);
			this.close();
		}
		/**
		 * @arg {any} error
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
	const TimeoutMessageReady=202;
	const TimeoutSetSingle=203;
	const TimeoutSetRepeating=204;
	const TimeoutClearSingle=205;
	const TimeoutClearRepeating=206;
	const TimeoutClearAny=207;
	const WorkerDestroyType=300;
	const WorkerUpdateMessageHandlerReply=301;
	const WorkerReadyReply=302;
	const ReplySetSingle=303;
	const ReplySetRepeating=304;
	const ReplyClearSingle=305;
	const ReplyClearRepeating=306;
	const ReplyClearAny=307;
	const TimeoutSingleReply=400;
	const TimeoutRepeatingReply=401;
	const ReplyToWorkerState=501;
	const ReplyToLocalTimer=502;
	const ReplyFromWorker=503;
	const ReplyToWorker=504;
	const WorkerAsyncMessage=600;
	const WorkerUpdateMessageHandler=601;
	const TimeoutSetTypes=700;
	class ReplyClearTypes {
		/** @type {import("./constant_types.js").ReplyClearSingleT} */
		single=ReplyClearSingle;
		/** @type {import("./constant_types.js").ReplyClearRepeatingT} */
		repeating=ReplyClearRepeating;
		/** @type {import("./constant_types.js").ReplyClearAnyT} */
		any=ReplyClearAny;
	}
	class ReplySetTypes {
		/** @type {import("./constant_types.js").ReplySetSingleT} */
		single=ReplySetSingle;
		/** @type {import("./constant_types.js").ReplySetRepeatingT} */
		repeating=ReplySetRepeating;
	};
	class ReplyTypes {
		/** @type {import("./constant_types.js").WorkerDestroyTypeT} */
		destroy_worker=WorkerDestroyType;
		/** @type {import("./constant_types.js").WorkerUpdateMessageHandlerReplyT} */
		update_handler=WorkerUpdateMessageHandlerReply;
		/** @type {import("./constant_types.js").WorkerReadyReplyT} */
		ready=WorkerReadyReply;
		/** @type {import("./constant_types.js").ReplyToWorkerStateT} */
		reply_to_local=ReplyToWorkerState;
		/** @type {import("./constant_types.js").ReplyToLocalTimerT} */
		reply_to_main_timer=ReplyToLocalTimer;
		/** @type {import("./constant_types.js").ReplyFromWorkerT} */
		from_worker=ReplyFromWorker;
		/** @type {import("./constant_types.js").ReplyToWorkerT} */
		to_worker=ReplyToWorker;
		/** @type {import("./constant_types.js").ReplySetTypesT} */
		set=new ReplySetTypes;
		/** @type {import("./constant_types.js").ReplyClearTypesT} */
		clear=new ReplyClearTypes;
	}
	class TimeoutFireInfo {
		/** @type {import("./constant_types.js").TimeoutFireSingleT} */
		single=TimeoutFireSingle;
		/** @type {import("./constant_types.js").TimeoutFireRepeatingT} */
		repeating=TimeoutFireRepeating;
	}
	class TimeoutSetInfo {
		/** @type {import("./constant_types.js").TimeoutSetSingleT} */
		single=TimeoutSetSingle;
		/** @type {import("./constant_types.js").TimeoutSetRepeatingT} */
		repeating=TimeoutSetRepeating;
	}
	class TimeoutClearInfo {
		/** @type {import("./constant_types.js").TimeoutClearSingleT} */
		single=TimeoutClearSingle;
		/** @type {import("./constant_types.js").TimeoutClearRepeatingT} */
		repeating=TimeoutClearRepeating;
		/** @type {import("./constant_types.js").TimeoutClearAnyT} */
		any=TimeoutClearAny;
	}
	class WorkerReplyTimerFireTypes {
		/** @type {import("./constant_types.js").TimeoutSingleReplyT} */
		single=TimeoutSingleReply;
		/** @type {import("./constant_types.js").TimeoutRepeatingReplyT} */
		repeating=TimeoutRepeatingReply;
	}
	class WorkerReplyTypes {
		/** @type {import("./constant_types.js").WorkerReplyTimerFireTypesT} */
		fire=new WorkerReplyTimerFireTypes;
	}
	class TimeoutWorkerTypes {
		/** @type {import("./constant_types.js").WorkerReplyTypesT} */
		reply=new WorkerReplyTypes;
		/** @type {import("./constant_types.js").WorkerUpdateMessageHandlerT} */
		update_message_handler=WorkerUpdateMessageHandler;
		/** @type {import("./constant_types.js").TimeoutMessageReadyT} */
		ready=TimeoutMessageReady;
		/** @type {import("./constant_types.js").TimeoutSetInfoT} */
		set=new TimeoutSetInfo;
		/** @type {import("./constant_types.js").TimeoutClearInfoT} */
		clear=new TimeoutClearInfo;
		/** @type {import("./constant_types.js").TimeoutSetTypesT} */
		set_types=TimeoutSetTypes;
	}
	const TimeoutSetStringSingle="setTimeout";
	const TimeoutSetStringRepeating="setInterval";
	const TimeoutClearStringSingle="clearTimeout";
	const TimeoutClearStringRepeating="clearInterval";
	class TimeoutSetStrings {
		/** @type {import("./constants.js").TimeoutSetStringSingle} */
		single=TimeoutSetStringSingle;
		/** @type {import("./constants.js").TimeoutSetStringRepeating} */
		repeating=TimeoutSetStringRepeating;
	}
	class TimeoutClearStrings {
		/** @type {import("./constants.js").TimeoutClearStringSingle} */
		single=TimeoutClearStringSingle;
		/** @type {import("./constants.js").TimeoutClearStringRepeating} */
		repeating=TimeoutClearStringRepeating;
	}
	class TimerApi {
		/** @type {import("./constant_types.js").WorkerAsyncMessageT} */
		async=WorkerAsyncMessage;
		/** @type {import("./constant_types.js").TimeoutSetTypesT} */
		worker_set_types=TimeoutSetTypes;
		/** @type {import("./constant_types.js").ReplyTypesT} */
		reply=new ReplyTypes;
		/** @type {import("./constant_types.js").TimeoutFireInfoT} */
		fire=new TimeoutFireInfo;
		/** @type {import("./constant_types.js").TimeoutWorkerTypesT} */
		worker=new TimeoutWorkerTypes;
		/** @type {import("./constant_types.js").TimeoutSetStringsT} */
		set_names=new TimeoutSetStrings;
		/** @type {import("./constant_types.js").TimeoutClearStringsT} */
		clear_names=new TimeoutClearStrings;
	}
	let g_timer_api=new TimerApi;
	class UniqueIdGenerator {
		constructor() {
			this.m_current=-1;
		}
		/**
		 * @arg {number} current_value
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
		 * @arg {string | undefined} message
		 */
		constructor(message) {
			super(message);
			this.name="VerifyError";
		}
	}
	class AssertionError extends Error {
		/**
		 * @arg {string | undefined} message
		 */
		constructor(message) {
			super(message);
			this.name="AssertionError";
		}
	}
	/**
	 * @arg {boolean} assert_result
	 * @arg {string} assert_message
	 */
	function VERIFY(assert_result,assert_message) {
		if(!assert_result) {
			throw new VerifyError(assert_message);
		}
	}
	/** @template T @arg {T} value @returns {asserts value is NonNullable<T>} */
	function assert_non_null(value) {
		if(value===null) {
			throw new AssertionError("Assertion failure: value was null");
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
		 * @arg {keyof Window} key
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
		 * @arg {WorkerState} worker_state_value
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
		 * @arg {number} remote_id
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
				this.worker_state.typedPostMessage({
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
		 * @arg {1|2} tag
		 * @arg {any} target_fn
		 * @arg {number} timeout
		 * @arg {any} target_args
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
			this.send_worker_set_message(tag,remote_id,timeout);
			return remote_id;
		}
		/**
		 * @arg {1 | 2} tag
		 * @arg {number} remote_id
		 * @arg {number} timeout
		 */
		send_worker_set_message(tag,remote_id,timeout) {
			this.assert_valid_worker();
			/** @type {typeof TimeoutSetSingle|typeof TimeoutSetRepeating|null} */
			let msg_id=null;
			switch(tag) {
				case TIMER_SINGLE: msg_id=g_timer_api.worker.set.single; break;
				case TIMER_REPEATING: msg_id=g_timer_api.worker.set.repeating; break;
			}
			if(!msg_id) {
				console.assert(false,'Unknown timer_tag',tag);
				console.info('TypeError like: let value:TIMER_SINGLE | TIMER_REPEATING (%o | %o) = %o',TIMER_SINGLE,TIMER_REPEATING,tag);
				return;
			}
			this.worker_state.typedPostMessage({
				type: msg_id,
				remote_id,
				timeout,
			});
		}
		/**
		 * @arg {number} remote_id
		 */
		is_state_stored_by_remote_id(remote_id) {
			return this.m_remote_id_to_state_map.has(remote_id);
		}
		/**@arg {number} remote_id */
		get_state_by_remote_id(remote_id) {
			return this.m_remote_id_to_state_map.get(remote_id);
		}
		/**
		 * @arg {number} remote_id
		 * @arg {TimerState} state
		 */
		store_state_by_remote_id(remote_id,state) {
			this.m_remote_id_to_state_map.set(remote_id,state);
		}
		/**
		 * @arg {number} remote_id
		 */
		delete_state_by_remote_id(remote_id) {
			this.m_remote_id_to_state_map.delete(remote_id);
		}
		remote_id_to_state_entries() {
			return this.m_remote_id_to_state_map.entries();
		}
		/** @arg {ReplyToLocalTimerMsg|TimeoutClearSingleMsg|TimeoutClearRepeatingMsg} msg */
		on_result(msg) {
			console.log(msg);
			switch(msg.type) {
				case g_timer_api.worker.clear.single: {
					let remote_id=msg.remote_id;
					this.delete_state_by_remote_id(remote_id);
					break;
				}
				case g_timer_api.worker.clear.repeating: {
					let remote_id=msg.remote_id;
					this.delete_state_by_remote_id(remote_id);
					break;
				}
				case ReplyToLocalTimer: {
					console.assert(false,'on_result timer_result_msg needs a handler for ReplyMessage2');
				} break;
				default:
					console.assert(false,'on_result timer_result_msg needs a handler for',msg);
			}
		}
		/**
		 * @arg {TimeoutClearSingleMsg|TimeoutClearRepeatingMsg|ReplySetRepeatingMsg|ReplyClearSingleMsg|ReplyClearRepeatingMsg} msg
		 */
		on_reply(msg) {
			switch(msg.type) {
				case g_timer_api.reply.clear.single: break;
				case g_timer_api.reply.clear.repeating: break;
				default: {
					console.log('reply for',msg);
				} break;
			}
		}
		/**
		 * @arg {1|2} tag
		 * @arg {number} remote_id
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
				this.worker_state.typedPostMessage({
					type: g_timer_api.worker.clear.single,
					remote_id,
				});
			} else if(tag===TIMER_REPEATING) {
				this.worker_state.typedPostMessage({
					type: g_timer_api.worker.clear.repeating,
					remote_id,
				});
			}
		}
		/**
		 * @arg {TimerTag} tag
		 * @arg {number} remote_id
		 */
		clear(tag,remote_id) {
			this.assert_valid_worker();
			let state=this.get_state_by_remote_id(remote_id);
			if(!state) return;
			if(state.active) {
				if(state.type===TIMER_SINGLE&&tag===TIMER_SINGLE) {
					this.worker_state.typedPostMessage({
						type: g_timer_api.worker.clear.single,
						remote_id
					});
				} else if(state.type===TIMER_REPEATING&&tag===TIMER_REPEATING) {
					this.worker_state.typedPostMessage({
						type: g_timer_api.worker.clear.repeating,
						remote_id
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
	class WorkerUpdateMessageHandlerMsg {
		/** @readonly */
		type=WorkerUpdateMessageHandler;
		init="";
		onmessage="";
	}
	class TimeoutMessageReadyMsg {
		/** @readonly */
		type=TimeoutMessageReady;
	}
	class TimeoutSetSingleMsg {
		/** @readonly */
		type=TimeoutSetSingle;
		remote_id=0;
		timeout=0;
	}
	class TimeoutSetRepeatingMsg {
		/** @readonly */
		type=TimeoutSetRepeating;
		remote_id=0;
		timeout=0;
	}
	class TimeoutClearSingleMsg {
		/** @readonly */
		type=TimeoutClearSingle;
		remote_id=0;
	}
	class TimeoutClearRepeatingMsg {
		/** @readonly */
		type=TimeoutClearRepeating;
		remote_id=0;
	}
	class WorkerDestroyTypeMsg {
		/** @readonly */
		type=WorkerDestroyType;
	}
	class WorkerReadyReplyMsg {
		/** @readonly */
		type=WorkerReadyReply;
		for_worker_state=true;
		value={};
	}
	class ReplySetSingleMsg {
		/** @readonly */
		type=ReplySetSingle;
		for_worker_state=true;
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
	class ReplyToWorkerStateMsg {
		/** @readonly */
		type=ReplyToWorkerState;
		for_worker_state=true;
		value={};
	}
	class ReplyToLocalTimerMsg {
		/** @readonly */
		type=ReplyToLocalTimer;
		value={};
	}
	class ReplyFromWorkerMsg {
		/** @readonly */
		type=ReplyFromWorker;
		/** @readonly @type {typeof TimeoutMessageReady|typeof TimeoutSetSingle|typeof TimeoutSetRepeating|typeof TimeoutClearSingle|typeof TimeoutClearRepeating|typeof TimeoutSetTypes} */
		source_type=TimeoutSetTypes;
		/** @type {[-1]|[typeof TimeoutMessageReady]|[typeof TimeoutSetSingle,number|undefined,number,number]|[typeof TimeoutSetRepeating,number|undefined,number,number]|[typeof TimeoutClearSingle,number,any]|[typeof TimeoutClearRepeating,number,any]|[typeof TimeoutSetTypes]} */
		args=[-1];
	}
	class ReplyToWorkerMsg {
		/** @readonly */
		type=ReplyToWorker;
		value={};
	}

	class TimeoutSingleReplyMsg {
		/** @readonly */
		type=TimeoutSingleReply;
		value=0;
	}
	class TimeoutRepeatingReplyMsg {
		/** @readonly */
		type=TimeoutRepeatingReply;
		value=0;
	}
	class TimerWorkerSetTypesMsg {
		/** @readonly */
		type=TimeoutSetTypes;
		for_worker_state=true;
		worker_types=new RemoteWorkerTypes;
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
		static as_timeout_fire(msg) {
			assert_as_instance(msg,TimeoutFireSMsg);
			return msg;
		}
		/** @arg {WorkerStateMessage} msg */
		static as_timer_fire(msg) {
			assert_as_instance(msg,TimeoutFireRMsg);
			return msg;
		}
		/** @arg {WorkerStateMessage} msg */
		static as_worker_destroy_type(msg) {
			assert_as_instance(msg,WorkerDestroyTypeMsg);
			return msg;
		}
		/** @arg {WorkerStateMessage} msg */
		static as_reply_type_1(msg) {
			assert_as_instance(msg,ReplyToWorkerStateMsg);
			return msg;
		}
		/** @arg {WorkerStateMessage} msg */
		static as_reply_type_2(msg) {
			assert_as_instance(msg,ReplyToLocalTimerMsg);
			return msg;
		}
		/** @arg {WorkerStateMessage} msg */
		static as_reply_from_worker(msg) {
			assert_as_instance(msg,ReplyFromWorkerMsg);
			return msg;
		}
		static as_any_of() {
			let fv=false;
			if(fv) return new TimeoutFireSMsg;
			if(fv) return new TimeoutFireRMsg;
			if(fv) return new WorkerUpdateMessageHandlerMsg;
			if(fv) return new TimeoutMessageReadyMsg;
			if(fv) return new TimeoutSetSingleMsg;
			if(fv) return new TimeoutSetRepeatingMsg;
			if(fv) return new TimeoutClearSingleMsg;
			if(fv) return new TimeoutClearRepeatingMsg;
			if(fv) return new WorkerDestroyTypeMsg;
			if(fv) return new ReplyToWorkerStateMsg;
			if(fv) return new ReplyToLocalTimerMsg;
			if(fv) return new ReplyFromWorkerMsg;
			if(fv) return new ReplyToWorkerMsg;
			if(fv) return new TimeoutSingleReplyMsg;
			if(fv) return new TimeoutRepeatingReplyMsg;
			return new TimerWorkerSetTypesMsg;
		}
	}
	const WorkerStateMessageV=WorkerStateMessage.as_any_of();
	class WorkerState {
		/**
		 * @arg {Blob} worker_code_blob
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
			this.typedPostMessage({
				type: g_timer_api.worker_set_types,
				for_worker_state: true,
				worker_types: g_timer_api
			});
		}
		/** @arg {MessageEvent<typeof WorkerStateMessageV>} e */
		handle_message(e) {
			let msg=e.data;
			let worker_state=this;
			switch(msg.type) {
				case TimeoutFireSingle: {
					worker_state.timer.fire(TIMER_SINGLE,msg.value);
				} break;
				case TimeoutFireRepeating: {
					worker_state.timer.fire(TIMER_REPEATING,msg.value);
				} break;
				case WorkerUpdateMessageHandler: break;
				case TimeoutMessageReady: this.on_result(msg); break;
				case TimeoutSetSingle: break;
				case TimeoutSetRepeating: break;
				case TimeoutClearSingle: break;
				case TimeoutClearRepeating: break;
				// case TimeoutClearAny: break;
				case WorkerDestroyType: {
					worker_state.destroy();
				} break;
				case ReplyToWorkerState: {
					worker_state.dispatch_message(msg);
				} break;
				case ReplyToLocalTimer: {
					worker_state.dispatch_message(msg);
				} break;
				case ReplyFromWorker: {
					worker_state.dispatch_message(msg);
				} break;
				case ReplyToWorker: break;
				case TimeoutSingleReply: break;
				case TimeoutRepeatingReply: break;
				case TimeoutSetTypes: break;
				default: {
					console.assert(false,"Main: Unhandled message",msg);
					/** @type {never} */
					let _x=msg;
					_x;
				} break;
			}
		}
		/**
		 * @arg {any} handle
		 */
		set_executor_handle(handle) {
			this.executor_handle=handle;
		}
		/**
		 * @arg {TimeoutMessageReadyMsg|WorkerReadyReplyMsg|ReplySetSingleMsg|ReplyToWorkerStateMsg|TimerWorkerSetTypesMsg} msg
		 */
		on_result(msg) {
			if(!this.worker) throw new Error("No worker");
			switch(msg.type) {
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
					this.typedPostMessage({
						type: g_timer_api.worker.ready
					});
				} break;
			}
		}
		/**
		 * @template {{}|{for_worker_state: boolean}} T
		 * @arg {T} msg
		 * @returns {msg is {for_worker_state: boolean}}
		 */
		is_message_for(msg) {
			return 'for_worker_state' in msg&&msg.for_worker_state;
		}
		/**
		 * @arg {TimeoutClearSingleMsg|TimeoutClearRepeatingMsg|TimerWorkerSetTypesMsg|ReplyClearRepeatingMsg|ReplyClearSingleMsg|ReplySetRepeatingMsg|ReplySetSingleMsg|WorkerReadyReplyMsg|ReplyToWorkerStateMsg|ReplyToLocalTimerMsg|ReplyFromWorkerMsg} msg
		 */
		dispatch_message(msg) {
			if(this.is_message_for(msg)) {
				switch(msg.type) {
					case WorkerReadyReply: {
						this.on_result(msg);
					} break;
					case ReplySetSingle: {
						this.on_result(msg);
					} break;
					case ReplyToWorkerState: {
						this.on_result(msg);
					} break;
					case g_timer_api.worker_set_types: {
						this.on_result(msg);
					} break;
					default: return;
				}
				return;
			}
			switch(msg.type) {
				case TimeoutClearSingle: {
					this.timer.on_result(msg);
				} return;
				case TimeoutClearRepeating: {
					this.timer.on_result(msg);
				} return;
				case ReplySetRepeating: {
					this.timer.on_reply(msg);
				} return;
				case g_timer_api.reply.clear.single: {
					this.timer.on_reply(msg);
				} return;
				case g_timer_api.reply.clear.repeating: {
					this.timer.on_reply(msg);
				} return;
				case ReplyToLocalTimer: {
					this.timer.on_result(msg);
				} return;
				case ReplyFromWorker: {
					console.assert(false,"unhandled reply from worker",msg);
				} return;
				default: {
					console.assert(false,"unhandled result",msg);
					/** @type {never} */
					let _x=msg;
					_x;
				}
			}
		}
		/** @arg {typeof WorkerStateMessageV} msg */
		typedPostMessage(msg) {
			return this.worker?.postMessage(msg);
		}
		/**
		 * @arg {WorkerState} worker_state_value
		 */
		static has_old_global_state_value(worker_state_value) {
			return this.has_global_state()&&!this.equals_global_state(worker_state_value);
		}
		/**
		 * @arg {WorkerState} worker_state_value
		 */
		static equals_global_state(worker_state_value) {
			return this.get_global_state()===worker_state_value;
		}
		/**
		 * @arg {WorkerState} worker_state_value
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
		 * @arg {WorkerState} worker_state_value
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
	/** @arg {typeof WorkerStateMessageV} msg */
	function typedPostMessage(msg) {
		postMessage(msg);
	}
	/**
	 * @arg {(arg0: null) => void} executor_accept
	 * @arg {(arg0: Error) => void} executor_reject
	 */
	function set_timeout_on_remote_worker_executor(executor_accept,executor_reject) {
		let failed=false;
		/** @type {any} */
		let any_global=globalThis;
		if(any_global.remote_worker_state) {
			typedPostMessage({type: WorkerDestroyType});
			executor_accept(null);
			return;
		}
		if(WorkerState.maybe_delete_old_global_state()) return null;
		try {
			worker_code_function(function(/** @type {WorkerVars} */ verify_obj) {
				VERIFY(verify_obj.TIMER_REPEATING===TIMER_REPEATING,"TIMER_SINGLE constant matches");
				VERIFY(verify_obj.TIMER_REPEATING===TIMER_REPEATING,"TIMER_REPEATING constant matches");
				VERIFY(verify_obj.TIMER_TAG_COUNT===TIMER_TAG_COUNT,"TIMER_TAG_COUNT constant matches");
				VERIFY(verify_obj.TimeoutSetTypes===TimeoutSetTypes,"TimerWorkerSetTypes constant matches");
				return;
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
		 * @arg {TimerHandler} handler
		 * @arg {number | undefined} timeout
		 * @arg {any[]} target_args
		 */
		function remoteSetTimeout(handler,timeout,...target_args) {
			if(!worker_state) {
				window.setTimeout=setTimeout_global;
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
				window.clearTimeout=clearTimeout_global;
				l_log_if(LOG_LEVEL_WARN,'lost worker_state in timer');
				return clearTimeout_global(id);
			}
			if(id) {
				worker_state.timer.clear(TIMER_SINGLE,id);
			}
		}
		const setInterval_global=setInterval;
		/**
		 * @arg {TimerHandler} handler
		 * @arg {any[]} target_args
		 */
		function remoteSetInterval(handler,timeout=0,...target_args) {
			if(!worker_state) {
				window.setInterval=setInterval_global;
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
				window.clearInterval=clearInterval_global;
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
		 * @arg {{setTimeout: any,setInterval: any,clearTimeout: any,clearInterval: any}} obj
		 */
		function connect_local_to_remote_timer_api(obj) {
			/** @type {any} */
			let any_window=window;
			/** @type {keyof typeof obj} */
			let key;
			for(key in obj) {
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
	class WorkerVars {
		/** @readonly */
		TIMER_SINGLE=TIMER_SINGLE;
		/** @readonly */
		TIMER_REPEATING=TIMER_REPEATING;
		/** @readonly */
		TIMER_TAG_COUNT=TIMER_TAG_COUNT;
		/** @readonly */
		TimeoutSetTypes=TimeoutSetTypes;
	}
	/**
	 * @arg {{(arg0: WorkerVars): void; }} verify_callback
	 */
	function worker_code_function(verify_callback) {
		const TIMER_SINGLE=1;
		const TIMER_REPEATING=2;
		const TIMER_TAG_COUNT=3;
		const TimeoutSetTypes=700;
		if(verify_callback) {
			verify_callback({
				/** @type {typeof TIMER_SINGLE} */
				TIMER_SINGLE: TIMER_SINGLE,
				/** @type {typeof TIMER_REPEATING} */
				TIMER_REPEATING: TIMER_REPEATING,
				/** @type {typeof TIMER_TAG_COUNT} */
				TIMER_TAG_COUNT: TIMER_TAG_COUNT,
				/** @type {typeof TimeoutSetTypes} */
				TimeoutSetTypes: TimeoutSetTypes
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
		 * @arg {MessageEvent<typeof WorkerStateMessageV>} e
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
					typedPostMessage({
						type: g_timer_api.reply.from_worker,
						source_type: g_timer_api.worker_set_types,
						args: [msg.type],
					});
				} break;
				default: {
					cached_messages.push({data: msg});
				} break;
			}
		}
		/**
		 * @arg {MessageEvent<typeof WorkerStateMessageV>} e
		 */
		function message_with_types_handler(e) {
			let msg=e.data;
			switch(msg.type) {
				case g_timer_api.reply.to_worker: {
					let result=msg.value;
					console.assert(false,"unhandled result on remote worker",result);
					debugger;
				} break;
				case g_timer_api.worker.ready: {
					typedPostMessage({
						type: g_timer_api.reply.from_worker,
						source_type: msg.type,
						args: [msg.type],
					});
				} break;
				case g_timer_api.worker.set.single: {
					console.log('worker set single',msg.remote_id,msg.timeout);
					let local_id=remote_worker_state.set(TIMER_SINGLE,msg.remote_id,msg.timeout);
					typedPostMessage({
						type: g_timer_api.reply.from_worker,
						source_type: msg.type,
						args: [msg.type,local_id,msg.remote_id,msg.timeout],
					});
				} break;
				case g_timer_api.worker.set.repeating: {
					console.log('worker set repeating',msg.remote_id,msg.timeout);
					let local_id=remote_worker_state.set(TIMER_REPEATING,msg.remote_id,msg.timeout);
					typedPostMessage({
						type: g_timer_api.reply.from_worker,
						source_type: msg.type,
						args: [msg.type,local_id,msg.remote_id,msg.timeout],
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
			/**@type {typeof TimeoutSetTypes} */
			worker_set_types=TimeoutSetTypes;
			reply=new ReplyTypes;
			fire=new TimeoutFireInfo;
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
			 * @arg {RemoteWorkerTypes} types
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
			 * @arg {1|2} tag
			 * @arg {number} remote_id
			 * @arg {number|undefined} timeout
			 */
			set(tag,remote_id,timeout) {
				if(!this.m_timer) throw 1;
				return this.m_timer.set(tag,remote_id,timeout);
			}
			/** @arg {TimeoutClearSingleMsg|TimeoutClearRepeatingMsg} msg */
			clear(msg) {
				if(!this.m_timer) throw 1;
				return this.m_timer.do_clear(msg);
			}
		}
		function nop_fn() {};
		/**
		 * @arg {RemoteTimer} timer
		 * @arg {number} remote_id
		 */
		function fire_timer(timer,remote_id) {
			timer.fire(remote_id);
		}
		const g_timer_api=new RemoteTimerApi;
		class RemoteTimerState {
			/**
			 * @arg {1|2} type
			 */
			constructor(type) {
				this.type=type;
				this.active=true;
				this.local_id=0;
			}
		}
		class RemoteTimer {
			constructor() {
				/** @type {Map<number,RemoteTimerState>} */
				this.m_remote_id_to_state_map=new Map;
				this.base_id=globalThis[g_timer_api.set_names.single](nop_fn);
				globalThis[g_timer_api.clear_names.single](this.base_id);
			}
			/**
			 * @arg {number} remote_id
			 */
			fire(remote_id) {
				let local_state=this.m_remote_id_to_state_map.get(remote_id);
				if(!local_state) return;
				this.validate_state(local_state);
				if(!local_state.active) {
					console.log('fire inactive',remote_id,local_state);
					return;
				};
				let tag=local_state.type;
				switch(tag) {
					case TIMER_SINGLE: {
						typedPostMessage({
							type: g_timer_api.fire.single,
							value: remote_id
						});
					} break;
					case TIMER_REPEATING: {
						typedPostMessage({
							type: g_timer_api.fire.repeating,
							value: remote_id
						});
					} break;
					default: throw new Error("TODO");
				}
			}
			/**
			 * @arg {1|2} tag
			 * @arg {number} remote_id
			 * @arg {number | undefined} timeout
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
				if(!api_name) throw new Error("No api_name found");
				obj.local_id=globalThis[api_name](fire_timer,timeout,this,remote_id);
				return obj.local_id;
			}
			// Please verify your type tag is valid before changing any state, or you might end up in an invalid state
			/**
			 * @arg {1|2} tag
			 */
			verify_tag(tag) {
				if(!this.validate_tag(tag)) {
					throw new Error("tag verification failed in RemoteTimer");
				}
			}
			/**
			 * @arg {RemoteTimerState} state
			 * @arg {any} remote_id
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
			 * @arg {1|2} tag
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
			 * @arg {{ type: 1|2; }} state
			 */
			validate_state(state) {
				return this.validate_tag(state.type);
			}
			/**
			 * @arg {any} remote_id
			 */
			clear(remote_id) {
				if(!this.m_remote_id_to_state_map.has(remote_id)) {
					return null;
				}
				let state=this.m_remote_id_to_state_map.get(remote_id);
				if(!state) throw new Error("Unreachable");
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
			/** @arg {TimeoutClearSingleMsg|TimeoutClearRepeatingMsg} msg */
			do_clear(msg) {
				let remote_id=msg.remote_id;
				let maybe_local_id=this.clear(remote_id);
				// debugger;
				switch(msg.type) {
					case g_timer_api.worker.clear.single: {
						// debugger;
						typedPostMessage({
							type: g_timer_api.reply.from_worker,
							source_type: msg.type,
							args: [msg.type,remote_id,maybe_local_id],
						});
					} break;
					case g_timer_api.worker.clear.repeating: {
						// debugger;
						typedPostMessage({
							type: g_timer_api.reply.from_worker,
							source_type: msg.type,
							args: [msg.type,remote_id,maybe_local_id],
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

// ==UserScript==
// @name         setTimeout on remote worker
// @namespace    http://tampermonkey.net/
// @version      3.0
// @description  try to take over the world!
// @author       You
// @match        https://rebuildtheuniverse.com/test_remote_setTimeout
// @grant        none
// @run-at       document-start
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
		 * @arg {TimerTag} tag
		 * @arg {number} id
		 * @param {boolean} is_repeating
		 * @param {Function} target_fn
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
	const WorkerAsyncMessage=1;
	const TimeoutFireS=101;
	const TimeoutFireR=102;
	const TimeoutMessageR=201;
	const TimeoutSetS=202;
	const TimeoutSetR=203;
	const TimeoutClearS=204;
	const TimeoutClearR=205;
	const TimeoutClearA=206;
	const WorkerDestroyMessage=300;
	const WorkerReadyReply=301;
	const ReplySetSingle=302;
	const ReplySetRepeating=303;
	const ReplyClearSingle=304;
	const ReplyClearRepeating=305;
	const ReplyClearAny=306;
	const ReplyMessage1=401;
	const ReplyMessage2=402;
	const ReplyFromWorker=500;
	const ReplyToWorker=600;
	const TimeoutSingleReply=700;
	const TimeoutRepeatingReply=701;
	const TimerWorkerSetTypes=1001;
	class ReplyClearMessages {
		single=ReplyClearSingle;
		repeating=ReplyClearRepeating;
		any=ReplyClearAny;
	}
	class ReplySetMessages {
		single=ReplySetSingle;
		repeating=ReplySetRepeating;
	};
	class ReplyTypes {
		/**@type {ReplyMessage1} */
		msg1=ReplyMessage1;
		/**@type {ReplyMessage2} */
		msg2=ReplyMessage2;
		/**@type {ReplyFromWorker} */
		from_worker=ReplyFromWorker;
		/**@type {ReplyToWorker} */
		to_worker=ReplyToWorker;
		/**@type {WorkerDestroyMessage} */
		destroy_worker=WorkerDestroyMessage;
		/**@type {WorkerReadyReply} */
		ready=WorkerReadyReply;
		set=new ReplySetMessages;
		clear=new ReplyClearMessages;
	}
	class TimeoutFireInfo {
		single=TimeoutFireS;
		repeating=TimeoutFireR;
	}
	class TimeoutSetInfo {
		/**@type {TimeoutSetS} */
		single=TimeoutSetS;
		/**@type {TimeoutSetR} */
		repeating=TimeoutSetR;
	}
	class TimeoutClearInfo {
		/**@type {TimeoutClearS} */
		single=TimeoutClearS;
		/**@type {TimeoutClearR} */
		repeating=TimeoutClearR;
		/**@type {TimeoutClearA} */
		any=TimeoutClearA;
	}
	class WorkerFireReplyTypes {
		// .worker.reply.fire.single
		/**@type {TimeoutSingleReply} */
		single=TimeoutSingleReply;
		// .worker.reply.fire.repeating
		/**@type {TimeoutRepeatingReply} */
		repeating=TimeoutRepeatingReply;
	}
	class WorkerReplyTypes {
		fire=new WorkerFireReplyTypes;
	}
	class TimeoutWorkerTypes {
		reply=new WorkerReplyTypes;
		/**@type {TimeoutMessageR} */
		ready=TimeoutMessageR;
		set=new TimeoutSetInfo;
		clear=new TimeoutClearInfo;
	}
	class TimerMessageTypes {

	}
	const TimeoutSetStringS="setTimeout";
	const TimeoutSetStringR="setInterval";
	const TimeoutClearStringS="clearTimeout";
	const TimeoutClearStringR="clearInterval";
	class TimeoutSetStrings {
		/**@type {TimeoutSetStringS} */
		single=TimeoutSetStringS;
		/**@type {TimeoutSetStringR} */
		repeating=TimeoutSetStringR;
	}
	class TimeoutClearStrings {
		/**@type {TimeoutClearStringS} */
		single=TimeoutClearStringS;
		/**@type {TimeoutClearStringR} */
		repeating=TimeoutClearStringR;
	}
	class TimerApi {
		/**@type {WorkerAsyncMessage} */
		async=WorkerAsyncMessage;
		/**@type {TimerWorkerSetTypes} */
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
			this.weak_worker_state=null;
			this.m_api_map=new Map;
			this.m_raw_api_info=api_info;
			this.set_api_names(g_timer_api.set_names,g_timer_api.clear_names);
			/**@type {Map<number, ActiveTimerState>} */
			this.m_active_state_map=new Map;
		}
		/**@arg {TimerApi['set_names']|TimerApi['clear_names']} names */
		set_map_names(names) {
			this.m_api_map.set(names.single,window[names.single]);
			this.m_api_map.set(names.repeating,window[names.repeating]);
		}
		/**@arg {TimerApi['set_names']} set @arg {TimerApi['clear_names']} clear */
		set_api_names(set,clear) {
			this.set_map_names(set);
			this.set_map_names(clear);
			this.base_id=window[set.single](timer_nop);
			if(!this.base_id) {
				throw new Error("invalid setTimeout return");
			}
			if(!Number.isFinite(this.base_id)) {
				throw new Error("invalid setTimeout return");
			}
			if(this.base_id<=-1) {
				throw new Error("setTimeout return was less or equal to -1");
			}
			window[clear.single](this.base_id);
			this.id_generator.set_current(this.base_id);
		}
		/**
		 * @param {any} worker_state_value
		 */
		set_worker_state(worker_state_value) {
			this.weak_worker_state=new WeakRef(worker_state_value);
		}
		/**
		 * @arg {TimerState} state
		 * @param {number} remote_id
		 */
		verify_state(state,remote_id) {
			this.validate_timer_state(state);
			assert_non_null(this.weak_worker_state);
			let worker_state=this.weak_worker_state.deref();
			worker_state.postMessage({
				t: g_timer_api.worker.clear.any,
				v: remote_id
			});
			throw new Error("Verify failed in Timer.verify_timer_state");
		}
		/**@arg {unknown} tag @returns {asserts tag is TimerTag} */
		assert_valid_tag(tag) {
			if(tag!=TIMER_SINGLE&&tag!=TIMER_REPEATING) {
				console.assert(false,"Assertion failure in Timer.validate_tag: tag=%o is out of range");
				console.info("Info: range is TIMER_SINGLE to TIMER_TAG_COUNT-1 (%o...%o-1)",tag,TIMER_SINGLE,TIMER_TAG_COUNT);
				throw new Error("Assertion failure");
			}
		}
		/**
		 * @param {{ type: TimerTag; }} state
		 */
		validate_timer_state(state) {
			return this.assert_valid_tag(state.type);
		}
		/**
		 * @arg {TimerTag} tag
		 * @param {number} remote_id
		 */
		fire(tag,remote_id) {
			if(!this.weak_worker_state) throw new Error("No worker state");
			let state=this.get_state_by_remote_id(remote_id);
			if(!state) {
				this.force_clear(tag,remote_id);
				return;
			}
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
				let worker_state=this.weak_worker_state.deref();
				worker_state.postMessage({
					t: g_timer_api.worker.reply.fire.single,
					v: remote_id
				});
			}
		}
		activate_state(state) {
			let value=this.m_active_state_map.get(state.id);
			if(!value) throw new Error("Invalid");
			return value;
		}
		/**
		 * @param {number} tag
		 * @param {any} target_fn
		 * @param {number} timeout
		 * @param {any} target_args
		 */
		set(tag,target_fn,timeout,target_args) {
			let remote_id=this.id_generator.next();
			let is_repeating=false;
			this.assert_valid_tag(tag);
			if(tag===TIMER_REPEATING) {
				is_repeating=true;
			}
			if(timeout<0) timeout=0;
			let state=new TimerState(remote_id,tag,is_repeating,target_fn,target_args,timeout);
			this.store_state_by_remote_id(remote_id,state);
			this.send_worker_set_message(tag,{
				t: remote_id,
				v: timeout
			});
			return remote_id;
		}
		/**
		 * @param {any} tag
		 * @param {{ t: any; v: any; }} obj
		 */
		send_worker_set_message(tag,obj) {
			if(!this.weak_worker_state) throw 1;
			let worker_state=this.weak_worker_state.deref();
			if(!worker_state) {
				console.assert(false,'tried to send_worker_message, but the gc collected the worker_state, referenced with a WeakRef (weak_worker_state)');
				return;
			}
			let msg_id;
			switch(tag) {
				case TIMER_SINGLE: msg_id=g_timer_api.worker.set.single; break;
				case TIMER_REPEATING: msg_id=g_timer_api.worker.set.repeating; break;
			}
			if(!msg_id) {
				console.assert(false,'Unknown timer_tag',tag);
				console.info('TypeError like: let v:TIMER_SINGLE | TIMER_REPEATING (%o | %o) = %o',TIMER_SINGLE,TIMER_REPEATING,tag);
				return;
			}
			worker_state.postMessage({
				t: msg_id,
				v: obj
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
			let state=this.m_remote_id_to_state_map.get(remote_id);
			if(!state) return null;
			this.verify_state(state,remote_id);
			return state;
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
		/**
		 * @param {any} type
		 * @param {any} timer_result_msg
		 */
		on_result(type,timer_result_msg) {
			console.log(type,timer_result_msg);
			debugger;
			switch(type) {
				case g_timer_api.worker.clear.single: {
					let remote_id=timer_result_msg.v;
					this.delete_state_by_remote_id(remote_id);
					break;
				}
				case g_timer_api.worker.clear.repeating: {
					let remote_id=timer_result_msg.v;
					this.delete_state_by_remote_id(remote_id);
					break;
				}
				default:
					console.assert(false,'on_result timer_result_msg needs a handler for',timer_result_msg);
			}
		}
		/**
		 * @param {any} msg
		 */
		on_reply(msg) {
			switch(msg.type) {
				case g_timer_api.worker.clear.single: {
					debugger;
					let remote_id=msg.v;
					this.delete_state_by_remote_id(remote_id);
					break;
				}
				case g_timer_api.worker.clear.repeating: {
					debugger;
					let remote_id=msg.v;
					this.delete_state_by_remote_id(remote_id);
					break;
				}
				case g_timer_api.reply.clear.single: {
					// debugger;
				} break;
				case g_timer_api.reply.clear.repeating: {
					// debugger;
				} break;
				default:
					console.log('reply',msg);
					console.assert(false,'on_result msg needs a handler for',msg);
					debugger;
			}
		}
		/**
		 * @param {number} tag
		 * @param {number} remote_id
		 */
		force_clear(tag,remote_id) {
			this.assert_valid_tag(tag);
			if(!this.weak_worker_state) throw 1;
			let worker_state=this.weak_worker_state.deref();
			let state=this.get_state_by_remote_id(remote_id);
			if(!state) throw new Error("No state for id");
			if(state.active) {
				return this.clear(tag,remote_id);
			}
			// we have to trust the user, go ahead and send the message
			// anyway (this can technically send structured cloneable objects)
			if(tag===TIMER_SINGLE) {
				worker_state.postMessage({
					t: g_timer_api.worker.clear.single,
					v: remote_id
				});
			} else if(tag===TIMER_REPEATING) {
				worker_state.postMessage({
					t: g_timer_api.worker.clear.repeating,
					v: remote_id
				});
			}
		}
		/**
		 * @param {TimerTag} tag
		 * @param {number} remote_id
		 */
		clear(tag,remote_id) {
			this.assert_valid_tag(tag);
			if(!this.weak_worker_state) throw 1;
			let state=this.get_state_by_remote_id(remote_id);
			if(state?.active) {
				let worker_state=this.weak_worker_state.deref();
				if(state.type===TIMER_SINGLE) {
					worker_state.postMessage({
						t: g_timer_api.worker.clear.single,
						v: remote_id
					});
				} else if(state.type===TIMER_REPEATING) {
					worker_state.postMessage({
						t: g_timer_api.worker.clear.repeating,
						v: remote_id
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
			this.worker=null;
			this.worker_url=null;
			this.failed=false;
			timer.set_worker_state(this);
			WorkerState.set_global_state(this);
		}
		init() {
			if(this.connected||this.valid) {
				this.destroy();
			}
			this.connected=false;
			this.worker_url=URL.createObjectURL(this.worker_code);
			this.worker=new Worker(this.worker_url);
			this.worker.onmessage=function onmessage(e) {
				let worker_state=WorkerState.get_global_state();
				var msg=e.data;
				if(!worker_state) {
					console.log('lost worker state');
					this.terminate();
					return;
				}
				switch(msg.t) {
					case TimeoutFireS/*worker_state.timer single fire*/: {
						worker_state.timer.fire(TIMER_SINGLE,msg.v);
						break;
					}
					case TimeoutFireR/*worker_state.timer repeating fire*/: {
						worker_state.timer.fire(TIMER_REPEATING,msg.v);
						break;
					}
					case WorkerDestroyMessage/*worker_state destroy*/:
						worker_state.destroy();
						break;
					case ReplyMessage1:
					case ReplyMessage2/*worker_state dispatch_message_raw*/: {
						debugger;
						worker_state.dispatch_message(msg);
						break;
					}
					case ReplyFromWorker/*worker_state dispatch_message*/: {
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
			this.valid=true;
			this.worker.postMessage({
				t: g_timer_api.worker_set_types,
				v: g_timer_api
			});
		}
		/**
		 * @param {any} handle
		 */
		set_executor_handle(handle) {
			this.executor_handle=handle;
		}
		/**
		 * @param {any} type
		 * @param {any} data
		 */
		on_result(type,data) {
			if(!this.worker) throw new Error("No worker");
			switch(data) {
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
						t: g_timer_api.worker.ready
					});
				} break;
			}
		}
		/**
		 * @param {{ type: any; value: any; }} result
		 */
		dispatch_message(result) {
			let msg_type;
			let msg_data=null;
			if(typeof result==='object') {
				msg_type=result.type;
				msg_data=result.value;
			} else {
				msg_type=result;
			}
			switch(result.type) {
				case WorkerReadyReply: {
					// debugger;
					this.on_result(msg_type,msg_data);
				} break;
				case ReplySetSingle: {
					// debugger;
					this.on_result(msg_type,msg_data);
				} break;
				case ReplyMessage1: {
					debugger;
					this.on_result(msg_type,msg_data);
				} break;
				case ReplyMessage2: {
					debugger;
					this.timer.on_result(msg_type,msg_data);
				} break;
				case ReplySetRepeating: {
					// debugger;
					this.timer.on_reply(result);
				} break;
				case g_timer_api.reply.clear.single: {
					// debugger;
					this.timer.on_reply(result);
				} break;
				case g_timer_api.reply.clear.repeating: {
					// debugger;
					this.timer.on_reply(result);
				} break;
				case g_timer_api.worker_set_types: {
					// debugger;
					this.on_result(msg_type,msg_data);
				} break;
				default: {
					console.assert(false,"unhandled result",result);
					debugger;
				}
			}
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
		static get_global_state() {
			return window[this.global_state_key];
		}
		/**
		 * @param {WorkerState} worker_state_value
		 */
		static set_global_state(worker_state_value) {
			this.maybe_delete_old_global_state_value(worker_state_value);
			window[this.global_state_key]=worker_state_value;
		}
		static delete_global_state() {
			delete window[this.global_state_key];
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
		if(globalThis.remote_worker_state) {
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
		} catch(e) {
			console.log(e);
			executor_reject(new Error("worker_code_function caused an error"));
			failed=true;
		}
		let id_generator=null;
		let timer=null;
		let executor_handle=null;
		let worker_code_blob=null;
		let worker_state=null;
		if(failed) return;
		id_generator=new UniqueIdGenerator;
		timer=new Timer(id_generator,new TimerApi);
		executor_handle=new PromiseExecutorHandle(executor_accept,executor_reject);
		worker_code_blob=new Blob(["(",worker_code_function.toString(),")()","\n//# sourceURL=$__.0"]);
		worker_state=new WorkerState(worker_code_blob,timer,executor_handle);
		worker_state.init();
		const setTimeout_global=setTimeout;
		/**
		 * @param {TimerHandler} handler
		 * @param {number | undefined} timeout
		 * @param {any[]} target_args
		 */
		function remoteSetTimeout(handler,timeout,...target_args) {
			if(!worker_state) {
				// @ts-expect-error
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
				// @ts-expect-error
				clearTimeout=clearTimeout_global;
				l_log_if(LOG_LEVEL_WARN,'lost worker_state in timer');
				return clearTimeout_global(id);
			}
			worker_state.timer.clear(TIMER_SINGLE,id);
		}
		const setInterval_global=setInterval;
		/**
		 * @param {TimerHandler} handler
		 * @param {any[]} target_args
		 */
		function remoteSetInterval(handler,timeout=0,...target_args) {
			if(!worker_state) {
				// @ts-expect-error
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
				// @ts-expect-error
				clearInterval=clearInterval_global;
				l_log_if(LOG_LEVEL_WARN,'lost worker_state in timer');
				return clearInterval_global(id);
			}
			worker_state.timer.clear(TIMER_REPEATING,id);
		}
		// @ts-expect-error
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
			for(let key in obj) {
				window[key]=obj[key];
			}
			return obj;
		}
		// @ts-expect-error
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
				TIMER_SINGLE,
				TIMER_REPEATING,
				TIMER_TAG_COUNT,
				TimerWorkerSetTypes
			});
		}
		const cached_messages=[];
		/** @template T @arg {T} value @returns {asserts value is NonNullable<T>} */
		function assert_non_nullable_object(value) {
			if(typeof value!=='object') throw 1;
			if(value===null) throw 1;
		}
		/** @template {{[x: string]: any}} T @arg {T} value @returns {{[U in keyof T]: T[U]}} */
		function decay_to_object(value) {
			return value;
		}
		/**
		 * @param {MessageEvent<unknown>} e
		 */
		function message_without_types_handler(e) {
			let msg=e.data;
			assert_non_nullable_object(msg);
			if(!('type' in msg)) throw 1;
			switch(msg.type) {
				case g_timer_api.worker_set_types: {
					if(!('value' in msg)) throw 1;
					assert_non_nullable_object(msg.value);
					if(!('async' in msg.value)) throw 1;
					if(!('reply' in msg.value)) throw 1;
					if(!('fire' in msg.value)) throw 1;
					if(!('worker' in msg.value)) throw 1;
					let value=decay_to_object(msg.value);
					let v_async=value.async;
					if(typeof v_async==='number'||v_async===null) {
						v_async;
						g_timer_api.on_set_types({
							async: v_async,
							reply: value.reply,
							fire: value.fire,
							worker: value.worker,
						});
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
		 * @param {{ data: any; }} e
		 */
		function message_with_types_handler(e) {
			if(!g_timer_api.worker) throw new Error("Invalid");
			if(!g_timer_api.reply) throw new Error("Invalid");
			let msg=e.data;
			switch(msg.t) {
				case g_timer_api.reply.to_worker/*reply*/: {
					let result=msg.v;
					console.assert(false,"unhandled result on remote worker",result);
					debugger;
				} break;
				case g_timer_api.worker.ready/**/: {
					// debugger;
					postMessage({
						t: g_timer_api.reply.from_worker,
						v: {
							t: g_timer_api.reply.ready,
							v: msg.t
						}
					});
				} break;
				case g_timer_api.worker.set.single/*remote timer set single*/: {
					// debugger;
					let user_msg=msg.v;
					console.log('worker set single',user_msg.t,user_msg.v);
					let local_id=remote_worker_state.set(TIMER_SINGLE,user_msg.t,user_msg.v);
					postMessage({
						t: g_timer_api.reply.from_worker,
						v: {
							t: g_timer_api.reply.set.single,
							v: [local_id,msg.t,user_msg.t,user_msg.v]
						}
					});
				} break;
				case g_timer_api.worker.set.repeating/*remote timer set repeating*/: {
					// debugger;
					let user_msg=msg.v;
					console.log('worker set repeating',user_msg.t,user_msg.v);
					let local_id=remote_worker_state.set(TIMER_REPEATING,user_msg.t,user_msg.v);
					postMessage({
						t: g_timer_api.reply.from_worker,
						v: {
							t: g_timer_api.reply.set.repeating,
							v: [local_id,msg.t,user_msg.t,user_msg.v]
						}
					});
				} break;
				case g_timer_api.worker.clear.single/*remote timer do_clear single*/: {
					// debugger;
					remote_worker_state.clear(msg);
				} break;
				case g_timer_api.worker.clear.repeating/*remote timer do_clear repeating*/: {
					// debugger;
					remote_worker_state.clear(msg);
				} break;
				case g_timer_api.worker.reply.fire.single: {
					// debugger;
				} break;
				case g_timer_api.worker.reply.fire.repeating: {
					// debugger;
				} break;
				default: {
					console.assert(false,"RemoteWorker: Unhandled message",msg);
				} break;
			}
		}
		/**@typedef {import("../../../typescript/src/vm/RecursivePartial.js").RecursivePartial<TimerApi>} RecursivePartialApi */
		class RemoteTimerApi {
			/**@type {WorkerAsyncMessage|null} */
			async=null;
			/**@type {TimerWorkerSetTypes|null} */
			worker_set_types=TimerWorkerSetTypes;
			/**@typedef {import("../../../typescript/src/vm/ReplyTypesTy.js").ReplyTypesTy} ReplyTypesTy */
			/**@type {ReplyTypesTy|null} */
			reply=null;
			/**@typedef {import("../../../typescript/src/vm/TimeoutFireInfoTy.js").TimeoutFireInfoTy} TimeoutFireInfoTy */
			/**@type {TimeoutFireInfoTy|null} */
			fire=null;
			/**@typedef {import("../../../typescript/src/vm/TimeoutWorkerTypesTy.js").TimeoutWorkerTypesTy} TimeoutWorkerTypesTy */
			/**@type {TimeoutWorkerTypesTy|null} */
			worker=null;
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
			 * @param {{ async: number | null; reply: any; fire: any; worker: any; }} types
			 */
			on_set_types(types) {
				this.async=types.async;
				this.reply=types.reply;
				this.fire=types.fire;
				this.worker=types.worker;
				onmessage=message_with_types_handler;
				for(let i=0;i<cached_messages.length;i++) {
					onmessage(cached_messages[i]);
				}
			}
		}
		class RemoteWorkerState {
			constructor() {
				/**@type {RemoteTimer|null} */
				this.m_timer=null;
				this.unique_script_id=1;
			}
			set_timer(timer) {
				this.m_timer=timer;
			}
			/**
			 * @param {number} tag
			 * @param {any} remote_id
			 * @param {any} timeout
			 */
			set(tag,remote_id,timeout) {
				return this.m_timer.set(tag,remote_id,timeout);
			}
			/**
			 * @param {any} msg
			 */
			clear(msg) {
				return this.m_timer.do_clear(msg);
			}
		}
		function nop_fn() {};
		/**
		 * @param {{ fire: (arg0: any) => void; }} timer
		 * @param {any} remote_id
		 */
		function fire_timer(timer,remote_id) {
			timer.fire(remote_id);
		}
		const g_timer_api=new RemoteTimerApi;
		class RemoteTimer {
			/**
			 * @param {undefined} [api_info]
			 */
			constructor(api_info) {
				this.m_remote_id_to_state_map=new Map;
				this.base_id=globalThis[g_timer_api.set_names.single](nop_fn);
				globalThis[g_timer_api.clear_names.single](this.base_id);
			}
			/**
			 * @param {any} remote_id
			 */
			fire(remote_id) {
				let local_state=this.m_remote_id_to_state_map.get(remote_id);
				if(!local_state) return;
				this.validate_state(local_state,remote_id);
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
					console.info('TypeError like: let v:TIMER_SINGLE | TIMER_REPEATING (%o | %o) = %o',TIMER_SINGLE,TIMER_REPEATING,tag);
					return;
				}
				console.log('worker fire',msg_id,remote_id);
				postMessage({
					t: msg_id,
					v: remote_id
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
			 * @param {TimerState} state
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
			 * @param {{ v: any; t: any; }} msg
			 */
			do_clear(msg) {
				let remote_id=msg.v;
				let maybe_local_id=this.clear(remote_id);
				// debugger;
				switch(msg.t) {
					case g_timer_api.worker.clear.single: {
						// debugger;
						postMessage({
							t: g_timer_api.reply.from_worker,
							v: {
								t: g_timer_api.reply.clear.single,
								v: [remote_id,maybe_local_id,msg.t]
							}
						});
					} break;
					case g_timer_api.worker.clear.repeating: {
						// debugger;
						postMessage({
							t: g_timer_api.reply.from_worker,
							v: {
								t: g_timer_api.reply.clear.repeating,
								v: [remote_id,maybe_local_id,msg.t]
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
		globalThis.remote_worker_state=remote_worker_state;
		remote_worker_state.set_timer(new RemoteTimer);
		onmessage=message_without_types_handler;
	}
	function on_remote_worker_active() {
		console.log('setTimeout activation moved to Worker thread successfully');
	}
	let move_timers_to_worker=new Promise(set_timeout_on_remote_worker_executor);
	move_timers_to_worker.then(on_remote_worker_active);
})();

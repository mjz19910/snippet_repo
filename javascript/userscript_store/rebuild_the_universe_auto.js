// ==UserScript==
// @name		 rebuild the universe auto
// @namespace	 http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author	     You
// @match		 http://rebuildtheuniverse.com/*
// @match		 http://rebuildtheuniverse.com
// @match		 https://rebuildtheuniverse.com/*
// @match		 https://rebuildtheuniverse.com
// @match		 https://test.rebuildtheuniverse.com
// @run-at	     document-start
// @grant		 none
// ==/UserScript==
/* eslint-disable no-undef,no-lone-blocks,no-eval */

(function() {
	'use strict';
	const TIMER_SINGLE=1;
	const TIMER_REPEATING=2;
	const TIMER_TAG_COUNT=3;
	const AUDIO_ELEMENT_VOLUME=0.58;
	const cint_arr=[];
	class ReplyTypes {
		/**@type {402} */
		msg=402
		/**@type {500} */
		from_remote=500
		/**@type {600} */
		to_worker=600
		/**@type {301} */
		update_handler=301
		/**@type {302} */
		ready=302
		/**@type {{single:303, repeating:304}} */
		set={single:303, repeating:304}
		/**@type {{single:305, repeating:306, any:307}} */
		clear={single:305, repeating:306, any:307}
	}
	class TimerApi {
		msg_types={
			/**@type {1} */
			async:1,
			reply:new ReplyTypes,
			/**@type {{single:101, repeating:102}} */
			fire:{single:101, repeating:102},
			worker:{
				/**@type {201} */
				update_handler:201,
				/**@type {202} */
				ready:202,
				/**@type {{single:203, repeating:204}} */
				set:{single:203, repeating:204},
				/**@type {{single:205, repeating:206, any:207}} */
				clear:{single:205, repeating:206, any:207}
			}
		}
		/**@type {{single:"setTimeout",repeating:"setInterval"}} */
		set_names={
			single:"setTimeout",
			repeating:"setInterval"
		}
		/**@type {{single:"clearTimeout",repeating:"clearInterval"}} */
		clear_names={
			single:"clearTimeout",
			repeating:"clearInterval"
		}
	}
	class DocumentWriteList {
		constructor(){
			this.list=[];
			this.attached=false;
			this.end_symbol=Symbol(null);
		}
		write(args_spread){
			console.assert(args_spread[0] === this.document_write);
			console.assert(args_spread[1] === this.attached_document);
			this.list.push(args_spread[2], null);
		}
		/**@arg {Document} document */
		attach_proxy(document){
			if(this.attached){
				let was_destroyed=this.destroy(true);
				if(!was_destroyed){
					throw new Error("Can't reattach to document, document.write is not equal to DocumentWriteList.document_write_proxy");
				}
			}
			this.attached_document=document;
			this.document_write=document.write;
			this.document_write_proxy=new Proxy(document.write, {
				other:this,
				apply(...a){
					this.other.write(a);
				}
			});
			document.write=this.document_write_proxy;
		}
		destroy(should_try_to_destroy){
			if(this.attached_document&&this.document_write_proxy){
				console.assert(this.attached_document.write === this.document_write_proxy);
				if(this.attached_document.write !== this.document_write_proxy){
					if(should_try_to_destroy){
						return false;
					}
					throw new Error("Unable to destroy: document.write is not equal to DocumentWriteList.document_write_proxy");
				}
				this.attached_document.write=this.document_write;
			}
			if(this.document_write_proxy){
				this.document_write_proxy=null;
			}
			if(this.document_write){
				this.document_write=null;
			}
			if(this.attached_document){
				this.attached_document=null;
			}
			if(should_try_to_destroy){
				return true;
			}
		}
	}
	class UniqueIdGenerator {
		constructor(){
			this.m_current=-1;
		}
		set_current(current_value){
			this.m_current=current_value;
		}
		current(){
			return this.m_current;
		}
		next(){
			return this.m_current++;
		}
	}
	class PromiseExecutorHandle {
		constructor(accept, reject){
			this.m_closed=false;
			this.m_accept=accept;
			this.m_reject=reject;
		}
		accept(value){
			if(this.destroyed)throw new Error("accept called on destroyed PromiseExecutorHandle");
			let accept=this.m_accept;
			accept(value);
			this.close();
		}
		reject(error){
			if(this.destroyed)throw new Error("accept called on destroyed PromiseExecutorHandle");
			let reject=this.m_reject;
			reject(error);
			this.close();
		}
		closed(){
			return this.m_closed;
		}
		close(){
			this.m_closed=true;
			this.m_accept=null;
			this.m_reject=null;
		}
	}
	function worker_code_function(verify_callback) {
		const TIMER_SINGLE=1;
		const TIMER_REPEATING=2;
		const TIMER_TAG_COUNT=3;
		if(verify_callback){
			verify_callback({
				TIMER_SINGLE,
				TIMER_REPEATING,
				TIMER_TAG_COUNT
			});
		}
		class RemoteReplyTypes {
			/**@type {402} */
			msg=402
			/**@type {500} */
			from_remote=500
			/**@type {600} */
			to_worker=600
			/**@type {301} */
			update_handler=301
			/**@type {302} */
			ready=302
			/**@type {{single:303, repeating:304}} */
			set={single:303, repeating:304}
			/**@type {{single:305, repeating:306, any:307}} */
			clear={single:305, repeating:306, any:307}
		}
		class RemoteTimerApi {
			msg_types={
				/**@type {1} */
				async:1,
				reply:new RemoteReplyTypes,
				/**@type {{single:101, repeating:102}} */
				fire:{single:101, repeating:102},
				worker:{
					/**@type {201} */
					update_handler:201,
					/**@type {202} */
					ready:202,
					/**@type {{single:203, repeating:204}} */
					set:{single:203, repeating:204},
					/**@type {{single:205, repeating:206, any:207}} */
					clear:{single:205, repeating:206, any:207}
				}
			}
			/**@type {{single:"setTimeout",repeating:"setInterval"}} */
			set_names={
				single:"setTimeout",
				repeating:"setInterval"
			}
			/**@type {{single:"clearTimeout",repeating:"clearInterval"}} */
			clear_names={
				single:"clearTimeout",
				repeating:"clearInterval"
			}
		}
		class RemoteWorkerState {
			constructor(){
				/**@type {RemoteTimer|null} */
				this.m_timer=null;
				this.unique_script_id=1;
			}
			set_timer(timer){
				this.m_timer=timer;
			}
			set(tag, remote_id, timeout){
				return this.m_timer.set(tag, remote_id, timeout);
			}
			clear(msg) {
				return this.m_timer.do_clear(msg);
			}
		}
		function nop_fn(){};
		function fire_timer(timer, remote_id){
			timer.fire(remote_id);
		}
		class RemoteTimer {
			constructor(api_info=new RemoteTimerApi){
				this.m_remote_id_to_state_map=new Map;
				/**@type {RemoteTimerApi} */
				this.m_api_info=api_info;
				this.base_id=globalThis[this.m_api_info.set_names.single](nop_fn);
				globalThis[this.m_api_info.clear_names.single](this.base_id);
			}
			fire(remote_id){
				let local_state=this.m_remote_id_to_state_map.get(remote_id);
				if(!local_state)return;
				this.validate_state(local_state, remote_id);
				if(!local_state.active){
					console.log('fire inactive', remote_id, local_state);
					return;
				};
				let tag=local_state.type;
				let msg_id;
				switch(tag){
					case TIMER_SINGLE:msg_id=this.m_api_info.msg_types.fire.single;break;
					case TIMER_REPEATING:msg_id=this.m_api_info.msg_types.fire.repeating;break;
				}
				if(!msg_id){
					console.assert(false, 'Unknown tag in RemoteWorker.fire', tag);
					console.info('TypeError like: let v:TIMER_SINGLE | TIMER_REPEATING (%o | %o) = %o', TIMER_SINGLE, TIMER_REPEATING, tag);
					return;
				}
				postMessage({
					t: msg_id,
					v: remote_id
				});
			}
			set(tag, remote_id, timeout){
				this.verify_tag(tag);
				let obj={
					active:true,
					local_id:-1,
					type:tag
				};
				this.m_remote_id_to_state_map.set(remote_id, obj);
				/**@type {typeof this.m_api_info.set_names.single | typeof this.m_api_info.set_names.repeating} */
				let api_name;
				switch(tag){
					case TIMER_SINGLE:api_name=this.m_api_info.set_names.single;break;
					case TIMER_REPEATING:api_name=this.m_api_info.set_names.repeating;break;
				}
				if(!api_name)return;
				obj.local_id=globalThis[api_name](fire_timer, timeout, this, remote_id);
				return obj.local_id;
			}
			// If you cause any side effects, please
			// wrap this call in try{}finally{} and
			// revert all side effects...
			verify_tag(tag){
				if(!this.validate_tag(tag)){
					throw new Error("tag verification failed in RemoteTimer");
				}
			}
			verify_state(state, remote_id) {
				if(!this.validate_state(state)){
					console.info("Removed invalid local_state");
					globalThis[this.m_api_info.clear_names.single](state.local_id);
					globalThis[this.m_api_info.clear_names.repeating](state.local_id);
					this.m_remote_id_to_state_map.delete(remote_id);
					throw new Error("Tag verification failed in RemoteWorker");
				}
			}
			validate_tag(tag){
				if(tag < TIMER_SINGLE || tag >= TIMER_TAG_COUNT){
					console.assert(false, "Assertion failed in RemoteTimer.validate_tag: tag=%o is out of range");
					console.info("Info: range is TIMER_SINGLE to TIMER_TAG_COUNT-1 (%o...%o-1)", tag, TIMER_SINGLE, TIMER_TAG_COUNT);
					return false;
				}
				return true;
			}
			validate_state(state){
				return this.validate_tag(state.type);
			}
			clear(remote_id){
				if(this.m_remote_id_to_state_map.has(remote_id)){
					let state=this.m_remote_id_to_state_map.get(remote_id);
					this.verify_state(state, remote_id);
					if(state.type === TIMER_SINGLE){
						globalThis[this.m_api_info.clear_names.single](state.local_id);
					}
					if(state.type === TIMER_REPEATING){
						globalThis[this.m_api_info.clear_names.repeating](state.local_id);
					}
					state.active=false;
					this.m_remote_id_to_state_map.delete(remote_id);
				}
			}
			do_clear(msg){
				let remote_id=msg.v;
				this.clear(remote_id);
				postMessage({
					t:this.m_api_info.msg_types.reply.from_remote,
					v:{
						t:this.m_api_info.msg_types.reply.msg,
						v:{
							t:msg.t,
							v:remote_id
						}
					}
				});
			}
		}
		let remote_worker_state=new RemoteWorkerState;
		globalThis.remote_worker_state=remote_worker_state;
		remote_worker_state.set_timer(new RemoteTimer);
		onmessage=function(e){
			let msg = e.data;
			if(!remote_worker_state.m_timer){
				console.log('got message but don\'t have a timer');
				return;
			}
			let message_types=remote_worker_state.m_timer.m_api_info.msg_types;
			let reply_message_types=message_types.reply;
			switch (msg.t) {
				case 200/*reply*/:{
					let result=msg.v;
					console.assert(false, "unhandled result on remote worker", result);
					debugger;
				} break;
				case 201/*remote worker init*/:{
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
					postMessage({
						t:reply_message_types.from_remote,
						v:{
							t:1,
							v:msg.t
						}
					});
				} break;
				case 202/**/:{
					postMessage({
						t:reply_message_types.from_remote,
						v:{
							t:message_types.reply.ready,
							v:msg.t
						}
					});
				} break;
				case 203/*remote timer set single*/:{
					let user_msg=msg.v;
					let local_id = remote_worker_state.set(TIMER_SINGLE, user_msg.t, user_msg.v);
					postMessage({
						t:reply_message_types.from_remote,
						v:{
							t:message_types.reply.set.single,
							v:local_id
						}
					});
				} break;
				case 204/*remote timer set repeating*/:{
					let user_msg=msg.v;
					let local_id = remote_worker_state.set(TIMER_REPEATING, user_msg.t, user_msg.v);
					postMessage({
						t:reply_message_types.from_remote,
						v:{
							t:message_types.reply.set.repeating,
							v:local_id
						}
					});
				} break;
				case 205/*remote timer do_clear single*/:{
					remote_worker_state.clear(msg);
					postMessage({
						t:reply_message_types.from_remote,
						v:message_types.reply.clear.single
					});
				} break;
				case 206/*remote timer do_clear repeating*/:{
					remote_worker_state.clear(msg);
					postMessage({
						t:reply_message_types.from_remote,
						v:message_types.reply.clear.repeating
					});
				} break;
				default:{
					console.assert(false, "RemoteWorker: Unhandled message", msg);
					debugger;
				} break;
			}
		}
	}
	class WorkerState {
		constructor(worker_code_blob, timer, executor_handle){
			let has_blob=false;
			if(worker_code_blob instanceof Blob)has_blob=true;
			if(!has_blob)throw new Error("WorkerState requires a blob with javascript code to execute on a worker");
			if(!timer)throw new Error("WorkerState needs a timer");
			if(!executor_handle)throw new Error("WorkerState needs a executor_handle");
			if(executor_handle.closed())throw new Error("WorkerState needs a executor_handle that is not closed");
			this.rejected=false;
			this.valid=false;
			this.connected=false;
			this.worker_code=worker_code_blob;
			this.timer=timer;
			timer.set_worker_state(this);
			this.executor_handle=executor_handle;
			this.worker=null;
			this.worker_url=null;
			this.init();
		}
		init() {
			if(this.connected || this.valid){
				this.destroy();
			}
			this.connected=false;
			/**@type {WeakRef<this>} */
			let weak_worker_state=new WeakRef(this);
			this.worker_url = URL.createObjectURL(this.worker_code);
			this.worker = new Worker(this.worker_url);
			this.worker.onmessage = function onmessage(e) {
				var msg = e.data;
				/**@type {typeof weak_worker_state} */
				let worker_state=weak_worker_state.deref();
				if(!worker_state){
					console.log('lost worker state');
					this.terminate();
					return;
				}
				switch (msg.t) {
					case 401:
					case 402/*worker_state dispatch_message_unpacked*/:{
						debugger;
						worker_state.dispatch_message(msg);
						break;
					}
					case 500/*worker_state dispatch_message*/:{
						worker_state.dispatch_message(msg.v);
						break;
					}
					case 101/*worker_state.timer single fire*/:{
						worker_state.timer.fire(TIMER_SINGLE, msg.v);
						break;
					}
					case 102/*worker_state.timer repeating fire*/:{
						worker_state.timer.fire(TIMER_REPEATING, msg.v);
						break;
					}
					case 300/*worker_state destroy*/:
						worker_state.destroy();
						break;
					default:{
						console.assert(false, "Main: Unhandled message", msg);
						debugger;
						break;
					}
				}
			};
			this.valid=true;
			this.worker.postMessage({
				t: 202
			});
		}
		set_executor_handle(handle){
			this.executor_handle=handle;
		}
		on_result(result){
			switch(result){
				case 201:{
					console.log("remote_worker onmessage function changed");
					break;
				}
				case 202:{
					if(this.executor_handle.closed()){
						console.assert(false, "WorkerState used with closed executor_handle");
						break;
					}
					l_log_if(LOG_LEVEL_VERBOSE, "remote_worker ready");
					WorkerState.set_global_state(this);
					this.executor_handle.accept(this);
					this.connected=true;
					break;
				}
			}
		}
		dispatch_message(result) {
			let msg_type=result;
			let msg_data=null;
			if(typeof msg_type === 'object'){
				msg_type=msg_type.t;
				msg_data=msg_type.v;
			}
			switch(msg_type) {
				case 301:
				case 302:
				case 401:{
					this.on_result(result.v);
				} break;
				case 402:{
					this.timer.on_result(result.v);
				} break;
				case 303:
				case 304:
				case 306:
					{
						this.timer.on_reply(result);
					} break;
				default:{
					console.assert(false, "unhandled result", result);
					debugger;
				}
			}
		}
		postMessage(data){
			return this.worker.postMessage(data);
		}
		static has_old_global_state_value(worker_state_value){
			return this.has_global_state() && !this.equals_global_state(worker_state_value);
		}
		static equals_global_state(worker_state_value){
			return this.get_global_state() === worker_state_value;
		}
		static maybe_delete_old_global_state_value(worker_state_value){
			if(this.has_old_global_state_value(worker_state_value)){
				this.delete_old_global_state();
			}
		}
		static maybe_delete_old_global_state(){
			if(this.has_global_state()){
				this.delete_old_global_state();
				return true;
			}
			return false;
		}
		static delete_old_global_state(){
			let old_worker_state=this.get_global_state();
			this.destroy_old_worker_state(old_worker_state, 'delete_global_state');
		}
		static destroy_old_worker_state(worker_state_value, before_destroy_call_name){
			this[before_destroy_call_name]();
			worker_state_value.destroy();
		}
		static global_state_key="g_worker_state";
		static has_global_state(){
			return window.hasOwnProperty(this.global_state_key);
		}
		static get_global_state(){
			return window[this.global_state_key];
		}
		static set_global_state(worker_state_value){
			this.maybe_delete_old_global_state_value(worker_state_value);
			window[this.global_state_key]=worker_state_value;
		}
		static delete_global_state(){
			delete window[this.global_state_key];
		}
		destroy(){
			if (this.worker){
				this.worker.terminate();
				this.worker=null;
				URL.revokeObjectURL(this.worker_url);
				this.worker_url = null;
				if(!this.executor_handle.closed()){
					this.executor_handle.reject(new Error("Worker destroyed before it was connected"));
				}
				this.connected=false;
			};
			this.timer.destroy();
			this.valid=false;
		}
	}
	function timer_nop(){}
	class Timer {
		/**@arg {TimerApi} api_info */
		constructor(id_generator, api_info){
			this.id_generator=id_generator;
			this.m_remote_id_to_state_map=new Map;
			this.weak_worker_state=null;
			this.m_api_map=new Map;
			/**@type {TimerApi} */
			this.m_api_info=api_info;
			this.set_api_names(api_info.set_names, api_info.clear_names)
		}
		/**@arg {TimerApi['set_names']|TimerApi['clear_names']} names */
		set_map_names(names){
			this.m_api_map.set(names.single, window[names.single]);
			this.m_api_map.set(names.repeating, window[names.repeating]);
		}
		/**@arg {TimerApi['set_names']} set @arg {TimerApi['clear_names']} clear */
		set_api_names(set, clear){
			this.set_map_names(set);
			this.set_map_names(clear);
			this.base_id=window[set.single](timer_nop);
			window[clear.single](this.base_id);
			this.id_generator.set_current(this.base_id);
		}
		set_worker_state(worker_state_value){
			this.weak_worker_state=new WeakRef(worker_state_value);
		}
		// If you cause any side effects, please
		// wrap this call in try{}finally{} and
		// revert all side effects...
		verify_tag(tag){
			if(!this.validate_tag(tag)){
				throw new Error("Verify failed in Timer.verify_tag");
			}
		}
		verify_state(state, remote_id) {
			if(!this.validate_timer_state(state)) {
				let worker_state=this.weak_worker_state.deref();
				worker_state.postMessage({
					t: this.m_api_info.msg_types.worker.clear.any,
					v: remote_id
				});
				throw new Error("Verify failed in Timer.verify_timer_state");
			}
		}
		validate_tag(tag){
			if(tag < TIMER_SINGLE || tag >= TIMER_TAG_COUNT){
				console.assert(false, "Assertion failure in Timer.validate_tag: tag=%o is out of range");
				console.info("Info: range is TIMER_SINGLE to TIMER_TAG_COUNT-1 (%o...%o-1)", tag, TIMER_SINGLE, TIMER_TAG_COUNT);
				return false;
			}
			return true;
		}
		validate_timer_state(state){
			return this.validate_tag(state.type);
		}
		fire(timer_mode_tag, remote_id){
			let state = this.get_state_by_remote_id(remote_id);
			if(!state){
				this.force_clear(timer_mode_tag, remote_id);
				return;
			}
			if(state.active){
				state.target_function.apply(null, state.target_arguments);
			}
			if(timer_mode_tag === TIMER_SINGLE){
				state.active=false;
				this.clear(timer_mode_tag, remote_id);
			}
		}
		set(timer_mode_tag, target_function, timeout, target_arguments){
			let remote_id = this.id_generator.next();
			let is_repeating=false;
			this.verify_tag(timer_mode_tag);
			if(timer_mode_tag === TIMER_REPEATING){
				is_repeating=true;
			}
			if (timeout < 0)timeout = 0;
			let state = {
				active: true,
				type: timer_mode_tag,
				repeat:is_repeating,
				target_function,
				target_arguments,
				timeout
			};
			this.store_state_by_remote_id(remote_id, state);
			this.send_worker_set_message(timer_mode_tag, {
				t:remote_id,
				v:timeout
			});
			return remote_id;
		}
		send_worker_set_message(tag, obj) {
			let worker_state=this.weak_worker_state.deref();
			if(!worker_state){
				console.assert(false, 'tried to send_worker_message, but the gc collected the worker_state, referenced with a WeakRef (weak_worker_state)');
				return;
			}
			let msg_id;
			switch(tag){
				case TIMER_SINGLE:msg_id=this.m_api_info.msg_types.worker.set.single;break;
				case TIMER_REPEATING:msg_id=this.m_api_info.msg_types.worker.set.repeating;break;
			}
			if(!msg_id){
				console.assert(false, 'Unknown timer_tag', tag);
				console.info('TypeError like: let v:TIMER_SINGLE | TIMER_REPEATING (%o | %o) = %o', TIMER_SINGLE, TIMER_REPEATING, tag);
				return;
			}
			worker_state.postMessage({
				t: msg_id,
				v: obj
			});
		}
		is_state_stored_by_remote_id(remote_id){
			return this.m_remote_id_to_state_map.has(remote_id);
		}
		get_state_by_remote_id(remote_id){
			let state = this.m_remote_id_to_state_map.get(remote_id);
			if(!state)return null;
			this.verify_state(state, remote_id);
			return state;
		}
		store_state_by_remote_id(remote_id, state){
			this.m_remote_id_to_state_map.set(remote_id, state);
		}
		delete_state_by_remote_id(remote_id){
			this.m_remote_id_to_state_map.delete(remote_id);
		}
		remote_id_to_state_entries(){
			return this.m_remote_id_to_state_map.entries();
		}
		on_result(timer_result_msg){
			let timer_result_msg_id=timer_result_msg.t;
			switch(timer_result_msg_id){
				case 205:{
					let remote_id=timer_result_msg.v;
					this.delete_state_by_remote_id(remote_id);
					break;
				}
				case 206:{
					let remote_id=timer_result_msg.v;
					this.delete_state_by_remote_id(remote_id);
					break;
				}
				default:
					console.assert(false, 'on_result timer_result_msg needs a handler for', timer_result_msg);
			}
		}
		on_reply(msg){
			let msg_type;
			let msg_data=null;
			if(typeof msg === 'object'){
				msg_type=msg.t;
				msg_data=msg.v;
			} else {
				msg_type=msg;
			}
			switch(msg_type){
				case 205:{
					let remote_id=msg.v;
					this.delete_state_by_remote_id(remote_id);
					break;
				}
				case 206:{
					let remote_id=msg.v;
					this.delete_state_by_remote_id(remote_id);
					break;
				}
				case 303:
				case 304:
				case 306:break;
				default:
					console.log('reply', msg_type, msg_data);
					console.assert(false, 'on_result msg needs a handler for', msg);
					debugger;
			}
		}
		force_clear(tag, remote_id){
			this.verify_tag(tag);
			let worker_state=this.weak_worker_state.deref();
			let state = this.get_state_by_remote_id(remote_id);
			if(!state)throw new Error("No state for id");
			if(state.active){
				return this.clear(tag, remote_id);
			}
			// we have to trust the user, go ahead and send the message
			// anyway (this can technically send structured cloneable objects)
			if(tag === TIMER_SINGLE) {
				worker_state.postMessage({
					t: this.m_api_info.msg_types.worker.clear.single,
					v: remote_id
				});
			} else if(tag === TIMER_REPEATING) {
				worker_state.postMessage({
					t: this.m_api_info.msg_types.worker.clear.repeating,
					v: remote_id
				});
			}
		}
		clear(tag, remote_id){
			this.verify_tag(tag);
			let state = this.get_state_by_remote_id(remote_id);
			if(state?.active){
				let worker_state=this.weak_worker_state.deref();
				if(state.type === TIMER_SINGLE) {
					worker_state.postMessage({
						t: this.m_api_info.msg_types.worker.clear.single,
						v: remote_id
					});
				} else if(state.type === TIMER_REPEATING) {
					worker_state.postMessage({
						t: this.m_api_info.msg_types.worker.clear.repeating,
						v: remote_id
					});
				}
				state.active = false;
			}
		}
		destroy(){
			let api_info=this.m_api_info;
			let api_map=this.m_api_map;
			window[api_info.set_names.single] = api_map.get(api_info.set_names.single);
			window[api_info.set_names.repeating] = api_map.get(api_info.set_names.repeating);
			window[api_info.clear_names.single] = api_map.get(api_info.clear_names.single);
			window[api_info.clear_names.repeating] = api_map.get(api_info.clear_names.repeating);
			for (var state_entry of this.remote_id_to_state_entries()) {
				let id=state_entry[0];
				void id;
				let state=state_entry[1];
				if(state.type === TIMER_SINGLE){
					// if the timer might get reset when calling the function while
					// the timer functions are reset to the underlying api
					state.target_function.apply(null, state.target_arguments);
				}
			}
			this.m_api_map.clear();
		}
	}
	class VerifyError extends Error{
		constructor(message){
			super(message);
			this.name="VerifyError";
		}
	}
	function VERIFY(assert_result, assert_message){
		if(!assert_result){
			throw new VerifyError(assert_message);
		}
	}
	function move_timers_to_worker_promise_executor(executor_accept, executor_reject) {
		if (globalThis.remote_worker_state) {
			postMessage({t: 300});
			executor_accept(null);
			return;
		}
		if (WorkerState.maybe_delete_old_global_state())return null;
		worker_code_function(function(verify_obj){
			VERIFY(verify_obj.TIMER_REPEATING === TIMER_REPEATING, "TIMER_SINGLE constant matches");
			VERIFY(verify_obj.TIMER_REPEATING === TIMER_REPEATING, "TIMER_REPEATING constant matches");
			VERIFY(verify_obj.TIMER_TAG_COUNT === TIMER_TAG_COUNT, "TIMER_TAG_COUNT constant matches");
			VERIFY(Object.keys(verify_obj).length === 3, "keys(verify_obj).length is expected value");
			return;
		});
		const worker_code_blob = new Blob(["(", worker_code_function.toString(), ")()","\n//# sourceURL=$__.0"]);
		let id_generator=new UniqueIdGenerator;
		let timer=new Timer(id_generator, new TimerApi);
		let executor_handle=new PromiseExecutorHandle(executor_accept, executor_reject);
		const worker_state=new WorkerState(worker_code_blob, timer, executor_handle);
		const weak_worker_state = new WeakRef(worker_state);
		const setTimeout_global=setTimeout;
		function remoteSetTimeout(handler, timeout, ...target_arguments) {
			if(!worker_state) {
				setTimeout=setTimeout_global;
				l_log_if(LOG_LEVEL_WARN, 'lost worker_state in timer');
				return setTimeout_global(handler, timeout, ...target_arguments);
			}
			if(typeof timeout === 'undefined')timeout=0;
			if(typeof timeout != 'number' && timeout.valueOf)timeout=timeout.valueOf();
			if(typeof timeout != 'number' && timeout.toString)timeout=timeout.toString();
			return worker_state.timer.set(TIMER_SINGLE, handler, timeout, target_arguments);
		}
		const clearTimeout_global=clearTimeout;
		/**@arg {number} id */
		function remoteClearTimeout(id=void 0) {
			if(!worker_state) {
				clearTimeout=clearTimeout_global;
				l_log_if(LOG_LEVEL_WARN, 'lost worker_state in timer');
				return clearTimeout_global(id);
			}
			worker_state.timer.clear(TIMER_SINGLE, id);
		}
		const setInterval_global=setInterval;
		function remoteSetInterval(handler, timeout=0, ...target_arguments) {
			if(!worker_state) {
				setInterval=setInterval_global;
				l_log_if(LOG_LEVEL_WARN, 'lost worker_state in timer');
				return setInterval_global(handler, timeout, ...target_arguments);
			}
			if(typeof timeout === 'undefined')timeout=0;
			if(typeof timeout != 'number' && timeout.valueOf)timeout=timeout.valueOf();
			if(typeof timeout != 'number' && timeout.toString)timeout=timeout.toString();
			return worker_state.timer.set(TIMER_REPEATING, handler, timeout, target_arguments);
		}
		const clearInterval_global=clearInterval;
		/**@arg {number} id */
		function remoteClearInterval(id) {
			if(!worker_state) {
				clearInterval=clearInterval_global;
				l_log_if(LOG_LEVEL_WARN, 'lost worker_state in timer');
				return clearInterval_global(id);
			}
			worker_state.timer.clear(TIMER_REPEATING, id);
		}
		window.setTimeout = remoteSetTimeout;
		window.setInterval = remoteSetInterval;
		window.clearTimeout = remoteClearTimeout;
		window.clearInterval = remoteClearInterval;
		return {
			get(){
				return weak_worker_state.deref();
			}
		};
	}
	let seen_elements=new WeakSet;
	function remove_bad_dom_script_element_callback(e){
		if(seen_elements.has(e))return;
		seen_elements.add(e);
		if(!e.src)return;
		if(e.src.includes("analytics.js") && e.src.includes("google")){
			e.remove();
			return;
		}
		if(e.src.includes("platform.js")){
			e.remove();
			return;
		}
		//spell:disable-next-line
		if(e.src.indexOf("opentracker") > -1){
			e.remove();
			return;
		}
		//spell:disable-next-line
		if(e.src.includes("pagead/js/adsbygoogle.js")){
			e.remove();
			return;
		}
		if(new URL(e.src).origin != location.origin)return;
		if(e.src.indexOf("ads") > -1 || e.src.indexOf("track") > -1){
			e.remove();
			return;
		}
	}
	function remove_bad_dom_script_element(){
		Array.prototype.forEach.call(document.querySelectorAll("script"), remove_bad_dom_script_element_callback);
	};
	class EventHandlerDispatch {
		constructor(target_obj, target_name){
			this.target_obj=target_obj;
			this.target_name=target_name;
		}
		handleEvent(event){
			this.target_obj[this.target_name](event);
		}
	}
	class AbstractVM {
		push(){
			console.log('you might want to implement this.push for this constructor', Object.getPrototypeOf(this).constructor);
			throw new Error("Abstract function");
		}
		pop(){
			console.log('you might want to implement this.pop for this constructor', Object.getPrototypeOf(this).constructor);
			throw new Error("Abstract function");
		}
		execute_instruction_raw(cur_opcode, operands){
			// ignore it, this is the base, if you want to ignore instruction opcodes go ahead
			if(this.execute_instruction_raw !== AbstractVM.prototype.execute_instruction_raw)return;
			throw new Error("Abstract function");
		}
		execute_instruction_raw_t(cur_opcode, operands){
			switch(cur_opcode) {
					// implement more opcode handling here
				default/*Debug*/:super.execute_instruction_raw(cur_opcode, operands);break;
			}
		}
	}
	class BaseVMCreate extends AbstractVM {
		constructor(instructions){
			super();
			this.instructions = instructions;
			this.instruction_pointer = 0;
			this.running = false;
		}
		reset(){
			this.instruction_pointer = 0;
			this.running = false;
		}
		is_in_instructions(value){
			return value >= 0 && value < this.instructions.length;
		}
		execute_instruction_raw(cur_opcode, operands) {
			switch(cur_opcode) {
				default:{
					console.info('Unknown opcode', cur_opcode);
					throw new Error('Halt: bad opcode ('+cur_opcode+')');
				}
				case 'je':{
					let [target] = operands;
					if(this.is_in_instructions(target)){
						throw new Error("RangeError: Jump target is out of instructions range");
					}
					if(this.flags.equal){
						this.instruction_pointer=target;
					}
				} break;
				case 'jmp':{
					let [target] = operands;
					if(this.is_in_instructions(target)){
						throw new Error("RangeError: Jump target is out of instructions range");
					}
					this.instruction_pointer=target;
				} break;
				case 'modify_operand':{
					let [target, offset]=operands;
					if(this.is_in_instructions(target)){
						throw new Error("RangeError: Destination is out of instructions range");
					}
					let instruction_modify=this.instructions[ip_target].slice();
					let value=this.pop();
					instruction_modify[offset] = value;
					let verify_state=[instruction_modify.length];
					//[instruction.length]
					let valid_instruction=SimpleStackVMParser.verify_instruction(instruction_modify, verify_state);
					this.instructions[ip_target]=valid_instruction;
					console.log('new verify state', verify_state);
					console.assert(verify_state[0] === 0, "not all of the operands typechecked");
				} break;
				case 'push_pc':{
					if(AbstractVM.prototype.push === this.push){
						throw new Error("push_pc requires a stack");
					}
					this.push(this.instruction_pointer);
				} break;
				case 'halt'/*Running*/:this.running=false; break;
			}
		}
	}
	function trigger_debug_breakpoint(){
		debugger;
	}
	const local_logging_level=3;
	function l_log_if(level, ...args){
		if(level <= local_logging_level) {
			console.log(...args);
		}
	}
	const LOG_LEVEL_ERROR=1;
	const LOG_LEVEL_WARN=2;
	const LOG_LEVEL_INFO=3;
	const LOG_LEVEL_VERBOSE=4;
	const LOG_LEVEL_TRACE=5;
	class BaseStackVM extends BaseVMCreate {
		constructor(instructions){
			super(instructions);
			this.stack=[];
			this.return_value = void 0;
		}
		reset(){
			super.reset();
			this.stack.length = 0;
			this.return_value = void 0;
		}
		push(value) {
			this.stack.push(value);
		}
		pop() {
			return this.stack.pop();
		}
		pop_arg_count(operand_number_of_arguments){
			let arguments_arr=[];
			let arg_count=operand_number_of_arguments;
			for(let i = 0; i < arg_count; i++) {
				if(this.stack.length <= 0){
					throw new Error('stack underflow in pop_arg_count');
				}
				arguments_arr.unshift(this.pop());
			}
			return arguments_arr;
		}
		execute_instruction_raw(cur_opcode, operands){
			switch(cur_opcode) {
				case 'push'/*Stack*/: {
					for(let i = 0; i < operands.length; i++) {
						let item = operands[i];
						this.push(item);
					}
				} break;
				case 'drop'/*Stack*/:this.pop();break;
				case 'get'/*Object*/: {
					let target_name = this.pop();
					let target_obj = this.pop();
					this.push(target_obj[target_name]);
				} break;
				case 'call'/*Call*/: {
					let number_of_arguments = operands[0];
					if(number_of_arguments <= 1){
						throw new Error("Not enough arguments for call (min 2, target_this, target_fn)");
					}
					let [target_this, target_fn, ...arg_arr] = this.pop_arg_count(number_of_arguments);
					let ret = target_fn.apply(target_this, arg_arr);
					this.push(ret);
				} break;
				case 'construct'/*Construct*/:{
					let number_of_arguments=operands[0];
					let [construct_target, ...construct_arr]=this.pop_arg_count(number_of_arguments);
					if(construct_target instanceof Function){
						let obj=new construct_target(...construct_arr);
						this.push(obj);
					} else {
						console.assert(false, 'try to construct non function');
						debugger;
					}
					l_log_if(LOG_LEVEL_VERBOSE, operands, ...this.stack.slice(this.stack.length-operands[0]));
				} break;
				case 'return'/*Call*/:this.return_value=this.pop();break;
				default:super.execute_instruction_raw(cur_opcode, operands);break;
			}
		}
		run() {
			this.running = true;
			while(this.instruction_pointer < this.instructions.length && this.running) {
				let [cur_opcode, ...operands] = this.instructions[this.instruction_pointer];
				this.execute_instruction_raw(cur_opcode, operands);
				this.instruction_pointer++;
			}
			console.assert(this.stack.length === 0, "stack length is not zero, unhandled data on stack");
			return this.return_value;
		}
	}
	class SimpleStackVM extends BaseStackVM {
		constructor(instructions){
			super(instructions);
			this.args_vec=null;
		}
		reset() {
			super.reset();
			this.args_vec=null;
		}
		execute_instruction_raw(cur_opcode, operands) {
			switch(cur_opcode) {
				case 'this'/*Special*/:this.push(this);break;
					// TODO: if you ever use this on a worker, change
					// it to use globalThis...
				case 'global'/*Special*/:this.push(window);break;
				case 'breakpoint'/*Debug*/:trigger_debug_breakpoint();break;
				case 'call'/*Call*/: {
					// TODO: Fix the other code to use the call handling from
					// the base class
					// Currently we support applying functions
					// this is closer to what you expect, not to just get
					// the name of a member to call
					let number_of_arguments = operands[0];
					let [target_obj, target_name, ...arg_arr] = this.pop_arg_count(number_of_arguments);
					let ret = target_obj[target_name](...arg_arr);
					this.push(ret);
				} break;
				default:super.execute_instruction_raw(cur_opcode, operands);break;
			}
		}
		run(...run_arguments) {
			this.args_vec=run_arguments;
			super.run();
		}
	}
	class SimpleStackVMParser {
		/**@arg {string[] | number[]} cur @arg {number} arg_loc*/
		static parse_int_arg(cur, arg_loc) {
			let cur_item = cur[arg_loc];
			if(typeof cur_item == 'string') {
				let arg = cur_item;
				if(arg[3] === '()'[0] && arg.at(-1) === "()"[1]) {
					let str_int = arg.slice(4, -1);
					cur[arg_loc] = parseInt(str_int, 10);
				}
			}
		}
		static parse_string_with_format_ident(str, format_list) {
			let format_index = str.indexOf('%');
			let format_type = str[format_index + 1];
			switch(format_type) {
				case 'o':
					return format_list.shift();
				default:
					console.log("%s", 'unsupported format spec %' + format_type);
			}
		}
		static parse_current_instruction(cur, format_list) {
			let arg_loc = 1;
			let arg = cur[arg_loc];
			while(arg) {
				if(arg.slice(0, 3) === 'int') this.parse_int_arg(cur, arg_loc);
				if(arg.includes('%')) {
					let res = this.parse_string_with_format_ident(arg, format_list);
					cur[arg_loc] = res;
				}
				arg_loc++;
				arg = cur[arg_loc]
			}
		}
		static raw_parse_handle_regexp_match(m) {
			let iter=m[1].trim();
			if(iter.startsWith("//"))return;
			while(iter.startsWith("/*")){
				let j=iter.indexOf("*/");
				iter=iter.slice(j+2).trim();
			}
			if(!iter)return "";
			return iter.split(",");
		}
		static parse_string_into_raw_instruction_stream(string) {
			const parser_max_match_iter = 300;let parts, arr = [], i = 0;
			do {
				parts = this.match_regex.exec(string);
				if(!parts) break;
				let res = this.raw_parse_handle_regexp_match(parts);
				if(res) arr.push(res);
			} while(parts && i++ < parser_max_match_iter);
			if(parts)console.assert(false, 'SimpleStackVM Parser: Iteration limit exceeded (limit=%o)', parser_max_match_iter);return arr;
		}
		static parse_instruction_stream_from_string(string, format_list) {
			let raw_instructions = this.parse_string_into_raw_instruction_stream(string);
			for(let i=0;i<raw_instructions.length;i++) {
				let raw_instruction=raw_instructions[i];
				this.parse_current_instruction(raw_instruction, format_list);
			}
			let instructions = this.verify_raw_instructions(raw_instructions);return instructions;
		}
		/**@arg {string[]} instruction @arg {[number]} left @ret {InstructionType}*/
		static verify_instruction(instruction, left){
			const [m_opcode, ...m_operands] = instruction;
			switch(m_opcode) {
					// variable argument count
				case 'push':
					left[0] = 0;
					return [m_opcode, ...m_operands];
				case 'call'/*1 argument*/:
					left[0] -= 2;
					if(typeof m_operands[0] === 'number' && Number.isFinite(m_operands[0]))return [m_opcode, m_operands[0]];
					else {
						console.info("Can't verify that call instruction is valid, argument (%o) is not a number or not finite", m_operands[0]);
						throw new Error("TypeError: Invalid argument");
					}
				case 'drop':
				case 'get':
				case 'return':
				case 'halt':
				case 'push_args':
				case 'this':
				case 'global':
				case 'breakpoint'/*opcode*/:
					left[0]--;
					return [m_opcode];
				default:
					console.info("Info: opcode=%o instruction_parameters=%o", m_opcode, m_operands);
					throw new Error("Unexpected opcode");
			}
		}
		/*@arg {string[][]} raw_instructions @ret {InstructionType[]}*/
		static verify_raw_instructions(raw_instructions){
			/**@type{InstructionType[]}*/
			const instructions = [];
			for(let i = 0;i < raw_instructions.length;i++) {
				const instruction = raw_instructions[i];
				/*@type {[number]}*/const left = [instruction.length];
				const valid_instruction = this.verify_instruction(instruction, left);
				instructions.push(valid_instruction);
				if(left[0] > 0)throw new Error("Typechecking failure, data left when processing raw instruction stream");
			}
			return instructions;
		}
	}
	SimpleStackVMParser.match_regex = /(.+?)(;|$)/gm;
	class EventHandlerVMDispatch extends SimpleStackVM {
		constructor(instructions, target_obj) {
			super(instructions);
			this.target_obj = target_obj;
		}
		handleEvent(event) {
			this.reset();
			this.run(event);
		}
	}
	class CompressionStatsCalculator {
		constructor(){
			this.hit_counts=[];
			this.cache=[];
		}
		map_values(){
			return this.hit_counts;
		}
		map_keys(){
			return this.cache;
		}
		add_hit(index) {
			if(!this.map_values()[index]) {
				this.map_values()[index]=1;
			} else this.map_values()[index]++;
		}
		add_item(key){
			let index=this.map_keys().indexOf(key)
			if(index == -1)index=this.map_keys().push(key);
			else this.add_hit(index);
		}
		reset(){
			this.map_keys().length=0;
			this.map_values().length=0;
		}
		calc_compression_stats(arr, win_size){
			this.reset();
			for(let i=0;i<arr.length;i++){
				if(i+win_size < arr.length){
					this.add_item(arr.slice(i, i+win_size).join(","));
				}
			}
			return to_tuple_arr(this.map_keys(), this.map_values()).filter(e=>e[1]!==void 0);
		}
		calc_for_stats_window_size(stats_arr, arr, win_size){
			stats_arr[win_size-1]=this.calc_compression_stats(arr, win_size);
		}
		calc_for_stats_index(stats_arr, arr, index){
			stats_arr[index]=this.calc_compression_stats(arr, index+1);
		}
	}
	class BaseCompression {
		did_compress(src, dst){
			return dst.length < src.length;
		}
		did_decompress(src, dst){
			return dst.length > src.length;
		}
		compress_result(src, dst){
			if(this.did_compress(src, dst))return [true, dst];
			return [false, src];
		}
		decompress_result(src, dst) {
			// maybe this is not a decompression, just a modification to make
			// later decompression work
			if(this.did_decompress(src, dst))return [true, dst];
			return [false, dst];
		}
	}
	class MulCompression extends BaseCompression {
		constructor(){
			super();
			this.stats_calculator=new CompressionStatsCalculator;
			this.compression_stats=[];
		}

		try_compress(arr){
			let ret=[];
			for (let i=0;i<arr.length;i++){
				let item=arr[i];
				if(i+1 < arr.length){
					if(item === arr[i+1]) {
						let off=1;
						while(item === arr[i+off]){
							off++;
						}
						if(off > 1){
							ret.push(`${item}${off}`);
							i+=off-1;
						}else{
							ret.push(item);
						}
					}else{
						ret.push(item);
					}
				}else{
					ret.push(item);
				}
			}
			return this.compress_result(arr, ret);
		}
		try_decompress(arr){
			let ret=[];
			for (let i=0;i<arr.length;i++) {
				let item=arr[i];
				if(i+1 < arr.length) {
					let [item_type, num_data]=[item[0], item.slice(1)];
					let parsed=parseInt(num_data);
					if(!Number.isNaN(parsed)){
						for(let j=0;j<parsed;j++)ret.push(item_type);
						continue;
					}
				}
				ret.push(arr[i]);
			}
			return this.decompress_result(arr, ret);
		}
		compress_array(arr){
			let success, res;
			// await async_semaphore.inc(1);
			[success, res]=this.try_decompress(arr);
			if(success)arr=res;
			for(let i=0;i<4;i++){
				this.stats_calculator.calc_for_stats_index(this.compression_stats, arr, i);
				let ls=this.compression_stats[i];
				if(ls.length>0){
					continue;
				}
				break;
			}
			// await async_semaphore.dec(1);
			[success, res]=this.try_compress(arr);
			if(success)return res;
			return arr;
		}
	}
	function calc_ratio(arr){
		let ratio_acc=0;
		for(let i=0;i<arr.length;i++)ratio_acc+=arr[i];
		// don't divide by zero
		if(ratio_acc === 0)return 0;
		return ratio_acc/arr.length;
	}
	console.assert(calc_ratio([0,0]) === 0, "calc ratio of array full of zeros does not divide by zero");
	class AverageRatio {
		// @AverageRatio
		constructor(max_len, max_history_len, weight, human_duration, initial_arr=[]){
			this.arr=initial_arr;
			this.history=[];
			this.count=0;
			this.len=max_len;
			this.history_len=max_history_len;
			this.weight=weight;
			this.human_duration=human_duration;
		}
		/**@arg {boolean} from_prev */
		add(value, from_prev, debug=false){
			if(from_prev){
				if(debug)console.log("ratio add", this.human_duration, (value*100).toFixed(5));
				this.arr.unshift(value);
				this.history.unshift(value);
				if(this.history.length>this.history_len)this.history.pop();
				if(this.arr.length > this.len)this.arr.pop();
				this.count++;
				if(this.count > this.len){
					this.count=0;
					return true;
				}
			}else{
				this.arr[0]=value;
			}
			return false;
		}
		can_average(){
			return this.arr.length > 1;
		}
		get_average(){
			return calc_ratio(this.arr);
		}
	}
	class AbstractTarget {
		fire() {
			throw new Error("Attempt to call an abstract class");
		}
		start_async() {
			return Promise.reject(new Error("Attempt to call an abstract class"));
		}
	}
	class TimeoutTarget extends AbstractTarget {
		constructor(obj, callback, description){
			super();
			this.once=true;
			this.obj=obj
			this.callback=callback;
			this.description=description;
		}
		fire(){
			this.callback.call(this.obj);
		}
	}
	class IntervalTarget extends AbstractTarget {
		constructor(obj, callback, description){
			super();
			this.once=false;
			this.obj=obj
			this.callback=callback;
			this.description=description;
		}
		fire(){
			this.callback.call(this.obj);
		}
	}
	class PromiseTimeoutTarget {
		constructor(description){
			this.description=description;
		}
		get_promise(){
			if(this.promise)return this.promise;
			this.promise=new Promise(this.promise_executor.bind(this));
			return this.promise;
		}
		promise_executor(accept, reject){
			this.promise_accept=accept;
			this.callback=this.on_result.bind(this);
		}
		on_result(value){
			this.m_promise=null;
			this.promise_accept(value);
		}
		fire(){
			let cb_fn=this.callback;
			if(cb_fn)cb_fn();
		}
	}
	class AsyncTimeoutTarget extends PromiseTimeoutTarget {
		wait(){
			return this.get_promise();
		}
	}
	class BaseNode {
		constructor(){
			this.parent=null;
		}
		run(){
			// do nothing
		}
	}
	class BaseTimeoutNode extends BaseNode {
		constructor(timeout) {
			super();
			this.timeout=timeout;
		}
		get_timeout(){
			return this.timeout;
		}
		set_parent(parent){
			this.parent=parent;
		}
		remove(){
			if(this.parent)this.parent.remove_child(this);
		}
		destroy(){
			this.remove();
		}
	}
	class TimeoutIdNode extends BaseTimeoutNode {
		constructor(id=null){
			super(null);
			this.id=id;
		}
	}
	class TimeoutNode extends BaseTimeoutNode {
		constructor(timeout=0){
			super(timeout);
			this.id=null;
			this.target=null;
		}
		set_target(target){
			this.target=target;
		}
		set() {
			this.id=setInterval(this.run.bind(this), this.timeout);
		}
		start(target=new TimeoutTarget(null, target_fn, this.timeout)){
			if(target)this.target=target;
			this.set();
		}
		run(){
			this.id=null;
			this.remove();
		}
		destroy(){
			if(this.id !== null)clearTimeout(this.id);
		}
	}
	class IntervalNode extends BaseTimeoutNode {
		constructor(timeout=0, target_fn){
			super(timeout);
			this.target_fn=target_fn;
			this.id=null;
		}
		set(){
			this.id=setInterval(this.run.bind(this), this.timeout);
		}
		start(target=new IntervalTarget(null, this.target_fn, this.timeout)){
			if(target)this.set_target(target);
			this.set();
		}
		destroy(){
			if(this.id !== null)clearInterval(this.id);
		}
	}
	class AsyncTimeoutNode extends TimeoutNode {
		run() {
			debugger;
			super.run();
			if(this.target)this.target.fire();
		}
		start_async(target){
			if(target){
				this.target=target;
				this.set();
				return target.wait();
			}
			throw new Error("unable to start_async without anything to wait for");
		}
	}
	class AsyncNodeRoot {
		constructor(){
			this.children=[];
		}
		set(target_fn, timeout, repeat=false){
			let node;
			if(repeat) {
				node=new TimeoutNode(target_fn, timeout);
			} else {
				node=new IntervalNode(target_fn, timeout);
			}
			this.append_child(node);
			node.start();
		}
		append_raw(timeout_id, once=true) {
			this.append_child(new TimeoutIdNode(timeout_id, once));
		}
		append_child(record){
			record.remove();
			record.set_parent(this);
			this.children.push(record);
		}
		remove_child(record){
			let index=this.children.indexOf(record);
			this.children.splice(index, 1);
			record.set_parent(null);
		}
		destroy(){
			let item=this.children.shift();
			if(!item)return;
			do{
				console.log('timer destroy', item);
				item.destroy();
				item=this.children.shift();
			} while(item);
		}
	}
	class AverageRatioRoot {
		constructor(){
			/**@type {Map<string, AverageRatio>} */
			this.map=new Map;
			/**@type {string[]} */
			this.ordered_keys=[];
		}
		set_ordered_keys(ordered_keys){
			this.ordered_keys=ordered_keys;
		}
		can_average(key){
			let ratio_calc=this.map.get(key);
			return ratio_calc.can_average();
		}
		get_average(key){
			let ratio_calc=this.map.get(key);
			return ratio_calc.get_average();
		}
		/**@arg {[key:string, ratio:AverageRatio]} */
		push_ratio([key, ratio_obj]){
			this.ordered_keys.push(key);
			this.map.set(key, ratio_obj);
		}
		push(value){
			let cur=this.map.get(this.ordered_keys[0]);
			let res=cur.add(value, true, false);
			for(let i=1;i<this.ordered_keys.length;i++){
				let debug=false;
				let key=this.ordered_keys[i];
				cur=this.map.get(key);
				let prev=this.map.get(this.ordered_keys[i-1]);
				if(key === '30min')debug=true;
				res=cur.add(prev.get_average(), res, debug);
			}
		}
	}
	class AutoBuyState{
		constructor(root){
			this.root_node=root;
			this.debug=false;
			this.arr=[];
			this.ratio=0;
			this.compressor_stats=[];
			this.arr_max_len=5*60;
			this.val=1;
			this.ratio_mode=0;
			this.locked_cycles=0;
			this.is_init_complete=false;
		}
		init(){
			if(atomepersecond === 0){
				let node=new AsyncTimeoutNode(0);
				this.root_node.append_child(node);
				node.start(new TimeoutTarget(this, this.init, 'not ready AutoBuyState.update'));
				return;
			}
			this.avg=new AverageRatioRoot;
			this.val=totalAtome/atomepersecond;
			let rep_val=this.val/(100*4*prestige);
			if(Number.isFinite(rep_val)){
				for(let i=0;i<8;i++){
					this.arr.push(rep_val*.75);
				}
			}else{
				rep_val=0.75;
			}
			let ratio_names=['10sec', '1min', '5min', '30min', '3hour'];
			let ratio_counts=[80, 6, 5, 6, 6];
			let ratio_mul=[0, .65, .15, .15, .05];
			let ratio_human=["10 seconds","1 minute","5 minutes", "30 minutes", "3 hours"];
			function mul_3(arr, i){
				let [a, b=1, c=10]=arr.slice(i);
				return a * b * c;
			}
			//@AverageRatio
			function create_ratio(i){
				return new AverageRatio(ratio_counts[i], mul_3(ratio_counts, i), ratio_mul[i], ratio_human[i], [rep_val]);
			}
			for(let i=0;i<5;i++){
				let obj=create_ratio(i);
				this.avg.push_ratio([ratio_names[i], obj]);
			}
			this.prev_atomepersecond=atomepersecond;
			this.is_init_complete=true;
		}
		calc_ratio(){
			if(this.avg.can_average('30min'))return this.avg.get_average('30min');
			if(this.avg.can_average('5min'))return this.avg.get_average('5min');
			if(this.avg.can_average('1min'))return this.avg.get_average('1min');
			if(this.avg.can_average('10sec'))return this.avg.get_average('10sec');
			return 0;
		}
		append_value(value) {
			if(!Number.isFinite(value)){
				console.assert(false, 'value is not finite');
			}
			this.arr.unshift(value);
			this.avg.push(value);
			while(this.arr.length > this.arr_max_len) {
				this.arr.pop();
			}
			let new_ratio=this.calc_ratio();
			if(!Number.isFinite(new_ratio)){
				console.assert(false, 'ratio result is not finite');
			}
			this.ratio=new_ratio;
		}
		update_ratio_mode(){
			switch(this.ratio_mode){
				case 0:if(this.ratio>.4)this.do_ratio_lock(1, 80*12);break;
				case 1:
					if(this.ratio < .35)this.do_ratio_lock(-1, 80*3);
					if(this.ratio > .60)this.do_ratio_lock(1, 80*12);break;
				case 2:
					if(this.ratio < .45)this.do_ratio_lock(-1, 80*3);
					if(this.ratio > .85)this.do_ratio_lock(1, 80*12);break;
				case 3:
					if(this.ratio < .9)this.do_ratio_lock(-1, 80*3);
					if(this.ratio > 1.5)this.on_very_high_ratio();break;
				default:
					if(this.ratio < .9)this.do_ratio_lock(-1, 80*6);
					if(this.ratio > 1.5)this.on_very_high_ratio(2);break;
			}
		}
		do_ratio_lock(mode_change_direction, num_of_cycles){
			this.ratio_mode+=mode_change_direction;
			this.locked_cycles=num_of_cycles;
		}
		on_very_high_ratio(mul=1){
			console.log('high ratio', this.ratio_mode, mul, (~~(this.ratio*100))/100);
			this.do_ratio_lock(1, 80*12 * mul);
		}
		get_mul_modifier(){
			switch(this.ratio_mode){
				case 0:return 3;
				case 1:return 2;
				case 2:return 1.5;
				case 3:return 1;
				default:return 0.4;
			}
		}
		get_near_val(){
			let log_val=this.avg.get_average('5min');
			let log_mul_count=0;
			if(log_val < 0.01 || log_val > 1){
				while(log_val < 0.1){
					log_val*=10;
					log_mul_count--;
				}
				while(log_val > 1){
					log_val/=10;
					log_mul_count++;
				}
			}
			return [log_val, log_mul_count];
		}
		cycle_log(){
			let [num, exponent]=this.get_near_val();
			console.log('ratio cycle lock %se%o %s%o %s%o', (~~(num*1000))/1000, exponent, 'mode=', this.ratio_mode, 'cc=', this.locked_cycles);
		}
		update() {
			if(typeof prestige=='undefined'){
				console.log('fail', this.div, atomepersecond, totalAtome);
				let node=new AsyncTimeoutNode(80);
				this.root_node.append_child(node);
				node.start(new TimeoutTarget(this, this.update, 'not ready AutoBuyState.update'));
				return;
			}
			this.ratio_mult=prestige;
			this.div=60*this.ratio_mult*8;
			this.val=totalAtome/atomepersecond/this.div;
			if(!Number.isFinite(this.val)){
				this.val=1;
				console.log('fail', this.div, atomepersecond, totalAtome);
				let node=new AsyncTimeoutNode(80);
				this.root_node.append_child(node);
				node.start(new TimeoutTarget(this, this.update, 'not ready AutoBuyState.update'));
				return;
			}
			this.val*=this.get_mul_modifier();
			this.append_value(this.val);
			if(this.locked_cycles > 0){
				this.locked_cycles--;
			}else{
				this.update_ratio_mode();
				if(this.locked_cycles > 0)this.cycle_log();
			}
		}
		reset(){
			this.ratio*=0.75;
			for(var i=0;i<this.arr.length;i++){
				this.arr[i]*=0.75;
			}
		}
	}
	class MiniDom{
		constructor(elements){
		}
		build_dom(){
		}
	}
	const debug_id_gen=new UniqueIdGenerator;
	/**@type {WeakRef<number>}*/
	const debug_id_syms=[];
	function next_debug_id(){
		const id=debug_id_gen.next();
		const sym=Symbol(id);
		debug_id_syms.push(new WeakRef({sym}));
		return sym;
	}
	class AbstractBox {
		constructor(){
			this.type='AbstractBox';
			this.value=null;
		}
	}
	class DomValueBox {
		constructor(from, value){
			this.type='DomValueBox';
			this.from=from;
			this.value=value;
		}

	}
	class DomBuilderVM extends BaseStackVM {
		constructor(instructions) {
			super(instructions);
			this.exec_stack=[];
			this.jump_instruction_pointer=null;
		}
		execute_instruction_raw(cur_opcode, operands){
			l_log_if(LOG_LEVEL_VERBOSE, cur_opcode, ...operands, null);
			switch(cur_opcode) {
				case 'exec':{
					this.exec_stack.push([this.stack, this.instructions]);
					let base_ptr=this.stack.length;
					// advance the instruction pointer, when we return we want to resume
					// at the next instruction...
					this.instruction_pointer++;
					this.stack.push(this.instruction_pointer, base_ptr);
					this.stack=[];
					this.instructions=operands[0];
					this.jump_instruction_pointer=0;
					l_log_if(LOG_LEVEL_VERBOSE, 'exec', ...operands[0]);
				} break;
				case 'peek':{
					let [op_1, op_2]=operands;
					let peek_stack=this.exec_stack[op_1][0];
					let base_ptr=peek_stack.at(-1);
					let at=peek_stack[base_ptr - op_2 - 1];
					this.push(at);
					l_log_if(LOG_LEVEL_VERBOSE, 'peek, pushed value', at, op_2, 'base ptr', base_ptr, 'ex_stack', op_1);
				} break;
				case 'append':{
					if(this.stack.length <= 0){
						throw new Error('stack underflow');
					}
					let target=this.pop();
					if(this.stack.length <= 0){
						throw new Error('stack underflow');
					}
					let child_to_append=this.pop();
					if(!target.type){
						throw new Error("target element is invalid (wrong type)");
					}
					let target_element=this.unbox_dom_value(target);
					if(target.from !== 'get'){
						console.log('dom_from', target.from);
						throw new Error("target element is invalid (from is not 'get')");
					}
					let child_to_append_element=this.unbox_dom_value(child_to_append);
					target_element.appendChild(child_to_append_element);
					l_log_if(LOG_LEVEL_VERBOSE, 'append to dom', [target, child_to_append]);
				} break;
				default/*Debug*/:super.execute_instruction_raw(cur_opcode, operands);break;
			}
		}
		unbox_dom_value(box){
			if(box.type===void 0)throw new Error("Invalid Box (no type)");
			if(box.type != 'DomValueBox')throw new Error("Unbox failed not a DomValueBox");
			if(typeof box.from == 'string')throw new Error("Unbox failed Box.from is not a string");
			if(typeof box.value != 'object')throw new Error("Unbox failed: Box is not boxing an object");
			return box.value;
		}
		run() {
			this.running = true;
			while(this.instruction_pointer < this.instructions.length && this.running) {
				let instruction = this.instructions[this.instruction_pointer];
				let [cur_opcode, ...operands] = instruction;
				this.execute_instruction_raw(cur_opcode, operands);
				if(this.jump_instruction_pointer != null){
					this.instruction_pointer=this.jump_instruction_pointer;
					this.jump_instruction_pointer=null;
				}else{
					this.instruction_pointer++;
				}
				if(this.instruction_pointer >= this.instructions.length){
					if(this.exec_stack.length > 0){
						[this.stack, this.instructions]=this.exec_stack.pop();
						let base_ptr=this.stack.pop();
						this.instruction_pointer=this.stack.pop();
						l_log_if(LOG_LEVEL_VERBOSE, 'returned to', this.instruction_pointer, this.exec_stack.length);
						continue;
					}
					l_log_if(LOG_LEVEL_VERBOSE, 'reached end of instruction stream, nothing to return too', instruction, this.instructions, this.instruction_pointer);
				}
			}
			console.assert(this.stack.length === 0, "stack length is not zero, unhandled data on stack");
			return this.return_value;
		}
	}
	class DataLoader {
		//spell:words externref
		static int_parser=new WebAssembly.Function({parameters:['externref'], results:['f64']}, parseInt);
		constructor(storage) {
			this.store=storage;
			this.null_sym=Symbol('null');
		}
		load_str_arr(key, def_value){
			let data=this.store.getItem(key);
			if(data === null)return this.create_default(def_value);
			return data.split(",");
		}
		load_int_arr(key, def_value){
			let storage_data=this.store.getItem(key);
			if(storage_data === null)return this.create_default(def_value);
			return this.parse_int_arr(storage_data);
		}
		parse_int=DataLoader.int_parser;
		default_split(string){
			return string.split(",");
		}
		parse_int_arr(data){
			return this.default_split(data).map(DataLoader.int_parser);
		}
		create_default(value_or_factory){
			let value=this.null_sym;
			if(typeof value_or_factory === 'function'){
				// this is a value factory
				return value_or_factory();
			}
			let cc=Object.getPrototypeOf(value_or_factory).constructor;
			try{
				// get it as an object, the convert back to unboxed if possible
				value=(new cc(value_or_factory)).valueOf();
			}catch{}
			if(value === this.null_sym) {
				// none of them worked, it is a default value that you can't construct and call valueOf on
				return value_or_factory;
			}
			return value;
		}
	}
	class AutoBuy {
		async_compress(){
			this.state_history_arr=this.compressor.compress_array(this.state_history_arr);
		}
		constructor(){
			this.root_node=new AsyncNodeRoot;
			this.extra=0;this.iter_count=0;this.epoch_len=0;
			this.background_audio=null;this.state_history_arr=null;
			this.skip_save=false;
			this.cint_arr=[];
			this.local_data_loader=new DataLoader(localStorage);
			this.state=new AutoBuyState(this.root_node);
			this.debug=this.state.debug;
			this.compressor=new MulCompression;
			this.state_history_arr=this.local_data_loader.load_str_arr('auto_buy_history_str', ["S"]);
			this.epoch_start_time=Date.now();
			this.original_map=new Map;
			this.dom_map=new Map;
			this.debug_arr=[];
			for(let i=0;i<debug_id_syms.length;i++){
				let val=debug_id_syms[i].deref();
				if(val && this[val.sym]){
					this.debug_arr.push(...this[val.sym].split(",").map(e=>e.trim()));
				}
			}
			this.timeout_arr=this.local_data_loader.load_int_arr('auto_buy_timeout_str', e=>{
				let src=[300];
				src.length=16;
				let data_len=1;
				while(src.at(-1) != src[0]){
					src.copyWithin(data_len);
					data_len*=2;
				}
			});
		}
		pre_init(){
			// find elements; find background_audio by id
			this.background_audio=document.querySelector("#background_audio");
			// change the audio element's volume, and remove
			// the event listener that will change the volume
			this.background_audio.onloadeddata=null;
			this.background_audio.volume=AUDIO_ELEMENT_VOLUME;
			this.async_pre_init().then(()=>{
				console.log('pre_init done');
			});
			this.dom_pre_init();
		}
		async async_pre_init(){
			try{
				await this.background_audio.play();
				return;
			}catch(e){
				console.log("failed to play `#background_audio`, page was loaded without a user interaction(reload from devtools or F5 too)");
			}
			let instructions=SimpleStackVMParser.parse_instruction_stream_from_string(`
			this;push,target_obj;get;push,background_audio;get;push,play;
				call,int(2);
					push,then;
					push,%o;push,%o;
					call,int(2);
				// comments work
				/*-2 +1 multiline too, (not split across lines yet)*/
			drop;
			global;push,removeEventListener;push,click;this;
				call,int(2);
			drop
			`, [function(){console.log('play success')}, function(err){console.log(err)}]);
			let handler=new EventHandlerVMDispatch(instructions, this);
			globalThis.addEventListener('click', handler);
		}
		save_state_history_arr(){
			if(this.skip_save)return;
			localStorage.auto_buy_history_str=this.state_history_arr.join(",");
		}
		get_timeout_arr_data(forced_action){
			if(forced_action == "RESET")return this.timeout_arr.map(e=>~~(e/4)).join(",");
			return this.timeout_arr.join(",");
		}
		save_timeout_arr(){
			let forced_action, action_count;
			let action_data=localStorage.auto_buy_forced_action;
			if(action_data)[forced_action, action_count]=action_data.split(",");
			localStorage.auto_buy_timeout_str=this.get_timeout_arr_data(forced_action);
			if(action_count !== void 0){
				action_count=parseInt(action_count);
				if(Number.isFinite(action_count)){
					if(action_count > 0){
						localStorage.auto_buy_forced_action=[forced_action, action_count-1];
					}else if(forced_action !== "NONE"){
						localStorage.auto_buy_forced_action="NONE,0";
					}
				}
			}
		}
		dom_pre_init(){
			const css_display_style=`
			#state_log>div{width:max-content}
			#state_log{top:0px;width:30px;position:fixed;z-index:101;font-family:monospace;font-size:22px;color:lightgray}`;
			function style_sheet_gen(instance, args){
				instance.replace(args[0]);
			}
			this.display_style_sheet = new CSSStyleSheet;
			this.display_style_sheet.replace(css_display_style);
			// dom element init; init history_element
			this.history_element=document.createElement("div");
			this.history_element.innerText="?3";
			// init timeout_element
			this.timeout_element=document.createElement("div");
			this.timeout_element.innerText="0";
			// init hours_played_element
			this.hours_played_element=document.createElement("div");
			this.hours_played_element.innerText="0.00000 hours";
			// init percent_ratio_element
			this.percent_ratio_element=document.createElement("div");
			this.percent_ratio_element.innerText=0..toFixed(2)+"%";
			// init percent_ratio_change_element
			this.percent_ratio_change_element=document.createElement("div");
			this.percent_ratio_change_element.innerText=0..toExponential(3);
			// init state_log_element
			this.state_log_element=document.createElement("div");
			this.state_log_element.id="state_log";
			// dom element attach
			// attach history_element
			this.state_log_element.append(this.history_element);
			// attach timeout_element
			this.state_log_element.append(this.timeout_element);
			// attach hours_played_element
			this.state_log_element.append(this.hours_played_element);
			// attach percent_ratio_element
			this.state_log_element.append(this.percent_ratio_element);
			// attach percent_ratio_change_element
			this.state_log_element.append(this.percent_ratio_change_element);
			// attach state_log_element
			document.body.append(this.state_log_element);
			// attach display_style_sheet
			this.adopt_styles(this.display_style_sheet);
			let create_state_log_arr=[
				[0, 'get', 'body'],
				[1, 'create', 'div', 'state_log', {id:'state_log'}], [1, 'append'],
			]
			let call_arg_arr=[];
			let make_css_arr=[
				[0, 'push', null, (...styles_promise_arr)=>{
					// @Hack: wait for any promise to settle
					return Promise.allSettled(styles_promise_arr).then(e=>{
						let res=e.filter(e=>e.status==='fulfilled').map(e=>e.value);
						this.adopt_styles(...res);
						let err=e.filter(e=>e.status!='fulfilled');
						if(err.length > 0)console.log('promise failure...', ...err);
					});
				}, ...call_arg_arr],
				[0, 'new', CSSStyleSheet, [],
				 (obj, str)=>obj.replace(str),
				 [css_display_style]
				],
				[0, 'call', 2 + 1 + call_arg_arr.length],
				// drop the promise
				[0, 'drop'],
			];
			let raw_dom_arr=[
				...create_state_log_arr,
				[2, 'create', 'div', 'history', "?3"], [2, 'append'],
				[2, 'create', 'div', 'delay', "0"], [2, 'append'],
				[2, 'create', 'div', 'hours_played', "0.000 hours"], [2, 'append'],
				[2, 'create', 'div', 'ratio', 0..toFixed(2)+"%"], [2, 'append'],
				[2, 'create', 'div', 'ratio_change', 0..toExponential(3)], [2, 'append'],
				[1, 'drop'],
				[0, 'drop'],
				...make_css_arr
			];
			try{
				raw_dom_arr=[
					...create_state_log_arr,
					[0, 'drop'],
					...make_css_arr
				];
				this.build_dom_from_desc(raw_dom_arr, this.dom_map);
			}catch(e){
				console.log(e);
			};
		}
		adopt_styles(...styles){
			let dom_styles=document.adoptedStyleSheets;
			document.adoptedStyleSheets = [...dom_styles, ...styles];
		}
		build_dom_from_desc(raw_arr, trg_map=new Map, dry_run=false) {
			let stack=[];
			let map=trg_map;
			if(dry_run)stack.push([0, "enable_dry_mode"]);
			for(let i=0;i<raw_arr.length;i++) {
				let cur_item=raw_arr[i];
				let [depth, action, ...args] = cur_item;
				switch(action){
					case 'get':{
						let cur_element, [query_arg]=args;
						switch(query_arg){
							case 'body':cur_element=document.body;break;
							default:cur_element=document.querySelector(query_arg);break;
						}
						stack.push([depth, "push", new DomValueBox('get', cur_element)]);
					} break;
					case 'new':{
						const [_class, construct_arg_arr, callback, arg_arr]=args;
						stack.push([depth, "push", null, callback, ...construct_arg_arr, _class]);
						stack.push([depth, "construct", 1 + construct_arg_arr.length]);
						stack.push([depth, "push", ...arg_arr]);
						stack.push([depth, "call", 3 + arg_arr.length]);
					} break;
					case 'create':{
						const [element_type, name, content] = args;
						let cur_element=document.createElement(element_type);
						if(typeof content == 'string'){
							cur_element.innerText=content;
						} else if(typeof content == 'object'){
							if(content.id)cur_element.id=content.id;
						} else {
							console.log('bad typeof == %s for content in build_dom; content=%o', typeof content, content);
							console.info("Info: case 'create' args are", element_type, name);
						}
						map.set(name, cur_element);
						stack.push([depth, "push", new DomValueBox('create', cur_element)]);
					} break;
					case 'append':{
						// peek at the return stack, up 1 depth
						stack.push([depth, "peek", depth-1, 0]);
						stack.push(cur_item);
					} break;
					case 'drop':
					case 'call':// push the item
					case 'push':stack.push(cur_item);break;
					default:{
						console.log('might need to handle', action);
						debugger;
					} break;
				}
				if(this.debug_arr.includes('build_dom_from_desc'))console.log('es', stack.at(-1));
			}
			let [left_stack, tree]=this.parse_dom_desc(stack);
			if(left_stack.length > 0){
				console.assert(false, 'failed to parse everything (parse tree probably has errors)');
			}
			this.apply_dom_desc(tree);
		}
		parse_dom_desc(input_stack){
			let stack=[];
			let tree=[];
			for(let x=0,i=0;i<input_stack.length;i++){
				let cur_stack=input_stack[i];
				let [y, ...item]=cur_stack;
				if(this.debug_arr.includes('parse_dom_desc'))console.log(item);
				while(y > x){
					stack.push(tree);
					tree=[];
					x++;
				}
				while(y < x){
					let prev=tree;
					tree=stack.pop();
					tree.push([x, prev]);
					x--;
				}
				tree.push([y, item]);
			}
			return [stack, tree];
		}
		log_if(tag, ...log_args){
			if(this.debug_arr.includes(tag)){
				console.log(...log_args);
			}
		}
		get_logging_level(tag, level=LOG_LEVEL_VERBOSE){
			if(this.debug_arr.includes(tag)){
				return level-1;
			}
			return level;
		}
		/* 		get [next_debug_id()](){
			return 'apply_dom_desc';
		} */
		apply_dom_desc(tree) {
			this.run_dom_desc(tree);
		}
		run_dom_desc(tree, stack=[], cur_depth=0, items=[], depths=[]){
			for(let i=0;i<tree.length;i++){
				let cur=tree[i];
				switch(cur[0] - cur_depth){
					case 1:{
						this.log_if('apply_dom_desc', 'rdc stk');
						stack.push(['children', items.length-1, cur]);
					} break;
					case 0:{
						items.push(cur[1]);
						depths.push(cur[0]);
					} break;
					default:{
						console.assert(false, 'handle depth change in apply_dom_desc');
						this.log_if('apply_dom_desc', cur[0] - cur_depth);
					}
				}
			}
			if(stack.length === 0)return [items, depths];
			let tag, data, items_index;
			{
				let data_depth;
				[tag, items_index, [data_depth, data]] = stack.pop();
				let log_level=this.get_logging_level('apply_dom_desc');
				l_log_if(log_level, tag, items[items_index], data_depth, data);
			}
			let deep_res=this.run_dom_desc(data, stack, cur_depth+1);
			const ret_items=items.slice();
			let off=1;
			ret_items.splice(items_index + off++, 0, ['exec', deep_res[0]]);
			this.log_if('apply_dom_desc', deep_res[0], deep_res[1]);
			this.log_if('apply_dom_desc', ret_items, depths, stack);
			let builder_vm=new DomBuilderVM(ret_items);
			builder_vm.run();
			return [ret_items, depths];
		}
		init_dom(){
			const font_size_px=22;
			let t=this;
			// general init
			this.state_history_arr_max_len=Math.floor(document.body.getClientRects()[0].width/(font_size_px*0.55)/2.1);
			// dom element init; init history_element
			this.history_element.addEventListener('click', new EventHandlerDispatch(this, 'history_element_click_handler'));
			// init timeout_element
			this.timeout_element.innerText=this.timeout_arr[0];
			// init hours_played_element; init percent_ratio_element
			this.percent_ratio_element.addEventListener('click', function(){
				t.state.reset();
			});
			// init percent_ratio_change_element; init state_log_element
			this.state_log_element.style.fontSize = font_size_px+"px";
			// event listeners; window unload
			window.addEventListener('unload', function(){
				t.save_state_history_arr();
				t.save_timeout_arr();
			});
		}
		global_init(){
			if(window.g_auto_buy && window.g_auto_buy!==this){
				window.g_auto_buy.destroy();
			}
			window.g_auto_buy=this;
		}
		destroy(){
			this.root_node.destroy();
			for(let i=0;i<this.cint_arr.length;i+=2){
				let cint_item=this.cint_arr[i];
				switch(cint_item[0]){
					case 1:{
						clearTimeout(cint_item[1]);
					}break;
					case 2:{
						clearInterval(cint_item[1]);
					}break;
					default:{
						console.assert(false, 'cant destroy cint item (%o)', cint_item);
					}break;
				}
			}
		}
		update_dom(){
			// spell:words timeplayed
			this.hours_played_element.innerText=((timeplayed / 30) / 60).toFixed(7) + " hours";
			let last_ratio=this.state.ratio*100;
			this.state.update();
			let cur_ratio=this.state.ratio*100;
			this.percent_ratio_element.innerText=cur_ratio.toFixed(2)+"%";
			let ratio_diff=cur_ratio-last_ratio;
			let extra_diff_char="+";
			if(ratio_diff < 0)extra_diff_char='';
			this.percent_ratio_change_element.innerText=extra_diff_char+ratio_diff.toExponential(3);
			this.history_element.innerText=array_sample_end(this.state_history_arr, this.state_history_arr_max_len).join(" ");
			this.next_timeout(this.update_dom, 125, 'update_dom', true);
		}
		init(){
			this.next_timeout(this.init_impl, 200, 'init', true);
		}
		dom_reset() {
			this.update_dom();
		}
		replace_timeplayed_timer(){
			//spell:words secondinterval
			clearInterval(window.secondinterval);
			let rate = 66 / 2000;
			let time_base=performance.now();
			window.secondinterval = setInterval(function() {
				let real_time=performance.now();
				let time_diff=real_time-time_base;
				time_base=real_time;
				let real_rate=time_diff / 2000;
				timeplayed += real_rate;
			}, 66);
			this.root_node.append_raw(setInterval(function(){
				doc.title = rounding(totalAtome, false,1).toString() + " atoms";
				//spell:words atomsaccu presnbr
				doc.getElementById('atomsaccu').innerHTML = rounding(atomsaccu, false,0);
				doc.getElementById('timeplayed').innerHTML = (Math.round(timeplayed / 30) / 60).toFixed(2) + " hours";
				doc.getElementById('presnbr').innerHTML = "<br>" + (calcPres() * 100).toFixed(0) + " % APS boost";
			}, 2000), false);
		}
		init_impl() {
			let t=this;
			this.global_init();
			this.init_dom();
			this.state.init();
			this.update_dom();
			this.main();
			this.original_map.set('lightreset', lightreset);
			window.lightreset=lightreset_inject;
			window.specialclick=specialclick_inject;
			if(window.secondinterval){
				this.replace_timeplayed_timer();
			}
		}
		state_history_clear_for_reset(){
			this.state_history_arr=["R"];
			localStorage.auto_buy_history_str="R";
		}
		state_history_append(value, silent=false){
			Promise.resolve().then(this.async_compress.bind(this));
			this.epoch_len++;
			if(silent)return;
			let last=this.state_history_arr.at(-1);
			this.state_history_arr.push(value);
			if(this.state.debug)console.log('history append', last, value);
			while(this.state_history_arr.length>120)this.state_history_arr.shift();
		}
		history_element_click_handler(event){
			this.root_node.destroy();
			this.dom_reset();
			this.reset();
		}
		reset(){
			let timeout=3000;
			if(this.extra < timeout)timeout=this.extra;
			this.next_timeout(this.main, timeout, '@');
		}
		calc_timeout_extra() {
			while(this.timeout_arr.length>60)this.timeout_arr.shift();
			let max=0;
			let total=0;
			for(var i=0;i<this.timeout_arr.length;i++){
				total+=this.timeout_arr[i];
				max=Math.max(this.timeout_arr[i], max);
			};
			const val=total / this.timeout_arr.length;
			let num=max / val;
			this.last_value??=num;
			let diff=this.last_value-num;
			if(diff > .1 || diff < -.1){
				this.last_value=num;
				console.log('timeout_arr num', num, 'differing from last by', diff);
			}
			return this.round(val);
		}
		is_epoch_over(){
			let epoch_diff=Date.now() - this.epoch_start_time;
			return epoch_diff > 60*5*1000;
		}
		main(){
			function r(v){
				return ~~v;
			}
			let loss_rate=this.unit_promote_start();
			if(loss_rate > 0 || loss_rate < 0){
				console.log('loss', r(loss_rate*100 * 10)/10);
			}
			if(this.maybe_run_reset())return;
			if(this.pre_total != totalAtome)return this.step_iter_start();
			this.iter_count=0;
			if(Math.random()<0.005)return this.rare_begin();
			this.faster_timeout();
		}
		async maybe_async_reset(){
			let loss_rate=this.unit_promote_start();
			if(this.maybe_run_reset())return [true, loss_rate];
			return [false, loss_rate];
		}
		async main_async(){
			for(this.iter_count=0;;) {
				if(this.iter_count<6) await this.normal_decrease_async();
				else await this.large_decrease_async();
				let [quit, loss_rate]=this.maybe_async_reset();
				if(quit)return;
				if(loss_rate > 0.08)continue;
				if(this.pre_total == totalAtome)break;
			}
			if(Math.random()<0.005)this.rare_begin();
			else this.faster_timeout_use_async();
		}
		step_iter_start(){
			if(this.iter_count>6)return this.large_decrease();
			else return this.normal_decrease();
		}
		async fast_unit(){
			let running=true;
			while(running) {
				this.unit_promote_start();
				if(this.pre_total == totalAtome) break;
				let promise=this.async_timeout_step();
				await promise;
			}
			this.async_timeout_step_finish();
		}
		unit_promote_start(){
			this.extra=this.calc_timeout_extra();
			this.pre_total=totalAtome;
			this.do_unit_promote();
			let money_diff=this.pre_total-totalAtome;
			let loss_rate=money_diff/this.pre_total;
			if(this.pre_total != totalAtome && this.debug){
				let log_args=[];
				let percent_change=(loss_rate*100).toFixed(5);
				let money_str=totalAtome.toExponential(3);
				log_args.push(this.iter_count);
				log_args.push(percent_change);
				log_args.push(money_str);
				console.log(...log_args);
			}
			this.iter_count+=1;
			return loss_rate;
		}
		async async_next_timeout_step(){
			this.do_timeout_dec([1.006], 10);
			return this.next_timeout_async(this.extra, ':');
		}
		async_timeout_step_finish(){
			this.do_timeout_dec([1.006], 10);
			this.next_timeout(this.main, this.extra, '$');
		}
		large_decrease(){
			this.do_timeout_dec([1.008], 10);
			this.next_timeout(this.main, this.extra, '!');
		}
		normal_decrease(){
			this.do_timeout_dec([1.006], 10);
			this.next_timeout(this.main, this.extra, '-');
		}
		rare_begin(){
			this.do_timeout_inc([1.008, 1.03], 10);
			this.next_timeout(this.initial_special, this.extra, '<');
		}
		faster_timeout_use_async(){
			this.do_timeout_inc([1.007, 1.01], 50);
			this.next_timeout(this.main_async, this.extra, 'A');
		}
		faster_timeout(){
			this.do_timeout_inc([1.007, 1.01], 50);
			this.next_timeout(this.main, this.extra, '+');
		}
		get_timeout_change(pow_base, pow_num, div){
			let pow_res=Math.pow(pow_base, pow_num);
			let res=this.extra * pow_res;
			return res / div;
		}
		update_timeout_inc(change){
			if(window.__testing__){
				return;
			}
			let value=this.round(this.extra + change);
			this.timeout_arr.push(value);
		}
		update_timeout_dec(change){
			if(window.__testing__){
				return;
			}
			let value=this.round(this.extra - change);
			if(value < 25)value=25;
			this.timeout_arr.push(value);
		}
		round(value){
			return ~~value;
		}
		do_timeout_dec(pow_terms, div){
			let change=this.get_timeout_change(pow_terms[0], Math.log(totalAtome), div);
			this.update_timeout_dec(change);
		}
		do_timeout_inc(pow_terms, div){
			let iter_term=Math.pow(pow_terms[1], this.iter_count);
			let change=this.get_timeout_change(pow_terms[0], Math.log(totalAtome), div);
			this.update_timeout_inc(change * iter_term);
		}
		async next_timeout_async(timeout, char, silent=false){
			if(!silent && this.timeout_element)this.timeout_element.innerText=timeout;
			this.state_history_append(char, silent);
			let node=new AsyncTimeoutNode(timeout);
			this.root_node.append_child(node);
			let promise=node.start_async(new AsyncTimeoutTarget(char));
			await promise;
		}
		next_timeout(trg_fn, timeout, char, silent=false){
			let node=new AsyncTimeoutNode(timeout);
			this.root_node.append_child(node);
			node.start(new TimeoutTarget(this, trg_fn, char));
			if(!silent && this.timeout_element)this.timeout_element.innerText=timeout;
			this.state_history_append(char, silent);
		}
		do_unit_promote(){
			do_auto_unit_promote();
		}
		slow_final(){
			this.next_timeout(this.main, this.extra, '$');
		}
		bonus(){
			bonusAll();
			this.fast_unit();
		}
		special_timeout(){
			this.next_timeout(this.special, this.extra, '^');
		}
		is_special_done(special_buyable){
			return !special_buyable.done && special_buyable.cost < totalAtome;
		}
		next_special(){
			return allspec.findIndex(this.is_special_done);
		}
		do_special(){
			let ret=false;
			for(let index=this.next_special();;index=this.next_special()){
				if(index > -1){
					window.specialclick(index);
					ret=true;
				} else break;
			}
			return ret;
		}
		special(){
			if(this.do_special())this.next_timeout(this.special, this.extra, '^');
			else this.next_timeout(this.bonus, this.extra, '#');
		}
		initial_special(){
			this.next_timeout(this.special, this.extra, '>');
		}
		maybe_run_reset(){
			let count=0;
			count+=this.extra > 15*1000;
			count+=this.state.ratio > 1;
			count+=this.is_epoch_over();
			switch(count){
				case 0:
				case 1:break;
				default:console.log('mrc', count);
			}
			if(this.state.ratio > 1 && this.is_epoch_over() || this.extra > 15*1000){
				this.next_timeout(this.reset_timeout_trigger, 5*1000, 'reset_timeout_begin');
				return true;
			}
			return false;
		}
		reset_timeout_init(){
			this.background_audio.muted=!this.background_audio.muted;
			this.next_timeout(this.reset_timeout_trigger, 60*2*1000, 'reset_timeout');
		}
		reset_timeout_trigger(){
			this.background_audio.muted=!this.background_audio.muted;
			this.next_timeout(this.reset_timeout_start, 60*2*1000, 'reset_timeout');
		}
		reset_timeout_start(){
			this.next_timeout(this.reset_timeout_run, 60*1000, 'reset_timeout');
		}
		reset_timeout_run(){
			window.lightreset();
		}
	}
	function do_auto_unit_promote(){
		var out=[],maxed=[];
		for(var k=0;k<arUnit.length;k++){
			var afford=false;
			if(arUnit[k][16]==true||k==0){
				var type=Get_Unit_Type(k);
				var tmp=getUnitPromoCost(k);
				var cost=tmp;
				var next=Find_ToNext(k);
				if(next < 0){maxed[k]=true};
				for(var i=1;i<=100;i++){
					if(totalAtome>=cost){
						tmp=tmp+(tmp*arUnit[k][3])/100;
						var tar=(arUnit[k][4]*1)+i;
						var a=_targets.indexOf(tar);
						var reduction=1;
						if(a>-1&&tar<=1000){
							var b=true;
							for(var k2 in type[2]){
								var v2=type[2][k2]
								if(v2!=k&&arUnit[v2][4]<tar){
									b=false;
								}
							}
							if(b){
								var c=_targets_achi.indexOf(totalAchi()+1);
								if(c>-1){
									reduction*=(1-((c+1)*0.01));
								}
								reduction*=1-((a+1)*0.01);
							}
						}
						tmp*=reduction;
						cost+=tmp;
					}else{
						break
					}
					if(i==next||(maxed[k]&&i==100)){
						afford=true;
					}
				}
				if(afford){
					out[k]=true;
				}else{
					out[k]=false;
				}
			}
		}
		res=out.lastIndexOf(true);
		if(res<0)return;
		if(maxed[res]){
			for(var y=0;y<100;y++){
				mainCalc(res);
			}
		}else{
			tonext(res);
		}
	}
	const auto_buy_obj=new AutoBuy;
	class AsyncTrigger{
		constructor(){
			let t=this;
			t.m_set_flag=true;
			t.trigger_handler=null;
			this.promise_set=new Promise(function(accept, reject){
				t.m_set=accept;
				t.m_set_error=reject;
				t.m_set_flag=false;
			});
		}
		set(cnt){
			if(!this.m_set_flag){
				this.m_set(cnt);
				this.m_set_flag=true;
			}
		}
		set_error(opt_error){
			if(!this.m_set_flag){
				if(opt_error) this.m_set_error(opt_error);
				else this.m_set_error(null);
			}
		}
		async wait(){
			let ret=this.promise_set;
			return ret;
		}
		notify(cnt){
			if(this.m_can_notify){
				this.m_notify(cnt);
				this.m_can_notify=false;
			}
		}
		notify_error(error){
			if(this.m_can_notify){
				this.m_notify_error(error);
				this.m_can_notify=false;
			}
		}
		async notified(){
			let t=this;
			this.notify_promise=new Promise(function(accept, reject){
				t.m_notify=accept;
				t.m_notify_error=reject;
			});
			this.m_can_notify=true;
		}
	}
	class AsyncSemaphore{
		constructor(){
			this.notify_waiters_vec=[];
			this.count=0;
		}
		async inc(cnt){
			let wait_trigger=new AsyncTrigger;
			while(this.count > 0){
				if(!this.notify_waiters_vec.includes(wait_trigger)){
					this.notify_waiters_vec.push(wait_trigger);
				}
				await wait_trigger.wait();
				wait_trigger.notify(cnt);
			}
			this.count+=cnt;
		}
		async dec(cnt){
			this.count-=cnt;
			if(this.count <= 0){
				do{
					let waiter=this.notify_waiters_vec.shift();
					if(!waiter)break;
					waiter.set(cnt);
					let used_count=await waiter.notified();
					cnt-=used_count;
				} while(cnt > 0);
			}
		}
	}
	function map_to_tuple(e, i){
		return [e, this[i]];
	}
	function to_tuple_arr(keys, values){
		return keys.map(map_to_tuple, values);
	}
	function promise_set_timeout(timeout, a){
		setTimeout(a, timeout);
	}
	function do_async_wait(timeout){
		return new Promise(promise_set_timeout.bind(null, timeout));
	}
	void do_async_wait;
	function array_sample_end(arr, rem_target_len){
		arr=arr.slice(-300);
		let rem_len=char_len_of(arr);
		while(rem_len > rem_target_len) {
			rem_len-=arr.shift().length+1;
		}
		return arr;
	}
	function char_len_of(arr){
		return arr.reduce((a,b)=>a + b.length, 0) + arr.length;
	}
	function lightreset_inject(){
		g_auto_buy.state_history_clear_for_reset();
		g_auto_buy.skip_save=true;
		window.addEventListener('unload', function(){
			g_auto_buy.skip_save=false;
			localStorage.auto_buy_timeout_str="300,300,300,300";
			localStorage.long_wait=12000;
		});
		let original=g_auto_buy.original_map.get('lightreset');
		original();
	}
	function specialclick_inject(that) {
		if (allspec[that].done == undefined) allspec[that].done = false;
		if (allspec[that].cost <= totalAtome && allspec[that].done == false) {
			doc.getElementById('specialsbought').innerText = rounding(++specialsbought, false,0);
			if (that == 74) {
			}
			atomsinvest += allspec[that].cost;
			doc.getElementById('atomsinvest').innerText = rounding(atomsinvest, false,0);
			allspec[that].done = true;
			totalAtome -= allspec[that].cost;
			var diff1 = calcDiff(that);
			for (var a in arUnit[that][17]) arUnit[that][17][a] *= 100;
			arUnit[that][5] *= 100;
			var spec_aps = 0;
			if (arUnit[that][4] > 0) {
				spec_aps = (calcDiff(that) - diff1);
				atomepersecond += spec_aps;
			}
			//spell:ignore noti plurials
			if (noti) gritter('Power-up !', toTitleCase(plurials(arrayNames[that])) + " X100 APS", null, "+" + rounding(spec_aps, false,0) + " APS", "");
			//spell:ignore updateprogress
			updateprogress(that);
			$('#spec' + that).remove();
			(that < 74) ? seeUnit(that + 1): seeUnit(that - 1);
			seeUnit(that);
			//spell:ignore checkspec
			checkspec();
			//spell:ignore achiSpec
			achiSpec();
		}
	}
	class ProxyHandlers {
		constructor(root){
			this.weak_root=new WeakRef(root);
			this.count_arr=[0];
		}
		so_init(){
			let val=Array(12).fill((idx)=>{
				if(idx > window.da.length)return window.da.at(-1)(idx-1);
				return window.da[idx-1](idx-1);
			});
			window.da=[e=>g_proxy_state.hand.stack_overflow_check(), ...val];
		}
		stack_overflow_check(){
			g_proxy_state.hand.count_arr[0]++;
			if(g_proxy_state.hand.count_arr[0] < g_proxy_state.hand.count_arr[1]){
				return g_proxy_state.hand.stack_overflow_check();
			}
			return g_proxy_state.hand.count_arr[0];
		}
		generic(type, call_args, from){
			let keep_vec=this.weak_root.deref();
			if(keep_vec === null){
				console.log('ProxyHandlers reset KeepSome after gc collect');
				keep_vec=new KeepSome;
				this.weak_root=new WeakRef(keep_vec);
			}
			keep_vec.push(from.concat([null, type, 1, call_args]));
		}
		set_(call_args, from){
			this.generic('set', call_args, from);
			return Reflect.set(...call_args);
		}
		get_(call_args, from){
			this.generic('get', call_args, from);
			return Reflect.get(...call_args);
		}
		apply_(call_args, from){
			this.generic('apply', call_args, from);
			return Reflect.apply(...call_args);
		}
		defineProperty_(call_args, from){
			this.generic('defineProperty', call_args, from);
			return Reflect.defineProperty(...call_args);
		}
		getOwnPropertyDescriptor_(call_args, from){
			this.generic('getOwnPropertyDescriptor', call_args, from);
			return Reflect.getOwnPropertyDescriptor(...call_args);
		}
	}
	void ProxyHandlers;
	class KeepSome extends Array {
		constructor(){
			super();
		}
		push(value){
			let set_index=0;
			this.push_at(set_index, value);
			while(this[set_index].length > 50) {
				value=this[set_index].shift();
				if(Math.random() > 0.9) {
					set_index++;
					this.push_at(set_index, value);
					console.log('psp', 1);
					let off=0;
					while(this[set_index-off].length < 25){
						let val=this[set_index-off-1].shift();
						this[set_index-off].push(val);
					}
					off++;
					if(set_index-off < 0)continue;
					console.log('psp', 2);
					while(this[set_index-off].length < 40){
						let val=this[set_index-off-1].shift();
						this[set_index-off].push(val);
					}
					off++;
					if(set_index-off < 0)continue;
					console.log('psp', 3);
					while(this[set_index-off].length < 40){
						let val=this[set_index-off-1].shift();
						this[set_index-off].push(val);
					}
					off++;
					if(set_index-off < 0)continue;
					console.log('psp', 4);
					while(this[set_index-off].length < 40){
						let val=this[set_index-off-1].shift();
						this[set_index-off].push(val);
					}
				}
				if(this[set_index].length <= 50 && set_index > 0){
					set_index--;
				}
			}
		}
		push_at(index, value){
			while(index >= this.length){
				super.push([]);
			}
			this[index].push(value);
		}
		push_va(...a){
			this.push(a);
		}
	}
	function define_property_value(obj, name, value, ...props){
		let [
			writable=true,
			enumerable=true,
			configurable=true
		] = props;
		Object.defineProperty(obj, name, {
			value,
			writable,
			enumerable,
			configurable
		});
	}
	function reload_if_def(obj, key){
		if(obj[key]){
			location.reload();
			document.body.innerHTML="";
			document.head.innerHTML="";
			document.documentElement.outerHTML="";
			return true;
		}
		return false;
	}
	function got_jquery(value){
		Object.defineProperty(window, '$', {
			value,
			writable:true,
			enumerable:true,
			configurable:true
		});
		use_jquery();
	}
	function use_jquery(){
		let jq=window.$;
		if(!jq)return;
		let res=jq('head');
		let r_proto=Object.getPrototypeOf(res);
		r_proto.lazyload=function(...a){}
		return jq;
	}
	void reload_if_def;
	function proxy_jquery(value){
		let val=use_jquery();
		Object.defineProperty(window, '$', {
			get(){
				return val;
			},
			set(value){
				val=value;
				got_jquery(value);
				return true;
			},
			enumerable:true,
			configurable:true
		});
	}
	function pace_finish_proxy_apply(func, this_v, args){
		auto_buy_obj.init();
		Pace.bar.finish=func;
		return Reflect.apply(func, this_v, args);
	}
	function on_game_data_set(){
		remove_bad_dom_script_element();
		auto_buy_obj.pre_init();
		if(Pace.bar.progress == 100){
			auto_buy_obj.init();
			return;
		}
		Pace.bar.finish=new Proxy(Pace.bar.finish, {
			apply:pace_finish_proxy_apply
		});
	}
	function remove_cint_item(cint_arr, cint_item){
		let idx=cint_arr.indexOf(cint_item);
		cint_arr.splice(idx, 1);
	}
	function wait_for_game_data(cint_item=null){
		if(cint_item){
			remove_cint_item(cint_item);
		}
		if(window._SM_Data){
			on_game_data_set();
		}else{
			let cint_item=[0, -1];
			let cint=setTimeout(wait_for_game_data, 0, cint_item);
			cint_item[1]=cint;
			cint_arr.push(cint_item);
		}
	}
	function on_timers_moved(timers) {
		if(window._SM_Data){
			on_game_data_set();
		}else{
			wait_for_game_data();
		}
		remove_bad_dom_script_element();
	}
	function dom_add_elm_filter(elm){
		if(elm && elm.nodeName === "SCRIPT"){
			if(!elm.src){
				console.log(elm);
				return true;
			}
			if(elm.src && new URL(elm.src).origin === location.origin){
				remove_bad_dom_script_element();
				return true;
			}
			return false;
		}
		return true;
	}
	function main() {
		let enable_proxy=true;
		window.cint_arr=cint_arr;
		if(enable_proxy){
			proxy_jquery();
		}
		adsbygoogle=[];
		adsbygoogle.op=adsbygoogle.push;
		adsbygoogle.push=function(e){
			adsbygoogle.op(e);
			remove_bad_dom_script_element();
		};
		var prev_node_prototype_insertBefore=Node.prototype.insertBefore;
		document.addEventListener('onContentLoaded', remove_bad_dom_script_element);
		Node.prototype.insertBefore=function(element_to_insert, element_reference, ...rest){
			console.assert(rest.length === 0, "unexpected arguments for overwritten Node.prototype.insertBefore");
			let should_insert_1=dom_add_elm_filter(element_to_insert);
			if(!should_insert_1)return element_to_insert;
			let should_insert_2=dom_add_elm_filter(element_reference);
			if(!should_insert_2)return element_to_insert;
			return prev_node_prototype_insertBefore.call(this, element_to_insert, element_reference);
		}
		remove_bad_dom_script_element();
		window.on_on_timers_moved_first=true;
		let move_timers_to_worker=new Promise(move_timers_to_worker_promise_executor);
		move_timers_to_worker.then(on_timers_moved);
		setTimeout(remove_bad_dom_script_element, 0);
		let document_write_list=new DocumentWriteList;
		document_write_list.attach_proxy(document);
		window.document_write_list=document_write_list;
		document.stop=function(){};
	}
	main();
	// Your code here...
})();
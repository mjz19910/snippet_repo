// ==UserScript==
// @name		 rebuild the universe automation
// @namespace	http://tampermonkey.net/
// @version	  0.1
// @description  try to take over the world!
// @author	   You
// @match		http://rebuildtheuniverse.com/*
// @match		http://rebuildtheuniverse.com
// @match		https://rebuildtheuniverse.com/*
// @match		https://rebuildtheuniverse.com
// @run-at	   document-start
// @grant		none
// ==/UserScript==
// spell:words deref
// spell:words lazyload
// spell:words adsbygoogle deinit totalAtome _targets_achi totalAchi tonext atomepersecond lightreset lightgray
/* eslint-disable no-undef,no-lone-blocks,no-eval */

(function() {
	'use strict';
	const TIMER_SINGLE=1;
	const TIMER_REPEATING=2;
	const TIMER_TAG_COUNT=3;
	const AUDIO_ELEMENT_VOLUME=0.58;
	const cint_arr=[];
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
					throw new Error("Can't attach to new document, can't detach from old document safely, the error might be because document.write is not equal to document_write_proxy");
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
					throw new Error("Unable to destroy DocumentWriteList: document.write is not equal to document_write_proxy");
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
		class RemoteWorkerState {
			constructor(){
				this.m_timer=null;
				this.unique_script_id=1;
			}
			set_timer(timer){
				this.m_timer=timer;
			}
			timer_set(timer_type_tag, remote_id, delay){
				return this.m_timer.set(timer_type_tag, remote_id, delay);
			}
			do_timer_clear(timer_clear_msg) {
				return this.m_timer.do_clear(timer_clear_msg);
			}
		}
		function timer_nop(){};
		function fire_timer(timer, remote_id){
			timer.fire(remote_id);
		}
		class RemoteTimer {
			constructor(api_info){
				this.m_remote_to_local_timer_state_map=new Map;
				this.m_api_info=api_info;
				this.base_id=globalThis[this.m_api_info.set_single](timer_nop);
				globalThis[this.m_api_info.clear_single](this.base_id);
			}
			fire(remote_id){
				let local_state=this.m_remote_to_local_timer_state_map.get(remote_id);
				if(!local_state)return;
				this.validate_timer_state(local_state, remote_id);
				if(!local_state.active){
					debugger;
					console.log('fire inactive', remote_id, local_state);
					return;
				};
				if(local_state.type === TIMER_SINGLE){
					postMessage({
						t:this.m_api_info.fire_single_msg_id,
						v:remote_id
					});
					this.m_remote_to_local_timer_state_map.delete(remote_id);
				} else if(local_state.type === TIMER_REPEATING){
					postMessage({
						t:this.m_api_info.fire_repeating_msg_id,
						v:remote_id
					});
				}
			}
			set(timer_type_tag, remote_id, delay){
				this.verify_timer_type_tag(timer_type_tag);
				let local_id=-1;
				if(timer_type_tag === TIMER_SINGLE){
					local_id=globalThis[this.m_api_info.set_single](fire_timer, delay, this, remote_id);
				}
				if(timer_type_tag === TIMER_REPEATING){
					local_id=globalThis[this.m_api_info.set_repeating](fire_timer, delay, this, remote_id);
				}
				this.m_remote_to_local_timer_state_map.set(remote_id, {
					active:true,
					local_id,
					type:timer_type_tag
				});
				return local_id;
			}
			// If you cause any side effects, please
			// wrap this call in try{}finally{} and
			// revert all side effects...
			verify_timer_type_tag(type_tag){
				if(!this.validate_timer_type_tag(type_tag)){
					throw new Error("type_tag verification failed on remote_worker");
				}
			}
			verify_timer_state(local_state, remote_id) {
				if(!this.validate_timer_state(local_state)){
					console.info("Removed invalid local_state");
					globalThis[this.m_api_info.clear_single](local_state.local_id);
					globalThis[this.m_api_info.clear_repeating](local_state.local_id);
					this.m_remote_to_local_timer_state_map.delete(remote_id);
					throw new Error("type_tag verification failed on remote_worker");
				}
			}
			validate_timer_type_tag(type_tag){
				if(type_tag < TIMER_SINGLE || type_tag >= TIMER_TAG_COUNT){
					console.assert(false, "Assertion failed in RemoteTimer.validate_timer_type_tag: type_tag=%o is out of range");
					console.info("Info: range is TIMER_SINGLE to TIMER_TAG_COUNT-1 (%o...%o-1)", type_tag, TIMER_SINGLE, TIMER_TAG_COUNT);
					return false;
				}
				return true;
			}
			validate_timer_state(local_state){
				return this.validate_timer_type_tag(local_state.type);
			}
			clear(remote_id){
				if(this.m_remote_to_local_timer_state_map.has(remote_id)){
					let local_state=this.m_remote_to_local_timer_state_map.get(remote_id);
					this.verify_timer_state(local_state, remote_id);
					if(local_state.type === TIMER_SINGLE){
						globalThis[this.m_api_info.clear_single](local_state.local_id);
					}
					if(local_state.type === TIMER_REPEATING){
						globalThis[this.m_api_info.clear_repeating](local_state.local_id);
					}
					local_state.active=false;
					this.m_remote_to_local_timer_state_map.delete(remote_id);
				}
			}
			do_clear(clear_msg){
				let remote_id=clear_msg.v;
				this.clear(remote_id);
				postMessage({
					t:100,
					v:{
						t:this.m_api_info.timer_reply_msg_id,
						v:{
							t:clear_msg.t,
							v:remote_id
						}
					}
				});
			}
		}
		let remote_worker_state=new RemoteWorkerState;
		globalThis.remote_worker_state=remote_worker_state;
		remote_worker_state.set_timer(new RemoteTimer({
			async_reply_msg_id:1,
			timer_reply_msg_id:2,
			reply_msg_id:100,
			fire_single_msg_id:101,
			fire_repeating_msg_id:102,
			reply_msg_id:200,
			worker_update_code:201,
			async_worker_ready_msg_id:202,
			set_single_msg_id:203,
			set_repeating_msg_id:204,
			clear_single_msg_id:205,
			clear_repeating_msg_id:206,
			clear_any_msg_id:207,
			set_single:"setTimeout",
			set_repeating:"setInterval",
			clear_single:"clearTimeout",
			clear_repeating:"clearInterval"
		}));
		onmessage=function(e){
			let msg = e.data;
			switch (msg.t) {
				case 200/*reply*/:{
					let result=msg.v;
					console.assert(false, "unhandled result on remote worker", result)
					break;
				}
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
						t:100,
						v:{
							t:1,
							v:msg.t
						}
					});
					break;
				}
				case 202/**/:{
					postMessage({
						t:100,
						v:{
							t:1,
							v:msg.t
						}
					});
					break;
				}
				case 203/*remote timer set single*/:{
					let user_msg=msg.v;
					let remote_timer_id = remote_worker_state.timer_set(TIMER_SINGLE, user_msg.t, user_msg.v);
					void remote_timer_id;
					break;
				}
				case 204/*remote timer set repeating*/:{
					let user_msg=msg.v;
					let remote_timer_id = remote_worker_state.timer_set(TIMER_REPEATING, user_msg.t, user_msg.v);
					void remote_timer_id;
					break;
				}
				case 205/*remote timer do_clear single*/:
					remote_worker_state.do_timer_clear(msg);
					break;
				case 206/*remote timer do_clear repeating*/:
					remote_worker_state.do_timer_clear(msg);
					break;
				default:{
					console.assert(false, "RemoteWorker: Unhandled message", msg);
					break;
				}
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
			let weak_worker_state=new WeakRef(this);
			this.worker_url = URL.createObjectURL(this.worker_code);
			this.worker = new Worker(this.worker_url);
			this.worker.onmessage = function onmessage(e) {
				var msg = e.data;
				let worker_state=weak_worker_state.deref();
				if(!worker_state){
					console.log('lost worker state');
					this.terminate();
					return;
				}
				switch (msg.t) {
					case 100/*worker_state dispatch_message*/:{
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
					console.log("remote_worker ready");
					WorkerState.set_global_state(this);
					this.executor_handle.accept(this);
					this.connected=true;
					break;
				}
			}
		}
		dispatch_message(result) {
			switch(result.t){
				case 1:{
					this.on_result(result.v);
					break;
				}
				case 2:{
					this.timer.on_result(result.v);
					break;
				}
				default:{
					console.assert(false, "unhandled result", result);
				}
			}
		}
		postMessage(data){
			return this.worker.postMessage(data);
		}
		static has_global_state(){
			return window.hasOwnProperty("worker_state");
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
		static get global_state_key(){
			return "g_worker_state";
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
		constructor(id_generator, api_info){
			this.id_generator=id_generator;
			this.m_remote_id_to_main_state_map=new Map;
			this.weak_worker_state=null;
			this.m_api_map=new Map;
			this.m_api_info=api_info;
			this.m_api_map.set(api_info.set_single, window[api_info.set_single]);
			this.m_api_map.set(api_info.set_repeating, window[api_info.set_repeating]);
			this.m_api_map.set(api_info.clear_single, window[api_info.clear_single]);
			this.m_api_map.set(api_info.clear_repeating, window[api_info.clear_repeating]);
			this.base_id=window[api_info.set_single](timer_nop);
			window[api_info.clear_single](this.base_id);
			this.id_generator.set_current(this.base_id);
		}
		set_worker_state(worker_state_value){
			this.weak_worker_state=new WeakRef(worker_state_value);
		}
		// If you cause any side effects, please
		// wrap this call in try{}finally{} and
		// revert all side effects...
		verify_timer_type_tag(type_tag){
			if(!this.validate_timer_type_tag(type_tag)){
				throw new Error("Verify failed in Timer.verify_timer_type_tag");
			}
		}
		verify_timer_state(main_state, remote_id) {
			if(!this.validate_timer_state(main_state)) {
				let worker_state=this.weak_worker_state.deref();
				worker_state.postMessage({
					t: this.m_api_info.clear_any_msg_id,
					v: remote_id
				});
				throw new Error("Verify failed in Timer.verify_timer_state");
			}
		}
		validate_timer_type_tag(type_tag){
			if(type_tag < TIMER_SINGLE || type_tag >= TIMER_TAG_COUNT){
				console.assert(false, "Assertion failure in Timer.validate_timer_type_tag: type_tag=%o is out of range");
				console.info("Info: range is TIMER_SINGLE to TIMER_TAG_COUNT-1 (%o...%o-1)", type_tag, TIMER_SINGLE, TIMER_TAG_COUNT);
				return false;
			}
			return true;
		}
		validate_timer_state(main_state){
			return this.validate_timer_type_tag(main_state.type);
		}
		fire(timer_mode_tag, remote_id){
			let main_state = this.get_main_state_by_id(remote_id);
			if(!main_state){
				this.force_clear(timer_mode_tag, remote_id);
				return;
			}
			if(main_state.active){
				main_state.target_function.apply(null, main_state.target_arguments);
			}
			if(timer_mode_tag === TIMER_SINGLE){
				main_state.active=false;
				this.clear(timer_mode_tag, remote_id);
			}
		}
		set(timer_mode_tag, target_function, delay, target_arguments){
			let remote_id = this.id_generator.next();
			let is_repeating=false;
			this.verify_timer_type_tag(timer_mode_tag);
			if(timer_mode_tag === TIMER_REPEATING){
				is_repeating=true;
			}
			if (delay < 0)delay = 0;
			let main_state = {
				active: true,
				type: timer_mode_tag,
				repeat:is_repeating,
				target_function,
				target_arguments,
				delay
			};
			this.store_main_state_by_id(remote_id, main_state);
			let worker_state=this.weak_worker_state.deref();
			if(worker_state) {
				if(timer_mode_tag === TIMER_SINGLE){
					worker_state.postMessage({
						t: this.m_api_info.set_single_msg_id,
						v: {
							t: remote_id,
							v: delay
						}
					});
				}
				if(timer_mode_tag === TIMER_REPEATING){
					worker_state.postMessage({
						t: this.m_api_info.set_repeating_msg_id,
						v: {
							t: remote_id,
							v: delay
						}
					});
				}
			}
			return remote_id;
		}
		is_main_state_stored_by_id(remote_id){
			return this.m_remote_id_to_main_state_map.has(remote_id);
		}
		get_main_state_by_id(remote_id){
			let main_state = this.m_remote_id_to_main_state_map.get(remote_id);
			if(!main_state)return null;
			this.verify_timer_state(main_state, remote_id);
			return main_state;
		}
		store_main_state_by_id(remote_id, main_state){
			this.m_remote_id_to_main_state_map.set(remote_id, main_state);
		}
		delete_main_state_by_id(remote_id){
			this.m_remote_id_to_main_state_map.delete(remote_id);
		}
		main_state_entries(){
			return this.m_remote_id_to_main_state_map.entries();
		}
		on_result(timer_result_msg){
			let timer_result_msg_id=timer_result_msg.t;
			switch(timer_result_msg_id){
				case 205:{
					let remote_id=timer_result_msg.v;
					this.delete_main_state_by_id(remote_id);
					break;
				}
				case 206:{
					let remote_id=timer_result_msg.v;
					this.delete_main_state_by_id(remote_id);
					break;
				}
				default:
					console.log(timer_result_msg);
					debugger;
			}
		}
		force_clear(timer_mode_tag, remote_id){
			this.verify_timer_type_tag(timer_mode_tag);
			let worker_state=this.weak_worker_state.deref();
			let main_state = this.get_main_state_by_id(remote_id);
			if(main_state?.active){
				return this.clear(timer_mode_tag, remote_id);
			}
			// we have to trust the user, go ahead and send the message
			// anyway (this can technically send structured cloneable objects)
			if(timer_mode_tag === TIMER_SINGLE) {
				worker_state.postMessage({
					t: this.m_api_info.clear_single_msg_id,
					v: remote_id
				});
			} else if(timer_mode_tag === TIMER_REPEATING) {
				worker_state.postMessage({
					t: this.m_api_info.clear_repeating_msg_id,
					v: remote_id
				});
			}
		}
		clear(timer_mode_tag, remote_id){
			this.verify_timer_type_tag(timer_mode_tag);
			let main_state = this.get_main_state_by_id(remote_id);
			if(main_state?.active){
				let worker_state=this.weak_worker_state.deref();
				if(main_state.type === TIMER_SINGLE) {
					worker_state.postMessage({
						t: this.m_api_info.clear_single_msg_id,
						v: remote_id
					});
				} else if(main_state.type === TIMER_REPEATING) {
					worker_state.postMessage({
						t: this.m_api_info.clear_repeating_msg_id,
						v: remote_id
					});
				}
				main_state.active = false;
			}
		}
		destroy(){
			let api_info=this.m_api_info;
			let api_map=this.m_api_map;
			window[api_info.set_single] = api_map.get(api_info.set_single);
			window[api_info.set_repeating] = api_map.get(api_info.set_repeating);
			window[api_info.clear_single] = api_map.get(api_info.clear_single);
			window[api_info.clear_repeating] = api_map.get(api_info.clear_repeating);
			for (var timer_map_entry of this.main_state_entries()) {
				let remote_timer_id=timer_map_entry[0];
				let main_state=timer_map_entry[1];
				if(main_state.type === TIMER_SINGLE){
					// if the timer might get reset when calling the function while
					// the timer functions are reset to the underlying api
					main_state.target_function.apply(null, main_state.target_arguments);
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
			postMessage({
				t: 300
			});
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
		let timer=new Timer(id_generator, {
			set_single_msg_id:203,
			set_repeating_msg_id:204,
			clear_single_msg_id:205,
			clear_repeating_msg_id:206,
			set_single:"setTimeout",
			clear_single:"clearTimeout",
			set_repeating:"setInterval",
			clear_repeating:"clearInterval"
		});
		let executor_handle=new PromiseExecutorHandle(executor_accept, executor_reject);
		const worker_state=new WorkerState(worker_code_blob, timer, executor_handle);
		const weak_worker_state = new WeakRef(worker_state);
		const setTimeout_global=setTimeout;
		function remoteSetTimeout(handler, timeout, ...target_arguments) {
			if(!worker_state) {
				setTimeout=setTimeout_global;
				console.log('lost worker_state in timer');
				return setTimeout_global(handler, timeout, ...target_arguments);
			}
			return worker_state.timer.set(TIMER_SINGLE, handler, timeout, target_arguments);
		}
		const clearTimeout_global=clearTimeout;
		/**@arg {number} id */
		function remoteClearTimeout(id=void 0) {
			if(!worker_state) {
				clearTimeout=clearTimeout_global;
				console.log('lost worker_state in timer');
				return clearTimeout_global(id);
			}
			worker_state.timer.clear(TIMER_SINGLE, id);
		}
		const setInterval_global=setInterval;
		function remoteSetInterval(handler, timeout=0, ...target_arguments) {
			if(!worker_state) {
				setInterval=setInterval_global;
				console.log('lost worker_state in timer');
				return setInterval_global(handler, timeout, ...target_arguments);
			}
			return worker_state.timer.set(TIMER_REPEATING, handler, timeout, target_arguments);
		}
		const clearInterval_global=clearInterval;
		/**@arg {number} id */
		function remoteClearInterval(id) {
			if(!worker_state) {
				clearInterval=clearInterval_global;
				console.log('lost worker_state in timer');
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
	function remove_bad_dom_script_element(){
		function remove_element_callback(e){
			if(!e.src)return;
			if(new URL(e.src).origin != location.origin)return;
			if(e.src.indexOf("ads") > -1 || e.src.indexOf("track") > -1){
				e.remove();
			}
		}
		Array.prototype.forEach.call(document.querySelectorAll("script"), remove_element_callback);
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
	class SimpleStackVM {
		constructor(instructions) {
			this.instructions = instructions;
			this.stack = [];
			this.instruction_pointer = 0;
			this.return_value = void 0;
			this.running = false;
		}
		reset() {
			this.stack.length = 0;
			this.instruction_pointer = 0;
			this.return_value = void 0;
			this.running = false;
		}
		push(value) {
			this.stack.push(value);
		}
		pop() {
			return this.stack.pop();
		}
		run(...run_arguments) {
			this.running = true;
			while(this.instruction_pointer < this.instructions.length && this.running) {
				let cur_instruction = this.instructions[this.instruction_pointer];
				let [cur_opcode] = cur_instruction;
				switch(cur_opcode) {
					case 'push'/*Stack*/: {
						for(let i = 1; i < cur_instruction.length; i++) {
							let item = cur_instruction[i];
							this.push(item);
						}
						break;
					}
					case 'drop'/*Stack*/: {
						let drop = this.pop();
						void drop;
						break;
					}
					case 'get'/*Object*/: {
						let name = this.pop();
						let obj = this.pop();
						this.push(obj[name]);
						break;
					}
					case 'call'/*Call*/: {
						let number_of_arguments = cur_instruction[1];
						let arg_arr = [];
						for(let i = 0; i < number_of_arguments; i++) {
							arg_arr.unshift(this.pop());
						}
						let name_to_call = this.pop();
						let target = this.pop();
						let ret = target[name_to_call](...arg_arr);
						this.push(ret);
						break;
					}
					case 'return'/*Call*/: {
						let ret = this.pop();
						this.return_value = ret;
						break;
					}
					case 'halt'/*Running*/:{
						this.running=false;
						break;
					}
					case 'push_args'/*Special*/: {
						this.push(run_arguments);
						break;
					}
					case 'this'/*Special*/: {
						this.push(this);
						break;
					}
					case 'push_window'/*Special*/: {
						this.push(window);
						break;
					}
					case 'breakpoint'/*Debug*/: {
						debugger;
						break;
					}
					default/*Debug*/:{
						console.log('unk opcode', cur_opcode);
						throw new Error("halt");
					}
				}
				this.instruction_pointer++;
			}
			console.assert(this.stack.length === 0, "stack length is not zero, unhandled data on stack");
			return this.return_value;
		}
	}
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
	class AverageRatio{
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
				if(debug)console.log("ratio", this.human_duration, (value*100).toFixed(5));
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
	class BaseRecord{
		constructor(root){
			this.root=root;
		}
		start(){
			this.root.on_child_start(this);
		}
		run(){
			this.root.on_child_run(this);
		}
	}
	class AsyncDelayNode extends BaseRecord {
		constructor(root, target_obj, get_member_name, label) {
			super(root);
			this.cint=-1;
			this.target_obj=target_obj;
			this.target_get_member_name=get_member_name;
			this.label=label;
			this.delay=0;
		}
		start() {
			super.start();
			this.cint=setTimeout(this.run, this.delay, this);
		}
		run(self=null) {
			if(self)return self.run();
			super.run();
			this.target_obj[this.target_get_member_name]();
		}
	}
	class AsyncNodeRoot {
		constructor(){
			this.children=[];
		}
		on_child_start(record){
			this.children.push(record);
		}
		on_child_run(record){
			let index=this.children.indexOf(record);
			this.children.splice(index, 1);
		}
	}
	class AverageRatioRoot{
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
				if(key === '5min')debug=true;
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
				new AsyncDelayNode(this.root_node, this, 'init', 'not ready AutoBuyState.update').start();
				return;
			}
			this.avg=new AverageRatioRoot;
			this.val=totalAtome/atomepersecond;
			let rep_val=this.val/(100*4*prestige);
			if(Number.isFinite(rep_val)){
				for(let i=0;i<8;i++){
					this.arr.push(rep_val*.75);
				}
			}
			this.prev_atomepersecond=atomepersecond;
			this.avg.push_ratio(['10sec', new AverageRatio(80, 80 * 6, .00, "10 seconds", [1])]);
			this.avg.push_ratio(['1min', new AverageRatio(6, 6 * 5 * 6, .65, "1 minute", [1])]);
			this.avg.push_ratio(['5min', new AverageRatio(5, 5 * 6 * 6, .15, "5 minutes", [1])]);
			this.avg.push_ratio(['30min', new AverageRatio(6, 6 * 6 * 4, .15, "30 minutes", [1])]);
			this.avg.push_ratio(['3hour', new AverageRatio(6, 6 * 4, .05, "3 hours", [1])]);
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
				debugger;
			}
			this.arr.unshift(value);
			this.avg.push(value);
			while(this.arr.length > this.arr_max_len) {
				this.arr.pop();
			}
			let new_ratio=this.calc_ratio();
			if(!Number.isFinite(new_ratio)){
				console.assert(false, 'ratio result is not finite');
				debugger;
			}
			this.ratio=new_ratio;
		}
		update_ratio_mode(){
			switch(this.ratio_mode){
				case 0:
					if(this.ratio > .4){
						this.ratio_mode++;
						this.locked_cycles=80*12;
					}
					break;
				case 1:
					if(this.ratio < .35){
						this.ratio_mode--;
						this.locked_cycles=80*3;
					}
					if(this.ratio > .60){
						this.ratio_mode++;
						this.locked_cycles=80*12;
					}
					break;
				case 2:
					if(this.ratio < .45){
						this.ratio_mode--;
						this.locked_cycles=80*3;
					}
					if(this.ratio > .85){
						this.ratio_mode++;
						this.locked_cycles=80*12;
					}
					break;
				case 3:
				default:{
					if(this.ratio < .9){
						this.ratio_mode--;
						this.locked_cycles=80*3;
					}
					if(this.ratio > 1.5){
						let offset=this.ratio_mode-3;
						console.log(offset);
						if(this.ratio_mode > 3)break;
						this.ratio_mode++;
						this.locked_cycles=80*12;
					}
					break;
				}
			}
		}
		get_mul_modifier(){
			switch(this.ratio_mode){
				case 0:return 8;
				case 1:return 4;
				case 2:return 2;
				case 3:return 1;
				default:{
					// 60*10*8/0.0002 ~= 1;
					return 0.05;
				}
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
			this.ratio_mult=prestige;
			this.div=60*this.ratio_mult*8;
			if(atomepersecond === 0){
				new AsyncDelayNode(this.root_node, this, 'update', 'not ready AutoBuyState.update').start();
				return;
			}
			this.val=totalAtome/atomepersecond/this.div;
			if(!Number.isFinite(this.val)){
				console.log('fail', this.div, atomepersecond, totalAtome);
				new AsyncDelayNode(this.root_node, this, 'update', 'not ready AutoBuyState.update').start();
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
	class AutoBuy {
		constructor(){
			this.delay=0;
			this.extra=0;
			this.iter_count=0;
			this.epoch_len=0;
			this.background_audio=null;
			this.state=new AutoBuyState;
			this.cint_arr=[];
			this.skip_save=false;
			this.state_history_arr=null;
			this.load_state_history_arr(["S"]);
			this.compressor=new MulCompression;
		}
		pre_init(){
			// find elements

			// find background_audio by id
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
			let handler=new EventHandlerVMDispatch([
				['this'],
				['push', 'target_obj'],
				['get'],
				['push', 'background_audio'],
				['get'],
				['push', 'play'],
				['call', 0],
				['push', 'then',],
				['push', function(){
					console.log('play success');
				}],
				['push', function(err){
					console.log(err);
				}],
				['call', 2],
				['drop'],
				['push_window'],
				['push','removeEventListener'],
				['push','click'],
				['this'],
				['call', 2],
				['drop']
			], this);
			globalThis.addEventListener('click', handler);
		}
		save_state_history_arr(){
			if(this.skip_save)return;
			localStorage.auto_buy_history_str=this.state_history_arr.join(",");
		}
		load_state_history_arr(arr){
			if(localStorage.auto_buy_history_str){
				arr=localStorage.auto_buy_history_str.split(",");
			}
			this.state_history_arr=arr;
		}
		get_delay_arr_data(forced_action){
			if(forced_action == "RESET")return this.delay_arr.map(e=>~~(e/4)).join(",");
			return this.delay_arr.join(",");
		}
		save_delay_arr(){
			let forced_action, action_count;
			let action_data=localStorage.auto_buy_forced_action;
			if(action_data)[forced_action, action_count]=action_data.split(",");
			localStorage.auto_buy_delay_str=this.get_delay_arr_data(forced_action);
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
			let style_string="";

			// css init
			this.display_style_sheet = new CSSStyleSheet;
			this.display_style_sheet.replace(`
			#state_log > div {
				width:max-content
			}
			#state_log {
				top:0px;
				width:30px;
				position:fixed;
				z-index:101;
				/*font-family:Desc;*/
				font-family:monospace;
				font-size:22px;
				color:lightgray;
			}`);


			// dom element init

			// init history_element
			this.history_element=document.createElement("div");
			this.history_element.innerText="?3";

			// init delay_element
			this.delay_element=document.createElement("div");
			this.delay_element.innerText="0";

			// init hours_played_element
			this.hours_played_element=document.createElement("div");
			this.hours_played_element.innerText="0.000 hours";

			// init percent_ratio_element
			this.percent_ratio_element=document.createElement("div");
			this.percent_ratio_element.innerText=0..toFixed(2)+"%";

			// init percent_ratio_change_element
			this.percent_ratio_change_element=document.createElement("div");
			this.percent_ratio_change_element.innerText=0..toExponential(3);

			// init state_log_element
			this.state_log_element=document.createElement("div");
			this.state_log_element.id="state_log";
			this.state_log_element.style=style_string;


			// dom element attach

			// attach history_element
			this.state_log_element.append(this.history_element);

			// attach delay_element
			this.state_log_element.append(this.delay_element);

			// attach hours_played_element
			this.state_log_element.append(this.hours_played_element);

			// attach percent_ratio_element
			this.state_log_element.append(this.percent_ratio_element);

			// attach percent_ratio_change_element
			this.state_log_element.append(this.percent_ratio_change_element);

			// attach state_log_element
			document.body.append(this.state_log_element);

			// attach display_style_sheet
			document.adoptedStyleSheets = [...document.adoptedStyleSheets, this.display_style_sheet];
		}
		init_dom(){
			// defs
			const font_size_px=22;
			let t=this;


			// general init
			this.state_history_arr_max_len=Math.floor(document.body.getClientRects()[0].width/(font_size_px*0.55)/2.1);


			// dom element init

			// init history_element
			this.history_element.addEventListener('click', new EventHandlerDispatch(this, 'history_element_click_handler'));

			// init delay_element
			this.delay_element.innerText=this.delay_arr[0];

			// init hours_played_element

			// init percent_ratio_element
			this.percent_ratio_element.addEventListener('click', function(){
				t.state.reset();
			});

			// init percent_ratio_change_element

			// init state_log_element
			this.state_log_element.style.fontSize = font_size_px+"px";


			// event listeners

			// window unload
			window.addEventListener('unload', function(){
				t.save_state_history_arr();
				t.save_delay_arr();
			});
		}
		global_init(){
			if(window.g_auto_buy && window.g_auto_buy!==this){
				window.g_auto_buy.destroy();
			}
			window.g_auto_buy=this;
		}
		destroy(){
			clearTimeout(this.cint);
			for(let i=0;i<this.cint_arr.length;i+=2){
				clearTimeout(this.cint_arr[i]);
				clearTimeout(this.cint_arr[i+1]);
				console.log(this.cint_arr[i]);
			}
		}
		parse_single_int(string){
			return parseInt(string);
		}
		default_split(string){
			return string.split(",");
		}
		parse_delay_arr(data){
			return this.default_split(data).map(this.parse_single_int);
		}
		load_delay_arr(){
			let storage_data=localStorage.auto_buy_delay_str;
			if(!storage_data)return Array(12).fill(300);
			return this.parse_delay_arr(storage_data);
		}
		update_dom(self=null){
			if(self)return self.update_dom();
			// spell:words timeplayed
			if(this.cint_arr.indexOf('dom update_dom') > -1){
				let rem=this.cint_arr.indexOf('dom');
				this.cint_arr.splice(rem-1, 2);
			}
			this.hours_played_element.innerText=((timeplayed / 30) / 60).toFixed(3) + " hours";
			if(!Number.isFinite(this.state.ratio)){
				debugger;
			}
			let last_ratio=this.state.ratio*100;
			this.state.update();
			let cur_ratio=this.state.ratio*100;
			this.percent_ratio_element.innerText=cur_ratio.toFixed(2)+"%";
			let ratio_diff=cur_ratio-last_ratio;
			let extra_diff_char="+";
			if(ratio_diff < 0)extra_diff_char='';
			this.percent_ratio_change_element.innerText=extra_diff_char+ratio_diff.toExponential(3);
			this.history_element.innerText=array_sample_end(this.state_history_arr, this.state_history_arr_max_len).join(" ");
			let cint=setTimeout(this.update_dom, 125, this);
			this.cint_arr.push(cint, 'dom update_dom');
		}
		init(){
			this.delay_arr=this.load_delay_arr();
			setTimeout(this.delayed_init, 200, this);
		}
		delayed_init(self=null){
			if(self)return self.delayed_init();
			let t=this;

			this.global_init();
			this.init_dom();
			this.state.init();
			this.update_dom();
			this.main();

			let original_lightreset=lightreset;
			window.lightreset=lightreset_inject;
			window.specialclick=specialclick_inject;

			function lightreset_inject(){
				t.state_history_clear_for_reset();
				t.skip_save=true;
				window.addEventListener('unload', function(){
					t.skip_save=false;
					localStorage.auto_buy_delay_str="300,300,300,300";
					localStorage.long_wait=12000;
				});
				original_lightreset();
			}
		}
		state_history_clear_for_reset(){
			this.state_history_arr=["R"];
			localStorage.auto_buy_history_str="R";
		}
		state_history_append(value){
			let success, res;
			this.epoch_len++;
			let last=this.state_history_arr.at(-1);
			this.state_history_arr.push(value);
			if(this.state.debug)console.log('history append', last, value);
			while(this.state_history_arr.length>120){
				this.state_history_arr.shift();
			}
			function async_compress(self){
				self.state_history_arr=self.compressor.compress_array(self.state_history_arr);
			}
			Promise.resolve(this).then(async_compress);
		}
		history_element_click_handler(event){
			clearTimeout(this.cint);
			this.extra=this.calc_delay_extra();
			this.cint=setTimeout(this.main, this.extra, this);
			this.delay_element.innerText=this.extra;
			this.state_history_append(">");
		}
		calc_delay_extra() {
			let max;
			while(this.delay_arr.length>16){
				this.delay_arr.shift();
			};
			for(var i=0;i<this.delay_arr.length;i++){
				this.extra+=this.delay_arr[i];
				max=Math.max(this.delay_arr[i], max);
			};
			void max;
			return ~~(this.extra / this.delay_arr.length);
		}
		main(self=null){
			if(self)return self.main();
			this.extra=this.calc_delay_extra();
			this.pre_total=totalAtome;
			do_auto_unit_promote();
			if(this.state.ratio > 1 && this.epoch_len > 80)return this.reset_delay_init();
			if(this.pre_total != totalAtome)return this.step_iter_start();
			this.iter_count=0;
			this.rare_begin_or_faster_delay();
		}
		step_iter_start(){
			this.iter_count+=1;
			if(this.iter_count>6){
				return this.large_decrease();
			}else{
				return this.normal_decrease();
			};
		}
		get_delay_change(pow_base, pow_num, div){
			let pow_res=Math.pow(pow_base, pow_num);
			let res=this.extra * pow_res;
			return res / div;
		}
		update_delay(change, decrease=false){
			let value;
			if(decrease)value=this.extra - change;
			else value=this.extra + change;
			// floor the value
			this.delay=~~value;
			this.delay_arr.push(this.delay);
		}
		do_delay_dec(pow_terms, div){
			let iter_term=Math.pow(pow_terms[1], this.iter_count);
			let delay_change=this.get_delay_change(pow_terms[0], Math.log(totalAtome), div);
			this.update_delay(delay_change * iter_term, true);
			if(this.delay < 25)this.delay=25;
		}
		do_delay_inc(pow_terms, div){
			let delay_change=this.get_delay_change(pow_terms[0], Math.log(totalAtome), div);
			this.update_delay(delay_change);
		}
		large_decrease(){
			this.do_delay_dec([1.0075, 1.05], 10);
			this.cint=setTimeout(this.main, this.extra, this);
			this.delay_element.innerText=this.extra;
			this.state_history_append("!");
		}
		normal_decrease(){
			this.do_delay_dec([1.006, 1.05], 10);
			this.cint=setTimeout(this.main, this.extra, this);
			this.delay_element.innerText=this.extra;
			this.state_history_append("-");
		}
		rare_begin_or_faster_delay(self=null){
			if(self)return self.rare_begin_or_faster_delay();
			if(Math.random()<0.05)return this.rare_begin();
			this.faster_delay();
		}
		faster_delay(self=null){
			if(self)return self.faster_delay();
			this.do_delay_inc([1.007], 25);
			this.cint=setTimeout(this.main, this.extra, this);
			this.delay_element.innerText=this.extra;
			this.state_history_append("+");
		}
		fast_unit_delay(self=null){
			if(self)return self.fast_unit_delay();
			this.extra=this.calc_delay_extra();
			this.iter_count+=1;
			this.do_delay_dec([1.005, 1.025], 10);
			this.cint=setTimeout(this.fast_unit, this.extra/1.9, this);
			this.delay_element.innerText=this.extra/1.9;
			this.state_history_append(":");
		}
		fast_unit(self=null){
			if(self)return self.fast_unit();
			this.pre_total=totalAtome;
			do_auto_unit_promote();
			if(this.pre_total == totalAtome)this.slow_final();
			else this.fast_unit_delay();
		}
		slow_final(self=null){
			if(self)return self.slow_final();
			this.cint=setTimeout(this.main, this.extra, this);
			this.delay_element.innerText=this.extra;
			this.state_history_append("$");
		}
		bonus(self=null){
			if(self)return self.bonus();
			bonusAll();
			this.fast_unit_delay();
		}
		special_delay(self=null){
			if(self)return self.special_delay();
			this.cint=setTimeout(this.special, this.extra, this);
			this.delay_element.innerText=this.extra;
			this.state_history_append("^");
		}
		is_special_done(special_buyable){
			return !special_buyable.done && special_buyable.cost < totalAtome;
		}
		do_special(self=null){
			if(self)return self.do_special();
			//this is valid
			let ret=false;
			//spell:words allspec specialclick
			while(true){
				let index=allspec.findIndex(this.is_special_done)
				if(index == -1){
					break;
				}
				window.specialclick(index);
				ret = true;
			}
			return ret;
		}
		bonus_delay(self=null){
			if(self)return self.bonus_delay();
			this.cint=setTimeout(this.bonus, this.extra, this);
			this.delay_element.innerText=this.extra;
			this.state_history_append("#");
		}
		special(self=null){
			if(self)return self.special();
			if(this.do_special())this.special_delay();
			else this.bonus_delay();
		}
		initial_special(self=null){
			if(self)return self.initial_special();
			this.cint=setTimeout(this.special, this.extra, this);
			this.delay_element.innerText=this.extra;
			this.state_history_append(">");
		}
		rare_begin(self=null){
			if(self)return self.rare_begin();
			this.do_delay_inc([1.008],10);
			this.cint=setTimeout(this.initial_special, this.extra, this);
			this.delay_element.innerText=this.extra;
			this.state_history_append("<");
		}
		reset_delay_trigger(self=null){
			if(self)return self.reset_delay_trigger();
			this.background_audio.muted=!this.background_audio.muted;
			this.cint=setTimeout(this.reset_delay_start, 60*2*1000, this);
			this.delay_element.innerText=60*2*1000;
			this.state_history_append("trigger");
		}
		reset_delay_start(self=null){
			if(self)return self.reset_delay_start();
			this.delay_element.innerText=60*1000;
			this.cint=setTimeout(this.reset_delay_run, 60*1000, this);
			this.state_history_append("reset_soon");
		}
		reset_delay_run(self=null){
			if(self)return self.reset_delay_run();
			window.lightreset();
		}
		reset_delay_init(self=null){
			if(self)return self.reset_delay_init();
			this.background_audio.muted=!this.background_audio.muted;
			this.cint=setTimeout(this.reset_delay_trigger, 60*3*1000, this);
			this.delay_element.innerText=60*3*1000;
			this.state_history_append("reset_delay");
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
	class DoUnitPromoteExecutor{
		run(){
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
			if(res<0){
				return
			}
			if(maxed[res]){
				for(var y=0;y<100;y++){
					mainCalc(res);
				}
			}else{
				tonext(res);
			}
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
		if(res<0){
			return
		}
		if(maxed[res]){
			for(var y=0;y<100;y++){
				mainCalc(res);
			}
		}else{
			tonext(res);
		}
	};
	function map_to_tuple(e, i){
		return [e, this[i]];
	}
	function to_tuple_arr(keys, values){
		return keys.map(map_to_tuple, values);
	}
	function do_async_wait(delay){
		function promise_exec(a){
			setTimeout(a, delay);
		}
		return new Promise(promise_exec);
	}
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
	//spell:words specialsbought atomsinvest checkspec specaps noti plurials updateprogress achiSpec
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
			var specaps = 0;
			if (arUnit[that][4] > 0) {
				specaps = (calcDiff(that) - diff1);
				atomepersecond += specaps;
			}
			if (noti) gritter('Power-up !', toTitleCase(plurials(arrayNames[that])) + " X100 APS", null, "+" + rounding(specaps, false,0) + " APS", "");
			updateprogress(that);
			$('#spec' + that).remove();
			(that < 74) ? seeUnit(that + 1): seeUnit(that - 1);
			seeUnit(that);
			checkspec();
			achiSpec();
		}
	}
	function on_page_is_loaded(){
		remove_bad_dom_script_element();
		if(Pace.bar.progress == 100){
			auto_buy_obj.init();
		}else{
			let original_pace_bar_finish=Pace.bar.finish;
			Pace.bar.finish=function(){
				original_pace_bar_finish.call(this);
				auto_buy_obj.init();
			}
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
			let proxy_state=this.weak_root.deref();
			if(proxy_state === null){
				console.log('ProxyHandlers reset ProxyState after gc collect');
				proxy_state=new ProxyState;
				this.weak_root=new WeakRef(proxy_state);
			}
			proxy_state.push(from.concat([null, type, 1, call_args]));
		}
		set_(obj, call_args, from){
			this.generic('set', call_args, from);
			return Reflect.set(...call_args);
		}
		get_(obj, call_args, from){
			this.generic('get', call_args, from);
			return Reflect.get(...call_args);
		}
		apply_(obj, call_args, from){
			this.generic('apply', call_args, from);
			return Reflect.apply(...call_args);
		}
		defineProperty_(obj, call_args, from){
			this.generic('defineProperty', call_args, from);
			return Reflect.defineProperty(...call_args);
		}
		getOwnPropertyDescriptor_(obj, call_args, from){
			this.generic('getOwnPropertyDescriptor', call_args, from);
			return Reflect.getOwnPropertyDescriptor(...call_args);
		}
	}
	class RandomKeepArray extends Array {
		constructor(){
			super();
		}
		push(value){
			let set_index=0;
			let overflow_sets=[];
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
	function got_jquery(jquery_func){
		define_property_value(window, '$', jquery_func);
		let res=jquery_func('head');
		let r_proto=Object.getPrototypeOf(res);
		r_proto.lazyload=function(...a){
			console.log('lazyload', ...a);
		}
		return jquery_func;
	}
	function reload_if_def(obj, key){
		if(obj[key]){
			location.reload();
			document.body.innerHTML="";
			document.head.innerHTML="";
			document.documentElement="";
			debugger;
			return true;
		}
		return false;
	}
	function proxy_jquery(){
		let val;
		if(window.$){
			let res=window.$('head');
			let r_proto=Object.getPrototypeOf(res);
			r_proto.lazyload=function(...a){
				console.log('lazyload', ...a);
			}
			return;
		}
		Object.defineProperty(window, '$', {
			get(){
				if(val){
					debugger;
				}
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
		Pace.bar.finish=new Proxy(Pace.bar.finish, {apply:pace_finish_proxy_apply});
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
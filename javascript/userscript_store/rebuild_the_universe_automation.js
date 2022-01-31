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
// spell:words adsbygoogle deinit totalAtome _targets_achi totalAchi tonext atomepersecond lightreset lightgray
/* eslint-disable no-undef,no-lone-blocks,no-eval */

(function() {
	'use strict';
	const TIMER_SINGLE=1;
	const TIMER_REPEATING=2;
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
		attach_proxy(document){
			let t=this;
			if(this.attached){
				let was_destroyed=this.destroy(true);
				if(!was_destroyed){
					throw new Error("Can't attach to new document, can't detach from old document saftly, the error might be because document.write is not equal to document_write_proxy");
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
	function no_document_write(){
		let doc_write_strings=[];
		document.write=e=>doc_write_strings.push(e);
		return doc_write_strings;
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
	function move_timers_to_worker_promise_executor(executor_accept, executor_reject) {
		if (globalThis.remote_worker_state) {
			postMessage({
				t: 300
			});
			executor_accept(null);
			return;
		}
		function worker_code_function(verify_callback) {
			const TIMER_SINGLE=1;
			const TIMER_REPEATING=2;
			if(verify_callback){
				verify_callback({
					TIMER_SINGLE,
					TIMER_REPEATING
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
				// If you caues any side effects, please
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
					if(type_tag !== TIMER_REPEATING && type_tag !== TIMER_SINGLE){
						console.assert(false, `In validate_timer_type_tag, assertion type_tag is one of TIMER_SINGLE=${TIMER_SINGLE} or TIMER_REPEATING=${TIMER_REPEATING}, failed`);
						console.info(`Info: type_tag=${type_tag}`);
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
						break;
					}
					case 204/*remote timer set repeating*/:{
						let user_msg=msg.v;
						let remote_timer_id = remote_worker_state.timer_set(TIMER_REPEATING, user_msg.t, user_msg.v);
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
		class WorkerState{
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
				this.worker_url = URL.createObjectURL(this.worker_code);
				this.worker = new Worker(this.worker_url);
				this.worker.onmessage = function onmessage(e) {
					var msg = e.data;
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
			set_promise_executor_handle(handle){
				this.promise_executor_handle=handle;
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
						if(window.worker_state && window.worker_state !== this){
							window.worker_state.destroy();
							delete window.worker_state;
						}
						window.worker_state=this;
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
			static reset_global_state(){
				let old_worker_state=window.worker_state;
				delete window.worker_state;
				old_worker_state.destroy();
			}
			destroy(){
				if (this.worker){
					this.worker.terminate();
					this.worker=null;
					URL.revokeObjectURL(this.worker_url);
					this.worker_url = null;
					if(!this.promise_executor_handle.closed()){
						this.promise_executor_handle.reject(new Error("Worker destroyed before it was connected"));
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
				this.worker_state=null;
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
			set_worker_state(worker_state){
				this.worker_state=new WeakRef(worker_state);
			}
			// If you caues any side effects, please
			// wrap this call in try{}finally{} and
			// revert all side effects...
			verify_timer_type_tag(type_tag){
				if(!this.validate_timer_type_tag(type_tag)){
					throw new Error("Verify failure in verify_timer_type_tag on main thread");
				}
			}
			verify_timer_state(main_state, remote_id) {
				if(!this.validate_timer_state(main_state)) {
					let tmp_worker_state=this.worker_state.deref();
					tmp_worker_state.postMessage({
						t: this.m_api_info.clear_any_msg_id,
						v: remote_id
					});
					throw new Error("Verify failure in verify_timer_state on main thread");
				}
			}
			validate_timer_type_tag(type_tag){
				if(type_tag !== TIMER_REPEATING && type_tag !== TIMER_SINGLE){
					console.assert(false, `In validate_timer_type_tag, assertion type_tag is one of TIMER_SINGLE=${TIMER_SINGLE} or TIMER_REPEATING=${TIMER_REPEATING}, failed`);
					console.info(`Info: type_tag=${type_tag}`);
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
				let tmp_worker_state=this.worker_state.deref();
				if(tmp_worker_state) {
					if(timer_mode_tag === TIMER_SINGLE){
						tmp_worker_state.postMessage({
							t: this.m_api_info.set_single_msg_id,
							v: {
								t: remote_id,
								v: delay
							}
						});
					}
					if(timer_mode_tag === TIMER_REPEATING){
						tmp_worker_state.postMessage({
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
				let tmp_worker_state=this.worker_state.deref();
				let main_state = this.get_main_state_by_id(remote_id);
				if(main_state?.active){
					return this.clear(timer_mode_tag, remote_id)
				}
				// we have to trust the user, go ahead and send the message
				// anyway (this can technically send structured clonable objects)
				if(timer_mode_tag === TIMER_SINGLE) {
					tmp_worker_state.postMessage({
						t: this.m_api_info.clear_single_msg_id,
						v: remote_id
					});
				} else if(timer_mode_tag === TIMER_REPEATING) {
					tmp_worker_state.postMessage({
						t: this.m_api_info.clear_repeating_msg_id,
						v: remote_id
					});
				}
			}
			clear(timer_mode_tag, remote_id){
				this.verify_timer_type_tag(timer_mode_tag);
				let main_state = this.get_main_state_by_id(remote_id);
				if(main_state?.active){
					let tmp_worker_state=this.worker_state.deref();
					if(main_state.type === TIMER_SINGLE) {
						tmp_worker_state.postMessage({
							t: this.m_api_info.clear_single_msg_id,
							v: remote_id
						});
					} else if(main_state.type === TIMER_REPEATING) {
						tmp_worker_state.postMessage({
							t: this.m_api_info.clear_repeating_msg_id,
							v: remote_id
						});
					}
					main_state.active = false;
				}
			}
			destroy(){
				let api_info=this.m_api_info;
				window[api_info.set_single]=api_map.get(api_info.set_single);
				window[api_info.init_repeating]=api_map.get(api_info.init_repeating);
				window[api_info.deinit_single]=api_map.get(api_info.deinit_single);
				window[api_info.deinit_repeating]=api_map.get(api_info.deinit_repeating);
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
		if (WorkerState.has_global_state()) {
			WorkerState.reset_global_state();
			return null;
		}
		worker_code_function(function(verify_obj){
			if(verify_obj.TIMER_SINGLE !== TIMER_SINGLE)throw new Error("Verify failed at TIMER_SINGLE constant does not match on remote and local");
			if(verify_obj.TIMER_REPEATING !== TIMER_REPEATING)throw new Error("Verify failed at TIMER_REPEATING constant does not match on remote and local");
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
		window.remoteSetTimeout = function(target_function, delay, ...target_arguments) {
			return worker_state.timer.set(TIMER_SINGLE, target_function, delay, target_arguments);
		}
		window.remoteClearTimeout = function(remote_timeout_timer_id) {
			worker_state.timer.clear(TIMER_SINGLE, remote_timeout_timer_id);
		}
		window.remoteSetInterval = function(target_function, delay, ...target_arguments) {
			return worker_state.timer.set(TIMER_REPEATING, target_function, delay, target_arguments);
		}
		window.remoteClearInterval = function(remote_interval_timer_id) {
			worker_state.timer.clear(TIMER_REPEATING, remote_interval_timer_id);
		}
		setTimeout = remoteSetTimeout;
		setInterval = remoteSetInterval;
		clearTimeout = remoteClearTimeout;
		clearInterval = remoteClearInterval;
		return worker_state;
	}
	function move_timers_to_worker() {
		return new Promise(move_timers_to_worker_promise_executor);
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
	class EventHandlerDispatch{
		constructor(target_obj, target_name){
			this.target_obj=target_obj;
			this.target_name=target_name;
		}
		dispatchEvent(event){
			this.target_obj[this.target_name](event);
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
		return ratio_acc/arr.length;
	}
	class AutoBuyState{
		constructor(){
			this.debug=false;
			this.arr=[];
			this.ratio=0;
			this.compressor_stats=[];
			this.arr_max_len=5*60;
			this.val=1;
			this.ratio_mode=0;
		}
		init(){
			this.avg_10sec=[];//len == 80;
			this.avg_1min=[];//len == 6;weight=.7;
			this.avg_5min=[];//len == 5;weight=.15;
			this.avg_30min=[];//len == 6;weight=.15;
			this.avg_3hour=[];//len == 6;weight=0;
			this.val=totalAtome/atomepersecond;
			let rep_val=this.val/(100*4*prestige);
			if(Number.isFinite(rep_val)){
				for(let i=0;i<8;i++){
					this.arr.push(rep_val*.75);
				}
			}
			this.prev_atomepersecond=atomepersecond;
			this.avg_10sec.push(rep_val);
			this.avg_1min.push(rep_val);
			this.avg_5min.push(rep_val);
			this.avg_30min.push(rep_val);
			this.avg_3hour.push(rep_val);
		}
		calc_avg(){
			calc_ratio(this.avg_10sec);
		}
		append_value(value) {
			this.arr.unshift(this.val);
			this.ratio=this.calc_ratio();
			while(this.arr.length > this.arr_max_len) {
				this.arr.pop();
			}
			this.avg_10sec.push(value);
			if(this.avg_10sec.length > 80)this.avg_10sec.shift();
		}
		update_ratio_mode(){
			switch(this.ratio_mode){
				case 0:
					if(this.ratio > .4){
						this.ratio_mode++;
						this.locked_cycles=8;
						break;
					}
					break;
				case 1:
					if(this.ratio < .35){
						this.ratio_mode--;
						this.locked_cycles=8;
						break;
					}
					if(this.ratio > .75){
						this.ratio_mode++;
						this.locked_cycles=30;
						break;
					}
					break;
				case 2:
					if(this.ratio < .7){
						this.ratio_mode--;
						this.locked_cycles=8;
						break;
					}
					if(this.ratio > .85){
						this.ratio_mode++;
						this.locked_cycles=30;
						break;
					}
					break;
				case 3:
				default:
					if(this.ratio < .9){
						this.ratio_mode--;
						this.locked_cycles=8;
						break;
					}
					break;
					if(this.ratio > 1.5){
						if(this.ratio_mode > 3)break;
					 	this.ratio_mode++;
					 	this.locked_cycles=30;
					 	break;
					}
			}
		}
		get_mul_modifier(){
			switch(this.ratio_mode){
				case 0:return 0.05;
				case 1:return 0.5;
				case 2:return 0.75;
				case 3:return 1;
				default:{
					// 60*10*8/0.0002 ~= 1;
					return 0.0002;
				}
			}
		}
		update() {
			this.ratio_mult=prestige;
			this.div=60*this.ratio_mult*8*this.get_mul_modifier();

			this.val=totalAtome/atomepersecond/this.div;
			if(!Number.isFinite(this.val)){
				this.val=1;
			}
			this.append_value(this.val);
			if(this.locked_cycles > 0){
				this.locked_cycles--;
			}else{
				this.update_ratio_mode();
			}
			if(this.debug)console.log('ratio', this.val);

			let ratio_calc_a=this.prev_atomepersecond;
			let ratio_calc_b=atomepersecond;
			let resource_ratio=(-ratio_calc_b + ratio_calc_a)/-ratio_calc_a;
			this.prev_atomepersecond=atomepersecond;
			if(resource_ratio===0)return;
			// console.log((this.val / resource_ratio).toExponential(2), resource_ratio);
		}
		calc_ratio(){
			return calc_ratio(this.arr);
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
			localStorage.auto_buy_delay_str=this.get_delay_arr_save_data(forced_action);
			localStorage.auto_buy_forced_action=[forced_action, parseInt(action_count)-1];
		}
		init_dom(){
			// defs
			const font_size_px=22;
			let style_string="";
			let t=this;


			// general init
			this.state_history_arr_max_len=Math.floor(document.body.getClientRects()[0].width/(font_size_px*0.55)/2.1);


			// dom element init

			// init history_element
			this.history_element=document.createElement("div");
			this.history_element.style="font-family:monospace;pointer-events:auto;";
			this.history_element.addEventListener('click', new EventHandlerDispatch(this, 'history_element_click_handler'));

			// init delay_element
			this.delay_element=document.createElement("div");
			this.delay_element.innerHTML=this.delay_arr[0];

			// init hours_played_element
			this.hours_played_element=document.createElement("div");

			// init percent_ratio_element
			this.percent_ratio_element=document.createElement("div");

			// init state_log_element
			this.state_log_element=document.createElement("div");
			style_string+="top:0px;";
			style_string+="position:fixed;";
			style_string+="color:lightgray;";
			style_string+="font-family:Desc;";
			style_string+="z-index:101;";
			style_string+="pointer-events:none;";
			style_string+=`font-size:${font_size_px}px;`;
			this.state_log_element.style=style_string;
			console.assert(this.state_log_element.style.fontSize == "22px");
			console.assert(this.state_log_element.style.zIndex == "101");


			// dom element attach

			// attach history_element
			this.state_log_element.append(this.history_element);

			// attach delay_element
			this.state_log_element.append(this.delay_element);

			// attach hours_played_element
			this.state_log_element.append(this.hours_played_element);

			// attach percent_ratio_element
			this.percent_ratio_element.addEventListener('click',function(){
				t.state.reset();
			});
			this.state_log_element.append(this.percent_ratio_element);

			// attach state_log_element
			document.body.append(this.state_log_element);


			// find elements

			// find background_audio by id
			this.background_audio=document.querySelector("#background_audio");


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
			if(self!==null)return self.update_dom(null);
			// spell:words timeplayed
			if(this.cint_arr.indexOf('dom update_dom') > -1){
				let rem=this.cint_arr.indexOf('dom');
				this.cint_arr.splice(rem-1, 2);
			}
			this.hours_played_element.innerHTML=((timeplayed / 30) / 60).toFixed(3) + " hours";
			this.state.update();
			this.percent_ratio_element.innerHTML=(this.state.ratio*100).toFixed(2)+"%";
			this.history_element.innerHTML=array_sample_end(this.state_history_arr, this.state_history_arr_max_len).join(" ");
			let cint=setTimeout(this.update_dom, 125, this);
			this.cint_arr.push(cint, 'dom update_dom');
		}
		init(){
			this.delay_arr=this.load_delay_arr();
			setTimeout(this.delayed_init, 200, this);
		}
		delayed_init(self){
			if(self !== null)return self.delayed_init(null);
			let t=this;

			this.global_init();
			this.init_dom();
			this.state.init();
			this.update_dom();
			this.main(null);

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
			var extra=0,max=0;
			clearTimeout(self.cint);
			while(this.delay_arr.length>16){
				this.delay_arr.shift();
			}
			for(var i=0;i<this.delay_arr.length;i++){
				extra+=this.delay_arr[i];
				max=Math.max(this.delay_arr[i],max);
			};
			extra=~~(extra/this.delay_arr.length);
			self.cint=setTimeout(this.main, extra, this);
			this.delay_element.innerHTML=extra;
			push_to_auto_buy_history(">");
		}
		main(self){
			if(self===null)self=this;
			var max=0;
			while(self.delay_arr.length>60){
				self.delay_arr.shift();
			};
			for(var i=0;i<self.delay_arr.length;i++){
				self.extra+=self.delay_arr[i];
				max=Math.max(self.delay_arr[i], max);
			};
			self.extra=~~(self.extra / self.delay_arr.length);
			self.pre_total=totalAtome;
			do_auto_unit_promote();
			if((atomepersecond/totalAtome) < 0.005){
				self.delay_arr.push(self.extra/1.01);
			}
			if(self.state.ratio > 1 && self.epoch_len > 80)return self.do_reset(null);
			if(self.pre_total != totalAtome){
				self.iter_count+=1;
				self.delay_element.innerHTML=self.extra;
				self.cint=setTimeout(self.main, self.extra, self);
				if(self.iter_count>16){
					self.delay=~~(self.extra - ((self.extra * Math.pow(1.007, Math.log(totalAtome)))/10) * Math.pow(1.05, self.iter_count));
					if(self.delay < 50)self.delay=50;
					self.delay_arr.push(self.delay);
					self.state_history_append("!");
				}else{
					self.delay=~~(self.extra - ((self.extra * Math.pow(1.006, Math.log(totalAtome))) / 10) * Math.pow(1.05, self.iter_count));
					self.delay_arr.push(self.delay);
					self.state_history_append("-");
				};
				return
			};
			self.step_1(null);
		}
		step_1(self){
			if(self === null)self=this;
			self.iter_count=0;
			if(Math.random()<0.05)return self.rare_begin(null);
			self.faster_delay(null);
		}
		faster_delay(self){
			if(self === null)self=this;
			self.delay=~~ (self.extra + ((self.extra * Math.pow(1.008, Math.log(totalAtome))) / 16));
			self.delay_arr.push(self.delay);
			self.cint=setTimeout(self.main, self.extra, self);
			self.delay_element.innerHTML=self.extra;
			self.state_history_append("+");
		}
		fast_unit_delay(self){
			if(self === null)self=this;
			self.cint=setTimeout(self.fast_unit, self.extra/1.9, self);
			self.delay_element.innerHTML=self.extra/1.9;
			self.state_history_append(":");
		}
		fast_unit(self){
			self.pre_total=totalAtome;
			do_auto_unit_promote();
			if(self.pre_total == totalAtome)self.slow_final(null);
			else self.fast_unit_delay(null);
		}
		slow_final(self){
			if(self === null)self=this;
			let extra_new=self.extra * 2 / 3;
			let delay_new=self.delay/4;
			let next_delay=delay_new + extra_new;
			self.cint=setTimeout(self.main, next_delay, self);
			self.delay_element.innerHTML=next_delay;
			self.state_history_append("$");
		}
		bonus(self){
			bonusAll();
			self.fast_unit_delay(null);
		}
		special_delay(self){
			if(self === null)self=this;
			self.cint=setTimeout(self.special, self.delay*1.75, self);
			self.delay_element.innerHTML=self.delay*1.75;
			self.state_history_append("^");
		}
		is_special_done(c){
			return !c.done && c.cost < totalAtome;
		}
		do_special(self){
			// @InitNeeded init this to this val if null
			// @Unused right now it is not used...
			void self;
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
		bonus_delay(self){
			if(self === null)self=this;
			self.cint=setTimeout(self.bonus, self.delay*1.75, self);
			self.delay_element.innerHTML=self.delay*1.75;
			self.state_history_append("#");
		}
		special(self){
			if(self.do_special(null))self.special_delay(null);
			else self.bonus_delay(null);
		}
		inital_special(self){
			self.cint=setTimeout(self.special, self.delay*1.75, self);
			self.delay_element.innerHTML=self.delay*1.75;
			self.state_history_append(">");
		}
		rare_begin(self){
			if(self === null)self=this;
			self.delay=~~(self.extra + ((self.extra * Math.pow(1.008, Math.log(totalAtome))) / 10));
			self.delay_arr.push(self.delay);
			self.cint=setTimeout(self.inital_special, self.extra*1.5, self);
			self.delay_element.innerHTML=self.extra*1.5;
			self.state_history_append("<");
		}
		reset_delay_1(self){
			self.background_audio.muted=!self.background_audio.muted;
			self.delay_element.innerHTML=60*2*1000;
			self.cint=setTimeout(self.reset_delay_2, 60*2*1000, self);
			self.state_history_append("trigger");
		}
		reset_delay_2(self){
			self.delay_element.innerHTML=60*1000;
			self.cint=setTimeout(lightreset, 60*1000);
			self.state_history_append("reset_soon");
		}
		do_reset(self){
			if(self===null)self=this;
			self.background_audio.muted=!self.background_audio.muted;
			self.cint=setTimeout(self.reset_delay_1, 60*7*1000, self);
			self.delay_element.innerHTML=60*7*1000;
			self.state_history_append("reset_delay");
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
	function update_auto_buy_model_and_display_view(){
	};
	function char_len_of(arr){
		return arr.reduce((a,b)=>a + b.length, 0) + arr.length;
	}
	//spell:words specialsbought atomsinvest checkspec specaps noti plurials updateprogress achiSpec
	function specialclick_inject(that) {
		if (allspec[that].done == undefined) allspec[that].done = false;
		if (allspec[that].cost <= totalAtome && allspec[that].done == false) {
			doc.getElementById('specialsbought').innerHTML = rounding(++specialsbought, false,0);
			if (that == 74) {
			}
			atomsinvest += allspec[that].cost;
			doc.getElementById('atomsinvest').innerHTML = rounding(atomsinvest, false,0);
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
	function create_auto_buy_obj(){
		auto_buy_obj.init();
	}
	function on_page_is_loaded(init){
		if(init){
			var ba=document.querySelector("#background_audio");
			ba.volume=0.4;
			// ba.onloadeddata=null;
			(async function(){
				try{
					await ba.play()
				}catch(e){
					console.log("failed to play `#background_audio`, page was loaded without a user interaction(reload from devtools or F5 too)")
					window.onclick=e=>{
						window.onclick=null;
						ba.play();
					}
				}
			})();
			return;
		}
		remove_bad_dom_script_element();
		if(Pace.bar.progress == 100){
			create_auto_buy_obj();
		}else{
			let original_pace_bar_finish=Pace.bar.finish;
			Pace.bar.finish=function(){
				original_pace_bar_finish.call(this);
				create_auto_buy_obj();
			}
		}
	}
	function on_timers_moved() {
		if(typeof window._SM_Data != "undefined"){
			if(window.on_on_timers_moved_first){
				on_page_is_loaded(window.on_on_timers_moved_first);
				window.on_on_timers_moved_first=false;
			}
			remove_bad_dom_script_element();
			let delay=1000;
			if(localStorage.long_wait){
				delay=parseInt(localStorage.long_wait)/7;
				localStorage.removeItem("long_wait");
			};
			setTimeout(function(){
				on_page_is_loaded(window.on_on_timers_moved_first);
			}, delay);
			return
		}
		setTimeout(on_timers_moved, 55);
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
		let auto_buy_history_list;
		window.on_on_timers_moved_first=true;
		move_timers_to_worker().then(on_timers_moved);
		setTimeout(remove_bad_dom_script_element, 0);
		let document_write_list=new DocumentWriteList;
		document_write_list.attach_proxy(document);
		window.document_write_list=document_write_list;
	}
	document.stop=function(){};
	main();
	// Your code here...
})();
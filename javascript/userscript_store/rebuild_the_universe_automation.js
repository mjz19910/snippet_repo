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
	remove_bad_dom_script_element();
	function inject_func(){
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
		if(typeof cint != "undefined" && cint > 0){clearTimeout(cint)};
		let auto_buy_delay_arr_root;
		var n=1;
		if(localStorage.auto_buy_delay_str){
			var auto_buy_delay_tmp=localStorage.auto_buy_delay_str.split(",");
			auto_buy_delay_arr_root=auto_buy_delay_tmp.map((str)=>parseInt(str));
		}else{
			auto_buy_delay_arr_root=[2400,2400,2400,2400];
		};
		if(typeof cint_ar == "undefined"){cint_ar=[]};
		let auto_buy_history_list;
		let auto_buy_skip_save=false;
		function load_auto_buy_history(default_value){
			if(!localStorage.auto_buy_history_str)return default_value;
			let arr=localStorage.auto_buy_history_str.split(",");
			let len=1;
			while(len < arr.length){
				len <<= 1;
			}
			len >>= 1;
			len *= 1.1;
			for(let i=len;i<arr.length;i++){
				let cur_arr=arr.slice(0, i);
				let compressed_arr=compress_char_stream(cur_arr, true);
				compressed_arr=compressed_arr.slice();
				rem_len=char_len_of(compressed_arr);
				while(rem_len > auto_buy_history_calc_len*2) {
					rem_len-=compressed_arr.shift().length+1;
				}
				compressed_arr=compress_char_stream(compressed_arr, true);
				rem_len=char_len_of(compressed_arr);
				while(rem_len > auto_buy_history_calc_len*1.3) {
					rem_len-=compressed_arr.shift().length+1;
				}
				compressed_arr=compress_char_stream(compressed_arr, false);
				rem_len=char_len_of(compressed_arr);
				while(rem_len > auto_buy_history_calc_len) {
					rem_len-=compressed_arr.shift().length+1;
				}
			}
			let compressed_arr=compress_char_stream(arr, true);
			compressed_arr=compressed_arr.slice();
			rem_len=char_len_of(compressed_arr);
			while(rem_len > auto_buy_history_calc_len*2) {
				rem_len-=compressed_arr.shift().length+1;
			}
			compressed_arr=compress_char_stream(compressed_arr, true);
			rem_len=char_len_of(compressed_arr);
			while(rem_len > auto_buy_history_calc_len*1.3) {
				rem_len-=compressed_arr.shift().length+1;
			}
			compressed_arr=compress_char_stream(compressed_arr, false);
			rem_len=char_len_of(compressed_arr);
			while(rem_len > auto_buy_history_calc_len) {
				rem_len-=compressed_arr.shift().length+1;
			}
			console.log(compressed_arr.join(""));
			return arr;
		}
		function save_auto_buy_history(){
			if(auto_buy_skip_save)return;
			localStorage.auto_buy_history_str=auto_buy_history_list.join(",");
		}
		window.addEventListener('unload', function(){
			save_auto_buy_history();
		})
		const font_size_px=22;
		var run_auto_buy_step_1=function(auto_buy_delay_arr, target_fn){
			target_fn(auto_buy_delay_arr);
		};
		var log_elm=document.createElement("div");
		var time_elm=document.createElement("div");
		var auto_buy_history_element=document.createElement("div");
		var hours_elm=document.createElement("div");
		var percent_elm=document.createElement("div");
		let auto_buy_history_calc_len=Math.floor(document.body.getClientRects()[0].width/(font_size_px*0.55)/2.1);
		auto_buy_history_element.style="font-family:monospace";
		log_elm.append(auto_buy_history_element);
		log_elm.append(time_elm);
		log_elm.append(hours_elm);
		log_elm.append(percent_elm);
		log_elm.style=`
		top:0px;
		position:fixed;
		color:lightgray;
		font-size:${font_size_px}px;
		font-family:Desc;
		z-index:101;
		pointer-events: none;
		`;
		document.body.append(log_elm);
		var prev_atomepersecond=atomepersecond;
		var ratio_mult_sec=prestige;
		var pca_10sec_avg=[];//len == 80;
		var pca_1min_avg=[];//len == 6;weight=.7;
		var pca_5min_avg=[];//len == 5;weight=.15;
		var pca_30min_avg=[];//len == 6;weight=.15;
		var pca_len=5*60;
		var log_val=e=>(((Math.log2(e)/10)+1));
		window.g_pca??={};
		var g_pca=window.g_pca;
		g_pca.ratio=0;
		g_pca.arr=[];
		g_pca.history_arr=()=>auto_buy_history_list;
		function calc_ratio(arr){
			let ratio_acc=0;
			for(let i=0;i<arr.length;i++)ratio_acc+=arr[i];
			return ratio_acc/arr.length;
		}
		function ratio_arr_truncate(arr, truncate_len){
			while(arr.length > truncate_len)arr.pop();
		}
		function ratio_arr_update(arr_prev, arr_next){
			arr_next.unshift(calc_ratio(arr_prev));
		}
		function ratio_arr_update_first(arr, item){
			arr.unshift(item);
		}
		g_pca.calc_ratio=function(){
			return calc_ratio(this.arr);
		}
		{
			let val=totalAtome/atomepersecond;
			if(!Number.isFinite(val)){
				val=1;
			}
			let div=60*ratio_mult_sec*4;
			for(let i=0;i<8;i++){
				g_pca.arr.push((val/div)*.75);
			}
		}
		g_pca.update=function() {
			let val=totalAtome/atomepersecond;
			let div=60*ratio_mult_sec*4;
			let rate_changed=prev_atomepersecond != atomepersecond;
			let t=this;
			function do_ratio_update(type){
				void type;
				let cur=val/div*log_val(g_pca.arr.length);
				//console.log(type, cur, t.ratio);
				if(cur > t.ratio*2)cur+=cur/4;
				if(cur < t.ratio/2)cur-=cur/4;
				t.arr.unshift(cur);
				while(t.arr.length > pca_len) {
					t.arr.pop();
				}
				ratio_arr_update_first(pca_10sec_avg, cur);
				ratio_arr_truncate(pca_10sec_avg, 80);
				ratio_arr_update(pca_10sec_avg, pca_1min_avg);
				ratio_arr_truncate(pca_10sec_avg, 6);
				ratio_arr_update(pca_1min_avg, pca_5min_avg);
				ratio_arr_truncate(pca_10sec_avg, 5);
				ratio_arr_update(pca_5min_avg, pca_30min_avg)
				ratio_arr_truncate(pca_10sec_avg, 6);
				t.ratio=t.calc_ratio();
			}
			if(!rate_changed){
				if (Number.isFinite(val)){
					do_ratio_update('nc');
				}
				return;
			}
			let diff=prev_atomepersecond/atomepersecond;
			t.ratio*=diff;
			prev_atomepersecond=atomepersecond;
			if (Number.isFinite(val)) {
				do_ratio_update('ch');
			}
		}
		g_pca.reset=function(){
			g_pca.ratio*=0.75;
			for(var i=0;i<g_pca.arr.length;i++){
				g_pca.arr[i]*=0.75;
			}
		}
		g_pca.update();
		percent_elm.addEventListener('click',function(){
			g_pca.reset();
		});
		function auto_buy_history_element_on_click(){
			var extra=0,max=0;
			push_to_auto_buy_history(">");
			clearTimeout(cint);
			while(auto_buy_delay_arr_root.length>16){
				auto_buy_delay_arr_root.shift();
			}
			for(var i=0;i<auto_buy_delay_arr_root.length;i++){
				extra+=auto_buy_delay_arr_root[i];
				max=Math.max(auto_buy_delay_arr_root[i],max);
			};
			extra=~~(extra/auto_buy_delay_arr_root.length);
			time_elm.innerHTML=extra;
			cint=setTimeout(run_auto_buy_step_1, extra, auto_buy_delay_arr_root, auto_buy_main);
		}
		auto_buy_history_element.addEventListener('click', auto_buy_history_element_on_click);
		time_elm.innerHTML=auto_buy_delay_arr_root[0];
		class ArrayCompressor{
			run(arr, debug){
			}
			try_run_plugin(plugin){
			}
			add_plugin(description){
				this.plugins.push(description);
			}
		}
		class BaseCompressionPlugin{
			checked_compress(obj, src){
				let dst=obj.compress(src);
				return [dst.length < src.length, dst];
			}
			checked_decompress(obj, src){
				let dst=obj.decompress(src);
				return [dst.length > src.length, dst];
			}
		}
		class MulCompressionPlugin {
			static compress(arr){
				let ret=[];
				let crush_item="";
				let crush_mul_count=0;
				for (let cur_item of arr){
					if(cur_item === crush_item) {
						crush_mul_count+=1;
						continue;
					}else if(crush_item) {
						if(crush_mul_count === 1){
							ret.push(crush_item);
						}else{
							// drop it, 3 digits is too long, either there was a mistake
							// or it doesn't tell the user anything useful
							if(crush_mul_count < 99) {
								ret.push(`${crush_item}*${crush_mul_count}`);
							}
						}
						crush_item=cur_item;
						crush_mul_count=1;
					}else{
						crush_item=cur_item;
						crush_mul_count=1;
					}
				}
				if(crush_mul_count === 1){
					ret.push(crush_item);
				}else if(crush_mul_count > 0){
					if(crush_mul_count < 99){
						ret.push(`${crush_item}*${crush_mul_count}`);
					}
				}
				return ret;
			}
			static decompress(arr){
				let ret=[];
				let item, times;
				for (let cur_item of arr){
					if(cur_item.includes("*")){
						[item, times]=cur_item.split("*");
						while(times > 0){
							ret.push(item);
							times--;
						}
					}else{
						ret.push(cur_item);
					}
				}
				return ret;
			}
		}
		class GroupCompressionPlugin {
			constructor(seq_arr){
				this.seq_arr=seq_arr;
				this.replacement_item=seq_arr.join("");
				this.parity_reversed_item=seq_arr.reverse().join("");
				console.assert(this.seq_arr.length === 2, "seq arr with any length not supported, please use a 2 item seq_arr");
				console.assert(this.seq_arr[0].length === 1, "should this be supported, not yet");
				console.assert(this.seq_arr.reduce((a,b)=>a+b.length, 0) === 2, "seq_arr items (assumed that any item is a string) sum up to the expected length... length is ", this.seq_arr.reduce((a,b)=>a+b.length, 0));
				console.assert(this.replacement_item.length === this.seq_arr.length, "this compression must be reversable, ensure the number of seq items is equal to the replacement_item's length");
				console.assert("string" === typeof this.replacement_item, "type is", typeof this.replacement_item);
				console.assert(this.seq_arr instanceof Array, "seq_arr is not instanceof Array", this.seq_arr);
			}
			get_item_for_parity(parity){
				return parity?this.parity_reversed_item:this.replacement_item;
			}
			parity_invert(parity){
				return parity?0:1;
			}
			compress(arr, parity=0){
				let ret=[];
				const item_1=this.seq_arr[parity];
				const item_2=this.seq_arr[this.parity_invert(parity)];
				const replacement=this.get_item_for_parity(parity);
				for(let i=0;i<arr.length;i++){
					if(i+1<arr.length && item_1 == arr[i] && item_2 == arr[i+1]) {
						ret.push(replacement);
						i++;
						continue;
					}
					ret.push(arr[i]);
				}
				return ret;
			}
			decompress(arr, parity){
				let ret=[];
				const item_1=this.seq_arr[parity];
				const item_2=this.seq_arr[this.parity_invert(parity)];
				const needle=this.get_item_for_parity(parity);
				for(let cur of arr){
					if(cur === needle){
						ret.push(item_1, item_2);
						continue;
					}
					ret.push(cur);
				}
				return ret;
			}
		}
		class OptimizeCompressionPlugin extends BaseCompressionPlugin {
			constructor(crushers){
				super();
				this.crushers=crushers;
				this.counts=null;
				this.groups=[];
			}
			inc_index(index){
				if(!this.counts[index])this.counts[index]=0;
				this.counts[index]++;
			}
			add_item(item){
				let index=this.groups.indexOf(item)
				if(index == -1)index=this.groups.push(item);
				this.inc_index(index);
			}
			compress(arr){
				this.counts=[];
				arr=MulCompressionPlugin.decompress(arr);
				let res=[];
				//["+","+-"]
				for(let i=0;i<arr.length;i++){
					let opt_item=null;
					if(i+1 < arr.length){
						if(arr[i] == "+" && arr[i+1] == "+-")opt_item=["+", "+", "-"];
						if(arr[i] == "-" && arr[i+1] == "-+")opt_item=["-", "-", "+"];
						if(arr[i] == "+-" && arr[i+1] == "-")opt_item=["+", "-", "-"];
						if(arr[i] == "-+" && arr[i+1] == "+")opt_item=["-", "+", "+"];
						if(arr[i] == "<" && arr[i+1] == ">")opt_item=["<>"];
						if(opt_item){
							res.push(...opt_item);
							if(opt_item.length < 2){
								i+=2-opt_item.length;
							}
							continue;
						}
					}else{
						let last=res.pop();
						res.push(last, arr[i]);
						continue;
					}
					res.push(arr[i]);
				}
				arr=res;
				for(let i=0;i<arr.length;i++){
					if(i+1 < arr.length){
						if(arr[i] == "+" && arr[i+1] == "-+"){
							debugger;
						}
						if(arr[i] == "-" && arr[i+1] == "+-"){
							debugger;
						}
					}
				}
				arr=MulCompressionPlugin.compress(arr);
				this.counts=[];
				for(let i=0;i<arr.length;i++){
					if(i+1 < arr.length){
						if(arr[i] != arr[i+1]){
							this.add_item([arr[i], arr[i+1]].join(","));
						}
					}
				}
				console.log(this.counts.map(function(e, i){return [this[i], e]}, this.groups).filter(([e, j])=>j>1).sort(([,a], [,b])=>b-a).slice(0, 16));
				return arr;
			}
			decompress(arr){
				arr=MulCompressionPlugin.decompress(arr);
				let res=[];
				for(let item of arr){
					if(item == "<>"){
						res.push("<",">");
						continue;
					}
					res.push(item);
				}
				arr=MulCompressionPlugin.compress(res);
				return arr;
			}
		}
		class CompressionPluginProxy {
			constructor(target, target_arg){
				this.target_arg=target_arg;
				this.target=target;
			}
			compress(arr){
				return this.target.compress(arr, this.target_arg);
			}
			decompress(arr){
				return this.target.decompress(arr, this.target_arg);
			}
		}
		function compress_char_stream(array_to_compress, disable_debug){
			const debug_compression=true && !disable_debug;
			const debug_decompression=false && !disable_debug;
			let crush_common_rate_change=new GroupCompressionPlugin(["+", "-"]);
			let compression_optimizer=new OptimizeCompressionPlugin([
				new CompressionPluginProxy(crush_common_rate_change, 0),
				new CompressionPluginProxy(crush_common_rate_change, 1)
			]);
			let start_array_len=char_len_of(array_to_compress);
			const common_compression_types=[
				['plugin_sequence',[
					['plugin', [MulCompressionPlugin]],
					['plugin', [crush_common_rate_change, 0]],
					['plugin', [MulCompressionPlugin]],
					['plugin', [compression_optimizer]]
				]],
				['plugin_sequence',[
					['plugin', [MulCompressionPlugin]],
					['plugin', [crush_common_rate_change, 1]],
					['plugin', [MulCompressionPlugin]],
					['plugin', [compression_optimizer]]
				]],
				['plugin_sequence',[
					['plugin', [crush_common_rate_change, 0]],
					['plugin', [MulCompressionPlugin]],
					['plugin', [crush_common_rate_change, 0]],
					['plugin', [MulCompressionPlugin]],
					['plugin', [compression_optimizer]]
				]],
				['plugin_sequence',[
					['plugin', [crush_common_rate_change, 0]],
					['plugin', [MulCompressionPlugin]],
					['plugin', [crush_common_rate_change, 1]],
					['plugin', [compression_optimizer]]
				]],
				['plugin_sequence',[
					['plugin', [crush_common_rate_change, 0]],
					['plugin', [MulCompressionPlugin]],
					['plugin', [crush_common_rate_change, 0]],
					['plugin', [compression_optimizer]]
				]],
				['plugin_sequence',[
					['plugin', [crush_common_rate_change, 0]],
					['plugin', [MulCompressionPlugin]],
					['plugin', [compression_optimizer]]
				]],
				['plugin_sequence',[
					['plugin', [crush_common_rate_change, 1]],
					['plugin', [MulCompressionPlugin]],
					['plugin', [compression_optimizer]]
				]],
				['plugin_sequence',[
					['plugin', [MulCompressionPlugin]],
					['plugin', [crush_common_rate_change, 0]],
					['plugin', [compression_optimizer]]
				]],
				['plugin_sequence',[
					['plugin', [MulCompressionPlugin]],
					['plugin', [crush_common_rate_change, 1]],
					['plugin', [compression_optimizer]]
				]],
				['plugin_sequence',[
					['plugin', [crush_common_rate_change, 0]],
					['plugin', [crush_common_rate_change, 1]],
					['plugin', [compression_optimizer]]
				]],
				['plugin_sequence',[
					['plugin', [crush_common_rate_change, 1]],
					['plugin', [crush_common_rate_change, 0]],
					['plugin', [compression_optimizer]]
				]],
				['plugin', [MulCompressionPlugin]],
				['plugin', [crush_common_rate_change, 0]],
				['plugin', [crush_common_rate_change, 1]]
			];
			function checked_decompress(src, dst){
				return [dst.length > src.length, dst];
			}
			function try_decompress_with_plugin(arr, arg){
				let [obj, plugin_arg]=arg;
				return checked_decompress(arr, obj.decompress(arr, plugin_arg));
			}
			function try_to_decompress(arr, arg){
				let [decompression_mode, arg_for_mode]=arg;
				if(decompression_mode === 'plugin')return try_decompress_with_plugin(arr, arg_for_mode);
				if(decompression_mode === 'plugin_sequence'){
					let res;
					let any_success = false;
					let cur=arr;
					for (let i=arg_for_mode.length-1;i>=0;i--){
						let cur_plugin=arg_for_mode[i];
						[success, res]=try_to_decompress(cur, cur_plugin);
						if(success)any_success=true;
						cur=res;
					}
					if(any_success){
						return [true, res];
					}else{
						return [false, res];
					}
				}
				return [false, arr];
			}
			function decompress_arr(arr) {
				let decompression_plugins=[
					...common_compression_types
				];
				let decompression_results=[];
				for(let i=0;i<decompression_plugins.length;i++){
					let cur_type=decompression_plugins[i];
					let [success, cur_compress]=try_to_decompress(arr, cur_type);
					if(success)decompression_results.push(cur_compress);
				}
				if(debug_decompression)console.log(decompression_results.length);
				if(decompression_results.length > 0){
					let max_len=decompression_results[0].length;
					let max_result=decompression_results[0];
					for(let i=1;i<decompression_results.length;i++){
						let cur_result=decompression_results[i];
						if(cur_result.length > max_len){
							max_result=cur_result;
							max_len=cur_result.length;
						}
					}
					return max_result;
				}
				return arr;
			}
			function checked_compress(src, dst){
				if(dst.length < src.length){
					return [true, dst];
				}
				return [false, dst];
			}
			function try_compress_with_plugin(arr, arg){
				let [obj, plugin_arg]=arg;
				return checked_compress(arr, obj.compress(arr, plugin_arg));
			}
			function try_to_compress(arr, compress_mode, arg) {
				if(compress_mode === 'plugin')return try_compress_with_plugin(arr, arg);
				if(compress_mode === 'plugin_sequence'){
					let res, any_success = false;
					let cur=arr;
					for (let cur_plugin of arg){
						[success, res]=try_to_compress(cur, cur_plugin[0], cur_plugin[1]);
						if(success){
							any_success=true;
						}
						cur=res;
					}
					if(any_success){
						return [true, res];
					}
				}
				return [false, arr];
			}
			function compress_arr(arr){
				let compression_types=[
					...common_compression_types
				];
				let compressed_results=[arr];
				for(let i=0;i<compression_types.length;i++){
					let cur_type=compression_types[i];
					let [is_smaller, cur_compress]=try_to_compress(arr, cur_type[0], cur_type[1]);
					if(is_smaller)compressed_results.push(cur_compress);
				}
				let min_length=Number.MAX_SAFE_INTEGER;
				let min_result=null;
				for(let result of compressed_results){
					let len=result.length;
					if(len < min_length){
						min_result=result;
						min_length=len;
					}
				}
				if(debug_compression){
					if(min_result.length <= 9){
						console.log(`%c${compressed_results.length} ${compressed_results.indexOf(min_result)} ${min_result.length}`, "color:hsl(252deg 100% 75%);");
					}else{
						let calc_len=min_result.length;
						let calc_cnt=0;
						while(calc_len > 9){
							calc_len>>=1;
							calc_cnt++;
						}
						let fmt_str=`%c${compressed_results.length}%c %c${compressed_results.indexOf(min_result)}%c %c2^${calc_cnt}%c`;
						let need_cnt=fmt_str.split("%c").length-1;
						let css_template=["color:hsl(252deg 100% 75%)", ""];
						let css_arr=[];
						while(css_arr.length < need_cnt){
							css_arr.push(...css_template);
						}
						console.log(fmt_str, ...css_arr);
					}
				}
				return min_result;
			}
			let decompressed_arr=decompress_arr(array_to_compress);
			let compressed_arr=compress_arr(decompressed_arr);
			if(char_len_of(compressed_arr) > start_array_len)return array_to_compress;
			return compressed_arr;
		}
		var timer=Date.now();
		function update_auto_buy_model_and_display_view(){
			// spell:words timeplayed
			hours_elm.innerHTML=((timeplayed / 30) / 60).toFixed(3) + " hours";
			g_pca.update();
			percent_elm.innerHTML=(g_pca.ratio*100).toFixed(2)+"%";
			let compressed_arr=compress_char_stream(auto_buy_history_list, true);
			auto_buy_history_list=compressed_arr;
			compressed_arr=compressed_arr.slice();
			rem_len=char_len_of(compressed_arr);
			while(rem_len > auto_buy_history_calc_len*2) {
				rem_len-=compressed_arr.shift().length+1;
			}
			compressed_arr=compress_char_stream(compressed_arr, true);
			rem_len=char_len_of(compressed_arr);
			while(rem_len > auto_buy_history_calc_len*1.3) {
				rem_len-=compressed_arr.shift().length+1;
			}
			compressed_arr=compress_char_stream(compressed_arr, true);
			rem_len=char_len_of(compressed_arr);
			while(rem_len > auto_buy_history_calc_len) {
				rem_len-=compressed_arr.shift().length+1;
			}
			auto_buy_history_element.innerHTML=compressed_arr.join(" ");
			cint_dom=setTimeout(update_auto_buy_model_and_display_view, 125);
		};
		function char_len_of(arr){
			return arr.reduce((a,b)=>a + b.length, 0) + arr.length;
		}
		function push_to_auto_buy_history(item){
			auto_buy_history_list.push(item);
			if(auto_buy_history_list.length>300){
				auto_buy_history_list.shift();
			}
			async function async_compress(){
				let compressed_arr=compress_char_stream(auto_buy_history_list, false);
				auto_buy_history_list=compressed_arr;
			}
			Promise.resolve().then(async_compress);
		}
		function rare_do_other_tabs(auto_buy_delay_arr, delay, extra){
			function fast_auto_buy_unit_delay(){
				cint=setTimeout(fast_auto_buy_unit, extra/1.9);
				time_elm.innerHTML=extra/1.9;
				push_to_auto_buy_history(":");
			};
			function slow_auto_buy_final(){
				let extra_new=extra * 2 / 3;
				let delay_new=delay/4;
				let next_delay=delay_new + extra_new;
				cint=setTimeout(run_auto_buy_step_1, next_delay, auto_buy_delay_arr, auto_buy_main);
				time_elm.innerHTML=next_delay;
				push_to_auto_buy_history("$");
			};
			function fast_auto_buy_unit(){
				pre_total=totalAtome;
				do_auto_unit_promote();
				if(pre_total == totalAtome)slow_auto_buy_final();
				else fast_auto_buy_unit_delay();
			};
			function auto_buy_bonus(){
				bonusAll();
				fast_auto_buy_unit_delay()
			}
			function special_auto_buy_delay(e){
				time_elm.innerHTML=delay*1.75;
				cint=setTimeout(special_auto_buy, delay*1.75);
				push_to_auto_buy_history("^");
			}
			function is_special_done(c){
				return !c.done && c.cost < totalAtome;
			}
			function do_special_auto_buy(){
				let ret=false;
				//spell:words allspec specialclick
				while(true){
					let index=allspec.findIndex(is_special_done)
					if(index == -1){
						break;
					}
					specialclick(index);
					ret = true;
				}
				return ret;
			}
			function auto_buy_bonus_delay(){
				cint=setTimeout(auto_buy_bonus, delay*1.75);
				time_elm.innerHTML=delay*1.75;
				push_to_auto_buy_history("#");
			}
			function special_auto_buy(){
				if(do_special_auto_buy())special_auto_buy_delay();
				else auto_buy_bonus_delay();
			}
			function inital_special_auto_buy(){
				cint=setTimeout(special_auto_buy, delay*1.75);
				time_elm.innerHTML=delay*1.75;
				push_to_auto_buy_history(">");
			}
			function auto_buy_other_tabs_start(){
				cint=setTimeout(inital_special_auto_buy, extra*1.5);
				time_elm.innerHTML=extra*1.5;
				push_to_auto_buy_history("<");
			}
			auto_buy_other_tabs_start();
		}
		function auto_buy_main(auto_buy_delay_arr){
			var delay;
			var max=0;
			var hit=auto_buy_delay_arr.length > 16;
			var promise_obj=Promise.resolve(auto_buy_delay_arr);
			var promise_callback=function(e){
				while(auto_buy_delay_arr.length>16){
					auto_buy_delay_arr.shift();
				};
				return e;
			}
			if(hit){
				promise_obj.then(promise_callback);
			}
			var extra=0;
			for(var i=0;i<auto_buy_delay_arr.length;i++){
				extra+=auto_buy_delay_arr[i];
				max=Math.max(auto_buy_delay_arr[i], max);
			};
			extra=~~(extra/auto_buy_delay_arr.length);
			var pre_total=totalAtome;
			do_auto_unit_promote();
			if((atomepersecond/totalAtome) < 0.005){auto_buy_delay_arr.push(extra/1.01)}
			if(g_pca.ratio > 1 && auto_buy_history_list.length > 80){
				//a_elm.muted=!a_elm.muted
				setTimeout(function(){
					push_to_auto_buy_history("trigger");
					//a_elm.muted=!a_elm.muted
					setTimeout(function(){
						push_to_auto_buy_history("reset_soon");
						cint=setTimeout(lightreset,60*1000)
						time_elm.innerHTML=60*1000;
					},60*2*1000)
					time_elm.innerHTML=60*2*1000;
				},60*7*1000);
				time_elm.innerHTML=60*7*1000;
				push_to_auto_buy_history("reset_delay");
				return
			}
			if(pre_total != totalAtome){
				n+=1;
				time_elm.innerHTML=extra;
				cint=setTimeout(auto_buy_main, extra, auto_buy_delay_arr);
				if(n>16){
					delay=~~(extra-((extra*Math.pow(1.007,Math.log(totalAtome)))/10)*Math.pow(1.05,n/2));
					if(delay < 50){
						delay=50;
					}
					push_to_auto_buy_history("!");
				}else{
					delay=~~(extra-((extra*Math.pow(1.006,Math.log(totalAtome)))/10)*Math.pow(1.05,n/2));
					push_to_auto_buy_history("-");
				};
				auto_buy_delay_arr.push(delay);
				return
			};
			n=0;
			if(Math.random()<0.05){
				delay=~~(extra + ((extra * Math.pow(1.008, Math.log(totalAtome))) / 10));
				auto_buy_delay_arr.push(delay);
				rare_do_other_tabs(auto_buy_delay_arr, delay, extra);
				return;
			}
			delay=~~(extra+((extra*Math.pow(1.008,Math.log(totalAtome)))/16));
			auto_buy_delay_arr.push(delay);
			cint=setTimeout(auto_buy_main, extra, auto_buy_delay_arr);
			time_elm.innerHTML=extra;
			push_to_auto_buy_history("+");
		};
		auto_buy_history_list=load_auto_buy_history(["S"]);
		update_auto_buy_model_and_display_view();
		run_auto_buy_step_1(auto_buy_delay_arr_root, auto_buy_main);
		//spell:words specialsbought atomsinvest checkspec specaps noti plurials updateprogress achiSpec
		function specialclick(that) {
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
		function inject_game_model_update(){
			lightreset=new Proxy(lightreset,{
				apply(proxy_function, proxy_this, proxy_apply_args){
					auto_buy_history_list=["R"];
					localStorage.auto_buy_history_str="R";
					auto_buy_skip_save=true;
					window.onunload=function(){
						auto_buy_skip_save=false;
						localStorage.auto_buy_delay_str="300,300,300,300";
						localStorage.long_wait=12000;
					}
					return Reflect.apply(proxy_function, proxy_this, proxy_apply_args);
				}
			});
			window.specialclick=specialclick;
		}
		setTimeout(inject_game_model_update, 200);
		window.onunload=function(){
			if(localStorage.auto_buy_forced_action == "RESET"){
				localStorage.auto_buy_delay_str=auto_buy_delay_arr_root.map(e=>~~(e/4)).join(",");
				return;
			}
			localStorage.auto_buy_delay_str=auto_buy_delay_arr_root.join(",");
		}
	}
	(function(){
		var prev_node_prototype_insertBefore=Node.prototype.insertBefore;
		var dom_add_elm_filter=function(elm){
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
		document.addEventListener('onContentLoaded', remove_bad_dom_script_element);
		Node.prototype.insertBefore=function(element_to_insert, element_reference, ...rest){
			console.assert(rest.length === 0, "unexpected arguments for overwritten Node.prototype.insertBefore");
			let should_insert_1=dom_add_elm_filter(element_to_insert);
			if(!should_insert_1)return element_to_insert;
			let should_insert_2=dom_add_elm_filter(element_reference);
			if(!should_insert_2)return element_to_insert;
			return prev_node_prototype_insertBefore.call(this, element_to_insert, element_reference);
		}
	})();
	{
		adsbygoogle=[];
		adsbygoogle.op=adsbygoogle.push;
		adsbygoogle.push=function(e){
			adsbygoogle.op(e);
			remove_bad_dom_script_element();
		};
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
			inject_func();
		}else{
			let original_pace_bar_finish=Pace.bar.finish;
			Pace.bar.finish=function(){
				original_pace_bar_finish.call(this);
				inject_func();
			}
		}
	}
	let first = true;
	function on_timers_moved(){
		if(typeof window._SM_Data != "undefined"){
			if(first){
				on_page_is_loaded(first);
				first=false;
			}
			remove_bad_dom_script_element();
			let delay=1000;
			if(localStorage.long_wait){
				delay=parseInt(localStorage.long_wait)/7;
				localStorage.removeItem("long_wait");
			};
			setTimeout(function(){
				on_page_is_loaded(first);
			}, delay);
			return
		}
		setTimeout(on_timers_moved, 55);
	}
	move_timers_to_worker().then(on_timers_moved);
	document.stop=function(){};
	setTimeout(function(){
		remove_bad_dom_script_element();
	},0);
	let document_write_list=new DocumentWriteList;
	document_write_list.attach_proxy(document);
	window.document_write_list=document_write_list;
	// Your code here...
})();
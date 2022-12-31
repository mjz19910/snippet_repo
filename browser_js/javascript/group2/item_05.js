
/** @template U @template {U} T @arg {U} e @returns {T} */
function as_cast(e) {
	/** @type {any} */
	let x=e;
	return x;
}

function main() {
	"use strict";
	let str="40580802070e1e0b010c1c1b021a480a0701141d4b571f080a0c581c01092a1a410d0b190a541406580b02074b1c5f0f1b04380410001c1c43450a130b0c4a0b1416531c5a1526190e0417081c031b544d19140a0e00000758574d4f5b0c14250c06091d100a01544d0c18";
	/** @param {string | any[]} str @param {number} len */
	function chunk_str(str,len) {
		let res=[];
		for(let cur,i=0;i<str.length;) {
			cur=str.slice(i,i+=len);
			res.push(cur);
		}
		return res;
	}
	chunk_str(str,2);
	window.buffer_vec=new ArrayBuffer(8);
	window.float_32_vec=new Float32Array(window.buffer_vec);
	window.uint8_vec=new Uint8Array(window.buffer_vec);
	let f32_diff=new Float32Array(1);
	let u8_data=new Uint8Array(f32_diff.buffer); u8_data;
	/** @type {number[]} */
	let long_tick_log=[];
	/** @param {number} num */
	function ceil_near(num) {
		return Math.ceil(num*10)/10;
	}
	/** @param {number} num */
	function round_near(num) {
		return Math.round(num*10)/10;
	}
	/** @param {number} num */
	function floor_near(num) {
		return Math.floor(num*10)/10;
	}
	/** @param {any} num */
	function math_near(num) {
		let ret=[];
		ret.push(floor_near(num).toFixed(1));
		ret.push(round_near(num).toFixed(1));
		ret.push(ceil_near(num).toFixed(1));
		return ret;
	}
	math_near;
	/** @param {{ postMessage: { bind: (arg0: any) => any; }; onmessage: (e: any) => void; }} g */
	function worker_scope(g) {
		"use strict";
		let post_message=g.postMessage.bind(g);
		function get_next_performance_time() {
			let performance_start;
			let performance_end;
			performance_end=performance_start=performance.now();
			while(performance_start===performance_end) {
				performance_end=performance.now();
			}
			return performance_end-performance_start;
		}
		class BaseWorkProcessor {
			count=0;
			last_index=-1;
			start_index=-1;
			/** @type {number[]}
			 */
			result_vec=[];
			/** @type {number[]}
			 */
			overflow_vec=[];
			constructor() {
				this.result_vec[0]=1;
			}
			/** @param {number} start_index
			 */
			set_start_index(start_index) {
				if(this.start_index===-1) {
					this.start_index=start_index;
					this.last_index=start_index;
				} else {
					this.last_index=this.start_index;
					this.start_index=start_index;
				}
			}
			init() {
				let count=0;
				while(count<2000) {
					count++;
					let min_diff=get_next_performance_time();
					if(min_diff<this.result_vec[0]) {
						this.result_vec[0]=min_diff;
					}
					if(this.result_vec[0]<0.1) {
						break;
					}
				}
				this.count=count;
			}
			process() {
				this.count=0;
				let state={};
				void state;
				let range_f64=new Float64Array(3);
				let count=0;
				let start_value=this.result_vec[this.start_index];
				let skip_value=0.10000109536743164;
				let start_is_even=!!(this.start_index%2);
				let process_result=start_value+skip_value;
				let overflow_result=start_value+0.13;
				range_f64[1]=start_value;
				range_f64[2]=process_result;
				for(;count<32;) {
					range_f64[0]++;
					let min_diff=this.next_larger_perf_time(range_f64);
					if(min_diff>range_f64[2]&&min_diff<overflow_result) {
						console.log('strange',min_diff,min_diff-start_value);
					}
					if(min_diff>=range_f64[2]) {
						continue;
					}
					count++;
					if(min_diff<process_result) {
						let diff=min_diff-start_value;
						console.log('p1',this.start_index,count,start_is_even,min_diff,process_result-min_diff,diff);
						process_result=min_diff;
						if(diff<1e-6) {
							break;
						}
					}
				}
				this.count+=count;
				this.count+=range_f64[0];
				this.result_vec[this.start_index+1]=process_result;
				console.log('pd',this.start_index,count,process_result,start_value);
			}
			/** @param {Float64Array | number[]} range_f64
			 */
			next_larger_perf_time(range_f64) {
				for(;;) {
					let min_diff=get_next_performance_time();
					if(min_diff<=range_f64[1]) {
						continue;
					}
					return min_diff;
				}
			}
		}
		class WorkProcessor extends BaseWorkProcessor {
			/** @type {{type: string;unhandled: boolean;data_vec: number[]}|null} */
			message=null;
			/** @type {{type: "response";response?:{detail?: {};error?: {}|null;type: "unset";count?: number;overflow_vec?: {}[];result_vec:{}[]};source: {}}|null} */
			reply=null;
			/** @param {null} message
			 */
			set_message(message) {
				this.message=message;
			}
			run() {
				if(this.message===null) {
					throw new Error('worker thread panicked at "this.message is null"');
				}
				let run_type=this.message.type;
				this.reply={
					type: 'response',
					source: run_type
				};
				switch(run_type) {
					case 'init':
						this.create_init_response();
						this.init();
						break;
					case 'process':
						this.create_process_response();
						this.set_start_index(this.message.data_vec[0]);
						this.process();
						break;
					case 'shutdown':
						break;
					default:
						this.message.unhandled=true;
						post_message(this.message);
				}
				this.post_reply();
			}
			/** @override */
			init() {
				super.init();
				if(!this.reply?.response) throw 1;
				this.reply.response.result_vec=this.result_vec;
				this.report_reply({
					type: 'success'
				});
			}
			create_init_response() {
				if(!this.reply) throw 1;
				this.reply.response={
					type: 'unset',
					result_vec: this.result_vec
				};
			}
			create_process_response() {
				if(!this.reply) throw 1;
				this.reply.response={
					type: 'unset',
					result_vec: this.result_vec,
					overflow_vec: this.overflow_vec
				};
			}
			/** @override */
			process() {
				try {
					super.process();
					this.report_reply({
						type: 'success'
					});
				} catch(error) {
					this.report_reply({
						type: 'failure',
						error
					});
				}
			}
			post_reply() {
				post_message(this.reply);
				this.reset();
			}
			/** @param {{ type: any; error?: any; }} report_object
			 */
			report_reply(report_object) {
				if(!this.reply?.response) throw 1;
				this.reply.response.count=this.count;
				this.reply.response.type=report_object.type;
				switch(report_object.type) {
					case 'success':
						this.on_success();
						this.reply.response.error=null;
						break;
					case 'failure':
						this.on_failure();
						this.reply.response.error=report_object.error;
						break;
					default:
						this.reply.response.detail=report_object;
				}
			}
			log_level_vec=['error','warning','info','debug','trace'];
			log_level='debug';
			/** @param {string | undefined} [error]
			 */
			on_failure(error) {
				if(this.log_level==='debug') {
					let last=this.overflow_vec.at(-1);
					if(!last) {
						post_message({
							type: 'console-worker-log',
							data_vec: ['failure '+error,null],
						});
						return;
					}
					post_message({
						type: 'console-worker-log',
						data_vec: ['failure '+error,Math.round(last*100)/100]
					});
				}
			}
			on_success() {}
			reset() {
				this.message=null;
				this.reply=null;
			}
		}
		let work_processor=new WorkProcessor;
		g.onmessage=function(/** @type {{ data: any; }} */ e) {
			let user_message=e.data;
			work_processor.set_message(user_message);
			work_processor.run();
		};
	}
	/** @type {number[]} */
	let min_arr=[];
	class IntervalClock {
		timeout_id=-1;
		handler_map=new Map;
		/** @param {{ on_tick: () => void; }} self
		 */
		static on_interval(self) {
			self.on_tick();
		}
		on_tick() {
			let tick_handler=this.handler_map.get('tick');
			tick_handler();
		}
		get_delay() {
			return this.delay;
		}
		/** @param {any} delay
		 */
		set_delay(delay) {
			this.delay=delay;
		}
		//cspell:words set_handler_fptr fptr
		/** @template T,U @param {string} type @arg {{ptr: T,data: U}} fptr
		 */
		set_handler_fptr(type,fptr) {
			this.handler_map.set(type,fptr);
		}
		/** @param {any} type @param {any} fptr
		 */
		delete_handler(type,fptr) {
			if(this.timeout_id!==-1) {
				throw new Error('panic clock timeout running');
			}
			if(!this.handler_map.has(type)) {
				throw new Error('panic no fptr to delete');
			}
			let current_handler=this.handler_map.get(type);
			if(current_handler!==fptr) {
				throw new Error('panic fptr does not match');
			}
			this.handler_map.delete(type);
		}
		start() {
			if(this.timeout_id>-1) {
				this.stop();
			}
			if(!this.handler_map.has('tick')) {
				throw new Error('panic no tick handler fptr');
			}
			let fptr=this.handler_map.get('tick');
			this.timeout_id=setInterval(fptr.ptr,this.delay,fptr.data);
		}
		stop() {
			clearInterval(this.timeout_id);
			this.timeout_id=-1;
		}
	}
	/** @param {any} type @param {any[]} data_vec */
	function worker_message_factory(type,data_vec) {
		return {
			type,
			data_vec
		};
	}
	class RemoteWorkerModel {
		constructor() {
			let wk_fn=worker_scope.toString();
			let blob_arr=[];
			blob_arr.push(wk_fn);
			blob_arr.push('\n');
			blob_arr.push('function main()');
			blob_arr.push('{}'[0]);
			blob_arr.push('\n');
			blob_arr.push('let g;');
			blob_arr.push('\n');
			blob_arr.push(`(g=globalThis).postMessage({type:'start'});`);
			blob_arr.push('\n');
			blob_arr.push('worker_scope(g);');
			blob_arr.push('\n');
			blob_arr.push('{}'[1]);
			blob_arr.push('\n');
			blob_arr.push('main();');
			blob_arr.push('\n');
			blob_arr.push('//','#',' ','sourceURL','=');
			blob_arr.push('snippet://worker/worker_scope.js');
			var blob=new Blob(blob_arr,{
				type: "text/javascript"
			});
			this.worker_url=window.URL.createObjectURL(blob);
			this.inner=new Worker(this.worker_url);
			this.inner.onmessage=this.message_event_handler.bind(this);
			window.__worker=this.inner;
			this.handler_map=new Map;
		}
		/** @param {any} user_message
		 */
		on_response(user_message) {
			user_message;
			let can_not_handle=worker_state.is_not_handled();
			let response={};
			let source={};
			if(response!==void 0&&can_not_handle) {
				console.log('response',source,response);
			} else if(can_not_handle) {
				console.log('response',source);
			} else if(response!==void 0) {
				worker_state.do_accept(response);
			} else {
				worker_state.do_accept();
			}
		}
		/** @param {{ data: any; }} event
		 */
		message_event_handler(event) {
			let user_message=event.data;
			switch(user_message.type) {
				case 'start':
					// worker -> main
					URL.revokeObjectURL(this.worker_url);
					let start_handler=this.handler_map.get('start');
					start_handler?.();
					break;
				case 'response':
					// main -> worker -> main
					let response_handler=this.handler_map.get('response');
					response_handler(user_message);
					break;
				case 'failure':
					let failure_handler=this.handler_map.get('failure');
					failure_handler(user_message);
					break;
				case 'console-worker-log':
					// ! -> worker -> main
					console.log(...user_message.data_vec);
					break;
				default:
					console.log("Received",user_message.data);
			}
		}
		terminate_worker() {
			this.inner.terminate();
		}
		/** @param {string} type @param {undefined[]} data_vec
		 */
		send_request(type,...data_vec) {
			this.inner.postMessage(worker_message_factory(type,data_vec));
		}
		send_init_request() {
			this.send_request('init');
		}
		send_shutdown_request() {
			this.send_request('shutdown');
		}
		/** @param {any} index
		 */
		send_process_request(index) {
			this.send_request('process',index);
		}
		/** @param {string} key @param {{ (): void; (user_message: { source: any; response: any; }): void; (user_message: any): void; }} handler
		 */
		set_handler(key,handler) {
			this.handler_map.set(key,handler);
		}
	}
	class WorkerStateModel {
		clock=new IntervalClock;
		running=false;
		/** @type {{ (v: any): void; tag: {}}|null} */
		accept=null;
		/** @type {((r: any)=>void)|null} */
		reject=null;
		constructor() {
			this.set_timeout_delay(10*1000);
			this.remote_worker=new RemoteWorkerModel();
			this.remote_worker.set_handler('start',this.on_start.bind(this));
			this.remote_worker.set_handler('response',as_cast(this.on_response.bind(this)));
			this.remote_worker.set_handler('failure',as_cast(this.on_failure.bind(this)));
		}
		/** @param {any} user_message
		 */
		on_failure(user_message) {
			this.do_reject(user_message);
		}
		/** @param {{ source: any; response: any; }} user_message
		 */
		on_response(user_message) {
			switch(user_message.source) {
				case 'init':
					this.do_accept(user_message.response);
					break;
				case 'process':
					this.do_accept(user_message.response);
					break;
				case 'shutdown':
					this.do_accept();
					break;
				case 'break':
					break;
				default:
					console.log(user_message);
					break;
			}
		}
		attach_worker() {}
		/** @param {{ tag: any; }} accept @param {any} tag
		 */
		maybe_tag_promise_resolver(accept,tag) {
			if(this.tag_promise_resolver) {
				accept.tag=tag;
			}
		}
		/** @param {WorkerStateModel} self @param {any} accept @param {any} reject
		 */
		static init_request_executor(self,accept,reject) {
			self.remote_worker.send_init_request();
			self.maybe_tag_promise_resolver(accept,'init');
			self.reset(accept,reject);
		}
		request_init() {
			return this.into_async(WorkerStateModel.init_request_executor,this,0);
		}
		/** @param {WorkerStateModel} self @param {any} accept @param {any} reject
		 */
		static shutdown_request_executor(self,accept,reject) {
			self.remote_worker.send_shutdown_request();
			self.maybe_tag_promise_resolver(accept,'shutdown');
			self.reset(accept,reject);
		}
		request_shutdown() {
			return this.into_async(WorkerStateModel.shutdown_request_executor,this,0);
		}
		terminate() {
			this.running=false;
			this.clock.stop();
			this.remote_worker.terminate_worker();
		}
		/** @param {WorkerStateModel} self @param {any} index @param {any} accept @param {any} reject
		 */
		static process_request_executor(self,index,accept,reject) {
			self.last_process=performance.now();
			self.remote_worker.send_process_request(index);
			self.maybe_tag_promise_resolver(accept,'process');
			self.reset(accept,reject);
		}
		/** @arg {typeof WorkerStateModel['process_request_executor']} promise_executor @param {[this,number]} argument_vec @returns {Promise<BaseWorkProcessorType>}
		 */
		into_async(promise_executor,...argument_vec) {
			return new Promise(promise_executor.bind(null,...argument_vec));
		}
		/** @param {any} index
		 */
		request_process(index) {
			return this.into_async(WorkerStateModel.process_request_executor,this,index);
		}
		is_not_handled() {
			return this.accept===null||this.reject===null;
		}
		reset(accept=null,reject=null) {
			this.accept=accept;
			this.reject=reject;
		}
		tag_promise_resolver=false;
		log_resolver_tags=true;
		/** @param {any} reason
		 */
		do_reject(reason) {
			if(!this.accept) throw 1;
			if(!this.reject) throw 1;
			if(this.tag_promise_resolver&&this.log_resolver_tags) {
				console.log('rj tag',this.accept.tag);
			}
			this.reject(reason);
			this.reset();
		}
		/** @param {{}} [response]
		 */
		do_accept(response) {
			if(!this.accept) throw 1;
			if(this.tag_promise_resolver&&this.log_resolver_tags) {
				console.log('ac tag',this.accept.tag);
			}
			this.accept(response);
			this.reset();
		}
		on_start() {
			this.running=true;
		}
		/** @param {{type:"timeout";response:null}} reason */
		abort(reason) {
			this.do_reject(reason);
			setTimeout(async () => {
				if(this.running) {
					await this.async_terminate();
				}
			}
				,this.clock.get_delay());
		}
		async async_terminate() {
			await this.request_shutdown();
			this.terminate();
		}
		on_timeout() {
			if(worker_state.running) {
				this.abort({
					type: "timeout",
					response: null
				});
			}
			this.clock.stop();
		}
		last_process=0;
		/** @param {WorkerStateModel} self
		 */
		static on_clock_interval(self) {
			self.check_timeout(performance.now()-self.last_process);
		}
		/** @param {number} clock_diff
		 */
		check_timeout(clock_diff) {
			let sec_diff=clock_diff/1000;
			let sd=sec_diff.toFixed(2);
			let sn=+sd;
			console.log('sd',sn);
			if(this.timeout_delay===void 0) throw 1;
			if(clock_diff<this.timeout_delay) {
				return;
			}
			this.on_timeout();
		}
		/** @param {any} clock_delay
		 */
		set_clock_interval(clock_delay) {
			this.clock.set_delay(clock_delay);
			this.clock.set_handler_fptr('tick',{
				ptr: WorkerStateModel.on_clock_interval,
				data: this
			});
			this.clock.start();
		}
		// at least clock_delay * 2,
		// clock_delay * 3 is much better
		/** @param {number} timeout_delay
		 */
		set_timeout_delay(timeout_delay) {
			this.timeout_delay=timeout_delay;
		}
	}
	let worker_state=new WorkerStateModel();
	/** @typedef {import("./item_05_types"). BaseWorkProcessorType} BaseWorkProcessorType */
	async function on_worker_async_work() {
		let gg=0;
		let cx=worker_state;
		/** @type {BaseWorkProcessorType|null} */
		let cur_response=null;
		try {
			cur_response=await cx.request_init();
		} catch(e) {
			console.log(e,worker_state);
			return worker_state;
		}
		min_arr[gg]=cur_response.result_vec[gg];
		console.log('ir',cur_response);
		for(;gg<30;) {
			try {
				cur_response=await min_try(cx,gg);
			} catch(promise_rejection) {
				if(!is_promise_rejection_type(promise_rejection)) {
					console.log('error while processing work');
					break;
				};
				if(promise_rejection.type==='timeout') {
					console.log('timeout while processing work');
					break;
				}
			}
			if(!cur_response) throw 1;
			console.log('cs',cur_response);
			min_arr[gg+1]=cur_response.result_vec[gg+1];
			gg++;
		}
		console.log(min_arr,long_tick_log);
		window.__tick_log=[...new Set(long_tick_log)].sort((a,b) => a-b);
		window.__result_vec=min_arr;
		console.log(window.__tick_log);
		await cx.async_terminate();
		console.log('worker terminated');
		return worker_state;
	}
	/** @template T @arg {T} err @returns {err is {type:"timeout";response:null}} */
	function is_promise_rejection_type(err) {
		return typeof err==='object'&&err!==null&&"type"in err&&err.type==="timeout";
	}
	/** @arg {WorkerStateModel} cx @arg {number} gg */
	async function min_try(cx,gg) {
		let err=true;
		let tc=0;
		/** @type {BaseWorkProcessorType|null} */
		let ret=null;
		while(err) {
			try {
				console.log('t',gg,tc++);
				ret=await cx.request_process(gg);
				console.log('d',gg,tc++);
				err=false;
			} catch(promise_rejection) {
				console.log('e',gg,tc);
				console.log('error',promise_rejection);
				if(!is_promise_rejection_type(promise_rejection)) {
					throw promise_rejection;
				};
				if(promise_rejection.type==='timeout') {
					throw promise_rejection;
				}
				err=true;
			}
		}
		return ret;
	}
	let ret=on_worker_async_work();
	ret.then(null,function(err) {
		console.log('async_error',err);
		return err;
	});
	return ret;
}
main();
function get_exports() {
	return exports;
}
if(typeof exports==="object") {
	let exports=get_exports();
	exports.main=main;
	exports.as_cast=as_cast;
}

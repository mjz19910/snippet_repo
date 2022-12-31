/*
Copyright 2021-2021 @mjz19910

Header definition:
async function kernel_main() {
	let runtime = new RustRuntime
	class RustEventHandler {
		constructor() {}
		addEventListener(event_type, event_listener) {}
		removeEventListener(event_type, event_listener) {}
		dispatchEvent(event) {}
	}
	class RustRuntime {
		constructor() {}
		spawn_class(task_class) {}
		init() {}
		async run() {}
		add_shutdown_callback(func){}
		shutdown(){}
		static wait_into_promise(runtime,accept,reject){
			_._=function(){}
		}
		wait(){}
		auto_ref() {}
		class_ref(class_constructor, ...rest) {}
		ref(task) {}
		unref(task) {}
		is_done() {}
		dispose() {}
	}
	class RustUnit {}
	class RustOption {
		constructor(value) {}
		unwrap() {}
		is_some() {}
		is_none() {}
		replace(other) {}
		take() {}
		static default() {}
	}
	class RustTaskWaker {
		constructor(notifier) {}
		wake() {}
		drop() {}
		clone() {}
	}
	class AsyncBlocker {}
	class RustTaskNotifier {
		constructor(runtime){}
		static create_promise(obj, accept, reject) {}
		wait_from_promise(){}
		wait() {}
		notify_one() {}
		waker_new() {}
		waker_drop() {}
	}
	class RustTaskContext {
		constructor(runtime){}
		waker_option = RustOption.default()
		active() {}
		wait_for() {}
		waker() {}
	}
	runtime.state.dbg = {}
	class root_future {
		static poll() {
			function buyable_iter(arr,target){}
			function upgrade_iter(arr,target){}
		}
	}
	class RustKeywordEnum {}
	class RustVec {}
	class Poll extends RustKeywordEnum {}
	class DelayFuture {
		constructor(timeout) {}
		static new() {}
		static on_timeout(self) {}
		start() {}
		poll(self, cx) {}
		finish() {}
		dispose() {}
	}
	function async_delay_future(runtime, delay) {}
	function debugger_try_activate(func, f_this, c_args) {}
	async function async_loop_function_inner(runtime, i) {}
	async function async_process(runtime){}
	async function async_loop_function(runtime) {}
	class Ref {}
	class RuntimeTask {
		constructor(runtime) {}
		init() {}
		async run() {}
		dispose() {}
	}
	class ExportTask {}
	async function main() {
		await runtime.run()
	}
	await main()
	return runtime
}
*/
async function kernel_main() {
	"use strict"
	class RustEventHandler {
		constructor() {
			/**@type {{[x:string]:{listener: ((x:{})=>void)|null}[]}} */
			this._events={}
			this.event_sem=0
			/**@type {any[]} */
			this.dirty_object_vec=[]
		}
		/** @arg {string | number} event_type @arg {any} event_listener */
		addEventListener(event_type,event_listener) {
			this._events[event_type]??=[]
			let event_listener_description={
				type: event_type,
				listener: event_listener
			}
			this._events[event_type].push(event_listener_description)
		}
		/** @arg {string | number} event_type @arg {any} event_listener */
		removeEventListener(event_type,event_listener) {
			if(this._events[event_type]===void 0)
				return
			let event_vec=this._events[event_type]
			if(event_vec.length===0)
				return
			for(let cur,i=event_vec.length-1;i>=0;i--) {
				cur=event_vec[i]
				if(cur.listener===event_listener) {
					cur.listener=null
					event_vec.splice(i,1)
					if(this.event_sem>0) {
						this.dirty_object_vec.push(cur)
						this.dirty_bit=true
					}
				}
			}
		}
		/** @arg {{ type: any; }} event */
		dispatchEvent(event) {
			let event_type=event.type
			let event_vec=this._events[event_type]
			if(event_vec===void 0)
				return
			if(!event_vec.length)
				return
			this.event_sem++
			let event_vec_clone=event_vec.slice()
			for(let i=0;i<event_vec_clone.length;i++) {
				let cur=event_vec_clone[i]
				if(cur.listener===null)
					continue
				let event_listener=cur.listener;
				event_listener(event)
			}
			this.event_sem--
			if(!this.event_sem&&this.dirty_object_vec.length) {
				let dirty_vec=this.dirty_object_vec
				for(let i=dirty_vec.length-1;i>=0;i--) {
					let dirty_iter_cur=dirty_vec[i]
					dirty_iter_cur.type=null
					dirty_iter_cur.listener=null
					dirty_iter_cur=null
					dirty_vec[i]=null
				}
				this.dirty_object_vec.length=0
			}
		}
	}
	class RustRuntime {
		constructor() {
			this.event_handler=new RustEventHandler
			/** @type {{ type: string; value: any; }[]} */
			this.task_vec=[]
			/** @type {any[]} */
			this.active_task_vec=[]
			/** @type {any[]} */
			this.references=[]
			this.state={}
			this.is_shutdown=false
			/** @type {any[]} */
			this.on_shutdown_vec=[]
			/** @type {(() => void) | null} */
			this.shutdown_waiter=null
		}
		// @ts-ignore
		spawn_class(task_class) {
			this.task_vec.push({
				type: 'class',
				value: task_class,
			})
		}
		init() {
			//spell:words spawnable
			let task_vec=this.task_vec
			for(let i=0;i<task_vec.length;i++) {
				let spawnable_item=task_vec[i]
				let spawned_item
				if(spawnable_item.type==='class') {
					let spawnable_constructor=spawnable_item.value
					spawned_item=new spawnable_constructor(this)
				} else {
					let spawn_function=spawnable_item.value
					spawned_item=spawn_function()
				}
				spawned_item.init?.()
				this.active_task_vec.push(spawned_item)
			}
		}
		async run() {
			let task_vec=[]
			for(let cur_task of this.active_task_vec) {
				let pr=cur_task.run?.()
				pr&&task_vec.push(pr)
			}
			await Promise.all(task_vec)
		}
		/** @arg {any} func */
		add_shutdown_callback(func) {
			this.on_shutdown_vec.push(func)
		}
		shutdown() {
			if(this.shutdown_waiter) {
				this.shutdown_waiter()
			}
			for(let cur,i=0;i<this.on_shutdown_vec.length;i++) {
				cur=this.on_shutdown_vec[i]
				cur()
			}
			this.is_shutdown=true
		}
		/** @arg {{ shutdown_waiter: (() => void) | null; }} runtime @arg {() => void} accept @arg {any} reject */
		// @ts-ignore
		static wait_into_promise(runtime,accept,reject) {
			runtime.shutdown_waiter=function() {
				runtime.shutdown_waiter=null
				accept()
			}
		}
		/** @returns {Promise<void>} */
		wait() {
			let promise_resolver=RustRuntime.wait_into_promise.bind(null,this);
			return new Promise((resolve,reject)=>{
				promise_resolver(resolve,reject);
			})
		}
		auto_ref() {
			let ref_sym=Symbol()
			this.ref(ref_sym)
			return ref_sym
		}
		/** @arg {new (arg0: this) => any} class_constructor @arg {any[]} rest */
		// @ts-ignore
		class_ref(class_constructor,...rest) {
			return new class_constructor(this)
		}
		/** @arg {symbol} task */
		ref(task) {
			if(this.is_shutdown) {
				throw Error('unable to create ref to task, runtime is shutdown')
			}
			this.references.push(task)
		}
		/** @arg {{ dispose: () => void; }} task */
		unref(task) {
			let idx=this.references.indexOf(task)
			if(idx>-1) {
				this.references.splice(idx,1)
			} else {
				console.log('ur-not-ref',task)
			}
			task?.dispose?.()
			if(this.references.length==0) {
				this.dispose()
			}
		}
		is_done() {
			return !this.references.length
		}
		dispose() {
			for(let cur_object of this.active_task_vec) {
				cur_object.dispose?.()
			}
			this.active_task_vec.length=0
		}
	}
	class RustUnit {
		toString() {
			return '()'
		}
	}
	class RustOption {
		// @ts-ignore
		constructor(value) {
			this.value=value
		}
		unwrap() {
			return this.value
		}
		is_some() {
			return !this.is_none()
		}
		is_none() {
			return this.value===null
		}
		// @ts-ignore
		replace(other) {
			this.value=other.value
		}
		take() {
			let value=this.value
			this.value=null
			return new RustOption(value)
		}
		static default() {
			return new RustOption(null)
		}
	}
	class RustTaskWaker {
		// @ts-ignore
		constructor(notifier) {
			notifier.waker_new()
			this.notifier=notifier
		}
		wake() {
			this.notifier.notify_one()
		}
		drop() {
			this.notifier.waker_drop()
		}
		clone() {
			return new RustTaskWaker(this.notifier)
		}
	}
	class AsyncBlocker {
		/** @arg {any} runtime @arg {any} accept @arg {any} reject */
		// @ts-ignore
		constructor(runtime,accept,reject) {
			this.accept=accept
			this.reject=reject
		}
		notify() {
			this.accept()
		}
	}
	class RustTaskNotifier {
		/** @arg {any} runtime */
		constructor(runtime) {
			this.runtime=runtime
		}
		count=0
		inner=null
		/** @arg {any} accept @arg {any} reject */
		// @ts-ignore
		static create_promise(obj,accept,reject) {
			obj.inner=new AsyncBlocker(obj.runtime,accept,reject)
		}
		wait_from_promise() {
			return new Promise(RustTaskNotifier.create_promise.bind(null,this))
		}
		wait() {
			return this.wait_from_promise()
		}
		notify_one() {
			// @ts-ignore
			this.inner.notify()
		}
		waker_new() {
			this.count++
		}
		waker_drop() {
			this.count--
		}
	}
	class RustTaskContext {
		/** @arg {any} runtime */
		constructor(runtime) {
			this.runtime=runtime
			this.notifier=new RustTaskNotifier(runtime)
		}
		waker_option=RustOption.default()
		active() {
			return this.notifier.count>0
		}
		wait_for() {
			return Promise.race([this.notifier.wait(),runtime.wait()])
		}
		waker() {
			if(this.waker_option.is_none()) {
				let waker=new RustTaskWaker(this.notifier)
				this.waker_option.replace(new RustOption(waker))
				return waker
			}
			return this.waker_option.unwrap()
		}
	}
	let runtime=new RustRuntime
	// @ts-ignore
	window.__rust_runtime=runtime
	// @ts-ignore
	runtime.state.dbg={
		debug:window.debug,
		undebug:window.undebug,
		// @ts-ignore
		getEventListeners
	}
	class root_future {
		static running=true
		static poll() {
			let min_cost_dist
			// @ts-ignore
			let get_cost_ratio=(/** @type {string} */ cc) => player.c.points.div(tmp.c.buyables[cc].cost)
			// @ts-ignore
			let c_buy_ent=Object.entries(player.c.buyables)
			let c_buy_min=c_buy_ent.map(e => e[1].toNumber()).reduce((a,b) => a<b? a:b)
			let c_min_ent=c_buy_ent.reduce((a,b) => {
				let a_ratio=get_cost_ratio(a[0])
				let b_ratio=get_cost_ratio(b[0])
				if(a_ratio.gt(b_ratio)) {
					return a
				} else {
					return b
				}
			}
			)
			min_cost_dist=get_cost_ratio(c_min_ent[0]).toNumber()
			// @ts-ignore
			let flag_not_done=[]
			if(c_buy_min>80) {
				// @ts-ignore
				let fl=[+(min_cost_dist>100),+player.c.points.gt(1e30),+(player.c.points.div(tmp.c.getResetGain).toNumber()>100)]
				// @ts-ignore
				console.log('md',fl.join(''),min_cost_dist,temp.pointGen.div(getPointGen()).toNumber())
			}
			let c_buy_arr=[92,72,71,91,82,81,51,52,52,61,62]
			let s_buy_arr=[11,12]
			/** @type {never[]} */
			let c_can_buy_arr=[]
			/** @arg {string} target @arg {number[]} src_arr @arg {any[]} target_arr */
			function process_buyables_arr(target,src_arr,target_arr) {
				let i=0
				for(let x of src_arr) {
					// @ts-ignore
					let tb=tmp[target].buyables[x]
					if(tb.unlocked&&tb.canAfford) {
						i++
						target_arr.push(x)
					}
				}
				return i
			}
			let c_can_buy_count=process_buyables_arr('c',c_buy_arr,c_can_buy_arr)
			let s_can_buy_count=process_buyables_arr('s',s_buy_arr,[])
			if(min_cost_dist<20) {
				c_can_buy_count=0
			}
			ib: if(min_cost_dist>100) {
				// @ts-ignore
				if(player.c.points.lt(1e30)) {
					break ib
				}
				// @ts-ignore
				if(player.c.points.div(tmp.c.getResetGain).toNumber()<100) {
					break ib
				}
				// @ts-ignore
				if(player.s.points.lt(5000)) {
					break ib
				}
				if(min_cost_dist>1e5) {
					break ib
				}
				if(s_can_buy_count>0) {
					break ib
				}
				// @ts-ignore
				if(temp.pointGen.div(getPointGen()).toNumber()===1) {
					break ib
				}
				return 'done'
			}
			/** @arg {any[]} arr @arg {string} target */
			function buyable_iter(arr,target) {
				for(let x of arr) {
					// @ts-ignore
					let tb=tmp[target].buyables[x]
					if(tb.unlocked&&tb.canAfford) {
						// @ts-ignore
						buyBuyable(target,x)
						return true
					}
				}
				return false
			}
			/** @arg {number[]} arr @arg {string} target */
			function upgrade_iter(arr,target) {
				for(let x of arr) {
					// @ts-ignore
					if(player[target].upgrades.includes(x)) {
						continue
					}
					// @ts-ignore
					if(!tmp.a.upgrades[11].unlocked) {
						continue
					}
					// @ts-ignore
					if(player[target].points.lt(tmp[target].upgrades[x].cost)) {
						continue
					}
					// @ts-ignore
					buyUpg(target,x)
					return true
				}
				return false
			}
			da: {
				// @ts-ignore
				if(Number.isNaN(player.points.toNumber())) {
					// @ts-ignore
					player.points=new Decimal(0)
					// @ts-ignore
					player.c.points=new Decimal(0)
					break da
				}
				// @ts-ignore
				if(Number.isNaN(player.c.points.toNumber())) {
					// @ts-ignore
					player.c.points=new Decimal(0)
					break da
				}
				let c_upg_arr=[195,203,204,205,211,212,213,214,215,221,222,223,224,225]
				if(upgrade_iter(c_upg_arr,'c')) {
					break da
				}
				let a_upg_arr=[11,12]
				if(upgrade_iter(a_upg_arr,'a')) {
					break da
				}
				let a_buy_arr=[51,11,12,21,22,31,32,41,42]
				if(buyable_iter(a_buy_arr,'a')) {
					break da
				}
				if(buyable_iter(c_can_buy_arr,'c')) {
					break da
				}
				// @ts-ignore
				ib: if(getResetGain('s').gt(50)) {
					// @ts-ignore
					if(player.s.points.gt(1000)&&!player.s.upgrades.includes(11)) {
						break ib
					}
					// @ts-ignore
					if(player.s.points.gt(5000)&&!player.s.upgrades.includes(12)) {
						break ib
					}
					// @ts-ignore
					if(player.s.points.gt(5000)) {
						break ib
					}
					// @ts-ignore
					doReset('s')
					break da
				}
				let s_upg_arr=[11,12]
				if(upgrade_iter(s_upg_arr,'s')) {
					break da
				}
				// @ts-ignore
				ib: if(player.s.upgrades.includes(12)) {
					// @ts-ignore
					if(player.s.points.lt(5000)) {
						break ib
					}
					if(buyable_iter(s_buy_arr,'s')) {
						break da
					}
				}
			}
			if(s_can_buy_count>0) {
				return 'slow'
			}
			// @ts-ignore
			if(!player.s.points.gt(5000)) {
				return 'fast'
			}
			if(c_can_buy_count>0) {
				return 'fast'
			}
			// @ts-ignore
			if(player.h.activeChallenge===12) {
				return 'snail'
			}
			// @ts-ignore
			if(player.c.buyables[82].toNumber()>120) {
				// @ts-ignore
				return 'cus:'+(1000+player.points.div(getPointGen()).toNumber())
			}
			// @ts-ignore
			if(player.c.buyables[82].toNumber()>80) {
				return 'snail'
			}
			// @ts-ignore
			if(player.c.buyables[82].toNumber()>55) {
				return 'slow'
			} else {
				return 'fast'
			}
		}
	}
	// @ts-ignore
	if(window.__root_future) {
		// @ts-ignore
		window.__root_future.running=false
	}
	// @ts-ignore
	window.__root_future=root_future
	class RustKeywordEnum {
	}
	class RustVec {
	}
	class Poll extends RustKeywordEnum {
		static option_vec=new RustVec
	}
	// @ts-ignore
	window.Poll=Poll
	class DelayFuture {
		/** @arg {any} timeout */
		constructor(timeout) {
			this.delay=timeout
			this.is_timed_out=false
			this.waker=new RustOption(null)
			this.cint=-1
		}
		dispose() {
			// @ts-ignore
			this.reject?.()
			if(this.cint>-1) {
				clearTimeout(this.cint)
			}
		}
		finish() {
			this.cint=-1
		}
		/** @arg {{ is_timed_out: boolean; waker: { is_some: () => any; take: () => { (): any; new (): any; unwrap: { (): any; new (): any; }; }; }; finish: () => void; dispose: () => void; }} self */
		static on_timeout(self) {
			self.is_timed_out=true
			if(self.waker.is_some()) {
				let waker=self.waker.take().unwrap()
				waker.wake()
				waker.drop()
			}
			self.finish()
			self.dispose()
		}
		start() {
			this.cint=setTimeout(DelayFuture.on_timeout,this.delay,this)
		}
		// @ts-ignore
		poll(self,cx) {
			if(this.is_timed_out) {
				return ['Poll::Ready',new RustUnit]
			}
			let o=cx.waker()
			let waker=o.clone()
			self.waker=new RustOption(waker)
			o.drop()
			this.start()
			// @ts-ignore
			window.__active_future=this
			return ['Poll::Pending']
		}
		static new() {
			// @ts-ignore
			return new this
		}
	}
	/** @arg {any} runtime @arg {number} delay */
	function async_delay_future(runtime,delay) {
		let future=new DelayFuture(delay)
		let cx=new RustTaskContext(runtime)
		// poll it, then drop it after we finish waiting
		future.poll(future,cx)
		return cx.wait_for()
	}
	/** @arg {{ auto_ref: () => any; state: any; shutdown: () => void; unref: (arg0: any) => void; }} runtime @arg {string | number} i */
	async function async_loop_function_inner(runtime,i) {
		let w=async_delay_future.bind(null,runtime)
		let ref_sym=runtime.auto_ref()
		console.log('async_iter '+i)
		// @ts-ignore
		try_root: try {
			// @ts-ignore
			let btn=document.querySelector('#app').querySelector(':scope > .tab > div > div > div > div > div > div.upgTable.instant > div.upgCol > div > div.upgTable > div.upgRow > div > div.upgAlign > div > button.buyable.can')
			tb: try {
				if(!btn) {
					break tb
				}
				// @ts-ignore
				if(window.TokenGenerator) {
					break tb
				}
				let rt_state=runtime.state
				let {debug,undebug,getEventListeners}=rt_state.dbg
				let fn=getEventListeners(btn).click[0].listener
				// @ts-ignore
				let res=DebugApi.get_event_listener_var_vec_1(debug,undebug,fn,'o')
				let res_value=res.result.detail.value
				// @ts-ignore
				String.prototype.parseFunctionString=function() {
					let str=this.valueOf()
					// @ts-ignore
					let token_generator=DebugApi.simple_js_parser.token_generator
					token_generator.set_str(str)
					token_generator.reset()
					// @ts-ignore
					let eof=false
					let tok_gen_class=Object.getPrototypeOf(token_generator).constructor
					let eof_key=tok_gen_class.EOF_TOKEN
					// @ts-ignore
					window.TokenGenerator=tok_gen_class
					let token_vec=[]
					for(let i=0;i<32;i++) {
						let token_result=token_generator.next_token()
						let desc_token=token_generator.describe_token(token_result)
						token_vec.push(desc_token)
						if(token_result[0]===eof_key) {
							break
						}
					}
					return token_vec
				}
				let token_vec=res_value.fns.toString().parseFunctionString()
				let fn_start=token_vec.findIndex((/** @type {string[]} */ e) => e[1]==='{}'[0])
				let fn_inner=token_vec.slice(fn_start+1,-2)
				let fn_ref_token_vec=fn_inner.filter((/** @type {string[]} */ e) => e[0]==="IdentifierName")
				let fn_ref_vec=fn_ref_token_vec.map((/** @type {any[]} */ e) => e[1])
				let c_name=fn_ref_vec[1]
				let func=res_value.fns
				// @ts-ignore
				let __d=DebugApi._PrivInstance
				__d.attach(debug,undebug,null)
				/** @arg {(this: any, ...args: readonly any[]) => any} func @arg {any} f_this @arg {readonly any[]} c_args */
				function do_activate(func,f_this,c_args) {
					try {
						return Reflect.apply(func,f_this,c_args)
					} catch {}
				}
				let activate=do_activate.bind(null,func,{},[])
				let result=__d.debuggerGetVar_a(func,activate,`{
						let __orig=${c_name}
						${c_name}=function(){
							${c_name}=__orig
							throw 1
						}
						[layer,data]
					}`)
				console.log(c_name,result.result.detail.value)
				console.log(res_value.fns)
			} /**/
			catch(e) {
				console.log(e)
			}
			// @ts-ignore
			nx: {
				for(let i=0;;i++) {
					if(!root_future.running) {
						return
					}
					// @ts-ignore
					let poll_res=root_future.poll(runtime)
					// @ts-ignore
					window.__export_info??={
						arr: [],
						start_ptr: 0,
						length: 8
					}
					// @ts-ignore
					let export_info=window.__export_info
					export_info.arr.length=export_info.length
					export_info.arr[export_info.start_ptr++]=poll_res
					export_info.start_ptr%=export_info.length
					if(poll_res.startsWith('cus')) {
						let delay=parseInt(poll_res.split(':')[1],10)
						await w(delay)
						continue
					}
					if(poll_res==='snail') {
						await w(2000)
						continue
					}
					if(poll_res=='slow') {
						i+=4
						await w(250)
						continue
					}
					if(poll_res==='done') {
						runtime.shutdown()
						return
					}
					if(i<20*5) {
						await w(50)
						continue
					}
					break
				}
			}
			await w(50)
		} /**/
		catch(e) {
			console.log(e)
		} /**/
		finally {
			runtime.unref(ref_sym)
		}
	}
	/** @arg {{ is_shutdown: any; }} runtime */
	async function async_process(runtime) {
		for(let i=0;i<600;i++) {
			// @ts-ignore
			await async_loop_function_inner(runtime,i)
			if(!root_future.running) {
				return
			}
			if(runtime.is_shutdown) {
				return
			}
		}
	}
	/** @arg {{ ref: (arg0: { active: null; dispose(): void; }) => void; auto_ref: () => any; unref: (arg0: { active: null; dispose(): void; }) => void; }} runtime */
	async function async_loop_function(runtime) {
		let w_state={
			active: null,
			dispose() {
				if(this.active) {
					// @ts-ignore
					this.active.dispose()
				}
			}
		}
		runtime.ref(w_state)
		let ref_sym=runtime.auto_ref()
		await async_delay_future(runtime,0)
		runtime.unref(ref_sym)
		try {
			console.log('async_start')
			// @ts-ignore
			await async_process(runtime)
			console.log('async_finish')
		} /**/
		catch {}
		runtime.unref(w_state)
	}
	class Ref {
		/** @arg {any} runtime */
		constructor(runtime) {
			this.runtime=runtime
			this.runtime.ref(this)
		}
		drop() {
			this.runtime.unref(this)
		}
	}
	class RuntimeTask {
		/** @arg {any} runtime */
		constructor(runtime) {
			this.runtime=runtime
		}
		init() {
			console.log('task_init')
		}
		async run() {
			let ref=this.runtime.class_ref(Ref)
			await async_loop_function(this.runtime)
			this.runtime.unref(ref)
		}
		dispose() {
			console.log('task_dispose')
		}
	}
	class ExportTask {
		/** @arg {any} runtime */
		constructor(runtime) {
			// @ts-ignore
			if(window.__obj) {
				// @ts-ignore
				window.__obj.shutdown()
				// @ts-ignore
				delete window.__obj
			}
			// @ts-ignore
			window.__obj=runtime
		}
		dispose() {
			// @ts-ignore
			delete window.__obj
		}
	}
	async function main() {
		runtime.spawn_class(RuntimeTask)
		runtime.spawn_class(ExportTask)
		runtime.init()
		await runtime.run()
		runtime.dispose()
	}
	await main()
	return runtime
}
kernel_main()

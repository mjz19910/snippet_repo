import captureStackTrace from "../../../typescript/src/capture-stack-trace.js";
import {Runner} from "../support/Runner.js";

/* spell:words konggames
--- version_list item 2 ---
v1 (cur): snippet_repo/javascript/final/konggames/konggames_debug.js
*/
function main() {
	/** @type {import("./__global.js")} */
	let holder=1;
	holder;
	let cur=new Runner;
	cur.n="konggames_debug";
	cur.f=function() {
		class DebugState {
			/** @type {symbol} */
			call_info=Symbol.for("Unknown");
			/** @type {any} */
			breakpoint_function;
			/** @type {any} */
			root;
			/** @type {symbol[]} */
			info=[];
			/** @type {any} */
			breakpoint_function_path;
			/** @type {{ abort: symbol; error: symbol; success: symbol; failure: symbol; debug: symbol; }} */
			sym={
				abort: Symbol('abort'),
				error: Symbol('error'),
				success: Symbol("success"),
				failure: Symbol("failure"),
				debug: Symbol("debug"),
			};
			/** @type {number} */
			depth=0;
		}
		class debug_class {
			/** @arg {DebugState} state */
			constructor(state) {
				this.data={
					ghost_tree: null,
				};
				/** @type {any[]} */
				this.error_array=[];
				var id=Math.floor(Math.random()*(1<<(24))*(1<<8+8+4)).toString(16);
				let key='_debugger_'+id;
				this.key=key;
				this.state=state;
				this.breakpoint_function_path=state.breakpoint_function_path;
				if(state.sym) {
					this.sym=state.sym;
				} else {
					this.sym={
						abort: Symbol('abort'),
						error: Symbol('error'),
						success: Symbol("success"),
						failure: Symbol("failure"),
						debug: Symbol("debug"),
					};
					state.sym=this.sym;
				}
				state.info=[];
				/** @type {((e: any) => void)|undefined} */
				this.on_internal_callback=undefined;
				/** @type {((e: any) => void)|undefined} */
				this.on_breakpoint_clear=undefined;
				this.in_callback=false;
				state.info.push(this.sym.debug);
			}
			/** @arg {any} event_forward_function */
			async clear(event_forward_function) {
				if(this.state.root) {
					var nop=function() {};
					this.event_forward_function=event_forward_function;
					nop.call(null);
					await this.promise;
					this.clear_root();
					if(this.next) {
						await this.next.clear(() => {
							console.log('prev clear done');
						});
						/** @type {debug_class|null} */
						this.next=null;
					}
					return;
				}
				var nop=function() {};
				Reflect.apply(this.breakpoint_function,nop,[]);
				await this.promise;
			}
			clear_root() {
				throw new Error("Method not implemented.");
			}
			run() {
				var t=this;
				var state=this.state;
				if(state&&!state.breakpoint_function) {
					/** @type {any} */
					let g=window;
					let pth=this.breakpoint_function_path.split(".");
					for(let c;c=pth.shift();) {
						g=g[c];
					}
					state.breakpoint_function=g;
				}
				this.breakpoint_function=state.breakpoint_function;
				/** @type {{ arg: any[][]; m_this: { (start?: number|undefined, end?: number|undefined): any[]; (v: PropertyKey): boolean; }; }[]} */
				this.failed_check=[];
				var make_internal_promise=function(/** @type {(arg0: any) => void} */ a) {
					t.on_internal_callback=function(e) {
						a(e);
					};
				};
				this.internal_promise=new Promise(make_internal_promise);
				var make_promise=function(/** @type {(arg0: any) => void} */ a) {
					t.on_breakpoint_clear=function(e) {
						a(e);
					};
				};
				var ret=new Promise(make_promise);
				this.promise=ret;
				this.on_page_unload=function() {
					if(t.has_breakpoint) {
						t.clear_breakpoint(null);
					}
				};
				window.addEventListener('unload',this.on_page_unload);
				if(this.in_callback) {
					console.log('not setting breakpoint in breakpoint');
				} else {
					this.set_breakpoint();
				}
			}
			/** @arg {any} info */
			do_internal_callback(info) {
				this.internal_result=info;
				if(!this.on_internal_callback) return;
				this.on_internal_callback(this.internal_result);
			}
			/** @arg {{ arg: any[][]; m_this: { (start?: number|undefined, end?: number|undefined): any[]; (v: PropertyKey): boolean; }; }} info */
			callback(info) {
				x: {
					if(this.state.info&&info.arg?.[1]?.[0]!==undefined&&this.state.info.indexOf(info.arg[1][0])>-1) {
						let arg_info=info.arg[1][0];
						let dbg_sym=this.sym.debug;
						if(arg_info==dbg_sym) {
							let idx=this.state.info.indexOf(dbg_sym);
							this.state.info.splice(idx,1);
							this.do_internal_callback(info);
						}
						return;
					}
					if(!this.failed_check) throw new Error("");
					if(this.failed_check.length>256) {
						break x;
					}
					if(info.m_this===Array.prototype.slice) {
						this.failed_check.push(info);
						console.log('1');
						return;
					}
					if(info.m_this===Object.prototype.hasOwnProperty) {
						this.failed_check.push(info);
						console.log('2',...info.arg);
						return;
					}
					this.clear_breakpoint(info);
				}
			}
			/** @arg {{ arg: any[][]; m_this: { (start?: number|undefined, end?: number|undefined): any[]; (v: PropertyKey): boolean; }; }|null|undefined} result */
			clear_breakpoint(result) {
				var error;
				if(!window.undebug) {
					throw new Error("Missing undebug function");
				}
				if(arguments.length<1) {
					error=new Error("Not enough arguments");
				}
				if(result===undefined) {
					error=new Error("required argument 'result' is undefined");
				}
				if(error) {
					captureStackTrace(error);
					throw error;
				}
				if(this.event_forward_function) {
					this.event_forward_function('clear '+this.key);
				} else {
					console.log('clear '+this.key);
				}
				window.undebug(this.breakpoint_function);
				if(this.on_page_unload&&result!==null) {
					window.removeEventListener('unload',this.on_page_unload.bind(this));
				}
				if(result!==null) {
					this.result=result;
				}
				this.do_breakpoint_clear();
			}
			do_breakpoint_clear() {
				if(!this.on_breakpoint_clear) return;
				this.on_breakpoint_clear({});
			}
			set_breakpoint() {
				if(!window.debug) throw new Error("devtools");
				console.log('set debug breakpoint',this.breakpoint_function);
				this.first=true;
				window.debug(this.breakpoint_function,this.get_breakpoint_string());
				this.has_breakpoint=true;
			}
			get_breakpoint_string() {
				var tmp=`
				x:{
					try{
						let function_path="${this.breakpoint_function_path}"
						let key_for_dbg="${this.key}"
						if(window[key_for_dbg]===undefined){
							if(function_path){
								console.log("Bad breakpoint","try undebug")
								undebug(new Function("return "+function_path))
							}
							console.log("Bad breakpoint")
							1
							break x
						}
						let _debugger=window[key_for_dbg]
						let info={m_this:this,arg:arguments}
						info.scope_accessor=function(e){
							try{
								var r=eval(e)
								return [_debugger.sym.success,r]
							}
							catch(q){
								var x=q
								return [_debugger.sym.failure,x]
							}
						}
						if(_debugger.first){
							//_debugger.first=false
							console.log(_debugger.state.root?"HERE.root":"HERE")
						}
						_debugger.in_callback=true
						_debugger.callback(info)
						_debugger.in_callback=false
					}
					catch(e){
						console.log('at_bp',e)
						1
					}
				}
				`;
				var a=tmp.split("\n");
				var b=a.shift();
				var c=a.pop();
				var pad_str=a[0].match(/\s+/)?.[0];
				if(pad_str) {
					let t_len=pad_str.length;
					for(var i=0;i<a.length;i++) {
						a[i]=a[i].slice(t_len);
					}
				}
				if(!b) {
					let ul_p1='snippet://dbg/dbg_bp.';
					var src_url='//'+"# sourceURL="+ul_p1+this.state.depth+".js";
					if(this.state.root)
						src_url='//'+"# sourceURL="+ul_p1+"root.js";
					return ([...a,c,src_url]).join("\n");
				}
				return ([b,...a,c]).join("\n");
			}
		}
		function run_sync_code() {
			/** @arg {()=>DebugState} pre_init @arg {(x:debug_class,s:DebugState)=>unknown} at_init @arg {(x:debug_class,s:DebugState)=>unknown} done_cb */
			function dbg_init(pre_init,at_init,done_cb) {
				var state=pre_init();
				let _debugger=new debug_class(state);
				at_init(_debugger,state);
				_debugger.run();
				done_cb(_debugger,state);
				return _debugger;
			}
			function pre_init_callback() {
				window.debug=window.debug;
				window.undebug=window.undebug;
				var state=new DebugState;
				state.breakpoint_function_path="Function.prototype.call";
				state.root=true;
				state.depth=0;
				return state;
			}
			function init_callback() {}
			/** @arg {debug_class} promise_debugger */
			function done_callback(promise_debugger) {
				console.log("promise_debugger",promise_debugger);
			}
			let promise_debugger=dbg_init(pre_init_callback,init_callback,done_callback);
			if(!promise_debugger.internal_promise) throw new Error("Missing internal promise (call run first)");
			promise_debugger.internal_promise.then(function(z) {
				console.log([z.scope_accessor]);
				if(promise_debugger.breakpoint_function.rep===undefined) {
					return;
				}
				var access_res=z.scope_accessor('data');
				if(access_res[0]!==promise_debugger.sym.success) {
					promise_debugger.error_array.push(access_res[1]);
					console.log('failure',access_res[0],Object.getPrototypeOf(access_res[1]).name+":"+access_res[1].message);
					return;
				}
				var ghost_tree=access_res[1].original;
				let r=dbg_init(function() {
					var state=new DebugState;
					Object.assign(state,promise_debugger.state);
					state.breakpoint_function_path="Function.prototype.call";
					state.depth++;
					debugger;
					return state;
				},function(_debugger,state) {
					state.breakpoint_function=ghost_tree.Function.prototype.call;
				},function(_debugger) {
					_debugger.data.ghost_tree=ghost_tree;
					promise_debugger.next=_debugger;
				});
				console.log(r);
				return r;
			});
			return promise_debugger;
		}
		return run_sync_code();
	};
	cur.value=cur.do_cur();
	return cur.make_ret();
	//# sourceURL=snippet:///%24_2
}
window.__ret=main();

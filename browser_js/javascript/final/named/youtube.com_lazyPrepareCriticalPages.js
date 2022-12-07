import {CustomInputMatcher} from "../support/CustomInputMatcher.js";
import {Runner} from "../support/Runner.js";

/* spell:words
--- version_list item 2 ---
v1 (cur): snippet_repo/javascript/final/youtube.com_lazyPrepareCriticalPages.js
*/
function main() {
<<<<<<< HEAD
	/** @type {import("./__global.js")} */
=======
	/** @type {import("./__global.js").Holder} */
>>>>>>> e10fb913 (u)
	let holder=1;
	holder;
	let cur=new Runner;
	if(/youtube.com/) {
		cur.n=new CustomInputMatcher(/youtube.com/,() => location.origin,"youtube_lazy_pages");
		let bp_class=class {
			/**
			 * @param {any} a
			 * @param {any} b
			 */
			constructor(a,b) {
				this.a=a;
				this.b=b;
			}
		};
		let preparePage_breakpoint=new bp_class(`{
			let v=f.preparePage
			Object.defineProperty(f,'preparePage',{get:function(){debugger;return v},set:function(x){v=x}})
			false
		}
		/*atString(lazyPrepareCriticalPages).getObjectVar()==="f"*/`,'desktop_polymer.js');
		preparePage_breakpoint.a;
	}
	cur.f=function() {
<<<<<<< HEAD
		if(!window.debug) throw new Error("needs devtools open for debug function");
		if(!window.undebug) throw new Error("1");
		window.debug.u=window.undebug;
=======
		if(!debug) throw new Error("needs devtools open for debug function");
		if(!undebug) throw new Error("1");
		debug.u=undebug;
		debug=debug;
>>>>>>> e10fb913 (u)
		/**
		 * @param {any[]} e
		 */
		function ts(e) {
			return e[0];
		}
<<<<<<< HEAD
		window.debug(ts,'e=[e[1]];0');
		let ret=ts([0,1]);
		console.log(ret);
		window.undebug(ts);
=======
		debug(ts,'e=[e[1]];0');
		let ret=ts([0,1]);
		console.log(ret);
		undebug(ts);
>>>>>>> e10fb913 (u)
		if(ret!=1) {
			console.log('old_console_api');
			delete window.debug;
			return;
		}
<<<<<<< HEAD
=======
		/**
		 * @param {debugI} x
		 * @param {new () => any} func_obj
		 */
		function test_callback_root(x,func_obj) {
			let tst;
			if(x.fo_test) {
				tst=x.fo_test;
			} else {
				tst=new func_obj;
				x.fo_test=tst;
			}
			if(tst.is_open) {
				tst.abort();
				tst.is_open=false;
			}
			tst.open('GET',location.origin);
			tst.is_open=true;
			tst.send();
		};
		/**
		 * @param {string} a
		 * @param {"send"} n
		 * @param {(x: debugI, func_obj: new () => any)=>void} test_callback
		 */
		function runner(a,n,test_callback) {
			if(!debug) throw new Error("needs devtools open for debug function");
			/**
			 * @param {{ [x: string]: () => void; }} proto
			 * @param {string} name
			 * @param {any} func_obj
			 * @param {(x: debugI, func_obj: new () => any)=>void} test_callback
			 */
			function bp_proto(proto,name,func_obj,test_callback) {
				if(!debug) throw new Error("needs devtools open for debug function");
				let x=debug;
				if(!x.u) throw new Error("needs devtools open for debug function");
				x.f=proto[name];
				x.u(x.f);
				x(x.f,`
				{
					let __uf=Symbol(2),__get=function(__arg){try{return eval(__arg)}catch{return __uf}}
					{
						let x=debug
						try{
							if(x.cb)x.cb(__get)
						}catch(e){
							console.log('uerr',e)
						}
						x.u(x.f)
					}
				};0`);
				test_callback(x,func_obj);
			}
			/** @type {any} */
			let any_win=window;
			/** @type {{[x:string]: any}} */
			let want_win=any_win;
			/** @type {any} */
			let func_obj=want_win[a];
			let func_proto=func_obj.prototype;
			function native_callback() {
				if(!debug) throw new Error("needs devtools open for debug function");
				if(func_proto[n].toString().indexOf('[native code]')>-1) {
					class callback {
						constructor() {
							/** @type {{send():void}|null} */
							this.xmhrp=null;
						}
						/**
						 * @param {any} g_val
						 */
						run(g_val) {
							if(!this.xmhrp) throw new Error("Missing xmhrp value");
							this.r_get=g_val;
							console.log('ncb',func_proto[n],this.xmhrp[n]);
						}
					}
					let cb_obj=new callback;
					debug.cb=()=>{
						return cb_obj;
					};
					bp_proto(func_proto,n,func_obj,function() {});
					return true;
				}
				return false;
			}
			let ret=native_callback();
			if(ret) {
				return;
			}
			class callback {
				constructor() {
					/** @type {{send():void}|null} */
					this.xmhrp=null;
				}
				/**
				 * @param {(arg0: string) => { send(): void; } | null} g_val
				 */
				run(g_val) {
					this.get=g_val;
					this.xmhrp=g_val(a+'_prototype');
					if(!this.xmhrp) throw new Error("failed to get xmhrp from some prototype");
					let _xmhrp=func_obj.prototype;
					let xmhrp_send=this.xmhrp.send;
					let _xmhrp_send=_xmhrp.send;
					this.xmhrp.send=_xmhrp_send;
					_xmhrp.send=xmhrp_send;
					console.log('ntv_val',xmhrp_send);
					Promise.resolve().then(() => native_callback());
				}
			}
			let cb_obj=new callback;
			debug.cb=()=>{
				return cb_obj;
			};
			bp_proto(func_proto,n,func_obj,test_callback);
		}
		/**
		 * @param {debugI} x
		 * @param {new () => any} func_obj
		 */
		function do_test_callback_root(x,func_obj) {
			test_callback_root(x,func_obj);
		}
		runner('XMLHttpRequest','send',do_test_callback_root);
>>>>>>> e10fb913 (u)
		return 'done';
	};
	cur.value=cur.do_cur();
	return cur.make_ret();
	//# sourceURL=snippet:///%24_2
}
window.__ret=main();

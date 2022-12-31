import {CustomInputMatcher} from "../support/CustomInputMatcher.js";
import {Runner} from "../support/Runner.js";

/* spell:words
--- version_list item 2 ---
v1 (cur): snippet_repo/javascript/final/youtube.com_lazyPrepareCriticalPages.js
*/
function main() {
	/** @type {import("./__global.js")} */
	let holder=1;
	holder;
	let cur=new Runner;
	if(/youtube.com/) {
		cur.n=new CustomInputMatcher(/youtube.com/,() => location.origin,"youtube_lazy_pages");
		let bp_class=class {
			/** @arg {any} a @arg {any} b */
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
		if(!window.debug) throw new Error("needs devtools open for debug function");
		if(!window.undebug) throw new Error("1");
		window.debug.u=window.undebug;
		/** @arg {any[]} e */
		function ts(e) {
			return e[0];
		}
		window.debug(ts,'e=[e[1]];0');
		let ret=ts([0,1]);
		console.log(ret);
		window.undebug(ts);
		if(ret!=1) {
			console.log('old_console_api');
			delete window.debug;
			return;
		}
		return 'done';
	};
	cur.value=cur.do_cur();
	return cur.make_ret();
	//# sourceURL=snippet:///%24_2
}
window.__ret=main();

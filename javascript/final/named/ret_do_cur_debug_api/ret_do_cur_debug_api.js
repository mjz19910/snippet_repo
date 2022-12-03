import {Runner} from "../../support/Runner.js";

/* spell:words
--- version_list item 2 ---
v1 (cur): snippet_repo/javascript/final/ret_do_cur_debug_api/ret_do_cur_debugApi.js
*/
function main() {
	/** @arg {any} v */
	function any(v) {return v;}
	/** @type {import("./__global.js").Holder} */
	let holder={use() {} };
	holder.use();
	class CustomInputMatcher {
		/**
		 * @param {any} t_needle
		 * @param {any} t_string_getter
		 */
		constructor(t_needle,t_string_getter) {
			this.ts_get=t_string_getter;
			this.tr=t_needle;
		}
		get test_string() {
			return this.ts_get();
		}
		get test_needle() {
			return this.tr;
		}
	}
	let cur=new Runner;
	cur.n="example";
	cur.f=function() {
		// example function
		console.log("hello world!");
	};
	cur.value=cur.do_cur();
	return cur;
	//# sourceURL=snippet:///%24_2
}
window.__ret=main();

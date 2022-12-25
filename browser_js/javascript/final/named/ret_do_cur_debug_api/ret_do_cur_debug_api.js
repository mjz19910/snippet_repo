import {Runner} from "../../support/Runner.js";

/* spell:words
--- version_list item 2 ---
v1 (cur): snippet_repo/javascript/final/ret_do_cur_debug_api/ret_do_cur_debugApi.js
*/
function main() {
	/** @type {import("./__global.js")} */
	let holder=1;
	holder;
	let cur=new Runner;
	cur.n="example";
	cur.f=function() {
		// example function
		console.log("hello world!");
	};
	cur.value=cur.do_cur();
	return cur.make_ret();
	//# sourceURL=snippet:///%24_2
}
window.__ret=main();

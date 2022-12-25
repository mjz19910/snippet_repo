import {Runner} from "../support/Runner.js";

/* spell:words
--- version_list item 2 ---
v1 (cur): snippet_repo/javascript/final/history_length_logger/history_length_logger.js
*/
function main() {
	let cur=new Runner;
	cur.n='history_length_logger';
	cur.f=function() {
		window.name=history.length.toString();
		console.log(window.name,history.length);
		history.go(-26);
	};
	cur.value=cur.do_cur();
	return cur.make_ret();
	//# sourceURL=snippet:///%24_2
}
/** @typedef {{click: (arg0: number,arg1: number) => void; opened: {field: {[x: string]: undefined;}; get: (arg0: number,arg1: number) => boolean;}; mines: {field: {[x: string]: boolean;};};}} __MType */
window.__ret=main();

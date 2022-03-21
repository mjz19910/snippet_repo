import {runInContext} from "vm";
import {HTMLLexerState} from "./HTMLLexerState.js";
const my_filename = import.meta.url;
/**@arg {HTMLLexerState} obj*/
export function ctx_exec(obj) {
	runInContext(`
(function(){
	debugger;
	let s=this.s;
	console.log('ce', this);
	this.del_all_properties(s, s.cur);
	while(s.new_del.length > 60){
		let xx=s.new_del.pop();
		s.cur=xx;
		let pl=s.new_del.length;
		this.del_all_properties(s, xx);
		let al=s.new_del.length;
		try {
			console.log('pd', al - pl);
		} catch(e) {
			e;
			debugger;
		}
	}
	console.log('cc pr', this.obj_api);
	console.log('s.cur', s.cur);
})()`, obj.ctx, {"filename": my_filename, lineOffset: 5});
}


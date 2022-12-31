import {Runner} from "../support/Runner.js";

/* spell:words
--- version_list item 2 ---
v1 (cur): snippet_repo/javascript/final/lunar-atoms-tycoon.js
*/
function main() {
	/** @type {import("./__global.js")} */
	let holder=1;
	holder;
	let cur=new Runner;
	/* cspell: disable-next-line */
	cur.n="crazygames.com/game/lunar-atoms-tycoon";
	cur.f=function() {
		var etm=window.events;
		var e;
		var t=window.syms;
		e=etm;
		class Logger {
			/**
			 * @arg {any[]} a
			 */
			log(...a) {
				console.log(...a);
			}
		}
		var logger=new Logger;
		t.root[t.log_sym]=logger;
		logger.log=console.log.bind(console);
		var event_info=e[134];
		window.event_info=event_info;
		var state=window.state;
		/*class_gen_scope*/ {
			/*class_scope*/ {
				t.data_arr.put=function(/** @type {{ [x: string]: any[][]; }} */ obj,/** @type {string | number} */ target,/** @type {string | any[]} */ cur) {
					var nv=cur.slice(1+this.off,cur[this.off]+1);
					/** @type {any[][]} */
					var arr_out=[];
					var cc=-1;
					for(let i=0;i<nv.length;i++) {
						if(nv[i] instanceof state.sym_null_class) {
							cc++;
							arr_out.push([]);
							arr_out[cc].push(nv[i]);
						} else {
							arr_out[cc].push(nv[i]);
						}
					}
					var arr_rep=arr_out.slice();
					for(cc=0;cc<arr_rep.length;cc++) {
						arr_rep[cc][0].array_put(arr_rep,cc,arr_rep[cc]);
					}
					obj[target]=arr_rep;
					var rest=cur.slice(cur[this.off]+1);
					if(rest.length>0)
						this[t.log_sym].log(rest);
					return cur[this.off]+1;
				};
			}
		}
		var x0=event_info[0].submit(event_info);
		let lnx="EventTarget";
		t.root[t.log_sym].log(lnx+" ".repeat(28-x0.str.length-lnx.length)+x0.str,...x0.arr);
		var x1=x0.arr[1][1];
		var y=Function.events[x1.__bound_event_id__];
		var x2=y[0].submit(y);
		lnx="Function";
		t.root[t.log_sym].log(lnx+" ".repeat(28-x2.str.length-lnx.length)+x2.str,...x2.arr);
		window.x2=x2;
		return 'done';
	};
	cur.value=cur.do_cur();
	return cur.make_ret();
	//# sourceURL=snippet:///%24_2
}
window.__ret=main();

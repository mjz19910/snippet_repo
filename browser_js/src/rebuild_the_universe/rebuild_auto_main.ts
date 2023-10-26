import {GoogleAdList} from "./GoogleAdList.ts";
import {DocumentWriteList} from "./document_write_list/DocumentWriteList.js";
import {dom_add_elm_filter} from "./dom_add_elm_filter.ts";
import {move_timers_to_worker_promise_executor} from "./worker_api/move_timers_to_worker_promise_executor.js";
import {on_timers_moved} from "./on_timers_moved.ts";
import {proxy_jquery} from "./jquery/proxy_jquery.js";
import {remove_bad_dom_script_element} from "./remove_bad_dom_script_element.ts";
import {cint_arr} from "./cint_arr.ts";

export function rebuild_auto_main() {
	let enable_proxy=true;
	window.cint_arr=cint_arr;
	if(enable_proxy) {
		proxy_jquery();
	}
	let adsbygoogle=window.adsbygoogle;
	let new_arr=[] as unknown as GoogleAdList;
	window.adsbygoogle=new_arr;
	adsbygoogle.op=adsbygoogle.push;
	adsbygoogle.push=e => {
		adsbygoogle.op(e);
		remove_bad_dom_script_element();
	};
	var prev_node_prototype_insertBefore=Node.prototype.insertBefore;
	document.addEventListener('onContentLoaded',remove_bad_dom_script_element);
	Node.prototype.insertBefore=(<any>function <T extends Node>(this: T,node: T,child: Node|null,...rest: []) {
		console.assert(rest.length===0,"unexpected arguments for overwritten Node.prototype.insertBefore");
		let should_insert_1,should_insert_2;
		if(node instanceof HTMLScriptElement) {
			should_insert_1=dom_add_elm_filter(node);
		}
		if(child instanceof HTMLScriptElement) {
			should_insert_2=dom_add_elm_filter(child);
		}
		if(!should_insert_1||!should_insert_2)
			return node;
		return prev_node_prototype_insertBefore.call(this,node,child);
	});
	remove_bad_dom_script_element();
	window.on_on_timers_moved_first=true;
	let move_timers_to_worker=new Promise(move_timers_to_worker_promise_executor);
	move_timers_to_worker.then(on_timers_moved);
	setTimeout(remove_bad_dom_script_element,0);
	window.document_write_list=new DocumentWriteList;
	window.document_write_list.attach_proxy(document);
	document.stop=function() {};
}

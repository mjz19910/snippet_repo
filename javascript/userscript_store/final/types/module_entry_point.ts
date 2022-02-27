import {DocumentWriteList} from "./DocumentWriteList";
import {move_timers_to_worker_promise_executor} from "./move_timers_to_worker_promise_executor";
import {remove_bad_dom_script_element} from "./remove_bad_dom_script_element";
import {proxy_jquery} from "./proxy_jquery";
import {on_timers_moved} from "./on_timers_moved";
import {dom_add_elm_filter} from "./dom_add_elm_filter";
import {cint_arr} from "./mod";

export function main() {
	let enable_proxy = true;
	window.cint_arr = cint_arr;
	if(enable_proxy) {
		proxy_jquery();
	}
	window.adsbygoogle = [] as any;
	window.adsbygoogle.op = window.adsbygoogle.push;
	window.adsbygoogle.push = function(e: any) {
		window.adsbygoogle.op(e);
		remove_bad_dom_script_element();
	};
	var prev_node_prototype_insertBefore = Node.prototype.insertBefore;
	document.addEventListener('onContentLoaded', remove_bad_dom_script_element);
	let seen_proto: any[] = [];
	Node.prototype.insertBefore = function <T extends Node>(node: T, child: Node | null): T {
		let res, p_res;
		if(node instanceof HTMLScriptElement) {
			let should_insert_1 = dom_add_elm_filter(node);
			if(!should_insert_1)
				return node;
		}
		if(child instanceof HTMLScriptElement) {
			let should_insert_1 = dom_add_elm_filter(child);
			if(!should_insert_1)
				return node;
		}
		res = node;
		p_res = Object.getPrototypeOf(res);
		if(!seen_proto.includes(p_res)) {
			seen_proto.push(p_res);
			console.log(res, p_res);
		}
		res = child;
		p_res = Object.getPrototypeOf(res);
		if(!seen_proto.includes(p_res)) {
			seen_proto.push(p_res);
			console.log(res, p_res);
		}
		return prev_node_prototype_insertBefore.call(this, node, child) as T;
	};
	remove_bad_dom_script_element();
	window.on_on_timers_moved_first = true;
	let move_timers_to_worker = new Promise(move_timers_to_worker_promise_executor);
	move_timers_to_worker.then(on_timers_moved);
	setTimeout(remove_bad_dom_script_element, 0);
	window.document_write_list = new DocumentWriteList;
	document.stop = function() {};
}

import {dom_add_elm_filter} from "./dom_add_elm_filter";

/**@type {(this:Node, node: Node, child: Node | null)=>boolean}*/
export function insert_before_enabled(node, child) {
	if(node instanceof HTMLScriptElement) {
		let should_insert_1 = dom_add_elm_filter(node);
		if(!should_insert_1)
			return false;
	}
	if(child instanceof HTMLScriptElement) {
		let should_insert_2 = dom_add_elm_filter(child);
		if(!should_insert_2)
			return false;
	}
	return true;
}

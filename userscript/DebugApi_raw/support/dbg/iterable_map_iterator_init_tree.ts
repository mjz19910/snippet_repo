import {get_prototype} from "./get_prototype.js";

export function iterable_map_iterator_init_tree() {
	let iterable_map_value=new Map;
	let iterable_map_iterator_values=iterable_map_value.values();
	let iterable_map_iterator_prototype=get_prototype(iterable_map_iterator_values);
	let iterator_prototype=get_prototype(iterable_map_iterator_prototype);
	let object_prototype=get_prototype(iterator_prototype);
	if(object_prototype!==Object.prototype)
		debugger;
	iterator_prototype;
}

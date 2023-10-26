import {get_prototype} from "./get_prototype.ts";

export function iterable_map_iterator_init_tree() {
	const iterable_map_value=new Map;
	const iterable_map_iterator_values=iterable_map_value.values();
	const iterable_map_iterator_prototype=get_prototype(iterable_map_iterator_values);
	const iterator_prototype=get_prototype(iterable_map_iterator_prototype);
	const object_prototype=get_prototype(iterator_prototype);
	if(object_prototype!==Object.prototype)
		// deno-lint-ignore no-debugger
		debugger;
	iterator_prototype;
}

/** @arg {string[]} target_source_arr
 * @arg {string[]} target_new_items */
export function get_missing_set(target_source_arr, target_new_items) {
	let set_cache = new Set;
	let set_neq = new Set;
	for(let i of target_source_arr) {
		set_cache.add(i);
	}
	for(let i of target_new_items) {
		if(!set_cache.has(i)) {
			set_neq.add(i);
		}
	}
	return set_neq;
}

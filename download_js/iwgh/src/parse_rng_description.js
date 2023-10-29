/** @type {Set<string>} */
export const description_cache_set = new Set();
export const description_set_state = {
	modified: false,
};
/** @param {string} description */
export function parse_rng_description(description) {
	if (!description_cache_set.has(description)) {
		description_cache_set.add(description);
		console.log(["new_description", description]);
		description_set_state.modified = true;
	}
}

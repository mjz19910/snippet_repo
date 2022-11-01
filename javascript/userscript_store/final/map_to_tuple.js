/**
 * @this {any[]}
 * @param {any} e
 * @param {number} i
 * @return {[any, any]}
 */
export function map_to_tuple(e, i) {
	return [e, this[i]];
}

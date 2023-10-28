/**
 * @param {string} str
 * @param {string} needle
 */
export function split_at(str, needle) {
	let idx = str.indexOf(needle);
	if (idx === -1) return [str];
	const n_len = needle.length;
	const arr = [];
	let start = 0;
	do {
		const sp = str.slice(start, idx + n_len);
		arr.push(sp);
		start = idx + n_len;
		idx = str.indexOf(needle, start);
	} while (idx !== -1);
	return arr;
}

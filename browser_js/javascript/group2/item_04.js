/* spell:words
--- version_list item 1 ---
v1 (cur): snippet_repo/javascript/group2/item_04.js
*/
window.__primitive_map__ ??= new Map();
{
	/** @type {any[]} */
	let seen_arr = [];
	/**
	 * @param {string} base
	 * @param {{ [x: string]: any; } | null} o
	 */
	function iter_entries(base, o) {
		if (o == null)
			return;
		if (seen_arr.includes(o))
			return;
		let pd1 = Object.getOwnPropertyDescriptors(o);
		for (let[k1] of Object.entries(pd1)) {
			let o2;
			try {o2 = o[k1];} catch {continue;}
			let kx = `${base}.${k1}`;
			let mk = __primitive_map__.get(o2);
			if (mk && mk.keys) {
				mk.keys.push(kx);
				continue;
			}
			__primitive_map__.set(o2, {
				keys: [kx]
			});
		}
	}
	let pd = Object.getOwnPropertyDescriptors(window);
	for (let[k,od] of Object.entries(pd)) {
		let o;
		if ("value" in od)
			o = od.value;
		else {
			continue;
		}
		if (seen_arr.includes(o))
			continue;
		seen_arr.push(o);
		let mk = __primitive_map__.get(o);
		if (mk && mk.keys) {
			mk.keys.push(k);
			continue;
		}
		__primitive_map__.set(o, {
			keys: [k]
		});
		if (typeof o === "function") {
			iter_entries(k, o);
			if (o.prototype === null)
				continue;
			iter_entries(`${k}.prototype`, o.prototype);
			continue;
		}
		if (typeof o !== "object" || o === null)
			continue;
		iter_entries(k, o);
	}
}

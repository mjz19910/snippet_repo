/* spell:words
--- version_list item 1 ---
v1 (cur): snippet_repo/javascript/group2/item_04.js
*/
window.__primitive_map__ ??= new Map();
for (let[k,o] of Object.entries(window)) {
	let mk = __primitive_map__.get(o);
	if (mk && mk.keys) {
		mk.keys.push(k);
		continue;
	}
	__primitive_map__.set(o, {
		keys: [k]
	});
	if (typeof o !== "object" || o === null)
		continue;
	for (let[k1,o1] of Object.entries(o)) {
		let o = o1;
		let kx = `${k}.${k1}`;
		let mk = __primitive_map__.get(o);
		if (mk && mk.keys) {
			mk.keys.push(kx);
			continue;
		}
		__primitive_map__.set(o, {
			keys: [kx]
		});
	}
}

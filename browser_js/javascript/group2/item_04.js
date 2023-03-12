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

import {as} from "/run/as.js";

/** @param {NS} ns */
export async function main(ns) {
	// All servers that are one hop from the current server.
	ns.tprint("All servers.");
	let scanned_set=new Set;
	let server_paths=new Map;
	/** @type {ScriptFlags} */
	let f_=as(ns.flags([]));
	const start_server=f_._[0];
	let n_stack=[start_server];
	server_paths.set(start_server,start_server);
	let cur_pos=null;
	do {
		cur_pos=n_stack.shift();
		if(cur_pos===void 0) break;
		if(scanned_set.has(cur_pos)) continue;
		let neighbors=ns.scan(cur_pos);
		scanned_set.add(cur_pos);
		for(let i=0;i<neighbors.length;i++) {
			const neighbor=neighbors[i];
			if(scanned_set.has(neighbor)) continue;
			n_stack.push(neighbor);
			ns.tprint(neighbor,",");
		}
	} while(cur_pos!==void 0);
}

/** @typedef {{_:[string]}} ScriptFlags */

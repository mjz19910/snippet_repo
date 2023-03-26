import {as} from "../helper/as.js";

/** @param {NS} ns */
export async function main(ns) {
	ns.tail();
	ns.clearLog();
	ns.disableLog("disableLog");
	ns.disableLog("scan");

	/** @type {ScriptFlags} */
	let flags_=as(ns.flags([
		["start","home"],
		["grep",null],
		["exclude_ext",".js"],
	]));
	let scanned_set=new Set;
	let server_paths=new Map;
	const start_server=flags_.start;
	let n_stack=[start_server];
	server_paths.set(start_server,start_server);
	let cur_pos=null;
	do {
		cur_pos=n_stack.shift();
		if(cur_pos===void 0) break;
		if(scanned_set.has(cur_pos)) continue;
		let path=server_paths.get(cur_pos);
		let neighbors=ns.scan(cur_pos);
		scanned_set.add(cur_pos);
		for(let i=0;i<neighbors.length;i++) {
			const neighbor=neighbors[i];
			if(neighbor==="home") continue;
			if(scanned_set.has(neighbor)) continue;
			n_stack.push(neighbor);
			const n_path=path+"/"+neighbor;
			server_paths.set(neighbor,n_path);
			let remote_dir=ns.ls(neighbor);
			if(remote_dir.length===0) continue;
			const filtered_dir=remote_dir
				.filter(file => file.includes(flags_.grep??""))
				.filter(file => !file.endsWith(flags_.exclude_ext));
			if(filtered_dir.length===0) continue;
			ns.print("--host ",neighbor," --files ",filtered_dir);
		}
	} while(cur_pos!==void 0);
}
/** @typedef {{start:string;exclude_ext: string;grep: string|null;_:string[]}} ScriptFlags */

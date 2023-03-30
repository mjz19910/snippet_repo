/** @template {{}} T @typedef {T extends infer A ? keyof A : never} T_DistributedKeyof */
/** @template {{}} T @typedef {T_DistributedKeyof<T> extends never?[]:T_DistributedKeyof<T>[]} T_DistributedKeysOf */
/** @protected @template {{}} T @arg {T} obj @returns {T_DistributedKeysOf<T>} */
export function get_keys_of(obj) {
	if(!obj) {
		debugger;
	}
	let rq=Object.keys(obj);
	/** @private @type {any} */
	let ra=rq;
	return ra;
}

/** @param {NS} ns */
export function getNetworkNodes(ns) {
	// Depth first search traversal
	ns.print("Retrieving all nodes in network");
	/** @type {Map<string,boolean>} */
	var visited=new Map;
	var stack=[];
	var origin=ns.getHostname();
	stack.push(origin);

	while(stack.length>0) {
		var node=stack.pop();
		if(!node) break;
		if(!visited.get(node)) {
			visited.set(node,true);
			var neighbours=ns.scan(node);
			for(var i=0;i<neighbours.length;i++) {
				var child=neighbours[i];
				if(visited.get(child)) {
					continue;
				}
				stack.push(child);
			}
		}
	}
	return [...visited.keys()];
}

/** @param {NS} ns @arg {string} server */
export function canHack(ns,server) {
	var pHackLvl=ns.getHackingLevel();
	var sHackLvl=ns.getServerRequiredHackingLevel(server);
	return pHackLvl>=sHackLvl;
}

/** @param {NS} ns */
export async function main(ns) {
	ns.disableLog("disableLog");
	ns.disableLog("clearLog");
	ns.clearLog();
	ns.tail();
	let hacknet_entries = get_hacknet_node_entries(ns);
	if (hacknet_entries.length < 9) {
		let node_id = ns.hacknet.purchaseNode();
		ns.print("new node", node_id);
	}
	let nodes_not = hacknet_entries.filter(v => (v[1].level % 10) !== 0);
	hacknet_entries = hacknet_entries.filter(v => v[1].level % 10 === 0);
	nodes_not.forEach(([idx, { level }]) => ns.hacknet.upgradeLevel(idx, 10 - level % 10));
	if (nodes_not.length > 0) {
		ns.print(ns.hacknet.getNodeStats(nodes_not[0][0]));
		return;
	}
	let min_node_entry = hacknet_entries.reduce((v, u) => u[1].level > v[1].level ? v : u);
	const min_node = min_node_entry[1];
	if (min_node.level < 200) {
		let upgrade_entries = hacknet_entries.filter(v => min_node.level === v[1].level);
		upgrade_entries.forEach(v => upgrade_node_level_entry(ns, ...v));
	}
	hacknet_entries.forEach(v => upgrade_node_ram(ns, ...v));
	hacknet_entries.forEach(v => upgrade_node_cores(ns, ...v));
	ns.print(ns.hacknet.getNodeStats(min_node_entry[0]));
}
/** @param {NS} ns @arg {number} idx @arg {NodeStats} node */
function upgrade_node_cores(ns, idx, node) {
	if (node.cores >= 16) return;
	ns.hacknet.upgradeCore(idx, 16 - node.cores);
}
/** @param {NS} ns @arg {number} idx @arg {NodeStats} node */
function upgrade_node_ram(ns, idx, node) {
	if (node.ram >= 64) return;
	let cur_ram_n = Math.log2(node.ram);
	ns.hacknet.upgradeRam(idx, 8 - cur_ram_n);
}
/** @param {NS} ns @arg {number} idx @arg {NodeStats} node */
function upgrade_node_level_entry(ns, idx, node) {
	ns.hacknet.upgradeLevel(idx, 10);
	node.level += 10;
}
/** @param {NS} ns */
function get_hacknet_node_entries(ns) {
	/** @type {[number,NodeStats][]} */
	let node_list = [];
	let i = 0, len = ns.hacknet.numNodes();
	while (i < len) {
		let node_info = ns.hacknet.getNodeStats(i);
		node_list.push([i, node_info]);
		++i;
	}
	return node_list;
}
/** @param {NS} ns */
export async function main(ns) {
	ns.disableLog("disableLog");
	ns.disableLog("clearLog");
	ns.clearLog();
	ns.tail();
	let hacknet_nodes = get_hacknet_node_entries(ns);
	let nodes_not = hacknet_nodes.filter(v => (v[1].level % 10) !== 0);
	hacknet_nodes = hacknet_nodes.filter(v => v[1].level % 10 === 0);
	nodes_not.forEach(([idx, node]) => {
		ns.hacknet.upgradeLevel(idx, 10 - node.level % 10);
	});
	if (nodes_not.length > 0) {
		ns.print(ns.hacknet.getNodeStats(nodes_not[0][0]));
		return;
	}
	let min_node = hacknet_nodes.reduce((v, u) => u[1].level > v[1].level ? v : u);
	if (min_node[1].level >= 100) return;
	let upgrade_entries = hacknet_nodes.filter(v => min_node[1].level === v[1].level);
	upgrade_entries.forEach(entry => {
		ns.hacknet.upgradeLevel(entry[0], 10);
	});
	ns.print(ns.hacknet.getNodeStats(upgrade_entries[0][0]));
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
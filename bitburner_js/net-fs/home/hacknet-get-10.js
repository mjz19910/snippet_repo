/** @param {NS} ns */
export async function main(ns) {
	ns.disableLog("disableLog");
	ns.disableLog("hacknet.getNodeStats");
	ns.disableLog("clearLog");
	ns.clearLog();
	ns.tail();
	get_hacknet_node_entries(ns)
		.filter(v => (v[1].level % 10) !== 0)
		.forEach(([idx, node]) => {
			ns.hacknet.upgradeLevel(idx, 10 - node.level % 10);
			ns.print(ns.hacknet.getNodeStats(idx));
		});
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
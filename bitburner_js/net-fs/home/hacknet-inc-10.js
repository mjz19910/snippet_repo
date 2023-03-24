/** @param {NS} ns */
export async function main(ns) {
	ns.disableLog("disableLog");
	ns.disableLog("clearLog");
	ns.clearLog();
	ns.tail();
	let hacknet_nodes = get_hacknet_nodes(ns);
	let min_node = hacknet_nodes.reduce((v, u) => u.level > v.level ? v : u);
	let upg_nodes = hacknet_nodes.filter(v => min_node.level === v.level);
	ns.print(upg_nodes[0]);
}
/** @param {NS} ns */
function get_hacknet_nodes(ns) {
	ns.disableLog("hacknet.getNodeStats");
	let node_list = [];
	let i = 0;
	while (true || true) {
		try {
			let node_info = ns.hacknet.getNodeStats(i);
			node_list.push(node_info);
		} catch (e) { break; }
		++i;
	}
	return node_list;
}

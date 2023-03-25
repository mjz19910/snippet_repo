/** @param {NS} ns */
export async function main(ns) {
	ns.disableLog("disableLog");
	ns.disableLog("scan");
	ns.tail();
	ns.killall("home", true);
	let killed = new Set;
	let next = ["home"];
	for (let cur; cur = next.pop();) {
		x: if (cur !== "home") {
			if (ns.ps(cur).length <= 0) break x;
			ns.killall(cur);
		}
		killed.add(cur);
		const scan_res = ns.scan(cur);
		for (let srv of scan_res) {
			if (killed.has(srv)) continue;
			next.push(srv);
		}
	}
}
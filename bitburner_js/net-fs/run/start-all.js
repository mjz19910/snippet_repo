/** @param {NS} ns */
export async function main(ns) {
	let ps_arr = ns.ps();
	for (let item of ps_arr) {
		ns.closeTail(item.pid);
	}
	ns.killall();
	ns.run("/run/remote-share.js");
	ns.run("/run/init-hack.js");
	ns.run("/run/purchase-server.js");
	ns.run("/run/purchase-hacknet.js");
}

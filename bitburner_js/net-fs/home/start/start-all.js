/** @param {NS} ns */
export async function main(ns) {
	let ps_arr = ns.ps();
	for (let item of ps_arr) {
		ns.closeTail(item.pid);
	}
	ns.killall();
	ns.run("/_auto/remote-share.js");
	await ns.sleep(1000);
	ns.run("/_auto/init-hack.js");
	ns.run("/_auto/purchase-server.js");
	ns.run("/_auto/purchase-hacknet.js");
}

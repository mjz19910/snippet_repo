/** @param {NS} ns */
export async function main(ns) {
	let ps_arr=ns.ps();
	for(let item of ps_arr) {
		ns.closeTail(item.pid);
	}
	ns.killall();
	ns.rm("/data/backdoor_list.txt","home");
	ns.run("/init/remote-share.js");
	ns.run("/init/init-hack.js");
	ns.run("/init/purchase-server.js");
	ns.run("/init/purchase-hacknet.js");
}

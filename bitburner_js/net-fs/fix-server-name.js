
/** @param {NS} ns */
export async function main(ns) {
	ns.tail();
	ns.disableLog("disableLog");
	ns.disableLog("getServerMaxRam");
	let servers=ns.getPurchasedServers();
	/** @arg {string} hostname */
	function get_ram(hostname) {return ns.getServerMaxRam(hostname);}
	let ram=get_ram(servers[0]);
	for(let i=0;i<servers.length;i++) {
		ns.renamePurchasedServer(servers[i],`big-${ram}-${i}-1`);
	}
	for(let i=0;i<servers.length;i++) {
		ns.renamePurchasedServer(`big-${ram}-${i}-1`,`big-${ram}-${i}`);
	}
}

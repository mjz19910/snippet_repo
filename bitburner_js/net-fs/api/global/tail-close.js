/** @param {NS} ns */
export async function main(ns) {
	ns.disableLog("disableLog");
	ns.disableLog("scan");
	ns.killall("home",true);
	/** @param {ProcessInfo} item */
	function close_script_tail(item) {
		ns.closeTail(item.pid);
	}
	ns.getRecentScripts().forEach(close_script_tail);
	ns.ps("home").forEach(close_script_tail);
}

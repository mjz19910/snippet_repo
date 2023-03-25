/** @param {NS} ns */
export async function main(ns) {
	ns.tail();
	let res = ns.flags([
		["target", ""],
		["t", 1]
	]);
	const target_script = "early-hack-template-v2.js";
	const pos = res._;
	ns.scp(target_script, res.target);
	ns.tprintf("run %s %s -t %s %s", target_script, res.target, res.t, pos[0]);
	let pid = ns.exec(target_script, res.target, res.t, pos[0]);
	if (pid === 0) {
		await ns.sleep(3000);
		ns.closeTail();
		ns.tprint("Failed to run ", target_script);
	} else {
		ns.closeTail();
		ns.tail(pid);
	}
}
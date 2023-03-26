/** @param {NS} ns */
export async function get_has_ssh_0day(ns) {
	return ns.fileExists("BruteSSH.exe", "home");
}
/** @param {NS} ns */
export async function main(ns) {
	const dir = ns.args[0];
	let all_files = ns.ls("home");
	let match = all_files.filter(v => {
		return v.startsWith("/" + dir + "/");
	});
	for (let file of match) {
		ns.rm(file);
	}
	ns.tprint(match);
}

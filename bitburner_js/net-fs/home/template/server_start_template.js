import { hack_template_v2 } from "./vars/server_start.js";
/** @param {NS} ns @arg {boolean} has_ssh_0day @arg {boolean} distribute @arg {boolean} template_changed @param {string} script_file @arg {number} hacking_skill @param {string} srv @arg {number} t */
export async function start_server_template(ns, has_ssh_0day, distribute, template_changed, script_file, hacking_skill, srv, t) {
	const processes = ns.ps(srv);
	if (processes.length > 0) {
		if (!template_changed && processes.find(ps => ps.filename === hack_template_v2)) return false;
		processes.forEach(ps => {
			if (ps.filename === hack_template_v2) ns.kill(ps.pid);
		});
	}
	if (ns.fileExists("debug.txt", srv)) {
		ns.exec(script_file, srv, t, hacking_skill, "debug.txt");
		return true;
	}
	if (distribute) ns.print("[",
		"b:", ns.getServer(srv).backdoorInstalled, " ",
		"lvl:", ns.getServerRequiredHackingLevel(srv), " ",
		srv, " ",
		"~/", "]>", " ",
		"run", " ",
		script_file, " ",
		"-t ", t, " ",
		hacking_skill,
	);
	let mode = "ssh-only";
	if (!has_ssh_0day) mode = "none";
	ns.exec(script_file, srv, t, hacking_skill, mode);
	return true;
}
/** @param {NS} ns */
export async function main(ns) {
	const use_hacked_servers = false;

	ns.tail();
	ns.clearLog();
	const share_script = "api_share.js";
	ns.kill(share_script);
	let thread_n = (ns.getServerMaxRam("home") - 48) / 4 | 0;
	let pid = ns.run(share_script, thread_n, "auto", "home");
	await ns.sleep(200);
	ns.closeTail(pid);

	// share purchased_servers
	let share_servers = ns.getPurchasedServers().slice(0, 16);
	for (let srv of share_servers) {
		if (!ns.ls(srv).includes(share_script)) {
			ns.scp(share_script, srv);
		}
		ns.killall(srv);
		let thread_n = ns.getServerMaxRam(srv) / 4 | 0;
		let pid = ns.exec(share_script, srv, thread_n, "auto", srv);
		await ns.sleep(200);
		ns.closeTail(pid);
	}
	if (!use_hacked_servers) return;
	let seen_srv = new Set;
	let servers_arr = [];
	let cur_srv = "home";
	while (cur_srv) {
		seen_srv.add(cur_srv);
		/** @type {number|null} */
		let pid = null;
		let srv = cur_srv;
		x: {
			if (srv.startsWith("big-")) break x;
			let hosts = ns.scan(srv);
			for (let host of hosts) {
				if (seen_srv.has(host)) continue;
				servers_arr.push(host);
			}
			if (srv === "home") break x;
			if (!ns.ls(srv).includes(share_script)) {
				ns.scp([share_script], srv);
			}
			ns.killall(srv);
			const server_ram = ns.getServerMaxRam(srv);
			if (server_ram === 0) break x;
			let thread_n = server_ram / 4 | 0;
			pid = ns.exec(share_script, srv, thread_n, "auto", srv);
		}
		if (servers_arr.length === 0) break;
		cur_srv = servers_arr.pop();
		if (!pid) continue;
		await ns.sleep(200);
		ns.closeTail(pid);
	}
}
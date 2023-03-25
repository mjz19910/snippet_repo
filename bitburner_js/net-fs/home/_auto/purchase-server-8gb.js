import { get_has_ssh_0day } from "./api/get-has_ssh_0day.js";
import { start_server_template } from "./api/server_start_template.js";

/** @param {NS} ns */
export async function main(ns) {
	ns.tail();
	ns.clearLog();
	ns.disableLog("disableLog");
	ns.disableLog("getServerMoneyAvailable");
	ns.disableLog("getServerMaxRam");
	ns.disableLog("sleep");
	ns.disableLog("scp");

	// How much RAM each purchased server will have. In this case, it'll
	// be 8GB.
	let ram = 8;
	let player_hacking_skill = ns.getPlayer().skills.hacking;
	let purchased_server_hostnames = ns.getPurchasedServers();
	let server_offset = purchased_server_hostnames.length;
	const purchased_server_limit = ns.getPurchasedServerLimit();
	const target_script = "early-hack-template-v2.js";
	const distribute = true;
	const template_changed = false;

	const has_ssh_0day = await get_has_ssh_0day(ns);

	/** @arg {string} srv */
	async function start_script(srv) {
		ns.scp(target_script, srv);
		let thread_n = ns.getServerMaxRam(srv) / 2.4 | 0;
		return start_server_template(ns, has_ssh_0day, distribute, template_changed, target_script, player_hacking_skill, srv, thread_n);
	}

	for (let hostname of purchased_server_hostnames) {
		let processes = ns.ps(hostname);
		if (processes.length === 0) {
			await start_script(hostname);
			continue;
		}
		ns.kill(processes[0].pid);
		await start_script(hostname);
	}

	// Iterator we'll use for our loop
	let i = server_offset;
	let delay = 1000;
	let server_money = ns.getServerMoneyAvailable("home");
	let last_server_money = server_money;
	function rename_purchased_server(ns, servers, old_srv, new_srv) {
		let idx = servers.indexOf(old_srv);
		servers[idx] = new_srv;
		let res = ns.renamePurchasedServer(old_srv, new_srv);
		if (!res) ns.exit();
	}
	async function increase_server_ram(prev_ram, ram, not_pserv, only_pserv) {
		const buy_cost1 = ns.getPurchasedServerCost(ram) - prev_ram;
		server_offset = not_pserv.length;
		i = server_offset;
		let max_delay = 60 * 1000 * 2;
		let min_delay = 5000;
		let acc_avg_dur = 0;
		for (const srv of only_pserv) {
			wl: for (; ;) {
				let cur_server_money = ns.getServerMoneyAvailable("home");
				if (cur_server_money > buy_cost1) {
					let old_proc = ns.ps(srv);
					old_proc.forEach(v => ns.kill(v.pid));
					ns.upgradePurchasedServer(srv, ram);
					await start_script(srv);
					rename_purchased_server(ns, only_pserv, srv, `big-${ram}-${i}`);
					++i;
					last_server_money = server_money;
					acc_avg_dur = delay;
					break wl;
				}
				await ns.sleep(delay);
				acc_avg_dur += delay;
				if (server_money < last_server_money) {
					last_server_money = server_money;
					acc_avg_dur = delay;
				}
				server_money = ns.getServerMoneyAvailable("home");
				if (server_money > buy_cost1) break wl;
				const cost_diff = buy_cost1 - last_server_money;
				const avg_duration_seconds = acc_avg_dur / 1000;
				const per_second_rate = (server_money - last_server_money) / avg_duration_seconds;
				if (per_second_rate >= 0) {
					const est_to_can_buy_server = cost_diff / (per_second_rate + 1);
					ns.print("money gain rate: $", ns.formatNumber(est_to_can_buy_server));
					delay = (est_to_can_buy_server / 6) * 1000;
				} else {
					delay = min_delay * 3;
				}
				if (!Number.isFinite(delay)) delay = min_delay;
				if (delay < min_delay) delay = min_delay;
				if (delay > max_delay) delay = max_delay;
				ns.print(`sleep ${delay / 1000}; upgrade ${srv} --ram [${ram},$${ns.formatNumber(buy_cost1)}]`);
			}
		}
	}
	/** @arg {`big-${number}`} prefix */
	async function split_server_prefix(prefix) {
		let not_pserv = purchased_server_hostnames.filter(e => !e.startsWith(prefix));
		let only_pserv = purchased_server_hostnames.filter(e => e.startsWith(prefix));
		const prev_ram = ram;
		ram *= 2;
		await increase_server_ram(prev_ram, ram, not_pserv, only_pserv);
		ns.print("only prefix: ", only_pserv);
	}
	purchased_server_hostnames = ns.getPurchasedServers();
	if (purchased_server_hostnames.length !== purchased_server_limit) {
		let only_pserv = [];
		for (let i = 0; i < purchased_server_limit; i++) {
			only_pserv.push(`big-${ram}-${i}`);
		}
		await increase_server_ram(prev_ram, ram, [], only_pserv);
	}
	let min_mem = purchased_server_hostnames.reduce(
		(a, r) =>
			ns.getServerMaxRam(a) > ns.getServerMaxRam(r) ? r : a
	);
	ram = ns.getServerMaxRam(min_mem);
	ns.print("min_mem: ", min_mem);
	await split_server_prefix(min_mem.split("-").slice(0, 2).join("-"));
}
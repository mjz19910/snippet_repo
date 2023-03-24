import {get_has_ssh_0day} from "./api/get-has_ssh_0day.js";
import {start_server_template} from "./api/server_start_template.js";

/** @param {NS} ns */
export async function main(ns) {
	ns.clearLog();
	ns.disableLog("disableLog");
	ns.disableLog("scp");
	ns.disableLog("getServerMoneyAvailable");

	// How much RAM each purchased server will have. In this case, it'll
	// be 8GB.
	let ram=8;
	let player_hacking_skill=ns.getPlayer().skills.hacking;
	let purchased_server_hostnames=ns.getPurchasedServers();
	let server_offset=purchased_server_hostnames.length;
	const target_script="early-hack-template-v2.js";
	const distribute=true;
	const template_changed=false;

	const has_ssh_0day=await get_has_ssh_0day(ns);

	/** @arg {string} srv */
	async function start_script(srv) {
		ns.scp(target_script,srv);
		let thread_n=ns.getServerMaxRam(srv)/2.4|0;
		return start_server_template(ns,has_ssh_0day,distribute,template_changed,target_script,player_hacking_skill,srv,thread_n);
	}

	for(let hostname of purchased_server_hostnames) {
		let processes=ns.ps(hostname);
		if(processes.length===0) {
			await start_script(hostname);
			continue;
		}
		ns.kill(processes[0].pid);
		await start_script(hostname);
	}

	ns.print("RAM: 8.00GB");
	ns.print("pserv-next ",server_offset);

	// Iterator we'll use for our loop
	let i=server_offset;
	let delay=1000;
	let server_money=ns.getServerMoneyAvailable("home");
	let last_server_money=server_money;


	// Continuously try to purchase servers until we've reached the maximum
	// amount of servers
	while(i<ns.getPurchasedServerLimit()) {
		// Check if we have enough money to purchase a server
		if(server_money>ns.getPurchasedServerCost(ram)) {
			// If we have enough money, then:
			//  1. Purchase the server
			//  2. Copy our hacking script onto the newly-purchased server
			//  3. Run our hacking script on the newly-purchased server with 3 threads
			//  4. Increment our iterator to indicate that we've bought a new server
			let hostname=ns.purchaseServer("pserv-"+i,ram);
			await start_script(hostname);
			++i;
		}
		//Make the script wait for a second before looping again.
		//Removing this line will cause an infinite loop and crash the game.
		await ns.sleep(delay);
		last_server_money=server_money;
		server_money=ns.getServerMoneyAvailable("home");
		if(server_money>ns.getPurchasedServerCost(ram)) continue;
		const cost_diff=ns.getPurchasedServerCost(ram)-last_server_money;
		const per_second_rate=(server_money-last_server_money)/(delay/1000);
		const est_to_can_buy_server=cost_diff/per_second_rate;
		delay=(est_to_can_buy_server/6)*1000;
		if(!Number.isFinite(delay)) delay=1000;
		if(delay<1000) delay=1000;
		if(delay>60000) delay=60000;
	}
	/** @arg {"pserv-"|`big-${number}`} prefix */
	async function split_server_prefix(prefix) {
		purchased_server_hostnames=ns.getPurchasedServers();
		let not_pserv=purchased_server_hostnames.filter(e => !e.startsWith(prefix));
		let only_pserv=purchased_server_hostnames.filter(e => e.startsWith(prefix));
		ram*=2;
		server_offset=not_pserv.length;
		i=server_offset;
		let max_delay=60*1000*2;
		let min_delay=1000;
		for(const server of only_pserv) {
			for(;;) {
				x: if(server_money>ns.getPurchasedServerCost(ram)) {
					let old_proc=ns.ps(server);
					old_proc.forEach(v => ns.kill(v.pid));
					ns.deleteServer(server);
					if(server_money<ns.getPurchasedServerCost(ram)) break x;
					let hostname=ns.purchaseServer("big-"+ram+"-"+i,ram);
					await start_script(hostname);
					++i;
					break;
				}
				await ns.sleep(delay);
				last_server_money=server_money;
				server_money=ns.getServerMoneyAvailable("home");
				if(server_money>ns.getPurchasedServerCost(ram)) break;
				const cost_diff=ns.getPurchasedServerCost(ram)-last_server_money;
				const per_second_rate=(server_money-last_server_money)/(delay/1000);
				const est_to_can_buy_server=cost_diff/per_second_rate;
				delay=(est_to_can_buy_server/6)*1000;
				if(!Number.isFinite(delay)) delay=min_delay;
				if(delay<min_delay) delay=min_delay;
				if(delay>max_delay) delay=max_delay;
			}
		}
	}
	await split_server_prefix("pserv-");
	purchased_server_hostnames=ns.getPurchasedServers();
	let min_mem=purchased_server_hostnames.reduce(
		(a,r) =>
			ns.getServerMaxRam(a)>ns.getServerMaxRam(r)? a:r
	);
	ram=ns.getServerMaxRam(min_mem);
	await split_server_prefix(`big-${ram}`);
}
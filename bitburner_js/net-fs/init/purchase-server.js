import {InitHackScript} from "/init/init-hack.js";

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
	let ram=8;
	let purchased_server_hostnames=ns.getPurchasedServers();
	let server_offset=purchased_server_hostnames.length;
	const purchased_server_limit=ns.getPurchasedServerLimit();
	const template_changed=false;
	const s=new InitHackScript(ns,{trace: false,distribute: false,template_changed});

	for(let hostname of purchased_server_hostnames) {
		let processes=ns.ps(hostname);
		if(processes.length!==0) ns.kill(processes[0].pid);
		const srv=ns.getServer(hostname);
		await s.start_script_template(srv);
	}
	let skip_delay=true;
	let i=server_offset;
	let delay=1000;
	let server_money=ns.getServerMoneyAvailable("home");
	let last_server_money=server_money;
	/** @arg {NS} ns @arg {string[]} servers @arg {string} old_srv @arg {string} new_srv */
	async function rename_purchased_server(ns,servers,old_srv,new_srv) {
		if(old_srv===new_srv) return;
		let idx=servers.indexOf(old_srv);
		servers[idx]=new_srv;
		if(!skip_delay) await ns.sleep(0);
		let res=ns.renamePurchasedServer(old_srv,new_srv);
		if(!res) {
			ns.printf("%s -> %s",old_srv,new_srv);
			ns.exit();
		}
	}
	/** @arg {number} prev_ram @arg {number} ram @arg {string[]} not_pserv @arg {string[]} only_pserv */
	async function increase_server_ram(prev_ram,ram,not_pserv,only_pserv) {
		const buy_cost1=ns.getPurchasedServerCost(ram)-prev_ram;
		server_offset=not_pserv.length;
		i=server_offset;
		let max_delay=60*1000*2;
		let min_delay=300;
		let cur_min_delay=1000;
		let acc_avg_dur=0;
		for(const hostname of only_pserv) {
			wl: for(;;) {
				let cur_server_money=ns.getServerMoneyAvailable("home");
				if(cur_server_money<buy_cost1) skip_delay=false;
				if(cur_server_money>buy_cost1) {
					if(purchased_server_hostnames.includes(hostname)) {
						let old_proc=ns.ps(hostname);
						old_proc.forEach(v => ns.kill(v.pid));
						ns.upgradePurchasedServer(hostname,ram);
					} else {
						let new_host=ns.purchaseServer(hostname,ram);
						if(new_host==="") throw new Error("failed to purchase server");
						ns.scp(s.scripts,new_host);
					}
					const srv=ns.getServer(hostname);
					await s.start_script_template(srv);
					await rename_purchased_server(ns,only_pserv,hostname,`big-${ram}-${i}`);
					++i;
					last_server_money=server_money;
					acc_avg_dur=delay;
					if(!skip_delay) await ns.sleep(0);
					break wl;
				}
				if(!skip_delay) await ns.sleep(delay);
				acc_avg_dur+=delay;
				if(server_money<last_server_money) {
					last_server_money=server_money;
					acc_avg_dur=delay;
				}
				server_money=ns.getServerMoneyAvailable("home");
				if(server_money>buy_cost1) break wl;
				const cost_diff=buy_cost1-last_server_money;
				const avg_duration_seconds=acc_avg_dur/1000;
				const per_second_rate=(server_money-last_server_money)/avg_duration_seconds;
				if(per_second_rate>=0) {
					cur_min_delay=1000;
					const est_to_can_buy_server=cost_diff/(per_second_rate+1);
					ns.print("money gain rate: $",ns.formatNumber(est_to_can_buy_server));
					delay=(est_to_can_buy_server/6)*1000;
				} else {
					cur_min_delay+=1000;
					delay=cur_min_delay;
				}
				if(!Number.isFinite(delay)) delay=min_delay;
				if(delay<min_delay) delay=min_delay;
				if(delay>max_delay) delay=max_delay;
				ns.print(`sleep ${delay/1000}; upgrade ${hostname} --ram [${ram},$${ns.formatNumber(buy_cost1)}]`);
			}
		}
	}
	/** @arg {`big-${number}-`} prefix */
	async function split_server_prefix(prefix) {
		let not_pserv=purchased_server_hostnames.filter(e => !e.startsWith(prefix));
		let only_pserv=purchased_server_hostnames.filter(e => e.startsWith(prefix));
		await increase_server_ram(prev_ram,ram,not_pserv,only_pserv);
		ns.print("only prefix: ",only_pserv);
	}
	purchased_server_hostnames=ns.getPurchasedServers();
	let prev_ram=ram;
	if(purchased_server_hostnames.length!==purchased_server_limit) {
		let only_pserv=[];
		for(let i=0;i<purchased_server_limit;i++) {
			only_pserv.push(`big-${ram}-${i}`);
		}
		await increase_server_ram(prev_ram,ram,[],only_pserv);
	}
	/** @arg {string} hostname */
	function get_ram(hostname) {return ns.getServerMaxRam(hostname);}
	if(purchased_server_hostnames.length===0) return;
	let min_mem=purchased_server_hostnames.reduce(
		(a,r) => get_ram(a)>get_ram(r)? r:a
	);
	prev_ram=ram=get_ram(min_mem);
	ns.print("min_mem: ",min_mem);
	ram*=2;
	let srv_parts=min_mem.split("-");
	await split_server_prefix(`big-${+srv_parts[1]}-`);
}

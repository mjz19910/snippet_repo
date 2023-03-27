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

	let ram=1;
	let server_hostname_list=ns.getPurchasedServers();
	let server_offset=server_hostname_list.length;
	const purchased_server_limit=ns.getPurchasedServerLimit();
	const template_changed=false;
	const s=new InitHackScript(ns,{trace: false,template_changed});

	for(let hostname of server_hostname_list) {
		let processes=ns.ps(hostname);
		if(processes.length!==0) ns.kill(processes[0].pid);
		const srv=ns.getServer(hostname);
		await s.start_script_template(srv);
	}
	let i=server_offset;
	/** @arg {NS} ns @arg {string[]} servers @arg {string} old_str @arg {string} new_str */
	function rename_purchased_server(ns,servers,old_str,new_str) {
		if(old_str===new_str) return new_str;
		let idx=servers.indexOf(old_str);
		servers[idx]=new_str;
		let res=ns.renamePurchasedServer(old_str,new_str);
		if(!res) {
			ns.printf("%s -> %s",old_str,new_str);
			ns.exit();
		}
		return new_str;
	}
	/** @arg {number} prev_ram @arg {number} ram @arg {string[]} hostname_list */
	async function upgrade_purchased_server_list(prev_ram,ram,hostname_list) {
		const buy_cost1=ns.getPurchasedServerCost(ram)-prev_ram;
		for(let hostname of hostname_list) {
			for(;;++i) {
				let cur_server_money=ns.getServerMoneyAvailable("home");
				if(cur_server_money<buy_cost1) return;
				if(server_hostname_list.includes(hostname)) {
					let old_proc=ns.ps(hostname);
					old_proc.forEach(v => ns.kill(v.pid));
					ns.upgradePurchasedServer(hostname,ram);
				} else {
					let new_host=ns.purchaseServer(hostname,ram);
					if(new_host==="") throw new Error("failed to purchase server");
					ns.scp(s.scripts,new_host);
				}
				hostname=rename_purchased_server(ns,hostname_list,hostname,`big-${ram}-${i}`);
				const srv=ns.getServer(hostname);
				await s.start_script_template(srv);
			}
		}
	}
	server_hostname_list=ns.getPurchasedServers();
	/** @param {string[]} a @param {number} limit */
	function add_new_purchased_servers(a,limit) {
		if(a.length!==limit) for(let i=0;i<limit;i++) a.push(`big-${ram}-${i}`);
	}
	add_new_purchased_servers(server_hostname_list,purchased_server_limit);
	if(server_hostname_list.length!==purchased_server_limit) for(let i=0;i<purchased_server_limit;i++) server_hostname_list.push(`big-${ram}-${i}`);
	await upgrade_purchased_server_list(0,ram,server_hostname_list);
	/** @arg {string} hostname */
	function get_ram(hostname) {return ns.getServerMaxRam(hostname);}
	if(server_hostname_list.length===0) return;
	let min_mem=server_hostname_list.reduce(
		(a,r) => get_ram(a)>get_ram(r)? r:a
	);
	ram=get_ram(min_mem);
	let prev_ram=ram;
	ns.print("min_mem: ",min_mem);
	ram*=2;
	await upgrade_purchased_server_list(prev_ram,ram,server_hostname_list);
}

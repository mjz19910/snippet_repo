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
	const purchased_server_limit=ns.getPurchasedServerLimit();
	const template_changed=false;
	const s=new InitHackScript(ns,{trace: false,template_changed});
	/** @arg {string[]} servers @arg {Server} srv @arg {string} new_str */
	function rename_purchased_server(servers,srv,new_str) {
		if(srv.hostname===new_str) return;
		let idx=servers.indexOf(srv.hostname);
		servers[idx]=new_str;
		let res=ns.renamePurchasedServer(srv.hostname,new_str);
		if(!res) {
			ns.printf("%s -> %s",srv.hostname,new_str);
			ns.exit();
		}
		s.rename_server(srv,new_str);
	}
	/** @arg {number} prev_ram @arg {number} ram @arg {string[]} hostname_list */
	async function upgrade_purchased_server_list(prev_ram,ram,hostname_list) {
		const buy_cost1=ns.getPurchasedServerCost(ram)-prev_ram;
		for(let hostname of hostname_list) {
			let srv=ns.getServer(hostname);
			if(srv.maxRam>=ram) continue;
			let cur_server_money=ns.getServerMoneyAvailable("home");
			if(cur_server_money<buy_cost1) return;
			let host_parts=hostname.split("-");
			ns.print(host_parts[2]," ",ns.formatRam(srv.maxRam));
			if(hostname in s.server_map) {
				let old_proc=ns.ps(hostname);
				old_proc.forEach(v => ns.kill(v.pid));
				ns.upgradePurchasedServer(hostname,ram);
			} else {
				let new_host=ns.purchaseServer(hostname,ram);
				if(new_host==="") throw new Error("failed to purchase server");
				ns.scp(s.scripts,new_host);
			}
			rename_purchased_server(hostname_list,srv,`big-${ram}-${host_parts[2]}`);
			await s.start_script_template(srv);
			await ns.sleep(1000);
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
	ns.print("upg_ram: ",ram);
	await upgrade_purchased_server_list(prev_ram,ram,server_hostname_list);
}

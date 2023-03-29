import {InitHackScript} from "/init/init-hack.js";

/** @param {NS} ns */
export async function main(ns) {
	ns.clearLog();
	ns.disableLog("disableLog");
	ns.disableLog("getServerMoneyAvailable");
	ns.disableLog("getServerMaxRam");
	ns.disableLog("sleep");
	ns.disableLog("scp");

	let ram=1;
	let purchased_server_list=ns.getPurchasedServers();
	const purchased_server_limit=ns.getPurchasedServerLimit();
	const template_changed=false;
	const s=new InitHackScript(ns,{trace: false,template_changed});
	/** @arg {number} prev_ram @arg {number} ram @arg {string[]} hostname_list */
	async function upgrade_purchased_server_list(prev_ram,ram,hostname_list) {
		const buy_cost1=ns.getPurchasedServerCost(ram)-prev_ram;
		if(hostname_list.length!==purchased_server_limit) {
			for(let i=hostname_list.length;i<purchased_server_limit;i++) {
				let hostname=purchase_server(`pserv-${i}`);
				hostname_list.push(hostname);
			}
		}
		for(let hostname of hostname_list) {
			let cur_server_money=ns.getServerMoneyAvailable("home");
			if(cur_server_money<buy_cost1) return;
			let srv;
			if(purchased_server_list.includes(hostname)) {
				srv=ns.getServer(hostname);
				if(srv.maxRam>=ram) continue;
				let old_proc=ns.ps(hostname);
				old_proc.forEach(v => ns.kill(v.pid));
				ns.upgradePurchasedServer(hostname,ram);
				srv.maxRam=ram;
			} else {
				let new_host=purchase_server(hostname);
				srv=ns.getServer(new_host);
			}
			await s.start_script_template(srv);
		}
	}
	/** @param {string} hostname */
	function purchase_server(hostname) {
		ns.print("buy_server: ",hostname);
		let new_host=ns.purchaseServer(hostname,ram);
		if(new_host==="") throw new Error("failed to purchase server");
		purchased_server_list.push(new_host);
		ns.scp(s.scripts,new_host);
		return new_host;
	}
	purchased_server_list=ns.getPurchasedServers();
	await upgrade_purchased_server_list(0,ram,purchased_server_list);
	/** @arg {string} hostname */
	function get_ram(hostname) {return ns.getServerMaxRam(hostname);}
	if(purchased_server_list.length===0) return;
	for(let hostname of purchased_server_list) {ns.getServerMaxRam(hostname);}
	let min_mem=purchased_server_list.reduce(
		(a,r) => get_ram(a)>get_ram(r)? r:a
	);
	ram=get_ram(min_mem);
	let prev_ram=ram;
	ns.print("min_mem: ",min_mem);
	ram*=2;
	ns.print("upg_ram: ",ns.formatRam(ram));
	let buy_cost1=ns.getPurchasedServerCost(ram-prev_ram);
	let cur_server_money=ns.getServerMoneyAvailable("home");
	if(cur_server_money>(buy_cost1*25*2)) ns.tail();
	while(cur_server_money>(buy_cost1*25*2)) {
		await upgrade_purchased_server_list(prev_ram,ram,purchased_server_list);
		prev_ram=ram; ram*=2;
		buy_cost1=ns.getPurchasedServerCost(ram-prev_ram);
		cur_server_money=ns.getServerMoneyAvailable("home");
		ns.print("upg_ram: ",ns.formatRam(ram));
	}
	ns.closeTail();
}

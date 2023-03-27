import {InitHackScript} from "/init/init-hack.js";

/** @param {NS} ns */
export function main(ns) {
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
	const s=new InitHackScript(ns,{trace: false,template_changed});

	for(let hostname of purchased_server_hostnames) {
		let processes=ns.ps(hostname);
		if(processes.length!==0) ns.kill(processes[0].pid);
		const srv=ns.getServer(hostname);
		s.start_script_template(srv);
	}
	let i=server_offset;
	/** @arg {NS} ns @arg {string[]} servers @arg {string} old_srv @arg {string} new_srv */
	function rename_purchased_server(ns,servers,old_srv,new_srv) {
		if(old_srv===new_srv) return;
		let idx=servers.indexOf(old_srv);
		servers[idx]=new_srv;
		let res=ns.renamePurchasedServer(old_srv,new_srv);
		if(!res) {
			ns.printf("%s -> %s",old_srv,new_srv);
			ns.exit();
		}
	}
	/** @arg {number} prev_ram @arg {number} ram @arg {string[]} not_pserv @arg {string[]} only_pserv */
	function increase_server_ram(prev_ram,ram,not_pserv,only_pserv) {
		const buy_cost1=ns.getPurchasedServerCost(ram)-prev_ram;
		i=not_pserv.length;
		for(const hostname of only_pserv) {
			for(;;) {
				let cur_server_money=ns.getServerMoneyAvailable("home");
				if(cur_server_money<buy_cost1) return;
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
				s.start_script_template(srv);
				rename_purchased_server(ns,only_pserv,hostname,`big-${ram}-${i}`);
				++i;
			}
		}
	}
	/** @arg {`big-${number}-`} prefix */
	function split_server_prefix(prefix) {
		let not_pserv=purchased_server_hostnames.filter(e => !e.startsWith(prefix));
		let only_pserv=purchased_server_hostnames.filter(e => e.startsWith(prefix));
		increase_server_ram(prev_ram,ram,not_pserv,only_pserv);
		ns.print("only prefix: ",only_pserv);
	}
	purchased_server_hostnames=ns.getPurchasedServers();
	let prev_ram=ram;
	if(purchased_server_hostnames.length!==purchased_server_limit) {
		let only_pserv=[];
		for(let i=0;i<purchased_server_limit;i++) {
			only_pserv.push(`big-${ram}-${i}`);
		}
		increase_server_ram(prev_ram,ram,[],only_pserv);
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
	split_server_prefix(`big-${+srv_parts[1]}-`);
}

import {start_server_template} from "./api/server_start_template.js";

/**
 * @param {NS} ns @arg {Set<string>} server_set @arg {[[]|[string,number]|[string],[number,"GB"],string][]} server_map_arr
 * @param {boolean} trace @param {number} depth @arg {Map<string,string[]>} map
 * */
async function iter_entries(ns,server_set,server_map_arr,trace,depth,map) {
	const clone=new Map(map);
	for(let [key,val] of clone.entries()) {
		for(let [idx,srv] of val.entries()) {
			if(server_set.has(srv)) continue;
			server_set.add(srv);
			server_map_arr.push([[key,idx],[ns.getServerMaxRam(srv),"GB"],srv]);
			let scan_res=ns.scan(srv);
			let home_idx=scan_res.indexOf("home");
			if(home_idx>-1) scan_res.splice(home_idx,1);
			scan_res=scan_res.filter(v => !server_set.has(v));
			x: if(trace) {
				if(scan_res.length===0) break x;
				ns.print(depth," ",srv," ",scan_res);
				await ns.sleep(8);
			} else {
				await ns.sleep(80);
			}
			map.set(srv,scan_res);
		}
		map.delete(key);
	}
}

/** @param {NS} ns */
export async function main(ns) {
	ns.clearLog();
	ns.print("Script started");
	ns.disableLog("disableLog");
	ns.disableLog("getServerRequiredHackingLevel");
	ns.disableLog("getServerNumPortsRequired");
	ns.disableLog("getServerMaxRam");
	ns.disableLog("getServerUsedRam");
	ns.disableLog("scan");
	ns.disableLog("kill");
	ns.disableLog("scp");
	ns.disableLog("exec");
	ns.disableLog("sleep");
	ns.disableLog("brutessh");
	ns.disableLog("ftpcrack");
	ns.disableLog("relaysmtp");
	ns.disableLog("httpworm");
	ns.tail();


	const trace=true;
	const distribute=true;
	const template_changed=false;

	const template_script="early-hack-template-v2.js";
	const has_ssh_0day=ns.fileExists("BruteSSH.exe","home");
	const has_ftp_0day=ns.fileExists("FTPCrack.exe","home");
	const has_smtp_0day=ns.fileExists("relaySMTP.exe","home");
	const has_http_0day=ns.fileExists("HTTPWorm.exe","home");
	const has_sql_0day=ns.fileExists("SQLInject.exe","home");

	if(template_changed) ns.scriptKill("early-hack-template-v2.js","home");

	/** @type {[[]|[string,number]|[string],[number,"GB"],string][]} */
	let server_map_arr=[
		[[],[ns.getServerMaxRam("home")-ns.getServerUsedRam("home"),"GB"],"home"],
	];
	let server_set=new Set;
	let dest_map=new Map;
	dest_map.set("home",ns.scan("home"));
	let depth=0;
	for(;;) {
		depth++;
		await iter_entries(ns,server_set,server_map_arr,trace,depth,dest_map);
		if(dest_map.size===0) break;
		await ns.sleep(80);
	}
	/** @arg {string} srv @arg {number} t */
	function exec_template(srv,t) {
		let hacking_skill=ns.getServerRequiredHackingLevel(srv);
		return start_server_template(ns,has_ssh_0day,distribute,template_changed,template_script,hacking_skill,srv,t);
	}
	if(distribute) await ns.sleep(1000);
	/** @arg {string} srv */
	function brutessh(srv) {
		if(has_ssh_0day) ns.brutessh(srv);
	}
	/** @arg {string} srv */
	function ftpcrack(srv) {
		if(has_ftp_0day) ns.ftpcrack(srv);
	}
	/** @arg {string} srv */
	function relaysmtp(srv) {
		if(has_smtp_0day) ns.relaysmtp(srv);
	}
	/** @arg {string} srv */
	function httpworm(srv) {
		if(has_http_0day) ns.httpworm(srv);
	}
	/** @arg {string} srv */
	function sqlinject(srv) {
		if(has_sql_0day) ns.sqlinject(srv);
	}

	for(let [,,srv] of server_map_arr) {
		let server_info=ns.getServer(srv);
		const num_ports=ns.getServerNumPortsRequired(srv);
		ns.scp(template_script,srv);
		if(num_ports>=1&&!server_info.sshPortOpen) brutessh(srv);
		if(num_ports>=2&&!server_info.ftpPortOpen) ftpcrack(srv);
		if(num_ports>=3&&!server_info.smtpPortOpen) relaysmtp(srv);
		if(num_ports>=4&&!server_info.httpPortOpen) httpworm(srv);
		if(num_ports>=5&&!server_info.sqlPortOpen) sqlinject(srv);
		if(num_ports>5) {
			ns.print("failed (too many ports required) ",num_ports," ",srv);
			ns.exit();
		}
		server_info=ns.getServer(srv);
		if(!server_info.hasAdminRights&&server_info.openPortCount>=server_info.numOpenPortsRequired) {
			ns.nuke(srv);
			if(distribute) await ns.sleep(1000/3);
		}
		if(distribute) await ns.sleep(20);
	}
	for(let [,[sz],srv] of server_map_arr) {
		let server_info=ns.getServer(srv);
		if(!server_info.hasAdminRights) continue;
		if(sz===0) {
			if(trace) ns.print("[",
				"b:",ns.getServer(srv).backdoorInstalled," ",
				"lvl:",ns.getServerRequiredHackingLevel(srv)," ",
				srv," ",
				"~/","]> unable to run scripts"
			);
			continue;
		}
		let started=await exec_template(srv,sz/2.4|0);
		if(distribute&&started) await ns.sleep(3000);
	}
	// finished
}
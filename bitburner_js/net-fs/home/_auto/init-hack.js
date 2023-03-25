import {start_server_template,get_mode} from "/template/server_start_template.js";
import {get_hack_target} from "/_auto/early-hack-template-v2.js";
import {disable_log_use as disable_log_use1,start_host_scan} from "/api/iter_host_scan_entries.js";
import {do_disable} from "/api/do_disable.js";
import {hack_template_v2} from "/vars/server_start.js";

/** @typedef {[[]|[string,number]|[string],[number,"GB"],string][]} ServerMapArray */
/** @param {NS} ns */
export async function main(ns) {
	const trace=false;
	const distribute=true;
	const template_changed=false;

	init_script(ns);
	const backdoor_path="/data/backdoor_list.txt";
	/** @type {{[x:string]:Server}} */
	const server_map={};
	/** @type {string[]} */
	const to_backdoor=load_to_backdoor_list(ns,backdoor_path);

	/** @type {{fast:boolean;restart_purchased_servers:boolean}} */
	const cmd_args=as(ns.flags([
		["fast",false],
		["restart_purchased_servers",false],
	]));


	/** @type {string} */
	const template_script=hack_template_v2;
	const {unlock_service}=gen_server_crack(ns);

	// Player stats
	const player_hacking_skill=ns.getPlayer().skills.hacking;

	const home_top=ns.ps("home");
	const template_ram_use=home_top.map(ps => {
		if(ps.filename!==template_script) return 0;
		return ps.threads*2.4;
	}).reduce((a,b) => a+b,0);
	const in_use_ram=ns.getServer("home").ramUsed-template_ram_use+15;

	/** @type {{map:Map<string,string[]>;server_map_arr:ServerMapArray}} */
	let scan_res=start_host_scan(ns,{src_host: "home",used_ram: in_use_ram,trace});
	/** @type {ServerMapArray} */
	const server_map_arr=scan_res.server_map_arr;

	for(let [,,hostname] of server_map_arr) {
		let srv=ns.getServer(hostname);
		server_map[hostname]=srv;
	}

	/** @arg {string} srv @arg {number} t */
	function exec_template(srv,t) {
		return start_server_template(ns,distribute,template_changed,template_script,player_hacking_skill,srv,t);
	}

	for(let [,,hostname] of server_map_arr) {
		const srv=server_map[hostname];
		const num_ports=srv.numOpenPortsRequired;
		ns.scp(template_script,hostname);
		if(num_ports>=1&&!srv.sshPortOpen) unlock_service(srv,"ssh");
		if(num_ports>=2&&!srv.ftpPortOpen) unlock_service(srv,"ftp");
		if(num_ports>=3&&!srv.smtpPortOpen) unlock_service(srv,"smtp");
		if(num_ports>=4&&!srv.httpPortOpen) unlock_service(srv,"http");
		if(num_ports>=5&&!srv.sqlPortOpen) unlock_service(srv,"sql");
		if(num_ports>5) {
			ns.print("failed (too many ports required) ",num_ports," ",hostname);
			ns.exit();
		}
		if(!srv.hasAdminRights&&srv.openPortCount>=srv.numOpenPortsRequired) {
			ns.nuke(hostname);
			srv.hasAdminRights=true;
			if(!to_backdoor.includes(hostname)) to_backdoor.push(hostname);
			if(distribute) await ns.sleep(1000/3);
		}
		if(distribute) await ns.sleep(20);
	}
	if(cmd_args.restart_purchased_servers) for(let [,[sz],srv] of server_map_arr) {
		if(srv.startsWith("big-")) {
			await exec_template(srv,sz/2.4|0);
		}
	}
	let servers_to_start_script_count=0;
	for(let [,[sz],hostname] of server_map_arr) {
		if(hostname.startsWith("big-")) continue;
		const srv=server_map[hostname];
		if(!srv.hasAdminRights) continue;
		if(sz===0) continue;
		servers_to_start_script_count++;
	}
	let target_server=get_hack_target([player_hacking_skill,get_mode(ns)]);
	let difficulty_score=get_server_difficulty_score(ns,target_server)/servers_to_start_script_count|0;
	if(trace) ns.print("difficulty_score: ",difficulty_score);
	let async_delay=difficulty_score;
	if(cmd_args.fast) async_delay=difficulty_score/10;
	for(let [,[sz],hostname] of server_map_arr) {
		if(hostname.startsWith("big-")) continue;
		let srv=server_map[hostname];
		if(!srv.hasAdminRights) continue;
		if(sz===0) {
			if(trace) ns.printf(
				"[w:%s, b:%s lvl:%s %s ~/]> %s",
				ns.tFormat(async_delay),
				srv.backdoorInstalled,
				srv.requiredHackingSkill,
				hostname,
				"unable to run scripts"
			);
			continue;
		}
		let started=await exec_template(hostname,sz/2.4|0);
		if(distribute&&started) await ns.sleep(async_delay);
	}
	for(let [,,hostname] of server_map_arr) {
		if(hostname.startsWith("big-")) continue;
		let srv=server_map[hostname];
		if(srv.purchasedByPlayer) continue;
		if(!srv.hasAdminRights) continue;
		if(!srv.backdoorInstalled) {
			if(!to_backdoor.includes(hostname)) {
				ns.print("to_backdoor: ",hostname);
				to_backdoor.push(hostname);
			}
		} else {
			let idx=to_backdoor.indexOf(hostname);
			if(idx!==-1) to_backdoor.splice(idx,1);
		}
	}
	for(const hostname of to_backdoor) {
		ns.print("backdoor: ",hostname);
	}
	ns.write(backdoor_path,to_backdoor.join("\n")+"\n","w");
	// finished
}
/** @param {NS} ns @param {string} srv */
function get_server_difficulty_score(ns,srv) {
	return ns.getHackTime(srv)+ns.getGrowTime(srv)+ns.getWeakenTime(srv)/3;
}
/** @param {NS} ns */
export function gen_crack_flags(ns) {
	const has_ssh=ns.fileExists("BruteSSH.exe","home");
	const has_ftp=ns.fileExists("FTPCrack.exe","home");
	const has_smtp=ns.fileExists("relaySMTP.exe","home");
	const has_http=ns.fileExists("HTTPWorm.exe","home");
	const has_sql=ns.fileExists("SQLInject.exe","home");
	return {has_ssh,has_ftp,has_smtp,has_http,has_sql};
}
/** @param {NS} ns */
export function gen_server_crack(ns) {
	const f_=gen_crack_flags(ns);
	const service_map={
		ssh: ns.brutessh,
		ftp: ns.ftpcrack,
		smtp: ns.relaysmtp,
		http: ns.httpworm,
		sql: ns.sqlinject,
	};
	/** @arg {Server} srv @arg {"ssh"|"ftp"|"smtp"|"http"|"sql"} type */
	function unlock_service(srv,type) {
		if(f_[`has_${type}`]) {
			service_map[type](srv.hostname);
			srv[`${type}PortOpen`]=true;
		}
	}
	return {flags_: f_,unlock_service};
}
/** @param {NS} ns @arg {string} backdoor_path */
function load_to_backdoor_list(ns,backdoor_path) {
	if(ns.fileExists(backdoor_path,"home")) {
		let data=ns.read(backdoor_path).trim();
		if(data!=="") return data.split("\n");
		return [];
	}
	return [];
}
/** @param {NS} ns */
function init_script(ns) {
	const arr_disabled=["disableLog"];
	/** @arg {string} fn_key */
	function disableLog_(fn_key) {do_disable(ns,arr_disabled,fn_key);}
	disableLog_("disableLog");
	disable_log_use(disableLog_);
	disable_log_use1(ns,arr_disabled);

	ns.tail();
	ns.clearLog();
	ns.print("Script started");
}
/** @arg {(fn:string)=>void} callback */
function disable_log_use(callback) {
	callback("scan");
	callback("kill");
	callback("scp");
	callback("exec");
	callback("sleep");
	callback("brutessh");
	callback("ftpcrack");
	callback("relaysmtp");
	callback("httpworm");
}
/** @private @template U @template {U} T @arg {U} e @arg {any} [x] @returns {T} */
function as(e,x=e) {return x;}

import {start_server_template,get_mode} from "/template/server_start_template.js";
import {get_hack_target} from "/_auto/early-hack-template-v2.js";
import {disable_log_use as disable_log_use1,start_host_scan} from "/api/iter_host_scan_entries.js";
import {do_disable} from "/api/do_disable.js";
import {hack_template_v2} from "/vars/server_start.js";
import {as} from "/helper/as.js";

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

	/** @arg {string} hostname */
	function get_server(hostname) {
		let srv=server_map[hostname];
		if(srv) return srv;
		srv=ns.getServer(hostname);
		server_map[hostname]=srv;
		return srv;
	}

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
	get_server("home");
	const in_use_ram=get_server("home").ramUsed-template_ram_use+15;

	/** @type {{map:Map<string,string[]>;server_map_arr:import("/api/exports.js").ServerMapArray}} */
	let {server_map_arr}=start_host_scan(ns,{src_host: "home",used_ram: in_use_ram,trace});
	const hostname_list=server_map_arr.map(v => v[2]);

	/** @arg {Server} srv @arg {number} t */
	function exec_template(srv,t) {
		return start_server_template(ns,template_changed,template_script,player_hacking_skill,srv,t);
	}

	for(const hostname of hostname_list) {
		const srv=get_server(hostname);
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
	if(cmd_args.restart_purchased_servers) do_restart_purchased_servers(server_map,hostname_list,exec_template);
	let servers_to_start_script_count=get_script_runner_count(server_map,hostname_list);
	let target_server=get_hack_target([player_hacking_skill,get_mode(ns)]);
	let difficulty_score=get_server_difficulty_score(ns,target_server)/servers_to_start_script_count|0;
	if(trace) ns.print("difficulty_score: ",difficulty_score);
	let async_delay=difficulty_score;
	if(cmd_args.fast) async_delay=difficulty_score/10;
	const ro_1=`s:${player_hacking_skill}`;
	const static_run_on=`hack-v2 ${ro_1}`;
	for(const hostname of hostname_list) {
		if(hostname.startsWith("big-")) continue;
		let srv=server_map[hostname];
		const ro_2=`lvl:${srv.requiredHackingSkill}`;
		if(!srv.hasAdminRights) continue;
		if(srv.maxRam===0) {
			if(trace) format_print(ns,async_delay,srv,`${ro_1} ${ro_2} h:-${hostname}`);
			continue;
		}
		let t=srv.maxRam/2.4|0;
		const ro_mem=`t:${t} h:${hostname}`;
		if(hostname==="home") t=(srv.maxRam-srv.ramUsed-15)/2.4|0;
		let started=await exec_template(srv,t);
		if(distribute&&started) {
			format_print(ns,async_delay,srv,`${static_run_on} ${ro_2} ${ro_mem}`);
			await ns.sleep(async_delay);
		}
	}
	for(let [,,hostname] of server_map_arr) {
		if(hostname.startsWith("big-")) continue;
		let srv=server_map[hostname];
		if(srv.purchasedByPlayer) continue;
		if(!srv.hasAdminRights) continue;
		if(srv.requiredHackingSkill<=player_hacking_skill&&!srv.backdoorInstalled) {
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
		let srv=server_map[hostname];
		ns.print("backdoor: ",hostname," ",srv.requiredHackingSkill);
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
			srv.openPortCount++;
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

/** @arg {{[x:string]:Server}} server_map @arg {string[]} hostname_list */
function get_script_runner_count(server_map,hostname_list) {
	let server_count=0;
	for(const hostname of hostname_list) {
		if(hostname.startsWith("big-")) continue;
		const srv=server_map[hostname];
		if(!srv.hasAdminRights) continue;
		if(srv.maxRam===0) continue;
		server_count++;
	}
	return server_count;
}

/** @param {NS} ns @arg {number} async_delay @arg {Server} srv @arg {string} msg */
function format_print(ns,async_delay,srv,msg) {
	ns.printf(
		"[w:%s, b:%s] %s",
		short_time_format(ns,async_delay),
		+srv.backdoorInstalled,
		msg,
	);
}

/** @param {NS} ns @arg {number} time_ms */
function short_time_format(ns,time_ms) {
	let format_str=ns.tFormat(time_ms);
	format_str=format_str.replace(" seconds","s");
	return format_str;
}
/** @param {{[x:string]:Server}} server_map @param {string[]} hostname_list @param {(srv:Server,t:number)=>Promise<boolean>} exec_template */
async function do_restart_purchased_servers(server_map,hostname_list,exec_template) {
	for(const hostname of hostname_list) {
		if(!hostname.startsWith("big-")) continue;
		const srv=server_map[hostname];
		await exec_template(srv,srv.maxRam/2.4|0);
	}
}

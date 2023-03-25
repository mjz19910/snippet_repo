import {start_server_template,get_mode} from "/template/server_start_template.js";
import {get_hack_target} from "/_auto/early-hack-template-v2.js";
import {disable_log_use as disable_log_use1,start_host_scan} from "/api/iter_host_scan_entries.js";
import {do_disable} from "/api/do_disable.js";
import {hack_template_v2} from "/vars/server_start.js";

/** @typedef {[[]|[string,number]|[string],[number,"GB"],string][]} ServerMapArray */

/** @param {NS} ns */
export async function main(ns) {
	ns.clearLog();
	ns.print("Script started");
	/** @type {string[]} */
	let arr_disabled=[];
	ns.disableLog("disableLog");
	disable_log_use1(ns,arr_disabled);
	disable_log_use(ns,arr_disabled);
	ns.tail();

	const backdoor_path="/data/backdoor_list.txt";

	/** @type {string[]} */
	let to_backdoor=[];

	if(ns.fileExists(backdoor_path,"home")) {
		let data=ns.read(backdoor_path);
		to_backdoor.push(...data.split("\n"));
	}

	/** @type {{fast:boolean;restart_purchased_servers:boolean}} */
	const cmd_args=as(ns.flags([
		["fast",false],
		["restart_purchased_servers",false],
	]));

	const trace=true;
	const distribute=true;
	const template_changed=false;

	/** @type {string} */
	const template_script=hack_template_v2;
	const {run_: c_run}=gen_server_crack(ns);

	// Player stats
	const player_hacking_skill=ns.getPlayer().skills.hacking;

	const home_top=ns.ps("home");
	const template_ram_use=home_top.map(ps => {
		if(ps.filename!==template_script) return 0;
		return ps.threads*2.4;
	}).reduce((a,b) => a+b,0);
	const in_use_ram=ns.getServerUsedRam("home")-template_ram_use+15;

	/** @type {{map:Map<string,string[]>;server_map_arr:ServerMapArray}} */
	let scan_res=start_host_scan(ns,{src_host: "home",used_ram: in_use_ram,trace});
	/** @type {ServerMapArray} */
	const server_map_arr=scan_res.server_map_arr;
	/** @arg {string} srv @arg {number} t */
	function exec_template(srv,t) {
		return start_server_template(ns,distribute,template_changed,template_script,player_hacking_skill,srv,t);
	}

	for(let [,,srv] of server_map_arr) {
		let server_info=ns.getServer(srv);
		const num_ports=ns.getServerNumPortsRequired(srv);
		ns.scp(template_script,srv);
		if(num_ports>=1&&!server_info.sshPortOpen) c_run.ssh(srv);
		if(num_ports>=2&&!server_info.ftpPortOpen) c_run.ftp(srv);
		if(num_ports>=3&&!server_info.smtpPortOpen) c_run.smtp(srv);
		if(num_ports>=4&&!server_info.httpPortOpen) c_run.http(srv);
		if(num_ports>=5&&!server_info.sqlPortOpen) c_run.sql(srv);
		if(num_ports>5) {
			ns.print("failed (too many ports required) ",num_ports," ",srv);
			ns.exit();
		}
		server_info=ns.getServer(srv);
		if(!server_info.hasAdminRights&&server_info.openPortCount>=server_info.numOpenPortsRequired) {
			ns.nuke(srv);
			to_backdoor.push(srv);
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
	for(let [,[sz],srv] of server_map_arr) {
		if(srv.startsWith("big-")) continue;
		let server_info=ns.getServer(srv);
		if(!server_info.hasAdminRights) continue;
		if(sz===0) continue;
		servers_to_start_script_count++;
	}
	let target_server=get_hack_target([player_hacking_skill,get_mode(ns)]);
	/** @arg {string} srv */
	function get_server_difficulty_score(srv) {
		return ns.getHackTime(srv)+ns.getGrowTime(srv)+ns.getWeakenTime(srv)/3;
	}
	let difficulty_score=get_server_difficulty_score(target_server)/servers_to_start_script_count|0;
	ns.print("difficulty_score: ",difficulty_score);
	let async_delay=difficulty_score;
	if(cmd_args.fast) async_delay=difficulty_score/10;
	for(let [,[sz],srv] of server_map_arr) {
		if(srv.startsWith("big-")) continue;
		let server_info=ns.getServer(srv);
		if(!server_info.hasAdminRights) continue;
		if(sz===0) {
			if(trace) ns.print("[",
				"b:",server_info.backdoorInstalled," ",
				"lvl:",ns.getServerRequiredHackingLevel(srv)," ",
				srv," ",
				"~/","]> unable to run scripts"
			);
			continue;
		}
		let started=await exec_template(srv,sz/2.4|0);
		if(distribute&&started) await ns.sleep(async_delay);
	}
	for(let [,,srv] of server_map_arr) {
		if(srv.startsWith("big-")) continue;
		let server_info=ns.getServer(srv);
		if(server_info.purchasedByPlayer) continue;
		if(!server_info.hasAdminRights) continue;
		if(!server_info.backdoorInstalled&&!to_backdoor.includes(srv)) {
			ns.print("to_backdoor: ",srv);
			to_backdoor.push(srv);
		}
	}
	ns.write(backdoor_path,to_backdoor.join("\n"),"w");
	// finished
}

/** @private @template U @template {U} T @arg {U} e @arg {any} [x] @returns {T} */
function as(e,x=e) {return x;}

/** @param {NS} ns @arg {string[]} arr_disabled */
function disable_log_use(ns,arr_disabled) {
	/** @arg {string} fn_key */
	function disableLog_(fn_key) {
		do_disable(ns,arr_disabled,fn_key);
		ns.disableLog(fn_key);
	}
	disableLog_("getServerRequiredHackingLevel");
	disableLog_("getServerNumPortsRequired");
	disableLog_("getServerUsedRam");
	disableLog_("scan");
	disableLog_("kill");
	disableLog_("scp");
	disableLog_("exec");
	disableLog_("sleep");
	disableLog_("brutessh");
	disableLog_("ftpcrack");
	disableLog_("relaysmtp");
	disableLog_("httpworm");
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
	const run_={
		/** @arg {string} srv */
		ssh(srv) {f_.has_ssh&&ns.brutessh(srv);},
		/** @arg {string} srv */
		ftp(srv) {f_.has_ftp&&ns.ftpcrack(srv);},
		/** @arg {string} srv */
		smtp(srv) {f_.has_smtp&&ns.relaysmtp(srv);},
		/** @arg {string} srv */
		http(srv) {f_.has_http&&ns.httpworm(srv);},
		/** @arg {string} srv */
		sql(srv) {f_.has_sql&&ns.sqlinject(srv);}
	};
	return {flags_: f_,run_: run_};
}

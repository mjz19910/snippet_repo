import {start_server_template} from "/template/server_start_template.js";
import {get_hack_target} from "/_auto/early-hack-template-v2.js";
import {disable_log_use as disable_log_use1,start_host_scan} from "/api/iter_host_scan_entries.js";
import {do_disable} from "/api/do_disable.js";
import {hack_template_v2} from "/vars/server_start.js";

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

	/** @type {string[]} */
	let to_backdoor=[];

	if(ns.fileExists("data/backdoor_list.txt","home")) {
		let data=ns.read("data/backdoor_list.txt");
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

	const template_script=hack_template_v2;
	const has_ssh_0day=ns.fileExists("BruteSSH.exe","home");
	const has_ftp_0day=ns.fileExists("FTPCrack.exe","home");
	const has_smtp_0day=ns.fileExists("relaySMTP.exe","home");
	const has_http_0day=ns.fileExists("HTTPWorm.exe","home");
	const has_sql_0day=ns.fileExists("SQLInject.exe","home");

	// Player stats
	const player_hacking_skill=ns.getPlayer().skills.hacking;

	const home_top=ns.ps("home");
	const template_ram_use=home_top.map(ps => {
		if(ps.filename!==template_script) return 0;
		return ps.threads*2.4;
	}).reduce((a,b) => a+b,0);
	const in_use_ram=ns.getServerUsedRam("home")-template_ram_use+15;

	let {server_map_arr}=start_host_scan(ns,{src_host: "home",used_ram: in_use_ram,trace});
	/** @arg {string} srv @arg {number} t */
	function exec_template(srv,t) {
		return start_server_template(ns,has_ssh_0day,distribute,template_changed,template_script,player_hacking_skill,srv,t);
	}
	/** @arg {string} srv */
	function brutessh_(srv) {
		if(has_ssh_0day) ns.brutessh(srv);
	}
	/** @arg {string} srv */
	function ftpcrack_(srv) {
		if(has_ftp_0day) ns.ftpcrack(srv);
	}
	/** @arg {string} srv */
	function relaysmtp_(srv) {
		if(has_smtp_0day) ns.relaysmtp(srv);
	}
	/** @arg {string} srv */
	function httpworm_(srv) {
		if(has_http_0day) ns.httpworm(srv);
	}
	/** @arg {string} srv */
	function sqlinject_(srv) {
		if(has_sql_0day) ns.sqlinject(srv);
	}

	for(let [,,srv] of server_map_arr) {
		let server_info=ns.getServer(srv);
		const num_ports=ns.getServerNumPortsRequired(srv);
		ns.scp(template_script,srv);
		if(num_ports>=1&&!server_info.sshPortOpen) brutessh_(srv);
		if(num_ports>=2&&!server_info.ftpPortOpen) ftpcrack_(srv);
		if(num_ports>=3&&!server_info.smtpPortOpen) relaysmtp_(srv);
		if(num_ports>=4&&!server_info.httpPortOpen) httpworm_(srv);
		if(num_ports>=5&&!server_info.sqlPortOpen) sqlinject_(srv);
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
	function get_mode() {
		if(!has_ssh_0day) return "none";
		return "ssh-only";
	}
	let target_server=get_hack_target([player_hacking_skill,get_mode()]);
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
				"b:",ns.getServer(srv).backdoorInstalled," ",
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
		if(!server_info.backdoorInstalled&&to_backdoor.includes(srv)) {
			ns.print("to_backdoor: ",srv);
		}
	}
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

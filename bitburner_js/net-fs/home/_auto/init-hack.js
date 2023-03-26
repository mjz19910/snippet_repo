import {get_hack_target} from "/_auto/early-hack-template-v2.js";
import {disable_log_use as disable_log_use1,start_host_scan} from "/api/iter_host_scan_entries.js";
import {do_disable} from "/api/do_disable.js";
import {hack_template_v3} from "/vars/server_start.js";
import {as} from "/helper/as.js";

/** @typedef {{fast:boolean;restart_purchased_servers:boolean}} RunFlags */
class ScriptState {
	get_mode() {
		const f_=gen_crack_flags(this.ns);
		if(f_.has_sql) return "with-sql";
		if(f_.has_smtp) return "with-smtp";
		if(f_.has_http) return "with-http";
		if(f_.has_ftp) return "with-ftp";
		if(f_.has_ssh) return "with-ssh";
		return "none";
	}
	/** @param {Server} srv @arg {number} t */
	async start_server_template(srv,t) {
		const {ns}=this;
		const processes=ns.ps(srv.hostname);
		if(processes.length>0) {
			if(!this.template_changed&&processes.find(ps => ps.filename===this.script_file)) return false;
			processes.forEach(ps => {
				if(ps.filename===this.script_file) ns.kill(ps.pid);
			});
		}
		if(ns.fileExists("debug.txt",srv.hostname)) {
			ns.exec(this.script_file,srv.hostname,t,this.player_hacking_skill,"debug.txt");
			return true;
		}
		let mode=this.get_mode();
		ns.exec(this.script_file,srv.hostname,t,this.player_hacking_skill,mode);
		return true;
	}
	/** @readonly */
	backdoor_path="/data/backdoor_list.txt";
	/** @readonly */
	script_file=hack_template_v3;
	/** @arg {NS} ns @arg {{trace:boolean;distribute:boolean;template_changed:boolean}} s */
	constructor(ns,s) {
		this.opts=s;
		this.ns=ns;
		init_script(ns);
		/** @type {RunFlags} */
		this.cmd_args=as(ns.flags([
			["fast",false],
			["restart_purchased_servers",false],
		]));
		this.player_hacking_skill=ns.getPlayer().skills.hacking;
		/** @type {string[]} */
		this.to_backdoor=load_to_backdoor_list(ns,this.backdoor_path);
		this.hostname_list=start_host_scan(ns,"home",s.trace);
		this.template_changed=s.template_changed;
		this.f_=gen_crack_flags(ns);
		this.service_map={
			ssh: ns.brutessh,
			ftp: ns.ftpcrack,
			smtp: ns.relaysmtp,
			http: ns.httpworm,
			sql: ns.sqlinject,
		};
	}
	async init_hack() {
		await this.do_get_admin_rights();
		if(this.cmd_args.restart_purchased_servers) await this.do_restart_purchased_servers();
		await this.start_v2_hack();
		this.update_backdoor_cache();
		this.log_servers_to_backdoor();
	}
	log_servers_to_backdoor() {
		const {ns,backdoor_path,to_backdoor}=this;
		for(const hostname of to_backdoor) {
			const srv=this.get_server(hostname);
			ns.print("backdoor: ",hostname," ",srv.requiredHackingSkill);
		}
		ns.write(backdoor_path,to_backdoor.join("\n")+"\n","w");
	}
	get_script_runner_count() {
		let server_count=0;
		for(const hostname of this.hostname_list) {
			if(hostname.startsWith("big-")) continue;
			const srv=this.get_server(hostname);
			if(!srv.hasAdminRights) continue;
			if(srv.maxRam===0) continue;
			server_count++;
		}
		return server_count;
	}
	async start_v2_hack() {
		const {ns,opts: {trace,distribute}}=this;
		let servers_to_start_script_count=this.get_script_runner_count();
		let target_server=get_hack_target([this.player_hacking_skill,this.get_mode()]);
		let difficulty_score=get_server_difficulty_score(ns,target_server)/servers_to_start_script_count|0;
		if(trace) ns.print("difficulty_score: ",difficulty_score);
		let async_delay=difficulty_score;
		if(this.cmd_args.fast) async_delay=difficulty_score/10;
		const ro_1=`s:${this.player_hacking_skill}`;
		const static_run_on=`hack-v2 ${ro_1}`;
		for(const hostname of this.hostname_list) {
			if(hostname.startsWith("big-")) continue;
			const srv=this.get_server(hostname);
			const ro_2=`lvl:${srv.requiredHackingSkill}`;
			if(!srv.hasAdminRights) continue;
			if(srv.maxRam===0) {
				if(trace) format_print(ns,async_delay,srv,`${ro_1} ${ro_2} h:-${hostname}`);
				continue;
			}
			let t=srv.maxRam/2.4|0;
			const ro_mem=`t:${t} h:${hostname}`;
			if(hostname==="home") t=(srv.maxRam-srv.ramUsed-15)/2.4|0;
			let started=await this.start_server_template(srv,t);
			if(distribute&&started) {
				format_print(ns,async_delay,srv,`${static_run_on} ${ro_2} ${ro_mem}`);
				await ns.sleep(async_delay);
			}
		}
	}
	update_backdoor_cache() {
		const {ns,to_backdoor}=this;
		for(let hostname of this.hostname_list) {
			if(hostname.startsWith("big-")) continue;
			const srv=this.get_server(hostname);
			if(srv.purchasedByPlayer) continue;
			if(!srv.hasAdminRights) continue;
			if(srv.requiredHackingSkill<=this.player_hacking_skill&&!srv.backdoorInstalled) {
				if(!to_backdoor.includes(hostname)) {
					ns.print("to_backdoor: ",hostname);
					to_backdoor.push(hostname);
				}
			} else {
				let idx=to_backdoor.indexOf(hostname);
				if(idx!==-1) to_backdoor.splice(idx,1);
			}
		}
	}
	async do_restart_purchased_servers() {
		for(const hostname of this.hostname_list) {
			if(!hostname.startsWith("big-")) continue;
			const srv=this.get_server(hostname);
			await this.start_server_template(srv,srv.maxRam/2.4|0);
		}
	}
	async do_get_admin_rights() {
		const {ns,opts: {distribute}}=this;
		for(const hostname of this.hostname_list) {
			const srv=this.get_server(hostname);
			const num_ports=srv.numOpenPortsRequired;
			ns.scp(hack_template_v3,hostname);
			if(num_ports>=1&&!srv.sshPortOpen) this.unlock_service(srv,"ssh");
			if(num_ports>=2&&!srv.ftpPortOpen) this.unlock_service(srv,"ftp");
			if(num_ports>=3&&!srv.smtpPortOpen) this.unlock_service(srv,"smtp");
			if(num_ports>=4&&!srv.httpPortOpen) this.unlock_service(srv,"http");
			if(num_ports>=5&&!srv.sqlPortOpen) this.unlock_service(srv,"sql");
			if(num_ports>5) {
				ns.print("failed (too many ports required) ",num_ports," ",hostname);
				ns.exit();
			}
			if(!srv.hasAdminRights&&srv.openPortCount>=srv.numOpenPortsRequired) {
				ns.nuke(hostname);
				srv.hasAdminRights=true;
				if(!this.to_backdoor.includes(hostname)) this.to_backdoor.push(hostname);
				if(distribute) await ns.sleep(1000/3);
			}
			if(distribute) await ns.sleep(20);
		}
	}
	/** @type {{[x:string]:Server}} */
	server_map={};
	/** @arg {string} hostname */
	get_server(hostname) {
		let server=this.server_map[hostname];
		if(server) return server;
		server=this.ns.getServer(hostname);
		this.server_map[hostname]=server;
		return server;
	}
	/** @arg {Server} srv @arg {"ssh"|"ftp"|"smtp"|"http"|"sql"} type */
	unlock_service(srv,type) {
		if(this.f_[`has_${type}`]) {
			this.service_map[type](srv.hostname);
			srv[`${type}PortOpen`]=true;
			srv.openPortCount++;
		}
	}
}
/** @param {NS} ns */
export async function main(ns) {
	const trace=false;
	const distribute=true;
	const template_changed=false;
	const s=new ScriptState(ns,{
		template_changed,
		distribute,
		trace,
	});
	s.init_hack();
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

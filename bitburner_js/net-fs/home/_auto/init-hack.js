import {get_hack_target} from "/hack-template-v3.js";
import {hack_template_v3} from "/vars/server_start.js";
import {as} from "/helper/as.js";

/** @typedef {{fast:boolean;restart_purchased_servers:boolean}} RunFlags */
class ScriptState {
	/** @readonly */
	backdoor_path="/data/backdoor_list.txt";
	/** @readonly */
	script_file=hack_template_v3;
	script_files=["hack-support-v3.js",hack_template_v3];
	arr_disabled=["disableLog"];
	get_mode() {
		const f_=this.gen_crack_flags();
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
	/** @arg {string} fn_key */
	disableLog_(fn_key) {
		if(this.arr_disabled.includes(fn_key)) return;
		this.ns.disableLog(fn_key);
		this.arr_disabled.push(fn_key);
	}
	init_script() {
		const {ns}=this;
		this.disableLog_("disableLog");
		this.disable_log_use();

		ns.tail();
		ns.clearLog();
		ns.print("Script started");
	}
	disable_log_use() {
		this.disableLog_("scan");
		this.disableLog_("kill");
		this.disableLog_("scp");
		this.disableLog_("exec");
		this.disableLog_("sleep");
		this.disableLog_("brutessh");
		this.disableLog_("ftpcrack");
		this.disableLog_("relaysmtp");
		this.disableLog_("httpworm");
		this.disableLog_("getServerMaxRam");
	}
	/** @typedef {{src_host:string;seen_set:Set<string>;hostname_list:string[]}} HostScanOpts */
	/** @arg {string} src_host */
	start_host_scan(src_host) {
		const scan_log_file="/data/host_scan.list.txt";
		this.ns.clear(scan_log_file);

		/** @type {Map<string, string[]>} */
		let map=new Map;
		/** @type {Set<string>} */
		let seen_set=new Set;
		const hostname_list=[src_host];
		map.set(src_host,this.ns.scan(src_host));
		/** @type {HostScanOpts} */
		const scan_opts={src_host,seen_set,hostname_list};
		let scan_results=["------\n","\n"];
		let depth=0;
		for(;;) {
			depth++;
			const result=this.iter_host_scan_entries(scan_opts,depth,map);
			scan_results.push(result);
			if(map.size===0) break;
		}
		this.ns.write(scan_log_file,scan_results.join(""),"w");
		return hostname_list;
	}
	/**
	 * @param {number} depth @arg {Map<string,string[]>} map
	 * @param {HostScanOpts} opts
	 * */
	iter_host_scan_entries(opts,depth,map) {
		const {seen_set,hostname_list}=opts;
		let depth_list=[];
		const clone=new Map(map);
		for(let [key,val] of clone.entries()) {
			for(let srv of val) {
				if(seen_set.has(srv)) continue;
				seen_set.add(srv);
				hostname_list.push(srv);
				let scan_res=this.ns.scan(srv);
				let home_idx=scan_res.indexOf(opts.src_host);
				if(home_idx>-1) scan_res.splice(home_idx,1);
				scan_res=scan_res.filter(v => !seen_set.has(v));
				depth_list.push([depth," ",srv," ",scan_res]);
				map.set(srv,scan_res);
			}
			map.delete(key);
		}
		/** @type {string[]} */
		let file_data=[];
		/** @arg {string} str */
		function append(str) {
			file_data.push(str);
		}
		for(let depth_item of depth_list) {
			for(let part of depth_item) {
				if(part instanceof Array) {
					append("[");
					for(let v of part.slice(0,-1)) {
						append(v+",");
					}
					append(part[part.length-1]);
					append("]");
					continue;
				}
				append(""+part);
			}
			append("\n");
		}
		append("\n");
		return file_data.join("");
	}

	/** @arg {NS} ns @arg {{trace:boolean;distribute:boolean;template_changed:boolean}} s */
	constructor(ns,s) {
		this.opts=s;
		this.ns=ns;
		this.init_script();
		/** @type {RunFlags} */
		this.cmd_args=as(ns.flags([
			["fast",false],
			["restart_purchased_servers",false],
		]));
		this.player_hacking_skill=ns.getPlayer().skills.hacking;
		/** @type {string[]} */
		this.to_backdoor=this.load_to_backdoor_list();
		this.hostname_list=this.start_host_scan("home");
		this.template_changed=s.template_changed;
		this.f_=this.gen_crack_flags();
		this.service_map={
			ssh: ns.brutessh,
			ftp: ns.ftpcrack,
			smtp: ns.relaysmtp,
			http: ns.httpworm,
			sql: ns.sqlinject,
		};
	}
	/** @type {NS["fileExists"]} */
	fileExists(a,b) {
		return this.ns.fileExists(a,b);
	}
	gen_crack_flags() {
		const has_ssh=this.fileExists("BruteSSH.exe","home");
		const has_ftp=this.fileExists("FTPCrack.exe","home");
		const has_smtp=this.fileExists("relaySMTP.exe","home");
		const has_http=this.fileExists("HTTPWorm.exe","home");
		const has_sql=this.fileExists("SQLInject.exe","home");
		return {has_ssh,has_ftp,has_smtp,has_http,has_sql};
	}
	load_to_backdoor_list() {
		if(this.fileExists(this.backdoor_path,"home")) {
			let data=this.ns.read(this.backdoor_path).trim();
			if(data!=="") return data.split("\n");
			return [];
		}
		return [];
	}
	async init_hack() {
		let cur_ps=this.ns.ps("home");
		let server_idx=cur_ps.findIndex(v => v.filename==="hack-server-v3.js");
		if(server_idx===-1) this.ns.run("hack-server-v3.js");
		for(const hostname of this.hostname_list) {
			this.ns.scp(this.script_files,hostname);
		}
		await this.do_get_admin_rights();
		if(this.cmd_args.restart_purchased_servers) await this.do_restart_purchased_servers();
		await this.start_v2_hack();
		this.update_backdoor_cache();
		this.log_servers_to_backdoor();
	}
	log_servers_to_backdoor() {
		const {backdoor_path,to_backdoor}=this;
		for(const hostname of to_backdoor) {
			const srv=this.get_server(hostname);
			this.ns.print("backdoor: ",hostname," ",srv.requiredHackingSkill);
		}
		this.ns.write(backdoor_path,to_backdoor.join("\n")+"\n","w");
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
	/** @param {string} srv */
	get_server_difficulty_score(srv) {
		return this.ns.getHackTime(srv)+this.ns.getGrowTime(srv)+this.ns.getWeakenTime(srv)/3;
	}
	async start_v2_hack() {
		const {opts: {trace,distribute}}=this;
		let servers_to_start_script_count=this.get_script_runner_count();
		let target_server=get_hack_target([this.player_hacking_skill,this.get_mode()]);
		let difficulty_score=this.get_server_difficulty_score(target_server)/servers_to_start_script_count|0;
		if(trace) this.ns.print("difficulty_score: ",difficulty_score);
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
				if(trace) this.format_print(async_delay,srv,`${ro_1} ${ro_2} h:-${hostname}`);
				continue;
			}
			let t=srv.maxRam/2.4|0;
			const ro_mem=`t:${t} h:${hostname}`;
			if(hostname==="home") t=(srv.maxRam-srv.ramUsed-15)/2.4|0;
			let started=await this.start_server_template(srv,t);
			if(distribute&&started) {
				this.format_print(async_delay,srv,`${static_run_on} ${ro_2} ${ro_mem}`);
				await this.ns.sleep(async_delay);
			}
		}
	}
	/** @arg {number} async_delay @arg {Server} srv @arg {string} msg */
	format_print(async_delay,srv,msg) {
		this.ns.printf(
			"[w:%s, b:%s] %s",
			this.short_time_format(async_delay),
			+srv.backdoorInstalled,
			msg,
		);
	}
	/** @arg {number} time_ms */
	short_time_format(time_ms) {
		let format_str=this.ns.tFormat(time_ms);
		format_str=format_str.replace(" seconds","s");
		return format_str;
	}
	update_backdoor_cache() {
		const {to_backdoor}=this;
		for(let hostname of this.hostname_list) {
			if(hostname.startsWith("big-")) continue;
			const srv=this.get_server(hostname);
			if(srv.purchasedByPlayer) continue;
			if(!srv.hasAdminRights) continue;
			if(srv.requiredHackingSkill<=this.player_hacking_skill&&!srv.backdoorInstalled) {
				if(!to_backdoor.includes(hostname)) {
					this.ns.print("to_backdoor: ",hostname);
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
		const {opts: {distribute}}=this;
		for(const hostname of this.hostname_list) {
			const srv=this.get_server(hostname);
			const num_ports=srv.numOpenPortsRequired;
			if(num_ports>=1&&!srv.sshPortOpen) this.unlock_service(srv,"ssh");
			if(num_ports>=2&&!srv.ftpPortOpen) this.unlock_service(srv,"ftp");
			if(num_ports>=3&&!srv.smtpPortOpen) this.unlock_service(srv,"smtp");
			if(num_ports>=4&&!srv.httpPortOpen) this.unlock_service(srv,"http");
			if(num_ports>=5&&!srv.sqlPortOpen) this.unlock_service(srv,"sql");
			if(num_ports>5) {
				this.ns.print("failed (too many ports required) ",num_ports," ",hostname);
				this.ns.exit();
			}
			if(!srv.hasAdminRights&&srv.openPortCount>=srv.numOpenPortsRequired) {
				this.ns.nuke(hostname);
				srv.hasAdminRights=true;
				if(!this.to_backdoor.includes(hostname)) this.to_backdoor.push(hostname);
				if(distribute) await this.ns.sleep(1000/3);
			}
			if(distribute) await this.ns.sleep(20);
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
	await s.init_hack();
}

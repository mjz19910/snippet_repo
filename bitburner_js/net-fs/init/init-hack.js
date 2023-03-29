import {backdoor_list_file,hack_server,hack_support,hack_template,host_scan_list_file,share_script} from "/run/hack-scripts.js";

export class InitHackScript {
	scripts=[
		hack_support,hack_template,
		"/run/as.js",
	];
	/** @readonly */
	/** @type {string[]} */
	arr_disabled=[];
	/** @type {string[]} */
	hostname_list=[];
	/** @arg {NS} ns @arg {{trace:boolean;template_changed:boolean}} s */
	constructor(ns,s) {
		this.opts=s;
		this.ns=ns;
		this.init_script();
		this.player_hacking_skill=ns.getPlayer().skills.hacking;
		/** @type {string[]} */
		this.to_backdoor=this.load_to_backdoor_list();
		this.template_changed=s.template_changed;
		this.enabled_exploits=this.gen_crack_flags();
		this.service_map={
			ssh: ns.brutessh,
			ftp: ns.ftpcrack,
			smtp: ns.relaysmtp,
			http: ns.httpworm,
			sql: ns.sqlinject,
		};
		this.f_=ns.flags([
			["limit",-1],
		]);
		if(typeof this.f_.limit!=="number") throw new Error("Invalid arguments");
		this.start_limit=this.f_.limit;
		if(this.start_limit===-1) this.start_limit=Infinity;
		this.start_count=0;
	}
	disable_log_use() {
		this.disableLog_("scan");
		this.disableLog_("kill");
		this.disableLog_("scp");
		this.disableLog_("exec");
		this.disableLog_("sleep");
		this.disableLog_("asleep");
		this.disableLog_("brutessh");
		this.disableLog_("ftpcrack");
		this.disableLog_("relaysmtp");
		this.disableLog_("httpworm");
		this.disableLog_("getServerMaxRam");
	}
	async init_hack() {
		this.start_host_scan("home");
		if(!this.has_process_by_file("home",hack_server)) this.ns.exec(hack_server,"home");
		for(const hostname of this.hostname_list) this.ns.scp(this.scripts,hostname);
		this.do_get_admin_rights();
		await this.start_hack_script();
		this.update_backdoor_cache();
		this.log_servers_to_backdoor();
	}
	/**
	 * @param {string} hostname
	 * @param {string} filename
	 */
	has_process_by_file(hostname,filename) {
		let cur_ps=this.ns.ps(hostname);
		let server_idx=cur_ps.findIndex(v => v.filename===filename);
		return server_idx>-1;
	}
	/** @param {Server} srv */
	async start_script_template(srv) {
		const {ns}=this;
		if(srv.maxRam===0) {
			if(this.opts.trace) this.format_print(srv,`t:0 h:${srv.hostname}`);
			return false;
		}
		const processes=ns.ps(srv.hostname);
		if(processes.length>0) {
			if(!this.template_changed&&processes.find(ps => ps.filename===hack_template)) return;
			processes.forEach(ps => {
				if(ps.filename===hack_template) ns.kill(ps.pid);
				if(ps.filename===share_script) this.restart_process(srv,ps,0.5);
			});
		}
		let t=this.get_thread_count(srv);
		if(t<=0) return false;
		this.format_print(srv,`t:${t} m:${ns.formatRam(srv.maxRam)} h:${srv.hostname}`);
		let pid=ns.exec(hack_template,srv.hostname,t,t,srv.hostname);
		if(pid===0) {
			ns.print("failed to start '",hack_template,"' on ",srv.hostname);
			ns.exit();
		}
		await this.ns.sleep(1000);
		return true;
	}
	/**
	 * @param {Server} srv
	 * @param {ProcessInfo} info
	 * @param {number} thread_ratio
	 */
	restart_process(srv,info,thread_ratio) {
		const thread_count=info.threads*thread_ratio|0;

		const ram=this.ns.getScriptRam(info.filename);
		this.ns.print("script: ",info.filename);
		this.ns.print("max_threads: ",srv.maxRam/ram);
		this.ns.print("cur_threads: ",info.threads);
		this.kill_process(srv,info,ram);
		this.start_process(srv,info,thread_count,ram);
	}
	/**
	 * @param {Server} srv
	 * @param {ProcessInfo} info
	 * @param {number} thread_count
	 * @param {number} ram
	 */
	start_process(srv,info,thread_count,ram) {
		this.ns.exec(info.filename,srv.hostname,thread_count,...info.args);
		srv.ramUsed+=thread_count*ram;
	}
	/**
	 * @param {Server} srv
	 * @param {ProcessInfo} info
	 * @param {number} ram
	 */
	kill_process(srv,info,ram) {
		this.ns.kill(info.pid);
		srv.ramUsed-=info.threads*ram;
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
	}
	/** @arg {string} src_host */
	start_host_scan(src_host) {
		/** @type {Map<string, string[]>} */
		let map=new Map;
		/** @type {Set<string>} */
		let seen_set=new Set;
		this.hostname_list.push(src_host);
		map.set(src_host,this.ns.scan(src_host));
		let scan_results=["------\n","\n"];
		let depth=0;
		for(;;) {
			depth++;
			const result=this.iter_host_scan_entries(src_host,seen_set,depth,map);
			scan_results.push(result);
			if(map.size===0) break;
		}
		this.ns.write(host_scan_list_file,scan_results.join(""),"w");
	}
	/**
	 * @param {string} src_host
	 * @param {number} depth @arg {Map<string,string[]>} map
	 * @param {Set<string>} seen_set
	 * */
	iter_host_scan_entries(src_host,seen_set,depth,map) {
		let depth_list=[];
		const clone=new Map(map);
		for(let [key,val] of clone.entries()) {
			for(let srv of val) {
				if(seen_set.has(srv)) continue;
				seen_set.add(srv);
				this.hostname_list.push(srv);
				let scan_res=this.ns.scan(srv);
				let home_idx=scan_res.indexOf(src_host);
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
		if(this.fileExists(backdoor_list_file,"home")) {
			let data=this.ns.read(backdoor_list_file).trim();
			if(data!=="") return data.split("\n");
			return [];
		}
		return [];
	}
	log_servers_to_backdoor() {
		for(const hostname of this.to_backdoor) {
			const srv=this.get_server(hostname);
			this.ns.print("backdoor: ",hostname," ",srv.requiredHackingSkill);
		}
		this.ns.write(backdoor_list_file,this.to_backdoor.join("\n")+"\n","w");
	}
	async start_hack_script() {
		for(const hostname of this.hostname_list) {
			const srv=this.get_server(hostname);
			if(!srv.hasAdminRights) continue;
			if(this.start_count>this.start_limit) return;
			let increased=await this.start_script_template(srv);
			if(increased) this.start_count++;
		}
	}
	/** @arg {Server} srv @arg {string} msg */
	format_print(srv,msg) {
		this.ns.printf(
			"[b:%s] %s",
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
				if(!to_backdoor.includes(hostname)) to_backdoor.push(hostname);
			} else {
				let idx=to_backdoor.indexOf(hostname);
				if(idx!==-1) to_backdoor.splice(idx,1);
			}
		}
	}
	/** @arg {Server} srv */
	get_thread_count(srv) {
		let srv_ram_avail=srv.maxRam-srv.ramUsed;
		if(srv.hostname==="home") {
			if(srv_ram_avail<=64) return 0;
			return (srv_ram_avail-48)/2|0;
		}
		if(srv_ram_avail<=0) return 0;
		let thread_count=srv_ram_avail/2;
		return thread_count|0;
	}
	do_get_admin_rights() {
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
			}
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
	/** @arg {Server} srv */
	update_server(srv) {
		srv=this.ns.getServer(srv.hostname);
		this.server_map[srv.hostname]=srv;
		return srv;
	}
	/** @param {Server} srv @param {string} str */
	rename_server(srv,str) {
		delete this.server_map[srv.hostname];
		this.server_map[str]=srv;
		srv.hostname=str;
	}
	/** @arg {Server} srv @arg {"ssh"|"ftp"|"smtp"|"http"|"sql"} type */
	unlock_service(srv,type) {
		if(this.enabled_exploits[`has_${type}`]) {
			this.service_map[type](srv.hostname);
			srv[`${type}PortOpen`]=true;
			srv.openPortCount++;
		}
	}
}
/** @param {NS} ns */
export async function main(ns) {
	const trace=false;
	const template_changed=false;
	const s=new InitHackScript(ns,{
		template_changed,
		trace,
	});
	await s.init_hack();
}

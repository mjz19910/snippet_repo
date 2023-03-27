import {as} from "/run/as";
import {hack_server,hack_template} from "/run/hack-scripts";

/** @param {NS} ns */
export async function main(ns) {
	const use_hacked_servers=false;
	const use_home_server=false;

	ns.tail();
	ns.clearLog();
	ns.disableLog("disableLog");
	ns.disableLog("getServerMaxRam");
	ns.disableLog("killall");
	ns.disableLog("sleep");
	ns.disableLog("exec");
	/** @type {{all:boolean}} */
	const f_=as(ns.flags([
		["all",false],
	]));
	const share_script="/api/share.js";
	let has_share_running=false;
	if(f_.all) {
		let ps_list=ns.ps("home");
		ps_list.forEach(info => {
			if(info.filename===hack_server) return;
			if(info.filename===hack_template) ns.kill(info.pid);
			if(info.filename===share_script) has_share_running=true;
		});
	}
	if(use_home_server||f_.all) {
		let thread_n=(ns.getServerMaxRam("home")-48)/4|0;
		if(has_share_running) return;
		ns.run(share_script,thread_n,"auto","home");
	}

	// share purchased_servers
	let share_servers;
	if(f_.all) {
		share_servers=ns.getPurchasedServers();
	} else {
		share_servers=ns.getPurchasedServers().slice(0,16);
	}
	for(let srv of share_servers) {
		if(!ns.ls(srv).includes(share_script)) {
			ns.scp(share_script,srv);
		}
		ns.killall(srv);
		let thread_n=ns.getServerMaxRam(srv)/4|0;
		ns.exec(share_script,srv,thread_n,"auto",srv);
		await ns.sleep(33);
	}
	if(!use_hacked_servers) return;
	let seen_srv=new Set;
	let servers_arr=[];
	let cur_srv="home";
	while(cur_srv) {
		seen_srv.add(cur_srv);
		/** @type {number|null} */
		let pid=null;
		let srv=cur_srv;
		x: {
			if(srv.startsWith("big-")) break x;
			let hosts=ns.scan(srv);
			for(let host of hosts) {
				if(seen_srv.has(host)) continue;
				servers_arr.push(host);
			}
			if(srv==="home"&&!f_.all) break x;
			if(!ns.ls(srv).includes(share_script)) {
				ns.scp([share_script],srv);
			}
			ns.killall(srv);
			const server_ram=ns.getServerMaxRam(srv);
			if(server_ram===0) break x;
			let thread_n=server_ram/4|0;
			pid=ns.exec(share_script,srv,thread_n,"auto",srv);
		}
		let next_srv=servers_arr.pop();
		if(next_srv===void 0) break;
		cur_srv=next_srv;
		if(!pid) continue;
		await ns.sleep(40);
		ns.closeTail(pid);
	}
}
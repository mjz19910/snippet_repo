import {start_host_scan} from "/init/init-hack.js";
import {backdoor_list_file} from "/run/hack-scripts.js";

/** @arg {{ns:NS;to_backdoor:string[];get_server(x:string):Server}} obj */
export function log_servers_to_backdoor(obj) {
	for(const hostname of obj.to_backdoor) {
		const srv=obj.get_server(hostname);
		obj.ns.print("backdoor: ",hostname," ",srv.requiredHackingSkill);
	}
	obj.ns.write(backdoor_list_file,obj.to_backdoor.join("\n")+"\n","w");
}

/** @arg {NS} ns */
export async function main(ns) {
	ns.disableLog("disableLog");
	ns.disableLog("getHackingLevel");
	ns.disableLog("getServer");
	ns.disableLog("scan");
	ns.tail();
	ns.clearLog();
	ns.print("init_hack");
	const player_hacking_skill=ns.getHackingLevel();
	/** @type {string[]} */
	const hostname_list=[];
	/** @type {string[]} */
	const to_backdoor=[];
	await start_host_scan(ns,hostname_list,"home");
	update_backdoor_cache(ns,to_backdoor,hostname_list,player_hacking_skill);
	log_servers_to_backdoor({
		ns,to_backdoor,
		get_server(x) {
			return ns.getServer(x);
		}
	});
}
/**
 * @param {NS} ns
 * @param {string[]} to_backdoor
 * @param {string[]} hostname_list
 * @param {number} player_hacking_skill
 */
function update_backdoor_cache(ns,to_backdoor,hostname_list,player_hacking_skill) {
	for(let hostname of hostname_list) {
		if(hostname.startsWith("pserv-")) continue;
		const srv=ns.getServer(hostname);
		if(srv.purchasedByPlayer) continue;
		if(!srv.hasAdminRights) continue;
		if(srv.requiredHackingSkill<=player_hacking_skill&&!srv.backdoorInstalled) {
			if(!to_backdoor.includes(hostname)) to_backdoor.push(hostname);
		} else {
			let idx=to_backdoor.indexOf(hostname);
			if(idx!==-1) to_backdoor.splice(idx,1);
		}
	}
}

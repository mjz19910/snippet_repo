import {hack_support,hack_template} from "/api/hack-scripts.js";

/** @param {NS} ns */
export async function main(ns) {
	const player_hacking_skill=ns.getHackingLevel();
	const scripts=[hack_support,hack_template];
	let scan_res=ns.scan("home");
	const target_host=scan_res[0];
	ns.scp(scripts,target_host,"home");
	ns.killall(target_host);
	ns.exec(hack_template,target_host,1,player_hacking_skill,"none");
}

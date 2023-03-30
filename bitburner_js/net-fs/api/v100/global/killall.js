import {hack_server} from "../hack-scripts.js";

/** @param {NS} ns */
export async function main(ns) {
	ns.disableLog("disableLog");
	ns.disableLog("killall");
	ns.disableLog("scan");
	ns.killall("home",true);
	/** @param {ProcessInfo} item */
	function close_script_tail(item) {
		if(item.filename===hack_server) ns.closeTail(item.pid);
		if(item.filename==="/api/share.js") ns.closeTail(item.pid);
	}
	for(let item of ns.getRecentScripts()) {
		close_script_tail(item);
	}
	for(let item of ns.ps("home")) {
		close_script_tail(item);
	}
	let killed=new Set;
	let next=["home"];
	for(let cur;cur=next.pop();) {
		x: if(cur!=="home") {
			if(ns.ps(cur).length<=0) break x;
			ns.killall(cur);
		}
		killed.add(cur);
		const scan_res=ns.scan(cur);
		for(let srv of scan_res) {
			if(killed.has(srv)) continue;
			next.push(srv);
		}
	}
}
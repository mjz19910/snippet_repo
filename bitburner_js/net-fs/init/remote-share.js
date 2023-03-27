/** @param {NS} ns */
export async function main(ns) {
	ns.tail();
	ns.clearLog();
	ns.disableLog("disableLog");
	ns.disableLog("getServerMaxRam");
	ns.disableLog("killall");
	ns.disableLog("sleep");
	ns.disableLog("exec");
	ns.disableLog("scan");
	const share_script="/api/share.js";
	let seen_srv=new Set;
	let servers_arr=["home"];
	for(let cur_srv;cur_srv=servers_arr.shift();) {
		seen_srv.add(cur_srv);
		/** @type {number|null} */
		let pid=null;
		let srv=cur_srv;
		x: {
			let hosts=ns.scan(srv);
			for(let host of hosts) {
				if(seen_srv.has(host)) continue;
				servers_arr.push(host);
			}
			if(!ns.ls(srv).includes(share_script)) {
				ns.scp([share_script],srv);
			}
			ns.killall(srv);
			const server_ram=ns.getServerMaxRam(srv);
			if(server_ram===0) break x;
			let thread_n=server_ram/4|0;
			pid=ns.exec(share_script,srv,thread_n,"auto",srv);
		}
		if(!pid) continue;
		await ns.sleep(33);
		ns.closeTail(pid);
	}
}
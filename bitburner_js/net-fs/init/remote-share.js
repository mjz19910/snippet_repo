/** @param {NS} ns */
export async function main(ns) {
	ns.tail();
	ns.clearLog();
	ns.disableLog("disableLog");
	ns.disableLog("getServerMaxRam");
	ns.disableLog("killall");
	ns.disableLog("spawn");
	ns.disableLog("sleep");
	ns.disableLog("exec");
	ns.disableLog("scan");
	const share_script="/api/share.js";
	const seen_srv=new Set;
	const servers_arr=[];
	const home_reserved_mem=8.3+4;
	for(let hostname="home";;) {
		let next=servers_arr.shift();
		if(next===void 0) break;
		hostname=next;
		seen_srv.add(hostname);
		const hosts=ns.scan(hostname);
		for(const host of hosts) {
			if(seen_srv.has(host)) continue;
			servers_arr.push(host);
		}
		if(!ns.ls(hostname).includes(share_script)) {
			ns.scp([share_script],hostname);
		}
		ns.killall(hostname);
		const server_ram=ns.getServerMaxRam(hostname);
		if(server_ram===0) continue;
		if(hostname==="home") {
			const thread_n=(server_ram-home_reserved_mem)/4|0;
			const pid=ns.exec(share_script,hostname,thread_n,"auto",hostname);
			if(pid===0) {
				ns.print("failed to start ",share_script," on ",hostname);
				ns.exit();
			}
			continue;
		}
		const thread_n=server_ram/4|0;
		const pid=ns.exec(share_script,hostname,thread_n,"auto",hostname);
		if(pid===0) {
			ns.print("failed to start ",share_script," on ",hostname);
			ns.exit();
		}
	}
}
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
	const seen_srv=new Set;
	const servers_arr=[];
	let hostname="home";
	for(;;) {
		let next=servers_arr.shift();
		if(next===void 0) break;
		hostname=next;
		seen_srv.add(hostname);
		const hosts=ns.scan(hostname);
		for(const host of hosts) {
			if(seen_srv.has(host)) continue;
			servers_arr.push(host);
		}
		if(hostname==="home") continue;
		if(!ns.ls(hostname).includes(share_script)) {
			ns.scp([share_script],hostname);
		}
		ns.killall(hostname);
		const server_ram=ns.getServerMaxRam(hostname);
		if(server_ram===0) continue;
		const thread_n=server_ram/4|0;
		const pid=ns.exec(share_script,hostname,thread_n,"auto",hostname);
		if(pid===0) {
			ns.print("failed to start ",share_script," on ",hostname);
			ns.exit();
		}
	}
	hostname="home";
	const server_ram=ns.getServerMaxRam(hostname);
	const thread_n=server_ram/4|0;
	ns.spawn(share_script,thread_n,"auto",hostname);
}
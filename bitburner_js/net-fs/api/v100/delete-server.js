/** @param {NS} ns */
export async function main(ns) {
	let my_servers=ns.getPurchasedServers();
	const server_to_delete=ns.args[0];
	if(typeof server_to_delete!=="string") throw new Error("Invalid argument");
	if(!my_servers.includes(server_to_delete)) {
		ns.tprint("ERROR: Unable to delete non purchased server: "+server_to_delete);
		ns.exit();
	}
	let proc_list=ns.ps(server_to_delete);
	proc_list.forEach(v => {
		ns.tprintf("kill(\"%s\")",v.pid);
		ns.kill(v.pid);
	});
	ns.deleteServer(server_to_delete);
	ns.tprintf("deleteServer(\"%s\")",server_to_delete);
}

import {read_port1_msg,read_port_msg,send_port2_msg} from "/hack-support-v3.js";

/** @param {NS} ns */
export async function main(ns) {
	ns.tail();
	ns.clearLog();
	ns.disableLog("disableLog");
	ns.disableLog("sleep");
	ns.disableLog("getServerMaxMoney");
	ns.disableLog("getServerMinSecurityLevel");
	ns.disableLog("getServerMoneyAvailable");
	ns.disableLog("getServerSecurityLevel");

	const trace=false;
	/** @type {{[x:string]:Server}} */
	const server_map={};
	/** @arg {string} hostname */
	function get_server(hostname) {
		let server=server_map[hostname];
		if(server) return server;
		server=ns.getServer(hostname);
		server_map[hostname]=server;
		return server;
	}

	let processed_messages_count=0;
	function process_messages() {
		for(;;) {
			let msg=read_port1_msg(ns);
			if(msg===null) break;
			processed_messages_count++;
			switch(msg.call) {
				case "getServerMaxMoney": {
					let reply=ns.getServerMaxMoney(...msg.args);
					send_port2_msg(ns,{call: "getServerMaxMoney",hostname: msg.args[0],reply});
				} break;
				case "getServerMinSecurityLevel": {
					let reply=ns.getServerMinSecurityLevel(...msg.args);
					send_port2_msg(ns,{call: "getServerMinSecurityLevel",hostname: msg.args[0],reply});
				} break;
				case "getServerMoneyAvailable": {
					let reply=ns.getServerMoneyAvailable(...msg.args);
					send_port2_msg(ns,{call: "getServerMoneyAvailable",hostname: msg.args[0],reply});
				} break;
				case "getServerSecurityLevel": {
					let reply=ns.getServerSecurityLevel(...msg.args);
					send_port2_msg(ns,{call: "getServerSecurityLevel",hostname: msg.args[0],reply});
				} break;
				case "get_server": {
					let reply=get_server(msg.args[0]);
					send_port2_msg(ns,{call: "get_server",hostname: msg.args[0],reply});
				} break;
			}
			if(trace) ns.print(msg);
		}
	}
	let resend_reply=null;
	for(;;) {
		while(resend_reply!==null) {
			ns.writePort(2,resend_reply);
			resend_reply=read_port_msg(ns,3);
		}
		process_messages();
		await ns.sleep(40);
		if(processed_messages_count===0) await ns.sleep(1500);
		processed_messages_count=0;
		resend_reply=read_port_msg(ns,3);
	}
}

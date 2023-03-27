import {read_port1_msg,send_port2_msg} from "/run/hack-support.js";
/**
 * @param {number} min
 * @param {number} max
 */
function rand_num(min,max) {
	return Math.floor(Math.random()*(max-min+1))+min;
}
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

	const window_width=globalThis["document"].body.getClientRects()[0].width;

	await ns.sleep(33);

	const width=250;
	ns.resizeTail(width,0);
	ns.moveTail(window_width-width-4,1);

	const trace=false;
	/** @type {{[x:string]:Server}} */
	const server_map={};
	/** @type {string[]} */
	const hostname_list=[];
	/** @arg {string} hostname */
	function get_server(hostname) {
		let server=server_map[hostname];
		if(server) return server;
		hostname_list.push(hostname);
		server=ns.getServer(hostname);
		server_map[hostname]=server;
		return server;
	}

	for(let item of ns.scan("home")) get_server(item);

	let processed_messages_count=0;
	let print_server_message=true;
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
					if(print_server_message&&reply!==0) {
						ns.tprintf("getServerMoneyAvailable: (%s) %s",msg.args[0],ns.formatNumber(reply));
						print_server_message=false;
						async function run_sleep() {
							await ns.asleep(1000);
							print_server_message=true;
						}
						run_sleep();
					}
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
				case "get_hack_target": {
					let reply=null;
					for(;;) {
						let hostname=hostname_list[rand_num(0,(hostname_list.length-1))];
						for(let item of ns.scan(hostname)) {
							get_server(item);
						}
						let srv=get_server(msg.args[0]);
						if(srv.maxRam===0) continue;
						if(srv.hasAdminRights) {
							reply=srv;
							break;
						}
					}
					send_port2_msg(ns,{call: "get_hack_target",id: msg.args[0],reply});
				} break;
			}
			if(trace) ns.print(msg);
		}
	}
	for(;;) {
		process_messages();
		await ns.sleep(33);
		if(processed_messages_count===0) await ns.sleep(1500);
		processed_messages_count=0;
	}
}

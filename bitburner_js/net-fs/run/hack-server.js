import {log_port_id,read_call_msg,reply_port_id,reply_retry_port_id,request_port_id,send_reply_msg} from "/run/hack-support.js";
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
	ns.disableLog("getServerMinSecurityLevel");
	ns.disableLog("getServerMoneyAvailable");
	ns.disableLog("getServerSecurityLevel");
	ns.disableLog("getServerMaxMoney");
	ns.disableLog("sleep");
	ns.disableLog("scan");

	const window_width=globalThis["document"].body.getClientRects()[0].width;

	await ns.sleep(1000);

	const width=250;
	ns.resizeTail(width,0);
	ns.moveTail(window_width-width-4,1);

	const trace=false;
	const randomize_hack=false;
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

	const read_handle=ns.getPortHandle(request_port_id);
	const write_handle=ns.getPortHandle(reply_port_id);
	const log_handle=ns.getPortHandle(log_port_id);
	const retry_reply_handle=ns.getPortHandle(reply_retry_port_id);
	async function process_messages() {
		for(;;) {
			while(!retry_reply_handle.empty()) {
				write_handle.write(retry_reply_handle.read());
				await ns.sleep(1000);
			}
			let msg=await read_call_msg(ns,read_handle);
			const {call,args}=msg;
			switch(call) {
				case "getServerMaxMoney": {
					let reply=ns.getServerMaxMoney(...args);
					await send_reply_msg(ns,write_handle,{call,id: args[0],reply});
				} break;
				case "getServerMinSecurityLevel": {
					let reply=ns.getServerMinSecurityLevel(...args);
					await send_reply_msg(ns,write_handle,{call,id: args[0],reply});
				} break;
				case "getServerMoneyAvailable": {
					let reply=ns.getServerMoneyAvailable(...args);
					await send_reply_msg(ns,write_handle,{call,id: args[0],reply});
				} break;
				case "getServerSecurityLevel": {
					let reply=ns.getServerSecurityLevel(...args);
					await send_reply_msg(ns,write_handle,{call,id: args[0],reply});
				} break;
				case "get_server": {
					let reply=get_server(args[0]);
					await send_reply_msg(ns,write_handle,{call,id: args[0],reply});
				} break;
				case "get_hack_target": {
					if(randomize_hack) {
						let reply=null;
						for(;;) {
							let hostname=hostname_list[rand_num(0,(hostname_list.length-1))];
							await ns.sleep(1000);
							if(hostname==="home") continue;
							if(hostname.startsWith("big-")) continue;
							const scan_results=ns.scan(hostname).filter(v => !hostname_list.includes(v));
							if(scan_results.length>0) ns.printf("scan: %s %s",hostname,JSON.stringify(scan_results));
							for(let item of scan_results) get_server(item);
							let srv=get_server(hostname);
							if(srv.purchasedByPlayer) continue;
							if(srv.moneyMax===0) continue;
							if(srv.maxRam===0) continue;
							if(srv.hasAdminRights) {
								reply=srv;
								break;
							}
						}
						await send_reply_msg(ns,write_handle,{call,id: args[0],reply});
					} else {
						let srv;
						for(let name of ["ecorp","foodnstuff","n00dles"]) {
							srv=get_server(name);
							if(srv.hasAdminRights) break;
							if(srv.openPortCount<srv.numOpenPortsRequired) continue;
							ns.nuke(name);
						}
						if(!srv) srv=get_server("n00dles");
						await send_reply_msg(ns,write_handle,{call,id: args[0],reply: srv});
					}
				} break;
			}
			while(!log_handle.empty()) {
				let res=log_handle.read();
				ns.printf("%s",res);
			}
			if(trace) ns.print(msg);
		}
	}
	await process_messages();
}

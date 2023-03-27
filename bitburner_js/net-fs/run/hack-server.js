import {read_call_msg,send_reply_msg} from "/run/hack-support.js";
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

	const read_handle=ns.getPortHandle(1);
	const write_handle=ns.getPortHandle(2);
	const log_handle=ns.getPortHandle(3);
	async function process_messages() {
		for(;;) {
			let msg=await read_call_msg(read_handle);
			console.time("server-work1");
			const {call,args}=msg;
			switch(call) {
				case "getServerMaxMoney": {
					let reply=ns.getServerMaxMoney(...args);
					send_reply_msg(write_handle,{call,id: args[0],reply});
				} break;
				case "getServerMinSecurityLevel": {
					let reply=ns.getServerMinSecurityLevel(...args);
					send_reply_msg(write_handle,{call,id: args[0],reply});
				} break;
				case "getServerMoneyAvailable": {
					let reply=ns.getServerMoneyAvailable(...args);
					send_reply_msg(write_handle,{call,id: args[0],reply});
				} break;
				case "getServerSecurityLevel": {
					let reply=ns.getServerSecurityLevel(...args);
					send_reply_msg(write_handle,{call,id: args[0],reply});
				} break;
				case "get_server": {
					let reply=get_server(args[0]);
					send_reply_msg(write_handle,{call,id: args[0],reply});
				} break;
				case "get_hack_target": {
					let reply=null;
					for(;;) {
						let hostname=hostname_list[rand_num(0,(hostname_list.length-1))];
						await ns.sleep(33);
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
					send_reply_msg(write_handle,{call,id: args[0],reply});
				} break;
			}
			console.timeEnd("server-work1");
			while(!log_handle.empty()) {
				let res=log_handle.read();
				ns.printf("%s",res);
			}
			if(trace) ns.print(msg);
		}
	}
	await process_messages();
}

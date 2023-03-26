import {read_port1_msg,read_port_msg} from "/hack-support-v3.js";

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

	let processed_messages_count=0;
	function process_messages() {
		for(;;) {
			let msg=read_port1_msg(ns);
			if(msg===null) break;
			processed_messages_count++;
			switch(msg.call) {
				case "getServerMaxMoney": {
					let result=ns.getServerMaxMoney(...msg.args);
					ns.writePort(2,JSON.stringify({id: "getServerMaxMoney",result}));
				} break;
				case "getServerMinSecurityLevel": {
					let result=ns.getServerMinSecurityLevel(...msg.args);
					ns.writePort(2,JSON.stringify({id: "getServerMinSecurityLevel",result}));
				} break;
				case "getServerMoneyAvailable": {
					let result=ns.getServerMoneyAvailable(...msg.args);
					ns.writePort(2,JSON.stringify({id: "getServerMoneyAvailable",result}));
				} break;
				case "getServerSecurityLevel": {
					let result=ns.getServerSecurityLevel(...msg.args);
					ns.writePort(2,JSON.stringify({id: "getServerSecurityLevel",result}));
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

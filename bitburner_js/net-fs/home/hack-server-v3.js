import {read_port1_msg} from "/hack-support-v3.js";

/** @param {NS} ns */
export async function main(ns) {
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
			ns.print(msg);
		}
	}
	for(;;) {
		process_messages();
		await ns.sleep(40);
		if(processed_messages_count===0) await ns.sleep(1500);
		processed_messages_count=0;
	}
}

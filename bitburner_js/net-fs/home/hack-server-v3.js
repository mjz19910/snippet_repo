import {read_port1_msg} from "/hack-support-v3.js";

/** @param {NS} ns */
export async function main(ns) {
	function process_messages() {
		for(;;) {
			let msg=read_port1_msg(ns);
			if(msg===null) break;
			switch(msg.call) {
				case "getServerMaxMoney": {
					let result=ns.getServerMaxMoney(...msg.args);
					ns.writePort(2,JSON.stringify({id: "getServerMaxMoney",result}));
				} break;
				case "getServerMinSecurityLevel": {
					let result=ns.getServerMinSecurityLevel(...msg.args);
					ns.writePort(2,JSON.stringify({id: "getServerMinSecurityLevel",result}));
				} break;
			}
			ns.print(msg);
		}
	}
	for(;;) {
		process_messages();
		await ns.sleep(40);
	}
}

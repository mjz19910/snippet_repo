import {as_any} from "./run/as.js";

/** @param {NS} ns */
export async function main(ns) {
	ns.tail();
	const terminalInput=globalThis["document"].getElementById("terminal-input");
	if(!terminalInput) {
		ns.tprint("not at terminal");
		return;
	}
	if(!(terminalInput instanceof HTMLInputElement)) ns.exit();
	let scan_res=ns.scan();
	for(let hostname of scan_res) {
		if(hostname.startsWith("big-")) continue;
		let srv=ns.getServer(hostname);
		if(srv.purchasedByPlayer) continue;
		if(!srv.hasAdminRights) continue;
		if(srv.backdoorInstalled) continue;
		await ns.sleep(200);
		terminalInput.value=`connect ${hostname}`;
		const handler=Object.keys(terminalInput)[1];
		/** @type {{[x:string]:{onChange(x:{target:HTMLInputElement}):void}}} */
		let o1=as_any(terminalInput);
		o1[handler].onChange({target: terminalInput});
	}
}

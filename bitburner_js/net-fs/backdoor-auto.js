import {as_any} from "./run/as.js";

/** @param {NS} ns */
export async function main(ns) {
	ns.tail();
	const terminalInput_nt=globalThis["document"].getElementById("terminal-input");
	if(!terminalInput_nt) {
		ns.tprint("not at terminal");
		return;
	}
	if(!(terminalInput_nt instanceof HTMLInputElement)) ns.exit();
	let scan_res=ns.scan();
	for(let hostname of scan_res) {
		if(hostname.startsWith("big-")) continue;
		let srv=ns.getServer(hostname);
		if(srv.purchasedByPlayer) continue;
		if(!srv.hasAdminRights) continue;
		if(srv.backdoorInstalled) continue;
		await ns.sleep(200);
		terminalInput_nt.value=`connect ${hostname}`;
		const handler=Object.keys(terminalInput_nt)[1];

		/** @type {{[x:string]:ReactEventState}} */
		let terminalInput=as_any(terminalInput_nt);
		terminalInput[handler].onChange({target: terminalInput_nt});
		terminalInput[handler].onKeyDown({key: 'Enter',preventDefault: () => null});
	}
}

/** @typedef {{onChange(x:{target:HTMLInputElement}):void;onKeyDown(x:{key:"Enter";preventDefault():null}):void}} ReactEventState */

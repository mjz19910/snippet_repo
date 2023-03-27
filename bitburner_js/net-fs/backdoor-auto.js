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
		/** @type {HTMLInputElement&{[x:string]:ReactEventState}} */
		let terminalInput=as_any(terminalInput_nt);
		/** @arg {HTMLInputElement&{[x:string]:ReactEventState}} terminalInput @arg {string} command */
		function start_terminal_command(terminalInput,command) {
			terminalInput.value=command;
			const handler=Object.keys(terminalInput)[1];
			terminalInput[handler].onChange({target: terminalInput});
			terminalInput[handler].onKeyDown({key: 'Enter',preventDefault: () => null});
		}
		start_terminal_command(terminalInput,`connect ${hostname};backdoor`);
		let delay=ns.getHackTime(hostname); delay;
		await ns.sleep(5000);
		console.log(terminalInput);
		start_terminal_command(terminalInput,"home");
	}
}

/** @typedef {{onChange(x:{target:HTMLInputElement}):void;onKeyDown(x:{key:"Enter";preventDefault():null}):void}} ReactEventState */

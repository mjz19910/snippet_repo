import {as_any} from "./run/as.js";

/** @param {NS} ns */
export async function main(ns) {
	ns.tail();
	ns.disableLog("disableLog");
	ns.disableLog("sleep");
	const terminalInput_nt=globalThis["document"].getElementById("terminal-input");
	if(!terminalInput_nt) {
		ns.tprint("not at terminal");
		return;
	}
	if(!(terminalInput_nt instanceof HTMLInputElement)) ns.exit();
	let seen_hosts=new Set(["home"]);
	/** @type {{[x:string]:Server}} */
	let server_map={};
	/** @type {([{final:string},{path:string[]}])[]} */
	let scan_res=ns.scan().map(v => [{final: v},{path: []}]);
	for(let host_desc of scan_res) {
		const hostname=host_desc[0].final;
		if(hostname.startsWith("big-")) continue;
		let next=ns.scan(hostname);
		for(let res of next) {
			if(seen_hosts.has(res)) continue;
			seen_hosts.add(res);
			scan_res.push([{final: res},{path: [...host_desc[1].path,hostname]}]);
		}
		let srv=ns.getServer(hostname);
		server_map[hostname]=srv;
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
		let full_path=[...host_desc[1].path,hostname].filter((v,idx,arr) => {
			if(idx+1>=arr.length) return !server_map[v].backdoorInstalled;
			let v2=arr[idx+1];
			return !server_map[v2].backdoorInstalled;
		});
		start_terminal_command(terminalInput,`connect ${full_path.reduce((p,c) => `${p};connect ${c}`)};backdoor`);
		let delay=ns.getHackTime(hostname); delay;
		let acc_delay=0;
		for(;;) {
			await ns.sleep(80);
			acc_delay+=80;
			let has_disabled=terminalInput.classList.contains("Mui-disabled");
			if(!has_disabled) break;
		}
		console.log(delay/acc_delay,delay,acc_delay);
		start_terminal_command(terminalInput,"home");
	}
}

/** @typedef {{onChange(x:{target:HTMLInputElement}):void;onKeyDown(x:{key:"Enter";preventDefault():null}):void}} ReactEventState */

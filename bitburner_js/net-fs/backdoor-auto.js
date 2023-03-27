import {as_any} from "./run/as.js";

/** @param {NS} ns */
export async function main(ns) {
	ns.tail();
	ns.disableLog("disableLog");
	ns.disableLog("getHackingLevel");
	ns.disableLog("sleep");
	ns.disableLog("scan");
	const terminalInput_nt=globalThis["document"].getElementById("terminal-input");
	if(!terminalInput_nt) {
		ns.tprint("not at terminal");
		return;
	}
	if(!(terminalInput_nt instanceof HTMLInputElement)) ns.exit();
	let hacking_level=ns.getHackingLevel();
	let seen_hosts=new Set(["home"]);
	/** @type {{[x:string]:Server}} */
	let server_map={};
	/** @type {([{final:string},{path:string[]}])[]} */
	let scan_res=ns.scan().map(v => [{final: v},{path: []}]);
	/** @type {([{final:string},{path:string[]}])[]} */
	let scan_res2=[];
	/** @type {HTMLInputElement&{[x:string]:ReactEventState}} */
	let terminalInput=as_any(terminalInput_nt);
	do {
		scan_res2.length=0;
		for(let host_desc of scan_res) {
			const hostname=host_desc[0].final;
			if(hostname.startsWith("big-")) continue;
			let next=ns.scan(hostname);
			for(let res of next) {
				if(seen_hosts.has(res)) continue;
				seen_hosts.add(res);
				scan_res2.push([{final: res},{path: [...host_desc[1].path,hostname]}]);
			}
			let srv=ns.getServer(hostname);
			server_map[hostname]=srv;
			if(srv.purchasedByPlayer) continue;
			if(!srv.hasAdminRights) continue;
			if(srv.backdoorInstalled) continue;
			if(srv.requiredHackingSkill>hacking_level) continue;
			let delay=ns.getHackTime(hostname);
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
			let cmd_list=full_path.map(v => "connect "+v);
			cmd_list.push("backdoor");
			start_terminal_command(terminalInput,cmd_list.join(";"));
			let acc_delay=0,start_perf=performance.now();
			await ns.sleep(delay/4-100);
			for(;;) {
				await ns.sleep(30);
				let has_disabled=terminalInput.classList.contains("Mui-disabled");
				if(!has_disabled) break;
			}
			acc_delay=performance.now()-start_perf;
			ns.printf("backdoor_ratio:%s",ns.formatNumber(delay/acc_delay));
			ns.printf("hack_time:%s",ns.tFormat(delay));
			ns.printf("backdoor_time:%s",ns.tFormat(acc_delay));
			start_terminal_command(terminalInput,"home");
		}
		for(let item of scan_res2) {
			scan_res.push(item);
		}
	} while(scan_res2.length>0);
}

/** @typedef {{onChange(x:{target:HTMLInputElement}):void;onKeyDown(x:{key:"Enter";preventDefault():null}):void}} ReactEventState */

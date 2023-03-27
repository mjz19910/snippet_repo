/** @param {NS} ns */
export async function main(ns) {
	ns.tail();
	ns.disableLog("disableLog");
	ns.disableLog("getHackingLevel");
	ns.disableLog("sleep");
	ns.disableLog("scan");
	const doc=globalThis["document"];
	/** @template {Element} R @returns {R|null} @template {ParentNode} T @arg {T} root @template {string} U @arg {U} selector */
	function query_element(root,selector) {
		return root.querySelector(selector);
	}
	/** @returns {HTMLInputElement&{[x:string]:ReactEventState}|null} */
	function get_terminal_input() {
		return query_element(doc,"#terminal-input");
	}
	async function wait_for_terminal() {
		let new_element=get_terminal_input(),cnt=0;
		while(new_element===null) {
			if(cnt%8===0) ns.print("wait ",cnt/8);
			await ns.sleep(250);
			cnt++;
			new_element=get_terminal_input();
		}
		return new_element;
	}
	let terminalInput=await wait_for_terminal();
	let hacking_level=ns.getHackingLevel();
	let seen_hosts=new Set(["home"]);
	/** @type {{[x:string]:Server}} */
	let server_map={};
	/** @type {([{final:string},{path:string[]}])[]} */
	let scan_res=ns.scan().map(v => [{final: v},{path: []}]);
	/** @type {([{final:string},{path:string[]}])[]} */
	let scan_res2=[];
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
			/** @arg {string} command */
			async function start_terminal_command(command) {
				terminalInput=await wait_for_terminal();
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
			await start_terminal_command(cmd_list.join(";"));
			let acc_delay=0,start_perf=performance.now(),cnt=0;
			const est_delay=delay/4;
			ns.printf("est_delay:%s",tFormat(ns,est_delay));
			await ns.sleep(est_delay);
			for(;;cnt++) {
				terminalInput=await wait_for_terminal();
				let has_disabled=terminalInput.classList.contains("Mui-disabled");
				if(!has_disabled) break;
				await ns.sleep(33);
			}
			acc_delay=performance.now()-start_perf;
			ns.printf("ratio:%s",ns.formatNumber(delay/acc_delay,2));
			ns.printf("time:%s",tFormat(ns,acc_delay));
			ns.print("cnt: ",cnt);
			await start_terminal_command("home");
		}
		for(let item of scan_res2) {
			scan_res.push(item);
		}
	} while(scan_res2.length>0);
}

/**
 * @param {NS} ns
 * @param {number} msec
 * @param {boolean | undefined} [milliPrecision]
 */
function tFormat(ns,msec,milliPrecision) {
	let ns_fmt=ns.tFormat(msec,milliPrecision);
	ns_fmt=ns_fmt.replace(/ minutes? /,"m");
	ns_fmt=ns_fmt.replace(/ seconds?/,"s");
	return ns_fmt;
}

/** @typedef {{onChange(x:{target:HTMLInputElement}):void;onKeyDown(x:{key:"Enter";preventDefault():null}):void}} ReactEventState */

import {NSProxy} from "/api/internal-support";

/** @param {NS_With_GetSet} ns */
export async function main(ns) {
	// a conditional breakpoint at this.memoed\[\w\];
	// with "this.memoed.get_memoed_state=()=>this;0;"
	// as the condition
	while(ns.get_memoed_state===void 0) {
		debugger;
		await ns.sleep(1000);
	}
	let memoed_state=ns.get_memoed_state();
	/** @type {{v:NetscriptContext|null}} */
	let state_export_obj={v: null};
	memoed_state.ns.get_state_set=function(s) {
		state_export_obj.v=s;
		return () => true;
	};
	ns.get_state_set();
	if(!state_export_obj.v) throw new Error("No context");
	const ctx=state_export_obj.v;
	let ns_=NSProxy(ctx.workerScript,memoed_state.ns,[]);
	ns.tail();
	const path="/api/corp-ram.js";
	let content=ns.read(path);
	content+="\n//"+"# sourceURL="+"home/"+path;
	let url=URL.createObjectURL(new Blob([content],{type: "text/javascript"}));
	/** @type {{main(x:NS):Promise<void>}} */
	let mod=await import(url);
	await mod.main(ns_);
}

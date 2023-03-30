/** @param {NS_With_GetSet} ns */
export async function main(ns) {
	while(ns.get_memoed_state===void 0) {
		debugger;
		await ns.sleep(1000);
	}
	let memoed_state=ns.get_memoed_state();
	/** @type {{v:ScriptState<"get_state_set">|null}} */
	let state_export_obj={v: null};
	memoed_state.ns.get_state_set=function(s) {
		state_export_obj.v=s;
		return () => true;
	};
	let r_ns=memoed_state.ns; r_ns;
	if(!ns.get_state_set) throw new Error("Change to memoed_state.ns did not propagate");
	ns.get_state_set();
	let script_state=state_export_obj.v;
	if(script_state===null) throw new Error("Did not get state");
	let ws=script_state.workerScript;
	/** @template {keyof GetCallableState<NS>} K @arg {K} name */
	function get_func(name) {
		return r_ns[name];
	}
	/** @template T @arg {T} name */
	function make_state(name) {
		return {workerScript: ws,function: name,functionPath: name};
	}
	if(ns.getScriptName()==="get-karma.js") {
		let script_content=ns.read("get-karma.js");
		const copy_name=`get-karma.${Math.random()*255|0}.js`;
		get_func("write")(make_state("write"))(copy_name,script_content,"w");
		get_func("run")(make_state("run"))(copy_name);
		while(true) {
			await ns.asleep(100);
			let removed=ns.rm(copy_name);
			if(removed) break;
		}
		return;
	}
	let karma=ns.heart.break();
	ns.tprint("karma: ",karma);
	console.log("memoed_state",memoed_state);
	let bypass_=get_func("bypass")(make_state("bypass"));
	debugger;
	// ns.alterReality();
	bypass_(globalThis["window"]["document"]);
	// console.log(ns.exploit());
}

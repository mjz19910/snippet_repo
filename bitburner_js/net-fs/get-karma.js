/** @param {NS_With_GetSet} ns */
export async function main(ns) {
	if(ns.getScriptName()==="get-karma.js") {
		let script_content=ns.read("get-karma.js");
		const copy_name=`get-karma.${Math.random()*255|0}.js`;
		ns.write(copy_name,script_content,"w");
		ns.run(copy_name);
		while(true) {
			await ns.asleep(100);
			let removed=ns.rm(copy_name);
			if(removed) break;
		}
		return;
	}
	let karma=ns.heart.break();
	ns.tprint("karma: ",karma);
	// ns.exploit();
	while(ns.get_memoed_state===void 0) {
		debugger;
	}
	let memoed_state=ns.get_memoed_state();
	/** @type {{v:{}|null}} */
	let state_export_obj={v: null};
	memoed_state.ns.get_state_set=function(s) {
		state_export_obj.v=s;
		return () => true;
	};
	let r_ns=memoed_state.ns; r_ns;
	console.log("memoed_state",memoed_state);
	if(!ns.get_state_set) throw new Error("Change to memoed_state.ns did not propagate");
	ns.get_state_set();
	let script_state=state_export_obj.v;
	if(script_state===null) throw new Error("Did not get state");
	debugger;
	// ns.alterReality();
	ns.bypass(globalThis["window"]["document"]);
	// console.log(ns.exploit());
}

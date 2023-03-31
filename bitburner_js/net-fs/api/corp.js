/** @param {NS_With_GetSet} ns */
export async function main(ns) {
	while(ns.get_memoed_state===void 0) {
		debugger;
		await ns.sleep(1000);
	}
	let memoed_state=ns.get_memoed_state();
	memoed_state;
	let corporation_=ns["corporation"];
	let my_corp=corporation_["getCorporation"]();
	let div_name=my_corp.divisions[0];
	let division=corporation_["getDivision"](my_corp.divisions[0]);
	let product=corporation_["getProduct"](div_name,division.products[0]);
	ns.print(product);
}

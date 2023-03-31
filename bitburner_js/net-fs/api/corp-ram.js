/** @param {NS} ns */
export async function main(ns) {
	ns.tail();
	let corporation_=ns.corporation;
	let my_corp=corporation_["getCorporation"]();
	let div_name=my_corp.divisions[0];
	let division=corporation_["getDivision"](my_corp.divisions[0]);
	let product=corporation_["getProduct"](div_name,division.products[0]);
	ns.print(product);
}

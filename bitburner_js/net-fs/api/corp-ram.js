/** @param {NS} ns */
export async function main(ns) {
	ns.clearLog();
	ns.tail();
	let corporation=ns.corporation;
	let my_corp=corporation.getCorporation();
	let div_name=my_corp.divisions[0];
	let division=corporation.getDivision(my_corp.divisions[0]);
	let product=corporation.getProduct(div_name,division.products[0]);
	ns.print(product);
}

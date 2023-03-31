/** @param {NS} ns */
export async function main(ns) {
	ns.clearLog();
	ns.tail();
	let corporation=ns.corporation;
	let my_corp=corporation.getCorporation();
	let div_name=my_corp.divisions[0];
	let division=corporation.getDivision(my_corp.divisions[0]);
	let product=corporation.getProduct(div_name,division.products[0]);
	log_product(product);
	/** @arg {Product} product */
	function log_product(product) {
		ns.print(product.name,".cityData.sec_12.stock: ",product.cityData["Sector-12"][0]);
		ns.print(product.name,".cityData.sec_12.prod_rate: ",product.cityData["Sector-12"][1]);
		ns.print(product.name,".cityData.sec_12.sell_rate: ",product.cityData["Sector-12"][2]);
	}
	product=corporation.getProduct(div_name,division.products[1]);
	let prod1=product.cityData["Sector-12"][1];
	let sell1=product.cityData["Sector-12"][2];
	let m={
		1.275: -0.019310254038757524,
		1.276: 0.006892609109019565,
	};
	m;
	let diff1_1=0.01; diff1_1;
	let diff1_2=0.001; diff1_2;
	ns.print("pd ",prod1-sell1);
	log_product(product);
}

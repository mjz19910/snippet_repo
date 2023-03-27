
/**
 * @param {string} key
 * @param {number} exp
 * @param {number} dur_min
 * @param {number} dur_sec
 */
function log_crime_min(key,exp,dur_min,dur_sec=0) {
	dur_sec+=dur_min*60;
	const rate=exp/dur_sec;
	const val=parseFloat(rate.toPrecision(3));
	console.log(key+":",val,"exp/sec");
}
function main() {
	// console.log((847.549/10)/60,"exp/sec");
	// console.log((565.033/5)/60,"exp/sec");
	// log_crime_min("kidnap",150.675,2);
	// log_crime_min("grand_theft_auto.str",37.669,1,20);
	// log_crime_min("grand_theft_auto.agi",150.675,1,20);
	// log_crime_min("grand_theft_auto.cha",75.338,1,20);
	// log_crime_min("homicide",3.767,0,3);
	// log_crime_min("traffic_arms.str",37.669,0,40);
	// log_crime_min("traffic_arms.cha",75.338,0,40);
	// log_crime_min("bond_forgery.hack",374.752,5,0);
	// log_crime_min("bond_forgery.dex",282.516,5,0);
	// log_crime_min("bond_forgery.cha",28.252,5,0);
	// log_crime_min("deal_drugs.dex",9.417,0,10);
	// log_crime_min("deal_drugs.cha",18.834,0,10);
	// log_crime_min("larceny.hack",168.638,1,30);
	// log_crime_min("larceny.dex",113.007,1,30);
	// log_crime_min("rob_store.hack",112.426,1,0);
	// log_crime_min("rob_store.dex",84.755,1,0);
	log_crime_min("shoplift",3.767,0,2);
}
main();

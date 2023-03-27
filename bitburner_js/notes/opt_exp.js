
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
/**
 * @param {number} num
 */
function round_float(num) {
	if(num<=0.1) return parseFloat(num.toPrecision(3));
	return parseFloat(num.toFixed(3));
}
/**
 * @param {string} key
 * @param {number} exp_rate
 * @param {number} cost_rate
 * @param {number} [calc_base]
 */
function log_university_min(key,exp_rate,cost_rate,calc_base) {
	if(cost_rate>0) throw new Error("Invalid cost rate: "+cost_rate.toFixed(0));
	const val=round_float(exp_rate);
	if(calc_base!==void 0) console.log("ratio:",(val/calc_base).toFixed(0));
	console.log(key+":",val,"exp/sec",cost_rate,"cost/sec");
}
function main() {
	const mults={
		hacking_exp: 4.122273968381145,
		charisma_exp: 2.0717875259144165,
	};
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
	// log_crime_min("shoplift",3.767,0,2);
	{
		const cur="rothman_uni";
		let log_hack=false;
		if(log_hack) {
			const base=mults.hacking_exp;
			// Computer Science
			log_university_min(`${cur}.hack1`,base,0);
			// Data Structures
			log_university_min(`${cur}.hack2`,base*2,0);
			// Networks
			log_university_min(`${cur}.hack3`,base*4,0);
		}
		{
			const base=mults.charisma_exp;
			log_university_min(`${cur}.cha1`,base,-432);
			log_university_min(`${cur}.cha2`,base*2,-864);
		}
	}
}
main();

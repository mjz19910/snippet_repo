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
 * @param {string} key
 * @param {string} exp_str
 * @param {number} exp
 * @param {number} dur_min
 * @param {number} dur_sec
 */
function log_crime_min2(key,exp_str,exp,dur_min,dur_sec=0) {
	dur_sec+=dur_min*60;
	const rate=exp/dur_sec;
	const val=parseFloat(rate.toPrecision(3));
	console.log(`${key}:`,exp_str,":",val,"exp/sec");
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
/**
 * @param {string} key
 * @param {number} exp_rate
 * @param {number} cost_rate
 * @param {number} [calc_base]
 */
function log_gym_min(key,exp_rate,cost_rate,calc_base) {
	if(cost_rate>0) throw new Error("Invalid cost rate: "+cost_rate.toFixed(0));
	const val=round_float(exp_rate);
	if(calc_base!==void 0) console.log("ratio:",(val/calc_base).toFixed(0));
	let cost_str;
	if(cost_rate<-1000) {
		cost_str=`${(cost_rate/1000).toFixed(3)}k`;
	} else cost_str=""+cost_rate;
	if(typeof document==="undefined") {
		console.log(`${key}: %o exp/sec \x1b[33m%s\x1b[0m cost/sec`,val,cost_str);
	}
	else {
		console.log(`${key}: %o exp/sec %c%s%c cost/sec`,val,"color: yellow;",cost_str,"");
	}
}
function main_1() {
	const json_mults=JSON.parse('{"hacking_chance":1.8598182764745166,"hacking_speed":1.8505297937672616,"hacking_money":3.1076812888716248,"hacking_grow":1.861109886735911,"hacking":2.9804916217637816,"strength":2.1358245948972256,"defense":2.0429626559886507,"dexterity":2.6911389895705042,"agility":2.0476057529340794,"charisma":2.0635986424127784,"hacking_exp":4.122273968381145,"strength_exp":2.0717875259144165,"defense_exp":2.0717875259144165,"dexterity_exp":2.0717875259144165,"agility_exp":2.0717875259144165,"charisma_exp":2.0717875259144165,"company_rep":2.4861450310973,"faction_rep":1.883443205376742,"crime_money":2.0472208754095025,"crime_success":1.4888879093887288,"hacknet_node_money":3.7551148907198795,"hacknet_node_purchase_cost":0.5138063081686742,"hacknet_node_ram_cost":0.6716422329002277,"hacknet_node_core_cost":0.6716422329002277,"hacknet_node_level_cost":0.5708958979651936,"work_money":1.6377767003276018,"bladeburner_max_stamina":1,"bladeburner_stamina_gain":1,"bladeburner_analysis":1,"bladeburner_success_chance":1}');
	json_mults;
	const mults={
		hacking_exp: 4.122273968381145,
		charisma_exp: 2.0717875259144165,
	};
	log_crime_min("shoplift",4.144,0,2);
	log_crime_min2("rob_store","hack",112.426,1,0);
	log_crime_min2("rob_store","dex,agi",84.755,1,0);
	log_crime_min2("larceny","hack",168.638,1,30);
	log_crime_min2("larceny","dex",113.007,1,30);
	log_crime_min2("deal_drugs","dex",9.417,0,10);
	log_crime_min2("deal_drugs","cha",18.834,0,10);
	log_crime_min2("bond_forgery","hack",374.752,5,0);
	log_crime_min2("bond_forgery","dex",282.516,5,0);
	log_crime_min2("bond_forgery","cha",28.252,5,0);
	log_crime_min2("traffic_arms","str",37.669,0,40);
	log_crime_min2("traffic_arms","cha",75.338,0,40);
	log_crime_min2("homicide","str,def,dex,agi",4.144,0,3);
	log_crime_min2("grand_theft_auto","str",37.669,1,20);
	log_crime_min2("grand_theft_auto","agi",165.743,1,20);
	log_crime_min2("grand_theft_auto","cha",75.338,1,20);
	log_crime_min2("kidnap","str,def,dex,agi,cha",165.743,2);
	log_crime_min2("assassination","str,def,dex,agi",621.536,5);
	log_crime_min2("heist","hack,str,def,dex,agi,cha",932.304,10);
	let is_enabled_rothman_uni=false;
	if(is_enabled_rothman_uni) {
		const cur="rothman_uni";
		{
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
	{
		const cur="summit_uni";
		/** @type {()=>`hack${1|2|3|4}`|`cha${1|2}`|"none"} */
		function get_sel() {return "none";}
		const sel=get_sel();
		{
			const base=mults.hacking_exp*1.5;
			// Computer Science
			{const s2="hack1"; if(sel===s2) log_university_min(`${cur}.${s2}`,base,0);}
			// Data Structures
			{const s2="hack2"; if(sel===s2) log_university_min(`${cur}.${s2}`,base*2,-144);}
			// Networks
			{const s2="hack3"; if(sel===s2) log_university_min(`${cur}.${s2}`,base*4,-288);}
			// Algorithms
			{const s2="hack4"; if(sel===s2) log_university_min(`${cur}.${s2}`,base*8,-1152);}
		}
		{
			const base=mults.charisma_exp*6;
			if(sel==="cha1") log_university_min(`${cur}.cha1`,base,-576);
			if(sel==="cha2") log_university_min(`${cur}.cha2`,base*2,-1152);
		}
	}
	let is_gym=false;
	if(is_gym) {
		const cur="snap_fitness_gym";
		log_gym_min(`${cur}.str`,10.359,-1080);
	}
	if(is_gym) {
		const cur="crush_fitness_gym";
		log_gym_min(`${cur}.str`,4.144,-324);
	}
}
main_1();

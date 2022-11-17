import {DoCalc} from "./DoCalc";

/**
 * @param {IValue} obj
 * @param {import("./CompressionStatsCalculator").CompressionStatsCalculator} stats
 */
export function run_calc(stats,obj) {
	let calc_value=new DoCalc(stats,obj);
	let res=calc_value.get_result();
	if(!res) return [false,null];
	return [true,res];
}

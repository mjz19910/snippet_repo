import {CompressionStatsCalculator} from "./compress/CompressionStatsCalculator";
import {DoCalc} from "./DoCalc";

/**
 * @arg {CompressionStatsCalculator} stats
 * @arg {IDValue_0} obj
 */
export function run_calc(stats,obj) {
	let calc_value=new DoCalc(stats,obj);
	let res=calc_value.get_result();
	if(!res) return [false,null];
	return [true,res];
}

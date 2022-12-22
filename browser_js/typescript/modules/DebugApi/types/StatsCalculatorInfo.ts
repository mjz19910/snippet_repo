import {CompressionStatsCalculator} from "./CompressionStatsCalculator.js";

export class StatsCalculatorInfo {
	stats_calculator=new CompressionStatsCalculator;
	compression_stats: [string,number][][]=[];
}

import {CompressionStatsCalculator} from "./CompressionStatsCalculator";
import {BaseCompression} from "./BaseCompression";

export class MulCompression extends BaseCompression {
	stats_calculator: CompressionStatsCalculator;
	compression_stats: any[];
	constructor() {
		super();
		this.stats_calculator = new CompressionStatsCalculator;
		this.compression_stats = [];
	}
	try_compress(arr: string | any[]) {
		let ret = [];
		for(let i = 0;i < arr.length;i++) {
			let item = arr[i];
			if(i + 1 < arr.length) {
				if(item === arr[i + 1]) {
					let off = 1;
					while(item === arr[i + off]) {
						off++;
					}
					if(off > 1) {
						ret.push(`${item}${off}`);
						i += off - 1;
					} else {
						ret.push(item);
					}
				} else {
					ret.push(item);
				}
			} else {
				ret.push(item);
			}
		}
		return this.compress_result(arr, ret);
	}
	try_decompress(arr: string | any[]) {
		let ret = [];
		for(let i = 0;i < arr.length;i++) {
			let item = arr[i];
			if(i + 1 < arr.length) {
				let [item_type, num_data] = [item[0], item.slice(1)];
				let parsed = parseInt(num_data);
				if(!Number.isNaN(parsed)) {
					for(let j = 0;j < parsed;j++)
						ret.push(item_type);
					continue;
				}
			}
			ret.push(arr[i]);
		}
		return this.decompress_result(arr, ret);
	}
	compress_array(arr: any) {
		let success, res;
		// await async_semaphore.inc(1);
		[success, res] = this.try_decompress(arr);
		if(success)
			arr = res;
		for(let i = 0;i < 4;i++) {
			this.stats_calculator.calc_for_stats_index(this.compression_stats, arr, i);
			let ls = this.compression_stats[i];
			if(ls.length > 0) {
				continue;
			}
			break;
		}
		// await async_semaphore.dec(1);
		[success, res] = this.try_compress(arr);
		if(success)
			return res;
		return arr;
	}
}

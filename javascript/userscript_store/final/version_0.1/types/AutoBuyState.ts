import {AverageRatio} from "./AverageRatio";
import {AsyncDelayNode} from "./AsyncDelayNode";
import {AsyncNodeRoot} from "./AsyncNodeRoot";
import {AverageRatioRoot} from "./AverageRatioRoot";

export class AutoBuyState {
	debug;
	arr: number[];
	ratio;
	compressor_stats: any[];
	arr_max_len;
	val;
	ratio_mode;
	locked_cycles;
	root_node: AsyncNodeRoot;
	is_init_complete;
	constructor(root: AsyncNodeRoot) {
		this.root_node = root;
		this.debug = false;
		this.arr = [];
		this.ratio = 0;
		this.compressor_stats = [];
		this.arr_max_len = 5 * 60;
		this.val = 1;
		this.ratio_mode = 0;
		this.locked_cycles = 0;
		this.is_init_complete = false;
		this.avg = new AverageRatioRoot;
		this.prev_atomepersecond = 0;
		this.ratio_mult = 0;
		this.div = 0;
	}
	avg: AverageRatioRoot;
	prev_atomepersecond: number;
	init(): void {
		if(window.atomepersecond === 0) {
			new AsyncDelayNode(this.root_node, this, this.init, 'not ready AutoBuyState.update').start();
			return;
		}
		this.val = window.totalAtome / window.atomepersecond;
		let rep_val = this.val / (100 * 4 * window.prestige);
		if(Number.isFinite(rep_val)) {
			for(let i = 0;i < 8;i++) {
				this.arr.push(rep_val * .75);
			}
		}
		this.prev_atomepersecond = window.atomepersecond;
		this.avg.push_ratio(['10sec', new AverageRatio(80, 80 * 6, .00, "10 seconds", [1])]);
		this.avg.push_ratio(['1min', new AverageRatio(6, 6 * 5 * 6, .65, "1 minute", [1])]);
		this.avg.push_ratio(['5min', new AverageRatio(5, 5 * 6 * 6, .15, "5 minutes", [1])]);
		this.avg.push_ratio(['30min', new AverageRatio(6, 6 * 6 * 4, .15, "30 minutes", [1])]);
		this.avg.push_ratio(['3hour', new AverageRatio(6, 6 * 4, .05, "3 hours", [1])]);
		this.is_init_complete = true;
	}
	calc_ratio() {
		if(this.avg.can_average('30min'))
			return this.avg.get_average('30min');
		if(this.avg.can_average('5min'))
			return this.avg.get_average('5min');
		if(this.avg.can_average('1min'))
			return this.avg.get_average('1min');
		if(this.avg.can_average('10sec'))
			return this.avg.get_average('10sec');
		return 0;
	}
	append_value(value: number) {
		if(!Number.isFinite(value)) {
			console.assert(false, 'value is not finite');
			debugger;
		}
		this.arr.unshift(value);
		this.avg.push(value);
		while(this.arr.length > this.arr_max_len) {
			this.arr.pop();
		}
		let new_ratio = this.calc_ratio();
		if(!Number.isFinite(new_ratio)) {
			console.assert(false, 'ratio result is not finite');
			debugger;
		}
		if(new_ratio)
			this.ratio = new_ratio;
	}
	update_ratio_mode() {
		switch(this.ratio_mode) {
			case 0:
				if(this.ratio > .4) {
					this.ratio_mode++;
					this.locked_cycles = 80 * 12;
				}
				break;
			case 1:
				if(this.ratio < .35) {
					this.ratio_mode--;
					this.locked_cycles = 80 * 3;
				}
				if(this.ratio > .60) {
					this.ratio_mode++;
					this.locked_cycles = 80 * 12;
				}
				break;
			case 2:
				if(this.ratio < .45) {
					this.ratio_mode--;
					this.locked_cycles = 80 * 3;
				}
				if(this.ratio > .85) {
					this.ratio_mode++;
					this.locked_cycles = 80 * 12;
				}
				break;
			case 3:
			default: {
				if(this.ratio < .9) {
					this.ratio_mode--;
					this.locked_cycles = 80 * 3;
				}
				if(this.ratio > 1.5) {
					let offset = this.ratio_mode - 3;
					console.log(offset);
					if(this.ratio_mode > 3)
						break;
					this.ratio_mode++;
					this.locked_cycles = 80 * 12;
				}
				break;
			}
		}
	}
	get_mul_modifier() {
		switch(this.ratio_mode) {
			case 0: return 8;
			case 1: return 4;
			case 2: return 2;
			case 3: return 1;
			default: {
				// 60*10*8/0.0002 ~= 1;
				return 0.05;
			}
		}
	}
	get_near_val() {
		let log_val = this.avg.get_average('5min');
		let log_mul_count = 0;
		if(log_val < 0.01 || log_val > 1) {
			while(log_val < 0.1) {
				log_val *= 10;
				log_mul_count--;
			}
			while(log_val > 1) {
				log_val /= 10;
				log_mul_count++;
			}
		}
		return [log_val, log_mul_count];
	}
	cycle_log() {
		let [num, exponent] = this.get_near_val();
		console.log('ratio cycle lock %se%o %s%o %s%o', (~~(num * 1000)) / 1000, exponent, 'mode=', this.ratio_mode, 'cc=', this.locked_cycles);
	}
	ratio_mult: number;
	div: number;
	update() {
		this.ratio_mult = window.prestige;
		this.div = 60 * this.ratio_mult * 8;
		if(window.atomepersecond === 0) {
			new AsyncDelayNode(this.root_node, this, this.update, 'not ready AutoBuyState.update').start();
			return;
		}
		this.val = window.totalAtome / window.atomepersecond / this.div;
		if(!Number.isFinite(this.val)) {
			console.log('fail', this.div, window.atomepersecond, window.totalAtome);
			new AsyncDelayNode(this.root_node, this, this.update, 'not ready AutoBuyState.update').start();
			return;
		}
		this.val *= this.get_mul_modifier();
		this.append_value(this.val);
		if(this.locked_cycles > 0) {
			this.locked_cycles--;
		} else {
			this.update_ratio_mode();
			if(this.locked_cycles > 0)
				this.cycle_log();
		}
	}
	reset() {
		this.ratio *= 0.75;
		for(var i = 0;i < this.arr.length;i++) {
			this.arr[i] *= 0.75;
		}
	}
}

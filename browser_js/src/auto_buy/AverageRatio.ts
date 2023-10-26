import {calc_ratio} from "./calc_ratio.ts";

export class AverageRatio {
	history: number[];
	count;
	arr;
	len;
	history_len;
	weight;
	human_duration;
	// @AverageRatio
	constructor(initial_arr: number[],max_len: number,max_history_len: number,weight: number,human_duration: string) {
		this.history=[];
		this.count=0;
		this.arr=initial_arr;
		this.len=max_len;
		this.history_len=max_history_len;
		this.weight=weight;
		this.human_duration=human_duration;
	}
	add(value: number,from_prev: boolean,debug=false) {
		if(from_prev) {
			if(debug)
				console.log("ratio add",this.human_duration,(value*100).toFixed(5));
			this.arr.unshift(value);
			this.history.unshift(value);
			if(this.history.length>this.history_len)
				this.history.pop();
			if(this.arr.length>this.len)
				this.arr.pop();
			this.count++;
			if(this.count>this.len) {
				this.count=0;
				return true;
			}
		} else {
			this.arr[0]=value;
		}
		return false;
	}
	can_average() {
		return this.arr.length>1;
	}
	get_average() {
		return calc_ratio(this.arr);
	}
}

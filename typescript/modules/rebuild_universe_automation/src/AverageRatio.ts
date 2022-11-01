import {AverageRatioRoot} from "./AverageRatioRoot.js"

export class AverageRatio {
	type: string
	history: number[]
	count: number
	value: number
	size: number
	time_diff_max: number
	time_start: any
	time_cur_start: number
	time_cur: number
	gen_count: number
	history_size: number
	// @AverageRatio
	constructor(type: string,time_diff_max: number,size: number,history_size: number,time_start: any) {
		this.type=type
		this.history=[]
		this.count=0
		this.value=0
		this.size=size
		this.time_diff_max=time_diff_max
		this.time_start=time_start
		this.time_cur_start=0
		this.time_cur=0
		this.gen_count=0
		this.history_size=history_size
	}
	do_history_update(avg: AverageRatioRoot,time_now: number) {
		if(this.value===null)
			return
		this.count++
		this.time_cur=time_now-this.time_start-this.time_cur_start
		if(this.time_cur>this.time_diff_max) {
			this.time_cur_start+=this.time_diff_max
			this.time_cur-=this.time_diff_max
			this.count=0
			this.gen_count++
			this.history.unshift(this.value)
			if(this.history.length>this.history_size)
				this.history.pop()
			let next=avg.next(this)
			if(next)
				next.do_history_update(avg,time_now)
		}
	}
	add_to_ratio(value: number,avg_window=this.size) {
		if(this.value===null) {
			this.value=value
			return
		}
		this.value=(this.value*(avg_window-1)+value)/avg_window
	}
	set_history_size(size: number) {
		this.history_size=size
	}
	get_average() {
		if(this.value===null)
			return 0
		return this.value
	}
}

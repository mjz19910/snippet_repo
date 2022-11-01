import {AverageRatio} from "./AverageRatio.js"
import {throw_invalid_error} from "./throw_invalid_error.js"

export class AverageRatioRoot {
	map: Map<string,AverageRatio>
	keys: string[]
	values: AverageRatio[]
	constructor() {
		this.map=new Map
		this.keys=[]
		this.values=[]
	}
	get_average(key: string) {
		let ratio_calc=this.map.get(key)
		if(!ratio_calc)
			throw new Error("Ratio not found: "+key)
		return ratio_calc.get_average()
	}
	set_ratio(key: string,value: AverageRatio): void {
		this.keys.push(key)
		this.values.push(value)
		this.map.set(key,value)
	}
	next(value_obj: AverageRatio) {
		let idx=this.values.indexOf(value_obj)
		if(idx<this.values.length) {
			return this.values[idx+1]
		}
		return null
	}
	push(value: number) {
		let cur=this.map.get(this.keys[0])
		if(!cur)
			throw throw_invalid_error()
		let cur_size=cur.size
		let time_now=performance.now()
		cur.do_history_update(this,time_now)
		cur.add_to_ratio(value)
		for(let i=1;i<this.keys.length;i++) {
			let key=this.keys[i]
			cur=this.map.get(key)
			if(!cur)
				throw throw_invalid_error()
			cur_size*=cur.size
			cur.add_to_ratio(value,cur_size)
		}
	}
}

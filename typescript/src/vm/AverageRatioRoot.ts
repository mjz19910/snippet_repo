import {AverageRatio} from "./AverageRatio.js"

export class AverageRatioRoot {
	map: Map<string,AverageRatio>
	ordered_keys: string[]
	constructor() {
		this.map=new Map
		this.ordered_keys=[]
	}
	set_ordered_keys(ordered_keys: string[]) {
		this.ordered_keys=ordered_keys
	}
	can_average(key: string) {
		let ratio_calc=this.map.get(key)
		if(!ratio_calc) throw new Error("1");
		return ratio_calc.can_average();
	}
	get_average(key: string) {
		let ratio_calc=this.map.get(key)
		if(ratio_calc)
			return ratio_calc.get_average()
		return 0
	}
	push_ratio([key,ratio_obj]: [key: string,ratio_obj: AverageRatio]) {
		this.ordered_keys.push(key)
		this.map.set(key,ratio_obj)
	}
	push(value: number) {
		let cur=this.map.get(this.ordered_keys[0])
		if(!cur)
			return
		let res=cur.add(value,true,false)
		for(let i=1;i<this.ordered_keys.length;i++) {
			let debug=false
			let key=this.ordered_keys[i]
			cur=this.map.get(key)
			if(!cur)
				continue
			let prev=this.map.get(this.ordered_keys[i-1])
			if(!prev)
				continue
			if(key==='30min')
				debug=true
			res=cur.add(prev.get_average(),res,debug)
		}
	}
}

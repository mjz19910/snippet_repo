export class NamedIdGenerator {
	state_map: Map<string,number>
	constructor() {
		this.state_map=new Map
	}
	current_named(name: string) {
		let val=this.state_map.get(name)
		if(val) {
			return val
		} else {
			return 0
		}
	}
	next_named(name: string) {
		if(this.state_map.has(name)) {
			let cur=this.state_map.get(name)!+1
			this.state_map.set(name,cur)
			return cur
		} else {
			this.state_map.set(name,1)
			return 1
		};
	}
}

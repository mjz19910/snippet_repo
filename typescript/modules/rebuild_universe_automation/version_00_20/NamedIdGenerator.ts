export class NamedIdGenerator {
	constructor() {
		this.state_map = new Map;
	}
	/**@arg {string} name */
	current_named(name) {
		let val = this.state_map.get(name);
		if(val) {
			return val;
		} else {
			return 0;
		}
	}
	/**@arg {string} name */
	next_named(name) {
		if(this.state_map.has(name)) {
			let cur = this.state_map.get(name) + 1;
			this.state_map.set(name, cur);
			return cur;
		} else {
			this.state_map.set(name, 1);
			return 1;
		};
	}
}

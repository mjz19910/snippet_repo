class RandomKeepArray extends Array {
	constructor() {
		super();
	}
	push(value: unknown): number {
		let set_index = 0;
		let ret = this.push_at(set_index, value);
		while(this[set_index].length > 50) {
			value = this[set_index].shift();
			if(Math.random() > 0.9) {
				set_index++;
				this.push_at(set_index, value);
				console.log('psp', 1);
				let off = 0;
				while(this[set_index - off].length < 25) {
					let val = this[set_index - off - 1].shift();
					this[set_index - off].push(val);
				}
				off++;
				if(set_index - off < 0)
					continue;
				console.log('psp', 2);
				while(this[set_index - off].length < 40) {
					let val = this[set_index - off - 1].shift();
					this[set_index - off].push(val);
				}
				off++;
				if(set_index - off < 0)
					continue;
				console.log('psp', 3);
				while(this[set_index - off].length < 40) {
					let val = this[set_index - off - 1].shift();
					this[set_index - off].push(val);
				}
				off++;
				if(set_index - off < 0)
					continue;
				console.log('psp', 4);
				while(this[set_index - off].length < 40) {
					let val = this[set_index - off - 1].shift();
					this[set_index - off].push(val);
				}
			}
			if(this[set_index].length <= 50 && set_index > 0) {
				set_index--;
			}
		}
		return ret;
	}
	push_at(index: number, value: any) {
		while(index >= this.length) {
			return super.push([]);
		}
		return this[index].push(value);
	}
	push_va(...a: any[]) {
		return this.push(a);
	}
}

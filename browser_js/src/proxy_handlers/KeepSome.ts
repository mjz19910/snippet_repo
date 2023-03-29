export class KeepSome {
	array: (number|string)[][];
	constructor() {
		this.array=[];
	}
	push(value: number|string) {
		let set_index=0;
		let ret=this.push_at(set_index,value);
		while(this.array[set_index].length>50) {
			let sr=this.array[set_index].shift();
			if(!sr)
				throw new Error("This should not happen (popped from an array with length > 50)");
			value=sr;
			if(Math.random()>0.9) {
				set_index++;
				this.push_at(set_index,value);
				console.log('psp',1);
				let off=0;
				while(this.array[set_index-off].length<25) {
					let val=this.array[set_index-off-1].shift();
					if(!val)
						break;
					this.array[set_index-off].push(val);
				}
				off++;
				if(set_index-off<0)
					continue;
				console.log('psp',2);
				while(this.array[set_index-off].length<40) {
					let val=this.array[set_index-off-1].shift();
					if(!val)
						break;
					this.array[set_index-off].push(val);
				}
				off++;
				if(set_index-off<0)
					continue;
				console.log('psp',3);
				while(this.array[set_index-off].length<40) {
					let val=this.array[set_index-off-1].shift();
					if(!val)
						break;
					this.array[set_index-off].push(val);
				}
				off++;
				if(set_index-off<0)
					continue;
				console.log('psp',4);
				while(this.array[set_index-off].length<40) {
					let val=this.array[set_index-off-1].shift();
					if(!val)
						break;
					this.array[set_index-off].push(val);
				}
			}
			if(this.array[set_index].length<=50&&set_index>0) {
				set_index--;
			}
		}
		return ret;
	}
	push_at(index: number,value: number|string) {
		while(index>=this.array.length) {
			this.array.push([]);
		}
		this.array[index].push(value);
	}
	push_va(...a: (number|string)[]) {
		for(let x of a) {
			this.push(x);
		}
	}
}

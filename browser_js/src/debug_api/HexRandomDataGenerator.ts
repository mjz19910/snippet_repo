import {NumberPart} from "./NumberPart.ts";

export class HexRandomDataGenerator {
	random_num=Math.random();
	used_bits=0;
	cur_part=new NumberPart(0,0);
	reset() {
		this.random_num=Math.random();
		this.used_bits=0;
	}
	next(bit_count: number) {
		let random_size=1<<bit_count;
		let num=~~(this.random_num*random_size);
		this.used_bits+=bit_count;
		this.random_num*=random_size;
		this.random_num-=num;
		return num;
	}
	reset_part() {
		this.cur_part.value=0;
		this.cur_part.bit_count=0;
	}
	next_part(bit_count: number) {
		let cur_num=this.next(bit_count);
		if(this.used_bits>=48) {
			console.log('before_rng_reset',this.random_num);
			this.reset();
		}
		cur_num+=this.cur_part.value*bit_count;
		bit_count+=this.cur_part.bit_count;
		this.cur_part.value=cur_num;
		this.cur_part.bit_count=bit_count;
	}
	complete() {
		return this.cur_part.value;
	}
	next_byte() {
		let size=1<<8;
		this.reset_part();
		this.next_part(4);
		this.next_part(4);
		let num=this.complete();
		return (size+num).toString(16).slice(1);
	}
}

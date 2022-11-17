import {Repeat} from "./Repeat.js";

/**@template T @template U */
export class CompressState {
	i=0;
	/** @type {T[]} */
	arr;
	/** @type {T|null} */
	item;
	/** @type {U[]} */
	ret;
	/** @param {T[]} arr */
	constructor(arr) {
		this.arr=arr;
		this.item=null;
		this.ret=[];
	}
	/**@arg {<T>(v:{t:T}|{t:U})=>v is {t:U}} cast_func */
	next(cast_func) {
		for(;this.i<this.arr.length;this.i++) {
			let item=this.arr[this.i];
			/**@template T @arg {T[]} v @returns {v is ['T', U]} */
			function to_2_unit(v) {return v.length == 2;}
			let t=item;
			let x={t};
			if(!cast_func(x)) continue;
			if(!(x.t instanceof Array)) continue;
			if(to_2_unit(x.t) && typeof x.t[1]==='string') {
				/**@type {import("./TU.js").TU<string, number>} */
				let vq=[x.t[0], x.t[1]];
				let use_item=this.compress_rle_TU_to_TX(vq,cast_func);
				if(use_item) continue;
			}
			let v={t:item};
			if(!cast_func(v)) continue;
			this.ret.push(v.t);
		}
		return this.compress_result_state();
	}
	/**
	 * @arg {import("./TU.js").TU<string, number>} item
	   @arg {<T>(v:{t:T}|{t:U})=>v is {t:U}} cast_func
	 */
	compress_rle_TU_to_TX(item,cast_func) {
		if(this.i+1>=this.arr.length&&item!==this.arr[this.i+1]) return true;
		let off=1;
		while(item===this.arr[this.i+off]) off++;
		if(off==1) return true;
		let entry=Repeat.from_TU_entry(item,off);
		let v={t:entry};
		if(!cast_func(v)) return true;
		this.ret.push(v.t);
		this.i+=off-1;
		return true;
	}
	/** @returns {[false, T[]]|[true, U[]]} */
	compress_result_state() {
		if(this.did_compress(this.arr,this.ret)) return [true,this.ret];
		return [false,this.arr];
	}
	/** @template T,U @arg {T[]} src @arg {U[]} dst */
	did_compress(src,dst) {
		return dst.length<src.length;
	}
}

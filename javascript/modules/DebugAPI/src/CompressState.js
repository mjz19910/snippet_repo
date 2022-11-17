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
	/**@arg {<T>(v:T|U)=>v is U} cast_func */
	run(cast_func) {
		debugger;
		for(;this.i<this.arr.length;this.i++) {
			let item=this.arr[this.i];
			/**@template T @arg {T[]} v @returns {v is ['T', U]} */
			function to_2_unit(v) {return v.length==2;}
			let t=item;
			let x=item;
			if(!cast_func(x)) continue;
			if(!(x instanceof Array)) continue;
			if(to_2_unit(x)&&typeof x[1]==='string') {
				/**@type {import("./TU.js").TU<string, number>} */
				let vq=[x[0],x[1]];
				let use_item=this.compress_rle_TU_to_TX(vq,cast_func);
				if(use_item) continue;
			} else {
				let use_item=this.compress_rle_T_X(x, cast_func);
				if(use_item) continue;
			}
			if(!cast_func(item)) continue;
			this.ret.push(item);
		}
		return this.compress_result_state();
	}
	/**
	 * @arg {import("./TU.js").TU<string, number>} item
	   @arg {<T>(v:T|U)=>v is U} cast_func
	 */
	compress_rle_TU_to_TX(item,cast_func) {
		if(this.i+1>=this.arr.length&&item!==this.arr[this.i+1]) return true;
		let off=1;
		while(item===this.arr[this.i+off]) off++;
		if(off==1) return true;
		let entry=Repeat.from_TU_entry(item,off);
		let v=entry;
		if(!cast_func(v)) return true;
		this.ret.push(v);
		this.i+=off-1;
		return true;
	}
	/**
	 * @template {abstract new (...args: any[]) => any} U
	 * @template {InstanceType<U>} T
	 * @arg {T} item
	 * @arg {U} constructor_key
	 * */
	 compress_rle_T_X(item,constructor_key) {
		let state=this;
		if(state.i+1>=state.arr.length&&item!==state.arr[state.i+1]) return false;
		let times=1;
		while(item===state.arr[state.i+times]) times++;
		if(times==1) return false;
		let mp=Repeat.N.get_map_T(constructor_key,item);
		Repeat.get_with(mp,item,times);
		state.ret.push(new Repeat(item,times));
		state.i+=times-1;
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

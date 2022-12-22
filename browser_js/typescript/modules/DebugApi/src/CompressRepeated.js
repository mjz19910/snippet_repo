import {Repeat_0} from "./repeat/Repeat_0";

export class CompressRepeated {
	/** @template T @param {T[]} src @param {(T|Repeat_0<T>)[]} dst */
	did_compress(src,dst) {
		return dst.length<src.length;
	}
	/** @template T @param {T[]} src @param {(T|Repeat_0<T>)[]} dst */
	did_decompress(src,dst) {
		return dst.length>src.length;
	}
	/** @param {string[]} src @param {(string|Repeat_0<string>)[]} dst @returns {[boolean, (string|Repeat_0<string>)[]]} */
	compress_result(src,dst) {
		if(this.did_compress(src,dst))
			return [true,dst];
		return [false,src];
	}
	/** @param {(string | Repeat_0<string>)[]} src @param {string[]} dst @returns {[boolean, string[]]} */
	decompress_result(src,dst) {
		if(this.did_decompress(src,dst))
			return [true,dst];
		return [false,dst];
	}
	/**
	 * @param {string | any[]} arr
	 */
	static can_compress_items(arr) {
		for(let i=0;i<arr.length;i++) {
			let item=arr[i];
			if(typeof item!=='string')
				return false;
			if(item.match(/[a-zA-Z]/)===null)
				return false;
		}
		return true;
	}
	/** @param {string[]} arr */
	try_compress(arr) {
		/**@type {(string|Repeat_0<string>)[]} */
		let ret=[];
		for(let i=0;i<arr.length;i++) {
			let item=arr[i];
			if(i+1<arr.length&&item===arr[i+1]) {
				let off=0;
				while(item===arr[i+off+1])
					off++;
				if(off>0) {
					let rep_count=off+1;
					ret.push(Repeat_0.get(item,rep_count));
					i+=off;
					continue;
				}
			}
			ret.push(item);
		}
		return this.compress_result(arr,ret);
	}
	/** @param {(string | Repeat_0<string>)[]} arr */
	try_decompress(arr) {
		/**@type {string[]} */
		let ret=[];
		for(let i=0;i<arr.length;i++) {
			let item=arr[i];
			if(!item)
				continue;
			if(item instanceof Repeat_0) {
				let {value,times}=item;
				for(let j=0;j<times;j++)
					ret.push(value);
				continue;
			}
			ret.push(item);
		}
		return this.decompress_result(arr,ret);
	}
	/** @param {string[]} arr */
	compress_array(arr) {
		let success,res;
		[success,res]=this.try_decompress(arr);
		if(success)
			arr=res;
		{
			let [success,res]=this.try_compress(arr);
			this.try_decompress(res);
			if(success)
				return res;
		}
		return arr;
	}
}

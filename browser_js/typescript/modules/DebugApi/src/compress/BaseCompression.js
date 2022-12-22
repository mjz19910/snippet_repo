import {CompressStateBase} from "./CompressStateBase.js";

export class BaseCompression {
	/** @template T,U @arg {T[]} src @arg {U[]} dst */
	static did_compress(src,dst) {
		return dst.length<src.length;
	}
	/** @template T @arg {T[]} src @arg {T[]} dst */
	did_decompress(src,dst) {
		return dst.length>src.length;
	}
	/**@template T,U @arg {CompressStateBase<T, U>} state */
	static compress_result_state(state) {
		return this.compress_result(state.arr, state.ret);
	}
	/** @template T,U @arg {T[]} src @arg {U[]} dst @returns {[true, U[]] | [false, T[]]} */
	static compress_result(src,dst) {
		if(this.did_compress(src,dst))
			return [true,dst];
		return [false,src];
	}
	/** @arg {string[]} src @arg {string[]} dst @returns {[res: boolean,dst: string[]]} */
	decompress_result(src,dst) {
		// maybe this is not a decompression, just a modification to make
		// later decompression work
		if(this.did_decompress(src,dst))
			return [true,dst];
		return [false,dst];
	}
}

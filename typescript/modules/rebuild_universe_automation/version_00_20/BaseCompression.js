export class BaseCompression {
	/**
	 * @param {string | any[]} src
	 * @param {string | any[]} dst
	 */
	did_compress(src, dst) {
		return dst.length < src.length;
	}
	/**
	 * @param {string | any[]} src
	 * @param {string | any[]} dst
	 */
	did_decompress(src, dst) {
		return dst.length > src.length;
	}
	/**
	 * @param {string[]} src
	 * @param {string[]} dst
	 * @returns {[boolean, string[]]}
	 */
	compress_result(src, dst) {
		if(this.did_compress(src, dst))
			return [true, dst];
		return [false, src];
	}
	/**
	 * @param {string[]} src
	 * @param {string[]} dst
	 * @returns {[boolean, string[]]}
	 */
	decompress_result(src, dst) {
		// maybe this is not a decompression, just a modification to make
		// later decompression work
		if(this.did_decompress(src, dst))
			return [true, dst];
		return [false, dst];
	}
}

export class BaseCompression {
	did_compress(src: string | any[], dst: string | any[]) {
		return dst.length < src.length;
	}
	did_decompress(src: string | any[], dst: string | any[]) {
		return dst.length > src.length;
	}
	compress_result(src: any, dst: any[]) {
		if(this.did_compress(src, dst))
			return [true, dst];
		return [false, src];
	}
	decompress_result(src: any, dst: any[]) {
		// maybe this is not a decompression, just a modification to make
		// later decompression work
		if(this.did_decompress(src, dst))
			return [true, dst];
		return [false, dst];
	}
}

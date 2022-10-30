export class BaseCompression {
	did_compress(src: string|any[],dst: string|any[]) {
		return dst.length<src.length
	}
	did_decompress(src: string|any[],dst: string|any[]) {
		return dst.length>src.length
	}
	compress_result(src: string[],dst: string[]): [boolean,string[]] {
		if(this.did_compress(src,dst))
			return [true,dst]
		return [false,src]
	}
	decompress_result(src: string[],dst: string[]): [boolean,string[]] {
		// maybe this is not a decompression, just a modification to make
		// later decompression work
		if(this.did_decompress(src,dst))
			return [true,dst]
		return [false,dst]
	}
}

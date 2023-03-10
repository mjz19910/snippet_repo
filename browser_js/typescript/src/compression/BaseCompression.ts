import {CompressDual} from "../../modules/DebugApi/types/CompressDual";
import {DualR} from "../../modules/DebugApi/types/DualR";

export class BaseCompression {
	did_compress(src: string[],dst: string[]) {
		return dst.length<src.length;
	}
	did_decompress(src: string[],dst: string[]) {
		return dst.length>src.length;
	}
	compress_result(src: string[],dst: string[]) {
		if(this.did_compress(src,dst))
			return [true,dst];
		return [false,src];
	}
	decompress_result(src: string[],dst: string[]): [res: boolean,dst: string[]] {
		// maybe this is not a decompression, just a modification to make
		// later decompression work
		if(this.did_decompress(src,dst))
			return [true,dst];
		return [false,dst];
	}
	compress_result_state_dual(dual: CompressDual): DualR {dual; return {};}
}

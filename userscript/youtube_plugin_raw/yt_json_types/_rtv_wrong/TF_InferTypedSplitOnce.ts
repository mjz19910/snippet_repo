import {never_return} from "../ghi/dnp_wrong/never_return.js";
import {TF_InferredSplitOnce_NB_2} from "./TF_InferredSplitOnce_NB_2.js";
import {T_SplitOnce_NB_1} from "./T_SplitOnce_NB_1.js";

export function TF_InferTypedSplitOnce<
	WA extends string,S extends string,D extends string
>(WA: WA,S: S,_D: D) {
	function chk(_a: any,_b: string) {
		return true;
	}
	function chk_w(_a: any,_b: WA|"") {
		return true;
	}
	function get_parts_0<D extends string,I extends S extends `${infer Begin}${D}${string}`? Begin:never>(_a: S,d:D):I {
		return _a.split(d)[0] as I;
	}
	function get_parts_1<D extends string,I extends S extends `${string}${D}${infer Rest}`? Rest:never>(_a: S,d:D):I {
		return _a.split(d)[1] as I;
	}
	// S extends `${infer Begin}${D}${infer Rest}`
	if(chk(S,"`${infer Begin}${D}${infer Rest}`")) {
		// ?
		let Begin=get_parts_0(S,_D);
		let Rest=get_parts_1(S,_D);
		// Rest extends ""
		if(chk_w(Rest,"")) {
			// ?
			// T_InferredSplitOnce_NB_1<WA,Begin>
			return T_SplitOnce_NB_1(WA,Begin);
		}
		// :
		// Begin extends `${WA}`
		if(chk_w(Begin,WA)) {
			// ?
			return [WA,Rest] as const;
		}
		// :
		// Begin extends ""
		if(Begin==="") {
			// ?
			// T_InferredSplitOnce_NB_2<WA,S,D>
			return TF_InferredSplitOnce_NB_2(WA,S,_D);
		}
		// :
		// Rest extends `${WA}`
		if(chk_w(Rest,WA)) {
			// ?
			// [Begin,WA]
			return [Begin,WA] as const;
		}
		// :
		// never
		return never_return();
	}
	// :
	// [S]
	return [S] as const;
}

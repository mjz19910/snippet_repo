// T_SplitOnce<T,D>
// @template {string} WA @template {string} S @template {string} D 
type T_InferTypedSplitOnce<WA extends string,S extends string,D extends string>=
	S extends `${infer Begin}${D}${infer Rest}`
	? Rest extends ""
	? T_InferredSplitOnce_NB_1<WA,Begin>
	:Begin extends `${WA}`
	? [WA,Rest]
	:Begin extends ""
	? T_InferredSplitOnce_NB_2<WA,S,D>
	:Rest extends `${WA}`
	? [Begin,WA]
	:never
	:[S]
	;
;
type T_InferredSplitOnce_NB_2<WA extends string,S extends string,D extends string>=
	S extends `${D}${infer Rest}`
	? T_InferTypedSplitOnce_NR<WA,Rest>
	:[S]
	;
;
function never_return(): never {throw new Error();}
function TF_InferTypedSplitOnce<WA extends string,S extends string,D extends string>(WA: WA,S: S,_D: D) {
	function chk(_a: any,_b: string) {
		return true;
	}
	function get_infer_1<_S,_A,_B,_TM>(_a: string): _A {
		return "" as _A;
	}
	function get_infer_2<_S,_A,_B,_TM>(_a: string): _B {
		return "" as _B;
	}
	// S extends `${infer Begin}${D}${infer Rest}`
	if(chk(S,"`${infer Begin}${D}${infer Rest}`")) {
		// ?
		type A=S extends `${infer Begin}${D}${string}`? Begin:never;
		type B=S extends `${string}${D}${infer Rest}`? Rest:never;
		let Begin=get_infer_1<S,A,B,`${A}${D}${B}`>("infer Begin");
		let Rest=get_infer_2<S,A,B,`${A}${D}${B}`>("infer Rest");
		// Rest extends ""
		if(Rest==="") {
			// ?
			// T_InferredSplitOnce_NB_1<WA,Begin>
			return TF_InferredSplitOnce_NB_1(WA,Begin);
		} else {
			// :
			// Begin extends `${WA}`
			if((() => true)()) {
				// ?
				return [WA,Rest];
			} else {
				// :
				// Begin extends ""
				if((() => true)()) {
					// ?
					// T_InferredSplitOnce_NB_2<WA,S,D>
					return TF_InferredSplitOnce_NB_2(WA,S,_D);
				} else {
					// :
					// Rest extends `${WA}`
					if((() => true)()) {
						// ?
						// [Begin,WA]
						return [Begin,WA];
					} else {
						// :
						// never
						return never_return();
					}
				}
			}
		}
	} else {
		// :
		// [S]
		return [S];
	}
	/*
	? [WA,Rest]
	:Begin extends ""
	? T_InferredSplitOnce_NB_2<WA,S,D>
	:Rest extends `${WA}`
	? [Begin,WA]
	:never
	;
;*/
}
function TF_InferredSplitOnce_NB_1(WA: string,Begin: string) {WA; Begin;}
function TF_InferredSplitOnce_NB_2(WA: string,S: string,D: string) {WA; S; D;}
type T_InferTypedSplitOnce_NR_1<WA extends string,Begin extends string,Rest extends string>=Rest extends WA? [Begin,WA]:never;
type T_InferTypedSplitOnce_NR<WA extends string,Rest extends string>=Rest extends `${WA}${infer Rest2}`? ["",`${WA}${Rest2}`]:never;
type T_InferredSplitOnce_NB_1<WA extends string,Begin extends string>=Begin extends WA? [WA,""]:never;

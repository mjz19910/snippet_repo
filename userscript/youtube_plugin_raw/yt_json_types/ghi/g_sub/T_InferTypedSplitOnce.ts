// T_SplitOnce<T,D>
// @template {string} WA @template {string} S @template {string} D 
type T_InferTypedSplitOnce<WA extends string,S extends string,D extends string>=
	S extends `${infer Begin}${D}${infer Rest}`
	? Rest extends ""
	? T_SplitOnce_NB_1<WA,Begin>
	:Begin extends `${WA}`
	? [WA,Rest]
	:Begin extends ""
	? T_SplitOnce_NB_2<WA,S,D>
	:Rest extends `${WA}`
	? [Begin,WA]
	:never
	:[S]
	;
;
function never_return(): never {throw new Error();}
function TF_InferTypedSplitOnce<WA extends string,S extends string,D extends string,PT extends S extends `${infer Begin}${D}${infer Rest}`? [Begin,Rest]:never>(WA: WA,S: S,_D: D,PT: PT) {
	function chk(_a: any,_b: string) {
		return true;
	}
	function chk_w(_a: any,_b: WA|"") {
		return true;
	}
	// S extends `${infer Begin}${D}${infer Rest}`
	if(chk(S,"`${infer Begin}${D}${infer Rest}`")) {
		// ?
		let Begin=PT[0];
		let Rest=PT[1];
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
function T_SplitOnce_NB_1(WA: string,Begin: string) {WA; Begin;}
function TF_InferredSplitOnce_NB_2(WA: string,S: string,D: string) {WA; S; D;}
type T_SplitOnce_NR_1<WA extends string,Begin extends string,Rest extends string>=Rest extends WA? [Begin,WA]:never;
type T_SplitOnce_NB_1<WA extends string,Begin extends string>=Begin extends WA? [WA,""]:never;
type T_SplitOnce_NB_2<WA extends string,S extends string,D extends string>=S extends `${D}${infer Rest}`? T_SplitOnce_NR_2<WA,Rest>:[S];
type T_SplitOnce_NR_2<WA extends string,Rest extends string>=Rest extends `${WA}${infer Rest2}`? ["",`${WA}${Rest2}`]:never;

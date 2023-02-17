function TF_InferTypedSplitOnce<
	WA extends string,S extends string,D extends string,
	PT extends S extends `${infer Begin}${D}${infer Rest}`? [Begin,Rest]:never
>(WA: WA,S: S,_D: D,PT: PT) {
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

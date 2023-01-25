async function D_Watch$Test$playlistId(): Promise<void> {
	function str_starts_with<T_Needle extends string,T_Str extends string>(needle: T_Needle,str: T_Str): str is Extract<T_Str,`${T_Needle}${string}`> {
		return str.startsWith(needle);
	}
	function dc<M extends string>() {
		return async <T extends string>(a: T,s: (T extends infer V? V extends `${M}${string}`? M:never:never)) => ((await import("../../support/make/assert_is_equal_t.js")).assert_is_equal<`${typeof s}${string}`>(a),1)&&!str_starts_with(s,a)? a as any as Exclude<T,`${M}${string}`>:Promise.reject([a,1]);
	}
	{
		type UU=PlaylistId;
		let xa: UU="LL" as UU;
		type sw=T_SplitIntoGroups<UU,`${string}`>;
		{
			type uw=sw[0];
			let v: uw=xa.slice(0,2) as uw;
			switch(v) {
				case "LL": break;
				case "PL": console.log("some_more",xa.slice(2,4)); break;
				case "RD": console.log("some_more",xa.slice(2,4)); break;
				case "WL": break;
				default: v===""; debugger; console.log("some",v); console.log("all",xa); break;
			}
		}
		if(xa.length>2) {
			type uw=Extract<sw,[any,any,...any]>[1];
			let v: uw=xa.slice(2,4) as uw;
			switch(v) {
				case "GM":
				case "MM": console.log("some_more",xa.slice(4,6)); break;
				default: v===""; debugger; console.log("some",v); console.log("all",xa); break;
			}
		}
		let r=await dc<"RDGM">()(xa,"RDGM");
		let r2=await dc<"RDMM">()(r,"RDMM");
		let r3=await dc<"RD">()(r2,"RD");
		let r4=await dc<"PL">()(r3,"PL");
		switch(r4) {
			case "LL": break;
			case "WL": break;
			default: r4===""; debugger; break;
		}
	}
}
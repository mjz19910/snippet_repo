export namespace Test {
	export async function D_Watch_Test_PlaylistId(): Promise<void> {
		const assert_is_equal=(await import("../support_1/make/assert_is_equal_t.js")).assert_is_equal;
		function str_starts_with<T_Needle extends string,T_Str extends string>(needle: T_Needle,str: T_Str): str is Extract<T_Str,`${T_Needle}${string}`> {
			return str.startsWith(needle);
		}
		let ExcludePrefix_Impl=async <M extends string,T extends string>(a: T,s: T extends infer V? V extends `${M}${string}`? M:never:never) => {
			assert_is_equal<`${typeof s}${string}`>(a);
			if(str_starts_with(s,a)) throw new AggregateError([[a,1]]);
			return a as any as Exclude<T,`${M}${string}`>;
		};
		function ExcludePrefix<M extends string>() {
			return async <T extends string>(a: T,s: T extends infer V? V extends `${M}${string}`? M:never:never) => {
				return ExcludePrefix_Impl<M,T>(a,s);
			};
		}
		{
			type UU=D_PlaylistId;
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
			let r=await ExcludePrefix<"RDGM">()(xa,"RDGM");
			let r2=await ExcludePrefix<"RDMM">()(r,"RDMM");
			let r3=await ExcludePrefix<"RD">()(r2,"RD");
			let r4=await ExcludePrefix<"PL">()(r3,"PL");
			switch(r4) {
				case "LL": break;
				case "WL": break;
				default: r4===""; debugger; break;
			}
		}
	}
}

export async function run_tests() {
	await Test.D_Watch_Test_PlaylistId();
}

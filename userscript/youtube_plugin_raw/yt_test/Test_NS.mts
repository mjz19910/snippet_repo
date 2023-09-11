import {DU_Playlist_Id} from "../yt_json_types/d/group_D.js";
import {T_SplitIntoGroups} from "../yt_json_types/stu/group_T.js";

export namespace Test {
	export async function D_PlaylistId(): Promise<void> {
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
			type UU=DU_Playlist_Id;
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
					case "UU": break;
					default: v===""; debugger; console.log("some",v); console.log("all",xa); break;
				}
			}
			if(xa.length>2) {
				type uw=Extract<sw,[any,any,...any]>[1];
				let v: uw=xa.slice(2,4) as uw;
				switch(v) {
					case "GM":
					case "CM":
					case "MM": console.log("some_more",xa.slice(4,6)); break;
					default: v===""; debugger; console.log("some",v); console.log("all",xa); break;
				}
			}
			let sd_playlist_id=xa;
			let no_prefix_RDCMUC=await ExcludePrefix<"RDCMUC">()(sd_playlist_id,"RDCMUC");
			let no_prefix_RDGM=await ExcludePrefix<"RDGM">()(no_prefix_RDCMUC,"RDGM");
			let no_prefix_RDMM=await ExcludePrefix<"RDMM">()(no_prefix_RDGM,"RDMM");
			let no_prefix_RD=await ExcludePrefix<"RD">()(no_prefix_RDMM,"RD");
			let no_prefix_PL=await ExcludePrefix<"PL">()(no_prefix_RD,"PL");
			let no_prefix_UU=await ExcludePrefix<"UU">()(no_prefix_PL,"UU");
			switch(no_prefix_UU) {
				case "LL": break;
				case "WL": break;
				default: no_prefix_UU===""; debugger; break;
			}
		}
	}
}
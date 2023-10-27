// deno-lint-ignore-file
export type Join<T extends string[],D extends string=",">=NS_MakeJoin.JoinNonspecificStringArray<T,NS_MakeJoin.JoinInferParts_2<T,D>>;

export namespace NS_MakeJoin {
	export type JoinInferParts_2<T extends string[],D extends string>=T extends [infer U extends string,infer V extends string,...infer R extends string[]]? JoinHandleEmptyJoinResult_Len2<U,V,D,R>:JoinInferParts<T,D>;
	export type JoinNonspecificStringArray<T,U>=T extends []? "":string[] extends T? string:U;
	type JoinHandleEmptyJoinResult_Len2<U extends string,V extends string,D extends string,R extends string[]>=Join<R,D> extends ""? `${U}${D}${V}`:Join<R,D> extends string? `${U}${D}${V}${D}${Join<R,D>}`:`${U}${D}${V}`;
	type JoinHandleEmptyJoinResult<U extends string,D extends string,R extends string[]>=Join<R,D> extends ""? U:JoinInferRecursive<U,D,R>;
	type JoinInferParts<T extends string[],D extends string>=T extends [infer U extends string,...infer R extends string[]]? JoinHandleEmptyJoinResult<U,D,R>:T[0];
	type JoinInferRecursive<U extends string,D extends string,R extends string[]>=Join<R,D> extends string? `${U}${D}${Join<R,D>}`:U;
	export function t1() {
		type J1=["T",""];
		type J1_R="T,";
		type J2=["T","R"];
		type J2_R="T,R";
		type DT<T extends E,E,_R extends E=T>=T&E;
		let use_all_types: [
			J1,
			NS_Outer.Join<J1,",">,
			Join<J1,",">,
			J1_R,
			DT<NS_Outer.Join<J2>,J2_R>,
			DT<Join<J2>,J2_R>,
		][];
		use_all_types=[];
		use_all_types;
	}
}
export namespace NS_Outer {export type Join<T extends string[],U extends string=",">=NS_Outer_2.Join1<T,U>;}
export namespace NS_Outer_2 {export type Join1<T extends string[],U extends string=",">=Join<T,U>;}

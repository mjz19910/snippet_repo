type DST_Browse_MP={
	z: [DI_BrowseId_MP];
}&DST_T_abz<"browse_id:MP">;
type DST_T_abz_j<J,X>={
	key: `boxed_id:browse_id:MP:${string}`;
	a: "ST:D"; b: "boxed_id"; j: J; w: "/key/a/b/j/w/z"; z: [X];
};
type DST_T_abz<T>=DST_T_abz_j<T,any>;
type OneKey<K extends string,V=any>={
	[P in K]: (Record<P,V>&Partial<Record<Exclude<K,P>,never>>) extends infer O? Decay<O>:never;
}[K];
type GW2<T>=T extends {z: [T_DI_FromObj<infer J extends {[U in string]: any}>];}? keyof J:never;
type GW1<T,K extends string>=T extends {z: [T_DI_FromObj<{[U in K]: infer W;}>];}? W:never;
type UB_Prim<T extends {z: [any];} extends {z: [T_DI_FromObj<{[U in string]: any}>];}? {}:never>=T extends {z: [T_DI_FromObj<infer A>];}? A[keyof A]:never;
type ip=UB_Prim<DI_Key_StartRadio>;
type UB_Obj<T>=T extends {z: [infer A];}? A:never;
type UB_obj2<T extends T_DI_FromObj<any>>=T extends T_DI_FromObj<infer A extends {}>? A:never;
type Ub1=UB_Obj<DI_Key_StartRadio>;
type ub_obj=UB_obj2<Ub1>;
type G1_test1=GW2<DI_Key_StartRadio>;
type CQ=T_DI_FromObj<{
	start_radio: 0|1;
	id: "test";
}>;
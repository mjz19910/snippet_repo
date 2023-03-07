type T_DI_A_WithId<K,B=string,C=string,Z1=DIT_Item_AB<string,any>>={b: B; c: C; z: [Z1,T_DI_FromObj<{id: K;}>];};
type DMK_DST_ABJWZ<DI extends T_DI_A_WithId<string>,K extends string=DI extends T_DI_A_WithId<infer J>? J:never,J1 extends string=DI["b"],J2 extends string=DI['c']>={
	key: `boxed_id:${J1}:${J2}:${K}`;
	a: "ST:D"; b: "boxed_id"; j: `${DI['b']}:${DI['c']}`; w: "/key/a/b/j/w/z"; z: [DI];
};
type DST_ST_D_Test1=DMK_DST_ABJWZ<DI_A_ChannelId_UC>;

namespace __TestNamespace {
	const DST_Src: DST_ST_D_Test1={} as DST_ST_D_Test1;
	const DST_Res: DST_Channel_UC=DST_Src;
	DST_Res;
}

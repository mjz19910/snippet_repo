type T_DI_A_WithId<K>={b: string; c: string; z: [any,T_DI_FromObj<{id: K;}>];};
type DST_MK_ST_D<DI extends T_DI_A_WithId<any>,K extends string=DI extends T_DI_A_WithId<infer J>? J:never,J1 extends string=DI["b"],J2 extends string=DI['c']>={
	key: `boxed_id:${J1}:${J2}:${K}`;
	a: "ST:D"; b: "boxed_id"; j: `${DI['b']}:${DI['c']}`; w: "/key/a/b/j/w/z"; z: [DI];
};
type DST_ST_D_Test1=DST_MK_ST_D<DI_A_ChannelId_UC>;

namespace __TestNamespace {
	const DST_Src: DST_ST_D_Test1={} as DST_ST_D_Test1;
	const DST_Res: DST_Channel_UC=DST_Src;
	DST_Res;
}

type T_DI_A_WithId<K,B=string,C=string,Z1=DI_T_KV_Z<string,any>>={b: B; c: C; z: [Z1,T_DI_FromObj<{id: K;}>];};
type DST_ST_D_Test1=DMK_DST_ABJWZ<DI_A_ChannelId_UC>;

namespace __TestNamespace {
	const DST_Src: DST_ST_D_Test1={} as DST_ST_D_Test1;
	const DST_Res: DST_Channel_UC=DST_Src;
	DST_Res;
}

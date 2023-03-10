type T_SRC_AKLM<K,L,M,V>={
	k: K; l: L; m: M;
	z: [any,T_DI_FromObj<{
		id: V;
	}>];
};

type T_DST_AKLM<K extends string,L extends string,M extends string,T extends T_SRC_AKLM<K,L,M,V>,V extends string=TZ_SuccessorX2<T['z'][1]>>={
	key: `boxed_id:${K}:${L}:${M}:${V}`;
	a: DST_KStr_AKLMZ; k: K; l: L; m: M; z: [T];
};

type T_DST_AKLM_Params<K,L,M,T extends T_SRC_AKLM<K,L,M,V>,V=TZ_SuccessorX2<T['z'][1]>>={
	a: DST_KStr_AKLMZ; k: K; l: L; m: M; z: [T];
};

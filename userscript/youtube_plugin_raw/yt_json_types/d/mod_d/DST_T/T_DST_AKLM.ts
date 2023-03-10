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
type T_DST_AKL<K extends string,L extends string,T,V extends string>={
	key: `boxed_id:${K}:${L}:${V}`;
	a: "/db/key/a/k/l/m/z";
	k: "boxed_id";
	l: K;
	m: L;
	z: [T];
};
type DST_Browse_FE=T_DST_AKL<"browse_id","FE",DI_BrowseId_FE,D_BrowseEndpointPages>;

type RetPromise_put_boxed_url_info<T>={
	args: T;
	promise: Promise<RetAwaited_boxed_url_info>;
};
type RetAwaited_boxed_url_info=DST_Playlist_PL|DST_Video_Id|DST_HashtagId|DST_Key_StartRadio|null;
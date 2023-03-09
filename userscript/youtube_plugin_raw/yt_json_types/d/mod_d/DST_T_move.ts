type DST_KStr_ABLMZ="/db/key/a/b/l/m/z";

type DST_KStr_ABLZ="/db/key/a/b/l/z";

//#region DST_MakeLM
type DST_MoveRegion1_Src="DST_MakeLM:Src"|DST_MoveRegion1_Dst;
type DST_MakeLM<L extends string,M extends string,ZV extends Primitive,T extends DI_T_KV_Z<L,TMK_SuccessorX2<ZV>>=DI_T_KV_Z<L,TMK_SuccessorX2<ZV>>>={
	key: `boxed_id:${L}:${M}:${ZV}`;
	a: DST_KStr_ABLMZ;
	b: "boxed_id";
	l: L;
	m: M;
	z: [T];
};
type DST_MakeLM_2<T extends DI_T_KV_Z<string,TMK_SuccessorX2<V>>,L,M,V extends Primitive>={
	key: `boxed_id:${T["k"]}:${TZ_SuccessorX3<T>}`;
	a: DST_KStr_ABLMZ;
	b: "boxed_id";
	l: L;
	m: M;
	z: [T];
};
type DST_MakeLM_3<T extends DI_T_KV_Z<string,TMK_SuccessorX2<V>>,L extends string,M extends string,V extends Primitive>={
	key: `boxed_id:${L}:${M}:${V}`;
	a: DST_KStr_ABLMZ;
	b: "boxed_id";
	l: L;
	m: M;
	z: [T];
};
//#endregion
type DST_T_ABLZ_FromDI<T extends Y_DI_Shape>=DST_T_ABLZ<T["k"],TZ_SuccessorX3<T>,T>;

type DST_T_ABLZ<L extends string,V extends string=string,T extends DI_T_KV_Z<string,any>=DI_T_KV_Z<string,any>>={
	key: `boxed_id:${L}:${V}`;
	a: DST_KStr_ABLMZ;
	b: "boxed_id";
	l: L;
	z: [T];
};

type DST_HashtagId=DST_T_ABLZ<"hashtag_id",string,DI_A_HashtagId>;
type DST_Browse_MP=DST_T_ABLZ<"browse_id:MP",string,DI_BrowseId_MP>;
type DST_Channel_UC={
	key: `boxed_id:channel_id:UC:${string}`;
	a: DST_KStr_ABLMZ;
	b: "boxed_id";
	l: "channel_id:UC";
	z: [DI_A_ChannelId_UC];
};
type DST_Video_Id={
	key: `boxed_id:video_id:${string}`;
	a: DST_KStr_ABLMZ;
	b: "boxed_id";
	l: "video_id";
	z: [DI_A_VideoId];
};

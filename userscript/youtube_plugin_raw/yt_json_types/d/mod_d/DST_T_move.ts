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
type DST_MakeLM_FromObj<T extends DI_T_KV_Z<string,TMK_SuccessorX2<V>>,L,M extends string,V>={
	key: [M,TZ_SuccessorX3<T>] extends infer J extends [Primitive,Primitive]? `boxed_id:${T["k"]}:${J[0]}:${J[1]}`:`boxed_id:${T["k"]}:${M}`;
	a: DST_KStr_ABLMZ;
	b: "boxed_id";
	l: L;
	m: M;
	z: [T];
	debug?: [T_DI_FromObjEx<{
		m: M;
		v: TZ_SuccessorX3<T>;
	}>];
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
	a: DST_KStr_ABLZ;
	b: "boxed_id";
	l: L;
	z: [T];
};

type DI_A_HashtagId=T_DI_FromObj2<{
	hashtag_id: T_DI_FromObj<{
		raw_id: string;
	}>;
}>;

type DST_HashtagId=DST_T_ABLZ<"hashtag_id",string,DI_A_HashtagId>;
type CV_ABC_KV<T extends {b: string; c: string; z: [any,...any];}>=DI_T_KV_Z<`${T["b"]}:${T['c']}`,TZ_Successor<T>>;
type DST_MakeLM_From_BC<
	T extends {
		b: string; c: string;
		z: [T_DI_FromObj<{[K in T_KeyName]: T_RawId}>,...any];
	},
	V extends Primitive,L extends T["b"]=T["b"],M extends T["c"]=T["c"],T_KeyName extends PropertyKey=keyof T_GP_FromObj<T['z'][0]>,T_RawId=T_GP_FromObj<T['z'][0]>[T_KeyName]
>={
	key: `boxed_id:${L}:${M}:${V}`;
	a: DST_KStr_ABLMZ;
	b: "boxed_id";
	l: L;
	m: M;
	z: [T];
};
type DST_Browse_MP=DST_MakeLM_From_BC<DI_BrowseId_MP,string>;
type DST_Channel_UC={
	key: `boxed_id:channel_id:UC:${string}`;
	a: DST_KStr_ABLMZ;
	b: "boxed_id";
	l: "channel_id";
	m: "UC";
	z: [DI_A_ChannelId_UC];
};
type DST_Video_Id={
	key: `boxed_id:video_id:${string}`;
	a: DST_KStr_ABLZ;
	b: "boxed_id";
	l: "video_id";
	z: [DI_A_VideoId];
};

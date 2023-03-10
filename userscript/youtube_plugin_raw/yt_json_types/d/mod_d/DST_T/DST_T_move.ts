//#region KStr
type DST_KStr_AK_LMN_Z=`/di/a/k/l/m/n/z`;
type DST_KStr_AKLMZ=`/di/a/k/l/m/z`;
type DST_KStr_ABKZ=`/di/a/b/k/z`;
//#endregion
//#region ABDZ
// ~ SI = StorableItem
type DSI_T_Item_ABD2<T_Type extends string,T_Tag2 extends string,T>={
	key: `boxed_id:${T_Type}:${T_Tag2}`;
	a: DST_KStr_ABKZ; b: "boxed_id"; l: T_Type; z: [T];
};

//#endregion


//#region DST_MakeLM (ABLMZ)
type DST_MoveRegion1_Src="DST_MakeLM:Src"|DST_MoveRegion1_Dst;
type DST_MakeLM_FromObjR<T extends TMK_SuccessorX3<V>&{k: string;},L,M extends G_Primitives,V extends G_Primitives>={
	key: `boxed_id:${T['k']}:${M}:${V}`;
	a: DST_KStr_AKLMZ;
	b: "boxed_id";
	l: L;
	m: M;
	z: [T];
	_info_arr?: [TZ_SuccessorX3<T>];
};
type DST_Make_FromObj_K<T extends {k: any; z: [{k: string; z: [V];}];},V extends G_Primitives=TZ_Successor<T>['z'][0]>={
	key: `boxed_id:${T['k']}:${V}`;
	a: DStr_DI_AKZ;
	b: "boxed_id";
	z: [T];
};
type DST_Make_FromObj_KL<T extends {k: any; z: [{z: [any]; k: any;}];},L extends G_Primitives=TZ_Successor<T>["k"],V extends G_Primitives=G_Primitives>={
	key: `boxed_id:${T['k']}:${L}:${V}`;
	a: DST_KStr_AKLMZ;
	b: "boxed_id";
	l: L;
	z: [T];
};
type DST_MakeLM_FromObj<T extends {k: any; z: [{z: [any]; k: any;}];},L="key",M=TZ_Successor<T>["k"],V=G_Primitives>={
	key: `boxed_id:${T['k']}:${M&string}:${V&string}`;
	a: DST_KStr_AKLMZ;
	b: "boxed_id";
	l: L;
	m: M;
	z: [T];
	_info_arr?: [TZ_SuccessorX3<T>];
};
//#endregion
type DST_T_ABLZ_FromDI<T extends KV_T_AKZ<string,any>>=T_DI_ToObj2<T> extends {[U in infer R extends string]: any;}? T_DI_ToObj2<T_DI_ToObj2<T>[keyof T_DI_ToObj2<T>]> extends infer J extends {raw_id: string;}? DST_T_ABLZ<R,J["raw_id"],T>:never:never;

type DX_RawId<T>={
	a: DStr_DI_AKZ;
	k: "raw_id";
	z: [T];
};

type DI_A_HashtagId={
	a: DStr_DI_AKZ;
	k: "hashtag_id";
	z: [DX_RawId<string>];
};

type DST_HashtagId=DST_T_ABLZ<"hashtag_id",string,DI_A_HashtagId>;
type DST_MakeLM_From_BC<
	T extends {
		k: string;
		l: string;
		z: [T_DI_FromObj2<{[K in T_KeyName]: T_RawId}>,...any];
	},
	V extends G_Primitives,L extends T["k"]=T["k"],M extends T["l"]=T["l"],T_KeyName extends PropertyKey=keyof T_GP_FromObj<T['z'][0]>,T_RawId=T_GP_FromObj<T['z'][0]>[T_KeyName]
>={
	key: `boxed_id:${L}:${M}:${V}`;
	a: DST_KStr_AKLMZ;
	b: "boxed_id";
	l: L;
	m: M;
	z: [T];
};
type DST_Browse_MP=DST_MakeLM_From_BC<DI_BrowseId_MP,string>;
type DST_Channel_UC={
	key: `boxed_id:channel_id:UC:${string}`;
	a: DST_KStr_AKLMZ;
	b: "boxed_id";
	l: "channel_id";
	m: "UC";
	z: [DI_A_ChannelId_UC];
};
type DST_Video_Id={
	key: `boxed_id:video_id:${string}`;
	a: DST_KStr_ABKZ;
	b: "boxed_id";
	k: "video_id";
	z: [DI_A_VideoId];
};

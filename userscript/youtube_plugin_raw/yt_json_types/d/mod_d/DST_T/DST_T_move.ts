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
	z: [T];
};
type DST_Make_FromObj_KL<T extends {k: any; z: [{z: [any]; k: any;}];},L extends G_Primitives=TZ_Successor<T>["k"],V extends G_Primitives=G_Primitives>={
	key: `boxed_id:${T['k']}:${L}:${V}`;
	z: [T];
};
type DST_MakeLM_FromObj<T extends {k: any; z: [{z: [any]; k: any;}];},M=TZ_Successor<T>["k"],V=G_Primitives>={
	key: `boxed_id:${T['k']}:${M&string}:${V&string}`;
	z: [T];
};
//#endregion

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
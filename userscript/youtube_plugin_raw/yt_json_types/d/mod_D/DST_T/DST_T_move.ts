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
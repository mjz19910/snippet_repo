import {DStr_DI_AKZ} from "../DI_T/DI_T_move.ts";
import {DST_MoveRegion1_Dst} from "./DST_MakeLM.ts";

//#region KStr
export type DST_KStr_AK_LMN_Z=`/di/a/k/l/m/n/z`;
export type DST_KStr_AKLMZ=`/di/a/k/l/m/z`;
export type DST_KStr_ABKZ=`/di/a/b/k/z`;
//#endregion
//#region ABDZ
// ~ SI = StorableItem
export type DSI_T_Item_ABD2<T_Type extends string,T_Tag2 extends string,T>={
	key: `boxed_id:${T_Type}:${T_Tag2}`;
	a: DST_KStr_ABKZ; b: "boxed_id"; l: T_Type; z: [T];
};

//#endregion


//#region DST_MakeLM (ABLMZ)
export type DST_MoveRegion1_Src="DST_MakeLM:Src"|DST_MoveRegion1_Dst;
//#endregion

export type DX_RawId<T>={
	a: DStr_DI_AKZ;
	k: "raw_id";
	z: [T];
};
export type DI_A_HashtagId={
	a: DStr_DI_AKZ;
	k: "hashtag_id";
	z: [DX_RawId<string>];
};
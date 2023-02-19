type HandleTypes=import("../../zc_child_modules/YTPlugin_HandleTypes.user.js").HandleTypes;
type KM_TrackingObj={
	1: "tag",
	2: "id",
};
type T_GetKeyMap<T,U extends keyof T,KM>=Extract<KM[Extract<keyof KM,U>],string>|T_MakeNumFieldFmt<T,U,Extract<U,number>,keyof KM,T_D32<number>|undefined>;
type T_Extract_D32_Keys<T,U extends keyof T,Y extends number,L>=T[U] extends L? Y:never;
type T_OmitKeyMapKeys<Y extends number>=Exclude<Y,keyof KM_TrackingObj>;
type T_MakeNumFieldFmt<T,U extends keyof T,V extends number,W,L>=`f${T_Extract_D32_Keys<T,U,Exclude<V,W>,L>}`;

type H_TrackingObj_NumKey_1<T extends {},KM>={[U in keyof T as T_GetKeyMap<T,U,KM>]: U;};
type H_TrackingObj_NumKey<T extends {},KM>=`${Extract<keyof H_TrackingObj_NumKey_1<T,KM>,string>}`;
type H_TrackingObj={
	h_tagged_2(
		cf: "G_PR_TrackingObj",
		o: {tag: P_RT_TK_f1,id: P_RT_TK_f2;}
	): void;
};

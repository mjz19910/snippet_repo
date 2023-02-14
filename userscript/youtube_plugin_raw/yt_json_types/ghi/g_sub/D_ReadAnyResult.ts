type D_ReadAny_CD_0x4c82a9c=[
	["child",2,Uint8Array,null],
	["child",3,Uint8Array,null],
	["child",35,Uint8Array,null],
];
type D_ReadAny_CR_0x4c82a9c=["child",0x4c82a9c,Uint8Array,D_ReadAny_CD_0x4c82a9c];
type D_ReadAnyResult=
	|[D_ReadAny_CR_0x4c82a9c]
	|DD_exv_2
	;
;
type DD_exv=T_DistributedKeysOf_2<R_0x12f639cf>;
type DD_exv_3=keyof DD_exv;
type DD_exv_2=DD_Exv_2<DD_exv,keyof DD_exv>;
type DD_Exv_2<T extends U[],U>=T extends [infer F extends U]?[DD_Exv_1[F&keyof DD_Exv_1]]:T extends [infer F extends U,...infer R]?R extends Exclude<U,F>[]?[DD_Exv_1[F&keyof DD_Exv_1],...DD_Exv_2<R,Exclude<U,F>>]:never:[];
type DD_Exv_1={
	[U in keyof R_0x12f639cf]: UD_R_0x12f639cf<U>;
};
type UD_R_0x12f639cf<T extends keyof R_0x12f639cf,V=R_0x12f639cf[T]>=
	V extends number
	? ["data32",T,number]
	:V extends {1: bigint;}
	? ["child",T,Uint8Array,[["data64",1,number[],bigint]]]
	:V extends R_YtPageSnapshot? ["child",T,Uint8Array,[
		["child",1,Uint8Array,[["child",1,Uint8Array,null],["child",2,Uint8Array,null],["child",3,Uint8Array,null]]]
	]]
	:V extends D_PageSnapshotToken? ["child",12,Uint8Array,[
		["data32",1,0],
		["child",2,V_Uint8Array<D_PageSnapshotToken[2]>,null],
		["child",3,Uint8Array,[["data32",1,number],{},{}]],
		{},
	]]
	:V extends D_0x12f639cf? ["child",T,Uint8Array,[["data32",1,D_0x12f639cf[1]]]]
	:["error",V]
	;
;
type DD_exv_0=D_0x12f639cf;

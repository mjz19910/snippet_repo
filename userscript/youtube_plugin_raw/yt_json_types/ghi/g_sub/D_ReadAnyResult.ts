type D_ReadAny_CD_0x4c82a9c=[
	["child",2,Uint8Array,null],
	["child",3,Uint8Array,null],
	["child",35,Uint8Array,null],
];
type D_RA_CR_0x4c82a9c=["child",0x4c82a9c,Uint8Array,D_ReadAny_CD_0x4c82a9c];
type D_RA_Result=
	|[D_RA_CR_0x4c82a9c]
	|D_ReadAny_CR_0x12f639cf
	;
;
type D_RA_V_BinaryTimestamp=[["data32",1,number],["data32",2,number],["data32",3,number]];
type D_RA_R_BigInt=[["data64",1,number[],bigint]];

type D_ReadAny_CR_0x12f639cf=[
	["data32",3,number],
	["child",6,Uint8Array,D_RA_R_BigInt],
	["child",11,Uint8Array,[["child",1,Uint8Array,[["child",1,Uint8Array,null],["child",2,Uint8Array,null],["child",3,Uint8Array,null]]]]],
	["child",12,Uint8Array,[["data32",1,0],["child",2,Uint8Array,null],["child",3,Uint8Array,D_RA_V_BinaryTimestamp],["child",4,Uint8Array,D_RA_V_BinaryTimestamp]]],
	["child",0x12f639cf,Uint8Array,[["data32",1,25]]]
];
type DD_exv_0=D_0x12f639cf;

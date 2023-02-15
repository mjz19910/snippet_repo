type D_RA_CR_0x4c82a9c=[["child",0x4c82a9c,Uint8Array,D_RA_CD_0x4c82a9c]];
type D_RA_D_Binary_f1_a1_d32=[["data32",1,4]];

type D_RA_D_Binary_f1_a1_obj=[["child",1,Uint8Array,[["child",1,Uint8Array,null],["child",2,Uint8Array,null],["data32",3,1]]]];

type D_RA_D_Binary_f1_a1=
|D_RA_D_Binary_f1_a1_d32
|D_RA_D_Binary_f1_a1_obj
;

type D_RA_D_Binary_f1=
	|D_RA_D_Binary_f1_a1
	|D_RA_CR_0x4c82a9c
	|D_RA_CR_0x19ac5ceb
	|[["child",4,Uint8Array,D_RA_V_BinaryTimestamp_asFixed]]
	;
;
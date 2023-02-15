type D_RA_D_Binary_x1_a1=["data32",1,337|487];
type D_RA_D_Binary_x1_a2=["data32",2,62457];
type D_RA_D_Binary_x1_a3=["data32",3,2];
type D_RA_D_Binary_x1_a4=["child",4,Uint8Array,D_RA_V_BinaryTimestamp_asFixed];
type D_RA_D_Binary_x1_v2=[["data32",1,424],["data32",2,6236],D_RA_D_Binary_x1_a4,["data64",8,number[],bigint]];

type D_RA_D_Binary_x1_v1=[D_RA_D_Binary_x1_a1,D_RA_D_Binary_x1_a2,D_RA_D_Binary_x1_a3,D_RA_D_Binary_x1_a4];

type D_RA_D_Binary_x1=
	|D_RA_D_Binary_x1_v1
	|D_RA_D_Binary_x1_v2
	;
;

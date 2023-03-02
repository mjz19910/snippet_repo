type T_D32<T extends number>=T_PArr_1<[["data32",T]]>;
type T_D64<T extends bigint>=T_PArr_1<[["data64",T]]>;
type TV_Str<T extends string>=T_PArr_1<[["raw_child",Uint8Array,null,["string",T]]]>;
type TV_Str_CS<T extends string>=T_PArr_1<[["child_str",Uint8Array,null,["string",T]]]>;
type T_VW_Bigint<T extends bigint>=T_PArr_1<[["data64",number[],T]]>;
type T_FD32<T extends number>=T_PArr_1<[["data_fixed32",T]]>;
type T_FD64<T extends bigint>=T_PArr_1<[["data_fixed64",T]]>;
type T_Uint8Array<_len extends number>=Uint8Array;

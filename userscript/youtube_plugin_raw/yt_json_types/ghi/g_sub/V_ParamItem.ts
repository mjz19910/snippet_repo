type Ret_gen_json=string;

type V_ParamItem_RawChild=[type: "raw_child",binary_arr: Uint8Array,obj: V_ParamObj|null,raw_value: V_RawValue];

type V_ParamItem=
	|[type: "child",binary_arr: Uint8Array,obj: V_ParamObj|null]
	|[type: "data_fixed32",value: number]
	|[type: "data_fixed64",value: bigint]
	|[type: "data32",value: number]
	|[type: "data64",raw_number: number[],value: bigint]
	|[type: "error",location: number]
	|[type: "group",value: V_ParamObj]
	|[type: "info",value: number]
	|[type: "raw",obj: V_RawValue]
	|[type: "struct",value: V_ParamObj]
	|V_ParamItem_RawChild
	;
;
type V_ParamItemFiltered=
	|[type: "error",location: number]
	|[type: "group",value: V_ParamObj]
	|[type: "info",value: number]
	|[type: "raw",obj: V_RawValue]
	|[type: "struct",value: V_ParamObj]
	|RetParam_BinaryTimestamp
	|RetParam_child
	|RetParam_D32
	|RetParam_FD32
	|RetParam_FD64
	|RetParam_raw
	|RetParam_raw_child
	|RetParam_VW_2
	|RetParam_VW_Bigint
	;
;
type RetParam_child=
	|RetParam_BinaryTimestamp
	|RetParam_ShortTimestamp
	;
;
type RetParam_BinaryTimestamp="TYPE::T_VW_2<V_BinaryTimestamp>";
type RetParam_ShortTimestamp="TYPE::T_VW_2<V_ShortTimestamp>";
type RetParam_FD32=`TYPE::T_FD32<${number}>`;
type RetParam_FD64=`TYPE::T_FD64<${bigint}n>`;
type RetParam_D32=`TYPE::T_D32<${number}>`;
type RetParam_VW_2=
	|`TYPE::T_VW_2<${Ret_gen_json},"json">`
	|`TYPE::T_VW_2<${string},"string">`
	;
;
type RetParam_VW_Bigint=`TYPE::T_VW_Bigint<${bigint}n>`;

type RetParam_raw=
	|`TYPE::TV_Str<"${string}">`
	|RetParam_VW_Bigint
	|`TYPE::T_VW_R<"${"number"}",${number}>`
	|`TYPE::T_VW_R<"${"array"|"binary"|"V_ParamMapType"}",${string}>`
	;
;
type RetParam_raw_child=
	|`TYPE::TV_Str<"${string}">`
	|`TYPE::["raw_child",${Ret_gen_json},${Ret_gen_json},${Ret_gen_json}]`
	;
;
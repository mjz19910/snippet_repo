type Ret_gen_json=string;
type V_ParamItem_RawChild=[type: "raw_child",binary_arr: Uint8Array,obj: null,raw_value: V_RawValue];
type V_ParamItem_ChildStr=[type: "child_str",binary_arr: Uint8Array,obj: null,raw_value: V_RawValue];
type V_ParamItem_Child=[type: "child",binary_arr: Uint8Array,obj: V_ParamObj];

type V_ParamItem=
	|V_ParamItem_Child
	|[type: "data_fixed32",value: number]
	|[type: "data_fixed64",value: bigint]
	|[type: "data32",value: number]
	|[type: "data64",raw_number: number[],value: bigint]
	|[type: "error",location: number]
	|[type: "group",value: V_ParamObj]
	|[type: "info",value: number]
	|[type: "raw",obj: V_RawValue]
	|[type: "struct",value: V_ParamObj]
	|V_ParamItem_ChildStr
	|V_ParamItem_RawChild
	;
;
type V_ParamItemFiltered=
	|[type: "error",location: number]
	|[type: "group",value: V_ParamObj]
	|[type: "info",value: number]
	|[type: "raw",obj: V_RawValue]
	|[type: "struct",value: V_ParamObj]
	|V_ParamItem_ChildStr
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
	|`TYPE::T_VW_Child<${string},"json">`
	|`TYPE::T_VW_Child<${string},"string">`
	;
;
type RetParam_BinaryTimestamp=
	|"TYPE::T_VW<V_BinaryTimestamp>"
	|`TYPE::T_VW_BinTs<${string},"json">`
	;
;
type RetParam_D32=`TYPE::T_D32<${number}>`;
type RetParam_FD32=`TYPE::T_FD32<${number}>`;
type RetParam_FD64=`TYPE::T_FD64<${bigint}n>`;
type RetParam_ShortTimestamp="TYPE::T_VW<V_ShortTimestamp>";
type RetParam_TV_Str=`TYPE::TV_Str<"${string}">`;
type RetParam_VW_Bigint=`TYPE::T_VW_Bigint<${bigint}n>`;
type RetParam_VW_2=
	|`TYPE::T_VW<${Ret_gen_json},"json">`
	|`TYPE::T_VW<${string},"string">`
	;
;
type RetParam_VW_R=
	|`TYPE::T_VW_R<"number",${number}>`
	|`TYPE::T_VW_R<"${"array"|"binary"|"V_ParamMapType"}",${string}>`
	;
;
type RetParam_raw=
	|`TYPE::T_VW_Str<"${string}">`
	|RetParam_VW_Bigint
	|RetParam_VW_R
	;
;
type RetParam_raw_child=
	|`TYPE::T_RC_Str<"${string}">`
	|`TYPE::["raw_child",${Ret_gen_json},${Ret_gen_json},${Ret_gen_json}]`
	;
;
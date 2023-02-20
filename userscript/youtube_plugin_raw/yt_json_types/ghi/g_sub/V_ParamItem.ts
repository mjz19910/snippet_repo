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
type Ret_v_param_2_maybe_binary_ts="TYPE::T_VW_2<V_BinaryTimestamp>";

type V_ParamItemFiltered=
	|[type: "error",location: number]
	|[type: "group",value: V_ParamObj]
	|[type: "info",value: number]
	|[type: "raw",obj: V_RawValue]
	|[type: "struct",value: V_ParamObj]
	|`TYPE::T_D32<${number}>`
	|`TYPE::T_VW_Bigint<${bigint}n>`
	|Ret_v_param_2_child
	|Ret_v_param_2_FD32
	|Ret_v_param_2_FD64
	|Ret_v_param_2_maybe_binary_ts
	|Ret_v_param_2_raw
	|Ret_v_param_2_raw_child
	|RetParam_VW_2
	;
;
type Ret_v_param_2_FD32=`TYPE::T_FD32<${number}>`;
type Ret_v_param_2_FD64=`TYPE::T_FD64<${bigint}n>`;
type RetParam_VW_2=
	|`TYPE::T_VW_2<${Ret_gen_json},"json">`
	|`TYPE::T_VW_2<${string},"string">`
	;
;
type Ret_v_param_2_short_ts="TYPE::T_VW_2<V_ShortTimestamp>";
type Ret_v_param_2_D32=`TYPE::T_D32<${string}>`;
type Ret_v_param_2_raw=
	|`TYPE::TV_Str<"${string}">`
	|`TYPE::T_VW_Bigint<${bigint}n>`
	|`TYPE::T_VW_R<"${"number"}",${number}>`
	|`TYPE::T_VW_R<"${"array"|"binary"|"V_ParamMapType"}",${string}>`
	;
;
type Ret_v_param_2_child=
	|Ret_v_param_2_maybe_binary_ts
	|Ret_v_param_2_short_ts
	;
;
type Ret_v_param_2_raw_child=
	|`TYPE::TV_Str<"${string}">`
	|`TYPE::["raw_child",${Ret_gen_json},${Ret_gen_json},${Ret_gen_json}]`
	;
;
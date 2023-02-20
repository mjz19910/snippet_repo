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
	|`TYPE::T_D32<${string}>`
	|`TYPE::T_FD32<${number}>`
	|`TYPE::T_FD64<${bigint}n>`
	|`TYPE::T_VW_Bigint<${string}n>`
	|Ret_v_param_2_child
	|Ret_v_param_2_raw_child
	;
;
type Ret_v_param_2_child=
	|Ret_v_param_2_maybe_binary_ts
	|null
	;
;
type Ret_v_param_2_maybe_binary_ts=
	|"TYPE::T_VW_2<V_BinaryTimestamp>"
	|`TYPE::T_VW_2<${Ret_gen_json}>`
	|null
	;
;
type Ret_v_param_2_maybe_short_ts=
	|"TYPE::T_VW_2<V_ShortTimestamp>"
	|`TYPE::T_VW_2<${Ret_gen_json}>`
	|null
	;
;
type Ret_v_param_2_D32=`TYPE::T_D32<${string}>`|null;
type Ret_v_param_2_raw_child=
	|`TYPE::TV_Str<"${string}">`
	|`TYPE::["raw_child",${Ret_gen_json},${Ret_gen_json},${Ret_gen_json}]`
	;
;
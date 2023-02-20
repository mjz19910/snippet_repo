type Ret_gen_json=string;

type V_ParamItem=
	|[type: "child",binary_arr: Uint8Array,obj: V_ParamObj|null]
	|[type: "raw",obj: V_RawValue]
	|[type: "raw_child",binary_arr: Uint8Array,obj: V_ParamObj|null,raw_value: V_RawValue]
	|[type: "data32",value: number]
	|[type: "data64",raw_number: number[],value: bigint]
	|[type: "data_fixed32",value: number]
	|[type: "data_fixed64",value: bigint]
	|[type: "error",location: number]
	|[type: "group",value: V_ParamObj]
	|[type: "info",value: number]
	|[type: "struct",value: V_ParamObj]
	;
;
type V_ParamItemFiltered=
	|`TYPE::T_FD32<${number}>`
	|`TYPE::T_FD64<${bigint}n>`
	|[type: "raw",obj: V_RawValue]
	|[type: "error",location: number]
	|[type: "group",value: V_ParamObj]
	|[type: "info",value: number]
	|[type: "struct",value: V_ParamObj]
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
type Ret_v_param_2_maybe_short_ts=null;
type Ret_gen_json=string;
type V_Param_D32=[type: "v_data32",value: number];
type V_Param_D64=[type: "v_data64",raw_number: number[],value: bigint];
type V_Param_Error=[type: "v_error",location: number];
type V_Param_FD32=[type: "v_data_fixed32",value: number];
type V_Param_FD64=[type: "v_data_fixed64",value: bigint];
type V_Param_Group=[type: "v_group",value: V_ParamObj];
type V_Param_Info=[type: "v_info",value: number];
type V_Param_Raw=[type: "v_raw",obj: V_RawValue];
type V_Param_Struct=[type: "v_struct",value: V_ParamObj];
type V_Param_Child=T_Param_Child<V_ParamObj,V_RawValue>;
type V_Param_ChildStr=[type: "v_child_str",binary_arr: Uint8Array,obj: null,raw_value: V_RawValue];
type V_Param_RawChild=[type: "v_raw_child",binary_arr: Uint8Array,obj: null,raw_value: V_RawValue];
type V_Param=
	|V_Param_Child
	|V_Param_FD32
	|V_Param_FD64
	|V_Param_D32
	|V_Param_D64
	|V_Param_Error
	|V_Param_Group
	|V_Param_Info
	|V_Param_Raw
	|V_Param_Struct
	|V_ParamArrBox
	|V_Param_ChildStr
	|V_Param_RawChild
	;
;
type V_ParamItemFiltered=
	|[type: "f_error",location: number]
	|[type: "f_group",value: V_ParamObj]
	|[type: "f_info",value: number]
	|[type: "f_param_arr",items: V_Param[]]
	|[type: "f_raw",obj: V_RawValue]
	|[type: "f_struct",value: V_ParamObj]
	|RetParam_BinaryTimestamp
	|RetParam_child
	|RetParam_D32
	|RetParam_FD32
	|RetParam_FD64
	|RetParam_raw
	|RetParam_raw_child
	|RetParam_VW_2
	|RetParam_VW_Bigint
	|V_Param_ChildStr
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
type RetParam_ShortTimestamp="TYPE::T_VW<V_ShortTimestamp>";
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
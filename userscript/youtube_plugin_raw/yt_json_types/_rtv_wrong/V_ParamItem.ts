import {RetParam_D32,RetParam_FD32,RetParam_FD64,RetParam_VW_Bigint} from "../d/group_D.ts";
import {T_Param_Child} from "../stu/group_T.ts";
import {V_RawValue} from "../vw/group_V.ts";

export type Ret_gen_json=string;
export type V_Param_D32=[type: "v_data32",value: number];
export type V_Param_D64=[type: "v_data64",raw_number: number[],value: bigint];
export type V_Param_Error=[type: "v_error",location: number];
export type V_Param_FD32=[type: "v_data_fixed32",value: number];
export type V_Param_FD64=[type: "v_data_fixed64",value: bigint];
export type V_Param_Group=[type: "v_group",value: V_ParamObj];
export type V_Param_Info=[type: "v_info",value: number];
export type V_Param_Raw=[type: "v_raw",obj: V_RawValue];
export type V_Param_Struct=[type: "v_struct",value: V_ParamObj];
export type V_Param_Child=T_Param_Child<V_ParamObj,V_RawValue>;
export type V_Param_ChildStr=[type: "v_child_str",binary_arr: Uint8Array,obj: null,raw_value: V_RawValue];
export type V_Param_RawChild=[type: "v_raw_child",binary_arr: Uint8Array,obj: null,raw_value: V_RawValue];
export type V_Param=
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
export type V_ParamItemFiltered=
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
export type RetParam_child=
	|RetParam_BinaryTimestamp
	|RetParam_ShortTimestamp
	|`TYPE::T_VW_Child<${string},"json">`
	|`TYPE::T_VW_Child<${string},"string">`
	;
;
export type RetParam_BinaryTimestamp=
	|"TYPE::T_VW<V_BinaryTimestamp>"
	|`TYPE::T_VW_BinTs<${string},"json">`
	;
;
export type RetParam_ShortTimestamp="TYPE::T_VW<V_ShortTimestamp>";
export type RetParam_VW_2=
	|`TYPE::T_VW<${Ret_gen_json},"json">`
	|`TYPE::T_VW<${string},"string">`
	;
;
export type RetParam_VW_R=
	|`TYPE::T_VW_R<"number",${number}>`
	|`TYPE::T_VW_R<"${"array"|"binary"|"V_ParamMapType"}",${string}>`
	;
;
export type RetParam_raw=
	|`TYPE::T_VW_Str<"${string}">`
	|RetParam_VW_Bigint
	|RetParam_VW_R
	;
;
export type RetParam_raw_child=
	|`TYPE::T_RC_Str<"${string}">`
	|`TYPE::["raw_child",${Ret_gen_json},${Ret_gen_json},${Ret_gen_json}]`
	;
;
export type V_ParamArrBox=["v_param_arr",V_Param[]];
export type V_ParamObj={[x: number]: V_ParamArrBox;};

type V_ParamItem=
	|[type: "child",binary_arr: Uint8Array,obj: V_ParamObj_2|null]
	|[type: "raw",obj: V_RawValue]
	|[type: "raw_child",binary_arr: Uint8Array,obj: V_ParamObj_2|null,raw_value: V_RawValue]
	|[type: "data32",value: number]
	|[type: "data64",raw_number: number[],value: bigint]
	|[type: "data_fixed32",value: number]
	|[type: "data_fixed64",value: bigint]
	|[type: "error",location: number]
	|[type: "group",value: V_ParamObj_2]
	|[type: "info",value: number]
	|[type: "struct",value: V_ParamObj_2]
	;
;

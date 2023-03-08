type Ret_simple_filter_obj=
	|{empty: true;}
	|{type: "string"; k: string; v: unknown; sf: any;}
	|{type: "empty";}
	|{type: "obj",value: any;}
	|null
	;
;
type ObjModifyLog={
	type: "add";
	key: string;
	value: any;
};
type Ret_Filter_FunctionModify={
	type: "function";
	id: number;
	log: ObjModifyLog[];
};
type G_ObjModifyItem={
	type: "modify";
	k: string;
	value: Ret_Filter_FunctionModify;
}|{
	type: "filter";
	k: string;
	value: JsonFilterRetAny|Ret_simple_filter|JsonFilterRet_FunctionItem;
};
type Ret_TextDecoderInfo={
	type: "obj";
	value: {
		type: "TextDecoder";
		__symbol_prototype: GType_PrototypeDescription_OfTextDecoder<"%%prototype","TextDecoder",TextDecoder>;
	};
};
type JsonFilterRetAny={a: "any",z: [{}];};
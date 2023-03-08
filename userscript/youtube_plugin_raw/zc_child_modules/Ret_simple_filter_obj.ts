type Ret_simple_filter_obj=
	|{a: "/empty"; empty: true;}
	|{a: "/type/k/v/sf"; type: "string"; k: string; v: number; sf: number;}
	|{a: "/type"; type: "empty";}
	|{a: "/type/value"; type: "obj",value: number;}
	|Ret_TextDecoderInfo
	|null
	;
;
type ObjModifyLog={
	a: "/type/k/value";
	type: "add";
	k: string;
	value: number;
};
type Ret_Filter_FunctionModify={
	a: "/type/id/log";
	type: "function";
	id: number;
	log: ObjModifyLog[];
};
type G_ObjModifyItem={
	a: "/type/k/value";
	type: "modify";
	k: string;
	value: Ret_Filter_FunctionModify;
}|{
	a: "/type/k/value";
	type: "filter";
	k: string;
	value: JsonFilterRetAny|Ret_simple_filter|JsonFilterRet_FunctionItem;
}|{
	a: "/type/key/obj";
	type: "update";
	key: "decode";
	obj: {
		a: "/decode";
		decode: JsonFilterRetAny|JsonFilterRet_FunctionItem|Ret_simple_filter;
	};
};
type Ret_TextDecoderInfo={
	a: "/type/value";
	type: "obj";
	value: {
		a: "/type/__symbol_prototype";
		type: "TextDecoder";
		__symbol_prototype: GType_PrototypeDescription_OfTextDecoder<"%%prototype","TextDecoder",TextDecoder>;
	};
};
type JsonFilterRetAny={a: "any",z: [number];};
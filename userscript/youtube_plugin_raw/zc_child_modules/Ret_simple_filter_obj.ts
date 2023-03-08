type Ret_FilterEmptyType={
	a: "/type";
	type: "empty";
};

type Ret_simple_filter_obj=
	|{a: "/type/k/v/sf"; value: {type: "string"; k: string; v: number; sf: number;};}
	|Ret_FilterEmptyType
	|{a: "/type/value"; value: {type: "obj"; z: number;};}
	|{a: "/raw",value: {[k: string]: any;};}
	|Ret_TextDecoderInfo
	|{a: "/type/value"; value: {type: "null";};}
	;
;
type ObjModifyLog={
	a: "/type/k/value";
	value: {
		type: "add";
		k: string;
		value: number;
	};
};
type Ret_Filter_FunctionModify={
	a: "/type/id/log";
	value: {
		type: "function";
		id: number;
		log: ObjModifyLog[];
	};
};
type G_ObjModifyItem={
	a: "/type/k/value";
	value: {
		type: "modify";
		k: string;
		value: Ret_Filter_FunctionModify;
	};
}|{
	a: "/type/k/value";
	value: {
		type: "filter";
		k: string;
		value: Ret_simple_filter;
	};
}|{
	a: "/type/key/obj";
	value: {
		type: "update";
		key: "decode";
		obj: {
			a: "/decode";
			decode: JsonFilterRetAny|JsonFilterRet_FunctionItem|Ret_simple_filter;
		};
	};
};
type Ret_TextDecoderInfo={
	a: "/type/value";
	value: {
		a: "/type/__symbol_prototype";
		type: "TextDecoder";
		__symbol_prototype: GType_PrototypeDescription_OfTextDecoder<"%%prototype","TextDecoder",TextDecoder>;
	};
};
type JsonFilterRetAny={a: "/z",z: [number];};
type Ret_can_clone_map={
	a: "/type/p/value"; value: {
		p: "boolean"; type: "entry";
		value: [string,boolean];
	};
}|{
	a: "/type/z";
	value: {
		type: "array";
		k: string;
		v: any[];
	};
}|{
	a: "/type/z";
	value: {
		type: "filter";
		k: string;
		z: Ret_simple_filter;
	};
}|{
	a: "/value";
	value: {
		a: "/k/v/f";
		k: string;
		v: unknown;
		f: Ret_simple_filter;
	};
}|{
	a: "/value";
	value: {
		b: "no-clone";
		type: "RegExp";
		k: string;
		value: {source: string;};
	};
}|{
	a: "/value";
	value: {
		b: "no-clone"; k: string;
		type: "TextDecoder";
		value: {
			encoding: string;
			fatal: boolean;
			ignoreBOM: boolean;
		};
	};
}|{
	a: "/value";
	value: {
		b: "clone";
		k: string;
		value: {}|null;
	};
}|{
	a: "/b/k/value"; value: {
		b: "primitive"; j: "string";
		k: string; value: string;
	};
}|{
	a: "/b/k/value"; value: {
		b: "primitive"; j: "number";
		k: string; value: number;
	};
};
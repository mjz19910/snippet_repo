type JsonFilterRet_1<T>={
	a: "/value";
	value: {
		a: "/type_name/value";
		type: "obj";
		type_name: string;
		value: {
			a: "/value/T";
			value: T;
		};
	};
};

type JsonFilterRet_2={
	a: "/value";
	value: {
		a: "/id";
		type: "function";
		id: number;
	};
};

type JsonFilterRet_3<T>={
	a: "/value";
	value: {
		type: "normal";
		a: "/value/T";
		value: T;
	};
};

type JsonFilterRet_Sym={
	a: "/value";
	value: {
		type: "symbol";
		a: "/for";
		for: "box_symbol";
	}|{
		type: "symbol";
		a: "/empty";
		empty: true;
	};
};

type JsonFilterRet_Copy={
	a: "/value";
	value: {
		type: "normal:copy";
		a: "/copy/z";
		copy: true;
		z: {
			[k: string]: unknown;
		};
	};
};

type JsonFilterRet<K,T>=
	|JsonFilterRet_1<T>
	|JsonFilterRet_3<T>
	|GType_PrototypeDescription_OfTextDecoder<K,"TextDecoder",TextDecoder>
	;
;
type JsonFilterPrimitive=string|boolean|null;
type JsonFilterStatic=
	|JsonFilterRet_2
	|JsonFilterRet_Sym
	|JsonFilterRet_Copy
	;
;
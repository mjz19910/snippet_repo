type JsonFilterRet<K,T>=
	|{
		a: "/value"; value: {a: "/type_name/value"; type: "obj"; type_name: string; value: {a: "/value/T"; value: T;};};
	}
	|{
		a: "/value";
		value: {a: "/id"; type: "function"; id: number;};
	}
	|{
		a: "/value"; value: {type: "normal"; a: "/value/T"; value: T;};
	}
	|GType_PrototypeDescription_OfTextDecoder<K,"TextDecoder",TextDecoder>
	|{
		a: "/value"; value: {
			type: "symbol"; a: "/for"; for: "box_symbol";
		}|{
			type: "symbol"; a: "/empty"; empty: true;
		};
	}
	|{
		a: "/value"; value: {type: "normal:copy"; a: "/copy/z"; copy: true; z: {[k: string]: unknown;};};
	}
	|string
	|boolean
	|null
	;
;

type Ret_simple_filter=
	|Ret_simple_filter_obj
	|Ret_FilterEmptyType
	|{a: "/type"; type: "symbol"; sym: symbol;}
	|{a: "/type/for"; type: "symbol-for"; for: "box_symbol";}
	|{a: "/type/id/value"; type: "function"; id: number; value: {a: "/name"; name: string;};}
	|{a: "/type/value"; type: "string"; value: string;}
	|{a: "/type/value"; type: "number"; value: number;}
	|{a: "/type/value"; type: "bigint"; value: bigint;}
	|{a: "/type/value"; type: "boolean"; value: boolean;}
	|{a: "/type/value"; type: "undefined";}
	|{a: "/type/value"; type: "null";}
	;
;

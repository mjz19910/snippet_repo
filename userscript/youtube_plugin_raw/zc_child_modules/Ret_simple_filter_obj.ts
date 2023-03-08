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

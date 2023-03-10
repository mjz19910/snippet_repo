type make_one_t<T>={
	a: DST_KStr_AKLMZ; k: "item"; l: "one"; m: string;
	z: [T];
};
type make_arr_t<T>={
	a: DST_KStr_AKLMZ; k: "item"; l: "arr"; m: string;
	z: [T[]];
};
type G_MakeGroupShape<T,K="item",L="one",M=string>={a: DST_KStr_AKLMZ; k: K; l: L; m: M; z: [T];};
type make_many_t<T>={
	a: DST_KStr_AKLMZ; k: "item"; l: "many"; m: string;
	z: [T[][]];
};
type make_typeof_name_t<T,U extends T_GetTypeof<T>=T_GetTypeof<T>>={
	a: DST_KStr_AKLMZ; k: "item"; l: "typeof_name"; m: string;
	z: [U];
};
type make_instance_name_t<V extends string>={
	a: DST_KStr_AKLMZ; k: "item"; l: "instance_name"; m: string;
	z: [V];
};

type make_item_group<T>=
	|make_one_t<T>
	|make_arr_t<T>
	|make_many_t<T>
	|make_typeof_name_t<T>
	|make_instance_name_t<"array">
	;
;
